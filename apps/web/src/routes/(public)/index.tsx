import { createFileRoute } from '@tanstack/react-router';
import { siteConfig } from '@xbrk/config';
import { seo } from '@/lib/seo';

export const Route = createFileRoute('/(public)/')({
  component: Home,
  head: () => {
    const seoData = seo({
      title: siteConfig.title,
      description: siteConfig.description,
      keywords: siteConfig.keywords,
    });

    return {
      meta: seoData.meta,
      links: seoData.links,
    };
  },
});

function Home() {
  return (
    <>
      <h1 className="font-bold text-4xl">Welcome to my personal website!</h1>
      <p className="mt-4 text-gray-600 text-lg">This is the homepage. Check out my projects and blog posts!</p>
    </>
  );
}
