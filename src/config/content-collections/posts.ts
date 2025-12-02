import { defineCollection } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import readingTime from 'reading-time';

import { rehypePlugins, remarkPlugins } from '../mdx-plugins';
import { getBlurData } from '../mdx-plugins/remark/blur';
import {
  remarkExtractHeadings,
  type TocHeading,
} from '../mdx-plugins/remark/extract-headings';
import { postSchema } from './base-schema';
import { serializeHeadings } from './extract-headings';
import { getContentImagePath, getPostExcerpt } from './utils';

const posts = defineCollection({
  name: 'Post',
  directory: 'content/posts',
  include: '**/*.mdx',
  schema: postSchema,
  transform: (doc, context) => {
    return context.cache(
      {
        type: 'posts',
        doc,
      },
      async () => {
        // Create a headings array that will be populated by the remark plugin
        const headings: TocHeading[] = [];

        const code = await compileMDX(
          {
            ...context,
            cache: async (input, fn) => fn(input),
          },
          doc,
          {
            cwd: process.cwd(),
            rehypePlugins,
            remarkPlugins: [
              ...remarkPlugins,
              [remarkExtractHeadings, { headings }],
            ],
          },
        );

        const { text: parsedReadingTime } = readingTime(doc.content);

        const excerpt = getPostExcerpt({
          content: doc.content,
          defaultExcerpt: doc.excerpt ?? doc.description,
          trimLength: true,
        });

        const longExcerpt = getPostExcerpt({
          content: doc.content,
          defaultExcerpt: doc.excerpt ?? doc.description,
        });

        const image = getContentImagePath('blog', doc.image);
        const imageMeta = await getBlurData(
          getContentImagePath('blog', doc.image),
        );

        const slug = doc._meta.path;

        return {
          ...doc,
          _id: doc._meta.filePath,
          slug,
          readingTime: parsedReadingTime,
          code,
          excerpt,
          longExcerpt,
          image,
          imageMeta: JSON.stringify(imageMeta),
          headings: serializeHeadings(headings),
        };
      },
    );
  },
});

export default posts;
