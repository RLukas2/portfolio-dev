import env from '@/lib/env';

interface Author {
  name: string;
  url: string;
  avatar: string;
  email: string;
  linkedIn: string;
  github: {
    username: string;
    url: string;
  };
  twitter?: string;
}

interface Site {
  url: string;
  name: string;
  title: string;
  description: string;
  author: Author;
  keywords?: string[];
}

export const BASE_URL = env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const SITE: Site = {
  url: BASE_URL,
  name: 'RLukas2 Portfolio',
  title: 'Tuan Ngo-Hoang',
  description: 'This is my awesome app built with Next.js',
  author: {
    name: 'Tuan Ngo-Hoang',
    url: 'https://rlukas2.vercel.app/',
    avatar: '/avatar.png',
    email: 'nhtuan314@gmail.com',
    linkedIn: 'https://linkedin.com/in/xbrk',
    github: {
      username: 'RLukas2',
      url: 'https://github.com/RLukas2',
    },
    twitter: 'https://twitter.com/XBoRickie',
  },
  keywords: [
    'rlukas2',
    'rlukas',
    'rickie lukas',
    'tuan ngo-hoang',
    'tuan ngo',
    'ngo hoang tuan',
    'developer',
    'portfolio',
    'back-end',
    'software engineer',
  ],
};
