import { SiFacebook, SiLinkedin, SiX } from 'react-icons/si';

interface SocialLink {
  label: string;
  url: string;
  icon: React.ReactNode;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Facebook',
    url: 'https://www.facebook.com/RickieLukas',
    icon: <SiFacebook className="size-10" />,
  },
  {
    label: 'Twitter',
    url: 'https://twitter.com/RickieLukas',
    icon: <SiX className="size-10" />,
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/xbrk',
    icon: <SiLinkedin className="size-10" />,
  },
];
