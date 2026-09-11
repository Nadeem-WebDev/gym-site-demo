import Reveal from './Reveal';
import SectionLabel from './SectionLabel';

/** Compact masthead for the sub-pages, which sit under a solid header. */
export default function PageHeader({ label, title, lead }) {
  return (
    <header className="border-b border-text/10 pb-[clamp(2.5rem,5vw,4rem)] pt-[calc(var(--header-h)+clamp(3rem,7vw,6rem))]">
      <div className="section-shell grid gap-6 2xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] 2xl:items-end 2xl:gap-x-[clamp(3rem,6vw,6rem)]">
        <Reveal>
          <SectionLabel>{label}</SectionLabel>
          <h1 className="display mt-4 max-w-[24ch] text-d2 text-text">{title}</h1>
        </Reveal>
        {lead ? (
          <Reveal delay={0.08}>
            <p className="lead max-w-[52ch] 2xl:pb-[0.4rem]">{lead}</p>
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
