import {
  type MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

/**
 * A hook to manage the state of a copy button.
 *
 * @param {() => void} onCopy - The callback function to execute on copy action.
 * @returns {[checked: boolean, onClick: MouseEventHandler]} - An array containing the checked state and the onClick handler.
 */
export const useCopyButton = (
  onCopy: () => void,
): [checked: boolean, onClick: MouseEventHandler] => {
  const [checked, setChecked] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const callbackRef = useRef(onCopy);

  // Move ref assignment to effect
  useEffect(() => {
    callbackRef.current = onCopy;
  }, [onCopy]);

  const onClick: MouseEventHandler = useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setChecked(false);
    }, 1500);
    callbackRef.current();
    setChecked(true);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return [checked, onClick];
};
