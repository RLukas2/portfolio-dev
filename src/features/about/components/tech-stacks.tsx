'use client';

import { useState } from 'react';

import Marquee from '@/components/marquee';
import { STACKS } from '@/constants/stacks';

const TechStacks = () => {
  const [shuffledStacks] = useState<Array<[string, React.ReactNode]>>(() => {
    const stacks = Object.entries(STACKS);
    return [...stacks].sort(() => Math.random() - 0.5);
  });

  const sliders = Array.from({ length: 2 }, (_, index) => {
    const stackSliders = [...shuffledStacks].sort(() => Math.random() - 0.5);

    return (
      <Marquee key={index} reverse={index === 1} fade pauseOnHover>
        {stackSliders.map(([title, icon], stackIndex) => (
          <div
            key={`${index}-${stackIndex}`}
            className="bg-card shadow-border flex items-center gap-4 rounded-full px-4 py-1.5"
          >
            {icon}
            <span>{title}</span>
          </div>
        ))}
      </Marquee>
    );
  });

  return <div className="space-y-4 overflow-hidden">{sliders}</div>;
};

export default TechStacks;
