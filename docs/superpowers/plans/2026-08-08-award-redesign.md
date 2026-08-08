# Apex Award Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a shared motion/interaction system for runapex.co (scroll-reveal, load-in, a signature hero moment, a cursor accent, cross-page transitions) so the site reads as award-submission quality, without touching layout, copy, or the existing divider system.

**Architecture:** `script.js` and `styles.css` are loaded on every page (`<main>` wraps a flat list of `<section>` children everywhere). One reveal/load-in module added to `script.js`, driven by generic selectors (`main > section`), applies site-wide with zero per-page HTML edits. The one page-specific piece is a signature hero interaction on `index.html` only, since that's the flagship submission page.

**Tech Stack:** Vanilla JS (IIFEs, matching existing `script.js` style), vanilla CSS custom properties, native `IntersectionObserver`, native cross-document View Transitions API (CSS-only, no JS, no dependency). Playwright (already usable via Bash/npx) for before/after visual QA.

## Global Constraints

- Do not modify the divider/frame-line system (`.cross-divider`, `body::before/::after`, `.section-frameline--*`, `+` tick marks) — governed by `CLAUDE.md`, out of scope for this work.
- No new accent color — `--blue: #0057FF` stays the only accent (`DESIGN.md`).
- No drop shadows on real content cards — only the existing `--shadow-card` token on nested UI-mockup illustrations (`DESIGN.md` → Elevation & Depth).
- Radius scale is fixed: interactive controls `--radius-sm` (8px), cards `--radius-xl` (20px) — new elements must pick from the existing scale, not invent a new radius.
- Breakpoints stay at 900px / 640px — no new breakpoint introduced for motion-related layout shifts.
- Every animation must resolve correctly under `prefers-reduced-motion: reduce`: content must never be stuck invisible; motion is additive, not load-bearing.
- All motion runs on `transform`/`opacity` only — never `width`/`height`/`top`/`left` (performance guardrail from the spec).
- In scope: `index.html`, `consulting.html`, `company.html`, `resources.html`, `referrals.html`, the 7 `article-*.html` pages. Out of scope: `privacy.html`, `terms.html`, `cta-preview.html` (the global CSS/JS will still reach them since the files are shared, which is fine — just not a page to verify against).

---

### Task 1: Motion design tokens

**Files:**
- Modify: `styles.css:60-79` (the existing `:root { ... }` variables block)

**Interfaces:**
- Produces: CSS custom properties `--ease-standard`, `--ease-out-back`, `--dur-fast`, `--dur-med`, `--dur-slow`, `--reveal-y`, consumed by Tasks 2, 3, 4, 5, 6.

- [ ] **Step 1: Add the token block**

In `styles.css`, inside the existing `:root { ... }` block (right after `--container: 1160px;`), add:

```css
  /* ─── MOTION TOKENS ─────────────────────────────────────── */
  --ease-standard: cubic-bezier(.4, 0, .2, 1);
  --ease-out-back: cubic-bezier(.34, 1.56, .64, 1);
  --dur-fast: .15s;
  --dur-med:  .3s;
  --dur-slow: .6s;
  --reveal-y: 24px;
```

- [ ] **Step 2: Verify no syntax error**

Run: `npx --yes css-validator-cli styles.css 2>/dev/null || python3 -c "import re; s=open('styles.css').read(); assert s.count('{')==s.count('}'), 'brace mismatch'; print('OK')"`

If the validator tool isn't available, the brace-count fallback is sufficient — it confirms the edit didn't break the file structure.

Expected: `OK` (or a clean validator pass).

- [ ] **Step 3: Commit**

```bash
cd /Users/bema/Desktop/Projects/apex-site
git add styles.css
git commit -m "Add motion design tokens (easing, duration, reveal offset)"
```

---

### Task 2: Global reveal + load-in module

**Files:**
- Modify: `styles.css` (new section, add near the end, before any trailing page-specific overrides)
- Modify: `script.js` (new IIFE, add after the "PHASE BLOCK ANIMATIONS" section, i.e. after line 450)

