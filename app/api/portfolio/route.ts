import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Portfolio from '@/lib/models/Portfolio';

// GET all portfolio items
export async function GET() {
  try {
    await dbConnect();
    const portfolioItems = await Portfolio.find({}).sort({ createdAt: -1 });
    return NextResponse.json(portfolioItems);
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio items' },
      { status: 500 }
    );
  }
}

// POST new portfolio item
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    
    // Generate unique ID if not provided
    if (!data.id) {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000);
      data.id = `${data.category}-${timestamp}-${random}`;
    }

    const portfolioItem = new Portfolio(data);
    await portfolioItem.save();
    
    return NextResponse.json(portfolioItem, { status: 201 });
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    return NextResponse.json(
      { error: 'Failed to create portfolio item' },
      { status: 500 }
    );
  }
} 