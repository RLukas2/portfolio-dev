import { BASE_URL, SITE } from '@/constants/site';

import { buildOgImageURL } from './builder';

interface JsonLdEntity {
  type: string;
  name: string;
  url?: string;
}

type JsonLdAuthor = JsonLdEntity;

type JsonLdPublisher = JsonLdEntity;

interface JsonLd {
  title: string;
  description?: string;
  type?: string;
  headline?: string;
  datePublished?: string;
  dateModified?: string;
  url?: string;
  author?: JsonLdAuthor;
  publisher?: JsonLdPublisher;
}

/**
 * Build JSON-LD for blog posts (BlogPosting schema)
 */
export const buildJsonLd = ({
  title,
  description,
  type = 'BlogPosting',
  headline,
  datePublished,
  dateModified,
  url,
  author = {
    type: 'Person',
    name: SITE.author.name,
    url: SITE.author.url,
  },
  publisher = {
    type: 'Person',
    name: SITE.author.name,
    url: SITE.author.url,
  },
}: JsonLd): string =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type,
    headline,
    datePublished,
    dateModified,
    description,
    image: buildOgImageURL(title, description ?? '', datePublished),
    url,
    author,
    publisher,
  });

/**
 * Build JSON-LD for the WebSite schema (used in layout)
 */
export const buildWebsiteJsonLd = (): string =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    description: SITE.description,
    url: BASE_URL,
    author: {
      '@type': 'Person',
      name: SITE.author.name,
      url: SITE.author.url,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  });

/**
 * Build JSON-LD for the Person schema (used in About page)
 */
export const buildPersonJsonLd = (): string =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.author.name,
    url: SITE.author.url,
    image: `${BASE_URL}${SITE.author.avatar}`,
    email: `mailto:${SITE.author.email}`,
    jobTitle: 'Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Self-employed',
    },
    sameAs: [
      SITE.author.github.url,
      SITE.author.linkedIn,
      SITE.author.twitter,
      SITE.author.facebook,
    ].filter(Boolean),
    knowsAbout: [
      'Software Development',
      'Back-end Development',
      'TypeScript',
      'JavaScript',
      'Python',
      'Go',
      'Next.js',
      'React',
    ],
  });

interface ProjectJsonLd {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  repositoryUrl?: string;
  image?: string;
  technologies?: string[];
}

/**
 * Build JSON-LD for projects (SoftwareSourceCode schema)
 */
export const buildProjectJsonLd = ({
  title,
  description,
  url,
  datePublished,
  dateModified,
  repositoryUrl,
  image,
  technologies = [],
}: ProjectJsonLd): string =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: title,
    description,
    url,
    dateCreated: datePublished,
    dateModified: dateModified ?? datePublished,
    image: image ?? buildOgImageURL(title, description, datePublished),
    author: {
      '@type': 'Person',
      name: SITE.author.name,
      url: SITE.author.url,
    },
    codeRepository: repositoryUrl,
    programmingLanguage: technologies,
  });
