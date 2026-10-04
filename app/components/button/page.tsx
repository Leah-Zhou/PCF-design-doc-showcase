import type { Metadata } from "next";
import type { ComponentProps } from "react";
import Link from "next/link";
import { ButtonPlayground } from "@/app/components/button/ButtonPlayground";
import { Anatomy, AnatomyTarget } from "@/components/docs/Anatomy";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { ChevronIcon, PlusIcon } from "@/components/docs/DemoIcons";
import { DoDont } from "@/components/docs/DoDont";
import { DocPage, DocSection } from "@/components/docs/DocPage";
import { DocPager } from "@/components/docs/DocPager";
import {
  PlatformTokenSwitch,
  type PlatformTokenRow,
} from "@/components/docs/PlatformTokenSwitch";
import { Preview } from "@/components/docs/Preview";
import { PropTable } from "@/components/docs/PropTable";
import { ThemePreview } from "@/components/docs/ThemePreview";
import {
  Button,
  resolveButtonSize,
  type ButtonVariant,
} from "@/components/ui/Button";
import { platformColorRef, platformValueRef } from "@/lib/token-platforms";
import {
  opacityTokens,
  radiusTokens,
  semanticColors,
  sizeTokens,
  strokeWidthTokens,
} from "@/tokens/catalog";

export const metadata: Metadata = {
  title: "Button",
};

const tokenColors = semanticColors.filter(
  (token) => token.group === "Button" || token.figma.startsWith("link/"),
);

const example = `<Button variant="primary" size="lg">
  Continue
</Button>

<Button variant="secondary" size="lg">
  Cancel
</Button>

<Button variant="tertiary" trailingIcon={<ChevronIcon />}>
  Learn more
</Button>`;

const states = [
  { name: "Default", dataState: undefined, disabled: false },
  { name: "Hover", dataState: "hover", disabled: false },
  { name: "Pressed", dataState: "pressed", disabled: false },
  { name: "Focus", dataState: "focus", disabled: false },
  { name: "Disabled", dataState: undefined, disabled: true },
] as const;

type ShowcaseButtonProps = ComponentProps<typeof Button> & {
  canvas?: boolean;
};

