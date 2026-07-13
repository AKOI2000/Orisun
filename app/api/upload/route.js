import { NextResponse } from 'next/server';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const result = await uploadToCloudinary(buffer);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed. Try again.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const { publicId, resourceType } = await request.json();
  await deleteFromCloudinary(publicId, resourceType);
  return NextResponse.json({ ok: true });
}