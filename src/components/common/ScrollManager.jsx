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
    let cancelled = false;
    const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));

    const waitForTarget = async () => {
      for (let attempt = 0; attempt < 60; attempt += 1) {
        if (cancelled) return false;
        if (document.getElementById(id)) return true;
        await nextFrame();
      }
      return false;
    };

    const scrollWhenReady = async () => {
      await document.fonts?.ready;
      if (!(await waitForTarget())) return;
      await nextFrame();
      await nextFrame();
      if (!cancelled) scrollToId(id, { immediate: true });
    };

    scrollWhenReady();

    return () => {
      cancelled = true;
    };
  }, [pathname, hash]);

  return null;
}
