import { useCallback, useEffect } from 'react';

import useRequest from '@/hooks/use-request';
import type { APIErrorResponse, APISingleResponse } from '@/types/api';

export const useViews = ({
  slug,
  trackView,
}: {
  slug: string;
  trackView?: boolean;
}) => {
  const { data, isLoading } = useRequest<
    APISingleResponse<{ total: number }>,
    APIErrorResponse
  >(`/api/views/${slug}`);

  const views = data?.data?.total ?? 0;

  const registerView = useCallback(async (contentSlug: string) => {
    await fetch(`/api/views/${contentSlug}`, { method: 'POST' });
  }, []);

  useEffect(() => {
    if (trackView) registerView(slug);
  }, [slug, trackView, registerView]);

  return { views, isLoading };
};
