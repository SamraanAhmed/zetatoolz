import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    mongodbSet: !!process.env.MONGODB_URI,
    cloudinaryNameSet: !!process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryKeySet: !!process.env.CLOUDINARY_API_KEY,
    cloudinarySecretSet: !!process.env.CLOUDINARY_API_SECRET,
    mongodbPreview: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 30) + '...' : 'NOT SET',
  });
}
