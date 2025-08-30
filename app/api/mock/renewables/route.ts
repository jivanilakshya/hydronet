import { NextResponse } from 'next/server';
import { mockRenewables } from '@/lib/mockData';

export async function GET() {
  try {
    return NextResponse.json(mockRenewables);
  } catch (error) {
    console.error('Error fetching renewables:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
