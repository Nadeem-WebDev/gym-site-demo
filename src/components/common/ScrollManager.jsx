import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToId, scrollToTop } from '../../lib/smoothScroll';

/**
 * Route changes go to the top; a hash in the URL scrolls to that section once
 * it has rendered. Both go through Lenis when smooth scrolling is running.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      scrollToTop({ immediate: true });
      return undefined;
    }

    const id = hash.slice(1);
    // Two frames: one for the route to render, one for Lenis to measure it.
    let second = null;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => scrollToId(id, { immediate: true }));
    });

    return () => {
      cancelAnimationFrame(first);
      if (second) cancelAnimationFrame(second);
    };
  }, [pathname, hash]);

  return null;
}
