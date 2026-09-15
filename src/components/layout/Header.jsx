import { useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, ArrowRight } from 'lucide-react';
import { gym } from '../../data/gym';
import { NAV_LINKS } from '../../utils/constants';
import { useScrolled } from '../../hooks/useScrolled';
import { useActiveSection } from '../../hooks/useActiveSection';
import { resumeSmoothScroll, scrollToId, scrollToTop } from '../../lib/smoothScroll';
import { cn } from '../../utils/helpers';
import Button from '../common/Button';
import MobileMenu from './MobileMenu';

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

const LINK =
  'relative inline-block py-2 text-micro font-semibold uppercase text-text-dim ' +
  'transition-colors duration-fast ease-snap hover:text-text ' +
  "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-accent after:content-[''] " +
  'after:origin-left after:scale-x-0 after:transition-transform after:duration-base after:ease-snap ' +
  'hover:after:scale-x-100';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(30);
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  const onHome = pathname === '/';
  const active = useActiveSection(SECTION_IDS, { enabled: onHome, resetKey: `${pathname}${hash}` });

  // The header sits over the hero only at the top of the homepage.
  const overlay = onHome && !scrolled;

  /** Same-page anchors scroll; from another route, go home then scroll. */
  const goToSection = useCallback(
    (e, id) => {
      e.preventDefault();
      setMenuOpen(false);
      if (onHome) {
        resumeSmoothScroll();
        scrollToId(id);
        // Keep the URL shareable without triggering ScrollManager's jump.
        window.history.replaceState(null, '', `#${id}`);
      } else {
        navigate(`/#${id}`);
      }
    },
    [onHome, navigate]
  );

  const goHome = useCallback(
    (e) => {
      e.preventDefault();
      setMenuOpen(false);
      resumeSmoothScroll();
      navigate('/', { replace: true });
      scrollToTop({ immediate: true });
    },
    [navigate]
  );

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[100] border-b transition-[background-color,border-color,backdrop-filter] duration-base ease-snap',
          overlay
            ? 'border-transparent bg-transparent'
            : 'border-text/10 bg-bg/85 backdrop-blur-md backdrop-saturate-150'
        )}
      >
        <div className="mx-auto flex h-header max-w-wide items-center justify-between gap-6 px-gutter">
          <Link
            to="/"
            onClick={goHome}
            className="flex flex-none items-end gap-[0.3125rem]"
            aria-label={`${gym.name} home`}
          >
            <span className="font-display text-[1.375rem] uppercase leading-none tracking-[0.02em] text-text">
              {gym.name}
            </span>
            <span
              aria-hidden="true"
              className="mb-[0.1875rem] h-[0.3125rem] w-[0.3125rem] flex-none bg-accent"
            />
          </Link>

          <nav className="hidden xl:block" aria-label="Main">
            <ul className="flex items-center gap-[clamp(1.25rem,2.5vw,2.5rem)]">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => goToSection(e, link.id)}
                    aria-current={active === link.id ? 'true' : undefined}
                    className={cn(LINK, active === link.id && 'text-text after:scale-x-100')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-none items-center gap-3">
            <Button to="/book-trial" icon={ArrowRight} className="hidden xl:inline-flex">
              Book a free trial
            </Button>

            <button
              type="button"
              className="-mr-2 inline-flex h-12 w-12 items-center justify-center rounded-xs border border-text/10 text-text transition-[border-color,color] duration-fast ease-snap hover:border-accent hover:text-accent-bright xl:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={goToSection} />
    </>
  );
}
