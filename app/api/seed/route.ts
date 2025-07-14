import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/lib/models/Admin';
import bcrypt from 'bcryptjs';
import { portfolioItems } from '@/lib/portfolio-data';
import mongoose from 'mongoose';

/**
 * Handle database seeding requests
 * @param request - The incoming request object
 * @returns NextResponse with seeding result
 */
export async function POST(request: NextRequest) {
  try {
    console.log('Database seeding initiated');
    
    // Connect to database
    await dbConnect();
    console.log('Database connected successfully for seeding');
    
    // Create admin user if it doesn't exist
    console.log('Checking for existing admin user');
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (!existingAdmin) {
      console.log('Creating new admin user');
      let hashedPassword: string;
      try {
        hashedPassword = await bcrypt.hash('admin123', 10);
      } catch (bcryptError) {
        console.error('Bcrypt hashing error:', bcryptError);
        return NextResponse.json(
          { error: 'Failed to hash password' },
          { status: 500 }
        );
      }
      await Admin.create({
        username: 'admin',
        password: hashedPassword,
      });
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    // Clear existing portfolio items and force model refresh
    console.log('Clearing existing portfolio items');
    
    // Force delete the existing model to clear cache
    if (mongoose.models.Portfolio) {
      delete mongoose.models.Portfolio;
    }
    
    // Re-import the Portfolio model
    const Portfolio = (await import('@/lib/models/Portfolio')).default;
    
    const deleteResult = await Portfolio.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing portfolio items`);
    
    // Insert portfolio items
    console.log(`Inserting ${portfolioItems.length} portfolio items`);
    const result = await Portfolio.insertMany(portfolioItems);
    console.log(`Successfully inserted ${result.length} portfolio items`);
    
    return NextResponse.json({
      message: 'Database seeded successfully',
      portfolioItemsCount: result.length,
      deletedItemsCount: deleteResult.deletedCount,
      adminCredentials: {
        username: 'admin',
        password: 'admin123',
      },
    });
  } catch (error) {
    console.error('Error seeding database:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to seed database',
        details: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
      },
      { status: 500 }
    );
  }
} 