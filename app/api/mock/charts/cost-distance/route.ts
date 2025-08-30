import { NextResponse } from 'next/server';
import { mockCostDistanceData } from '@/lib/mockData';

export async function GET() {
  try {
    return NextResponse.json(mockCostDistanceData);
  } catch (error) {
    console.error('Error fetching cost-distance data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
