import type { ReactNode } from "react";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";
import { SkipLink } from "./SkipLink";

type DocsShellProps = {
  children: ReactNode;
};

export function DocsShell({ children }: DocsShellProps) {
  return (
    <div className="min-h-full bg-[var(--color-page-bg-primary)] text-[var(--color-text-primary)]">
      <SkipLink />
      <MobileNav />
      <div className="lg:flex">
        <Sidebar />
        <main
          id="main-content"
          tabIndex={-1}
          className="min-w-0 flex-1 px-4xl py-7xl outline-none md:px-8xl lg:px-9xl lg:py-9xl"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
