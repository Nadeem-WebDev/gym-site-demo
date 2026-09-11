import { Link } from 'react-router-dom';
import { Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { gym, gymAddressLines, gymLocationLine } from '../../data/gym';
import { NAV_LINKS, FOOTER_PAGES } from '../../utils/constants';

const ICONS = { Instagram, Facebook };
const COL = 'grid content-start gap-3';
const HEAD = 'micro mb-1';
const LINKS = 'grid gap-2 text-sm';
const LINK = 'text-text-dim transition-colors duration-fast ease-quint hover:text-accent-bright';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="overflow-hidden border-t border-text/10 bg-bg pt-[clamp(3.5rem,7vw,6rem)]">
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-[clamp(2rem,4vw,3rem)] md:grid-cols-2 2xl:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="grid content-start gap-4">
            <p className="micro">{gymLocationLine}</p>
            <p className="display max-w-[14ch] text-d3 text-text">{gym.tagline}</p>
          </div>

          <div className={COL}>
            <h2 className={HEAD}>Visit</h2>
            <address className="grid gap-0.5 text-sm text-text-dim">
              {gymAddressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <a
              className="link-arrow mt-2 justify-self-start"
              href={gym.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
              <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>

          <div className={COL}>
            <h2 className={HEAD}>Hours</h2>
            <dl className="grid gap-1.5">
              {gym.openingHours.map((row) => (
                <div className="flex justify-between gap-4 text-sm" key={row.days}>
                  <dt className="text-muted">{row.days}</dt>
                  <dd className="tabular-nums text-text-dim">{row.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={COL}>
            <h2 className={HEAD}>Site</h2>
            <ul className={LINKS}>
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link to={`/#${link.id}`} className={LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
              {FOOTER_PAGES.map((page) => (
                <li key={page.to}>
                  <Link to={page.to} className={LINK}>
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={COL}>
            <h2 className={HEAD}>Contact</h2>
            <ul className={LINKS}>
              <li>
                <a href={`tel:${gym.phoneDial}`} className={LINK}>
                  {gym.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${gym.email}`} className={LINK}>
                  {gym.email}
                </a>
              </li>
            </ul>
            <ul className="mt-3 flex gap-3">
              {gym.social.map((s) => {
                const Icon = ICONS[s.label];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xs border border-text/10 text-text-dim transition-[border-color,color] duration-fast ease-quint hover:border-accent hover:text-accent-bright"
                    >
                      {Icon ? <Icon size={18} strokeWidth={1.75} aria-hidden="true" /> : s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Oversized wordmark used as a graphic device, not a heading. */}
        <p
          className="pointer-events-none mb-[-0.12em] mt-[clamp(2.5rem,5vw,4rem)] select-none whitespace-nowrap font-display text-[clamp(4rem,21vw,19rem)] uppercase leading-[0.78] tracking-[-0.02em] text-text opacity-5"
          aria-hidden="true"
        >
          {gym.name}
        </p>

        <div className="flex flex-wrap justify-between gap-3 border-t border-text/10 py-6 text-sm text-muted">
          <p>
            &copy; {year} {gym.nameFull}
          </p>
          <p className="opacity-75">Placeholder content — replace before launch.</p>
        </div>
      </div>
    </footer>
  );
}
