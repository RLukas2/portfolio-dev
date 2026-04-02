const DEFAULT_PORT = 3000 as const;

/**
 * Get the base URL of the application.
 * It checks for environment variables and falls back to defaults based on the execution context (browser or server).
 *
 * @returns {string} The base URL as a string.
 */
export const getBaseUrl = (): string => {
  // VITE_APP_URL is available on both client and server via import.meta.env
  if (import.meta.env.VITE_APP_URL) {
    return import.meta.env.VITE_APP_URL as string;
  }

  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  // Server-side only: Vercel injects VERCEL_URL as a process.env variable
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return `http://localhost:${process.env.PORT ?? DEFAULT_PORT}`;
};
