import { BookOpenTextIcon } from 'lucide-react';

import {
  AtSign,
  Coffee,
  Dashboard,
  Email,
  FileCode,
  GitHub,
  Home,
  LinkedIn,
  Medal,
  Monitor,
  Pencil,
  RSS,
  Twitter,
} from '@/components/icons';
import type { CommandMenuItem, NavLink } from '@/types/menu';

import { ROUTES } from './routes';
import { SITE } from './site';

/**
 * Navigation links for the application.
 * Used in the header and mobile menu.
 *
 * @type {NavLink[]}
 */
export const NAV_LINKS: NavLink[] = [
  {
    path: '/',
    label: 'Home',
    icon: <Home />,
    onlyShowOnDropdownMenu: true,
  },
  {
    path: ROUTES.about,
    label: 'About',
    icon: <AtSign />,
  },
  {
    path: ROUTES.blog,
    label: 'Blog',
    icon: <Pencil />,
  },
  {
    path: ROUTES.projects,
    label: 'Projects',
    icon: <Coffee />,
  },
  {
    path: ROUTES.dashboard,
    label: 'Dashboard',
    icon: <Dashboard />,
  },
  {
    path: ROUTES.snippets,
    label: 'Snippets',
    icon: <FileCode />,
    onlyShowOnDropdownMenu: true,
  },
  {
    path: ROUTES.guestbook,
    label: 'Guestbook',
    icon: <BookOpenTextIcon />,
  },
  {
    path: ROUTES.endorsements,
    label: 'Endorsements',
    icon: <Medal />,
  },
];

/**
 * Command menu items for quick navigation and actions.
 * Used in the command palette component.
 */
export const COMMAND_PAGES: CommandMenuItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: <Home />,
    isExternal: false,
    eventName: 'Pages: Home',
    type: 'PAGE',
    closeOnSelect: true,
  },
  {
    label: 'About',
    href: ROUTES.about,
    icon: <AtSign />,
    isExternal: false,
    eventName: 'Pages: About',
    type: 'PAGE',
    closeOnSelect: true,
  },
  {
    label: 'Blog',
    href: ROUTES.blog,
    icon: <Pencil />,
    isExternal: false,
    eventName: 'Pages: Blog',
    type: 'PAGE',
    closeOnSelect: true,
  },
  {
    label: 'Projects',
    href: ROUTES.projects,
    icon: <Coffee />,
    isExternal: false,
    eventName: 'Pages: Projects',
    type: 'PAGE',
  },
  {
    label: 'Dashboard',
    href: ROUTES.dashboard,
    icon: <Dashboard />,
    isExternal: false,
    eventName: 'Pages: Dashboard',
    type: 'PAGE',
    closeOnSelect: true,
  },
  {
    label: 'Snippets',
    href: ROUTES.snippets,
    icon: <FileCode />,
    isExternal: false,
    eventName: 'Pages: Snippets',
    type: 'PAGE',
    closeOnSelect: true,
  },
  {
    label: 'Guestbook',
    href: ROUTES.guestbook,
    icon: <BookOpenTextIcon />,
    isExternal: false,
    eventName: 'Pages: Guestbook',
    type: 'PAGE',
    closeOnSelect: true,
  },
  {
    label: 'Endorsements',
    href: ROUTES.endorsements,
    icon: <Medal />,
    isExternal: false,
    eventName: 'Pages: Endorsements',
    type: 'PAGE',
    closeOnSelect: true,
  },
  {
    label: 'Uses',
    href: ROUTES.uses,
    icon: <Monitor />,
    isExternal: false,
    eventName: 'Pages: Uses',
    type: 'PAGE',
    closeOnSelect: true,
  },
];

/**
 * Social media command menu items.
 *
 * @type {CommandMenuItem[]}
 */
export const COMMAND_SOCIAL_MEDIA: CommandMenuItem[] = [
  {
    label: 'Email',
    href: `mailto:${SITE.author.email}?subject=Hi Tuan!`,
    icon: <Email />,
    isExternal: true,
    eventName: 'Contact: Email',
    type: 'CONTACT',
  },
  {
    label: 'GitHub',
    href: SITE.author.github.url,
    icon: <GitHub />,
    isExternal: true,
    eventName: 'Social: GitHub',
    type: 'LINK',
  },
  {
    label: 'LinkedIn',
    href: SITE.author.linkedIn,
    icon: <LinkedIn />,
    isExternal: true,
    eventName: 'Social: LinkedIn',
    type: 'LINK',
  },
  {
    label: 'X',
    href: SITE.author.twitter ?? '',
    icon: <Twitter />,
    isExternal: true,
    eventName: 'Social: X',
    type: 'LINK',
  },
];

export const COMMAND_APPEARANCE = [];

/**
 * Footer navigation links.
 *
 */
export const FOOTER_LINKS = [
  {
    header: 'General',
    links: [
      {
        title: 'Home',
        path: '/',
      },
      {
        title: 'About',
        path: ROUTES.about,
      },
      {
        title: 'Dashboard',
        path: ROUTES.dashboard,
      },
      {
        title: 'Projects',
        path: ROUTES.projects,
      },
    ],
  },
  {
    header: 'Content',
    links: [
      {
        title: 'Blog',
        path: ROUTES.blog,
      },
      {
        title: 'Snippets',
        path: ROUTES.snippets,
      },
      {
        title: 'Uses',
        path: ROUTES.uses,
      },
    ],
  },
  {
    header: 'Community',
    links: [
      {
        title: 'Guestbook',
        path: ROUTES.guestbook,
      },
      {
        title: 'Endorsements',
        path: ROUTES.endorsements,
      },
    ],
  },
];

/**
 * Footer social icon links.
 */
export const FOOTER_ICON_LINKS = [
  {
    title: 'GitHub',
    url: SITE.author.github.url,
    icon: <GitHub className="size-4" />,
    className: 'hover:text-current',
  },
  {
    title: 'LinkedIn',
    url: SITE.author.linkedIn,
    icon: <LinkedIn className="size-4" />,
    className: 'hover:text-[#0A66C2]',
  },
  {
    title: 'RSS Feed',
    url: '/feed.xml',
    icon: <RSS className="size-4" />,
    className: 'hover:text-[#FFA500]',
  },
];
