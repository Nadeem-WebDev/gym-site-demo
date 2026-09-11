# Ironworks — gym website

A frontend-only marketing site for a local gym, built with React + Vite. There is no backend:
enquiries leave the browser through the visitor's own WhatsApp, an optional client-side email
provider, or plain `mailto:` / `tel:` links.

**All business content on the site is placeholder data.** Nothing in it is a verified claim about
a real gym. See [Replacing the content](#replacing-the-content) before launch.

---

## Tech stack

| | |
|---|---|
| Framework | React 18 + Vite 5 |
| Language | JavaScript only — no TypeScript anywhere |
| Routing | React Router 6 — single-page `/` plus two conversion routes (see below) |
| Motion | Framer Motion 11 + Lenis smooth scroll, both gated on `prefers-reduced-motion` |
| Icons | `lucide-react` — no emoji used as UI |
| Styling | **Tailwind CSS 3.4**, with design tokens backed by CSS custom properties |

Versions are pinned for **Node 18**, which is what the host runs. React Router 7, Vite 6+ and
**Tailwind 4** all need Node 20+. Nothing the site does requires them.

`npm audit` reports two advisories (esbuild dev-server, react-router). Both are fixable only by
major upgrades that need Node 20+, and the esbuild one affects the dev server rather than the
built output. Left pinned deliberately.

---

## Install and run

```bash
npm install
npm run dev             # dev server, prints the local URL
npm run build           # production build into dist/
npm run preview         # serve the built output
npm run format          # prettier over src/

npm run shots           # screenshots + responsive / overflow / font checks (needs Docker)
npm run console-check   # React console errors across every route (needs Docker)
npm run check           # both of the above
```

The build output in `dist/` is plain static files — deploy it to Vercel, Netlify, Cloudflare
Pages, or any static host.

### Serving from a sub-directory

```bash
VITE_BASE_PATH=/gym/ npm run build
```

`vite.config.js` reads `VITE_BASE_PATH` and the router picks it up through `import.meta.env.BASE_URL`.

## Navigation architecture

The marketing site is **one page**. Every header link is an anchor into a section on `/`:
`#training`, `#coaches`, `#memberships`, `#location`, `#contact`. Scrolling is driven by Lenis,
and `Header.jsx` runs an `IntersectionObserver` scroll spy (`useActiveSection`) so the active
link indicator tracks the viewport.

Only the two conversion flows get their own route, because they are destinations rather than
sections:

| Route | Renders |
|---|---|
| `/` | The whole marketing story |
| `/book-trial` | Dedicated trial page — how it works, then the form |
| `/contact` | Dedicated contact page — form and location only |
| `/memberships` | Redirects to `/#memberships` |
| anything else | 404 |

`/memberships` used to render a second copy of a homepage section; it now resolves to the
section itself, so there is one source of truth for pricing.

### SPA routing on the host

The site uses real URLs, not hash routing, so the host must serve `index.html` for unknown
paths. On Netlify/Vercel/Cloudflare this is the default SPA behaviour or a one-line rewrite. On
plain Apache/nginx without that rewrite, `/memberships` will 404 on a hard refresh.

---

## Environment variables

Copy `.env.example` to `.env` and fill in what you need.

> **Every `VITE_*` variable is compiled into the public JavaScript bundle.** Anyone can read it
> in the browser. Only ever put client-safe values here — the kind a provider publishes as a
> "public key" or "form id". A private/server API secret must never go in a `VITE_*` variable.
> There is no backend in this project, so if an integration needs a real secret, it does not
> belong here.

| Variable | Client-safe? | Purpose |
|---|---|---|
| `VITE_WHATSAPP_NUMBER` | yes | WhatsApp destination, digits only, country code first |
| `VITE_EMAIL_PROVIDER` | yes | `web3forms`, `formspree`, or empty to disable email |
| `VITE_WEB3FORMS_KEY` | yes — public access key | Web3Forms |
| `VITE_FORMSPREE_ID` | yes — public form id | Formspree |

Nothing is committed: `.env` is git-ignored, `.env.example` holds empty placeholders.

---

## How enquiries work

The form on `/book-trial`, `/contact` and the homepage offers two paths.

### WhatsApp (primary)

Validates the form, builds a readable message and opens
`https://wa.me/<number>?text=<encoded>` in a new tab. The visitor presses send in WhatsApp.

The site does **not** claim to have delivered anything — the confirmation says WhatsApp is
opening with the details filled in, because that is all that actually happened.

Configure with `VITE_WHATSAPP_NUMBER`, or edit `whatsapp` in `src/data/gym.js`. Digits only,
country code first, no `+`, spaces or dashes: `918972469383`.

### Email (optional)

Set `VITE_EMAIL_PROVIDER` and the matching public key.

- **Web3Forms** — sign up at web3forms.com, copy the access key into `VITE_WEB3FORMS_KEY`.
- **Formspree** — create a form at formspree.io, copy the form id into `VITE_FORMSPREE_ID`.

Success is only reported when the provider confirms it. On failure the visitor is told the truth
and offered WhatsApp, a `mailto:` link and the phone number.

**With no provider configured the site still works** — the email button explains that email is
not switched on and points at WhatsApp and `mailto:`. The form is never a dead end.

To add a provider, add one entry to `providers` in `src/services/email.service.js`. Components
call `sendInquiryEmail(values)` and never see which provider is in use.

---

## Replacing the content

Everything a gym owner needs to change lives in `src/data/`. No phone number, address or price is
hard-coded in a component.

| File | Holds |
|---|---|
| `src/data/gym.js` | **Name, tagline, address, phone, WhatsApp, email, opening hours, maps URL, social links** |
| `src/data/programs.js` | The four training programmes and their images |
| `src/data/coaches.js` | Coach names, roles, specialisms, bios |
| `src/data/memberships.js` | Plan names, prices, inclusions, which plan is featured |
| `src/data/testimonials.js` | Member quotes and the headline statistics |

`src/utils/constants.js` holds the nav links and the form's goal / preferred-time options.

### What must be replaced before launch

- **Prices** in `memberships.js` are invented examples.
- **Coach names, bios and photos** are placeholders. Replace with real staff and real
  photographs. Deliberately no qualifications or achievements are claimed — do not add any a
  coach cannot evidence.
- **Testimonials and statistics** in `testimonials.js` are examples. Replace with permissioned
  member quotes and the gym's real numbers, or delete the blocks. Never publish medical or
  transformation claims you cannot support.
- **Photography** — see below.
- **`SITE_ORIGIN`** — the canonical URL is derived from `window.location.origin` at runtime, so
  it is correct once deployed. Structured data in `LocalBusinessSchema.jsx` is generated from
  `gym.js`, so fixing `gym.js` fixes the SEO markup too.

---

## Replacing the images

Drop replacements at the same paths in `public/assets/images/` — no code change needed.

| File | Used by | Shape it is cropped to |
|---|---|---|
| `hero-gym.jpg` | Hero | wide, focal point right-of-centre |
| `training-strength.jpg` | Programmes | 4:3 |
| `training-personal.jpg` | Programmes | 4:3 |
| `training-conditioning.jpg` | Programmes | 4:3 |
| `training-mobility.jpg` | Programmes | 4:3 |
| `gym-floor.jpg` | Showcase, tall | portrait, ~5:7 |
| `gym-detail.jpg` | Showcase, detail | square |
| `gym-wide.jpg` | Showcase, panoramic | 16:9 |
| `gym-room.jpg` | Location | portrait, 3:4 |
| `coach-01.jpg` … `coach-03.jpg` | Coaches | 4:5 |

The current files are **placeholder stock photography from Unsplash**, chosen to match the dark
art direction. Replace them with real photographs of the actual gym and its actual coaches.

Keep the hero reasonably small — it is preloaded in `index.html`. The current one is ~350 KB at
1600px wide. Every other image is `loading="lazy"`.

If you change a file name, update the path in the matching `src/data/*.js` file and the `alt`
text with it. Alt text lives next to the image path so the two stay together.

---

## Design system

Two files hold the whole system:

- **`tailwind.config.js`** — the type scale (`text-d1`, `text-d2`, `text-d3`, `text-lead`,
  `text-micro`), spacing (`py-section`, `px-gutter`), breakpoints, easing (`ease-quint`) and
  durations (`duration-fast|base|slow`).
- **`src/styles/variables.css`** — colour, stored as **space-separated RGB channels**
  (`--accent: 210 105 44`) so Tailwind can wrap them in
  `rgb(var(--accent) / <alpha-value>)`. That is what keeps opacity modifiers working:
  `bg-surface/60`, `border-text/10`. Change a colour here and every utility follows.

`--header-h` stays a real custom property because it is used inside `calc()`, e.g.
`pt-[calc(var(--header-h)+2rem)]`.

### Conventions

- **Breakpoints are all rem** — `sm` 30rem, `md` 40rem, `lg` 48rem, `xl` 60rem (header/hero
  switch), `2xl` 64rem (main desktop layout), `3xl` 90rem. Keep them rem: mixing rem and px in
  `screens` silently disables the arbitrary `min-[…]`/`max-[…]` variants, which this project
  uses for the two odd breakpoints (`min-[56rem]`).
- **`@layer components`** in `src/index.css` holds only the primitives repeated across many
  files with pseudo-element states: `.btn` / `.btn-primary` / `.btn-ghost`, `.field-control`,
  `.link-arrow`, `.micro`, `.display`, `.lead`, `.section-shell`. Everything else is utilities
  in the JSX — there are no per-component stylesheets.
- **Fonts** — Anton for display, Inter for everything else, from Google Fonts in `index.html`.
  Two families only.
- **Accent** — one accent colour. `accent-bright` is the AA-safe variant for small text.
- **Motion** — three layers, all gated on `useReducedMotion()`:
  Framer Motion reveals (`whileInView` with `once`, so a fast reload cannot leave text stuck in
  its initial transform), Lenis smooth scrolling (`src/lib/smoothScroll.js` — a module singleton
  so anchors and the router scroll *through* it instead of fighting it), and CSS transitions on
  `ease-snap` (`cubic-bezier(0.76, 0, 0.24, 1)`). With reduced motion set, Lenis never starts and
  the transforms are dropped.
- **Depth** — a fixed ~3% SVG fractal-noise overlay (`NoiseOverlay.jsx`) stops the flat near-black
  reading sterile, plus `bg-glow-accent` radial blooms behind the active programme image and the
  featured membership tier.
- **Headline masks** — display lines animate out of `overflow-hidden` wrappers. Those wrappers
  carry `pb-[0.14em]` with a compensating `-mb-[0.1em]`, which is what keeps Anton's descenders
  (g, y, p) off the clip edge at `line-height: 0.95`.

---

## Accessibility notes

- Skip link, semantic landmarks, one `h1` per page and an ordered heading hierarchy.
- Mobile menu is a proper dialog: `aria-modal`, focus moved in on open, Tab kept inside, Escape
  closes, focus returned to the trigger, body scroll locked.
- Programmes are vertical ARIA tabs on desktop with arrow/Home/End key support, and a disclosure
  accordion on mobile. Content is never hover-only.
- Form controls have real labels, `aria-describedby` for hints and errors, `aria-invalid`, and
  errors carry a border, an icon **and** text — never colour alone. Submission outcomes are
  announced in a polite live region.
- Decorative images and icons are `aria-hidden`; meaningful images have descriptive alt text.

---

## Screenshots / visual QA

`e2e/shots.mjs` serves `dist/` and captures every page at 1440 / 1280 / 1024 / 768 / 480 / 375,
plus per-section frames, the open mobile menu and the form's invalid state. It also asserts
**zero horizontal overflow** at every width and checks the webfonts actually loaded.

It needs a browser, so run it in Docker:

```bash
npm run build
docker run --rm \
  -v "$PWD":/site \
  -v "$HOME/.cache/puppeteer":/root/.cache/puppeteer:ro \
  -w /site --network host \
  groundwork-check:latest sh -lc '
    ln -sfn /app/node_modules/puppeteer /site/node_modules/puppeteer
    ln -sfn /app/node_modules/puppeteer-core /site/node_modules/puppeteer-core
    node e2e/shots.mjs'
```

Output lands in `e2e/shots/`, with `report.json` holding the overflow and font results. The
`groundwork-check` image just supplies Node + Puppeteer; any image with those works, as long as
the mounted Chrome version matches what Puppeteer expects. Override it with
`SHOTS_IMAGE=my-image npm run shots`.

`npm run console-check` (`e2e/console-check.mjs`) loads every route, scrolls it, clicks through
the programme tabs and exercises the collapse-accordion-then-resize path, failing on any React
error, warning, page error or failed request.

Both checks currently report **zero issues**: no horizontal overflow at 1440 / 1280 / 1024 / 768
/ 480 / 375, both webfonts loading, and a clean console on all five routes.
