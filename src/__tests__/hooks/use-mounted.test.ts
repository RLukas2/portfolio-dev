import { renderHook, waitFor } from '@testing-library/react';

import useMounted from '@/hooks/use-mounted';

describe('useMounted', () => {
  it('should return true after mount', async () => {
    const { result } = renderHook(() => useMounted());

    // Wait for the effect to run
    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it('should handle multiple renders', async () => {
    const { result, rerender } = renderHook(() => useMounted());

    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    rerender();
    expect(result.current).toBe(true);
  });
});
