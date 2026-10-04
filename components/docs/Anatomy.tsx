import type { ReactNode } from "react";

export type AnatomyPart = {
  title: string;
  description: string;
};

type AnatomyProps = {
  label: string;
  parts: AnatomyPart[];
  children: ReactNode;
  frame?: "pill" | "rect";
};

export function Anatomy({
  label,
  parts,
  children,
  frame = "rect",
}: AnatomyProps) {
  return (
    <figure className="flex flex-col gap-2xl rounded-[var(--radius-lg)] border border-[var(--color-border-subtle-02)] p-4xl">
      <figcaption
        className="font-[var(--font-weight-semi-bold)] text-[var(--color-text-secondary)]"
        style={{ fontSize: "var(--font-size-xs)", letterSpacing: "0.06em" }}
      >
        {label}
      </figcaption>
      <div className="overflow-x-auto pt-5xl">
        <div className="relative inline-flex p-3xl">
          <span
            aria-hidden="true"
            className={[
              "pointer-events-none absolute inset-0 border border-dashed border-[var(--color-border-interactive-default)]",
              frame === "pill"
                ? "rounded-[var(--radius-pill)]"
                : "rounded-[var(--radius-md)]",
            ].join(" ")}
          />
          <AnatomyMark n={1} className="absolute left-0 top-0" />
          {children}
        </div>
      </div>
      <ol className="flex flex-col gap-xl">
        {parts.map((part, index) => (
          <li key={part.title} className="flex gap-xl">
            <AnatomyMark n={index + 1} />
            <div>
              <p className="font-[var(--font-weight-semi-bold)]">{part.title}</p>
              <p
                className="text-[var(--color-text-secondary)]"
                style={{ fontSize: "var(--font-size-sm)" }}
              >
                {part.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function AnatomyTarget({
  n,
  children,
}: {
  n: number;
  children: ReactNode;
}) {
  return (
    <span className="relative inline-flex">
      <AnatomyMark
        n={n}
        className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[calc(100%+var(--space-xs))]"
      />
      {children}
    </span>
  );
}

export function AnatomyMark({
  n,
  className,
}: {
  n: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={[
        "flex size-4xl shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border-interactive-default)] bg-[var(--color-page-bg-primary)] font-[var(--font-weight-semi-bold)] text-[var(--color-text-primary)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ fontSize: "var(--font-size-xs)" }}
    >
      {n}
    </span>
  );
}
