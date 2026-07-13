import { unstable_cache, revalidateTag } from 'next/cache';
import { prisma } from './prisma';
import { deleteFromCloudinary } from './cloudinary';

// Default blocks a new post is seeded with, so it looks
// complete even before any drag-and-drop reordering happens.
const DEFAULT_BLOCKS = [
  { type: 'paragraph', order: 0, content: { text: '' } },
  { type: 'image', order: 1, content: { url: '', caption: '', alt: '' } },
  { type: 'paragraph', order: 2, content: { text: '' } },
];

// --- Public blog reads, cached ---
// Same tag ('posts') as the admin reads below - an admin edit invalidates
// both at once, so readers never see stale content after a save.

// All published posts, newest first — used on the homepage's "latest" list.
export const getAllPosts = unstable_cache(
  async () => {
    return prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        createdAt: true,
        _count: {
          select: { comments: { where: { approved: true } }, likes: true },
        },
      },
    });
  },
  ['public-posts-list'],
  { tags: ['posts'] }
);

// A handful of other published posts, shuffled - used for the "more
// posts" section under an individual thought. Cached per excluded slug,
// so each post page gets its own set, but it stays consistent between
// visits until something changes (a post is created, edited, or removed)
// rather than re-shuffling on every single page load.
export const getRandomPosts = unstable_cache(
  async (excludeSlug, count = 3) => {
    const posts = await prisma.post.findMany({
      where: { published: true, slug: { not: excludeSlug } },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        createdAt: true,
      },
    });

    // Fisher-Yates shuffle.
    const shuffled = [...posts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);
  },
  ['random-posts'],
  { tags: ['posts'] }
);

// Published posts, one page at a time — used on the thoughts listing page.
// Separate from getAllPosts above since the homepage needs the full/latest
// list, not a paginated slice.
export const getPaginatedPosts = unstable_cache(
  async ({ page = 1, pageSize = 9 } = {}) => {
    const where = { published: true };

    const [posts, totalCount] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          coverImage: true,
          createdAt: true,
        },
      }),
      prisma.post.count({ where }),
    ]);

    return { posts, totalCount, page, pageSize };
  },
  ['public-posts-paginated'],
  { tags: ['posts'] }
);

// A single post with its ordered blocks, approved comments, and like count.
export const getPostBySlug = unstable_cache(
  async (slug) => {
    return prisma.post.findUnique({
      where: { slug },
      include: {
        blocks: { orderBy: { order: 'asc' } },
        comments: {
          where: { approved: true },
          orderBy: { createdAt: 'desc' },
        },
        _count: { select: { likes: true } },
      },
    });
  },
  ['public-post-by-slug'],
  { tags: ['posts'] }
);

// --- Admin dashboard reads, cached ---
// These are wrapped in unstable_cache and tagged 'posts', so repeated
// visits to /admin (and its edit pages) don't hit the database every
// time. Any write below calls revalidateTag('posts') right after it
// succeeds, which throws away exactly this cache — nothing stale lingers
// around after a save.

// A single post by its id, with its ordered blocks — used by the admin editor,
// since the URL there identifies posts by id rather than slug.
export const getPostById = unstable_cache(
  async (postId) => {
    return prisma.post.findUnique({
      where: { id: postId },
      include: {
        blocks: { orderBy: { order: 'asc' } },
      },
    });
  },
  ['admin-post-by-id'],
  { tags: ['posts'] }
);

// All posts, filtered by status and paginated — used in the admin list view.
// status: 'all' | 'published' | 'draft'
export const getAllPostsForAdmin = unstable_cache(
  async ({ status = 'all', page = 1, pageSize = 10 } = {}) => {
    const where = status === 'all' ? {} : { published: status === 'published' };

    const [posts, totalCount] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          title: true,
          slug: true,
          published: true,
          updatedAt: true,
        },
      }),
      prisma.post.count({ where }),
    ]);

    return { posts, totalCount, page, pageSize };
  },
  ['admin-posts-list'],
  { tags: ['posts'] }
);

// --- Writes: each one busts the cached reads above once it succeeds ---

// Creates a new post pre-seeded with the default block arrangement.
export async function createPost({ title, slug, excerpt, coverImage }) {
  const post = await prisma.post.create({
    data: {
      title,
      slug,
      excerpt,
      coverImage,
      published: false,
      blocks: { create: DEFAULT_BLOCKS },
    },
    include: { blocks: true },
  });

  revalidateTag('posts');
  return post;
}

// Updates a post's own fields (title, slug, excerpt, cover, published state).
export async function updatePost(postId, data) {
  const post = await prisma.post.update({
    where: { id: postId },
    data,
  });

  revalidateTag('posts');
  return post;
}

// Replaces a post's block order/content after the editor's drag-and-drop.
// `blocks` is the full array in its new order:
// [{ id?, type, content }, ...] — id omitted for newly added blocks.
// Note: Cloudinary cleanup for removed blocks happens client-side, at the
// moment "Remove" is clicked — not here — since a block can be added,
// uploaded to, and removed again all before ever being saved.
export async function updatePostBlocks(postId, blocks) {
  const result = await prisma.$transaction(async (tx) => {
    const keepIds = blocks.filter((b) => b.id).map((b) => b.id);
    await tx.block.deleteMany({
      where: { postId, id: { notIn: keepIds.length ? keepIds : ['__none__'] } },
    });

    await Promise.all(
      blocks.map((block, index) =>
        block.id
          ? tx.block.update({
              where: { id: block.id },
              data: { type: block.type, content: block.content, order: index },
            })
          : tx.block.create({
              data: { postId, type: block.type, content: block.content, order: index },
            })
      )
    );

    return tx.block.findMany({ where: { postId }, orderBy: { order: 'asc' } });
  });

  revalidateTag('posts');
  return result;
}

// Deletes a post (blocks, comments, and likes cascade automatically at the
// database level). Also cleans up any Cloudinary files those blocks used,
// plus the post's own cover image.
export async function deletePost(postId) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { coverImagePublicId: true, coverImageResourceType: true },
  });

  const blocks = await prisma.block.findMany({
    where: { postId, type: { in: ['image', 'music'] } },
  });

  const deleted = await prisma.post.delete({ where: { id: postId } });

  await Promise.all([
    deleteFromCloudinary(post?.coverImagePublicId, post?.coverImageResourceType).catch(() => {}),
    ...blocks.map((block) =>
      deleteFromCloudinary(block.content?.publicId, block.content?.resourceType).catch(() => {})
    ),
  ]);

  revalidateTag('posts');
  return deleted;
}