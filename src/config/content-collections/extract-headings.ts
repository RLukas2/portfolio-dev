import type { TocHeading } from '../mdx-plugins/remark/extract-headings';

// Re-export the type for convenience
export type { TocHeading };

/**
 * Serializes headings array to JSON string for storage.
 */
export const serializeHeadings = (headings: TocHeading[]): string => {
  return JSON.stringify(headings);
};

/**
 * Deserializes headings from JSON string.
 */
export const deserializeHeadings = (headingsJson: string): TocHeading[] => {
  try {
    return JSON.parse(headingsJson) as TocHeading[];
  } catch {
    return [];
  }
};
