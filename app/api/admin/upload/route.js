import { NextResponse } from 'next/server';
import { uploadImage } from '../../../lib/cloudinary';

/**
 * Enhanced Image Upload API - Cloudinary Edition
 * 
 * Uploads images to Cloudinary with organized folder structure:
 * - Categories: zetatoolz/categories/{categorySlug}/
 * - Products: zetatoolz/products/{categorySlug}/{subcategorySlug}/{productId}/
 */

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const uploadType = formData.get('uploadType') || 'product';
    const categorySlug = formData.get('categorySlug') || '';
    const subcategorySlug = formData.get('subcategorySlug') || '';
    const subsubcategorySlug = formData.get('subsubcategorySlug') || '';
    const productId = formData.get('productId') || '';

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Build Cloudinary folder path based on upload type
    let folderPath = 'general';
    
    switch (uploadType) {
      case 'category':
        folderPath = `categories/${categorySlug || 'uncategorized'}`;
        break;
      case 'subcategory':
        folderPath = `categories/${categorySlug}/subcategories/${subcategorySlug || 'uncategorized'}`;
        break;
      case 'subsubcategory':
        folderPath = `categories/${categorySlug}/subcategories/${subcategorySlug}/subsubcategories/${subsubcategorySlug || 'uncategorized'}`;
        break;
      case 'product':
      default:
        folderPath = `products/${categorySlug}/${subcategorySlug}/${subsubcategorySlug}/${productId || 'temp'}`;
        break;
    }

    // Generate clean filename
    const originalName = file.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.-]/g, '_');

    // Upload to Cloudinary
    const result = await uploadImage(buffer, folderPath, originalName);

    console.log(`✅ Image uploaded to Cloudinary: ${result.url}`);

    return NextResponse.json({
      success: true,
      path: result.url,         // Cloudinary URL
      publicId: result.publicId, // For deletion later
      filename: originalName,
      uploadType: uploadType
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file: ' + error.message },
      { status: 500 }
    );
  }
}
