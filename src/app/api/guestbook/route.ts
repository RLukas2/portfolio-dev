import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import {
  createEntry,
  getGuestbookEntries,
} from '@/features/guestbook/server/actions';
import { authOptions } from '@/lib/auth';
import { response } from '@/server/server';
import type {
  APIErrorResponse,
  APISingleResponse,
} from '@/types/api';

export const GET = async () => {
  try {
    const entries = await getGuestbookEntries();
    return NextResponse.json(
      { data: entries },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120',
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
    const { message } = body;

    await createEntry({ message, userId: session.id as string });

    return response<APISingleResponse<null>>({ data: null }, 201);
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
