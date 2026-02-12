import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb.js';
import Category from '@/lib/models/Category.js';

export async function GET() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await connectDB();
    console.log('Connected! Attempting to query...');
    
    const count = await Category.countDocuments();
    console.log(`Found ${count} categories`);
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      categoryCount: count
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      errorName: error.name,
      errorStack: error.stack
    }, { status: 500 });
  }
}
