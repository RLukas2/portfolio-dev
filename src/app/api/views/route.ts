import { NextResponse } from 'next/server';

import { getAllViewCounts } from '@/features/content/server/views';

/**
 * GET /api/views
 * Returns all view counts grouped by slug.
 */
export const GET = async () => {
  try {
    const viewCounts = await getAllViewCounts();
    return NextResponse.json(viewCounts);
  } catch (error) {
    console.error('Error fetching view counts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch view counts' },
      { status: 500 },
    );
  }
};
