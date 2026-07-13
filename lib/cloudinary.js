import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Uploads a file buffer to Cloudinary. Returns the URL plus the identifiers
// needed to delete it later (public_id + resource_type - Cloudinary requires
// both, since deleting an image vs. an audio file uses different endpoints).
export function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto', folder: 'orisun' },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          resourceType: result.resource_type,
        });
      }
    );
    stream.end(buffer);
  });
}

// Deletes a previously uploaded file. Safe to call even if the id is
// invalid or already gone - callers treat this as best-effort cleanup.
export async function deleteFromCloudinary(publicId, resourceType) {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType || 'image' });
}