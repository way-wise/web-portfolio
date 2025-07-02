import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import Admin from '@/lib/models/Admin';

/**
 * Handle admin login requests
 * @param request - The incoming request object
 * @returns NextResponse with login result
 */
export async function POST(request: NextRequest) {
  try {
    console.log('Login attempt initiated');
    
    // Connect to database
    await dbConnect();
    console.log('Database connected successfully');
    
    const { username, password } = await request.json();

    if (!username || !password) {
      console.log('Missing credentials in request');
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    console.log(`Attempting login for username: ${username}`);

    const admin = await Admin.findOne({ username });

    if (!admin) {
      console.log(`Admin not found for username: ${username}`);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Handle bcrypt comparison with better error handling
    let isPasswordValid = false;
    try {
      isPasswordValid = await bcrypt.compare(password, admin.password);
    } catch (bcryptError) {
      console.error('Bcrypt comparison error:', bcryptError);
      return NextResponse.json(
        { error: 'Authentication service error' },
        { status: 500 }
      );
    }

    if (!isPasswordValid) {
      console.log(`Invalid password for username: ${username}`);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log(`Successful login for username: ${username}`);
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error('Login error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV,
      mongodbUri: process.env.MONGODB_URI ? 'Set' : 'Not set'
    });
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
      },
      { status: 500 }
    );
  }
} 