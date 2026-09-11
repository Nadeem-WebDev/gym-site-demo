import Reveal from '../common/Reveal';
import SectionLabel from '../common/SectionLabel';

export default function IntroStatement() {
  return (
    <section
      className="border-t border-text/10 py-section"
      id="intro"
      aria-labelledby="intro-title"
    >
      <div className="section-shell grid gap-[clamp(2rem,4vw,3.5rem)] 2xl:grid-cols-2 2xl:items-start 2xl:gap-x-[clamp(3rem,7vw,8rem)]">
        <Reveal className="2xl:col-span-2">
          <SectionLabel index="01">Why we exist</SectionLabel>
        </Reveal>

        <Reveal delay={0.08} className="2xl:col-start-1 2xl:mt-4">
          <h2 className="display max-w-[18ch] text-balance text-d2 text-text" id="intro-title">
            There is no hack.
            <br />
            There is only <span className="text-accent-bright">the next session.</span>
          </h2>
        </Reveal>

        {/* Supporting copy sits low and right - deliberate asymmetry, not centring. */}
        <Reveal
          delay={0.16}
          className="grid max-w-[52ch] gap-4 text-text-dim 2xl:col-start-2 2xl:self-end 2xl:pb-[0.6rem]"
        >
          <p className="text-lead">
            We opened because the city was full of gyms and short on coaching. No contracts you have
            to argue your way out of, no classes run like a nightclub — just a floor with enough
            racks, people who know your name, and a plan for the next twelve weeks.
          </p>
          <p className="text-base text-muted">
            If you have trained for years, you will find room to work. If you have never touched a
            barbell, someone will show you how.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
