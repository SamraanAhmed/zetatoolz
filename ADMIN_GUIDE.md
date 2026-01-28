# Admin Dashboard Guide

## Access

Navigate to: `http://localhost:3000/admin`

**Default Password:** `admin123`

> ⚠️ **Important:** Change the password in `/app/admin/page.js` line 54 for production use!

## Features

### 1. Category Management
- Add new main categories
- Auto-generates URL-friendly slugs
- Upload category images
- View all existing categories

### 2. Subcategory Management
- Add subcategories under existing categories
- Hierarchical dropdown selection
- Auto-slug generation
- Image upload support
- View subcategories organized by parent category

### 3. Product Management
- Full product creation with all details
- Hierarchical category → subcategory selection
- Product ID and SKU fields
- Price options: "Market Rate" or "Contact for Quote"
- Image upload (required)
- Specifications builder (key-value pairs)
- Features list builder
- Overview field (optional, defaults to description)

## How to Use

### Adding a Category

1. Go to the **Categories** tab
2. Fill in:
   - Category Name (e.g., "Beauty Instruments")
   - Slug (auto-generated, but editable)
   - Description (optional)
   - Upload an image (optional)
3. Click "Add Category"

### Adding a Subcategory

1. Go to the **Subcategories** tab
2. Select the parent category from the dropdown
3. Fill in:
   - Subcategory Name (e.g., "Cuticle Nippers")
   - Slug (auto-generated)
   - Description (optional)
   - Upload an image (optional)
4. Click "Add Subcategory"

### Adding a Product

1. Go to the **Products** tab
2. Select Category and Subcategory
3. Fill in basic info:
   - Product ID (e.g., "BI-CN-001")
   - SKU (usually same as ID)
   - Product Name
   - Price (select Market Rate or Contact for Quote)
   - Description
   - Overview (optional)
4. Add Specifications:
   - Enter Key (e.g., "Material")
   - Enter Value (e.g., "Stainless Steel")
   - Click "Add"
   - Repeat for multiple specs
5. Add Features:
   - Enter feature text
   - Click "Add"
   - Repeat for multiple features
6. Upload Product Image (required)
7. Click "Add Product"

## Data Storage

All data is saved to: `/app/data/data.json`

Images are uploaded to: `/public/images/products/`

## Notifications

- ✅ **Green notifications** = Success
- ❌ **Red notifications** = Error
- Notifications auto-dismiss after 5 seconds

## Tips

- **Slugs** should be lowercase with hyphens (e.g., `beauty-instruments`)
- **Product IDs** use a pattern like `CATEGORY-SUBCATEGORY-NUMBER` (e.g., `BI-CN-001`)
- **Images** are automatically saved with timestamps to prevent conflicts
- **Specifications** are flexible key-value pairs (Material, Finish, Length, etc.)
- **Features** are bullet points displayed on product pages

## Security Notes

⚠️ **For Production:**

1. Change the admin password in the code
2. Consider implementing proper authentication (JWT, OAuth, etc.)
3. Add role-based access control
4. Use environment variables for sensitive data
5. Add CSRF protection
6. Implement rate limiting

## Troubleshooting

**"Failed to upload image"**
- Check that `/public/images/products/` directory exists
- Ensure file size is reasonable (< 5MB)
- Verify file format is supported (jpg, png, gif, webp)

**"Category/Subcategory already exists"**
- Each slug must be unique
- Try a different name or manually edit the slug

**"Product ID already exists"**
- Product IDs must be unique across all products
- Use a sequential numbering system

## API Endpoints

### Data Management
- `GET /api/admin/data` - Retrieve all data
- `POST /api/admin/data` - Add/update data

### Image Upload
- `POST /api/admin/upload` - Upload images

## Need Help?

The dashboard automatically displays:
- Existing categories with subcategory count
- Existing subcategories organized by category
- Existing products with images and details

Use these lists to ensure consistency when adding new items.
