import { siteConfig } from '@xbrk/config';
import { getBaseUrl } from './utils';

const OG_LOCALE = 'en_US';

export function seo({
  title,
  description,
  keywords,
  author,
  image = `${getBaseUrl()}/images/cover.avif`,
  type = 'website',
  url = getBaseUrl(),
  canonical,
}: {
  title: string;
  description?: string | null;
  image?: string | null;
  keywords?: string | null;
  author?: string | null;
  type?: 'website' | 'article' | 'video' | 'book' | 'profile';
  url?: string;
  canonical?: string;
}) {
  const tags = [
    // Basic meta tags
    { title },
    ...(description ? [{ name: 'description', content: description }] : []),
    ...(keywords ? [{ name: 'keywords', content: keywords }] : []),
    { name: 'author', content: author ?? siteConfig.author.name },

    // Robots
    { name: 'robots', content: 'index, follow' },

    // Twitter Card tags
    { name: 'twitter:title', content: title },
    ...(description ? [{ name: 'twitter:description', content: description }] : []),
    { name: 'twitter:creator', content: siteConfig.author.handle },
    { name: 'twitter:site', content: siteConfig.author.handle },
    { name: 'twitter:widgets:new-embed-design', content: 'on' },
    { name: 'twitter:url', content: url },

    // Open Graph tags
    { property: 'og:type', content: type },
    { property: 'og:site_name', content: siteConfig.title },
    { property: 'og:title', content: title },
    ...(description ? [{ property: 'og:description', content: description }] : []),
    { property: 'og:locale', content: OG_LOCALE },
    { property: 'og:url', content: url },

    // Image tags (if image is provided)
    ...(image
      ? [
          { name: 'twitter:image', content: image },
          {
            name: 'twitter:image:alt',
            content: `${title} - ${siteConfig.title}`,
          },
          { name: 'twitter:card', content: 'summary_large_image' },
          { property: 'og:image', content: image },
          {
            property: 'og:image:alt',
            content: `${title} - ${siteConfig.title}`,
          },
          { property: 'og:image:width', content: '1200' },
          { property: 'og:image:height', content: '630' },
        ]
      : []),
  ];

  const links = [...(canonical ? [{ rel: 'canonical', href: canonical }] : [])];

  return { meta: tags, links };
}
