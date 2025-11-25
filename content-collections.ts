import { defineConfig } from '@content-collections/core';

import pages from './src/config/content-collections/pages';
import posts from './src/config/content-collections/posts';
import projects from './src/config/content-collections/projects';
import snippets from './src/config/content-collections/snippets';

export default defineConfig({
  collections: [posts, projects, pages, snippets],
});
