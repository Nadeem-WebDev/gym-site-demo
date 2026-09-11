import Lenis from 'lenis';

/**
 * Single Lenis instance for the app. Kept in a module singleton so anchor
 * links and the router can scroll through it rather than fighting it with
 * native window.scrollTo.
 *
 * Nothing here runs when the visitor prefers reduced motion - the caller
 * gates it, and every helper falls back to an instant native scroll.
 */
let lenis = null;
let rafId = null;

export function startSmoothScroll() {
  if (lenis) return stopSmoothScroll;

  lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // Native momentum on touch is better than anything we can emulate.
    syncTouch: false,
  });

  const raf = (time) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  return stopSmoothScroll;
}

export function stopSmoothScroll() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
  lenis?.destroy();
  lenis = null;
}

/** Pause/resume while an overlay owns the viewport, e.g. the mobile drawer. */
export function pauseSmoothScroll() {
  lenis?.stop();
}

export function resumeSmoothScroll() {
  lenis?.start();
}

/** Scroll to an element id, through Lenis when it is running. */
export function scrollToId(id, { offset = 0, immediate = false } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;

  if (lenis) {
    lenis.scrollTo(el, { offset, immediate });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
  }
  return true;
}

export function scrollToTop({ immediate = true } = {}) {
  if (lenis) lenis.scrollTo(0, { immediate });
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}