**Interfaces:**
- Consumes: `--ease-standard`, `--dur-slow`, `--reveal-y` (Task 1).
- Produces: `.reveal` / `.is-revealed` CSS classes and `body.is-loaded` class, consumed by Task 3 (hero stamp waits for `body.is-loaded`).

**Design:** The first `<section>` inside `<main>` on every page (the hero / page-title block) gets a load-in treatment — its direct children (`.hero__title`, `.hero__sub`, `.hero__ctas`, `.hero__demo-form`, `.hero__bridge`, or on non-hero first sections, the `h1`/`.container`) fade+rise in on page load, staggered. Every subsequent `<section>` gets a one-time scroll-triggered fade+rise the first time it enters the viewport (no re-trigger on scroll-up, unlike the existing looping phase animations, which are untouched).

- [ ] **Step 1: Add reveal CSS**

Append to `styles.css`:

```css
/* ─── REVEAL / LOAD-IN SYSTEM ───────────────────────────────
   Progressive enhancement: default state (no media query) shows
   everything normally. Only inside prefers-reduced-motion:no-preference
   do we hide-then-reveal, so a JS failure or reduced-motion setting
   never hides content. ── */
@media (prefers-reduced-motion: no-preference) {
  .reveal {
    opacity: 0;
    transform: translateY(var(--reveal-y));
    transition: opacity var(--dur-slow) var(--ease-standard),
                transform var(--dur-slow) var(--ease-standard);
  }
  .reveal.is-revealed {
    opacity: 1;
    transform: none;
  }

  .load-in {
    opacity: 0;
    transform: translateY(var(--reveal-y));
    transition: opacity var(--dur-slow) var(--ease-standard),
                transform var(--dur-slow) var(--ease-standard);
  }
  body.is-loaded .load-in {
    opacity: 1;
    transform: none;
  }
  body.is-loaded .load-in--1 { transition-delay: .05s; }
  body.is-loaded .load-in--2 { transition-delay: .15s; }
  body.is-loaded .load-in--3 { transition-delay: .25s; }
  body.is-loaded .load-in--4 { transition-delay: .35s; }
}
```

- [ ] **Step 2: Add the JS module**

In `script.js`, after the closing `})();` of the "PHASE BLOCK ANIMATIONS" IIFE (line 450), insert:

```javascript
// ─── REVEAL / LOAD-IN (site-wide, driven by <main> > <section> structure) ──
(function () {
  const sections = Array.from(document.querySelectorAll('main > section'));
  if (!sections.length) return;

  const [first, ...rest] = sections;

  // First section: load-in on page load, staggered by child position.
  // Deliberately excludes the wrapping `.container` — only the actual
  // content pieces animate, so parent and child don't double-fade.
  const loadTargets = first.querySelectorAll(
    '.hero__title, .hero__sub, .hero__ctas, .hero__demo-form, .hero__bridge, h1, .res-page-title'
  );
  let i = 0;
  loadTargets.forEach(el => {
    el.classList.add('load-in', 'load-in--' + Math.min(++i, 4));
  });

  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.body.classList.add('is-loaded');
  }));

  // Remaining sections: one-time reveal on first intersect.
  rest.forEach(section => section.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  rest.forEach(section => revealObserver.observe(section));
})();
```

- [ ] **Step 3: Manual verification in browser**

Run: `cd /Users/bema/Desktop/Projects/apex-site && npx --yes serve -l 4173 .` (or any static server), then open `http://localhost:4173/index.html`.

Expected: hero title/subtitle/form fade+rise in on load (staggered, ~50ms apart); scrolling down, each subsequent section fades+rises in once as it enters view and does not re-trigger when scrolling back up.

- [ ] **Step 4: Verify reduced-motion fallback**

In Chrome DevTools → Rendering tab → "Emulate CSS media feature prefers-reduced-motion" → `reduce`, reload `index.html`.

Expected: every section and hero element is immediately visible at full opacity — nothing stuck hidden.

