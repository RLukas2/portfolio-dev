import { defineCollection } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import readingTime from 'reading-time';

import { rehypePlugins, remarkPlugins } from '../mdx-plugins';
import {
  remarkExtractHeadings,
  type TocHeading,
} from '../mdx-plugins/remark/extract-headings';
import { shortSchema } from './base-schema';
import { serializeHeadings } from './extract-headings';

const shorts = defineCollection({
  name: 'Short',
  directory: 'content/shorts',
  include: '**/*.mdx',
  schema: shortSchema,
  transform: (doc, context) => {
    return context.cache(
      {
        type: 'shorts',
        doc,
      },
      async () => {
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

        const slug = doc._meta.path;

        return {
          ...doc,
          _id: doc._meta.filePath,
          slug,
          code,
          readingTime: parsedReadingTime,
          headings: serializeHeadings(headings),
        };
      },
    );
  },
});

export default shorts;
