import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Portfolio from '@/lib/models/Portfolio';

/**
 * GET all portfolio items
 * @returns NextResponse with portfolio items array
 */
export async function GET() {
  try {
    await dbConnect();
    
    const portfolioItems = await Portfolio.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json(portfolioItems);
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio items' },
      { status: 500 }
    );
  }
}

/**
 * POST new portfolio item
 * @param request - The incoming request containing portfolio item data
 * @returns NextResponse with created portfolio item
 */
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'category', 'image'];
    for (const field of requiredFields) {
      if (!data[field] || data[field].trim() === '') {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate category
    const validCategories = ['wordpress', 'shopify', 'wix', 'webflow', 'backend', 'mobile', 'frontend', 'nocode', 'api', 'email-templates', 'react', 'nextjs', 'tailwind'];
    if (!validCategories.includes(data.category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${validCategories.join(', ')}` },
        { status: 400 }
      );
    }

    // Clean and validate data
    const portfolioData = {
      title: data.title.trim(),
      description: data.description.trim(),
      category: data.category.trim(),
      highlightKeyword: data.highlightKeyword?.trim() || '',
      image: data.image.trim(),
      technologies: Array.isArray(data.technologies) 
        ? data.technologies.filter((t: any) => t && t.trim()).map((t: any) => t.trim())
        : [],
      demoUrl: data.demoUrl?.trim() || '',
      githubUrl: data.githubUrl?.trim() || '',
      completionDate: data.completionDate?.trim() || '',
      longDescription: data.longDescription?.trim() || '',
      features: Array.isArray(data.features)
        ? data.features.filter((f: any) => f && f.trim()).map((f: any) => f.trim())
        : [],
      process: data.process?.trim() || '',
    };

    // Convert empty strings to undefined for optional fields
    if (portfolioData.demoUrl === '') portfolioData.demoUrl = undefined;
    if (portfolioData.githubUrl === '') portfolioData.githubUrl = undefined;
    if (portfolioData.highlightKeyword === '') portfolioData.highlightKeyword = undefined;
    if (portfolioData.completionDate === '') portfolioData.completionDate = undefined;
    if (portfolioData.longDescription === '') portfolioData.longDescription = undefined;
    if (portfolioData.process === '') portfolioData.process = undefined;

    // Remove ID if provided (it will be generated automatically)
    if (data.id) {
      delete (portfolioData as any).id;
    }

    // Check if item with same title and category already exists
    const existingItem = await Portfolio.findOne({
      title: portfolioData.title,
      category: portfolioData.category
    });

    if (existingItem) {
      return NextResponse.json(
        { error: 'A portfolio item with this title and category already exists' },
        { status: 409 }
      );
    }

    const portfolioItem = new Portfolio(portfolioData);
    await portfolioItem.save();
    
    return NextResponse.json(portfolioItem, { status: 201 });
  } catch (error: any) {
    console.error('Error creating portfolio item:', error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Portfolio item with this ID already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create portfolio item' },
      { status: 500 }
    );
  }
} 