- [ ] **Step 5: Commit**

```bash
git add styles.css script.js
git commit -m "Add site-wide scroll-reveal and hero load-in system"
```

---

### Task 3: Signature hero moment — case-file "APPROVED" stamp

**Files:**
- Modify: `index.html:527-539` (hero section)
- Modify: `styles.css` (new section)
- Modify: `script.js` (extends the reveal IIFE from Task 2, or a new small IIFE placed directly after it)

**Interfaces:**
- Consumes: `body.is-loaded` (Task 2), `--ease-out-back`, `--dur-med`, `--blue`, `--radius-*` are not used (stamp is circular, uses `border-radius:50%` directly, matching the existing `{rounded.full}` token for circular shapes).

**Design:** A small circular ink-stamp graphic — styled like a case-file approval stamp, rotated ~-12°, blue accent (`--blue`), reading "APPROVED" around the rim with a checkmark center — appears near the hero copy as the final beat of the load-in sequence (after the CTAs settle), landing with a "stamp thump" (scale overshoot via `--ease-out-back`). This is the one bespoke, story-specific interaction the spec calls for; everything else in this plan is systemic.

- [ ] **Step 1: Add the stamp markup**

In `index.html`, inside `<section class="hero">`, add the stamp as a sibling of `.hero__inner` (so it can be positioned independently), right after the closing `</div>` of `.hero__inner` (before `</section>`):

```html
        <div class="hero__stamp" aria-hidden="true">
          <svg viewBox="0 0 120 120" width="100%" height="100%">
            <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" stroke-width="3"/>
            <circle cx="60" cy="60" r="44" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <path id="stampArcTop" d="M 18 60 A 42 42 0 0 1 102 60" fill="none"/>
            <path id="stampArcBottom" d="M 102 60 A 42 42 0 0 1 18 60" fill="none"/>
            <text font-size="11" font-weight="600" letter-spacing="2" fill="currentColor">
              <textPath href="#stampArcTop" startOffset="50%" text-anchor="middle">APPROVED</textPath>
            </text>
            <path d="M42 62l12 12 24-26" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
```

- [ ] **Step 2: Add the stamp CSS**

Append to `styles.css`:

```css
/* ─── HERO SIGNATURE STAMP ──────────────────────────────────── */
.hero__stamp {
  position: absolute;
  right: max(32px, calc(50% - var(--container) / 2 + 24px));
  bottom: 15%;
  width: 96px;
  height: 96px;
  color: var(--blue);
  pointer-events: none;
  z-index: 3;
}
@media (max-width: 900px) {
  .hero__stamp { width: 72px; height: 72px; bottom: auto; top: 24px; right: 24px; }
}
@media (max-width: 640px) {
  .hero__stamp { display: none; }
}

@media (prefers-reduced-motion: no-preference) {
  .hero__stamp {
    opacity: 0;
    transform: scale(1.6) rotate(-24deg);
    transition: opacity var(--dur-med) var(--ease-out-back),
                transform var(--dur-med) var(--ease-out-back);
    transition-delay: .5s;
  }
  body.is-loaded .hero__stamp {
    opacity: 1;
    transform: scale(1) rotate(-12deg);
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero__stamp { transform: rotate(-12deg); }
}
```

- [ ] **Step 3: Verify in browser**

Reload `index.html` at `http://localhost:4173/index.html`.

Expected: after the hero copy/CTAs settle in, the blue "APPROVED" stamp thumps into place near the hero illustration, ending rotated at -12°, slightly overshooting on scale before settling (visible "punch"). On mobile widths (≤640px) it's hidden — no layout collision with the illustration.

- [ ] **Step 4: Verify reduced-motion fallback**

With `prefers-reduced-motion: reduce` emulated, reload.

