# 🚀 Vercel + MongoDB + Cloudinary Setup Guide

## Step-by-Step Deployment Guide for Zeta Tools

---

## ✅ Step 1: Create MongoDB Atlas Account (Database)

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Click **"Try Free"** → Sign up
3. Create a **FREE cluster** (M0 Shared)
   - Provider: AWS
   - Region: **London (eu-west-2)** (closest to your hosting)
   - Cluster Name: `zetatoolz`
4. **Create Database User:**
   - Click "Database Access" → "Add New Database User"
   - Username: `zetatoolz`
   - Password: Choose a strong password (SAVE IT!)
   - Role: "Atlas admin"
5. **Allow Network Access:**
   - Click "Network Access" → "Add IP Address"
   - Click **"Allow Access from Anywhere"** (adds 0.0.0.0/0)
   - This is required for Vercel to connect
6. **Get Connection String:**
   - Click "Database" → "Connect" → "Drivers"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Replace `<dbname>` with `zetatoolz`
   - Example: `mongodb+srv://zetatoolz:MyPassword123@cluster0.abc123.mongodb.net/zetatoolz?retryWrites=true&w=majority`

---

## ✅ Step 2: Create Cloudinary Account (Image Storage)

1. Go to [cloudinary.com](https://cloudinary.com)
2. Click **"Sign Up for Free"**
3. After signup, go to **Dashboard**
4. Note down these values:
   - **Cloud Name**: `dxxxxxxx`
   - **API Key**: `123456789012345`
   - **API Secret**: `abcdefghijklmnop...`

---

## ✅ Step 3: Update Your .env.local File

Open the file `e:\Synix\zetatoolz\.env.local` and replace the placeholder values:

```env
MONGODB_URI=mongodb+srv://zetatoolz:YOUR_ACTUAL_PASSWORD@cluster0.xxxxx.mongodb.net/zetatoolz?retryWrites=true&w=majority

CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

---

## ✅ Step 4: Migrate Existing Data to MongoDB

Run this command in your project folder:

```bash
cd e:\Synix\zetatoolz
node scripts/migrate-to-mongodb.js
```

You should see:
```
🔄 Connecting to MongoDB Atlas...
✅ Connected to MongoDB Atlas
📦 Found 3 categories to migrate
  ✅ Migrated: Beauty Instruments (15 subcategories, 1 products)
  ✅ Migrated: Embroidery (5 subcategories, 0 products)
  ✅ Migrated: Dental Instruments (1 subcategories, 0 products)
🎉 Migration complete!
```

---

## ✅ Step 5: Test Locally

```bash
cd e:\Synix\zetatoolz
npm run dev
```

- Open: http://localhost:3000
- Test admin: http://localhost:3000/admin
- Try adding a product with image upload

---

## ✅ Step 6: Push to GitHub

```bash
cd e:\Synix\zetatoolz
git add .
git commit -m "Migrate to MongoDB + Cloudinary for Vercel deployment"
git push origin main
```

---

## ✅ Step 7: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with **GitHub**
3. Click **"Add New..." → "Project"**
4. Import your `zetatoolz` repository
5. **IMPORTANT - Add Environment Variables:**
   - Click "Environment Variables"
   - Add each variable:
     - `MONGODB_URI` = your MongoDB connection string
     - `CLOUDINARY_CLOUD_NAME` = your cloud name
     - `CLOUDINARY_API_KEY` = your API key
     - `CLOUDINARY_API_SECRET` = your API secret
6. Click **"Deploy"**

---

## ✅ Step 8: Connect Your Domain

1. In Vercel dashboard → Your project → **Settings** → **Domains**
2. Add: `zetatoolz.com`
3. Vercel will show you DNS records to add
4. Go to your hosting panel → **Manage DNS**
5. Add the records Vercel tells you to add
6. Wait for DNS propagation (5-30 minutes)

---

## 🎉 Done!

Your site is now live at:
- **Website:** `https://zetatoolz.com`
- **Admin Panel:** `https://zetatoolz.com/admin`
- **Password:** `DSmughalskt1967pakistan`

---

## 📊 Architecture

```
Client Browser
    ↕
Vercel (Next.js App)    ← Free hosting
    ↕                ↕
MongoDB Atlas        Cloudinary
(categories,         (product images)
 products data)      ← Free 25GB storage
← Free 512MB
```

---

## 🔧 Troubleshooting

### MongoDB Connection Error
- Check your MONGODB_URI in Vercel environment variables
- Make sure you allowed 0.0.0.0/0 in Network Access
- Verify password has no special characters that need encoding

### Image Upload Fails
- Check Cloudinary credentials in Vercel environment variables
- Check Cloudinary dashboard for usage limits

### Build Fails on Vercel
- Check build logs in Vercel dashboard
- Make sure all environment variables are set
- Try running `npm run build` locally first
