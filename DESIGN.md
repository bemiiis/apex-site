---
version: "1.0"
name: Apex-Design-System
description: Apex's design language for its immigration-visa marketing site (runapex.co) — an editorial, document-like surface built around a literal "case file" motif. Hairline frame lines run the full height of every page with "+" corner tick marks at every section boundary, like registration marks on a printed legal document. White / milk / black canvas, a single electric-blue accent, a serif-adjacent display face (Review) for headlines paired with a neutral grotesque (General Sans) for UI text, flat 8px-radius surfaces defined by hairline borders instead of shadows, and sections that alternate white and black like a printed page and its negative.

colors:
  white: "#FFFFFF"
  milk: "#FDFCFB"
  milk-2: "#EFEDE8"
  black: "#111111"
  gray-1: "#6B7280"
  gray-2: "#E2E1DD"
  blue: "#0057FF"
  hairline-on-dark: "rgba(255,255,255,.12)"
  text-on-dark-soft: "rgba(255,255,255,.65)"
  text-on-dark-faint: "rgba(255,255,255,.45)"

typography:
  display-hero:
    fontFamily: Review, Arial, sans-serif
    fontSize: "clamp(40px, 7vw, 56px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: -0.04em
  display-title:
    fontFamily: Review, Arial, sans-serif
    fontSize: "clamp(28px, 4vw, 44px)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -0.03em
  pullquote:
    fontFamily: General Sans, sans-serif
    fontSize: "clamp(18px, 2vw, 24px)"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: -0.02em
  hero-sub:
    fontFamily: General Sans, sans-serif
    fontSize: "clamp(16px, 2vw, 18px)"
    fontWeight: 400
    lineHeight: 1.3
  body-lg:
    fontFamily: General Sans, sans-serif
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.6
    note: long-form article/legal copy only
  body-md:
    fontFamily: General Sans, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.3
  body-sm:
    fontFamily: General Sans, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
  ui-md:
    fontFamily: General Sans, sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.3
  ui-sm:
    fontFamily: General Sans, sans-serif
    fontSize: 13px
    fontWeight: 500
  caption:
    fontFamily: General Sans, sans-serif
    fontSize: 12px
    fontWeight: 500
    letterSpacing: 0.04em
    textTransform: uppercase
  micro:
    fontFamily: General Sans, sans-serif
    fontSize: 11px
    fontWeight: 500

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  2xl: 32px
  3xl: 40px
  4xl: 48px
  5xl: 80px
  section-mobile: 48px
  section-tablet: 80px
  section-desktop: 140px

rounded:
  sm: 8px
  md: 12px
  lg: 18px
  xl: 20px
  pill: 100px
  full: 50%

components:
  btn-dark:
    background: "{colors.black}"
    color: "{colors.white}"
    rounded: "{rounded.sm}"
    height: 44px
    padding: "0 20px"
    border: "1.5px solid {colors.black}"
  btn-outline:
    background: "{colors.white}"
    color: "{colors.black}"
    rounded: "{rounded.sm}"
    height: 44px
    border: "1.5px solid {colors.black}"
  btn-light:
    background: "{colors.white}"
    color: "{colors.black}"
    rounded: "{rounded.sm}"
    height: 44px
    note: light pill used on dark sections in place of btn-dark
  card:
    background: "{colors.milk}"
    border: "1px solid {colors.gray-2}"
    rounded: "{rounded.xl}"
    padding: "24px–32px"
  card-dark:
    background: "rgba(255,255,255,.04)"
    border: "1px solid {colors.hairline-on-dark}"
    rounded: "{rounded.xl}"
  input:
    background: "{colors.white}"
    border: "1.5px solid {colors.gray-2}"
    rounded: "{rounded.sm}"
    height: 44px
  tab-filter:
    background: "{colors.white}"
    border: "1px solid {colors.gray-2}"
    rounded: "{rounded.sm}"
    activeBackground: "{colors.black}"
    activeColor: "{colors.white}"
  nav-bar:
    background: "rgba(255,255,255,.92)"
    backdropFilter: "blur(12px)"
    height: 64px
    border-bottom: "1px solid {colors.gray-2}"
