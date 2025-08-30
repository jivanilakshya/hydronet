import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { User } from '@/lib/models';
import { verifyToken, extractTokenFromCookie } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Extract token from cookie
    const cookieHeader = request.headers.get('cookie');
    const token = extractTokenFromCookie(cookieHeader || undefined);

    if (!token) {
      return NextResponse.json(
        { error: 'No authentication token found' },
        { status: 401 }
      );
    }

    // Verify token
    const payload = verifyToken(token);

    // Connect to database
    await connectDB();

    // Find user
    const user = await User.findById(payload.userId).select('-passwordHash');
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          lastLoginAt: user.lastLoginAt,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Auth verification error:', error);
    
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
