# Implementation Plan

A public-safe design-system documentation site. Stack already in place: Next.js App Router, React, TypeScript, Tailwind CSS v4.

Content and tokens already exist as drafts. This plan uses those files as the source of truth and does not invent proprietary specs, internal products, or production metrics.

---

## 1. Documentation site architecture

**Role of the site:** documentation chrome around a small, token-driven component library. The story to make visible is Foundations → Tokens → Components → documented usage.

**Layers**

| Layer | Responsibility |
|---|---|
| Tokens | Representative values in `tokens/`. CSS custom properties are the runtime source. Components and docs consume tokens, not raw hex. |
| Design-system UI | `Button`, `Input`, `Toast` — reusable, typed, token-backed. |
| Docs chrome | Shell, sidebar, preview frames, token tables, code examples. Not part of the product system. |
| Content | Markdown in `content/`. Pages compose content + live previews. |

**Routing (App Router)**

- `/` — Introduction (from `content/homepage.md`)
- `/principles` — Design principles
- `/foundations/color|typography|spacing`
- `/components/button|input|toast`
- `/about/architecture`
- `/about/accessibility`
- `/about/governance`

No `/patterns` routes.

**Implementation shape**

- Shared docs layout for all documentation routes.
- Typed navigation config as the single source for sidebar, mobile nav, and prev/next.
- Keep existing `.md` files. Render them into page sections; live previews and token tables stay in React, not in the markdown tables alone.
- MDX is optional later if inline preview components become useful. Not required for v1.
- TypeScript throughout. No hardcoded colors in components.

**Out of scope for v1:** search, versioning, theming switcher, Figma embed, analytics, contribution tooling.

---

## 2. Navigation structure

Match `content-plan.md`. Four groups, no Patterns.

```
Overview
  Introduction          /
  Principles            /principles

Foundations
  Color                 /foundations/color
  Typography            /foundations/typography
  Spacing               /foundations/spacing

Components
  Button                /components/button
  Input                 /components/input
  Toast                 /components/toast

About the system
  Architecture          /about/architecture
  Accessibility         /about/accessibility
  Contribution          /about/governance
```

**Behavior**

- Desktop: sticky left sidebar, grouped labels, current-page highlight.
- Mobile: compact header + open/close navigation (drawer or panel). Focus trap while open; return focus on close.
- Skip link to main content.
- Optional footer prev/next from the same nav order.
- Active state from the route, not visual-only styling.

---

## 3. Page / layout structure

**Docs shell**

```
[skip link]
header (site title + mobile nav control)
aside (sidebar nav)
main
  page header (title, short description)
  article (sections)
```

Generous measure for reading (roughly 40–48rem for prose). Previews and token tables can use the full content column.

**Foundation / component page anatomy** (from `content-plan.md`, include only when useful)

1. Title
2. Short description
3. Why it exists
4. Design preview (live)
5. Tokens / values
6. Usage guidance
7. Accessibility
8. Interaction / motion
9. Code example
10. Do / Don’t (only where it clarifies a real decision)

Keep pages short. This is a portfolio-sized system, not an enterprise portal.

**Overview / About pages** use the same shell and typography, without forcing live previews.

**Reusable page pieces**

- `DocPage` — title, description, stacked sections
- `Preview` — framed live example on a surface token
- `TokenTable` — name, value, role
- `CodeExample` — short, representative API
- `DoDont` — paired guidance
- `Section` — heading + body with consistent spacing tokens

---

## 4. Design-token architecture

Show primitive values vs semantic roles. Components consume semantic tokens.

**Source:** expand `tokens/example-tokens.json` as the authored file. Keep values representative (the current palette and base-4 scale stay). Label them as portfolio examples in the Color page.

**Proposed groups**

| Group | Purpose |
|---|---|
| Color primitives | Raw palette (e.g. blue, neutrals, green, red) |
| Color semantic | `primary`, `surface`, `text`, `text-muted`, `border`, `success`, `error` — already drafted |
| Typography | Family, size, weight, line-height for Display / H1 / H2 / Body / Small / Caption |
| Spacing | Existing 4–64 scale |
| Radius | Existing sm / md / lg |
| Motion | Short duration + easing (docs + Toast only) |
| Focus | Visible ring color/width |

**Runtime**

- JSON → CSS custom properties on `:root` (and Tailwind `@theme` mapped to those variables).
- Components use `var(--color-text)` / theme tokens, never `#2457FF`.
- Docs Color page renders the same token list used in code.

**Not in v1:** dark-theme product system, brand theming, density scales, unpublished production tokens. Prefer a single light editorial theme so contrast and hierarchy stay controlled.

