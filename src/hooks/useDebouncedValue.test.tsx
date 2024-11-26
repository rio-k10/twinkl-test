import { renderHook, act } from '@testing-library/react';
import useDebouncedValue from './useDebouncedValue';

describe('useDebouncedValue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(global, 'clearTimeout');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebouncedValue('initial', 500));

    expect(result.current).toBe('initial');
  });

  it('should update the debounced value after the delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    );

    rerender({ value: 'updated', delay: 500 });

    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should reset the debounce timer if the value changes within the delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    );

    rerender({ value: 'updated1', delay: 500 });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('initial');

    rerender({ value: 'updated2', delay: 500 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated2');
  });

  it('should clear the timer when unmounted', () => {
    const { unmount } = renderHook(() => useDebouncedValue('initial', 500));

    unmount();

    expect(clearTimeout).toHaveBeenCalled();
  });
});
