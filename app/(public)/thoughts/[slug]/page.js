import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getRandomPosts } from "@/lib/posts";
import { getLikeCount, hasLiked } from "@/lib/likes";
import { readFingerprint } from "@/app/_lib/fingerprint";
import PostBlock from "@/app/_components/PostBlock";
import LikeButton from "@/app/_components/LikeButton";
import CommentList from "@/app/_components/CommentList";
import CommentForm from "@/app/_components/CommentForm";
import MorePost from "@/app/_components/MorePost";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: post.title,

    description: post.excerpt || "A thought from Orisun.",

    alternates: {
      canonical: `/thoughts/${post.slug}`,
    },

    openGraph: {
      title: post.title,
      description: post.excerpt || "A thought from Orisun.",
      url: `https://orisunn.vercel.app/thoughts/${post.slug}`,
      type: "article",

      publishedTime: post.createdAt,

      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              alt: post.title,
            },
          ]
        : [
            {
              url: "/Orisun3.png",
              alt: "Orisun",
            },
          ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "A thought from Orisun.",
      images: post.coverImage ? [post.coverImage] : ["/Orisun3.png"],
    },
  };
}

export async function generateStaticParams(params) {
  const posts = await getAllPosts();

  const slugs = posts.map((post) => ({ slug: String(post.slug) }));

  return slugs;
}

export default async function ThoughtPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // 404 for missing posts *and* for drafts - a guessed slug shouldn't
  // reveal unpublished content.
  if (!post || !post.published) notFound();

  const fingerprint = await readFingerprint();
  const [likeCount, liked, morePosts] = await Promise.all([
    getLikeCount(post.id),
    fingerprint ? hasLiked(post.id, fingerprint) : false,
    getRandomPosts(post.slug, 3),
  ]);

  return (
    <article className="thought page-hero">
      <header className="thought__header">
        <time className="thought__date">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        <h1>{post.title}</h1>
      </header>

      {post.coverImage && (
        <div className="thought__cover">
          <img src={post.coverImage} alt="" />
        </div>
      )}

      <div className="thought__body">
        {post.blocks.map((block) => (
          <PostBlock key={block.id} block={block} />
        ))}
      </div>

      <div className="thought__like">
        <LikeButton
          postId={post.id}
          initialLiked={liked}
          initialCount={likeCount}
        />
      </div>

      <section className="thought__comments">
        <h2>Comments</h2>
        <CommentList comments={post.comments} />
        <CommentForm postId={post.id} />
      </section>
      <MorePost posts={morePosts} />
    </article>
  );
}
