import { prisma } from './prisma';

// Total like count for a post.
export async function getLikeCount(postId) {
  return prisma.like.count({ where: { postId } });
}

// Whether a given visitor (identified by their cookie fingerprint)
// has already liked this post.
export async function hasLiked(postId, fingerprint) {
  const like = await prisma.like.findUnique({
    where: { postId_fingerprint: { postId, fingerprint } },
  });
  return Boolean(like);
}

// Toggles a like on/off for a visitor. Returns the new liked state.
export async function toggleLike(postId, fingerprint) {
  const existing = await prisma.like.findUnique({
    where: { postId_fingerprint: { postId, fingerprint } },
  });

  if (existing) {
    await prisma.like.delete({ where: { id: existing.id } });
    return false;
  }

  await prisma.like.create({ data: { postId, fingerprint } });
  return true;
}