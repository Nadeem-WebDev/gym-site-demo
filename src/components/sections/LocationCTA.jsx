import { ArrowUpRight, Phone, Mail } from 'lucide-react';
import { gym, gymAddressLines } from '../../data/gym';
import Reveal from '../common/Reveal';
import SectionLabel from '../common/SectionLabel';

const CONTACT =
  'inline-flex items-center gap-2 text-sm text-text-dim transition-colors duration-fast ease-quint hover:text-accent-bright';

export default function LocationCTA() {
  return (
    <section className="py-section" id="location" aria-labelledby="loc-title">
      <div className="section-shell grid gap-[clamp(2.5rem,5vw,4rem)] 2xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] 2xl:items-start 2xl:gap-[clamp(3rem,6vw,6rem)]">
        <div className="grid content-start gap-[clamp(1.75rem,3vw,2.5rem)]">
          <Reveal>
            <SectionLabel index="07">Find us</SectionLabel>
            <h2 className="display mt-4 text-d2 text-text" id="loc-title">
              Come and see it.
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="grid gap-4">
            <address className="grid gap-0.5 font-display text-[clamp(1.25rem,2.4vw,1.875rem)] uppercase leading-[1.15] tracking-[0.01em] text-text">
              {gymAddressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <ul className="grid gap-1.5">
              {gym.gettingHere.map((n) => (
                <li key={n} className="text-sm text-muted">
                  {n}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.14}>
            <dl className="grid max-w-md border-t border-text/10">
              {gym.openingHours.map((row) => (
                <div
                  key={row.days}
                  className="flex justify-between gap-4 border-b border-text/10 py-3"
                >
                  <dt className="micro">{row.days}</dt>
                  <dd className="text-sm tabular-nums text-text">{row.hours}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.18} className="flex flex-wrap items-center gap-6">
            <a className="link-arrow" href={gym.mapsUrl} target="_blank" rel="noopener noreferrer">
              Get directions
              <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
            </a>
            <a className={CONTACT} href={`tel:${gym.phoneDial}`}>
              <Phone
                size={15}
                strokeWidth={1.75}
                aria-hidden="true"
                className="flex-none text-accent"
              />
              {gym.phoneDisplay}
            </a>
            <a className={CONTACT} href={`mailto:${gym.email}`}>
              <Mail
                size={15}
                strokeWidth={1.75}
                aria-hidden="true"
                className="flex-none text-accent"
              />
              {gym.email}
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <a
            className="media-zoom relative block aspect-[4/5] overflow-hidden border border-text/10 bg-surface 2xl:sticky 2xl:top-[calc(var(--header-h)+2rem)] 2xl:aspect-[3/4]"
            href={gym.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the gym location in Google Maps"
          >
            <img
              src="/assets/images/gym-room.jpg"
              alt="The bench and rack area inside Ironworks"
              loading="lazy"
              decoding="async"
              width="1000"
              height="1200"
              className="h-full w-full object-cover"
            />
            <span className="micro absolute bottom-0 left-0 inline-flex items-center gap-1.5 border-r border-t border-text/10 bg-bg px-3.5 py-2.5 font-bold text-text">
              {gym.locality}
              <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" className="text-accent" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
