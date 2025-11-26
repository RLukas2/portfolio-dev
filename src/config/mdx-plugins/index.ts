import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import type { PluggableList } from 'unified';

import { rehypeCode } from './rehype/rehype-code';
import { imageBlurMetadata } from './remark/blur';

export const rehypePlugins: PluggableList = [
  rehypeCode,
  rehypeAccessibleEmojis,
  rehypeKatex,
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      behavior: 'append',
      properties: {
        className: ['heading-anchor'],
        ariaHidden: 'true',
      },
    },
  ],
];
export const remarkPlugins: PluggableList = [
  remarkGfm,
  remarkMath,
  imageBlurMetadata,
];
