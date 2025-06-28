import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Portfolio from '@/lib/models/Portfolio';
import Admin from '@/lib/models/Admin';
import bcrypt from 'bcryptjs';
import { portfolioItems } from '@/lib/portfolio-data';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    // Create admin user if it doesn't exist
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await Admin.create({
        username: 'admin',
        password: hashedPassword,
      });
      console.log('Admin user created');
    }

    // Clear existing portfolio items
    await Portfolio.deleteMany({});
    
    // Insert portfolio items
    const result = await Portfolio.insertMany(portfolioItems);
    
    return NextResponse.json({
      message: 'Database seeded successfully',
      portfolioItemsCount: result.length,
      adminCredentials: {
        username: 'admin',
        password: 'admin123',
      },
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
} 