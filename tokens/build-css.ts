import {
  fontFamily,
  fontSizes,
  fontWeights,
  lineHeights,
  opacityTokens,
  primitiveColors,
  radiusTokens,
  semanticColors,
  sizeTokens,
  spaceTokens,
  strokeWidthTokens,
  typeStyles,
} from "./catalog";

function declarations(entries: Array<[string, string]>): string {
  return entries.map(([name, value]) => `  ${name}: ${value};`).join("\n");
}

export function buildTokenCss(): string {
  const primitives = primitiveColors.map(
    (token) => [token.cssVar, token.value] as [string, string],
  );

  const fonts: Array<[string, string]> = [
    ["--font-family", fontFamily],
    ...Object.entries(fontWeights).map(
      ([name, token]) => [`--font-weight-${name}`, token.$value] as [string, string],
    ),
    ...Object.entries(fontSizes).map(
      ([name, token]) => [`--font-size-${name}`, token.$value] as [string, string],
    ),
    ...Object.entries(lineHeights).map(
      ([name, token]) => [`--line-height-${name}`, token.$value] as [string, string],
    ),
  ];

  const spaces = spaceTokens.map(
    (token) => [token.cssVar, token.value] as [string, string],
  );

  const supporting = [
    ...radiusTokens.map(
      (token) => [token.cssVar, token.value] as [string, string],
    ),
    ...opacityTokens.map(
      (token) => [token.cssVar, token.value] as [string, string],
    ),
    ...sizeTokens.map((token) => [token.cssVar, token.value] as [string, string]),
    ...strokeWidthTokens.map(
      (token) => [token.cssVar, token.value] as [string, string],
    ),
  ];

  const light = semanticColors.map(
    (token) => [token.cssVar, `var(--${token.light.alias.replace(/\./g, "-")})`] as [
      string,
      string,
    ],
  );

  const dark = semanticColors.map(
    (token) => [token.cssVar, `var(--${token.dark.alias.replace(/\./g, "-")})`] as [
      string,
      string,
    ],
  );

  const typeClasses = typeStyles
    .map((style) => {
      return `.type-${style.id} {
  font-family: var(--font-family), var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  font-size: var(--font-size-${style.responsive.mobile});
  font-weight: var(--font-weight-${style.weight});
  line-height: var(--line-height-${style.lineHeight});
  letter-spacing: 0;
}

@media (min-width: 1024px) {
  .type-${style.id} {
    font-size: var(--font-size-${style.responsive.desktop});
  }
}`;
    })
    .join("\n\n");

  return `:root {
${declarations([...primitives, ...fonts, ...spaces, ...supporting, ...light])}
}

[data-theme="dark"] {
${declarations(dark)}
}

${typeClasses}
`;
}
