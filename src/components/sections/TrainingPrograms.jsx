import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Minus, Check } from 'lucide-react';
import { programs } from '../../data/programs';
import { pad2, cn } from '../../utils/helpers';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import Reveal from '../common/Reveal';
import SectionLabel from '../common/SectionLabel';

const NUM = 'flex-none text-micro font-semibold uppercase tabular-nums';
const POINTS = 'mt-2 grid gap-2.5';
const POINT = 'flex items-center gap-2.5 text-sm text-text-dim';

/** Desktop: vertical tabs. Mobile: accordion. Content is never hover-only. */
export default function TrainingPrograms() {
  const [active, setActive] = useState(0);
  const isDesktop = useMediaQuery('(min-width: 64rem)');
  const reduced = useReducedMotion();
  const tabRefs = useRef([]);

  const onTabKeyDown = (e) => {
    const last = programs.length - 1;
    let next = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  // The mobile accordion allows 'all closed' (-1); desktop always needs one.
  const current = programs[active] ?? programs[0];

  return (
    <section className="bg-bg-2 py-section" id="training" aria-labelledby="prog-title">
      <div className="section-shell">
        <Reveal className="mb-[clamp(2.5rem,5vw,4.5rem)] grid gap-6 min-[56rem]:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] min-[56rem]:items-end min-[56rem]:gap-8">
          <div>
            <SectionLabel index="02">What we run</SectionLabel>
            <h2 className="display mt-4 max-w-[14ch] text-d3 text-text" id="prog-title">
              Four ways to train here
            </h2>
          </div>
          <p className="lead">
            Every member trains on a written plan. Pick the one that fits how you want to work —
            most people end up mixing two.
          </p>
        </Reveal>

        {isDesktop ? (
          <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-start gap-[clamp(2.5rem,5vw,5rem)]">
            <div
              className="grid border-t border-text/10"
              role="tablist"
              aria-orientation="vertical"
              aria-label="Training programmes"
            >
              {programs.map((p, i) => (
                <button
                  key={p.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  role="tab"
                  id={`tab-${p.id}`}
                  aria-selected={i === active}
                  aria-controls={`panel-${p.id}`}
                  tabIndex={i === active ? 0 : -1}
                  className={cn(
                    'flex w-full items-baseline gap-4 border-b border-text/10 py-[clamp(1rem,1.8vw,1.5rem)] text-left transition-[color,padding-left] duration-base ease-quint',
                    i === active ? 'pl-4 text-text' : 'text-muted hover:text-text-dim'
                  )}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onKeyDown={onTabKeyDown}
                >
                  <span className={cn(NUM, i === active && 'text-accent-bright')}>
                    {pad2(i + 1)}
                  </span>
                  <span className="font-display text-[clamp(1.5rem,3vw,2.5rem)] uppercase leading-none tracking-[0.01em]">
                    {p.name}
                  </span>
                </button>
              ))}
            </div>

            <div
              className="grid gap-8 focus-visible:outline-offset-[6px]"
              role="tabpanel"
              id={`panel-${current.id}`}
              aria-labelledby={`tab-${current.id}`}
              tabIndex={0}
            >
              {/* Fixed height, not aspect-ratio: fills the column width while
                  leaving the description above the fold on a laptop. */}
              <div className="relative h-[clamp(17rem,38vh,25rem)] w-full overflow-hidden border border-text/10 bg-surface">
                {/* Warm bloom behind the photograph so it sits in the page, not on it. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-16 -z-10 bg-glow-accent"
                />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={current.id}
                    src={current.image}
                    alt={current.alt}
                    loading="lazy"
                    decoding="async"
                    width="900"
                    height="1120"
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={reduced ? false : { opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduced ? undefined : { opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>
              </div>

              <div className="grid gap-3">
                <div className="flex items-baseline gap-4">
                  <p className="font-display text-2xl tracking-[0.02em] text-text">
                    {pad2(active + 1)}{' '}
                    <span className="mx-[0.15em] text-accent" aria-hidden="true">
                      /
                    </span>{' '}
                    {pad2(programs.length)}
                  </p>
                  <p className="micro text-accent-bright">{current.kicker}</p>
                </div>
                <p className="max-w-[52ch] text-lead text-text-dim">{current.summary}</p>
                <ul className={POINTS}>
                  {current.points.map((pt) => (
                    <li key={pt} className={POINT}>
                      <Check
                        size={15}
                        strokeWidth={2.25}
                        aria-hidden="true"
                        className="flex-none text-accent"
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="border-t border-text/10">
            {programs.map((p, i) => {
              const open = i === active;
              return (
                <div className="border-b border-text/10" key={p.id}>
                  <h3>
                    <button
                      className="flex w-full items-center gap-4 py-4 text-left text-text"
                      aria-expanded={open}
                      aria-controls={`acc-${p.id}`}
                      onClick={() => setActive(open ? -1 : i)}
                    >
                      <span className={cn(NUM, open ? 'text-accent-bright' : 'text-muted')}>
                        {pad2(i + 1)}
                      </span>
                      <span className="font-display text-[clamp(1.375rem,6vw,1.875rem)] uppercase leading-none">
                        {p.name}
                      </span>
                      {open ? (
                        <Minus
                          size={18}
                          strokeWidth={1.75}
                          aria-hidden="true"
                          className="ml-auto flex-none text-accent-bright"
                        />
                      ) : (
                        <Plus
                          size={18}
                          strokeWidth={1.75}
                          aria-hidden="true"
                          className="ml-auto flex-none text-muted"
                        />
                      )}
                    </button>
                  </h3>

                  {/* Animating height (not toggling `hidden`) is what stops the
                      list snapping open and shoving the rows below it. */}
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        key="body"
                        id={`acc-${p.id}`}
                        className="overflow-hidden"
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduced ? { height: 0 } : { height: 0, opacity: 0 }}
                        transition={{
                          duration: reduced ? 0 : 0.42,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <div className="grid gap-3 pb-8">
                          <div className="mb-2 aspect-[4/3] overflow-hidden border border-text/10 bg-surface">
                            <img
                              src={p.image}
                              alt={p.alt}
                              loading="lazy"
                              decoding="async"
                              width="800"
                              height="600"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <p className="micro text-accent-bright">{p.kicker}</p>
                          <p className="max-w-[52ch] text-lead text-text-dim">{p.summary}</p>
                          <ul className={POINTS}>
                            {p.points.map((pt) => (
                              <li key={pt} className={POINT}>
                                <Check
                                  size={15}
                                  strokeWidth={2.25}
                                  aria-hidden="true"
                                  className="flex-none text-accent"
                                />
                                {pt}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
