import { NextRequest, NextResponse } from 'next/server';
import { mockAssets } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');

    let filteredAssets = mockAssets.features;

    if (type) {
      filteredAssets = filteredAssets.filter(asset => asset.properties.type === type);
    }

    if (status) {
      filteredAssets = filteredAssets.filter(asset => asset.properties.status === status);
    }

    return NextResponse.json({
      type: 'FeatureCollection',
      features: filteredAssets,
    });
  } catch (error) {
    console.error('Error fetching assets:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
