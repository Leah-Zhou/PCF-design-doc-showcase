import type { ReactNode } from "react";

type GuidanceProps = {
  kind: "do" | "dont";
  title: string;
  children: ReactNode;
  example: ReactNode;
};

export function DoDont({ kind, title, children, example }: GuidanceProps) {
  const isDo = kind === "do";

  return (
    <figure className="flex flex-col gap-xl rounded-[var(--radius-lg)] border border-[var(--color-border-subtle-02)] p-4xl">
      <figcaption
        className="font-[var(--font-weight-semi-bold)]"
        style={{
          color: isDo ? "var(--color-decor-success)" : "var(--color-decor-error)",
          fontSize: "var(--font-size-xs)",
          letterSpacing: "0.06em",
        }}
      >
        {isDo ? "Do" : "Don’t"}
      </figcaption>
      <div className="overflow-x-auto">{example}</div>
      <div className="flex flex-col gap-xs">
        <p className="font-[var(--font-weight-semi-bold)]">{title}</p>
        <p className="text-[var(--color-text-secondary)]" style={{ fontSize: "var(--font-size-sm)" }}>
          {children}
        </p>
      </div>
    </figure>
  );
}
