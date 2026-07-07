# Landing Page Revamp — Design Spec

Date: 2026-07-07

## Context

`adopt-me` is a small Vite + React pet-adoption landing page (Header, Hero,
Gallery of 3 dogs, Steps, ContactForm, Footer), styled with plain CSS and
GSAP scroll animations, pink/rose brand color. The client wants it to feel
more complete and modern, with real photography and content that builds
trust in a fictional shelter brand ("Adote com Amor").

Simulated client priorities (all selected): credibility/trust, a larger
adoptable-dogs catalog, cause storytelling, and conversion (donation CTA,
FAQ).

## Visual direction

- Full-bleed photo hero: real dog photo (Unsplash) as background, dark
  gradient overlay, white text, primary CTA + secondary CTA.
- Keep the pink/rose (`--primary: #e91e63`) as accent color, but move the
  base background to a warmer neutral/cream instead of solid pink blocks.
- More whitespace, soft shadows, rounded cards — consistent with the
  existing `--radius` / `--shadow` tokens in `App.css`.
- Real photography throughout: hero, "Sobre nós", testimonials, dog
  gallery — sourced from Unsplash (`images.unsplash.com` direct source
  URLs, free to use, no attribution required for this use case).

## Page structure (top to bottom)

1. **Header** — existing nav plus a mobile hamburger menu (currently no
   mobile handling beyond font-size tweaks). Sticky behavior unchanged.
2. **Hero** — full-bleed dog photo, overlay, headline/subhead (existing
   copy kept), primary CTA `#adotar` + new secondary CTA `#sobre`
   ("Como funciona").
3. **TrustBar** (new component) — thin stat strip directly under hero:
   4 stats (e.g. "500+ adoções realizadas", "12 anos de atuação", "98%
   de famílias satisfeitas", "20+ ONGs parceiras"). Static content, no
   animation beyond existing fade/slide-in pattern.
4. **About** (new component, replaces plain use of `#sobre` anchor which
   currently sits on Steps) — mission storytelling: text block left,
   real photo right (shelter/volunteers), split responsive layout.
5. **Gallery** — expand `DogsContext` dogs array from 3 to 6–8 entries
   with real Unsplash dog photos (varied breeds/sizes). Add client-side
   filter pills (Todos / Pequeno / Médio / Grande) as local state in
   `Gallery.jsx`, filtering the array from context. `DogCard` unchanged.
6. **Steps** — keep content and behavior; anchor `#sobre` moves to the
   new About section, so Steps section gets its own id if it needs one
   for nav (nav still points `Sobre` → `#sobre` → About section).
7. **Testimonials** (new component) — 3 cards: quote, adopter name, small
   photo of the adopted pet (Unsplash), simple stagger-in animation
   matching existing `ScrollTrigger` conventions.
8. **FAQ** (new component) — accordion, 4–5 Q&A entries about the
   adoption process (custos, requisitos, processo, pós-adoção,
   devolução). Single-open-at-a-time accordion using local `useState`
   for the open index; chevron icon from `react-icons` rotates on open.
9. **DonationCTA** (new component) — banner: "Não pode adotar? Ajude com
   uma doação" + button. Visual only — no payment integration, button
   can link to `#contato` or be a no-op anchor.
10. **ContactForm** — unchanged in behavior; only shares the modernized
    spacing/shadow treatment.
11. **Footer** — expand from single centered line to multi-column layout
    (Links rápidos, Contato, Redes sociais, Endereço), keeping the
    existing fade-in-on-scroll animation.

## Data changes

`DogsContext.jsx`: replace the 3 hardcoded hotlinked dog entries with
6–8 entries pointing to real Unsplash dog photo URLs, keeping the same
shape (`name`, `age`, `size`, `img`). `size` values stay one of
`Pequeno` / `Médio` / `Grande` so the new Gallery filter can key off them.

## Component/file plan

New files under `src/components/`:
- `TrustBar.jsx`
- `About.jsx`
- `Testimonials.jsx`
- `Faq.jsx`
- `DonationCTA.jsx`

Modified files:
- `App.jsx` — wire new components into the page in the order above.
- `Header.jsx` — add mobile hamburger toggle + collapsible nav.
- `Gallery.jsx` — add filter pills + filtered rendering.
- `Footer.jsx` — multi-column content.
- `context/DogsContext.jsx` — expanded dog list with real photo URLs.
- `App.css` — new styles for all of the above; background token change;
  no new dependencies (GSAP + react-icons already installed, no new
  packages needed).

## Out of scope

- No backend/CMS, no real payment processing for donations, no real
  form submission handling (ContactForm already just calls
  `preventDefault`).
- No dark mode.
- No image upload/admin tooling — dog photos remain a hardcoded array.

## Testing/verification

This is a visual project with no existing test suite. Verification is:
`npm run dev`, visually check each section renders, nav links scroll to
the right anchors, mobile menu opens/closes, gallery filters work,
FAQ accordion opens/closes one at a time, and `npm run build` succeeds
with no errors.
