# Apex Site — UI Rules (Main Page)

Conventions established while building `index.html`. Follow by default on this page and reuse when it makes sense elsewhere on the site. Divider-specific rules live in `CLAUDE.md` — this file covers everything else.

## Colors

```css
--white:   #FFFFFF;
--milk:    #FDFCFB;   /* off-white card/section background */
--milk-2:  #EFEDE8;
--black:   #111111;
--gray-1:  #6B7280;   /* secondary text */
--gray-2:  #F5F4F1;   /* borders, dividers, light section fills */
--blue:    #0057FF;   /* primary accent — used sparingly (badges, active states, links) */
```

- The primary accent (`--blue`) can change over time — it's a variable, always update it there, never hardcode the hex elsewhere.
- The site alternates white and dark (`--black`) sections down the page — never all-white.

## Buttons

- `.btn--dark` is **permanently black** (`var(--black)`), decoupled from `--blue`. It never follows the primary accent color, even when the accent changes.
  - Hover: `#2A2A2A`.
- `.btn--outline` (e.g. "Check if you qualify"): white background, real (not shadow-faked) `1.5px solid var(--black)` border.
  - Hover: `background: var(--milk)`, no color inversion.
- Never use `box-shadow` to fake a border on a button — it renders inset relative to a real border on a sibling button and looks visibly thinner/"inside." Use an actual `border` property.

## Typography

- Font: **General Sans** (via Fontshare), replacing the earlier SF Pro Display / Geist stacks.
- `h2.sec-title` (every section title): centered, `max-width:640px`, no trailing period, no subtitle/description paragraph underneath — the title stands alone.

## Cards

Shared look across Features, "Why Apex works," Pricing, and FAQ cards:
- `border-radius: 20px` (large blocks) or `12px` (FAQ items) — see `--radius-xl` / `--radius-md`.
- `border: 1px solid var(--gray-2)` on light backgrounds; `rgba(255,255,255,.12)` on dark sections.
- Dark-section cards: `background: rgba(255,255,255,.04)`.
- Card padding is uniform on all sides — no ancestor container may add its own padding on top (see `CLAUDE.md` §4 for the divider implication of this).

## Dark sections

- Divider lines switch to `rgba(255,255,255,.12)` (not the light `--gray-2`).
- "+" tick marks invert to white.
- Each dark section gets its own local `.section-frameline--left/--right` overlay to mask the global page frame lines (see `CLAUDE.md` §0/§5).
- Filled/striped dividers (`.divider-fill`) use the same height convention as light sections: `padding-bottom: 80px`, line at `bottom: 80px`, fill `bottom:0; height:80px` — kept identical between white and black sections (previously drifted to 100px on dark sections; now unified to 80px everywhere).

## Header / Footer (site-wide, not just main page)

- Nav links, in order: **Consulting, Resources, Referrals, Company** — no anchor sub-links (old `#visas`/`#pricing` items removed).
- "Scout" renamed to **"Referrals"** everywhere (nav, footer, mobile menu).
- Header CTA button: **"Get started"** (not "Request a demo" — that copy is reserved for the hero's second CTA only).
- Footer: single merged brand column (logo + legal disclaimer + copyright), then Navigation / Contacts / Legal columns, then a full-width faded illustration (`hero-manhattan-dots.svg`) at the bottom.
- Header and footer must be identical across **every** page on the site (all 15 HTML files) — when one changes, sync it everywhere, not just on `index.html`.

## Cache-busting

- `styles.css`, `script.js`, and any referenced SVGs use a `?v=N` query string, bumped after every edit to that file.
- Every page must carry a version query on `styles.css` (plain `styles.css` with no query was found to serve stale cached CSS on some pages — always add `?v=N`).
- Version counters are tracked **per file per page** (`index.html` and `consulting.html` have independent counters) — bump only the pages actually affected, but check all pages share the same underlying `styles.css` so a global CSS change needs a version bump everywhere that references it.

## Section structure

- Reference pattern for "title + divider + content with its own vertical dividers" is documented in `CLAUDE.md` §3 — reuse it rather than reinventing per section.
- One divider per section boundary, always owned by the section above it (`CLAUDE.md` §2).
