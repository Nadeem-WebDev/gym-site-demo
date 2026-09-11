import { gym } from '../data/gym';
import { buildInquiryMessage } from './whatsapp.service';
import { trim } from '../utils/helpers';

/**
 * Frontend-only email abstraction. There is no backend and no server secret:
 * every provider below authenticates with a public, client-safe key that is
 * designed to be visible in the bundle.
 *
 * Components call sendInquiryEmail() and never see the provider.
 * Add a provider by adding one entry to `providers`.
 */

const PROVIDER = trim(import.meta.env.VITE_EMAIL_PROVIDER || '').toLowerCase();

const providers = {
  web3forms: {
    key: () => trim(import.meta.env.VITE_WEB3FORMS_KEY || ''),
    async send(values, key) {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: key,
          subject: `Free trial enquiry - ${trim(values.name)}`,
          from_name: `${gym.name} website`,
          name: trim(values.name),
          phone: trim(values.phone),
          email: trim(values.email),
          goal: trim(values.goal),
          preferred_time: trim(values.preferredTime),
          message: buildInquiryMessage(values),
        }),
      });
      const data = await res.json().catch(() => ({}));
      // Only treat an explicit provider confirmation as success.
      if (!res.ok || data.success !== true) {
        throw new Error(data.message || `Email provider returned ${res.status}`);
      }
      return true;
    },
  },

  formspree: {
    key: () => trim(import.meta.env.VITE_FORMSPREE_ID || ''),
    async send(values, id) {
      const res = await fetch(`https://formspree.io/f/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: trim(values.name),
          phone: trim(values.phone),
          email: trim(values.email),
          goal: trim(values.goal),
          preferredTime: trim(values.preferredTime),
          message: buildInquiryMessage(values),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.errors?.[0]?.message || `Email provider returned ${res.status}`);
      }
      return true;
    },
  },
};

export function getEmailProvider() {
  return providers[PROVIDER] ? PROVIDER : null;
}

/** False when no provider is selected or its public key is missing. */
export function isEmailConfigured() {
  const name = getEmailProvider();
  if (!name) return false;
  return providers[name].key().length > 0;
}

/** mailto: fallback so the form is never a dead end. */
export function buildMailtoUrl(values = {}) {
  const subject = encodeURIComponent(`Free trial enquiry - ${trim(values.name) || 'Website'}`);
  const body = encodeURIComponent(buildInquiryMessage(values));
  return `mailto:${gym.email}?subject=${subject}&body=${body}`;
}

/**
 * Resolves only when the provider confirms delivery. Throws otherwise so the
 * UI can show a real failure instead of a fake success.
 */
export async function sendInquiryEmail(values) {
  const name = getEmailProvider();
  if (!name) throw new Error('NOT_CONFIGURED');
  const provider = providers[name];
  const key = provider.key();
  if (!key) throw new Error('NOT_CONFIGURED');
  return provider.send(values, key);
}
