import { useSeo } from '../hooks/useSeo';
import { gymLocationLine } from '../data/gym';
import PageHeader from '../components/common/PageHeader';
import LocationCTA from '../components/sections/LocationCTA';
import ContactForm from '../components/sections/ContactForm';

export default function Contact() {
  useSeo({
    title: 'Contact',
    description: `Visit, call or message Ironworks in ${gymLocationLine}. Opening hours, directions and enquiries.`,
    path: '/contact',
  });

  return (
    <>
      <PageHeader
        label="Contact"
        title="Come in, call, or message"
        lead="The quickest answer is WhatsApp. For anything about injuries or programming, ask for a coach and we will call you back."
      />
      <ContactForm heading="Send us a message." kicker="Enquiries" index="" id="contact-enquire" />
      <LocationCTA />
    </>
  );
}
