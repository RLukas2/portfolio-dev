import { renderHook } from '@testing-library/react';

import useScroll from '@/hooks/use-scroll';

describe('useScroll', () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  it('should return false when not scrolled', () => {
    const { result } = renderHook(() => useScroll(100));
    expect(result.current).toBe(false);
  });

  it('should use default threshold of 0', () => {
    const { result } = renderHook(() => useScroll());
    expect(result.current).toBe(false);
  });

  it('should cleanup event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useScroll(100));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );
  });
});
