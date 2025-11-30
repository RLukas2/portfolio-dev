'use client';

import Image from 'next/image';
import { useMemo } from 'react';

import type { ContentThumbnailProps } from '../../types/content';

const ContentThumbnail = ({
  image,
  title,
  imageMeta,
}: ContentThumbnailProps) => {
  const parsedImageMeta = useMemo(() => {
    if (!imageMeta) return null;
    return JSON.parse(imageMeta) as {
      width: number;
      height: number;
      placeholder?: 'blur' | 'empty';
      blurDataURL?: string;
    };
  }, [imageMeta]);

  // If there's no image or image metadata, return null
  if (!image || !parsedImageMeta) {
    return null;
  }

  return (
    <div className="relative h-64 w-full overflow-hidden">
      <Image
        src={image as string}
        alt={title}
        priority
        fill
        className="object-cover"
        {...(parsedImageMeta?.blurDataURL && {
          placeholder: 'blur',
          blurDataURL: parsedImageMeta.blurDataURL,
        })}
      />
      <div className="from-background absolute inset-0 bg-linear-to-t to-transparent" />
    </div>
  );
};

export default ContentThumbnail;
