import type { ReactNode } from "react";
import { CodeBlock } from "@/components/docs/CodeBlock";

type PlaygroundProps = {
  preview: ReactNode;
  controls: ReactNode;
  code?: string;
};

export function Playground({ preview, controls, code }: PlaygroundProps) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-subtle-02)]">
      <div className="overflow-x-auto bg-[var(--color-page-bg-primary)] p-4xl">
        {preview}
      </div>
      <div className="grid gap-2xl border-t border-[var(--color-border-subtle-02)] bg-[var(--color-surface-neutral-02)] p-4xl sm:grid-cols-2">
        {controls}
      </div>
      {code ? <CodeBlock code={code} embedded /> : null}
    </div>
  );
}

type PlaygroundFieldProps = {
  label: string;
  htmlFor: string;
  children: ReactNode;
  hint?: string;
};

export function PlaygroundField({
  label,
  htmlFor,
  children,
  hint,
}: PlaygroundFieldProps) {
  return (
    <div className="flex flex-col gap-xs">
      <label
        htmlFor={htmlFor}
        className="font-[var(--font-weight-semi-bold)] text-[var(--color-text-secondary)]"
        style={{ fontSize: "var(--font-size-xs)", letterSpacing: "0.06em" }}
      >
        {label}
      </label>
      {children}
      {hint ? (
        <p className="text-[var(--color-text-secondary)]" style={{ fontSize: "var(--font-size-xs)" }}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const fieldClassName =
  "w-full appearance-none rounded-[var(--radius-sm)] border border-[var(--color-border-subtle-02)] bg-[var(--color-page-bg-primary)] px-xl py-xl text-[var(--color-text-primary)]";

export function playgroundFieldClassName(): string {
  return fieldClassName;
}