Expected: the stamp is visible immediately, statically rotated at -12°, no animation.

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css
git commit -m "Add signature case-file stamp interaction to homepage hero"
```

---

### Task 4: Cursor "+" accent

**Files:**
- Modify: `styles.css` (new section)
- Modify: `script.js` (new IIFE, after Task 3's stamp logic or at the end of the file)

**Interfaces:**
- Consumes: `--blue`, `--dur-fast` (Task 1).
- Produces: none consumed elsewhere — self-contained.

**Design:** A small fixed-position "+" glyph (reusing the frame-line tick-mark visual already defined in `DESIGN.md`) follows the pointer and scales up slightly over interactive elements. Desktop pointer devices only (`hover: hover` and `pointer: fine`) — never shown on touch.

- [ ] **Step 1: Add cursor CSS**

Append to `styles.css`:

```css
/* ─── CURSOR ACCENT ("+" tick, desktop pointer devices only) ─── */
@media (hover: hover) and (pointer: fine) {
  .cursor-tick {
    position: fixed;
    top: 0;
    left: 0;
    width: 14px;
    height: 14px;
    pointer-events: none;
    z-index: 999;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity var(--dur-fast) var(--ease-standard),
                width var(--dur-fast) var(--ease-standard),
                height var(--dur-fast) var(--ease-standard);
  }
  .cursor-tick.is-visible { opacity: 1; }
  .cursor-tick.is-active { width: 22px; height: 22px; }
  .cursor-tick::before,
  .cursor-tick::after {
    content: '';
    position: absolute;
    background: var(--blue);
  }
  .cursor-tick::before { top: 50%; left: 0; right: 0; height: 1.5px; transform: translateY(-50%); }
  .cursor-tick::after  { left: 50%; top: 0; bottom: 0; width: 1.5px; transform: translateX(-50%); }

  /* native cursor stays on for text/inputs, hidden for the accent's targets */
  a, button, .btn { cursor: pointer; }
}
```

- [ ] **Step 2: Add cursor JS**

Append to `script.js`:

```javascript
// ─── CURSOR ACCENT ("+" tick, desktop pointer devices only) ────
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const tick = document.createElement('div');
  tick.className = 'cursor-tick';
  document.body.appendChild(tick);

  const INTERACTIVE = 'a, button, .btn, .who-card, .feature-card, .pricing-card, .company-card, .res-item';

  window.addEventListener('mousemove', (e) => {
    tick.style.left = e.clientX + 'px';
    tick.style.top = e.clientY + 'px';
    tick.classList.add('is-visible');
    tick.classList.toggle('is-active', !!e.target.closest(INTERACTIVE));
  });

  document.addEventListener('mouseleave', () => tick.classList.remove('is-visible'));
})();
```

- [ ] **Step 3: Verify in browser**

Reload `index.html`, move the mouse around, hover over buttons/cards.

Expected: a small blue "+" follows the cursor, growing slightly when hovering a button or card. On a touch device emulation (DevTools device toolbar), the accent never appears.

- [ ] **Step 4: Commit**

```bash
git add styles.css script.js
git commit -m "Add desktop cursor accent matching the frame-line tick motif"
```

---

### Task 5: Cross-document page transitions

**Files:**
- Modify: `styles.css` (top of file, near `@font-face` declarations)

**Interfaces:**
- None — CSS-only, self-contained, no JS, degrades to a normal hard navigation on unsupported browsers.

- [ ] **Step 1: Enable cross-document view transitions**

At the top of `styles.css`, right after the `@font-face` blocks, add:

```css
/* ─── CROSS-PAGE TRANSITIONS ─────────────────────────────────
   Native cross-document View Transitions (Chrome/Edge 126+).
   No-op fallback everywhere else — plain navigation, no JS needed. ── */
@view-transition {
  navigation: auto;
}

@media (prefers-reduced-motion: no-preference) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: var(--dur-med);
    animation-timing-function: var(--ease-standard);
  }
}
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
  }
}
```

- [ ] **Step 2: Verify in a supporting browser**

In Chrome (126+), serve the site locally and click a nav link between `index.html` and `consulting.html`.

Expected: a smooth cross-fade between pages instead of a hard flash-to-white reload. In Firefox/Safari (no support at time of writing), navigation behaves exactly as before — no error, no broken layout.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "Enable native cross-document view transitions between pages"
```

