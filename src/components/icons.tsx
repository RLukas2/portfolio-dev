import type { ComponentProps } from 'react';
import { FaAt, FaBars, FaFile, FaHome, FaTwitter } from 'react-icons/fa';
import type { IconType } from 'react-icons/lib';
import {
  LuCoffee,
  LuCommand,
  LuExpand,
  LuFileCode2,
  LuMaximize,
  LuMedal,
  LuMinimize2,
  LuMonitor,
  LuMoon,
  LuPencil,
  LuRefreshCw,
  LuSun,
} from 'react-icons/lu';
import { MdDashboard, MdEmail } from 'react-icons/md';
import {
  SiAmazonwebservices,
  SiAndroid,
  SiApple,
  SiBootstrap,
  SiCplusplus,
  SiDocker,
  SiExpress,
  SiGin,
  SiGit,
  SiGithub,
  SiGoland,
  SiGoogle,
  SiJavascript,
  SiJest,
  SiJquery,
  SiKotlin,
  SiLaravel,
  SiLinkedin,
  SiMdx,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNuxtdotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPython,
  SiRabbitmq,
  SiReact,
  SiRedis,
  SiRss,
  SiRuby,
  SiRubyonrails,
  SiShadcnui,
  SiSpotify,
  SiSpring,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
  SiWakatime,
} from 'react-icons/si';
import { TbBrandFramerMotion } from 'react-icons/tb';

/**
 * Core Icons
 */
//#region Core Icons
export const Command = (props: ComponentProps<IconType>) => (
  <LuCommand {...props} />
);

export const Moon = (props: ComponentProps<IconType>) => <LuMoon {...props} />;

export const Sun = (props: ComponentProps<IconType>) => <LuSun {...props} />;

export const MenuKebab = (props: ComponentProps<IconType>) => (
  <FaBars {...props} />
);

export const Minimize = ({ ...props }: ComponentProps<IconType>) => (
  <LuMinimize2 {...props} />
);

export const Maximize = ({ ...props }: ComponentProps<IconType>) => (
  <LuMaximize {...props} />
);

export const Refresh = ({ ...props }: ComponentProps<IconType>) => (
  <LuRefreshCw {...props} />
);

export const Expand = ({ ...props }: ComponentProps<IconType>) => (
  <LuExpand {...props} />
);
//#endregion // Core Icons

/**
 * Navigation Icons
 */
//#region // Navigation Icons
export const Home = (props: ComponentProps<IconType>) => <FaHome {...props} />;

export const AtSign = (props: ComponentProps<IconType>) => <FaAt {...props} />;

export const Pencil = (props: ComponentProps<IconType>) => (
  <LuPencil {...props} />
);

export const Coffee = (props: ComponentProps<IconType>) => (
  <LuCoffee {...props} />
);

export const Dashboard = (props: ComponentProps<IconType>) => (
  <MdDashboard {...props} />
);

export const FileCode = (props: ComponentProps<IconType>) => (
  <LuFileCode2 {...props} />
);

export const Medal = (props: ComponentProps<IconType>) => (
  <LuMedal {...props} />
);

export const Monitor = ({ ...props }: ComponentProps<IconType>) => (
  <LuMonitor {...props} />
);
//#endregion

/**
 * Social Icons
 */

export const Email = (props: ComponentProps<IconType>) => (
  <MdEmail {...props} />
);

export const GitHub = (props: ComponentProps<IconType>) => (
  <SiGithub {...props} />
);

export const Google = (props: ComponentProps<IconType>) => (
  <SiGoogle {...props} />
);

export const LinkedIn = (props: ComponentProps<IconType>) => (
  <SiLinkedin {...props} />
);

export const Twitter = (props: ComponentProps<IconType>) => (
  <FaTwitter {...props} />
);

/**
 * Programming Languages
 */
export const TypeScript = ({ ...props }: ComponentProps<IconType>) => (
  <SiTypescript {...props} />
);

export const JavaScript = (props: ComponentProps<IconType>) => (
  <SiJavascript {...props} />
);

export const Kotlin = (props: ComponentProps<IconType>) => (
  <SiKotlin {...props} />
);

export const Python = (props: ComponentProps<IconType>) => (
  <SiPython {...props} />
);

export const CPP = (props: ComponentProps<IconType>) => (
  <SiCplusplus {...props} />
);

export const GoLang = (props: ComponentProps<IconType>) => (
  <SiGoland {...props} />
);

export const Ruby = (props: ComponentProps<IconType>) => <SiRuby {...props} />;

export const PHP = (props: ComponentProps<IconType>) => <SiPhp {...props} />;

