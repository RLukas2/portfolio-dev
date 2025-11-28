'use client';

import Image from 'next/image';

import { useProjectContext } from './project-provider';

const ProjectThumbnail = () => {
  const { image, title, imageMeta } = useProjectContext();

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
    <figure
      className="pointer-events-none absolute top-0 -right-[calc(100vw-100%)] -left-[calc(100vw-100%)] -z-1 max-w-screen overflow-hidden opacity-70 blur saturate-125 transition dark:opacity-65"
      style={{ height: '85vh', maxHeight: 380 }}
    >
      <Image
        src={image as string}
        alt={title}
        priority
        className="size-full object-cover"
        {...parsedImageMeta}
        width={1200}
        height={630}
      />
    </figure>
  );
};

export default ProjectThumbnail;
