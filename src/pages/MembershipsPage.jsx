import { useSeo } from '../hooks/useSeo';
import PageHeader from '../components/common/PageHeader';
import Memberships from '../components/sections/Memberships';
import ContactForm from '../components/sections/ContactForm';

export default function MembershipsPage() {
  useSeo({
    title: 'Memberships',
    description:
      'Membership options at Ironworks — no joining fee, no lock-in, and you can move between plans monthly.',
    path: '/memberships',
  });

  return (
    <>
      <PageHeader
        label="Memberships"
        title="Pick a plan, change it whenever"
        lead="Every plan includes coaching on the floor. No joining fee, no minimum term, and switching takes one conversation."
      />
      <Memberships withHeader={false} />
      <ContactForm
        heading="Not sure which one fits?"
        kicker="Ask us"
        index=""
        id="memberships-enquire"
      />
    </>
  );
}