/**
 * Frontend Frameworks & Libraries
 */
export const ReactJS = (props: ComponentProps<IconType>) => (
  <SiReact {...props} />
);

export const NextJS = (props: ComponentProps<IconType>) => (
  <SiNextdotjs {...props} />
);

export const VueJS = ({ ...props }: ComponentProps<IconType>) => (
  <SiVuedotjs {...props} />
);

export const NuxtJS = ({ ...props }: ComponentProps<IconType>) => (
  <SiNuxtdotjs {...props} />
);

export const JQuery = ({ ...props }: ComponentProps<IconType>) => (
  <SiJquery {...props} />
);

/**
 * Backend Frameworks
 */
export const Laravel = (props: ComponentProps<IconType>) => (
  <SiLaravel {...props} />
);

export const Spring = ({ ...props }: ComponentProps<IconType>) => (
  <SiSpring {...props} />
);

export const RubyOnRails = ({ ...props }: ComponentProps<IconType>) => (
  <SiRubyonrails {...props} />
);

export const Gin = (props: ComponentProps<IconType>) => <SiGin {...props} />;

export const ExpressJS = (props: ComponentProps<IconType>) => (
  <SiExpress {...props} />
);

/**
 * Databases & Data Storage
 */
export const MySQL = (props: ComponentProps<IconType>) => (
  <SiMysql {...props} />
);

export const PostgreSQL = (props: ComponentProps<IconType>) => (
  <SiPostgresql {...props} />
);

export const Redis = ({ ...props }: ComponentProps<IconType>) => (
  <SiRedis {...props} />
);

export const MongoDB = (props: ComponentProps<IconType>) => (
  <SiMongodb {...props} />
);

/**
 * CSS Frameworks & UI Libraries
 */
export const TailwindCSS = ({ ...props }: ComponentProps<IconType>) => (
  <SiTailwindcss {...props} />
);

export const Bootstrap = ({ ...props }: ComponentProps<IconType>) => (
  <SiBootstrap {...props} />
);

export const ShadcnUI = ({ ...props }: ComponentProps<IconType>) => (
  <SiShadcnui {...props} />
);

/**
 * Development Tools & Services
 */
export const Postman = ({ ...props }: ComponentProps<IconType>) => (
  <SiPostman {...props} />
);

export const Docker = ({ ...props }: ComponentProps<IconType>) => (
  <SiDocker {...props} />
);

export const Git = ({ ...props }: ComponentProps<IconType>) => (
  <SiGit {...props} />
);

export const Jest = ({ ...props }: ComponentProps<IconType>) => (
  <SiJest {...props} />
);

export const Prisma = ({ ...props }: ComponentProps<IconType>) => (
  <SiPrisma {...props} />
);

/**
 * Cloud & Deployment
 */

export const AWS = ({ ...props }: ComponentProps<IconType>) => (
  <SiAmazonwebservices {...props} />
);

export const Vercel = ({ ...props }: ComponentProps<IconType>) => (
  <SiVercel {...props} />
);

export const Supabase = ({ ...props }: ComponentProps<IconType>) => (
  <SiSupabase {...props} />
);

/**
 * Mobile Development
 */
export const Android = ({ ...props }: ComponentProps<IconType>) => (
  <SiAndroid {...props} />
);

export const IOS = ({ ...props }: ComponentProps<IconType>) => (
  <SiApple {...props} />
);

/**
 * Animation & Motion
 */
export const FramerMotion = ({ ...props }: ComponentProps<IconType>) => (
  <TbBrandFramerMotion {...props} />
);

/**
 * Content & Documentation
 */
export const MDX = ({ ...props }: ComponentProps<IconType>) => (
  <SiMdx {...props} />
);

/**
 * Message Queuing & Communication
 */
export const RabbitMQ = (props: ComponentProps<IconType>) => (
  <SiRabbitmq {...props} />
);

/**
 * Other Icons
 */

export const Spotify = ({ ...props }: ComponentProps<IconType>) => (
  <SiSpotify {...props} />
);

export const WakaTime = ({ ...props }: ComponentProps<IconType>) => (
  <SiWakatime {...props} />
);

export const RSS = ({ ...props }: ComponentProps<IconType>) => (
  <SiRss {...props} />
);

export const MoodSad = ({ ...props }: ComponentProps<IconType>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
    >
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
      <path d="M14.5 16.05a3.5 3.5 0 0 0-5 0m-1-4.55L10 10L8.5 8.5m7 3L14 10l1.5-1.5" />
    </g>
  </svg>
);

export const Document = ({ ...props }: ComponentProps<IconType>) => (
  <FaFile {...props} />
);
