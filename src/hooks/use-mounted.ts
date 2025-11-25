/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';

/**
 * Checks if the component is mounted.
 * This requires eslint rule react-hooks/set-state-in-effect to be disabled.
 * Because by default, setting state in useEffect is discouraged to avoid performance issues.
 *
 * @returns {boolean} - True if the component is mounted, false otherwise.
 */
const useMounted = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

export default useMounted;
