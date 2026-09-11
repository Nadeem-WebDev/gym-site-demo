import { coaches } from '../../data/coaches';
import Reveal from '../common/Reveal';
import SectionLabel from '../common/SectionLabel';

export default function Coaches() {
  return (
    <section className="bg-bg-2 py-section" id="coaches" aria-labelledby="coach-title">
      <div className="section-shell">
        <Reveal className="mb-[clamp(2.5rem,5vw,4.5rem)] grid gap-6 min-[56rem]:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] min-[56rem]:items-end min-[56rem]:gap-8">
          <div>
            <SectionLabel index="04">Who coaches you</SectionLabel>
            <h2 className="display mt-4 max-w-[14ch] text-d3 text-text" id="coach-title">
              You will know their names
            </h2>
          </div>
          <p className="lead">
            Coaches are on the floor during every session, not behind a desk. If something hurts or
            a lift stalls, say so and it gets dealt with that day.
          </p>
        </Reveal>

        {/* Staggered baselines - a row of three identical cards is the thing to avoid. */}
        <ul className="grid gap-[clamp(2rem,4vw,3rem)] md:grid-cols-2 2xl:grid-cols-3 2xl:items-start [&>li:nth-child(2)]:2xl:mt-[clamp(2rem,5vw,4.5rem)] [&>li:nth-child(3)]:2xl:mt-[clamp(1rem,2.5vw,2rem)]">
          {coaches.map((c, i) => (
            <li key={c.id}>
              <Reveal delay={i * 0.08}>
                <article className="grid gap-4">
                  <div className="media-zoom group relative aspect-[4/5] overflow-hidden border border-text/10 bg-surface">
                    <img
                      src={c.image}
                      alt={`${c.name}, ${c.role} at Ironworks`}
                      loading="lazy"
                      decoding="async"
                      width="800"
                      height="1000"
                      /* Photos come from mixed sources; one grayscale pass makes the row cohere. */
                      className="h-full w-full object-cover contrast-[1.06] grayscale transition-[filter,transform] duration-slow ease-quint group-hover:grayscale-[0.2]"
                    />
                    <span className="micro absolute bottom-0 left-0 bg-accent px-3 py-2 font-bold text-accent-ink">
                      {c.role}
                    </span>
                  </div>

                  <div className="grid gap-2">
                    <h3 className="font-display text-[clamp(1.375rem,2.4vw,1.875rem)] uppercase leading-none tracking-[0.01em] text-text">
                      {c.name}
                    </h3>
                    <p className="micro text-accent-bright">{c.focus}</p>
                    <p className="max-w-[38ch] text-sm text-text-dim">{c.bio}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
