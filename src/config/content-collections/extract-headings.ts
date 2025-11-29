import GithubSlugger from 'github-slugger';

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

/**
 * Extracts headings from MDX/Markdown content.
 * Parses h2-h4 headings and generates slug IDs using github-slugger
 * to match rehype-slug's behavior exactly.
 *
 * @param content - The raw MDX/Markdown content
 * @returns Array of heading objects with id, text, and level
 */
export const extractHeadings = (content: string): TocHeading[] => {
  if (!content) return [];

  const slugger = new GithubSlugger();
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings: TocHeading[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2]
      .trim()
      // Remove inline code backticks
      .replace(/`([^`]+)`/g, '$1')
      // Remove bold/italic markers
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/_([^_]+)_/g, '$1')
      // Remove links but keep text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    // Generate slug using github-slugger
    const id = slugger.slug(text);

    headings.push({ id, text, level });
  }

  return headings;
};

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
