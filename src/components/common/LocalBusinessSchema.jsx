import { useEffect } from 'react';
import { gym, gymLocationLine } from '../../data/gym';

/**
 * LocalBusiness structured data, generated from data/gym.js so there is one
 * source of truth. Values are placeholders until the real details are supplied
 * - no awards, ratings or certifications are asserted.
 */
export default function LocalBusinessSchema() {
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'ExerciseGym',
      name: gym.nameFull,
      description: `Coached strength and conditioning gym in ${gymLocationLine}.`,
      telephone: gym.phoneDial,
      email: gym.email,
      url: window.location.origin,
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${gym.address.line1}, ${gym.address.line2}`,
        addressLocality: gym.address.city,
        postalCode: gym.address.postcode,
        addressCountry: 'IN',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '06:00',
          closes: '22:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '07:00',
          closes: '20:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Sunday',
          opens: '08:00',
          closes: '14:00',
        },
      ],
      sameAs: gym.social.map((s) => s.href),
    };

    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.textContent = JSON.stringify(data);
    el.dataset.schema = 'localbusiness';
    document.head.appendChild(el);

    return () => el.remove();
  }, []);

  return null;
}
