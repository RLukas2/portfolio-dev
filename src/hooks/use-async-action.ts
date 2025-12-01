import { useCallback, useState } from 'react';

import { useToast } from '@/hooks/use-toast';
import { showErrorToast } from '@/lib/toast-utils';

interface UseAsyncActionOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  errorMessage?: string;
  showToastOnError?: boolean;
}

/**
 * Hook to handle async actions with loading state and error handling
 * Reduces boilerplate for try-catch blocks and loading states
 */
export const useAsyncAction = <T extends any[]>(
  action: (...args: T) => Promise<void>,
  options: UseAsyncActionOptions = {},
) => {
  const {
    onSuccess,
    onError,
    errorMessage = 'Something went wrong. Please try again.',
    showToastOnError = true,
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const execute = useCallback(
    async (...args: T) => {
      if (isLoading) return;

      try {
        setIsLoading(true);
        await action(...args);
        onSuccess?.();
      } catch (error) {
        if (showToastOnError) {
          showErrorToast(toast, error, errorMessage);
        }
        onError?.(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [
      action,
      isLoading,
      onSuccess,
      onError,
      errorMessage,
      showToastOnError,
      toast,
    ],
  );

  return { execute, isLoading };
};