function ShowcaseButton({
  className,
  variant = "primary",
  size,
  canvas,
  ...props
}: ShowcaseButtonProps) {
  const filled = variant === "primary" || variant === "secondary";
  const resolved = resolveButtonSize(variant, size);
  const useCanvas = canvas ?? (filled && resolved === "lg");

  return (
    <Button
      {...props}
      variant={variant}
      size={size}
      className={[useCanvas ? "ds-button--canvas" : "", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export default function ButtonPage() {
  return (
    <DocPage
      title="Button"
      description="A single action control with three emphasis levels. Variants, sizes, and states follow the Figma Button masters."
      status="Showcase component"
    >
      <DocSection title="Overview">
        <p>
          Button is the action control for the system. One component covers
          filled, outlined, and text emphasis so hierarchy stays consistent
          across screens.
        </p>
      </DocSection>

      <DocSection title="When to use">
        <ul className="flex list-disc flex-col gap-md pl-2xl">
          <li>The user triggers an action: continue, save, apply, cancel.</li>
          <li>Primary for the main action on a view.</li>
          <li>Secondary for a supporting choice next to primary.</li>
          <li>Tertiary for a low-emphasis text action.</li>
        </ul>
      </DocSection>

      <DocSection title="When not to use">
        <ul className="flex list-disc flex-col gap-md pl-2xl">
          <li>
            Do not use a button for navigation between pages. Use a link
            (<code>{`<a href>`}</code>).
          </li>
          <li>
            Do not place two primary buttons in the same view. They compete
            for the same action.
          </li>
        </ul>
      </DocSection>

      <DocSection title="Playground">
        <p>
          The live control is the implemented component. Filled Lg uses the
          335px canvas width from the primary master. Sm hugs content with a
          136px minimum.
        </p>
        <ButtonPlayground />
      </DocSection>

      <DocSection title="Variants">
        <p>
          Primary is filled, secondary is outlined, tertiary is text. Light and
          dark resolve the same token names to different primitives.
        </p>
        <ThemePreview>
          <div className="flex flex-col items-start gap-2xl">
            <ShowcaseButton variant="primary">Continue</ShowcaseButton>
            <ShowcaseButton variant="secondary">Cancel</ShowcaseButton>
            <ShowcaseButton variant="tertiary">Learn more</ShowcaseButton>
          </div>
        </ThemePreview>
      </DocSection>

      <DocSection title="Sizes">
        <p>
          Primary and secondary use Sm and Lg. Tertiary adds Md. Passing{" "}
          <code>md</code> on a filled button maps to Sm — that size is not in
          the filled masters.
        </p>
        <Preview label="Primary" stack>
          <ShowcaseButton variant="primary" size="sm">
            Continue
          </ShowcaseButton>
          <ShowcaseButton variant="primary" size="lg">
            Continue
          </ShowcaseButton>
        </Preview>
        <Preview label="Secondary" stack>
          <ShowcaseButton variant="secondary" size="sm">
            Cancel
          </ShowcaseButton>
          <ShowcaseButton variant="secondary" size="lg">
            Cancel
          </ShowcaseButton>
        </Preview>
        <Preview label="Tertiary">
          <ShowcaseButton variant="tertiary" size="sm">
            Learn more
          </ShowcaseButton>
          <ShowcaseButton variant="tertiary" size="md">
            Learn more
          </ShowcaseButton>
          <ShowcaseButton variant="tertiary" size="lg">
            Learn more
          </ShowcaseButton>
        </Preview>
      </DocSection>

      <DocSection title="Icon slots">
        <p>
          Icons are optional slots. Show a leading icon or a trailing icon —
          not both on the same control.
        </p>
        <Preview label="Leading icon">
          <ShowcaseButton variant="primary" size="sm" canvas={false} leadingIcon={<PlusIcon />}>
            Continue
          </ShowcaseButton>
          <ShowcaseButton variant="secondary" size="sm" canvas={false} leadingIcon={<PlusIcon />}>
            Cancel
          </ShowcaseButton>
          <ShowcaseButton variant="tertiary" leadingIcon={<PlusIcon />}>
            Learn more
          </ShowcaseButton>
        </Preview>
        <Preview label="Trailing icon">
          <ShowcaseButton variant="primary" size="sm" canvas={false} trailingIcon={<ChevronIcon />}>
            Continue
          </ShowcaseButton>
          <ShowcaseButton variant="secondary" size="sm" canvas={false} trailingIcon={<ChevronIcon />}>
            Cancel
          </ShowcaseButton>
          <ShowcaseButton variant="tertiary" trailingIcon={<ChevronIcon />}>
            Learn more
          </ShowcaseButton>
        </Preview>
      </DocSection>

      <DocSection title="States">
        <p>
          Hover and pressed share fills on primary and secondary. Tertiary
          hover and pressed match default in Figma. Focus is a keyboard ring
          and is not a Figma variant.
        </p>
        <div className="flex flex-col gap-6xl">
          <StateGroup variant="primary" label="Continue" />
          <StateGroup variant="secondary" label="Cancel" />
          <StateGroup variant="tertiary" label="Learn more" />
        </div>
      </DocSection>

      <DocSection title="Anatomy">
        <div className="flex flex-col gap-6xl">
          <Anatomy
            label="Filled button"
            frame="pill"
            parts={[
              {
                title: "Container",
                description:
                  "Pill chassis. Primary fills; secondary uses a 2px inside stroke. Lg canvas width is 335px.",
              },
              {
                title: "Leading icon",
                description: "Optional. Size follows the button size token.",
              },
              {
                title: "Label",
                description: "Averta Semibold. Names the action.",
              },
            ]}
          >
            <ShowcaseButton
              variant="primary"
              leadingIcon={
                <AnatomyTarget n={2}>
                  <PlusIcon />
                </AnatomyTarget>
              }
            >
              <AnatomyTarget n={3}>Continue</AnatomyTarget>
            </ShowcaseButton>
          </Anatomy>
          <Anatomy
            label="Text button"
            parts={[
              {
                title: "Container",
                description: "No fill, radius, or border. Hugs the content.",
              },
              {
                title: "Trailing icon",
                description: "Optional leading or trailing slot.",
              },
              {
                title: "Label",
                description: "Uses the link color token.",
              },
            ]}
          >
            <ShowcaseButton
              variant="tertiary"
              trailingIcon={
                <AnatomyTarget n={2}>
                  <ChevronIcon />
                </AnatomyTarget>
              }
            >
              <AnatomyTarget n={3}>Learn more</AnatomyTarget>
            </ShowcaseButton>
          </Anatomy>
        </div>
      </DocSection>

      <DocSection title="Usage">
        <ul className="flex list-disc flex-col gap-md pl-2xl">
          <li>One primary action per view. Pair it with secondary when needed.</li>
          <li>Label the action the user takes, not the component: Continue, not Primary.</li>
          <li>Keep tertiary for low-emphasis actions that should read as text.</li>
        </ul>
        <div className="grid gap-2xl sm:grid-cols-2">
          <DoDont
            kind="do"
            title="One primary action"
            example={
              <div className="flex flex-col items-start gap-2xl">
                <ShowcaseButton variant="primary" size="sm" canvas={false}>
                  Continue
                </ShowcaseButton>
                <ShowcaseButton variant="secondary" size="sm" canvas={false}>
                  Cancel
                </ShowcaseButton>
              </div>
            }
          >
            Pair one primary with a secondary when there is a supporting choice.
          </DoDont>
          <DoDont
            kind="dont"
            title="Two primaries"
            example={
              <div className="flex flex-col items-start gap-2xl">
                <ShowcaseButton variant="primary" size="sm" canvas={false}>
                  Continue
                </ShowcaseButton>
                <ShowcaseButton variant="primary" size="sm" canvas={false}>
                  Cancel
                </ShowcaseButton>
              </div>
            }
          >
            Two filled buttons compete. Cancel should not use primary.
          </DoDont>
          <DoDont
            kind="do"
            title="Tertiary for a low-emphasis action"
            example={<ShowcaseButton variant="tertiary" size="sm">Learn more</ShowcaseButton>}
          >
            Use tertiary when the action should read as text, not a chassis.
          </DoDont>
          <DoDont
            kind="dont"
            title="Primary for a text action"
            example={
              <ShowcaseButton variant="primary" size="sm" canvas={false}>
                Learn more
              </ShowcaseButton>
            }
          >
            Do not use the filled chassis for a low-emphasis action.
          </DoDont>
        </div>
      </DocSection>

      <DocSection title="Tokens">
        <p>
          Components consume semantic aliases. See{" "}
          <Link href="/foundations/color">Color</Link> and{" "}
          <Link href="/foundations/typography">Typography</Link> for the foundation
          tokens those aliases point at.
        </p>
        <PlatformTokenSwitch
          colorRows={tokenColors.map(
            (token): PlatformTokenRow => ({
              figma: token.figma,
              refs: {
                web: platformColorRef(token.figma, token.cssVar, "web"),
                ios: platformColorRef(token.figma, token.cssVar, "ios"),
                android: platformColorRef(token.figma, token.cssVar, "android"),
              },
            }),
          )}
          valueRows={[
            ...radiusTokens,
            ...opacityTokens,
            ...sizeTokens,
            ...strokeWidthTokens,
          ].map(
            (token): PlatformTokenRow => ({
              figma: token.figma,
              refs: {
                web: platformValueRef(token.figma, token.cssVar, "web"),
                ios: platformValueRef(token.figma, token.cssVar, "ios"),
                android: platformValueRef(token.figma, token.cssVar, "android"),
              },
            }),
          )}
        />
        <p className="text-[var(--color-text-secondary)]" style={{ fontSize: "var(--font-size-sm)" }}>
          Unbound Figma values kept on the component: filled height 55px on
          Lg, filled label 15px on Lg. Showcase width for filled Lg is 335px.
        </p>
      </DocSection>

      <DocSection title="Interaction and motion">
        <ul className="flex list-disc flex-col gap-md pl-2xl">
          <li>Hover and pressed use the same hover fill on primary and secondary.</li>
          <li>Tertiary hover and pressed match default.</li>
          <li>
            Color, opacity, and the focus ring transition in 150ms. Figma
            defines no motion; this is web state feedback.
          </li>
          <li>
            <code>prefers-reduced-motion</code> removes those transitions.
          </li>
        </ul>
      </DocSection>

      <DocSection title="Accessibility">
        <ul className="flex list-disc flex-col gap-md pl-2xl">
          <li>Rendered as a native <code>button</code>.</li>
          <li>
            Visible <code>:focus-visible</code> ring using the link token.
            Focus is not a Figma variant.
          </li>
          <li>Disabled uses the native disabled attribute.</li>
          <li>
            Filled disabled uses 40% opacity, matching Figma. That is not a
            contrast guarantee.
          </li>
          <li>
            If you pass only an icon, provide <code>aria-label</code>. Icon-only
            is not a Figma variant.
          </li>
        </ul>
        <Preview label="Icon-only needs an accessible name">
          <ShowcaseButton
            variant="primary"
            size="sm"
            canvas={false}
            aria-label="Add"
            leadingIcon={<PlusIcon />}
          />
        </Preview>
      </DocSection>

      <DocSection title="API">
        <PropTable
          rows={[
            {
              name: "variant",
              type: '"primary" | "secondary" | "tertiary"',
              defaultValue: '"primary"',
              description: "Emphasis level.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              defaultValue: 'filled "lg", tertiary "sm"',
              description: "Filled md maps to sm.",
            },
            {
              name: "leadingIcon",
              type: "ReactNode",
              defaultValue: "—",
              description: "Optional icon before the label.",
            },
            {
              name: "trailingIcon",
              type: "ReactNode",
              defaultValue: "—",
              description: "Optional icon after the label.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Native disabled state.",
            },
            {
              name: "children",
              type: "ReactNode",
              defaultValue: "—",
              description: "Visible label. Required unless aria-label is set.",
            },
          ]}
        />
      </DocSection>

      <DocSection title="Code">
        <CodeBlock code={example} />
      </DocSection>

      <DocSection title="Related">
        <ul className="flex list-disc flex-col gap-md pl-2xl">
          <li>
            <Link href="/foundations/color">Color</Link>
          </li>
          <li>
            <Link href="/foundations/typography">Typography</Link>
          </li>
          <li>
            <Link href="/about/accessibility">Accessibility</Link>
          </li>
          <li>
            <Link href="/about/architecture">Architecture</Link>
          </li>
        </ul>
      </DocSection>

      <DocPager pathname="/components/button" />
    </DocPage>
  );
}

function StateGroup({
  variant,
  label,
}: {
  variant: ButtonVariant;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-xl">
      <h3 className="type-h3 capitalize">{variant}</h3>
      <div className="flex flex-wrap gap-x-4xl gap-y-2xl">
        {states.map((state) => (
          <div key={state.name} className="flex min-w-[8rem] flex-col items-start gap-md">
            <p
              className="font-[var(--font-weight-semi-bold)] text-[var(--color-text-secondary)]"
              style={{ fontSize: "var(--font-size-xs)", letterSpacing: "0.06em" }}
            >
              {state.name}
            </p>
            <ShowcaseButton
              variant={variant}
              size="sm"
              canvas={false}
              disabled={state.disabled}
              data-state={state.dataState}
              tabIndex={state.name === "Default" ? undefined : -1}
              className={state.name === "Default" ? undefined : "pointer-events-none"}
            >
              {label}
            </ShowcaseButton>
          </div>
        ))}
      </div>
    </div>
  );
}
