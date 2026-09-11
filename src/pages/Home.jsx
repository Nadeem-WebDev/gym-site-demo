import { useSeo } from '../hooks/useSeo';
import { gymLocationLine } from '../data/gym';
import Hero from '../components/sections/Hero';
import IntroStatement from '../components/sections/IntroStatement';
import TrainingPrograms from '../components/sections/TrainingPrograms';
import GymShowcase from '../components/sections/GymShowcase';
import Coaches from '../components/sections/Coaches';
import Memberships from '../components/sections/Memberships';
import Results from '../components/sections/Results';
import LocationCTA from '../components/sections/LocationCTA';
import ContactForm from '../components/sections/ContactForm';

export default function Home() {
  useSeo({
    title: `Coached strength training in ${gymLocationLine}`,
    description: `Coached barbell and conditioning gym in ${gymLocationLine}. Small groups, written programmes and a free first session.`,
    path: '/',
  });

  return (
    <>
      <Hero />
      <IntroStatement />
      <TrainingPrograms />
      <GymShowcase />
      <Coaches />
      <Memberships />
      <Results />
      <LocationCTA />
      <ContactForm />
    </>
  );
}
