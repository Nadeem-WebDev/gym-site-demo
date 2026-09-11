import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowRight, Phone } from 'lucide-react';
import { gym, gymLocationLine } from '../../data/gym';
import { NAV_LINKS } from '../../utils/constants';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { pauseSmoothScroll, resumeSmoothScroll } from '../../lib/smoothScroll';
import Button from '../common/Button';

export default function MobileMenu({ open, onClose, onNavigate }) {
  const reduced = useReducedMotion();
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const returnFocusRef = useRef(null);

  // Escape closes, body scroll locks, focus moves in and back out again.
  useEffect(() => {
    if (!open) return undefined;

    returnFocusRef.current = document.activeElement;
    document.body.classList.add('no-scroll');
    pauseSmoothScroll();
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const nodes = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('no-scroll');
      resumeSmoothScroll();
      returnFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  const dur = reduced ? 0 : 0.44;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[150] xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.24 }}
        >
          <button
            className="absolute inset-0 w-full cursor-pointer bg-[rgb(5_5_6/0.72)] backdrop-blur-[3px]"
            onClick={onClose}
            aria-label="Close menu"
            tabIndex={-1}
          />

          <motion.div
            className="absolute inset-y-0 right-0 flex w-[min(23rem,100%)] flex-col overflow-y-auto border-l border-text/10 bg-bg-2 px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-6"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ x: reduced ? 0 : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: reduced ? 0 : '100%' }}
            transition={{ duration: dur, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between gap-4 pb-8">
              <p className="micro">{gymLocationLine}</p>
              <button
                type="button"
                className="-mr-2.5 inline-flex h-12 w-12 items-center justify-center rounded-xs border border-text/10 text-text transition-[border-color,color] duration-fast ease-snap hover:border-accent hover:text-accent-bright"
                onClick={onClose}
                aria-label="Close menu"
                ref={closeRef}
              >
                <X size={22} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-1 items-center" aria-label="Mobile">
              <ul className="w-full [&>li:first-child_a]:border-t-0">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={reduced ? false : { opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: reduced ? 0 : 0.4,
                      delay: reduced ? 0 : 0.12 + i * 0.055,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a
                      href={`#${link.id}`}
                      className="drawer-link"
                      onClick={(e) => onNavigate?.(e, link.id)}
                    >
                      <span className="micro flex-none font-body">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="grid gap-4 pt-8">
              <Button to="/book-trial" icon={ArrowRight} block onClick={onClose}>
                Book a free trial
              </Button>
              <a
                className="inline-flex min-h-12 items-center gap-2 justify-self-start text-sm text-text-dim hover:text-accent-bright"
                href={`tel:${gym.phoneDial}`}
              >
                <Phone size={15} strokeWidth={1.75} aria-hidden="true" />
                {gym.phoneDisplay}
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
