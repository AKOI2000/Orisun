"use server";

import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { createPost, updatePost, updatePostBlocks, deletePost } from "@/lib/posts";

export async function createPostAction(formData) {
  const title = formData.get("title")?.trim();

  if (!title) {
    return;
  }

  const slug = `${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}-${nanoid(6)}`;

  await createPost({ title, slug });

  redirect("/admin");
}


 
export async function updatePostAction(postId, formData) {
  const title = formData.get('title')?.trim();
  const published = formData.get('published') === 'on';
  const excerpt = formData.get('excerpt')?.trim() || null;
 
  if (!title) {
    return;
  }
 
  await updatePost(postId, { title, published, excerpt });
 
  redirect(`/admin/${postId}`);
}
 
// Called immediately when a new cover image is uploaded - not tied to the
// title/published form submit, same as how block images upload on select.
export async function updateCoverImageAction(postId, { url, publicId, resourceType }) {
  return updatePost(postId, {
    coverImage: url,
    coverImagePublicId: publicId,
    coverImageResourceType: resourceType,
  });
}
 

export async function deletePostAction(postId) {
  try {
    await deletePost(postId);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete post.' };
  }
}

export async function saveBlocksAction(postId, blocks) {
  return updatePostBlocks(postId, blocks);
}