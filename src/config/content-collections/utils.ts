import removeMd from 'remove-markdown';

/**
 * Generates an excerpt from the given content.
 *
 * @param {{
 *   content?: string | null;
 *   defaultExcerpt?: string;
 *   trimLength?: boolean;
 *   min?: number;
 *   max?: number;
 * }} param0
 * @param {string} param0.content - The raw MDX/Markdown content
 * @param {string} param0.defaultExcerpt - The default excerpt to use if content is not available
 * @param {boolean} param0.trimLength - Whether to trim the excerpt to a specific length
 * @param {number} [param0.min=70] - Minimum length for trimming
 * @param {number} [param0.max=150] - Maximum length for trimming
 * @returns {string} - The generated excerpt
 */
export const getPostExcerpt = ({
  content,
  defaultExcerpt,
  trimLength,
  min = 70,
  max = 150,
}: {
  content?: string | null;
  defaultExcerpt?: string;
  trimLength?: boolean;
  min?: number;
  max?: number;
}): string => {
  if (defaultExcerpt) return defaultExcerpt;

  if (!content) return defaultExcerpt ?? '';

  const text = content
    .split(/\r?\n/g) // Split lines for both \n and \r\n
    .filter((line) => !line.startsWith('#')) // Filter lines starting with '#'
    .map((line) => removeMd(line.trim(), { gfm: true, useImgAltText: true })) // Remove Markdown and trim
    .filter(Boolean);

  let excerpt = '';

  if (text) {
    let lastIndex = 0;
    while (excerpt.length < max) {
      excerpt += `${text[lastIndex]}`;
      lastIndex += 1;
    }
  }

  if (trimLength) {
    const allWords = excerpt.split(' ');
    excerpt = '';
    let lastIndex = 0;
    while (excerpt.length < max) {
      const word = allWords[lastIndex];
      excerpt += `${word} `;

      if (
        word &&
        word.endsWith('.') &&
        !word.endsWith('etc.') &&
        excerpt.length > min
      )
        break;
      lastIndex += 1;
    }
  }

  excerpt = excerpt.trim();

  if (excerpt.length > 0)
    return `${excerpt}${excerpt.endsWith('.') ? '..' : '...'}`;

  return defaultExcerpt ?? '';
};

export const getContentImagePath = (path: string, image?: string): string => {
  if (image)
    return image.startsWith('http') ? image : `/media/${path}/${image}`;

  return '';
};
