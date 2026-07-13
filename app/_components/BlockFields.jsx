'use client';

import { useState } from 'react';
import { uploadFile, deleteFile } from '../_lib/block-helpers';

export default function BlockFields({ block, onChange }) {
  const content = block.content;
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const previousPublicId = content.publicId;
    const previousResourceType = content.resourceType;

    setUploading(true);
    try {
      const { url, publicId, resourceType } = await uploadFile(file);
      onChange({ ...content, url, publicId, resourceType });

      // If this block already had a file, this upload replaced it -
      // clean up the old one now that the new one is safely saved.
      if (previousPublicId) {
        deleteFile(previousPublicId, previousResourceType);
      }
    } catch {
      alert('Upload failed. Try again.');
    } finally {
      setUploading(false);
    }
  }

  if (block.type === 'paragraph') {
    return (
      <textarea
        rows={4}
        placeholder="Write a paragraph…"
        value={content.text}
        onChange={(e) => onChange({ ...content, text: e.target.value })}
      />
    );
  }

  if (block.type === 'quote') {
    return (
      <>
        <textarea
          rows={2}
          placeholder="Quote text…"
          value={content.text}
          onChange={(e) => onChange({ ...content, text: e.target.value })}
        />
        <input
          type="text"
          placeholder="Attribution (optional)"
          value={content.attribution}
          onChange={(e) => onChange({ ...content, attribution: e.target.value })}
        />
      </>
    );
  }

  if (block.type === 'image') {
    return (
      <>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {uploading && <span>Uploading…</span>}
        {content.url && <img src={content.url} alt={content.alt || ''} style={{ maxWidth: '200px' }} />}
        <input
          type="text"
          placeholder="Caption (optional)"
          value={content.caption}
          onChange={(e) => onChange({ ...content, caption: e.target.value })}
        />
        <input
          type="text"
          placeholder="Alt text"
          value={content.alt}
          onChange={(e) => onChange({ ...content, alt: e.target.value })}
        />
      </>
    );
  }

  if (block.type === 'music') {
    return (
      <>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        {uploading && <span>Uploading…</span>}
        {content.url && <audio src={content.url} controls />}
        <input
          type="text"
          placeholder="Track title"
          value={content.title}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Artist"
          value={content.artist}
          onChange={(e) => onChange({ ...content, artist: e.target.value })}
        />
      </>
    );
  }

  return null;
}