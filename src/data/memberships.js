/**
 * PLACEHOLDER PRICING - every figure and inclusion below is an example.
 * Replace with the gym's actual plans before launch.
 *
 * Prices are stored as a plain monthly number so the billing toggle can derive
 * the quarterly rate; never hard-code a formatted string in a component.
 */
export const membershipNote =
  'Membership details shown are placeholders until the gym’s actual plans are supplied.';

export const CURRENCY = '₹';

/** Quarterly billing discount, as a fraction. */
export const QUARTERLY_DISCOUNT = 0.15;

export const memberships = [
  {
    id: 'foundation',
    name: 'Foundation',
    monthly: 2400,
    for: 'New to structured training',
    featured: false,
    includes: [
      'Full floor access, all opening hours',
      'Two group sessions each week',
      'Induction and technique basics',
      'Programme reviewed quarterly',
    ],
  },
  {
    id: 'performance',
    name: 'Performance',
    monthly: 3900,
    for: 'Training three to five days a week',
    featured: true,
    includes: [
      'Everything in Foundation',
      'Unlimited group sessions',
      'Written strength programme',
      'Monthly one-to-one check-in',
      'Recovery area access',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    monthly: 7500,
    for: 'Competing, or training like it',
    featured: false,
    includes: [
      'Everything in Performance',
      'Four personal sessions monthly',
      'Individual periodised plan',
      'Competition preparation',
      'Direct line to your coach',
    ],
  },
];

const fmt = (n) => CURRENCY + Math.round(n).toLocaleString('en-IN');

/** Returns the headline price, its period, and any supporting line. */
export function priceFor(plan, cycle) {
  if (cycle === 'quarterly') {
    const perMonth = plan.monthly * (1 - QUARTERLY_DISCOUNT);
    return {
      amount: fmt(perMonth * 3),
      period: 'per quarter',
      note: `${fmt(perMonth)} a month, billed every three months`,
    };
  }
  return { amount: fmt(plan.monthly), period: 'per month', note: null };
}
