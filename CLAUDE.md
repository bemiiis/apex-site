# Apex Site — Divider System Rules

These rules apply to every divider line (horizontal or vertical) on every page of this site (`index.html`, `consulting.html`, any future page). Follow them by default, without being asked each time.

## -1. Section titles

Every block/section title (`h2.sec-title`) is:
- **Centered** — always `text-align:center; margin-inline:auto; max-width:640px` (or similar), never left-aligned.
- **Never ends with a period.**
- **No description/subtitle paragraph underneath.** The title stands alone — don't add a `<p>` explaining or elaborating on it below a section title. (The hero's own subtitle under the main `h1` is not a "block title" and is exempt from this — it's the primary value proposition, not a section description.)

## 0. Dark sections

The site is not meant to be an all-white canvas — it alternates white and dark (black) sections. Whenever the user says she wants a "dark section" / "тёмный участок", give that block a black/dark background instead of white.

- The divider **line** color switches to a subtle dark tone close to the background (`rgba(255,255,255,.12)`), NOT the light `var(--gray-2)` used on white sections — `--gray-2` is very light and would stand out too much against black.
- The "+" corner tick marks invert to **white** on dark sections (they're currently drawn with `#111` gradients — on a dark section use `#fff` instead so they stay visible).
- This is a standing rule, not a one-off — apply it automatically any time a section is asked to be dark, without being told the tick-color detail again.
- The page's vertical frame lines (`body::before`/`body::after`) are global and fixed — they don't know about individual sections, so they stay bright even behind a dark section. Every dark section therefore gets its own local `.section-frameline--left` / `.section-frameline--right` overlay (see §5) instead of relying on the global ones.

## 5. Sections are independent, self-contained blocks

Each section should be built so it can be customized on its own without touching any other section — colors, dividers, side frame-lines, anything. Don't assume shared global elements (like the fixed page frame lines) are "good enough" for every section; if a section needs its own look, give it its own local version of that element scoped to just that section.

Concretely: `.section-frameline--left`/`--right` (in `styles.css`) are per-section vertical line overlays, added as direct children of a section that needs to override the global frame-line appearance (e.g. dark sections need a darker line). To remove side dividers from a specific block entirely, just omit these elements from that section — don't touch the global rule, since other sections may still need it.

## 1. Full edge-to-edge span

Every divider always runs from one true boundary to the other:
- **Horizontal dividers** reach the page frame lines (`body::before`/`body::after`), never stopping at a `.container`'s padded content width.
- **Vertical dividers** reach the true top-to-bottom of their section/card, never stopping short at some nested container's incidental edge.

Dividers render on top (higher z-index) of any card/content container they cross — never clipped or "stuck" inside one.

**Vertical dividers between paired cards must span the whole block, padding included — not just the card height.** If the divider is positioned/sized (`top:0;bottom:0`) against a wrapper that only wraps the cards themselves (e.g. a grid row like `.features-row`), it gets clipped to the cards' height and stops short of any padding around them, leaving a gap before the horizontal divider above/below. Fix: position the vertical divider against the outer `.container` (or whatever box actually includes the padding), as a sibling of the row wrapper, not nested inside it — so it reaches from container edge to container edge and lands flush against the horizontal dividers it meets.

**Never nest a divider inside `.container`** (it's max-width + centered + padded, so a divider there falls short of the frame lines). Instead:
1. **Structural**: make the divider a direct sibling of `.container`, inside a `position: relative` `<section>` — it then naturally spans the section's full width.
2. **CSS-only** (safe to nest anywhere): `width: 100vw; margin-left: calc(-50vw + 50%); position: relative;`

The "+" corner marks (`::before`/`::after`) use:
```css
left:  calc(max(32px, calc(50% - var(--container) / 2)) - 3px);
right: calc(max(32px, calc(50% - var(--container) / 2)) - 3px);
```
Reuse the existing `.cross-divider` / `.cross-divider--flow` / `.phase-divider` classes in `platform.html` rather than reinventing this.

## 2. One divider per boundary

A divider marking the space between two adjacent blocks/sections belongs to only ONE of them — by convention, the block's own **bottom**. Never add one at both a block's bottom AND the next block's top; that doubles the line and the space where they meet.

Exception: a section can legitimately have two dividers at its bottom if one of them is structurally required to close off internal content (e.g. terminating a vertical divider between cards) and the other marks the actual section-to-section spacing — but that's two dividers serving two different jobs, not a duplicate of the same job.

## 3. Reference structure: title + divider + content

For any section with a title followed by content that needs its own vertical dividers:

```html
<section class="section" id="X" style="position:relative;padding-bottom:0;">
  <div class="container">
    <h2 class="sec-title" style="text-align:center;max-width:640px;margin-inline:auto;margin-bottom:40px;">Title</h2>
  </div>

  <div class="cross-divider cross-divider--flow"></div>

  <div class="container" style="position:relative;padding:0;">
    <!-- vertical divider elements go here, sized relative to THIS container -->
    ...content...
  </div>
</section>
```

Key points:
- Two separate `.container` divs — one for the title, one for the content. Never combine them.
- The divider between them is `.cross-divider.cross-divider--flow`, a **direct sibling of `.container`**, never nested inside one.
- Give the content container `padding: 0` (not padding-top/bottom) so child items' own padding is the *only* spacing on every side — this is what makes card padding equal on all four sides (see §4).

## 4. Equal card padding (all four sides)

When a row of cards/columns needs consistent padding on every side (top/right/bottom/left all equal):

- Give each card/item element the padding directly (e.g. `padding: 44px`), and make sure **no ancestor container adds its own extra padding** on top of that (container padding-inline, padding-top, padding-bottom must all be `0`) — otherwise sides silently end up unequal (e.g. top becomes item-padding + container-padding-top, while left is only item-padding).
- Put dividers **between cards** as part of the card itself (e.g. `::before` for the line, `::after` + one real `<span>` for the two tick marks, positioned at `top:0`/`bottom:0` of the card, `height:100%`) rather than computing their position from grid percentages — this guarantees the divider is exactly flush with the card's real edges regardless of content length.
- First card in a row gets no left divider (`:first-child` → `content: none` / no border).

## Debugging checklist when a divider "doesn't reach" or "looks uneven"

1. Is it nested inside a `.container`? → move it out (§1).
2. Does an ancestor have padding the divider's `top/bottom:0` doesn't account for? → move that padding onto the same box the divider is sized against, or add/subtract the exact pixel difference.
3. Are there two dividers at the same boundary (top of this section AND bottom of the previous one)? → remove one (§2).
4. Is card padding uneven side-to-side? → check for leftover container padding stacking on top of the card's own padding (§4).
