import clsx from 'clsx';

export const cn = (...args) => clsx(...args);

/** Strip everything that is not a digit - used before building a wa.me link. */
export const digitsOnly = (value = '') => String(value).replace(/\D+/g, '');

export const trim = (value = '') => String(value).trim();

/** Two-digit index for editorial numbering, e.g. 01 / 04. */
export const pad2 = (n) => String(n).padStart(2, '0');
