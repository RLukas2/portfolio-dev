import type { Fetcher, Key, KeyedMutator, SWRConfiguration } from 'swr';
import useSWR from 'swr';

import defaultFetcher from '@/lib/fetcher';

/**
 * Interface for the response returned by the useRequest hook.
 *
 * @interface UseRequestResponse
 * @typedef {UseRequestResponse}
 * @template [R=unknown] - Response type
 * @template [E=unknown] - Error type
 */
interface UseRequestResponse<R = unknown, E = unknown> {
  data?: R;
  isLoading: boolean;
  error?: E;
  mutate: KeyedMutator<R>;
}

/**
 * Custom hook for making API requests using SWR.
 *
 * @template {unknown} R - Response type
 * @template {unknown} E - Error type
 * @param {Key} key - The key (URL) for the request
 * @param {Fetcher<R>} [fetcher=defaultFetcher] - The fetcher function to use
 * @param {SWRConfiguration<R, E>} [options={}] - Additional SWR configuration options
 * @returns {UseRequestResponse<R, E>} - The SWR response object
 */
const useRequest = <R extends unknown, E extends unknown>(
  key: Key,
  fetcher: Fetcher<R> = defaultFetcher,
  options: SWRConfiguration<R, E> = {},
): UseRequestResponse<R, E> => {
  const { data, error, isLoading, mutate } = useSWR<R, E>(
    key,
    fetcher,
    options,
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useRequest;
