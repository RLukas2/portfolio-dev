import { useState } from 'react';

import useIsomorphicLayoutEffect from './use-isomorphic-layout-effect';

/**
 * Get a MediaQueryList object for the specified query.
 *
 * @param {string} query
 * @returns {MediaQueryList}
 */
const getMatch = (query: string): MediaQueryList => window.matchMedia(query);

/**
 * Parse the media query string to remove unnecessary parts.
 *
 * @param {string} query - The media query string.
 * @returns {string} - The parsed media query string.
 */
const parseQueryString = (query: string): string =>
  query.replaceAll('@media only screen and', '').trim();

/**
 * Get initial media query match state on client side only.
 *
 * @param {string} query
 * @param {boolean} defaultState
 * @returns {boolean}
 */
const getInitialState = (query: string, defaultState: boolean): boolean => {
  if (typeof window === 'undefined') return defaultState;
  const mql = getMatch(parseQueryString(query));
  return mql?.matches ?? defaultState;
};

/**
 * Custom hook to evaluate and respond to media query changes.
 *
 * @param {string} query - The media query string to evaluate.
 * @param {boolean} [defaultState=false] - The default state if window is undefined.
 * @returns {*}
 */
const useMediaQuery = (query: string, defaultState: boolean = false) => {
  const [state, setState] = useState<boolean>(() =>
    getInitialState(query, defaultState),
  );
  const parseAndMatch = (q: string) => getMatch(parseQueryString(q));

  useIsomorphicLayoutEffect(() => {
    let mounted = true;
    const mql = parseAndMatch(query);

    if (!mql) return;

    const onChange = (): void => {
      if (!mounted) return;
      setState(!!mql.matches);
    };

    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
    } else {
      mql.addListener(onChange); // iOS 13 and below
    }

    setState(mql.matches);

    return () => {
      mounted = false;

      if (mql.removeEventListener) {
        mql.removeEventListener('change', onChange);
      } else {
        mql.removeListener(onChange); // iOS 13 and below
      }
    };
  }, [query]);

  return state;
};

export default useMediaQuery;
