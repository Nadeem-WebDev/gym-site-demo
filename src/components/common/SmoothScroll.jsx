import { useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { startSmoothScroll, stopSmoothScroll } from '../../lib/smoothScroll';

/** Binds Lenis to the window scroll, unless the visitor opted out of motion. */
export default function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      stopSmoothScroll();
      return undefined;
    }
    return startSmoothScroll();
  }, [reduced]);

  return null;
}
