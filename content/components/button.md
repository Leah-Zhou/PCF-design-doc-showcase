# Button

Buttons trigger actions and communicate hierarchy through emphasis, state, and placement.

Status: Showcase component.

Figma: Primary, Secondary, Tertiary masters.

## When to use

- The user triggers an action: continue, save, apply, cancel.
- Primary for the main action on a view.
- Secondary for a supporting choice next to primary.
- Tertiary for a low-emphasis text action.

## When not to use

- Do not use a button for navigation between pages. Use a link.
- Do not place two primary buttons in the same view.

## Variants

- Primary
- Secondary
- Tertiary

## Sizes

- Primary and secondary: Sm, Lg. Filled `md` maps to Sm.
- Tertiary: Sm, Md, Lg.

## States

- Default
- Hover
- Pressed
- Focus (web; not a Figma variant)
- Disabled

## Accessibility

- Use a real `<button>` element for button actions.
- Provide a visible keyboard focus state.
- Icon-only usage needs an `aria-label`.
- Filled disabled uses 40% opacity, matching Figma. That is not a contrast guarantee.

## Motion

Color and focus feedback is 150ms and honors `prefers-reduced-motion`.

## Example API

```tsx
<Button variant="primary" size="lg">
  Continue
</Button>
```
