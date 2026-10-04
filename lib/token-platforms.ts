export type TokenPlatform = "web" | "ios" | "android";

export const tokenPlatforms: Array<{ id: TokenPlatform; label: string }> = [
  { id: "web", label: "Web" },
  { id: "ios", label: "iOS" },
  { id: "android", label: "Android" },
];

function camelCase(value: string): string {
  return value.replace(/[-_/]+([a-zA-Z0-9])/g, (_, char: string) =>
    char.toUpperCase(),
  );
}

function snakeCase(value: string): string {
  return value.replace(/[-/]+/g, "_").replace(/__+/g, "_");
}

function leafName(figma: string): string {
  const parts = figma.split("/");
  return parts[parts.length - 1] ?? figma;
}

function formatCollection(name: string): string {
  const camel = camelCase(name);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

function collectionName(figma: string): string {
  if (figma.includes("/")) {
    return formatCollection(figma.split("/")[0] ?? "Token");
  }

  return formatCollection(figma.split("-")[0] ?? "Token");
}

export function platformColorRef(figma: string, cssVar: string, platform: TokenPlatform): string {
  const leaf = leafName(figma);

  if (platform === "web") {
    return `var(${cssVar})`;
  }

  if (platform === "ios") {
    return `${collectionName(figma)}.${camelCase(leaf)}`;
  }

  return `@color/${snakeCase(leaf)}`;
}

export function platformValueRef(figma: string, cssVar: string, platform: TokenPlatform): string {
  const leaf = leafName(figma);

  if (platform === "web") {
    return `var(${cssVar})`;
  }

  if (platform === "ios") {
    return `${collectionName(figma)}.${camelCase(leaf)}`;
  }

  return `@dimen/${snakeCase(figma)}`;
}
