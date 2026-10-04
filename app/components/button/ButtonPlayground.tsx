"use client";

import { useId, useState } from "react";
import { ChevronIcon, PlusIcon } from "@/components/docs/DemoIcons";
import {
  Playground,
  PlaygroundField,
  playgroundFieldClassName,
} from "@/components/docs/Playground";
import {
  Button,
  resolveButtonSize,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/Button";

function canvasClass(variant: ButtonVariant, size: ButtonSize): string {
  const filled = variant === "primary" || variant === "secondary";
  return filled && resolveButtonSize(variant, size) === "lg" ? "ds-button--canvas" : "";
}

export function ButtonPlayground() {
  const ids = {
    variant: useId(),
    size: useId(),
    icon: useId(),
    label: useId(),
    disabled: useId(),
  };
  const [variant, setVariant] = useState<ButtonVariant>("primary");
  const [size, setSize] = useState<ButtonSize>("lg");
  const [icon, setIcon] = useState<"none" | "leading" | "trailing">("none");
  const [label, setLabel] = useState("Continue");
  const [disabled, setDisabled] = useState(false);
  const filledMd = (variant === "primary" || variant === "secondary") && size === "md";
  const fieldClass = playgroundFieldClassName();

  const props: string[] = [];
  if (variant !== "primary") {
    props.push(`variant="${variant}"`);
  }
  if (
    !(variant === "tertiary" && size === "sm") &&
    !((variant === "primary" || variant === "secondary") && size === "lg")
  ) {
    props.push(`size="${size}"`);
  }
  if (icon === "leading") {
    props.push("leadingIcon={<PlusIcon />}");
  }
  if (icon === "trailing") {
    props.push("trailingIcon={<ChevronIcon />}");
  }
  if (disabled) {
    props.push("disabled");
  }

  const propString = props.length ? ` ${props.join(" ")}` : "";
  const code = `<Button${propString}>\n  ${label}\n</Button>`;

  return (
    <Playground
      preview={
        <Button
          variant={variant}
          size={size}
          disabled={disabled}
          className={canvasClass(variant, size)}
          leadingIcon={icon === "leading" ? <PlusIcon /> : undefined}
          trailingIcon={icon === "trailing" ? <ChevronIcon /> : undefined}
          aria-label={label.trim() ? undefined : "Button"}
        >
          {label.trim() ? label : undefined}
        </Button>
      }
      controls={
        <>
          <PlaygroundField label="Variant" htmlFor={ids.variant}>
            <select
              id={ids.variant}
              className={fieldClass}
              style={{ fontSize: "var(--font-size-sm)" }}
              value={variant}
              onChange={(event) => setVariant(event.target.value as ButtonVariant)}
            >
              <option value="primary">primary</option>
              <option value="secondary">secondary</option>
              <option value="tertiary">tertiary</option>
            </select>
          </PlaygroundField>
          <PlaygroundField
            label="Size"
            htmlFor={ids.size}
            hint={filledMd ? "Filled md maps to sm. The filled masters only have Sm and Lg." : undefined}
          >
            <select
              id={ids.size}
              className={fieldClass}
              style={{ fontSize: "var(--font-size-sm)" }}
              value={size}
              onChange={(event) => setSize(event.target.value as ButtonSize)}
            >
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
            </select>
          </PlaygroundField>
          <PlaygroundField label="Icon" htmlFor={ids.icon}>
            <select
              id={ids.icon}
              className={fieldClass}
              style={{ fontSize: "var(--font-size-sm)" }}
              value={icon}
              onChange={(event) =>
                setIcon(event.target.value as "none" | "leading" | "trailing")
              }
            >
              <option value="none">None</option>
              <option value="leading">Leading</option>
              <option value="trailing">Trailing</option>
            </select>
          </PlaygroundField>
          <PlaygroundField label="Label" htmlFor={ids.label}>
            <input
              id={ids.label}
              className={fieldClass}
              style={{ fontSize: "var(--font-size-sm)" }}
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
          </PlaygroundField>
          <PlaygroundField label="Disabled" htmlFor={ids.disabled}>
            <input
              id={ids.disabled}
              type="checkbox"
              checked={disabled}
              onChange={(event) => setDisabled(event.target.checked)}
              className="size-4xl accent-[var(--color-link-primary)]"
            />
          </PlaygroundField>
        </>
      }
      code={code}
    />
  );
}
