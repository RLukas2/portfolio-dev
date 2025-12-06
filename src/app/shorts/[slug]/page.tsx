import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ROUTES } from '@/constants/routes';
import { BASE_URL } from '@/constants/site';
import Short from '@/features/shorts/components/short';
import { ShortProvider } from '@/features/shorts/components/short-provider';
import { buildJsonLd, seo } from '@/lib/meta';
import { formatDate } from '@/lib/utils';

import type { Short as ShortDB } from '.content-collections/generated';
import { allShorts } from '.content-collections/generated';

// Generate static pages at build time for all published shorts
export const generateStaticParams = () =>
  allShorts
    .filter((short) => short.published)
    .map((short) => ({ slug: short.slug }));

// Revalidate every hour
export const revalidate = 3600;

const findShortBySlug = (slug?: string): ShortDB | undefined =>
  allShorts
    .filter((short) => short.published)
    .find((short) => short.slug === slug);

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> => {
  const { slug } = await params;
  const short = findShortBySlug(slug);

  if (!short) return;

  const publishedDate = formatDate(short.date);

  return seo({
    title: short.title,
    description: short.description,
    keywords: [
      'note',
      'short',
      'code',
      'collection',
      'tricks',
      'shorthand',
      'scripts',
    ],
    url: `${ROUTES.shorts}/${short.slug}`,
    date: publishedDate,
    openGraph: {
      type: 'article',
      publishedTime: publishedDate,
    },
  });
};

const ShortPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const short = findShortBySlug(slug);

  if (!short) return notFound();

  const { title, description, date } = short;
  const publishedDate = formatDate(date);

  return (
    <ShortProvider short={short}>
      <Short />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildJsonLd({
            title,
            description,
            headline: title,
            datePublished: publishedDate,
            dateModified: publishedDate,
            url: `${BASE_URL}${ROUTES.shorts}/${slug}`,
          }),
        }}
        key="short-jsonld"
      />
    </ShortProvider>
  );
};

export default ShortPage;
