import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { buildTokenCss } from "./build-css";

const root = dirname(fileURLToPath(import.meta.url));

writeFileSync(
  join(root, "tokens.css"),
  `/* Generated from tokens/tokens.json. Source of truth is the Figma Variables subset. */\n${buildTokenCss()}`,
);
