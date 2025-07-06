import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Portfolio from '@/lib/models/Portfolio';

/**
 * GET single portfolio item by ID
 * @param request - The incoming request
 * @param params - Route parameters containing the item ID
 * @returns NextResponse with portfolio item or error
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    if (!params.id) {
      return NextResponse.json(
        { error: 'Portfolio item ID is required' },
        { status: 400 }
      );
    }

    const portfolioItem = await Portfolio.findOne({ id: params.id }).lean();
    
    if (!portfolioItem) {
      return NextResponse.json(
        { error: 'Portfolio item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(portfolioItem);
  } catch (error) {
    console.error('Error fetching portfolio item:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio item' },
      { status: 500 }
    );
  }
}

/**
 * PUT update portfolio item by ID
 * @param request - The incoming request containing updated data
 * @param params - Route parameters containing the item ID
 * @returns NextResponse with updated portfolio item or error
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    if (!params.id) {
      return NextResponse.json(
        { error: 'Portfolio item ID is required' },
        { status: 400 }
      );
    }

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
    const validCategories = ['wordpress', 'shopify', 'wix', 'webflow', 'backend', 'mobile', 'frontend', 'nocode', 'api'];
    if (!validCategories.includes(data.category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${validCategories.join(', ')}` },
        { status: 400 }
      );
    }

    // Clean and validate data
    const updateData = {
      title: data.title.trim(),
      description: data.description.trim(),
      category: data.category.trim(),
      highlightKeyword: data.highlightKeyword?.trim() || '',
      image: data.image.trim(),
      technologies: Array.isArray(data.technologies) 
        ? data.technologies.filter(t => t && t.trim()).map(t => t.trim())
        : [],
      demoUrl: data.demoUrl?.trim() || '',
      githubUrl: data.githubUrl?.trim() || '',
      completionDate: data.completionDate?.trim() || '',
      longDescription: data.longDescription?.trim() || '',
      features: Array.isArray(data.features)
        ? data.features.filter(f => f && f.trim()).map(f => f.trim())
        : [],
      process: data.process?.trim() || '',
    };

    // Check if another item with same title and category already exists (excluding current item)
    const existingItem = await Portfolio.findOne({
      title: updateData.title,
      category: updateData.category,
      id: { $ne: params.id }
    });

    if (existingItem) {
      return NextResponse.json(
        { error: 'A portfolio item with this title and category already exists' },
        { status: 409 }
      );
    }
    
    const portfolioItem = await Portfolio.findOneAndUpdate(
      { id: params.id },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!portfolioItem) {
      return NextResponse.json(
        { error: 'Portfolio item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(portfolioItem);
  } catch (error: any) {
    console.error('Error updating portfolio item:', error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update portfolio item' },
      { status: 500 }
    );
  }
}

/**
 * DELETE portfolio item by ID
 * @param request - The incoming request
 * @param params - Route parameters containing the item ID
 * @returns NextResponse with success message or error
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    if (!params.id) {
      return NextResponse.json(
        { error: 'Portfolio item ID is required' },
        { status: 400 }
      );
    }

    const portfolioItem = await Portfolio.findOneAndDelete({ id: params.id });
    
    if (!portfolioItem) {
      return NextResponse.json(
        { error: 'Portfolio item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Portfolio item deleted successfully',
      deletedItem: {
        id: portfolioItem.id,
        title: portfolioItem.title,
        category: portfolioItem.category
      }
    });
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    return NextResponse.json(
      { error: 'Failed to delete portfolio item' },
      { status: 500 }
    );
  }
} 