---

### Task 6: Hover-duration token consistency pass

**Files:**
- Modify: `styles.css:101,127,157,197,222,434,639,701,1048,1180,1190` (every existing ad hoc `transition:` value)

**Interfaces:**
- Consumes: `--dur-fast`, `--dur-med`, `--ease-standard` (Task 1).

**Design:** Replace every ad hoc transition duration with the new tokens, preserving relative speed relationships: short color/border transitions (`.15s`, `.18s`) → `--dur-fast`; the `.25s` transform/opacity pairs → `--dur-med`; the `.35s` max-height accordion transition stays proportionally the slowest, mapped to `--dur-slow` (Task 1).

- [ ] **Step 1: Replace each occurrence**

Run this from the repo root — it's a mechanical, reviewable substitution (not `sed -i` blind-replace, since durations must map to the *correct* token per the design above):

```bash
cd /Users/bema/Desktop/Projects/apex-site
python3 - <<'EOF'
import re

path = "styles.css"
s = open(path).read()

replacements = [
    ("transition: all .18s ease;", "transition: all var(--dur-fast) var(--ease-standard);"),
    ("transition: background .18s ease, color .18s ease;", "transition: background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard);"),
    ("transition: border-color .2s, box-shadow .2s;", "transition: border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard);"),
    ("transition: color .15s;", "transition: color var(--dur-fast) var(--ease-standard);"),
    ("transition: transform .25s, opacity .25s;", "transition: transform var(--dur-med) var(--ease-standard), opacity var(--dur-med) var(--ease-standard);"),
    ("transition: transform .12s ease-out;", "transition: transform var(--dur-fast) var(--ease-standard);"),
    ("transition: color .15s, border-color .15s;", "transition: color var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard);"),
    ("transition: background .15s;", "transition: background var(--dur-fast) var(--ease-standard);"),
    ("transition: text-decoration-color .15s;", "transition: text-decoration-color var(--dur-fast) var(--ease-standard);"),
    ("transition: transform .25s ease;", "transition: transform var(--dur-med) var(--ease-standard);"),
    ("transition: max-height .35s ease;", "transition: max-height var(--dur-slow) var(--ease-standard);"),
]

missing = []
for old, new in replacements:
    if old not in s:
        missing.append(old)
        continue
    s = s.replace(old, new)

open(path, "w").write(s)
if missing:
    print("NOT FOUND (check manually):")
    for m in missing:
        print(" -", m)
else:
    print("All replacements applied.")
EOF
```

- [ ] **Step 2: Verify every replacement landed**

Run: `grep -n "transition:.*[0-9]\+s" styles.css`

Expected: no output (or only lines belonging to `@keyframes` blocks like `platform-border-glow`, which are unrelated animation durations, not transitions, and are out of scope here).

- [ ] **Step 3: Spot-check in browser**

Reload `index.html` and `consulting.html`; hover buttons, nav links, cards, and open the FAQ accordion.

Expected: all hover/focus states and the FAQ accordion still animate smoothly — no visual regression, no snapping/instant changes.

- [ ] **Step 4: Commit**

```bash
git add styles.css
git commit -m "Route existing hover/transition durations through shared motion tokens"
```

---

### Task 7: Reduced-motion + visual QA pass

**Files:**
- Create: `docs/superpowers/qa/2026-08-08-award-redesign-qa.md` (QA notes + screenshot references)
- Create: `/private/tmp/claude-501/-Users-bema/cee0f71f-eb21-4036-9219-1108d1c57cce/scratchpad/apex-qa.mjs` (throwaway Playwright script, not committed)

**Interfaces:**
- None — this task only verifies the output of Tasks 1–6.

- [ ] **Step 1: Write the Playwright QA script**

