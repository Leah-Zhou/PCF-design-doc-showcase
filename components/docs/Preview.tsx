import type { ReactNode } from "react";

type PreviewProps = {
  children: ReactNode;
  label?: string;
  stack?: boolean;
};

export function Preview({ children, label, stack = false }: PreviewProps) {
  return (
    <figure className="flex flex-col gap-md">
      {label ? (
        <figcaption
          className="font-[var(--font-weight-semi-bold)] text-[var(--color-text-secondary)]"
          style={{ fontSize: "var(--font-size-xs)", letterSpacing: "0.06em" }}
        >
          {label}
        </figcaption>
      ) : null}
      <div
        className={[
          "overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border-subtle-02)] bg-[var(--color-page-bg-primary)] p-4xl",
          stack
            ? "flex flex-col items-start gap-2xl"
            : "flex flex-wrap items-center gap-2xl",
        ].join(" ")}
      >
        {children}
      </div>
    </figure>
  );
}
