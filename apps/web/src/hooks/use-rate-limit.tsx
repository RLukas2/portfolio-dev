import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { checkRateLimit, RATE_LIMITS } from '@/lib/utils/rate-limit';

type RateLimitKey = keyof typeof RATE_LIMITS;

/**
 * Hook to handle rate limiting with user feedback
 * @param key - Unique identifier for the action
 * @param config - Rate limit configuration
 */
export function useRateLimit(key: string, limitType: RateLimitKey) {
  const [isLimited, setIsLimited] = useState(false);

  const checkLimit = useCallback(() => {
    const result = checkRateLimit(key, RATE_LIMITS[limitType]);

    if (result.isLimited) {
      setIsLimited(true);
      toast.error(result.message);

      // Auto-reset after the remaining time
      setTimeout(() => {
        setIsLimited(false);
      }, result.remainingMs);

      return false;
    }

    return true;
  }, [key, limitType]);

  return { isLimited, checkLimit };
}
