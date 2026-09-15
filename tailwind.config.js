/**
 * Design tokens live here. Colours are pulled from the CSS custom properties in
 * src/styles/variables.css, which store space-separated RGB channels so the
 * Tailwind opacity modifiers still work (e.g. border-text/10).
 *
 * `screens` values are ALL rem on purpose: mixing rem and px in here silently
 * breaks the arbitrary `min-[…]`/`max-[…]` variants.
 */
const rgb = (v) => `rgb(var(${v}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      sm: '30rem', // 480
      md: '40rem', // 640
      lg: '48rem', // 768
      xl: '60rem', // 960 - header nav, hero splits
      '2xl': '64rem', // 1024 - main desktop layout switch
      '3xl': '90rem', // 1440
    },
    extend: {
      colors: {
        bg: rgb('--bg'),
        'bg-2': rgb('--bg-2'),
        surface: rgb('--surface'),
        'surface-2': rgb('--surface-2'),
        text: rgb('--text'),
        'text-dim': rgb('--text-dim'),
        muted: rgb('--muted'),
        accent: rgb('--accent'),
        'accent-bright': rgb('--accent-bright'),
        'accent-ink': rgb('--accent-ink'),
        danger: rgb('--danger'),
        success: rgb('--success'),
      },
      fontFamily: {
        display: ['Anton', 'Arial Narrow', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        micro: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.14em' }],
        lead: ['clamp(1.0625rem, 1.35vw, 1.3125rem)', { lineHeight: '1.65' }],
        h3: ['clamp(1.2rem, 1.8vw, 1.6rem)', { lineHeight: '1.12' }],
        /* Minimums dropped so the longest line still fits a 320px viewport.
           line-height 0.95 keeps Anton descenders (g, y, p) off the mask edge. */
        d3: ['clamp(1.625rem, 4vw, 3.25rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        d2: ['clamp(2.25rem, 7vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        d1: ['clamp(2.75rem, 9.5vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        quote: ['clamp(1.1875rem, 2vw, 1.625rem)', { lineHeight: '1.4' }],
      },
      letterSpacing: { micro: '0.14em', display: '-0.03em' },
      lineHeight: { body: '1.65', display: '0.95' },
      spacing: {
        section: 'clamp(3.5rem, 5vw, 6.5rem)',
        'section-sm': 'clamp(2.5rem, 4vw, 4.5rem)',
        gutter: 'clamp(1.25rem, 4vw, 3.5rem)',
        header: 'var(--header-h)',
      },
      maxWidth: { container: '80rem', wide: '97.5rem' },
      borderRadius: { xs: '2px', sm: '3px' },
      transitionTimingFunction: {
        quint: 'cubic-bezier(0.22, 1, 0.36, 1)',
        snap: 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      transitionDuration: { fast: '180ms', base: '420ms', slow: '820ms' },
      backgroundImage: {
        'glow-accent':
          'radial-gradient(ellipse at center, rgb(var(--accent) / 0.14) 0%, rgb(var(--accent) / 0.05) 40%, transparent 70%)',
      },
      keyframes: {
        'scroll-cue': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '35%': { opacity: '1' },
          '100%': { transform: 'translateY(1.35rem)', opacity: '0' },
        },
      },
      animation: {
        'scroll-cue': 'scroll-cue 2.1s cubic-bezier(0.65, 0, 0.35, 1) infinite',
        spin: 'spin 900ms linear infinite',
      },
    },
  },
  plugins: [],
};
