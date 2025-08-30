import { NextResponse } from 'next/server';
import { mockTransportRoutes } from '@/lib/mockData';

export async function GET() {
  try {
    return NextResponse.json(mockTransportRoutes);
  } catch (error) {
    console.error('Error fetching transport routes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
