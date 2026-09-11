/**
 * PLACEHOLDER BUSINESS DATA - replace every value here with the gym's real
 * details before launch. Nothing in this object is a verified claim.
 * This is the only place the name, address, phone, WhatsApp number, email,
 * hours and social links are defined.
 */
export const gym = {
  name: 'IRONWORKS',
  nameFull: 'Ironworks Strength Co.',
  tagline: 'BUILT ON REPETITION.',

  locality: 'Bandra West',
  city: 'Mumbai',
  established: '2018',

  address: {
    line1: '2nd Floor, Kamala Arcade',
    line2: 'Linking Road, Bandra West',
    city: 'Mumbai',
    postcode: '400050',
  },

  // Digits only, country code first - no '+', spaces or dashes.
  whatsapp: '918972469383',
  phoneDisplay: '+91 89724 69383',
  phoneDial: '+918972469383',
  email: 'hello@ironworks.example',

  // Replace with the gym's own Google Maps link.
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Linking+Road+Bandra+West+Mumbai',

  openingHours: [
    { days: 'Mon – Fri', hours: '06:00 – 22:00' },
    { days: 'Saturday', hours: '07:00 – 20:00' },
    { days: 'Sunday', hours: '08:00 – 14:00' },
  ],

  gettingHere: [
    'Five minutes from Bandra station, west exit.',
    'Paid parking in the building basement.',
  ],

  social: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'Facebook', href: 'https://facebook.com/' },
  ],
};

export const gymLocationLine = `${gym.locality}, ${gym.city}`;

export const gymAddressLines = [
  gym.address.line1,
  gym.address.line2,
  `${gym.address.city} ${gym.address.postcode}`,
];
