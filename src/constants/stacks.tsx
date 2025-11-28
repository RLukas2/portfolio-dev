import type { JSX } from 'react';

import {
  AWS,
  CPP,
  CSharp,
  Docker,
  ExpressJS,
  FramerMotion,
  Gin,
  Git,
  GoLang,
  JavaScript,
  Jest,
  MDX,
  MongoDB,
  NextJS,
  NodeJS,
  PostgreSQL,
  Postman,
  Prisma,
  Python,
  RabbitMQ,
  ReactJS,
  Redis,
  ShadcnUI,
  Supabase,
  TailwindCSS,
  TypeScript,
  Unity,
  Vercel,
} from '@/components/common/icons';

export const STACKS: { [key: string]: JSX.Element } = {
  // --- Languages ---
  TypeScript: <TypeScript className="size-5 fill-[#3178C6]" />,
  JavaScript: <JavaScript className="size-5 fill-[#F7DF1E]" />,
  Python: <Python className="size-5 fill-[#3776AB]" />,
  Go: <GoLang className="size-5 fill-[#00ADD8]" />,
  CPP: <CPP className="size-5 fill-[#00599C]" />,
  CSharp: <CSharp className="size-5 fill-[#68217A]" />,

  // --- Frontend ---
  NextJS: <NextJS className="size-5 fill-black dark:fill-white" />,
  ReactJS: <ReactJS className="size-5 fill-[#61DAFB]" />,
  TailwindCSS: <TailwindCSS className="size-5 fill-[#06B6D4]" />,

  // --- Backend Frameworks ---
  ExpressJS: <ExpressJS className="size-5 fill-black dark:fill-white" />,
  Gin: <Gin className="size-5 fill-[#00ADD8]" />,

  // --- Databases ---
  PostgreSQL: <PostgreSQL className="size-5 fill-[#4169E1]" />,
  MongoDB: <MongoDB className="size-5 fill-[#47A248]" />,
  Redis: <Redis className="size-5 fill-[#FF4438]" />,
  Supabase: <Supabase className="size-5 fill-[#3FCF83]" />,
  Prisma: <Prisma className="size-5 fill-[#2D3748] dark:fill-white" />,
  AWS: <AWS className="size-5 fill-[#FF9900]" />,

  // --- Tools & Platforms ---
  NodeJS: <NodeJS className="size-5 fill-[#339933]" />,
  Docker: <Docker className="size-5 fill-[#2496ED]" />,
  Git: <Git className="size-5 fill-[#F05032]" />,
  Postman: <Postman className="size-5 fill-[#FF6C37]" />,
  Vercel: <Vercel className="size-5 fill-black dark:fill-white" />,
  Jest: <Jest className="size-5 fill-[#C21325]" />,
  MDX: <MDX className="size-5 fill-black dark:fill-white" />,
  RabbitMQ: <RabbitMQ className="size-5 fill-[#FF6600]" />,
  Unity: <Unity className="size-5 fill-[#000000]" />,
};

export const CORE_STACKS: {
  name: string;
  icon: JSX.Element;
  link: string;
}[] = [
  { name: 'Next.js', icon: <NextJS />, link: 'https://nextjs.org' },
  { name: 'React.js', icon: <ReactJS />, link: 'https://react.dev' },
  {
    name: 'Tailwind CSS',
    icon: <TailwindCSS />,
    link: 'https://tailwindcss.com',
  },
  { name: 'MDX', icon: <MDX />, link: 'https://mdxjs.com' },
  {
    name: 'Framer Motion',
    icon: <FramerMotion />,
    link: 'https://www.framer.com/motion',
  },
  {
    name: 'TypeScript',
    icon: <TypeScript />,
    link: 'https://www.typescriptlang.org',
  },
  {
    name: 'Vercel',
    icon: <Vercel />,
    link: 'https://vercel.com',
  },
  {
    name: 'shadcn/ui',
    icon: <ShadcnUI />,
    link: 'https://ui.shadcn.com',
  },
  {
    name: 'Prisma',
    icon: <Prisma />,
    link: 'https://www.prisma.io',
  },
];
