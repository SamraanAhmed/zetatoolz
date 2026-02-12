import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb.js';
import Category from '@/lib/models/Category.js';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    await connectDB();
    
    // Read the data.json file packaged with the deployment
    const dataPath = path.join(process.cwd(), 'app', 'data', 'data.json');
    
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({ error: 'data.json not found' }, { status: 404 });
    }

    const fileContent = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(fileContent);

    if (!data.categories || !Array.isArray(data.categories)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }
    
    // Clear existing data to avoid duplicates
    await Category.deleteMany({});
    
    // Insert new data
    const result = await Category.insertMany(data.categories);
    
    return NextResponse.json({
      success: true,
      message: `Successfully migrated ${result.length} categories`,
      categories: result.map(c => c.name)
    });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
