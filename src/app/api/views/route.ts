import { NextResponse } from 'next/server';

import { getAllViewCounts } from '@/features/content/server/views';

/**
 * GET /api/views
 * Returns all view counts grouped by slug.
 * Cached for 60 seconds with stale-while-revalidate for better TTFB.
 */
export const GET = async () => {
  try {
    const viewCounts = await getAllViewCounts();
    return NextResponse.json(viewCounts, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching view counts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch view counts' },
      { status: 500 },
    );
  }
};
