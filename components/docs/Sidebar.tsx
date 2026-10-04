import Link from "next/link";
import { siteName } from "@/lib/navigation";
import { DocsNav } from "./DocsNav";

export function Sidebar() {
  return (
    <aside className="hidden h-screen sticky top-0 border-r border-[var(--color-border-subtle-02)] bg-[var(--color-page-bg-primary)] lg:flex lg:w-[16.5rem] lg:shrink-0 lg:flex-col">
      <div className="border-b border-[var(--color-border-subtle-02)] px-6xl py-4xl">
        <Link
          href="/"
          className="font-[var(--font-weight-semi-bold)] tracking-tight text-[var(--color-text-primary)] no-underline"
          style={{ fontSize: "var(--font-size-sm)" }}
        >
          {siteName}
        </Link>
        <p className="type-caption-sm mt-xs text-[var(--color-text-secondary)]">
          Documentation
        </p>
      </div>
      <div className="overflow-y-auto px-6xl py-4xl">
        <DocsNav id="sidebar-nav" />
      </div>
    </aside>
  );
}
