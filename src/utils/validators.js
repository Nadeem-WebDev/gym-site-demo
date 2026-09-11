import { MESSAGE_MAX } from './constants';
import { digitsOnly, trim } from './helpers';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validates the inquiry form. `requireEmail` is true for the email path and
 * false for WhatsApp, where a phone number is enough to start a conversation.
 * Returns an object of field -> message; empty means valid.
 */
export function validateInquiry(values, { requireEmail = false } = {}) {
  const errors = {};
  const name = trim(values.name);
  const phone = digitsOnly(values.phone);
  const email = trim(values.email);
  const message = trim(values.message);

  if (!name) errors.name = 'Please tell us your name.';
  else if (name.length < 2) errors.name = 'That name looks too short.';

  if (!phone) errors.phone = 'We need a phone number to reach you.';
  else if (phone.length < 8 || phone.length > 15)
    errors.phone = 'Enter a phone number between 8 and 15 digits.';

  if (requireEmail && !email) errors.email = 'An email address is required to send by email.';
  else if (email && !EMAIL_RE.test(email)) errors.email = 'That email address is not valid.';

  if (!trim(values.goal)) errors.goal = 'Choose what you want to work on.';

  if (message.length > MESSAGE_MAX)
    errors.message = `Please keep it under ${MESSAGE_MAX} characters.`;

  return errors;
}

export const hasErrors = (errors) => Object.keys(errors).length > 0;
