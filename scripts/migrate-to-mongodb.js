/**
 * Migration Script: data.json → MongoDB Atlas
 * 
 * Run this script ONCE after setting up MongoDB Atlas to migrate
 * your existing categories and products to the database.
 * 
 * Usage: node scripts/migrate-to-mongodb.js
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local');
  console.log('Please add your MongoDB connection string to .env.local');
  process.exit(1);
}

// Define schema inline for the script
const ProductSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  images: [String],
  variants: [{
    name: String,
    images: [String]
  }],
  details: {
    overview: { type: String, default: '' },
    specifications: { type: mongoose.Schema.Types.Mixed, default: {} },
    features: [String]
  }
}, { _id: false });

const SubSubcategorySchema = new mongoose.Schema({
  slug: String,
  name: String,
  description: { type: String, default: '' },
  products: [ProductSchema]
}, { _id: false });

const SubcategorySchema = new mongoose.Schema({
  slug: String,
  name: String,
  description: { type: String, default: '' },
  subsubcategories: [SubSubcategorySchema],
  products: [ProductSchema],
  showInHero: { type: Boolean, default: false }
}, { _id: false });

const CategorySchema = new mongoose.Schema({
  slug: { type: String, unique: true },
  name: String,
  description: { type: String, default: '' },
  subcategories: [SubcategorySchema]
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);

async function migrate() {
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Read data.json
    const dataPath = path.join(__dirname, '..', 'app', 'data', 'data.json');
    
    if (!fs.existsSync(dataPath)) {
      console.log('⚠️ No data.json found. Nothing to migrate.');
      await mongoose.disconnect();
      return;
    }

    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);

    if (!data.categories || data.categories.length === 0) {
      console.log('⚠️ No categories found in data.json. Nothing to migrate.');
      await mongoose.disconnect();
      return;
    }

    console.log(`📦 Found ${data.categories.length} categories to migrate`);

    // Clear existing data in MongoDB (fresh start)
    await Category.deleteMany({});
    console.log('🗑️ Cleared existing MongoDB data');

    // Insert all categories
    for (const category of data.categories) {
      await Category.create(category);
      const productCount = countProducts(category);
      console.log(`  ✅ Migrated: ${category.name} (${category.subcategories?.length || 0} subcategories, ${productCount} products)`);
    }

    console.log('\n🎉 Migration complete!');
    console.log(`   Total categories: ${data.categories.length}`);
    
    // Verify
    const count = await Category.countDocuments();
    console.log(`   Verified in MongoDB: ${count} categories`);

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

function countProducts(category) {
  let count = 0;
  for (const sub of category.subcategories || []) {
    count += sub.products?.length || 0;
    for (const subsub of sub.subsubcategories || []) {
      count += subsub.products?.length || 0;
    }
  }
  return count;
}

migrate();
