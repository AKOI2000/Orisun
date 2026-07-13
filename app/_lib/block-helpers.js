export const BLOCK_TYPES = [
  { type: 'paragraph', label: 'Paragraph' },
  { type: 'quote', label: 'Quote' },
  { type: 'image', label: 'Image' },
  { type: 'music', label: 'Music' },
];

export const EMPTY_CONTENT = {
  paragraph: { text: '' },
  quote: { text: '', attribution: '' },
  image: { url: '', caption: '', alt: '' },
  music: { url: '', title: '', artist: '' },
};

let tempId = 0;
export function newTempId() {
  tempId -= 1;
  return `temp-${tempId}`;
}

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/upload', { method: 'POST', body: formData });
  if (!res.ok) throw new Error('Upload failed');

  return res.json(); // { url, publicId, resourceType }
}

export function deleteFile(publicId, resourceType) {
  if (!publicId) return;
  // Best-effort - we don't block the UI waiting for this.
  fetch('/api/upload', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ publicId, resourceType }),
  }).catch(() => {});
}