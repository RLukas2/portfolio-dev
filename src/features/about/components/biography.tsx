import { FileTextIcon } from 'lucide-react';

import { Email, GitHub, LinkedIn } from '@/components/icons';
import Link from '@/components/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';

import TechStacks from './tech-stacks';

const Biography = () => {
  return (
    <>
      <p className="text-xl font-semibold">
        Hi there! Thanks for visiting my digital home on the internet.
      </p>
      <p>
        I'm <span className="text-primary font-bold">Ngo Hoang Tuan</span>, a
        software engineer who genuinely enjoys building things that work and
        more importantly, things that matter to education, businesses, and
        users. I spend my time juggling both ends of the stack: frontend work
        and backend development.
      </p>
      <p>
        Over the years, I've learned how to architect systems that don't just
        technically work, but actually solve real problems. I've worked across
        the full spectrum, from crafting interactive user experiences to
        designing robust backend infrastructure that scales. Here's the toolkit
        I've built up:
      </p>
      <ul>
        <li>
          Languages:{' '}
          <Link href="https://www.typescriptlang.org/">TypeScript</Link>,{' '}
          <Link href="https://www.javascript.com/">JavaScript</Link>,{' '}
          <Link href="https://www.python.org/">Python</Link>,{' '}
          <Link href="https://go.dev/">Go</Link>,{' '}
          <Link href="https://en.cppreference.com/w/">C++</Link>
        </li>

        <li>
          Frontend Frameworks: <Link href="https://reactjs.org/">React</Link>,{' '}
          <Link href="https://nextjs.org/">Next.js</Link>
        </li>

        <li>
          Backend Frameworks:{' '}
          <Link href="https://expressjs.com/">Express.js</Link>,{' '}
          <Link href="https://fastapi.tiangolo.com/">FastAPI</Link>,{' '}
          <Link href="https://gin-gonic.com/">Gin (Go)</Link>,{' '}
          <Link href="https://pkg.go.dev/net/http">Go net/http</Link>
        </li>

        <li>
          Databases: <Link href="https://www.postgresql.org/">PostgreSQL</Link>,{' '}
          <Link href="https://www.mongodb.com/">MongoDB</Link>,{' '}
          <Link href="https://redis.io/">Redis</Link>,{' '}
          <Link href="https://supabase.com/">Supabase</Link>
        </li>

        <li>
          Tools & Platforms: <Link href="https://www.docker.com/">Docker</Link>,{' '}
          <Link href="https://www.postman.com/">Postman</Link>,{' '}
          <Link href="https://git-scm.com/">Git</Link>,{' '}
          <Link href="https://vercel.com/">Vercel</Link>,{' '}
          <Link href="https://railway.app/">Railway</Link>,{' '}
          <Link href="https://supabase.com/">Supabase</Link>
        </li>
      </ul>

      <p>
        What I really enjoy about my work is the collaborative side,
        understanding what an organization actually needs (beyond the technical
        requirements) and then engineering solutions suitable to those goals.
        It's not just about writing clean code; it's about writing code that
        creates tangible value.
      </p>
      <p>
        Outside of work, I'm perpetually curious about new tools and approaches.
        You'll find me tinkering on side projects most nights, partly because I
        genuinely love exploring emerging tech, and partly because it keeps my
        skills sharp. The tech landscape moves fast, so staying engaged with
        what's new keeps things interesting.
      </p>
      <p>
        When I'm not coding, I'm usually unwinding with video games or music.
        Honestly, I think they're essential for maintaining sanity in this
        field. A healthy balance between shipping code and actually having a
        life? That's the real debugging skill. 🎮🎶
      </p>
      <p>
        Want to dig deeper into what I've worked on? Check out my resume to see
        the full picture.{' '}
      </p>
      <Link href={ROUTES.resume} className="text-inherit">
        <Button variant="shadow" className="gap-x-1">
          <FileTextIcon /> My Resume
        </Button>
      </Link>

      <h2 className="font-cal">Tech Stack</h2>
      <TechStacks />

      <h2 className="font-cal">Let's Connect</h2>
      <p>
        Questions or collaborations? Reach out to me at{' '}
        <Link
          href={`mailto:${SITE.author.email}?subject=Hi Tuan!`}
          className="underline"
        >
          {SITE.author.email}
        </Link>{' '}
        or connect through social media. Let's build something amazing together!
      </p>
      <div className="my-2 flex items-center gap-4">
        <Link
          href={SITE.author.github.url}
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <GitHub className="size-5" />
        </Link>
        <Link
          href={SITE.author.linkedIn}
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <LinkedIn className="size-5" />
        </Link>
        <Link
          href={`mailto:${SITE.author.email}?subject=Hi Tuan!`}
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Email className="size-5" />
        </Link>
      </div>
    </>
  );
};

export default Biography;
