import { NextResponse } from 'next/server';
import { mockCapacityByRegion } from '@/lib/mockData';

export async function GET() {
  try {
    return NextResponse.json(mockCapacityByRegion);
  } catch (error) {
    console.error('Error fetching capacity by region data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
