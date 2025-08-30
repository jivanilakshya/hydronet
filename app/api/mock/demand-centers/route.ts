import { NextResponse } from 'next/server';
import { mockDemandCenters } from '@/lib/mockData';

export async function GET() {
  try {
    return NextResponse.json(mockDemandCenters);
  } catch (error) {
    console.error('Error fetching demand centers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
