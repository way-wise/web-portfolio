import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/lib/models/Admin';

/**
 * Test endpoint to debug Coolify deployment issues
 * @returns NextResponse with test results
 */
export async function GET() {
  try {
    console.log('Test endpoint called');
    
    const testData = {
      timestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV,
      mongodbUriSet: !!process.env.MONGODB_URI,
      platform: process.platform,
      nodeVersion: process.version,
    };

    // Test database connection
    try {
      await dbConnect();
      console.log('Database connection test successful');
      
      // Test admin collection
      const adminCount = await Admin.countDocuments();
      console.log(`Admin count: ${adminCount}`);
      
      return NextResponse.json({
        success: true,
        message: 'All tests passed',
        data: {
          ...testData,
          databaseConnected: true,
          adminCount,
        }
      });
    } catch (dbError) {
      console.error('Database test failed:', dbError);
      return NextResponse.json({
        success: false,
        message: 'Database test failed',
        data: {
          ...testData,
          databaseConnected: false,
          dbError: dbError instanceof Error ? dbError.message : 'Unknown database error'
        }
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json({
      success: false,
      message: 'Test endpoint error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 