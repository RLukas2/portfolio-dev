import { ChevronRightIcon, RocketIcon } from 'lucide-react';
import Link from 'next/link';

import { Email, GitHub, LinkedIn } from '@/components/common/icons';
import { Button } from '@/components/ui/button';
import { SITE } from '@/constants/site';
import { cn } from '@/lib/utils';

const GetInTouch = () => {
  return (
    <div className="bg-card relative space-y-4 rounded-lg p-8">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 dark:bg-primary/30 text-primary rounded-full p-2">
          <RocketIcon />
        </div>
        <h3 className="font-cal text-card-foreground text-lg font-bold md:text-xl">
          Let's work together
        </h3>
      </div>
      <p className="text-muted-foreground">
        I'm available for freelance projects and would love to explore potential
        collaborations. Feel free to reach out, and let's discuss how we can
        work together!
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild variant="shadow" className="group gap-x-2">
          <Link href={`mailto:${SITE.author.email}?subject=Hi Tuan!`}>
            <Email className="size-4" />
            Email Me
            <ChevronRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          size="icon"
          className={cn('hover:text-[#0A66C2]')}
        >
          <Link
            href={SITE.author.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <LinkedIn className="size-4" />
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          size="icon"
          className={cn('hover:text-foreground')}
        >
          <Link
            href={SITE.author.github.url}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            aria-label="Visit my GitHub profile"
          >
            <GitHub className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default GetInTouch;
