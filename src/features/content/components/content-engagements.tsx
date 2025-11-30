import { cn } from '@/lib/utils';

import Reactions from './reactions';
import ShareButton from './share-button';

const ContentEngagements = ({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'mx-auto mt-16 flex w-full max-w-sm sm:max-w-md print:hidden',
        className,
      )}
    >
      <div className="bg-card relative flex w-full flex-wrap items-center justify-center gap-4 rounded-lg p-4 md:justify-between">
        <Reactions slug={slug} />
        <ShareButton slug={slug} />
      </div>
    </div>
  );
};

export default ContentEngagements;
