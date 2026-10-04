# Content Plan

## 1. Purpose

This site is a small public design-system documentation showcase for a product design portfolio.

It should demonstrate:

* Design-system thinking
* Token architecture
* Component architecture
* Design-to-code translation
* Component usage guidance
* Accessibility thinking
* Interaction and motion
* Documentation quality

The site should feel like a lightweight combination of **Storybook + Zeroheight**, not a marketing website and not a collection of static Markdown articles.

The documentation should make the relationship visible:

**Figma → Tokens → Components → Documentation**

All examples must be public-safe and representative.

Do not expose confidential company information, internal product details, proprietary implementation details, or unpublished patterns.

---

# 2. Navigation

## Overview

* Introduction
* Principles

## Foundations

* Color
* Typography
* Spacing

## Components

* Button

## About the system

* Architecture
* Accessibility
* Contribution & governance

Do not add a Patterns section until there are real, portfolio-safe pattern examples.

---

# 3. Documentation experience

The site should behave like a lightweight design-system documentation platform.

The documentation experience should include:

* Persistent documentation sidebar
* Clear section hierarchy
* Active page state
* Previous / next navigation
* Responsive mobile navigation
* Live component previews
* Interactive component controls where useful
* Token references
* Code examples
* Usage guidance
* Accessibility guidance
* Component status
* Figma source reference
* Clear separation between design documentation and implementation documentation

Avoid making the documentation look like a blog.

Avoid large marketing-style hero sections.

---

# 4. Foundation page anatomy

Foundation pages should be concise and visual.

## Foundation structure

1. Page title
2. Short description
3. Purpose / rationale
4. Visual reference
5. Token reference
6. Usage guidance
7. Accessibility considerations where relevant
8. Related components

---

# 5. Color page

The Color page should demonstrate the token architecture rather than simply display a palette.

## Structure

### Header

* Color
* One-sentence description

### Overview

Explain the difference between primitive and semantic color tokens.

### Primitive colors

Display representative color tokens as visual swatches.

Each swatch should show:

* Color
* Token name
* Value
* Role

Example:

```text
Blue 500
color.blue.500
#XXXXXX
Primitive
```

### Semantic colors

Show semantic tokens separately.

Example:

```text
Primary action
color.action.primary

Surface
color.surface.primary

Text
color.text.primary

Border
color.border.default
```

### Token relationship

Show a simple visual relationship:

```text
Primitive
    ↓
Semantic
    ↓
Component
```

### Accessibility

Explain how color contrast and non-color communication are considered.

Do not claim a complete WCAG audit unless one has actually been performed.

---

# 6. Typography page

The Typography page should be visually driven.

## Structure

1. Overview
2. Font family
3. Type scale
4. Weight
5. Line height
6. Letter spacing where applicable
7. Responsive behavior
8. Token reference

Display real examples using the actual implemented typography tokens.

For example:

```text
Display
48 / 56 / 600

The quick brown fox
```

The typography examples must use the actual token implementation rather than static images.

---

# 7. Spacing page

The Spacing page should visually demonstrate the spacing scale.

## Structure

1. Overview
2. Spacing principles
3. Scale visualization
4. Token reference
5. Usage examples

Show the spacing scale visually:

```text
4
████

8
████████

16
████████████████

24
████████████████████████
```

Use actual spacing tokens for the visualization.

---

# 8. Component page anatomy

Every component page should follow a consistent structure.

The goal is to answer:

1. What is it?
2. When should I use it?
3. When should I not use it?
4. What does it look like?
5. What variants and states does it support?
6. How do I configure it?
7. What tokens does it use?
8. How does it behave?
9. How do I implement it?
10. What accessibility requirements should I consider?

## Standard component page

### 1. Header

Show:

* Component name
* One-sentence description
* Component status
* Optional Figma source link

Example:

```text
Button

Buttons trigger actions and communicate hierarchy
through visual emphasis and interaction states.

Stable
```

Do not invent a status. If the status is not known, use an appropriate neutral label such as `Showcase component`.

---

### 2. Overview

Briefly explain:

* What the component does
* What problem it solves
* Why it exists in the system

Keep this concise.

---

### 3. When to use

Explain practical situations where the component should be used.

Avoid generic statements.

---

### 4. When not to use

Explain situations where another component or HTML element would be more appropriate.

Where useful, provide an alternative.

Example:

```text
Don't use a Button for navigation.

Use a Link instead.
```

---

### 5. Live component playground

This is the primary visual section of the component page.

Use the actual implemented component.

The playground should allow the reader to explore supported component properties.

For Button, controls may include:

* Variant
* Size
* State
* Leading icon
* Trailing icon
* Label
* Disabled
* Loading

Only expose controls that actually exist in the component API.

The controls should update the live component.

This section should feel similar to a lightweight Storybook Controls experience.

---

### 6. Variants

Show the main variants as a visual comparison.

For Button:

```text
Primary     Secondary     Tertiary
```

Each example should be live.

Include a short description of the intended hierarchy.

---

### 7. States

Show important states visually.

For Button:

```text
Default
Hover
Pressed
Focus
Disabled
Loading
```

Do not create an enormous combination matrix.

Show representative states and document important behavior.

---

### 8. Anatomy

Show the component anatomy visually.

For Button:

```text
┌───────────────────────────────┐
│  [Icon]   Label   [Icon]      │
└───────────────────────────────┘
```

Label:

* Container
* Leading icon
* Label
* Trailing icon
* Loading indicator where applicable

Use consistent terminology throughout the documentation.

---

### 9. Usage guidance

Explain:

* When to use each variant
* Hierarchy
* Placement
* Content guidance
* Common mistakes

---

### 10. Do / Don't

Only include rules that address real design decisions.

Keep to approximately 2–4 meaningful examples.

Each example should contain:

* Visual example
* Short explanation

Avoid generic advice.

---

### 11. Tokens

Show the tokens consumed by the component.

Example:

```text
Color
color.action.primary

Typography
typography.label.medium

Spacing
space.300

Radius
radius.medium
```

Where possible, make token names clickable or visually connected to the relevant foundation page.

The documentation should demonstrate the relationship:

```text
Foundation token
      ↓
Component token
      ↓
Component
```

---

### 12. Interaction and motion

Document:

* Hover behavior
* Pressed behavior
* Focus behavior
* Loading behavior
* Transition timing
* Reduced-motion behavior

Only document motion that is actually implemented or defined by the design system.

---

### 13. Accessibility

Document:

* Semantic HTML
* Keyboard interaction
* Focus treatment
* Accessible name
* Disabled state
* Loading behavior
* Icon-only requirements
* Reduced motion where applicable

Do not claim full WCAG compliance unless audited.

---

### 14. API / props

Show the component API in a compact table.

Columns:

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |

The API documentation should reflect the actual TypeScript component API.

Do not manually invent props.

---

### 15. Code example

Show the most common implementation example.

Example:

```tsx
<Button variant="primary">
  Continue
</Button>
```

Keep examples concise.

---

### 16. Related documentation

Where appropriate, link to:

* Related foundation tokens
* Related components
* Accessibility guidance
* Architecture

---

# 9. Component documentation principles

All component pages should follow these principles:

### Live over static

Use real components rather than screenshots whenever possible.

### Show the important combinations

Do not render every possible combination.

### Explain decisions

Document why a variant exists, not only what it looks like.

### Keep scanning easy

Use cards, tables, tabs, previews, and clear section hierarchy.

### Progressive disclosure

Do not put every technical detail at the top of the page.

Designers should quickly understand usage.

Developers should be able to continue into API and implementation details.

---

# 10. Button-specific documentation

The Button page should be the reference implementation for future component pages.

It should demonstrate:

* Primary
* Secondary
* Tertiary
* Destructive if supported
* Sizes supported by the Figma component
* States
* Icon support
* Loading
* Accessibility
* Motion
* Token usage
* Interactive playground
* API
* Code examples

The Button page should establish the visual and structural template that Input and Toast will follow.

---


# 11. Documentation visual language

The documentation itself should feel like a professional design-system product.

Use:

* Strong typographic hierarchy
* Generous whitespace
* Neutral documentation canvas
* Clearly separated preview surfaces
* Subtle borders
* Compact controls
* Clear code blocks
* Token tables
* Consistent section spacing
* Small status labels
* Responsive layouts

Avoid:

* Marketing hero sections
* Large decorative gradients
* Excessive shadows
* Glassmorphism
* Generic SaaS dashboard styling
* Huge cards around every paragraph
* Excessive animation
* Decorative illustrations that do not communicate system information

The component preview should be visually prominent.

The documentation text should remain secondary to the actual component behavior.

---

# 12. Voice

Use concise, practical, human language.

Prefer:

> Use a primary button for the main action on a page.

Avoid:

> The primary button is a powerful and versatile component designed to facilitate meaningful user interactions.

Documentation should sound like a design-system team explaining decisions to another designer or developer.

---

# 13. Public-safe content

This is a portfolio showcase.

Do not expose:

* Internal product names
* Private implementation details
* Confidential design-system documentation
* Internal URLs
* Private governance processes
* Production metrics that are not explicitly approved for public use
* Complete proprietary token libraries

Use representative examples where necessary.

---

# 14. Success criteria

The documentation should feel like a small, credible design-system documentation product.

A visitor should be able to:

1. Understand the system structure within seconds.
2. Navigate foundations and components easily.
3. See real components rather than screenshots.
4. Explore component variants and states.
5. Understand when to use a component.
6. See the tokens behind the component.
7. Read the implementation API.
8. Understand accessibility considerations.
9. Understand the relationship between Figma, tokens, components, and code.

The Button page is the quality benchmark for every future component page.
