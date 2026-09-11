import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { gym } from '../../data/gym';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { scrollToId } from '../../lib/smoothScroll';
import Button from '../common/Button';

const HEADLINE = ['Nobody', 'gets strong', 'by accident.'];
const EASE = [0.22, 1, 0.36, 1];

export default function Hero() {
  const reduced = useReducedMotion();

  /**
   * Lines rise out of their own mask. whileInView (not mount-time animate)
   * avoids the frozen-transform state on fast reloads, and the mask carries
   * enough vertical padding that Anton descenders are never sliced.
   */
  const line = (i) =>
    reduced
      ? {}
      : {
          initial: { y: '104%' },
          whileInView: { y: 0 },
          viewport: { once: true, amount: 0.1 },
          transition: { duration: 0.9, delay: 0.12 + i * 0.1, ease: EASE },
        };

  const fade = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.1 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  const goMemberships = (e) => {
    e.preventDefault();
    scrollToId('memberships');
  };

  return (
    <section
      className="relative isolate flex min-h-svh items-end overflow-hidden pb-[clamp(2.25rem,4vw,3rem)] pt-[calc(var(--header-h)+2rem)] xl:items-center"
      aria-labelledby="hero-title"
    >
      {/* Full-bleed ambient image. No split column, so there is no seam to see. */}
      <div className="absolute inset-0 -z-10">
        <motion.img
          src="/assets/images/hero-gym.jpg"
          alt="Members training on the barbell floor at Ironworks"
          width="1600"
          height="1200"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover [object-position:64%_32%] xl:[object-position:72%_34%]"
          initial={reduced ? undefined : { scale: 1.08 }}
          animate={reduced ? undefined : { scale: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        />

        {/* Radial vignette dissolves the photograph into the page on every edge. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_64%_34%,transparent_2%,rgb(var(--bg)/0.55)_34%,rgb(var(--bg)/0.86)_64%,rgb(var(--bg))_88%)]"
        />
        {/* Flat tint holds the whole frame in the dark key. */}
        <span aria-hidden="true" className="absolute inset-0 bg-bg/35" />
        {/* Directional scrim for text legibility: up on mobile, across on desktop. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(var(--bg))_2%,rgb(var(--bg)/0.82)_30%,rgb(var(--bg)/0.35)_66%,rgb(var(--bg)/0.6)_100%)] xl:bg-[linear-gradient(to_right,rgb(var(--bg))_0%,rgb(var(--bg)/0.9)_26%,rgb(var(--bg)/0.35)_62%,transparent_100%)]"
        />
      </div>

      <div className="section-shell relative grid grid-cols-1 xl:grid-cols-12">
        <div className="xl:col-span-8 2xl:col-span-7">
          {/* Each segment stays whole; the badge wraps between them, not mid-phrase. */}
          <motion.p
            className="micro inline-flex max-w-full flex-wrap items-center gap-x-2.5 gap-y-1 rounded-xs border border-text/15 bg-bg/40 px-3.5 py-2 text-text-dim backdrop-blur-sm"
            {...fade(0.05)}
          >
            <span className="whitespace-nowrap">Est. {gym.established}</span>
            <span className="text-accent" aria-hidden="true">
              ·
            </span>
            <span className="whitespace-nowrap">
              {gym.locality}, {gym.city}
            </span>
          </motion.p>

          <h1 className="display mt-6 text-d1 text-text" id="hero-title">
            {HEADLINE.map((text, i) => (
              // pb gives descenders room inside the clip; -mb keeps the leading tight.
              <span
                className={`block overflow-hidden pb-[0.14em] ${
                  i < HEADLINE.length - 1 ? '-mb-[0.1em]' : ''
                } ${i === 1 ? 'xl:pl-[0.08em]' : ''}`}
                key={text}
              >
                <motion.span className={`block ${i === 2 ? 'text-accent' : ''}`} {...line(i)}>
                  {text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p className="lead mt-5 text-text-dim xl:max-w-[44ch]" {...fade(0.55)}>
            Coached barbell training on Linking Road. Small groups, written programmes, and the same
            faces on the floor every week.
          </motion.p>

          <motion.div
            className="mt-[clamp(1.5rem,2.8vw,2.25rem)] flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            {...fade(0.65)}
          >
            <Button to="/book-trial" size="lg" icon={ArrowRight}>
              Book a free trial
            </Button>
            <Button href="#memberships" onClick={goMemberships} variant="ghost" size="lg">
              Explore memberships
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.a
        className="absolute inset-x-0 bottom-[clamp(1rem,2vw,1.5rem)] mx-auto hidden w-fit items-center gap-2.5 text-muted transition-colors duration-fast ease-snap hover:text-text xl:flex"
        href="#intro"
        aria-label="Scroll to content"
        onClick={(e) => {
          e.preventDefault();
          scrollToId('intro');
        }}
        {...fade(0.85)}
      >
        <span className="micro">Scroll</span>
        <span
          aria-hidden="true"
          className="inline-flex h-10 w-7 items-start justify-center overflow-hidden rounded-2xl border border-text/20 pt-2"
        >
          <ArrowDown size={13} strokeWidth={2} className="animate-scroll-cue" />
        </span>
      </motion.a>
    </section>
  );
}
