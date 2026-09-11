import { useEffect } from 'react';
import { gym } from '../data/gym';

const upsert = (selector, attrs) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(attrs.tag || 'meta');
    Object.entries(attrs).forEach(([k, v]) => {
      if (k !== 'tag' && k !== 'content' && k !== 'href') el.setAttribute(k, v);
    });
    document.head.appendChild(el);
  }
  if (attrs.content !== undefined) el.setAttribute('content', attrs.content);
  if (attrs.href !== undefined) el.setAttribute('href', attrs.href);
  return el;
};

/** Per-route title, description, Open Graph and canonical. */
export function useSeo({ title, description, path = '/' }) {
  useEffect(() => {
    const full = title ? `${title} — ${gym.nameFull}` : gym.nameFull;
    document.title = full;

    upsert('meta[name="description"]', { name: 'description', content: description });
    upsert('meta[property="og:title"]', { property: 'og:title', content: full });
    upsert('meta[property="og:description"]', { property: 'og:description', content: description });
    upsert('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsert('meta[property="og:site_name"]', { property: 'og:site_name', content: gym.nameFull });
    upsert('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });

    // Replace SITE_ORIGIN in index.html with the real domain before launch.
    const origin = window.location.origin;
    upsert('link[rel="canonical"]', { tag: 'link', rel: 'canonical', href: origin + path });
    upsert('meta[property="og:url"]', { property: 'og:url', content: origin + path });
  }, [title, description, path]);
}
