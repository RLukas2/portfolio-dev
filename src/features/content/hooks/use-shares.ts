import type { ShareType } from '@prisma/client';
import { useCallback } from 'react';

import useRequest from '@/hooks/use-request';
import type { APIErrorResponse, APISingleResponse } from '@/types/api';

export const useShares = (slug: string) => {
  const { data, mutate, isLoading } = useRequest<
    APISingleResponse<{ total: number }>,
    APIErrorResponse
  >(`/api/shares/${slug}`);

  const shares = data?.data?.total ?? 0;

  const addShare = useCallback(
    (type: ShareType) => {
      // optimistic update
      mutate(
        {
          data: {
            total: shares + 1,
          },
        },
        false,
      );

      fetch(`/api/shares/${slug}`, {
        method: 'POST',
        body: JSON.stringify({ type }),
      });
    },
    [mutate, shares, slug],
  );

  return { shares, addShare, isLoading };
};
