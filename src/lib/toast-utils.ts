import type { toast as toastFn } from '@/hooks/use-toast';

type ToastFunction = typeof toastFn;

/**
 * Utility functions for consistent toast notifications
 */

/**
 * Show an error toast with consistent styling
 */
export const showErrorToast = (
  toast: ToastFunction,
  error: unknown,
  defaultMessage = 'Something went wrong. Please try again.',
) => {
  const message = error instanceof Error ? error.message : defaultMessage;

  toast({
    variant: 'destructive',
    title: 'Uh oh! Something went wrong.',
    description: message,
  });
};

/**
 * Show a success toast with consistent styling
 */
export const showSuccessToast = (
  toast: ToastFunction,
  message: string,
  title = 'Success',
) => {
  toast({
    title,
    description: message,
  });
};

/**
 * Show an info toast with consistent styling
 */
export const showInfoToast = (
  toast: ToastFunction,
  message: string,
  title?: string,
) => {
  toast({
    title,
    description: message,
  });
};
