import { cloneElement } from 'react';
import { FaLayerGroup } from 'react-icons/fa';

import Marquee from '@/components/effects/marquee';
import { Badge } from '@/components/ui/badge';
import { SKILLS } from '@/features/resume/constants/skills';
import { cn } from '@/lib/utils';

interface TechStackWidgetProps {
  className?: string;
}

export function TechStackWidget({ className = '' }: TechStackWidgetProps) {
  // Flatten all skills from all categories
  const allSkills = SKILLS.flatMap((category) => category.skills);

  return (
    <div
      className={cn(
        'flex size-full flex-col gap-6 p-4',
        'relative overflow-hidden',
        'max-md:gap-8',
        className,
      )}
    >
      {/* Header Badge */}
      <Badge variant="wide" className="gap-2">
        <FaLayerGroup className="size-6" />
        <span className="text-sm">Tech Stack</span>
      </Badge>{' '}
      {/* Marquee with Tech Badges */}
      <div className="flex grow items-center justify-center">
        <Marquee fade speed={20} loopSize={3}>
          {allSkills
            .filter((skill) => skill.icon)
            .map((skill) =>
              cloneElement(skill.icon!, {
                key: skill.name,
                className: 'size-15 mx-2',
              }),
            )}
        </Marquee>
      </div>
      {/* Description */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">
          Tech stacks I&apos;m familiar with
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Primarily focused on the JavaScript ecosystem, but always eager to
          explore and learn new technologies.
        </p>
      </div>
    </div>
  );
}