---

## Overview

Apex is an AI-assisted platform for building extraordinary-ability visa petitions (O-1, EB-1A, EB-2 NIW). The marketing site's visual language borrows from the object it's about: a legal filing. Every page is framed by two vertical hairlines running its full height — like the registration marks on a printed document — and every section boundary is marked with a small "+" tick where a horizontal divider crosses those lines. The rest of the surface stays deliberately quiet: two off-white canvases (`white`, `milk`), one ink (`black`), one accent (`blue`), and a display serif reserved for headlines only. Nothing is decorative for its own sake — the frame *is* the decoration.

## Colors

### Canvas & Surface
- `{colors.white}` `#FFFFFF` — page background, input fields, outline-button fill.
- `{colors.milk}` `#FDFCFB` — the default card/surface tone. Almost every bordered card (`who-card`, `pricing-card`, `feature-card`, `booking__calendly`) sits on milk, not pure white, so cards read as a shade apart from the page.
- `{colors.milk-2}` `#EFEDE8` — a second, slightly deeper off-white for nested/hover surfaces.
- `{colors.black}` `#111111` — the only "black." Used for headline text, primary buttons, and as the background of dark sections. Never pure `#000`.

### Text
- Primary text: `{colors.black}`.
- Secondary/muted text: `{colors.gray-1}` `#6B7280` — subtitles, card body copy, meta labels.
- On dark sections: white at three opacities — `{colors.white}` for headings, `{colors.text-on-dark-soft}` (65%) for body copy, `{colors.text-on-dark-faint}` (45%) for the quietest meta text.

### Accent
- `{colors.blue}` `#0057FF` — the single accent color in the entire system. Used for links, active states, the criteria-number column, and the featured-pricing-card border/glow. Nothing else carries color; Apex has no secondary or tertiary accent.

### Dark Sections
The site alternates white and black sections rather than using color to separate content. On a `section--dark` block:
- Background becomes `{colors.black}`, text becomes white (see opacities above).
- Hairlines switch from `{colors.gray-2}` to `{colors.hairline-on-dark}` — a translucent white, not a lighter gray — so dividers stay legible without glowing against the black.
- The "+" corner tick marks invert from black to white.
- Card surfaces become `rgba(255,255,255,.04)` with a `{colors.hairline-on-dark}` border instead of milk + gray-2.

## Typography

### Font Family
- **Review** (custom, self-hosted `.ttf`, weights 400/500) — reserved exclusively for `h1`, `h2`, `h3`, and `.sec-title`. This is the only place the brand's "voice" shows through; body copy never uses it.
- **General Sans** (via Fontshare/Google Fonts, weights 400–800) — every other piece of text: paragraphs, labels, buttons, nav, form fields.

### Hierarchy
| Token | Size | Weight | Use |
|---|---|---|---|
| `{typography.display-hero}` | 40–56px (clamp) | 400 | Page `h1` |
| `{typography.display-title}` | 28–44px (clamp) | 400 | Section titles (`.sec-title`) |
| `{typography.pullquote}` | 18–24px (clamp) | 500 | Founder-quote pull-quote |
| `{typography.hero-sub}` | 16–18px (clamp) | 400 | Hero subheading |
| `{typography.body-lg}` | 17px | 400 | Long-form article & legal-page copy only |
| `{typography.body-md}` | 16px | 400 | Default paragraph size, form inputs |
| `{typography.body-sm}` | 15px | 400 | Card descriptions |
| `{typography.ui-md}` | 14px | 500 | Buttons, nav links, list items |
| `{typography.ui-sm}` | 13px | 500 | Secondary labels, tags, tab filters |
| `{typography.caption}` | 12px | 500, uppercase, `+0.04em` | Eyebrow labels |
| `{typography.micro}` | 11px | 500 | Smallest badges |

