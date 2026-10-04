import Link from "next/link";
import { getAdjacentNav } from "@/lib/navigation";

type DocPagerProps = {
  pathname: string;
};

export function DocPager({ pathname }: DocPagerProps) {
  const { prev, next } = getAdjacentNav(pathname);

  if (!prev && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Adjacent pages"
      className="mt-8xl flex flex-col gap-2xl border-t border-[var(--color-border-subtle-02)] pt-6xl sm:flex-row sm:justify-between"
    >
      {prev ? (
        <Link href={prev.href} className="flex flex-col gap-xs">
          <span
            className="text-[var(--color-text-secondary)]"
            style={{ fontSize: "var(--font-size-xs)", letterSpacing: "0.06em" }}
          >
            Previous
          </span>
          <span className="font-[var(--font-weight-semi-bold)]">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className="flex flex-col gap-xs sm:text-right">
          <span
            className="text-[var(--color-text-secondary)]"
            style={{ fontSize: "var(--font-size-xs)", letterSpacing: "0.06em" }}
          >
            Next
          </span>
          <span className="font-[var(--font-weight-semi-bold)]">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
