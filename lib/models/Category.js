import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  images: [{ type: String }],
  variants: [{
    name: { type: String },
    images: [{ type: String }]
  }],
  details: {
    overview: { type: String, default: '' },
    specifications: { type: mongoose.Schema.Types.Mixed, default: {} },
    features: [{ type: String }]
  }
}, { _id: false });

const SubSubcategorySchema = new mongoose.Schema({
  slug: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  products: [ProductSchema]
}, { _id: false });

const SubcategorySchema = new mongoose.Schema({
  slug: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  subsubcategories: [SubSubcategorySchema],
  products: [ProductSchema],
  showInHero: { type: Boolean, default: false }
}, { _id: false });

const CategorySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  subcategories: [SubcategorySchema]
}, { timestamps: true });

// Prevent model recompilation in dev mode
export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
