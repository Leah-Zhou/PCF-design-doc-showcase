import type { Metadata } from "next";
import { DocPage, DocSection } from "@/components/docs/DocPage";
import { TokenName, TokenTable } from "@/components/docs/TokenTable";
import {
  fontFamily,
  fontSizes,
  fontWeights,
  lineHeights,
  typeStyles,
} from "@/tokens/catalog";

export const metadata: Metadata = {
  title: "Typography",
};

const sample = "The quick brown fox jumps over the lazy dog.";

export default function TypographyPage() {
  return (
    <DocPage
      title="Typography"
      description="Averta, a limited size scale, two weights, and composed text styles that alias those primitives."
    >
      <p>
        Primitive font tokens are shared. Text styles compose size, weight, and
        line height. Larger styles step up from mobile to desktop through the
        Responsiveness aliases.
      </p>

      <DocSection title="Font family">
        <TokenTable
          headers={["Token", "CSS", "Value"]}
          rows={[
            [
              <TokenName key="family-path">font.family</TokenName>,
              <TokenName key="family-css">--font-family</TokenName>,
              fontFamily,
            ],
          ]}
        />
        <p className="text-[var(--color-text-secondary)]" style={{ fontSize: "var(--font-size-sm)" }}>
          Averta is the specified family. If the webfont is not installed, the
          site falls back to the loaded sans stack.
        </p>
      </DocSection>

      <DocSection title="Weights">
        <TokenTable
          headers={["Token", "Value", "Example"]}
          rows={Object.entries(fontWeights).map(([name, token]) => [
            <TokenName key={name}>{`font.weight.${name}`}</TokenName>,
            token.$value,
            <span
              key={`${name}-ex`}
              style={{ fontWeight: `var(--font-weight-${name})` }}
            >
              {name}
            </span>,
          ])}
        />
      </DocSection>

      <DocSection title="Size scale">
        <TokenTable
          headers={["Token", "Value", "Sample"]}
          rows={Object.entries(fontSizes).map(([name, token]) => [
            <TokenName key={name}>{`font.size.${name}`}</TokenName>,
            token.$value,
            <span
              key={`${name}-sample`}
              className="block max-w-full truncate"
              style={{ fontSize: `var(--font-size-${name})`, lineHeight: 1.15 }}
            >
              Ag
            </span>,
          ])}
        />
      </DocSection>

      <DocSection title="Line height">
        <TokenTable
          headers={["Token", "Value"]}
          rows={Object.entries(lineHeights).map(([name, token]) => [
            <TokenName key={name}>{`font.lineHeight.${name}`}</TokenName>,
            token.$value,
          ])}
        />
        <p className="text-[var(--color-text-secondary)]" style={{ fontSize: "var(--font-size-sm)" }}>
          Letter spacing is 0% on the source text styles. There is no separate
          letter-spacing token.
        </p>
      </DocSection>

      <DocSection title="Composed styles">
        <p>
          Each style uses primitive size, weight, and line-height tokens.
          Desktop sizes follow the Figma Responsiveness aliases.
        </p>
        <div className="flex flex-col gap-6xl">
          {typeStyles.map((style) => (
            <figure key={style.id} className="flex flex-col gap-md border-b border-[var(--color-border-subtle-01)] pb-6xl last:border-b-0 last:pb-0">
              <figcaption className="flex flex-col gap-2xs text-[var(--color-text-secondary)]" style={{ fontSize: "var(--font-size-xs)" }}>
                <TokenName>{style.figma}</TokenName>
                <span>
                  {style.weight} · size {style.responsive.mobile} / desktop{" "}
                  {style.responsive.desktop} · line-height {style.lineHeight} ·
                  letter-spacing {style.letterSpacing}
                </span>
              </figcaption>
              <p className={`type-${style.id}`}>{sample}</p>
            </figure>
          ))}
        </div>
      </DocSection>
    </DocPage>
  );
}
