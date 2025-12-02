import { defineCollection } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import readingTime from 'reading-time';

import { rehypePlugins, remarkPlugins } from '../mdx-plugins';
import { getBlurData } from '../mdx-plugins/remark/blur';
import {
  remarkExtractHeadings,
  type TocHeading,
} from '../mdx-plugins/remark/extract-headings';
import { projectSchema } from './base-schema';
import { serializeHeadings } from './extract-headings';
import { getContentImagePath } from './utils';

const projects = defineCollection({
  name: 'Project',
  directory: 'content/projects',
  include: '**/*.mdx',
  schema: projectSchema,

  transform: (doc, context) => {
    return context.cache(
      {
        type: 'projects',
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
        const image = getContentImagePath('projects', doc.image);
        const imageMeta = await getBlurData(
          getContentImagePath('projects', doc.image),
        );

        const slug = doc._meta.path;

        return {
          ...doc,
          _id: doc._meta.filePath,
          slug,
          readingTime: parsedReadingTime,
          code,
          image,
          imageMeta: JSON.stringify(imageMeta),
          headings: serializeHeadings(headings),
        };
      },
    );
  },
});

export default projects;
