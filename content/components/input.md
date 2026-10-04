# Input

Inputs allow users to provide or edit information.

## Anatomy

- Label
- Input field
- Optional supporting text
- Error message
- Optional leading/trailing affordance

## States

- Default
- Focus
- Filled
- Error
- Disabled
- Read-only

## Accessibility

- Associate the visible label with the input.
- Use supporting/error text to communicate additional context.
- Preserve a strong focus indicator.
- Do not use placeholder text as the only label.

## Example API

```tsx
<Input
  label="Email address"
  hint="We'll use this to send your confirmation."
/>
```
