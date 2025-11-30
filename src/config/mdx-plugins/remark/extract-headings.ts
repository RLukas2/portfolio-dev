import GithubSlugger from 'github-slugger';
import type { Root } from 'mdast';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

/**
 * A remark plugin that extracts headings from MDX content.
 *
 * This plugin visits the AST and extracts h2-h4 headings,
 * automatically ignoring headings inside code blocks.
 *
 * Usage:
 * ```ts
 * const headings: TocHeading[] = [];
 * await compileMDX(context, doc, {
 *   remarkPlugins: [[remarkExtractHeadings, { headings }]],
 * });
 * // headings array is now populated
 * ```
 */
export function remarkExtractHeadings({
  headings,
}: {
  headings: TocHeading[];
}) {
  const slugger = new GithubSlugger();

  return (tree: Root) => {
    // Clear the array in case it's reused
    headings.length = 0;
    slugger.reset();

    visit(tree, 'heading', (node) => {
      // Only extract h2, h3, h4 (depth 2-4)
      if (node.depth >= 2 && node.depth <= 4) {
        const text = toString(node);
        const id = slugger.slug(text);

        headings.push({
          id,
          text,
          level: node.depth,
        });
      }
    });
  };
}

export default remarkExtractHeadings;
