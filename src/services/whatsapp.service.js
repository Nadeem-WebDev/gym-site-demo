import { gym } from '../data/gym';
import { digitsOnly, trim } from '../utils/helpers';

/**
 * WhatsApp deep-link builder. Business configuration lives in data/gym.js or
 * the VITE_WHATSAPP_NUMBER env var - never inside a component.
 */

export function getWhatsAppNumber() {
  const fromEnv = digitsOnly(import.meta.env.VITE_WHATSAPP_NUMBER || '');
  return fromEnv || digitsOnly(gym.whatsapp);
}

export function isWhatsAppConfigured() {
  const n = getWhatsAppNumber();
  return n.length >= 8 && n.length <= 15;
}

/** Human-readable message body. Blank optional fields are omitted, not sent empty. */
export function buildInquiryMessage(values = {}) {
  const lines = [`Hello ${gym.name},`, '', 'I would like to enquire about a free trial.', ''];

  const rows = [
    ['Name', trim(values.name)],
    ['Phone', trim(values.phone)],
    ['Email', trim(values.email)],
    ['Goal', trim(values.goal)],
    ['Preferred time', trim(values.preferredTime)],
  ];

  rows.forEach(([label, value]) => {
    if (value) lines.push(`${label}: ${value}`);
  });

  const message = trim(values.message);
  if (message) lines.push('', `Message: ${message}`);

  return lines.join('\n');
}

export function buildWhatsAppUrl(values = {}) {
  const number = getWhatsAppNumber();
  const text = encodeURIComponent(buildInquiryMessage(values));
  return `https://wa.me/${number}?text=${text}`;
}

/**
 * Opens the visitor's own WhatsApp with the message pre-filled. This hands the
 * conversation to WhatsApp - it does not deliver anything from this site, so
 * the caller must not claim the message was sent.
 */
export function openWhatsAppInquiry(values = {}) {
  const url = buildWhatsAppUrl(values);
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (!win) window.location.href = url; // popup blocked - navigate instead
  return url;
}
