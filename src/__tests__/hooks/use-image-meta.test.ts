import { renderHook } from '@testing-library/react';

import { useImageMeta } from '@/hooks/use-image-meta';

describe('useImageMeta', () => {
  it('should return null for undefined imageMeta', () => {
    const { result } = renderHook(() => useImageMeta(undefined));

    expect(result.current.parsedMeta).toBeNull();
    expect(result.current.imageProps).toEqual({});
  });

  it('should parse valid JSON imageMeta', () => {
    const meta = JSON.stringify({
      width: 800,
      height: 600,
      blurDataURL: 'data:image/jpeg;base64,/9j/4AAQ',
    });

    const { result } = renderHook(() => useImageMeta(meta));

    expect(result.current.parsedMeta).toEqual({
      width: 800,
      height: 600,
      blurDataURL: 'data:image/jpeg;base64,/9j/4AAQ',
    });
  });

  it('should return blur placeholder props when blurDataURL exists', () => {
    const meta = JSON.stringify({
      width: 800,
      height: 600,
      blurDataURL: 'data:image/jpeg;base64,/9j/4AAQ',
    });

    const { result } = renderHook(() => useImageMeta(meta));

    expect(result.current.imageProps).toEqual({
      placeholder: 'blur',
      blurDataURL: 'data:image/jpeg;base64,/9j/4AAQ',
    });
  });

  it('should return empty props when no blurDataURL', () => {
    const meta = JSON.stringify({
      width: 800,
      height: 600,
    });

    const { result } = renderHook(() => useImageMeta(meta));

    expect(result.current.imageProps).toEqual({});
  });

  it('should handle invalid JSON gracefully', () => {
    const { result } = renderHook(() => useImageMeta('invalid json'));

    expect(result.current.parsedMeta).toBeNull();
    expect(result.current.imageProps).toEqual({});
  });

  it('should memoize parsed results', () => {
    const meta = JSON.stringify({ width: 800, height: 600 });
    const { result, rerender } = renderHook(
      ({ imageMeta }) => useImageMeta(imageMeta),
      { initialProps: { imageMeta: meta } },
    );

    const firstParsedMeta = result.current.parsedMeta;

    rerender({ imageMeta: meta });

    expect(result.current.parsedMeta).toBe(firstParsedMeta);
  });
});
