import { NextResponse } from 'next/server';
import { mockSupplyDemandData } from '@/lib/mockData';

export async function GET() {
  try {
    return NextResponse.json(mockSupplyDemandData);
  } catch (error) {
    console.error('Error fetching supply-demand data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
