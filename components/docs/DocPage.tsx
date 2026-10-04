import type { ReactNode } from "react";

type DocPageProps = {
  title: string;
  description: string;
  status?: string;
  children?: ReactNode;
  className?: string;
};

export function DocPage({
  title,
  description,
  status,
  children,
  className,
}: DocPageProps) {
  return (
    <article className={["mx-auto w-full max-w-[46rem]", className].filter(Boolean).join(" ")}>
      <header className="mb-8xl border-b border-[var(--color-border-subtle-02)] pb-6xl">
        {status ? (
          <p
            className="mb-xl font-[var(--font-weight-semi-bold)] text-[var(--color-text-secondary)]"
            style={{ fontSize: "var(--font-size-xs)", letterSpacing: "0.06em" }}
          >
            {status}
          </p>
        ) : null}
        <h1 className="type-h1 text-[var(--color-text-primary)]">{title}</h1>
        <p className="type-body-lg mt-xl max-w-[40rem] text-[var(--color-text-secondary)]">
          {description}
        </p>
      </header>
      {children ? (
        <div className="flex flex-col gap-7xl text-[var(--color-text-primary)] [&_a]:text-[var(--color-link-primary)] [&_a]:underline [&_a]:underline-offset-2">
          {children}
        </div>
      ) : null}
    </article>
  );
}

type DocSectionProps = {
  title: string;
  children: ReactNode;
};

export function DocSection({ title, children }: DocSectionProps) {
  return (
    <section className="flex flex-col gap-xl">
      <h2 className="type-h2">{title}</h2>
      <div className="flex flex-col gap-xl type-body-lg">{children}</div>
    </section>
  );
}
