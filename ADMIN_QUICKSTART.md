# Admin Dashboard - Quick Start

## 🚀 Access Your Admin Panel

Your admin dashboard is now ready! Access it at:

**URL:** `http://localhost:3000/admin`

**Default Password:** `admin123`

## ✨ What's Been Added

### 1. **API Routes** (Backend)
   - `/api/admin/data` - Manages all category, subcategory, and product data
   - `/api/admin/upload` - Handles image uploads

### 2. **Admin Dashboard** (`/admin`)
   - **Password Protected** - Secure login page
   - **Category Management** - Add and view categories
   - **Subcategory Management** - Add subcategories with hierarchical selection
   - **Product Management** - Full product creation with:
     - Category → Subcategory selection
     - Product details (ID, SKU, Name, Price)
     - Image upload (auto-saved to `/public/images/products/`)
     - Specifications builder (key-value pairs)
     - Features list builder
     - Description and overview fields

### 3. **Features**
   ✅ Auto-slug generation from names
   ✅ Real-time notifications (success/error)
   ✅ Image upload with preview
   ✅ Hierarchical data management
   ✅ Validation (no duplicates, required fields)
   ✅ Clean teal/white UI matching your site
   ✅ Lists of existing data for reference
   ✅ Responsive design

## 📝 Quick Usage

### Add a Category
1. Go to admin → Categories tab
2. Enter name (slug auto-generates)
3. Add description and image (optional)
4. Click "Add Category"

### Add a Subcategory
1. Go to admin → Subcategories tab
2. Select parent category
3. Enter name, description, and upload image
4. Click "Add Subcategory"

### Add a Product
1. Go to admin → Products tab
2. Select category and subcategory
3. Fill in product details:
   - ID (e.g., BI-CN-004)
   - SKU (usually same as ID)
   - Name, price, description
4. Add specifications (Material, Finish, etc.)
5. Add features (bullet points)
6. Upload product image
7. Click "Add Product"

## 🔐 Security Notes

**IMPORTANT:** Change the password before production!

Edit `/app/admin/page.js` line 54:
```javascript
if (password === 'YOUR_NEW_PASSWORD') {
```

For production, consider implementing:
- Environment variables for password
- Proper authentication (JWT, OAuth)
- Role-based access control
- CSRF protection

## 📁 Data Storage

- **JSON Data:** `/app/data/data.json`
- **Uploaded Images:** `/public/images/products/`

All changes are immediately saved to the data file and reflected on your website!

## 🎨 UI Design

The dashboard uses your site's color palette:
- Primary: Cyan (#00afef)
- Secondary: Blue gradient
- Clean, modern interface
- Success notifications in green
- Error notifications in red

## 📖 Full Documentation

See `ADMIN_GUIDE.md` for detailed instructions and troubleshooting.

## 🧪 Testing

Your dev server is running. Visit:
- Main site: `http://localhost:3000`
- Admin panel: `http://localhost:3000/admin`

Try adding a test product to see it appear on your site immediately!
