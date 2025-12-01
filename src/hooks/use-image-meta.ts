import { useMemo } from 'react';

interface ImageMeta {
  width: number;
  height: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

interface ImageProps {
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

/**
 * Hook to parse image metadata and return Next.js Image props
 * Reduces code duplication across post, project, and content cards
 */
export const useImageMeta = (imageMeta?: string) => {
  const parsedMeta = useMemo<ImageMeta | null>(() => {
    if (!imageMeta) return null;
    try {
      return JSON.parse(imageMeta);
    } catch {
      return null;
    }
  }, [imageMeta]);

  const imageProps = useMemo<ImageProps>(() => {
    if (parsedMeta?.blurDataURL) {
      return {
        placeholder: 'blur',
        blurDataURL: parsedMeta.blurDataURL,
      };
    }
    return {};
  }, [parsedMeta]);

  return { parsedMeta, imageProps };
};
