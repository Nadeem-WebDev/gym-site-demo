import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { memberships, membershipNote, priceFor } from '../../data/memberships';
import { pad2, cn } from '../../utils/helpers';
import Reveal from '../common/Reveal';
import SectionLabel from '../common/SectionLabel';
import BillingToggle from '../common/BillingToggle';
import Button from '../common/Button';

/** Editorial rate-card rows, deliberately not three pricing cards. */
export default function Memberships({ withHeader = true, index = '05' }) {
  const [cycle, setCycle] = useState('monthly');

  return (
    <section className="py-section" id="memberships" aria-labelledby="mem-title">
      <div className="section-shell">
        {withHeader ? (
          <Reveal className="mb-[clamp(2.5rem,5vw,4.5rem)] grid gap-6 min-[56rem]:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] min-[56rem]:items-end min-[56rem]:gap-8">
            <div>
              <SectionLabel index={index}>Memberships</SectionLabel>
              <h2 className="display mt-4 max-w-[14ch] text-d3 text-text" id="mem-title">
                One floor, three ways in
              </h2>
            </div>
            <p className="lead">
              No joining fee and no lock-in. Move between plans at the start of any month — tell
              your coach and it is done.
            </p>
          </Reveal>
        ) : (
          <h2 className="sr-only" id="mem-title">
            Memberships
          </h2>
        )}

        <Reveal className="mb-8 flex justify-start 2xl:justify-end">
          <BillingToggle value={cycle} onChange={setCycle} />
        </Reveal>

        <ul className="grid gap-4">
          {memberships.map((m, i) => {
            const price = priceFor(m, cycle);
            return (
              <li key={m.id}>
                <Reveal delay={i * 0.06}>
                  {/* Wide bands: identity, inclusions and price read across one line. */}
                  <article
                    className={cn(
                      'relative isolate grid gap-6 overflow-hidden border border-l-2 border-text/10 p-[clamp(1.5rem,3vw,2.5rem)] transition-[border-color,background-color] duration-base ease-snap',
                      '2xl:grid-cols-[minmax(0,4fr)_minmax(0,5fr)_minmax(0,3fr)] 2xl:items-center 2xl:gap-[clamp(2rem,4vw,4rem)]',
                      m.featured
                        ? 'border-l-accent bg-surface hover:border-l-accent-bright'
                        : 'border-l-text/20 bg-bg-2 hover:border-text/20 hover:border-l-text-dim'
                    )}
                  >
                    {/* Warm ambient glow marks the featured tier without a badge shout. */}
                    {m.featured ? (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-glow-accent"
                      />
                    ) : null}

                    <div className="flex items-start gap-4">
                      <span className="flex-none pt-[0.4rem] text-micro font-semibold uppercase tabular-nums text-muted">
                        {pad2(i + 1)}
                      </span>
                      <div>
                        <h3 className="font-display text-[clamp(1.625rem,3.2vw,2.5rem)] uppercase leading-none tracking-display text-text">
                          {m.name}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted">{m.for}</p>
                      </div>
                      {m.featured ? (
                        <span className="micro ml-auto flex-none self-start bg-accent px-2.5 py-1.5 font-bold text-accent-ink">
                          Most popular
                        </span>
                      ) : null}
                    </div>

                    <ul className="grid gap-2 2xl:grid-cols-2 2xl:gap-x-6">
                      {m.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-2 text-sm text-text-dim">
                          <Check
                            size={14}
                            strokeWidth={2.25}
                            aria-hidden="true"
                            className="mt-[0.28em] flex-none text-accent"
                          />
                          {inc}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-text/10 pt-4 2xl:flex-col 2xl:items-end 2xl:justify-center 2xl:self-stretch 2xl:border-l 2xl:border-t-0 2xl:pl-[clamp(1.5rem,3vw,2.5rem)] 2xl:pt-0 2xl:text-right">
                      <div>
                        <p className="flex items-baseline gap-2 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-none tabular-nums text-text">
                          {price.amount}
                          <span className="micro font-body">{price.period}</span>
                        </p>
                        {price.note ? (
                          <p className="mt-1.5 text-sm text-muted">{price.note}</p>
                        ) : null}
                      </div>
                      <Button
                        to="/book-trial"
                        variant={m.featured ? 'primary' : 'ghost'}
                        icon={ArrowRight}
                        aria-label={`Enquire about the ${m.name} membership`}
                      >
                        Enquire
                      </Button>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal>
          <p className="mt-8 border-t border-text/10 pt-4 text-sm text-muted">{membershipNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
