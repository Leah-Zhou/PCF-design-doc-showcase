"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePath, visibleNavigation } from "@/lib/navigation";

type DocsNavProps = {
  id?: string;
  onNavigate?: () => void;
};

export function DocsNav({ id, onNavigate }: DocsNavProps) {
  const pathname = usePathname();

  return (
    <nav id={id} aria-label="Documentation">
      <ul className="flex flex-col gap-6xl">
        {visibleNavigation().map((group) => {
          const headingId = `${id ?? "docs-nav"}-${group.title.toLowerCase().replace(/\s+/g, "-")}`;

          return (
            <li key={group.title}>
              <p
                id={headingId}
                className="type-caption-sm mb-md font-[var(--font-weight-semi-bold)] tracking-[0.06em] text-[var(--color-text-secondary)] uppercase"
              >
                {group.title}
              </p>
              <ul aria-labelledby={headingId} className="flex flex-col">
                {group.items.map((item) => {
                  const active = isActivePath(pathname, item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={onNavigate}
                        className={`block min-h-11 border-l py-md pl-xl no-underline ${
                          active
                            ? "border-[var(--color-link-primary)] font-[var(--font-weight-semi-bold)] text-[var(--color-text-primary)]"
                            : "border-transparent font-[var(--font-weight-regular)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                        }`}
                        style={{
                          fontSize: "var(--font-size-sm)",
                          lineHeight: "var(--line-height-2xl)",
                        }}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
