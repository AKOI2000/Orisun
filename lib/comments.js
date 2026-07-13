import { revalidateTag } from 'next/cache';
import { prisma } from './prisma';

// Submits a new comment — always starts unapproved until you moderate it.
// No cache invalidation needed here: unapproved comments aren't part of
// any cached public read, so nothing's stale yet.
export async function createComment(postId, { name, email, content }) {
  return prisma.comment.create({
    data: { postId, name, email, content, approved: false },
  });
}

// Comments awaiting moderation, newest first — for the admin dashboard.
export async function getPendingComments() {
  return prisma.comment.findMany({
    where: { approved: false },
    orderBy: { createdAt: 'desc' },
    include: { post: { select: { title: true, slug: true } } },
  });
}

// Marks a comment as approved so it shows up publicly. Busts the cached
// post read (its comments list) and post list (its comment count).
export async function approveComment(commentId) {
  const comment = await prisma.comment.update({
    where: { id: commentId },
    data: { approved: true },
  });

  revalidateTag('posts');
  return comment;
}

// Deletes a comment (e.g. spam or rejected during moderation). Only
// approved comments are cached anywhere, but this covers that case too.
export async function deleteComment(commentId) {
  const comment = await prisma.comment.delete({ where: { id: commentId } });

  revalidateTag('posts');
  return comment;
}