import tokens from "./tokens.json";

type TokenNode = {
  $type?: string;
  $value?: string;
  $extensions?: {
    figma?: string;
    group?: string;
    role?: string;
    modes?: { light: string; dark: string };
  };
};

type TypeStyle = {
  figma: string;
  size: string;
  weight: string;
  lineHeight: string;
  letterSpacing: string;
  responsive: { mobile: string; desktop: string };
};

const REFERENCE = /^\{(.+)\}$/;

export type PrimitiveColor = {
  path: string;
  cssVar: string;
  hue: string;
  step: string;
  value: string;
};

export type SemanticColor = {
  path: string;
  cssVar: string;
  figma: string;
  group: string;
  role: string;
  light: { alias: string; value: string };
  dark: { alias: string; value: string };
};

export type SpaceToken = {
  name: string;
  cssVar: string;
  value: string;
};

export type TypeStyleToken = TypeStyle & {
  id: string;
};

function isToken(value: unknown): value is TokenNode {
  return Boolean(value && typeof value === "object" && "$value" in value);
}

function resolvePath(path: string): string {
  const match = path.match(REFERENCE);
  const keys = (match ? match[1] : path).split(".");
  let current: unknown = tokens;

  for (const key of keys) {
    if (!current || typeof current !== "object") {
      throw new Error(`Unknown token path: ${path}`);
    }

    current = (current as Record<string, unknown>)[key];
  }

  if (isToken(current) && typeof current.$value === "string") {
    if (REFERENCE.test(current.$value)) {
      return resolvePath(current.$value);
    }

    return current.$value;
  }

  throw new Error(`Could not resolve token: ${path}`);
}

function aliasName(reference: string): string {
  return reference.replace(/^\{/, "").replace(/\}$/, "");
}

export const primitiveColors: PrimitiveColor[] = Object.entries(
  tokens.color.brand,
).flatMap(([hue, steps]) =>
  Object.entries(steps).map(([step, token]) => ({
    path: `color.brand.${hue}.${step}`,
    cssVar: `--color-brand-${hue}-${step}`,
    hue,
    step,
    value: token.$value,
  })),
);

const semanticGroups = [
  ["page", tokens.color.page],
  ["surface", tokens.color.surface],
  ["text", tokens.color.text],
  ["border", tokens.color.border],
  ["link", tokens.color.link],
  ["surfaceInteractive", tokens.color.surfaceInteractive],
  ["notification", tokens.color.notification],
  ["buttons", tokens.color.buttons],
] as const;

export const semanticColors: SemanticColor[] = semanticGroups.flatMap(
  ([groupKey, group]) =>
    Object.entries(group).map(([name, token]) => {
      const extensions = token.$extensions;
      const lightRef = extensions.modes.light;
      const darkRef = extensions.modes.dark;

      return {
        path: `color.${groupKey}.${name}`,
        cssVar: `--color-${name}`,
        figma: extensions.figma,
        group: extensions.group,
        role: extensions.role,
        light: { alias: aliasName(lightRef), value: resolvePath(lightRef) },
        dark: { alias: aliasName(darkRef), value: resolvePath(darkRef) },
      };
    }),
);

export const spaceTokens: SpaceToken[] = Object.entries(tokens.space).map(
  ([name, token]) => ({
    name,
    cssVar: `--space-${name}`,
    value: token.$value,
  }),
);

export const fontFamily = tokens.font.family.$value;
export const fontWeights = tokens.font.weight;
export const fontSizes = tokens.font.size;
export const lineHeights = tokens.font.lineHeight;

export const typeStyles: TypeStyleToken[] = Object.entries(
  tokens.typography.style,
).map(([id, style]) => ({ id, ...style }));

export const radiusTokens = Object.entries(tokens.radius).map(
  ([name, token]) => ({
    name,
    cssVar: `--radius-${name}`,
    value: token.$value,
    figma: name === "pill" ? "radius/pill" : name,
  }),
);

export const opacityTokens = Object.entries(tokens.opacity).map(
  ([name, token]) => ({
    name,
    cssVar: `--opacity-${name}`,
    value: token.$value,
    figma: `opacity-${name}`,
  }),
);

export const sizeTokens = Object.entries(tokens.size).map(([name, token]) => ({
  name,
  cssVar: `--size-${name}`,
  value: token.$value,
  figma: `Icons/${name}`,
}));

export const strokeWidthTokens = Object.entries(tokens.strokeWidth).map(
  ([name, token]) => ({
    name,
    cssVar: `--stroke-width-${name}`,
    value: token.$value,
    figma: `border/width/${name}`,
  }),
);

export const semanticGroupsOrder = [
  "Background",
  "Text",
  "Border",
  "Interactive",
  "Feedback",
  "Button",
] as const;

export function cssVar(name: string): string {
  return `var(${name})`;
}
