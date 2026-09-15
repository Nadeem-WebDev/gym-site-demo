import { useEffect, useState } from 'react';

/**
 * Scroll spy. Tracks which section id is currently dominant so the header can
 * mark it active. Uses IntersectionObserver rather than scroll maths, and
 * picks the entry closest to the top of the viewport when several intersect.
 */
export function useActiveSection(
  ids,
  { enabled = true, rootMargin = '-45% 0px -50% 0px', resetKey = '' } = {}
) {
  const [active, setActive] = useState(null);
  const key = ids.join('|');

  useEffect(() => {
    setActive(null);
    if (!enabled) {
      setActive(null);
      return undefined;
    }

    const sections = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const visible = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        });

        if (!visible.size) {
          setActive(null);
          return;
        }
        // Closest to the top wins when two sections straddle the band.
        const [topId] = [...visible.entries()].sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]))[0];
        setActive(topId);
      },
      { rootMargin, threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key, enabled, rootMargin, resetKey]);

  return active;
}
