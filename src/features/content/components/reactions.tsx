'use client';

import type { ReactionType } from '@prisma/client';
import { motion, useAnimationControls } from 'framer-motion';
import { useCallback, useEffect, useMemo } from 'react';

import Counter from '@/components/counter';

import { MAX_REACTIONS_PER_SESSION } from '../constants';
import { useReactions } from '../hooks/use-reactions';
import EmojiReaction from './emoji-reaction';

const Reactions = ({ slug }: { slug: string }) => {
  const { reactions, addReaction, isLoading } = useReactions(slug);
  const controls = useAnimationControls();

  useEffect(() => {
    if (!isLoading) {
      controls.start({
        y: 0,
        opacity: 1,
        pointerEvents: 'auto',
        transition: { delay: 0.5, duration: 0.15 },
      });
    }
  }, [controls, isLoading]);

  const userReactions = reactions.user.reactions;
  const contentReactions = reactions.content.reactions;

  const { LIKED = 0, CLAPPING = 0, LOVED = 0, THINKING = 0 } = contentReactions;

  const getRemainingQuota = useCallback(
    (type: ReactionType): number =>
      MAX_REACTIONS_PER_SESSION - userReactions[type],
    [userReactions],
  );

  const isReachMaximumQuota = useCallback(
    (type: ReactionType): boolean => getRemainingQuota(type) <= 0,
    [getRemainingQuota],
  );

  const emojiReactions = useMemo(
    () => [
      {
        title: 'Like',
        defaultEmoji: '/emojis/thumbs-up.png',
        animatedEmoji: '/emojis/thumbs-up-animated.png',
        disabledEmoji: '/emojis/victory-hand.png',
        type: 'LIKED' as ReactionType,
        count: LIKED,
      },
      {
        title: 'Claps',
        defaultEmoji: '/emojis/clapping-hands.png',
        animatedEmoji: '/emojis/clapping-hands-animated.png',
        disabledEmoji: '/emojis/love-you-gesture.png',
        type: 'CLAPPING' as ReactionType,
        count: CLAPPING,
      },
      {
        title: 'Love',
        defaultEmoji: '/emojis/smiling-face-with-heart-eyes.png',
        animatedEmoji: '/emojis/smiling-face-with-heart-eyes-animated.png',
        disabledEmoji: '/emojis/smiling-face-with-hearts.png',
        type: 'LOVED' as ReactionType,
        count: LOVED,
      },
      {
        title: 'Think',
        defaultEmoji: '/emojis/thinking-face.png',
        animatedEmoji: '/emojis/thinking-face-animated.png',
        disabledEmoji: '/emojis/face-with-monocle.png',
        type: 'THINKING' as ReactionType,
        count: THINKING,
      },
    ],
    [LIKED, CLAPPING, LOVED, THINKING],
  );

  return (
    <motion.div
      className="pointer-events-none relative flex items-center"
      initial={{ y: 16, opacity: 0, pointerEvents: 'none' }}
      animate={controls}
    >
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        {emojiReactions.map(
          ({
            title,
            defaultEmoji,
            animatedEmoji,
            disabledEmoji,
            type,
            count,
          }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-1 sm:gap-2"
            >
              <EmojiReaction
                title={title}
                defaultEmoji={defaultEmoji}
                animatedEmoji={animatedEmoji}
                disabledEmoji={disabledEmoji}
                disabled={isReachMaximumQuota(type)}
                onClick={() => addReaction(type)}
              />
              <Counter count={count} />
            </div>
          ),
        )}
      </div>
    </motion.div>
  );
};

export default Reactions;
