import { ArrowRight } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import Button from '../components/common/Button';
import SectionLabel from '../components/common/SectionLabel';

export default function NotFound() {
  useSeo({ title: 'Page not found', description: 'That page does not exist.', path: '/404' });

  return (
    <section
      className="flex min-h-[72vh] items-center pb-24 pt-[calc(var(--header-h)+4rem)]"
      aria-labelledby="nf-title"
    >
      <div className="mx-auto grid w-full max-w-container justify-items-start gap-6 px-gutter">
        <SectionLabel>Error 404</SectionLabel>
        <h1 className="display max-w-[16ch] text-d2 text-text" id="nf-title">
          That page isn’t here.
        </h1>
        <p className="lead">
          It may have moved, or the link may be wrong. The training floor is still where you left
          it.
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Button to="/" icon={ArrowRight}>
            Back to home
          </Button>
          <Button to="/book-trial" variant="ghost">
            Book a free trial
          </Button>
        </div>
      </div>
    </section>
  );
}
