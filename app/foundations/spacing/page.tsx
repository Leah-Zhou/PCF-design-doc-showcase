import type { Metadata } from "next";
import { DocPage, DocSection } from "@/components/docs/DocPage";
import { TokenName, TokenTable } from "@/components/docs/TokenTable";
import { spaceTokens } from "@/tokens/catalog";

export const metadata: Metadata = {
  title: "Spacing",
};

export default function SpacingPage() {
  const max = Math.max(
    ...spaceTokens.map((token) => Number.parseInt(token.value, 10)),
  );

  return (
    <DocPage
      title="Spacing"
      description="A named spacing scale used for gaps and paragraph spacing. Values come from the Figma space collection."
    >
      <p>
        Use these tokens instead of arbitrary pixel values. Smaller steps sit
        inside components; larger steps separate sections.
      </p>

      <DocSection title="Scale">
        <TokenTable
          headers={["Token", "Value", "Example"]}
          rows={spaceTokens.map((token) => {
            const px = Number.parseInt(token.value, 10);

            return [
              <TokenName key={token.name}>{`space.${token.name}`}</TokenName>,
              token.value,
              <span
                key={`${token.name}-bar`}
                className="block h-md bg-[var(--color-link-primary)]"
                style={{ width: `${Math.max((px / max) * 100, 2)}%` }}
                aria-hidden="true"
              />,
            ];
          })}
        />
      </DocSection>

      <DocSection title="Usage">
        <p>A stacked example using the scale:</p>
        <div className="border border-[var(--color-border-subtle-02)] bg-[var(--color-surface-neutral-01)] p-7xl">
          <div className="flex flex-col gap-md">
            <p className="font-[var(--font-weight-semi-bold)]">Label</p>
            <div className="h-7xl border border-[var(--color-border-interactive-default)] bg-[var(--color-page-bg-primary)]" />
          </div>
          <div className="mt-2xl flex flex-col gap-2xl">
            <div className="h-7xl border border-[var(--color-border-subtle-02)] bg-[var(--color-surface-neutral-02)]" />
            <div className="h-7xl border border-[var(--color-border-subtle-02)] bg-[var(--color-surface-neutral-02)]" />
          </div>
          <p className="type-caption-sm mt-4xl text-[var(--color-text-secondary)]">
            md between label and field · 2xl between related controls · 4xl
            above supporting text · 7xl around the group
          </p>
        </div>
      </DocSection>
    </DocPage>
  );
}
