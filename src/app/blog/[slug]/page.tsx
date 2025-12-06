import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ROUTES } from '@/constants/routes';
import { BASE_URL } from '@/constants/site';
import Post from '@/features/posts/components/post';
import { PostProvider } from '@/features/posts/components/post-provider';
import { buildJsonLd, seo } from '@/lib/meta';
import { formatDate } from '@/lib/utils';

import type { Post as PostDB } from '.content-collections/generated';
import { allPosts } from '.content-collections/generated';

// Generate static pages at build time for all published posts
export const generateStaticParams = () =>
  allPosts
    .filter((post) => post.published)
    .map((post) => ({ slug: post.slug }));

// Revalidate every hour
export const revalidate = 3600;

const findPostBySlug = (slug?: string): PostDB | undefined =>
  allPosts.filter((post) => post.published).find((post) => post.slug === slug);

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> => {
  const { slug } = await params;
  const post = findPostBySlug(slug);

  if (!post) return;

  const publishedDate = formatDate(post.date);
  const modifiedTime = formatDate(post.modifiedDate);

  return seo({
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords ?? [],
    url: `${ROUTES.blog}/${post.slug}`,
    date: publishedDate,
    openGraph: {
      type: 'article',
      publishedTime: publishedDate,
      modifiedTime,
    },
  });
};

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = findPostBySlug(slug);

  if (!post) return notFound();

  const { title, excerpt, date, modifiedDate } = post;

  const datePublished = formatDate(date);
  const dateModified = formatDate(modifiedDate);

  return (
    <PostProvider post={post}>
      <Post />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildJsonLd({
            title,
            description: excerpt,
            headline: title,
            datePublished,
            dateModified,
            url: `${BASE_URL}${ROUTES.blog}/${slug}`,
          }),
        }}
        key="post-jsonld"
      />
    </PostProvider>
  );
};

export default PostPage;
