'use client';

import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { updatePostAction, updateCoverImageAction } from '../_lib/post-actions';
import { uploadFile, deleteFile } from '../_lib/block-helpers';

export default function PostMetaForm({ post }) {
  const [isPending, startTransition] = useTransition();
  const [coverImage, setCoverImage] = useState({
    url: post.coverImage,
    publicId: post.coverImagePublicId,
    resourceType: post.coverImageResourceType,
  });
  const [uploadingCover, setUploadingCover] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    startTransition(async () => {
      try {
        await updatePostAction(post.id, formData);
        toast.success('Post updated');
      } catch (error) {
        // Next.js redirects throw internally - let that pass through
        // rather than treating it as a real failure.
        if (error?.digest?.startsWith('NEXT_REDIRECT')) throw error;
        toast.error('Something went wrong saving the post.');
      }
    });
  }

  async function handleCoverImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const previous = coverImage;

    setUploadingCover(true);
    try {
      const uploaded = await uploadFile(file);
      await updateCoverImageAction(post.id, uploaded);
      setCoverImage(uploaded);
      toast.success('Cover image updated');

      // Clean up the old file now that the new one is safely saved.
      if (previous.publicId) {
        deleteFile(previous.publicId, previous.resourceType);
      }
    } catch {
      toast.error('Cover image upload failed. Try again.');
    } finally {
      setUploadingCover(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="post-meta-form">
      <input type="text" name="title" defaultValue={post.title} required />

      <textarea
        name="excerpt"
        rows={2}
        placeholder="Short excerpt shown on the blog listing (optional)"
        defaultValue={post.excerpt || ''}
      />

      <div className="post-meta-form__cover">
        <label>Cover image</label>
        <input type="file" accept="image/*" onChange={handleCoverImageChange} />
        {uploadingCover && <span>Uploading…</span>}
        {coverImage.url && (
          <img src={coverImage.url} alt="" className="post-meta-form__cover-preview" />
        )}
      </div>

      <label>
        <input type="checkbox" name="published" defaultChecked={post.published} />
        Published
      </label>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Saving…' : 'Save'}
      </button>
    </form>
  );
}