### Principles
- Headlines are always `font-weight: 400` — Review at regular weight *is* the emphasis; the system never bolds a headline.
- `.sec-title` is always centered (`text-align: center`, `margin-inline: auto`) and **never ends with a period**. It never has a subtitle paragraph underneath — the title stands alone.
- Negative letter-spacing scales with size (`-0.04em` at hero scale down to `-0.02em`), tightening as text gets bigger — standard optical correction for the display face.
- Body copy sizes step down in 1px increments (17→16→15→14→13) rather than jumping — the system reads as one continuous scale, not a handful of unrelated sizes.

## Layout

### Spacing System
An 8px-based scale (with a 4px half-step at the smallest size): `{spacing.xxs}` 4 → `{spacing.xs}` 8 → `{spacing.sm}` 12 → `{spacing.md}` 16 → `{spacing.lg}` 20 → `{spacing.xl}` 24 → `{spacing.2xl}` 32 → `{spacing.3xl}` 40 → `{spacing.4xl}` 48 → `{spacing.5xl}` 80. Section vertical padding is its own top-level token, stepping by breakpoint: `{spacing.section-desktop}` 140px → `{spacing.section-tablet}` 80px → `{spacing.section-mobile}` 48px.

### Grid & Container
- Content max-width: 1160px (`--container`), centered, with `32px` inline padding at desktop.
- The page frame: two `1px` vertical hairlines, fixed to the viewport, positioned at `max(32px, calc(50% - 1160px/2))` from each edge — i.e. they hug the container edge on any screen narrower than ~1224px, and hold at a flat 32px gutter beyond that.

### The Frame-Line System (signature motif)
This is Apex's one genuinely original UI idea, and everything else is built to respect it:
1. **Page frame lines** (`body::before` / `body::after`) run the full height of every page at the container edge.
2. **Horizontal dividers** (`.cross-divider`) always span edge-to-edge — full viewport width, *through* the frame lines, never stopping at the container's padded content width.
3. **"+" corner tick marks** — a 7×7px cross built from two layered 1px gradients — mark every point where a horizontal divider crosses a frame line. They render in black on white sections, white on dark sections.
4. **Card dividers** (vertical lines between grid cards) follow the same rule at a smaller scale: they run the *full* height of the row including its padding, with their own small tick marks at top and bottom.
5. Only one divider marks any given boundary (never both a section's bottom edge *and* the next section's top edge).
6. On mobile, when a card grid collapses to a single column, its vertical dividers don't just disappear — they're replaced by horizontal ones between the stacked cards, positioned at the exact midpoint via JS (`getBoundingClientRect`), preserving the "every boundary gets a line" rule at any viewport width.

### Responsive Strategy
Two breakpoints carry the whole site: **900px** (tablet — nav collapses to a burger menu, 4-column grids drop to 2) and **640px** (mobile — everything collapses to 1 column, container padding drops to 24px, frame lines pull in to 12px). A few components use their own narrower breakpoint when their specific content demands it (e.g. a wide two-column contact form holds its layout slightly longer than the generic grid), but card grids are held to the 900/640 standard everywhere for consistency.

## Elevation & Depth
Apex is essentially flat. Real content surfaces (cards, buttons, inputs) carry **no drop shadow** — separation comes entirely from a `1px solid {colors.gray-2}` hairline border plus the milk-vs-white tone shift. The one soft shadow token, `--shadow-card`, is reserved for small nested UI-mockup illustrations inside feature cards (little "product screenshot" panels), never for real cards — keeping actual content flatter than the decorative mockups floating inside it.

## Shapes

