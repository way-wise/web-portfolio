import { NextResponse } from 'next/server';

/**
 * Get deployment IP address for MongoDB Atlas whitelisting
 * @returns NextResponse with IP information
 */
export async function GET() {
  try {
    // Get IP from various sources
    const ipSources = {
      // If behind a proxy/load balancer
      xForwardedFor: process.env.HTTP_X_FORWARDED_FOR || 'Not set',
      xRealIp: process.env.HTTP_X_REAL_IP || 'Not set',
      // Direct IP (if available)
      remoteAddr: process.env.REMOTE_ADDR || 'Not set',
    };

    return NextResponse.json({
      success: true,
      message: 'IP information for MongoDB Atlas whitelisting',
      data: {
        timestamp: new Date().toISOString(),
        ipSources,
        instructions: [
          '1. Go to MongoDB Atlas Dashboard',
          '2. Navigate to Network Access',
          '3. Click "Add IP Address"',
          '4. Add your Coolify deployment IP',
          '5. Or temporarily allow all IPs (0.0.0.0/0) for testing'
        ]
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to get IP information',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 