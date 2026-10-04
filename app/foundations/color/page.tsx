import type { Metadata } from "next";
import { DocPage, DocSection } from "@/components/docs/DocPage";
import { Swatch, TokenName, TokenTable } from "@/components/docs/TokenTable";
import {
  primitiveColors,
  semanticColors,
  semanticGroupsOrder,
} from "@/tokens/catalog";

export const metadata: Metadata = {
  title: "Color",
};

const hues = ["neutral", "purple", "red", "blue", "green", "yellow"] as const;

export default function ColorPage() {
  return (
    <DocPage
      title="Color"
      description="A two-tier color system: primitive palette values, then semantic aliases that components consume."
    >
      <p>
        Semantic tokens alias primitives so themes can change without rewriting
        components. This page renders the implemented CSS variables, not a
        screenshot of Figma.
      </p>
      <p className="text-[var(--color-text-secondary)]" style={{ fontSize: "var(--font-size-sm)" }}>
        Public subset only: brand ramps, representative semantic aliases, and
        the Button color tokens those components bind. Partnership palettes
        are not included.
      </p>

      <DocSection title="Primitive palette">
        <p>
          Raw brand ramps. Components should not use these directly.
        </p>
        <div className="flex flex-col gap-6xl">
          {hues.map((hue) => {
            const steps = primitiveColors.filter((token) => token.hue === hue);

            return (
              <div key={hue}>
                <h3 className="type-h3 mb-xl capitalize">{hue}</h3>
                <div className="grid grid-cols-2 gap-xl sm:grid-cols-3">
                  {steps.map((token) => (
                    <div key={token.path} className="flex flex-col gap-sm">
                      <span
                        aria-hidden="true"
                        className="h-7xl rounded-[var(--radius-md)] border border-[var(--color-border-subtle-02)]"
                        style={{ background: `var(${token.cssVar})` }}
                      />
                      <TokenName>{token.path}</TokenName>
                      <span
                        className="font-mono text-[var(--color-text-secondary)]"
                        style={{ fontSize: "var(--font-size-xs)" }}
                      >
                        {token.cssVar} · {token.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </DocSection>

      <DocSection title="Semantic colors">
        <p>
          Each semantic token aliases a primitive. Light is the default;
          dark is the same name with a different alias.
        </p>
        {semanticGroupsOrder.map((group) => {
          const rows = semanticColors.filter((token) => token.group === group);

          return (
            <div key={group} className="flex flex-col gap-xl">
              <h3 className="type-h3">{group}</h3>
              <TokenTable
                headers={["Token", "Role", "Light", "Dark"]}
                rows={rows.map((token) => [
                  <div key={`${token.path}-name`} className="flex flex-col gap-2xs">
                    <TokenName>{token.figma}</TokenName>
                    <span className="font-mono text-[var(--color-text-secondary)]">
                      {token.cssVar}
                    </span>
                  </div>,
                  token.role,
                  <div key={`${token.path}-light`} className="flex flex-col gap-2xs">
                    <Swatch cssVar={token.light.value} hex={token.light.value} />
                    <TokenName>{token.light.alias}</TokenName>
                  </div>,
                  <div key={`${token.path}-dark`} className="flex flex-col gap-2xs">
                    <Swatch cssVar={token.dark.value} hex={token.dark.value} />
                    <TokenName>{token.dark.alias}</TokenName>
                  </div>,
                ])}
              />
            </div>
          );
        })}
      </DocSection>

      <DocSection title="Usage">
        <p>
          Components consume semantic names. The same token resolves
          differently in light and dark.
        </p>
        <div className="grid gap-2xl sm:grid-cols-2">
          <UsageCard theme="light" label="Light" />
          <UsageCard theme="dark" label="Dark" />
        </div>
      </DocSection>

      <DocSection title="Accessibility">
        <p>
          Color is never the only indicator. Pair semantic color with text or
          labels. Check contrast for `text-primary` and `text-secondary` on
          `page-bg-primary` and `surface-neutral-01`.
        </p>
      </DocSection>
    </DocPage>
  );
}

function UsageCard({
  theme,
  label,
}: {
  theme: "light" | "dark";
  label: string;
}) {
  return (
    <div
      data-theme={theme}
      className="flex flex-col gap-xl rounded-[var(--radius-lg)] border border-[var(--color-border-subtle-02)] bg-[var(--color-page-bg-primary)] p-4xl"
    >
      <p
        className="font-[var(--font-weight-semi-bold)] text-[var(--color-text-secondary)] uppercase"
        style={{ fontSize: "var(--font-size-xs)", letterSpacing: "0.06em" }}
      >
        {label}
      </p>
      <p className="type-h3 text-[var(--color-text-primary)]">Page title</p>
      <p className="type-body-sm text-[var(--color-text-secondary)]">
        Supporting copy uses text-secondary on page-bg-primary.
      </p>
      <p className="font-[var(--font-weight-semi-bold)] text-[var(--color-link-primary)]">
        Interactive link
      </p>
      <div className="flex flex-col gap-md rounded-[var(--radius-md)] border border-[var(--color-decor-success)] bg-[var(--color-surface-success)] p-xl">
        <p
          className="font-[var(--font-weight-semi-bold)]"
          style={{ color: "var(--color-decor-success)", fontSize: "var(--font-size-sm)" }}
        >
          Feedback
        </p>
        <p className="text-[var(--color-text-primary)]" style={{ fontSize: "var(--font-size-sm)" }}>
          Success surface with a matching indicator color.
        </p>
      </div>
    </div>
  );
}
