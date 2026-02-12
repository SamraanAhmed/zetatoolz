import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb.js';
import Category from '../../../../lib/models/Category.js';
import { deleteImage } from '../../../../lib/cloudinary.js';

// GET - Retrieve all data
export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find({}).lean();
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error reading data:', error);
    return NextResponse.json(
      { error: 'Failed to read data' },
      { status: 500 }
    );
  }
}

// Helper function to delete product images from Cloudinary
async function deleteProductImages(product) {
  try {
    // Delete all product images
    if (product.images && Array.isArray(product.images)) {
      for (const imageUrl of product.images) {
        if (imageUrl && imageUrl.includes('cloudinary.com')) {
          await deleteImage(imageUrl);
        }
      }
    }
    
    // Delete variant images if they exist
    if (product.variants && Array.isArray(product.variants)) {
      for (const variant of product.variants) {
        if (variant.images && Array.isArray(variant.images)) {
          for (const imageUrl of variant.images) {
            if (imageUrl && imageUrl.includes('cloudinary.com')) {
              await deleteImage(imageUrl);
            }
          }
        }
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting product images:', error);
    return false;
  }
}

// POST - Add or update data
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { action, categorySlug, subcategorySlug, subsubcategorySlug, data: newData } = body;

    switch (action) {
      case 'add-category': {
        const { slug, name, description } = newData;
        
        // Check if category already exists
        const existing = await Category.findOne({ slug });
        if (existing) {
          return NextResponse.json(
            { error: 'Category already exists' },
            { status: 400 }
          );
        }

        await Category.create({
          slug,
          name,
          description,
          subcategories: []
        });
        break;
      }

      case 'add-subcategory': {
        const { slug, name, description } = newData;
        const category = await Category.findOne({ slug: categorySlug });
        
        if (!category) {
          return NextResponse.json(
            { error: 'Category not found' },
            { status: 404 }
          );
        }

        // Check if subcategory already exists
        if (category.subcategories.find(s => s.slug === slug)) {
          return NextResponse.json(
            { error: 'Subcategory already exists' },
            { status: 400 }
          );
        }

        category.subcategories.push({
          slug,
          name,
          description,
          subsubcategories: []
        });
        await category.save();
        break;
      }

      case 'add-subsubcategory': {
        const { slug, name, description } = newData;
        const category = await Category.findOne({ slug: categorySlug });
        
        if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 });

        const subcategory = category.subcategories.find(s => s.slug === subcategorySlug);
        if (!subcategory) return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });

        if (!subcategory.subsubcategories) subcategory.subsubcategories = [];

        if (subcategory.subsubcategories.find(s => s.slug === slug)) {
          return NextResponse.json({ error: 'Sub-subcategory already exists' }, { status: 400 });
        }

        subcategory.subsubcategories.push({
          slug,
          name,
          description,
          products: []
        });
        await category.save();
        break;
      }

      case 'add-product': {
        const category = await Category.findOne({ slug: categorySlug });
        if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 });

        const subcategory = category.subcategories.find(s => s.slug === subcategorySlug);
        if (!subcategory) return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });

        const product = {
          id: newData.id,
          name: newData.name,
          description: newData.description,
          image: newData.image,
          images: newData.images || [newData.image],
          variants: newData.variants || [],
          details: {
            overview: newData.overview || newData.description,
            specifications: newData.specifications || {},
            features: newData.features || []
          }
        };

        // If subsubcategorySlug is provided, add to sub-subcategory
        if (subsubcategorySlug) {
          const subsubcategory = subcategory.subsubcategories?.find(s => s.slug === subsubcategorySlug);
          if (!subsubcategory) return NextResponse.json({ error: 'Sub-subcategory not found' }, { status: 404 });

          if (subsubcategory.products.find(p => p.id === product.id)) {
            return NextResponse.json({ error: 'Product ID already exists' }, { status: 400 });
          }

          subsubcategory.products.push(product);
        } else {
          // Add directly to subcategory
          if (!subcategory.products) subcategory.products = [];
          
          if (subcategory.products.find(p => p.id === product.id)) {
            return NextResponse.json({ error: 'Product ID already exists in this subcategory' }, { status: 400 });
          }

          subcategory.products.push(product);
        }
        await category.save();
        break;
      }

      case 'update-product': {
        const category = await Category.findOne({ slug: categorySlug });
        if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 });

        const subcategory = category.subcategories.find(s => s.slug === subcategorySlug);
        if (!subcategory) return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });

        const subsubcategory = subcategory.subsubcategories?.find(s => s.slug === subsubcategorySlug);
        if (!subsubcategory) return NextResponse.json({ error: 'Sub-subcategory not found' }, { status: 404 });

        const productIndex = subsubcategory.products.findIndex(p => p.id === newData.id);
        if (productIndex === -1) {
          return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        subsubcategory.products[productIndex] = {
          id: newData.id,
          name: newData.name,
          description: newData.description,
          image: newData.image,
          details: {
            overview: newData.overview || newData.description,
            specifications: newData.specifications || {},
            features: newData.features || []
          }
        };
        await category.save();
        break;
      }

      case 'delete-product': {
        const { productId } = newData;
        const category = await Category.findOne({ slug: categorySlug });
        if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 });

        const subcategory = category.subcategories.find(s => s.slug === subcategorySlug);
        if (!subcategory) return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });

        let productToDelete = null;
        
        if (subsubcategorySlug) {
          const subsubcategory = subcategory.subsubcategories?.find(s => s.slug === subsubcategorySlug);
          if (!subsubcategory) return NextResponse.json({ error: 'Sub-subcategory not found' }, { status: 404 });

          productToDelete = subsubcategory.products.find(p => p.id === productId);
          
          if (productToDelete) {
            await deleteProductImages(productToDelete);
          }
          
          subsubcategory.products = subsubcategory.products.filter(p => p.id !== productId);
        } else {
          if (subcategory.products) {
            productToDelete = subcategory.products.find(p => p.id === productId);
            
            if (productToDelete) {
              await deleteProductImages(productToDelete);
            }
            
            subcategory.products = subcategory.products.filter(p => p.id !== productId);
          }
        }
        await category.save();
        break;
      }

      case 'delete-category': {
        const { slug } = newData;
        const result = await Category.deleteOne({ slug });
        
        if (result.deletedCount === 0) {
          return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }
        break;
      }

      case 'delete-subcategory': {
        const category = await Category.findOne({ slug: categorySlug });
        if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 });

        const { slug } = newData;
        const subcategoryIndex = category.subcategories.findIndex(s => s.slug === slug);
        
        if (subcategoryIndex === -1) {
          return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
        }

        category.subcategories.splice(subcategoryIndex, 1);
        await category.save();
        break;
      }

      case 'delete-subsubcategory': {
        const category = await Category.findOne({ slug: categorySlug });
        if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 });

        const subcategory = category.subcategories.find(s => s.slug === subcategorySlug);
        if (!subcategory) return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });

        const { slug } = newData;
        const subSubIndex = subcategory.subsubcategories?.findIndex(s => s.slug === slug);

        if (subSubIndex === undefined || subSubIndex === -1) {
             return NextResponse.json({ error: 'Sub-subcategory not found' }, { status: 404 });
        }

        subcategory.subsubcategories.splice(subSubIndex, 1);
        await category.save();
        break;
      }

      case 'toggle-hero-subcategory': {
        const { showInHero } = body;
        const category = await Category.findOne({ slug: categorySlug });
        if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 });

        const subcategory = category.subcategories.find(s => s.slug === subcategorySlug);
        if (!subcategory) return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });

        // If enabling, check if limit of 3 is reached for this category
        if (showInHero) {
          const currentFeaturedCount = category.subcategories.filter(s => s.showInHero).length;
          if (currentFeaturedCount >= 3) {
            return NextResponse.json({ 
              error: 'Maximum 3 subcategories can be featured in hero section per category' 
            }, { status: 400 });
          }
        }

        // Toggle the showInHero property
        subcategory.showInHero = showInHero;
        await category.save();
        break;
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    // Return updated data
    const categories = await Category.find({}).lean();
    return NextResponse.json({
      success: true,
      message: 'Data updated successfully',
      data: { categories }
    });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
