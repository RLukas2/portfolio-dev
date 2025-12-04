import { act, renderHook } from '@testing-library/react';

import { useCopyButton } from '@/hooks/use-copy-button';

describe('useCopyButton', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should initialize with checked as false', () => {
    const onCopy = jest.fn();
    const { result } = renderHook(() => useCopyButton(onCopy));

    const [checked] = result.current;
    expect(checked).toBe(false);
  });

  it('should set checked to true when onClick is called', () => {
    const onCopy = jest.fn();
    const { result } = renderHook(() => useCopyButton(onCopy));

    act(() => {
      const [, onClick] = result.current;
      onClick({} as React.MouseEvent);
    });

    const [checked] = result.current;
    expect(checked).toBe(true);
    expect(onCopy).toHaveBeenCalledTimes(1);
  });

  it('should reset checked to false after timeout', () => {
    const onCopy = jest.fn();
    const { result } = renderHook(() => useCopyButton(onCopy));

    act(() => {
      const [, onClick] = result.current;
      onClick({} as React.MouseEvent);
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(result.current[0]).toBe(false);
  });

  it('should clear timeout on unmount', () => {
    const onCopy = jest.fn();
    const { result, unmount } = renderHook(() => useCopyButton(onCopy));

    act(() => {
      const [, onClick] = result.current;
      onClick({} as React.MouseEvent);
    });

    unmount();

    act(() => {
      jest.advanceTimersByTime(1500);
    });
  });
});
