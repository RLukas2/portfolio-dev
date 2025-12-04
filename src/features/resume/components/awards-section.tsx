'use client';

import { motion } from 'framer-motion';
import { TrophyIcon } from 'lucide-react';

import EmptyState from '@/components/common/empty-state';
import { formatDate } from '@/lib/utils';

import { AWARDS } from '../constants/awards';

const AwardsSection = () => {
  if (!AWARDS || AWARDS.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="font-cal text-3xl font-bold">Awards & Achievements</h2>
          <p className="text-muted-foreground mt-2">
            Recognition and accomplishments throughout my journey
          </p>
        </div>

        <EmptyState message="The awards maybe ran away from us. Check back some time later..." />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-cal text-3xl font-bold">Awards & Achievements</h2>
        <p className="text-muted-foreground mt-2">
          Recognition and accomplishments throughout my journey
        </p>
      </div>

      <div className="space-y-4">
        {AWARDS.map((award, index) => (
          <motion.div
            key={`${award.title}-${award.date}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card group rounded-xl border p-6 transition-all hover:shadow-lg"
          >
            <div className="flex gap-4">
              {/* Icon */}
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-2xl">
                {award.icon || <TrophyIcon className="size-6 text-white" />}
              </div>

              <div className="flex-1 space-y-2">
                <div>
                  {/* Title */}
                  <h3 className="m-0 text-lg font-semibold">{award.title}</h3>

                  {/* Issuer & Date */}
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <span>{award.issuer}</span>
                    <span>•</span>
                    <time dateTime={award.date}>{formatDate(award.date)}</time>
                  </div>
                </div>

                {/* Description */}
                {award.description && (
                  <p className="text-muted-foreground m-0 text-sm">
                    {award.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AwardsSection;
