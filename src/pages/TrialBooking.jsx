import { useSeo } from '../hooks/useSeo';
import { Check } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import ContactForm from '../components/sections/ContactForm';
import Reveal from '../components/common/Reveal';

const STEPS = [
  { t: 'You send the form', d: 'WhatsApp opens with your details already filled in. Press send.' },
  { t: 'We reply with times', d: 'Usually within a few hours, always within one working day.' },
  { t: 'You train', d: 'A full session with a coach, at no charge and with nothing to sign.' },
];

export default function TrialBooking() {
  useSeo({
    title: 'Book a free trial',
    description:
      'Book a free trial session at Ironworks. One coached session, no charge and nothing to sign.',
    path: '/book-trial',
  });

  return (
    <>
      <PageHeader
        label="Free trial"
        title="One session, on us"
        lead="A real training session with a coach — not a tour and a sales pitch. Bring shoes you can lift in."
      />

      <section className="py-section-sm" aria-labelledby="trial-how">
        <div className="section-shell grid gap-[clamp(2rem,4vw,3rem)] 2xl:grid-cols-[minmax(0,8fr)_minmax(0,3fr)] 2xl:gap-x-[clamp(2rem,5vw,5rem)]">
          <h2 className="sr-only" id="trial-how">
            How the free trial works
          </h2>
          <ol className="grid gap-6 lg:grid-cols-3 lg:gap-8 [&>li]:grid [&>li]:gap-2 [&>li]:border-t [&>li]:border-text/10 [&>li]:pt-4">
            {STEPS.map((s, i) => (
              <Reveal as="li" delay={i * 0.07} key={s.t}>
                <span className="font-display text-lg tracking-[0.04em] text-accent-bright">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-[clamp(1.25rem,2.2vw,1.625rem)] uppercase leading-[1.05] text-text">
                  {s.t}
                </h3>
                <p className="max-w-[34ch] text-sm text-text-dim">{s.d}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="grid content-start gap-3">
            <p className="micro">What to bring</p>
            <ul className="grid gap-2">
              {['Flat shoes', 'Water', 'Nothing else'].map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-text-dim">
                  <Check
                    size={14}
                    strokeWidth={2.25}
                    aria-hidden="true"
                    className="flex-none text-accent"
                  />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <ContactForm heading="Book your session." kicker="Send it over" index="" id="trial-enquire" />
    </>
  );
}
