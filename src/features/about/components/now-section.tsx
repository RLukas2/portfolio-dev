import { RocketIcon } from 'lucide-react';

import { nowItems } from '@/features/about/constants';

/**
 * NowSection component displays the current activities and focuses.
 *
 * @returns {React.ReactNode} The NowSection component.
 */
const NowSection = (): React.ReactNode => {
  return (
    <div className="border-primary/20 from-primary/5 my-8 rounded-lg border bg-gradient-to-br to-transparent p-6">
      <div className="mb-4 flex items-center gap-2">
        <RocketIcon className="text-primary size-5" />
        <h2 className="font-cal m-0 text-2xl">What I'm Up To Now</h2>
      </div>

      <ul className="m-0">
        {nowItems.map((item, index) => (
          <li key={index} className="list-disc pl-5">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NowSection;
