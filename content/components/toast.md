# Toast

Toast messages provide brief feedback after an action.

## Use when

- An action has completed.
- The user needs lightweight confirmation.
- The message does not require immediate interaction.

## Variants

- Success
- Information
- Warning
- Error

## Behavior

- Appears without blocking the current task.
- Has enough time to be read.
- Can be dismissed when appropriate.
- Important messages should not rely on disappearing automatically.

## Accessibility

For dynamic announcements, use an appropriate live-region strategy and ensure important information is available to assistive technology.

## Motion

Use a short enter/exit transition. Respect `prefers-reduced-motion`.
