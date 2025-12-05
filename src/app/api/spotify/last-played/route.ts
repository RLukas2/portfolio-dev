import {
  getNowPlaying,
  getRecentlyPlayed,
} from '@/features/now-playing/server/actions';
import type { NowPlaying } from '@/features/now-playing/types';
import { response } from '@/server/server';
import type { APIErrorResponse, APISingleResponse } from '@/types/api';

export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    // First check if something is currently playing
    const nowPlaying = await getNowPlaying();

    if (nowPlaying?.isPlaying) {
      return response<APISingleResponse<NowPlaying>>({ data: nowPlaying });
    }

    // If not playing, get the last played track
    const lastPlayed = await getRecentlyPlayed();

    return response<APISingleResponse<NowPlaying>>({ data: lastPlayed });
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
