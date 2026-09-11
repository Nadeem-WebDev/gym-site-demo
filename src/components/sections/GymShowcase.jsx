import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Dumbbell, Layers, Footprints, ShowerHead } from 'lucide-react';
import { gym } from '../../data/gym';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import Reveal from '../common/Reveal';
import SectionLabel from '../common/SectionLabel';

const EQUIPMENT = [
  { icon: Dumbbell, label: '9 combo racks, 2 competition platforms' },
  { icon: Layers, label: 'Calibrated plates and specialty bars' },
  { icon: Footprints, label: 'Turf lane for sleds and carries' },
  { icon: ShowerHead, label: 'Recovery room with showers' },
];

const FRAME = 'h-full w-full overflow-hidden border border-text/10 bg-surface';
const IMG = 'h-full w-full object-cover';

export default function GymShowcase() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  // One parallax move on one image. Any more and the page starts swimming.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <section className="py-section" id="gym" aria-labelledby="show-title" ref={ref}>
      <div className="section-shell">
        <Reveal className="mb-[clamp(2.5rem,5vw,4.5rem)] grid gap-6 min-[56rem]:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] min-[56rem]:items-end min-[56rem]:gap-8">
          <div>
            <SectionLabel index="03">The floor</SectionLabel>
            <h2 className="display mt-4 max-w-[16ch] text-d3 text-text" id="show-title">
              Built for lifting, not for photos
            </h2>
          </div>
          <p className="lead">
            Nine racks, two platforms, a turf lane and enough plates that nobody waits. It is warm,
            it is loud, and the chalk is where you left it.
          </p>
        </Reveal>

        {/* Asymmetric magazine grid: one tall image holding two rows, a square
            detail and the equipment note beside it, panoramic across the bottom. */}
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-7 lg:row-span-2 2xl:col-span-6">
            <div className={FRAME}>
              <motion.img
                src="/assets/images/gym-floor.jpg"
                alt="The main training floor with squat racks and platforms"
                loading="lazy"
                decoding="async"
                width="1000"
                height="1400"
                className={`${IMG} aspect-[4/5] lg:aspect-auto lg:min-h-full`}
                style={reduced ? undefined : { y, scale: 1.08 }}
              />
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="lg:col-span-5 lg:col-start-8 2xl:col-span-6 2xl:col-start-7"
          >
            <div className={`${FRAME} media-zoom aspect-square`}>
              <img
                src="/assets/images/gym-detail.jpg"
                alt="Lifter setting up under the bar against the back wall"
                loading="lazy"
                decoding="async"
                width="800"
                height="800"
                className={IMG}
              />
            </div>
          </Reveal>

          <Reveal
            delay={0.16}
            className="grid content-center gap-4 py-6 lg:col-span-5 lg:col-start-8 lg:py-0 2xl:col-span-6 2xl:col-start-7"
          >
            <p className="micro">Equipment</p>
            <ul className="grid gap-3">
              {EQUIPMENT.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-2.5 text-sm text-text-dim">
                  <Icon
                    size={15}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="mt-[0.2em] flex-none text-accent"
                  />
                  {label}
                </li>
              ))}
            </ul>
            <p className="flex items-center gap-2 border-t border-text/10 pt-3 text-sm text-muted">
              <MapPin
                size={15}
                strokeWidth={1.75}
                aria-hidden="true"
                className="flex-none text-accent"
              />
              {gym.address.line2}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-3 lg:col-span-12 lg:row-start-3">
            <div className={FRAME}>
              <img
                src="/assets/images/gym-wide.jpg"
                alt="Wide view across the gym during an evening session"
                loading="lazy"
                decoding="async"
                width="1800"
                height="800"
                className={`${IMG} aspect-video`}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
