import { act, renderHook, waitFor } from '@testing-library/react';

import { useAsyncAction } from '@/hooks/use-async-action';

// Mock the toast hook
const mockToast = jest.fn();
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: mockToast }),
}));

// Mock toast utils
jest.mock('@/lib/toast-utils', () => ({
  showErrorToast: jest.fn(),
}));

describe('useAsyncAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should execute action successfully', async () => {
    const mockAction = jest
      .fn<Promise<void>, []>()
      .mockResolvedValue(undefined);
    const { result } = renderHook(() => useAsyncAction(mockAction));

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      await result.current.execute();
    });

    expect(mockAction).toHaveBeenCalledTimes(1);
    expect(result.current.isLoading).toBe(false);
  });

  it('should set loading state during execution', async () => {
    const mockAction = jest.fn<Promise<void>, []>(
      () => new Promise((resolve) => setTimeout(resolve, 100)),
    );
    const { result } = renderHook(() => useAsyncAction(mockAction));

    act(() => {
      result.current.execute();
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });
  it('should call onSuccess callback', async () => {
    const mockAction = jest
      .fn<Promise<void>, []>()
      .mockResolvedValue(undefined);
    const onSuccess = jest.fn();
    const { result } = renderHook(() =>
      useAsyncAction(mockAction, { onSuccess }),
    );

    await act(async () => {
      await result.current.execute();
    });

    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
  it('should handle errors and call onError', async () => {
    const error = new Error('Test error');
    const mockAction = jest.fn<Promise<void>, []>().mockRejectedValue(error);
    const onError = jest.fn();
    const { result } = renderHook(() =>
      useAsyncAction(mockAction, { onError, showToastOnError: false }),
    );

    await act(async () => {
      try {
        await result.current.execute();
      } catch (_) {
        // Expected error
      }
    });

    expect(onError).toHaveBeenCalledWith(error);
  });
  it('should pass arguments to action', async () => {
    const mockAction = jest
      .fn<Promise<void>, [string, string]>()
      .mockResolvedValue(undefined);
    const { result } = renderHook(() => useAsyncAction(mockAction));

    await act(async () => {
      await result.current.execute('arg1', 'arg2');
    });

    expect(mockAction).toHaveBeenCalledWith('arg1', 'arg2');
  });
  it('should prevent concurrent executions', async () => {
    let resolveAction: () => void;
    const mockAction = jest.fn<Promise<void>, []>(
      () =>
        new Promise<void>((resolve) => {
          resolveAction = resolve;
        }),
    );
    const { result } = renderHook(() => useAsyncAction(mockAction));

    // Start first execution
    act(() => {
      result.current.execute();
    });

    expect(result.current.isLoading).toBe(true);

    // Try second execution while first is still running
    act(() => {
      result.current.execute(); // Should be ignored
    });

    // Resolve the first action
    await act(async () => {
      resolveAction!();
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Should only have been called once
    expect(mockAction).toHaveBeenCalledTimes(1);
  });
});
