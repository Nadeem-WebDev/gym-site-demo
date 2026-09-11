import { testimonials, stats } from '../../data/testimonials';
import Reveal from '../common/Reveal';
import SectionLabel from '../common/SectionLabel';

export default function Results() {
  return (
    <section className="bg-bg-2 py-section" id="proof" aria-labelledby="res-title">
      <div className="section-shell">
        <Reveal>
          <SectionLabel index="06">Proof</SectionLabel>
          <h2
            className="display mb-[clamp(2.5rem,5vw,4rem)] mt-4 max-w-[16ch] text-d3 text-text"
            id="res-title"
          >
            Ask the people already here
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="grid grid-cols-2 border-t border-text/10 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                className={`flex flex-col-reverse gap-2 border-b border-text/10 py-6 ${
                  i > 0 ? 'border-l border-l-text/10 pl-6 lg:pl-8' : ''
                }`}
                key={s.id}
              >
                <dt className="micro">{s.label}</dt>
                <dd className="font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[0.95] tabular-nums tracking-display text-text">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Offset the second quote so the pair does not read as a two-column grid. */}
        <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-2 [&>*:nth-child(2)]:lg:mt-[clamp(1.5rem,4vw,3.5rem)]">
          {testimonials.map((t, i) => (
            <Reveal delay={0.06 + i * 0.08} key={t.id}>
              <figure className="relative grid gap-4 border-l-2 border-accent pl-6">
                {/* Typographic quote mark, decorative only - the text carries the quote. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-1 -top-6 select-none font-display text-[5rem] leading-none text-accent/20"
                >
                  &ldquo;
                </span>
                <blockquote>
                  <p className="text-pretty text-quote text-text">{t.quote}</p>
                </blockquote>
                <figcaption className="flex flex-wrap items-baseline gap-3">
                  <span className="micro font-bold text-text-dim">{t.name}</span>
                  <span className="text-sm text-muted">{t.detail}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-[clamp(2.5rem,5vw,4rem)] max-w-[60ch] border-t border-text/10 pt-4 text-sm text-muted">
            Quotes and figures on this page are placeholders. Replace them with permissioned member
            feedback and the gym’s real numbers before launch.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
