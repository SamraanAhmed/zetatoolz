import { NextResponse } from 'next/server';
import crypto from 'crypto';

const ADMIN_PASSWORD_HASH = 'e8f9a3d27c6b8f4e5d1a2b9c7f0e6d3a8c4b2e1f9d7a5c3b8e6d4f2a1c9e7b5d3';

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    const hashedInput = hashPassword(password);
    
    if (hashedInput === ADMIN_PASSWORD_HASH) {
      return NextResponse.json({ 
        success: true,
        message: 'Authentication successful' 
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
