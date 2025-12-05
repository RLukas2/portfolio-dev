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
    icon: <SiFacebook className="size-8" />,
  },
  {
    label: 'Twitter',
    url: 'https://twitter.com/RickieLukas',
    icon: <SiX className="size-8" />,
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/xbrk',
    icon: <SiLinkedin className="size-8" />,
  },
];

export const MONKEYTYPE_URL = 'https://monkeytype.com/profile/xbrk';
export const MONKEYTYPE_STATS = {
  wpm: 126,
  time: '15s',
  accuracy: '98%',
};
