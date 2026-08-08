# Apex site — award-submission redesign

## Goal
Bring runapex.co to a craft level suitable for submission to Awwwards, CSS Design Awards, and FWA (and later Communication Arts / European Design Awards / Webby / Red Dot). Full site, not just the homepage. Keep Apex's existing visual language (frame lines with "+" corner ticks, milk/white/black canvas, single blue accent, Review display serif + General Sans, 8px control radius / 20px card radius, no drop shadows) — this redesign changes execution and interaction, not the identity.

## Scope
All pages in the repo: `index.html`, `consulting.html`, `company.html`, `resources.html`, `referrals.html`, the 7 `article-*.html` pages. Legal pages (`privacy.html`, `terms.html`) and `cta-preview.html` are out of scope — not jury-relevant.

## Approach
One shared motion/interaction system (CSS custom properties + a `script.js` module), applied consistently to every in-scope page, rather than bespoke treatment per page. Rationale: consistency across pages the jury may click into, and one system is cheaper to build and maintain correctly than N bespoke ones.

## Components

1. **Hero load-in** — on page load, frame lines draw in (SVG stroke-draw or clip-path reveal), headline/CTA stagger in (translateY + opacity), illustration animates in last. One reusable pattern across every hero (index, consulting, company).

2. **Scroll-reveal** — extends the existing `phaseObserver` IntersectionObserver pattern in `script.js` into a general-purpose reveal module applied to every section below the hero, on every page. Fade + translateY on enter; no re-trigger delay on repeat scroll.

3. **Hover choreography** — introduce shared easing/duration tokens as CSS custom properties (e.g. `--ease-standard`, `--dur-fast`, `--dur-med`) generalizing the ad hoc `.18s ease` / `.25s` values already in `styles.css`. Apply consistently to every card, button, and link across all pages — not just the ones that currently have transitions.

4. **Cursor accent** — small custom cursor shaped like the "+" corner-tick glyph over interactive elements. Cheap to implement, reinforces the frame-line motif as a signature detail.

5. **Page transitions** — View Transitions API for cross-page navigation, with a plain-reload fallback for unsupported browsers, so the multi-page site doesn't feel like a classic hard reload.

6. **Accessibility / performance guardrail** — every animation respects `prefers-reduced-motion`; all motion runs on `transform`/`opacity` only (never layout-triggering properties) to protect performance scores, which FWA and Awwwards weigh in judging.

## Technical notes
Stays on the existing stack — vanilla JS/CSS, no framework. Extends `script.js` (new module, e.g. `motion.js`, or a clearly delimited section) and `styles.css` (new custom properties for easing/duration tokens). Must not break existing behavior: phase-block counters/bars, testimonial marquee, horizontal steps-timeline scroll, nav scroll state, language toggle, mobile menu.

## Rollout order
1. `index.html` — establishes the system as the reference implementation.
2. `consulting.html`, `company.html` — primary secondary pages.
3. `resources.html`, `referrals.html`, the 7 article pages.

## QA
- Before/after screenshot comparison per page (Playwright), desktop + mobile viewports.
- Verify `prefers-reduced-motion: reduce` disables all non-essential motion.
- Lighthouse pass on `index.html` after changes (performance must not regress meaningfully).
