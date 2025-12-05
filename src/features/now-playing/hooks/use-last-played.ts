import useRequest from '@/hooks/use-request';
import type { APIErrorResponse, APISingleResponse } from '@/types/api';

import type { NowPlaying } from '../types';

export const useLastPlayed = () => {
  const { data, isLoading, error } = useRequest<
    APISingleResponse<NowPlaying>,
    APIErrorResponse
  >('/api/spotify/last-played');

  const track = data?.data;

  return { track, isLoading, error };
};
