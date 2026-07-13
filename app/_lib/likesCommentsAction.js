"use server";

import { toggleLike, getLikeCount } from "@/lib/likes";
import { createComment } from "@/lib/comments";
import { getOrCreateFingerprint } from "@/app/_lib/fingerprint";
import { approveComment, deleteComment } from '@/lib/comments';

export async function toggleLikeAction(postId) {
  const fingerprint = await getOrCreateFingerprint();
  const liked = await toggleLike(postId, fingerprint);
  const count = await getLikeCount(postId);
  return { liked, count };
}

export async function submitCommentAction(postId, { name, email, content }) {
  const cleanName = name?.trim();
  const cleanEmail = email?.trim();
  const cleanContent = content?.trim();

  if (!cleanName || !cleanEmail || !cleanContent) {
    throw new Error("All fields are required.");
  }

  // Starts unapproved - won't show publicly until approved from admin.
  await createComment(postId, {
    name: cleanName,
    email: cleanEmail,
    content: cleanContent,
  });
  return { ok: true };
}


export async function approveCommentAction(commentId) {
  try {
    await approveComment(commentId);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to approve comment.' };
  }
}

export async function deleteCommentAction(commentId) {
  try {
    await deleteComment(commentId);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete comment.' };
  }
}