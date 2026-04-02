const DEFAULT_PORT = 3000 as const;

/**
 * Get the base URL of the application.
 * It checks for environment variables and falls back to defaults based on the execution context (browser or server).
 *
 * @returns {string} The base URL as a string.
 */
export const getBaseUrl = (): string => {
  if (process.env.VITE_APP_URL) {
    return process.env.VITE_APP_URL;
  }

  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return `http://localhost:${process.env.PORT ?? DEFAULT_PORT}`;
};
