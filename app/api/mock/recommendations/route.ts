import { NextRequest, NextResponse } from 'next/server';
import { generateMockRecommendations } from '@/lib/mockData';
import { recommendationSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = recommendationSchema.parse(body);
    
    // Generate recommendations based on criteria
    const recommendations = generateMockRecommendations(validatedData);
    
    return NextResponse.json(recommendations);
  } catch (error: any) {
    console.error('Error generating recommendations:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
