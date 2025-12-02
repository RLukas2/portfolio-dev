import { defineCollection } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';

import { rehypePlugins, remarkPlugins } from '../mdx-plugins';
import { pageSchema } from './base-schema';

const pages = defineCollection({
  name: 'Page',
  directory: 'content/pages',
  include: '**/*.mdx',
  schema: pageSchema,
  transform: (doc, context) => {
    return context.cache(
      {
        type: 'pages',
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

        const slug = doc._meta.path;

        return {
          ...doc,
          _id: doc._meta.filePath,
          slug,
          code,
        };
      },
    );
  },
});

export default pages;