---

## 5. Reusable UI components

Two packages of components in the repo, clearly separated.

### Product system (the showcase)

**Button** — variants: primary, secondary, tertiary, destructive. Sizes: at least medium (small optional). States: default, hover, pressed, focus, disabled, loading. Native `<button>`. Visible focus. Loading does not remove the accessible name.

**Input** — label, field, optional hint, error. States: default, focus, filled, error, disabled, read-only. Label associated via `htmlFor` / `id`. Placeholder is never the only label.

**Toast** — variants: success, information, warning, error. Non-blocking. Dismissible. Important / error content does not depend on auto-dismiss alone. Live region for announcements. Short enter/exit.

Each gets a docs page with live states, tokens used, usage, a11y, motion, and a short API example matching the existing markdown.

### Docs chrome (not the system)

Sidebar, mobile nav, site header, preview frame, token table, code block, do/don’t, layout primitives (stack, page header).

These may use the same tokens for visual consistency. They are not documented as product components.

---

## 6. Documentation content structure

Reuse and lightly complete existing files. Do not invent company process, internal metrics, or proprietary patterns.

| Page | Source |
|---|---|
| Introduction | `content/homepage.md` |
| Principles | Principles already listed in homepage; split to `/principles` |
| Color / Typography / Spacing | Existing foundation markdown + live token views |
| Button / Input / Toast | Existing component markdown + live components |
| Architecture | New, public-safe: tokens → components → docs workflow |
| Accessibility | New: baseline practices already stated in the content (contrast, focus, labels, live regions, reduced motion) |
| Contribution | New and generic: how a small system stays consistent (proposals, review, document decisions). No fake intake SLAs or internal tools |

**Voice:** practical, brief, editorial. Document decisions, not a full spec dump.

**Code examples:** only the public APIs already sketched (`Button`, `Input`). No confidential snippets.

---

## 7. Responsive behavior

| Viewport | Layout |
|---|---|
| Desktop (~1024+) | Sticky sidebar + main column. Previews in a row when comparing variants. |
| Tablet | Sidebar may collapse earlier if the measure gets tight; same content stack. |
| Mobile | Header + overlay/drawer nav. Single-column article. Variant previews stack. Token tables scroll horizontally if needed rather than crushing type. |

- Type scale wraps and can slightly reduce display size on small screens; do not lock pages to fixed widths.
- Spacing tokens stay consistent; section rhythm uses the larger steps (24 / 40).
- Touch targets for nav and controls meet a usable minimum (~44px).
- No hover-only information.

---

## 8. Accessibility

Treat this as a documented baseline, then implement it.

- Semantic landmarks: `header`, `nav`, `main`, `aside`. One `h1` per page.
- Skip link; mobile nav focus management and `aria-expanded`.
- Keyboard: all actions reachable; do not remove focus rings.
- Contrast: text and interactive states checked against the representative tokens (especially `text-muted` on `surface`, and secondary/tertiary buttons).
- Color is never the only indicator (error text + Input error state; Toast icon/label + color).
- Button is a real `button`; Input labels are programmatic.
- Toast: appropriate live region; errors/warnings persist or are otherwise available; do not announce a flood of polite messages.
- Honor `prefers-reduced-motion`.
- About / Accessibility page explains these choices so the portfolio shows the thinking, not only the CSS.

No claim of a full WCAG audit or production compliance score.

---

## 9. Motion / interaction approach

Motion supports feedback. It should not delay the action or decorate the page.

**Tokens:** short durations (e.g. 120–200ms hover/focus, ~200–280ms Toast enter/exit) and a standard easing. No bounce, no large page transitions.

**Where motion belongs**

- Button / Input: color, border, and focus changes. Instant enough to feel like state, not animation.
- Toast: short enter/exit. Reduced-motion: opacity only or instant appear/disappear.
- Mobile nav: short open/close; reduced-motion: no slide.
- Sidebar current-page state: color/weight, not motion.

**Do not:** scroll-jack, parallax, staggered hero animation, or motion that is the only way to notice a state change.

---

## Suggested build order

1. Tokens → CSS variables → editorial docs shell (layout, type, sidebar, mobile nav).
2. Introduction + Principles + About pages (content, no live components yet).
3. Foundation pages with token tables and visual swatches/scales.
4. `Button`, then `Input`, then `Toast`, each with its docs page.
5. Accessibility and reduced-motion pass across shell + components.

---

## Constraints to keep

- TypeScript, reusable React, design tokens, semantic HTML.
- No Patterns section.
- No confidential or invented proprietary material.
- Visual tone: clean, structured, editorial, technical, minimal, readable.
