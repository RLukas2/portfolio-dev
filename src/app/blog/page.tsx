import { compareDesc } from 'date-fns';
import type { Metadata } from 'next';

import { ROUTES } from '@/constants/routes';
import BlogContent from '@/features/posts/components/blog-content';
import { seo } from '@/lib/meta';

import { allPosts } from '.content-collections/generated';

export const metadata: Metadata = seo({
  title: 'Blog',
  description:
    'Blog posts by Tuan Ngo. Here I share some thoughts, stories, information, and more about software development.',
  keywords: [
    'blog',
    'story',
    'articles',
    'moments',
    'contents',
    'thoughts',
    'tech',
    'software',
    'development',
  ],
  url: ROUTES.blog,
});

const BlogPage = () => {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return <BlogContent posts={posts} />;
};

export default BlogPage;
