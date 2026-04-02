/// === Site Configuration ===

import type { SimpleIcon } from 'simple-icons';

export interface SiteConfig {
  author: {
    name: string;
    email: string;
    url: string;
    handle: string;
  };
  description: string;
  keywords: string;
  links: {
    mail: string;
    twitter?: string;
    github: string;
    githubRepo: string;
    linkedin?: string;
  };
  name: string;
  title: string;
  url: string;
}

export interface Social {
  icon: SimpleIcon;
  name: string;
  url: string;
  username?: string;
}

/// === Navigation ===

export interface NavItem {
  content?: ContentNavItem[];
  description?: string;
  disabled?: boolean;
  href?: string;
  title: string;
}

export interface ContentNavItem extends NavItem {
  href: string;
}
