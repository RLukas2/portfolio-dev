'use client';

import Image from 'next/image';

import type { ContentThumbnailProps } from '../../types/content';

const ContentThumbnail = ({
  image,
  title,
  imageMeta,
}: ContentThumbnailProps) => {
  // If there's no image or image metadata, return null
  if (!image || !imageMeta) {
    return null;
  }

  const parsedImageMeta: {
    width: number;
    height: number;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
  } = JSON.parse(imageMeta);

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