```javascript
// /private/tmp/claude-501/-Users-bema/cee0f71f-eb21-4036-9219-1108d1c57cce/scratchpad/apex-qa.mjs
import { chromium } from 'playwright';

const pages = [
  'index.html', 'consulting.html', 'company.html',
  'resources.html', 'referrals.html', 'article-o1a-criteria.html',
];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];
const base = 'http://localhost:4173';

const browser = await chromium.launch();

for (const reduceMotion of [false, true]) {
  const context = await browser.newContext({
    reducedMotion: reduceMotion ? 'reduce' : 'no-preference',
  });
  for (const vp of viewports) {
    const page = await context.newPage();
    await page.setViewportSize(vp);
    for (const p of pages) {
      await page.goto(`${base}/${p}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1200); // let load-in/reveal settle
      const hidden = await page.$$eval('.reveal, .load-in', els =>
        els.filter(el => getComputedStyle(el).opacity === '0').map(el => el.className)
      );
      const tag = `${p} / ${vp.name} / reduced=${reduceMotion}`;
      if (hidden.length) {
        console.error(`FAIL ${tag}: ${hidden.length} element(s) stuck at opacity 0 —`, hidden);
      } else {
        console.log(`OK   ${tag}`);
      }
      const shotName = `${p.replace('.html', '')}-${vp.name}-${reduceMotion ? 'reduced' : 'motion'}.png`;
      await page.screenshot({
        path: `/private/tmp/claude-501/-Users-bema/cee0f71f-eb21-4036-9219-1108d1c57cce/scratchpad/${shotName}`,
        fullPage: true,
      });
    }
    await page.close();
  }
  await context.close();
}

await browser.close();
```

- [ ] **Step 2: Run it against the local server**

Run (with the static server from Task 2, Step 3, still running on port 4173):

```bash
cd /Users/bema/Desktop/Projects/apex-site
node /private/tmp/claude-501/-Users-bema/cee0f71f-eb21-4036-9219-1108d1c57cce/scratchpad/apex-qa.mjs
```

Expected: every line printed is `OK ...`. Any `FAIL` line names a page/viewport/motion-setting where a `.reveal` or `.load-in` element never received `.is-revealed` / `body.is-loaded` — go back to Task 2 or 3 and fix the selector or observer logic for that page before continuing.

- [ ] **Step 3: Review the screenshots**

Open the generated PNGs in `/private/tmp/claude-501/-Users-bema/cee0f71f-eb21-4036-9219-1108d1c57cce/scratchpad/` and confirm: no layout shift introduced by the reveal system (elements land in their normal document position, motion is purely opacity/transform), the hero stamp appears correctly on `index.html` desktop, and reduced-motion screenshots show fully-visible content identical in position to the motion screenshots.

- [ ] **Step 4: Run a Lighthouse performance check on the homepage**

```bash
npx --yes lighthouse http://localhost:4173/index.html --only-categories=performance --chrome-flags="--headless" --output=json --output-path=/private/tmp/claude-501/-Users-bema/cee0f71f-eb21-4036-9219-1108d1c57cce/scratchpad/lighthouse-index.json
python3 -c "import json; d=json.load(open('/private/tmp/claude-501/-Users-bema/cee0f71f-eb21-4036-9219-1108d1c57cce/scratchpad/lighthouse-index.json')); print('Performance score:', d['categories']['performance']['score']*100)"
```

Expected: performance score comparable to pre-redesign (motion additions should not meaningfully regress it, since everything runs on `transform`/`opacity` per the Global Constraints). If it drops noticeably, check whether the cursor-tick `mousemove` handler or the reveal `IntersectionObserver` is the cause before shipping.

- [ ] **Step 5: Write the QA notes file and commit**

Write a short markdown file at `docs/superpowers/qa/2026-08-08-award-redesign-qa.md` summarizing: which pages/viewports were checked, the reduced-motion result, the Lighthouse performance score, and any manual follow-ups. Then:

```bash
cd /Users/bema/Desktop/Projects/apex-site
mkdir -p docs/superpowers/qa
git add docs/superpowers/qa/2026-08-08-award-redesign-qa.md
git commit -m "Add QA notes for award-redesign motion system"
```
