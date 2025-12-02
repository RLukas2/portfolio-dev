import env from './env';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>,
    ) => void;
  }
}

const GA_ID = env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

/**
 * Track page views in Google Analytics
 * @param url - The URL to track
 */
export const pageview = (url: string) => {
  if (!GA_ID || !window.gtag) return;

  window.gtag('config', GA_ID, {
    page_path: url,
  });
};

/**
 * Track custom events in Google Analytics
 * @param action - The action name (e.g., 'click', 'download')
 * @param category - The category (e.g., 'Button', 'Link')
 * @param label - Optional label for more context
 * @param value - Optional numeric value
 */
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (!GA_ID || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};

/**
 * Track outbound link clicks
 * @param url - The external URL being clicked
 */
export const trackOutboundLink = (url: string) => {
  event({
    action: 'click',
    category: 'Outbound Link',
    label: url,
  });
};

/**
 * Track file downloads
 * @param filename - The name of the file being downloaded
 */
export const trackDownload = (filename: string) => {
  event({
    action: 'download',
    category: 'File',
    label: filename,
  });
};

/**
 * Track search queries
 * @param searchTerm - The search term used
 */
export const trackSearch = (searchTerm: string) => {
  event({
    action: 'search',
    category: 'Search',
    label: searchTerm,
  });
};
