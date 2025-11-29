import { defineCollection } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import readingTime from 'reading-time';
import { z } from 'zod';

import { rehypePlugins, remarkPlugins } from '../mdx-plugins';
import { extractHeadings, serializeHeadings } from './extract-headings';

const shorts = defineCollection({
  name: 'Short',
  directory: 'content/shorts',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.iso.datetime(),
    published: z.boolean().default(false),
    tags: z.array(z.string()),
    content: z.string().optional(),
  }),
  transform: (doc, context) => {
    return context.cache(
      {
        type: 'shorts',
        doc,
      },
      async () => {
        const code = await compileMDX(
          {
            ...context,
            cache: async (input, fn) => fn(input),
          },
          doc,
          {
            cwd: process.cwd(),
            rehypePlugins,
            remarkPlugins,
          },
        );

        const { text: parsedReadingTime } = readingTime(doc.content);

        return {
          ...doc,
          _id: doc._meta.filePath,
          slug: doc._meta.path,
          code,
          readingTime: parsedReadingTime,
          headings: serializeHeadings(extractHeadings(doc.content)),
        };
      },
    );
  },
});

export default shorts;
