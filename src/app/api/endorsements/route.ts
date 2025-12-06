import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import {
  countEndorsement,
  createEndorsement,
  getEndorsements,
} from '@/features/endorsements/server/actions';
import { authOptions } from '@/lib/auth';
import { response } from '@/server/server';
import type {
  APIErrorResponse,
  APISingleResponse,
} from '@/types/api';

// Allow caching - data is cached via unstable_cache in server actions
export const dynamic = 'force-static';
export const revalidate = 120; // 2 minutes

export const GET = async () => {
  try {
    const endorsements = await getEndorsements();
    return NextResponse.json(
      { data: endorsements },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
        },
      },
    );
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return response<APIErrorResponse>(
        {
          message: 'Unauthenticated',
        },
        401,
      );
    }

    const body = await req.json();
    const { skillId } = body;
    const userId = session.id as string;

    const alreadyEndorsed = await countEndorsement({
      skillId: skillId,
      userId,
    });

    if (alreadyEndorsed) {
      return response<APIErrorResponse>(
        {
          message: 'Conflict',
        },
        409,
      );
    }

    await createEndorsement({ skillId, userId });

    return response<APISingleResponse<null>>(
      {
        data: null,
      },
      201,
    );
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
