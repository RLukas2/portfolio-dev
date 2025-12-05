'use client';

import { useRef } from 'react';

import { Card } from '@/components/common/card';
import { DiscoverWidget } from '@/features/sandbox/components/discover-widget';
import { GitHubWidget } from '@/features/sandbox/components/github-widget';
import LocationWidget from '@/features/sandbox/components/location-widget';
import { SocialWidget } from '@/features/sandbox/components/social-widget';
import { TechStackWidget } from '@/features/sandbox/components/techstack-widget';
import { TypingWidget } from '@/features/sandbox/components/typing-widget';
import {
  MONKEYTYPE_STATS,
  SOCIAL_LINKS,
} from '@/features/sandbox/constants/links';
import { cn } from '@/lib/utils';

interface WidgetGridProps {
  className?: string;
}

const WidgetGrid = ({ className }: WidgetGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={gridRef}
      id="bento"
      className={cn(
        'auto-rows-fr grid-cols-36 flex-col gap-4 max-lg:grid-cols-6 max-md:flex max-md:gap-4 md:grid',
        className,
      )}
      data-testid="widget-grid"
      aria-label="Personal Information Widgets"
    >
      <div className="relative col-start-1 col-end-11 row-start-1 row-end-[7] aspect-square max-lg:col-end-3 max-lg:row-end-3">
        <LocationWidget />
      </div>

      <div className="col-start-1 col-end-11 row-start-[7] row-end-[9] grid grid-cols-3 gap-4 max-lg:col-end-4 max-lg:row-start-3 max-lg:row-end-4">
        {SOCIAL_LINKS.map((link) => (
          <Card
            key={link.label}
            mouseEffect
            className="card roundex-3xl aspect-square"
          >
            <SocialWidget
              key={link.label}
              Icon={link.icon}
              href={link.url}
              label={link.label}
            />
          </Card>
        ))}
      </div>

      <Card
        mouseEffect
        className="card group col-start-11 col-end-[24] row-start-1 row-end-[7] rounded-3xl max-lg:col-start-3 max-lg:col-end-7 max-lg:row-end-3"
      >
        <div>Widget 3</div>
      </Card>
      <Card
        mouseEffect
        className="card group col-start-11 col-end-[24] row-start-[7] row-end-[9] rounded-3xl max-lg:col-start-4 max-lg:col-end-7 max-lg:row-start-3 max-lg:row-end-4"
      >
        <DiscoverWidget
          href="https://www.example.com"
          text="Explore more projects"
        />
      </Card>

      <Card
        mouseEffect
        className="card group col-start-[24] col-end-[37] row-start-1 row-end-4 rounded-3xl max-lg:col-start-1 max-lg:col-end-4 max-lg:row-start-4 max-lg:row-end-6"
      >
        <div>Widget 5</div>
      </Card>
      <Card
        mouseEffect
        className="card group col-start-[24] col-end-[37] row-start-4 row-end-[9] rounded-3xl max-lg:col-start-4 max-lg:col-end-7 max-lg:row-start-4 max-lg:row-end-6"
      >
        <TypingWidget
          wpm={MONKEYTYPE_STATS.wpm}
          time={MONKEYTYPE_STATS.time}
          accuracy={MONKEYTYPE_STATS.accuracy}
        />
      </Card>

      <Card
        mouseEffect
        className="card group col-start-1 col-end-[19] row-start-9 row-end-[15] rounded-3xl max-lg:col-start-1 max-lg:col-end-4 max-lg:row-start-6 max-lg:row-end-9"
      >
        <GitHubWidget />
      </Card>
      <Card
        mouseEffect
        className="card group col-start-[19] col-end-[37] row-start-9 row-end-[15] rounded-3xl max-lg:col-start-4 max-lg:col-end-7 max-lg:row-start-6 max-lg:row-end-9"
      >
        <TechStackWidget />
      </Card>
    </section>
  );
};

WidgetGrid.displayName = 'WidgetGrid';

export default WidgetGrid;
