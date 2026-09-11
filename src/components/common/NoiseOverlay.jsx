/**
 * Fixed film-grain layer. Flat near-black reads sterile on large surfaces;
 * ~3% fractal noise gives it a printed, tactile quality. Never interactive.
 */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[300] opacity-[0.032] mix-blend-soft-light"
      style={{ backgroundImage: NOISE, backgroundRepeat: 'repeat' }}
    />
  );
}