### Border Radius Scale
| Token | Value | Use |
|---|---|---|
| `{rounded.sm}` | 8px | Every interactive control — buttons, inputs, filter tabs. Unified across the whole site; nothing interactive is more or less rounded than this. |
| `{rounded.md}` | 12px | Small nested panels (FAQ items, pricing split rows). |
| `{rounded.lg}` | 18px | Rare — a couple of stat/illustration containers. |
| `{rounded.xl}` | 20px | Every card — the largest radius in the system, reserved for card-scale surfaces only. |
| `{rounded.pill}` | 100px | Badges and tags only (eyebrow labels, count pills) — never buttons or inputs. |
| `{rounded.full}` | 50% | Circular avatars. |

The scale is deliberately narrow: interactive controls are always `sm`, cards are always `xl`, and pill/circle shapes are reserved for non-interactive badges — so radius alone tells you what kind of element you're looking at.

## Components

### Buttons
`{components.btn-dark}` — black fill, white text, a soft inset highlight top edge / inset shadow bottom edge for a subtle pressed-metal feel; darkens on hover, dents further on active. This is the default CTA everywhere.
`{components.btn-outline}` — white fill, black 1.5px border; fills to milk on hover. Used as the secondary action next to a dark button.
`{components.btn-light}` — the dark button's mirror image, used on `section--dark` backgrounds so the CTA still reads as "the button" rather than blending into the black.
All three share one geometry regardless of variant or page: **44px height, `{rounded.sm}` radius, `{typography.ui-md}` label**. Size modifiers (`--sm` 8×16 padding/13px type, `--lg` 12×20 padding/15px type) change padding and label size only — never the 44px height.

### Cards
`{components.card}` is the one card formula used everywhere — `who-card`, `pricing-card`, `feature-card`, article-thumbnail cards: milk background, `1px {colors.gray-2}` border, `{rounded.xl}`, 24–32px padding. `{components.card-dark}` is the same shape on a dark section: `rgba(255,255,255,.04)` fill instead of milk.

### Inputs
Email/text fields match the button geometry exactly — 44px height, `{rounded.sm}`, `1.5px {colors.gray-2}` border — so a paired input+button (the hero demo-request row) reads as one continuous control split in two.

### Tabs & Filters
`{components.tab-filter}` — a bordered pill-less button, `{rounded.sm}`, that inverts to a solid black fill when active. Used for the resources/positions category filters. A second tab style (`.visa-tab`) exists for the underline-indicator pattern (flat, no radius, bottom border swaps to blue on the active tab) — the two coexist because they signal different things: filter tabs *select a view*, underline tabs *switch a document*.

### Dividers (signature components)
Covered in [Layout → The Frame-Line System](#the-frame-line-system-signature-motif) above — this is the component family that does the most to make Apex look like *Apex* rather than a generic SaaS template.

## Do's and Don'ts

### Do
- Reserve Review (the display face) for `h1`/`h2`/`h3`/`.sec-title` only. The moment body copy uses it, the hierarchy collapses.
- Keep every interactive control at `{rounded.sm}` 8px, no exceptions — a rounder button next to a squarer one is the fastest way to make the site look unfinished.
- Run every horizontal divider full-bleed to the frame lines, never just to the container's padded width.
- Flip hairline color (not just background) when moving a component onto a dark section — `{colors.gray-2}` on white, `{colors.hairline-on-dark}` on black.
- Use milk (`{colors.milk}`), not pure white, as the default card fill so cards read as a distinct surface from the page.
- Keep card grids on the shared 900px/640px breakpoint pair, even when a component's content would technically allow a different collapse point.

### Don't
- Don't add a second accent color. Blue is the only one; everything else is grayscale.
- Don't drop a shadow on a real content card — borders + milk/white tone are the only elevation cues real content gets.
- Don't let a card grid's vertical dividers just vanish on mobile — replace them with the horizontal equivalent between stacked cards.
- Don't end a `.sec-title` with a period, left-align it, or add a subtitle paragraph beneath it.
- Don't use the `{rounded.pill}` 100px radius on anything a user clicks — pill shape means "badge," not "button," in this system.
- Don't introduce a third breakpoint for a generic grid — 900/640 is the standard; only genuinely content-driven exceptions (e.g. a form too wide to collapse at 900) get their own.
