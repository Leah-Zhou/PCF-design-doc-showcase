"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteName } from "@/lib/navigation";
import { DocsNav } from "./DocsNav";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const navId = "mobile-docs-nav";

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) {
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  function close() {
    setOpen(false);
    queueMicrotask(() => buttonRef.current?.focus());
  }

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border-subtle-02)] bg-[var(--color-page-bg-primary)] lg:hidden">
      <div className="flex min-h-11 items-center justify-between gap-2xl px-2xl py-xl">
        <Link
          href="/"
          className="font-[var(--font-weight-semi-bold)] tracking-tight text-[var(--color-text-primary)] no-underline"
          style={{ fontSize: "var(--font-size-sm)" }}
        >
          {siteName}
        </Link>
        <button
          ref={buttonRef}
          type="button"
          className="min-h-11 min-w-11 rounded-[var(--radius-sm)] px-xl font-[var(--font-weight-semi-bold)] text-[var(--color-text-primary)]"
          style={{ fontSize: "var(--font-size-sm)" }}
          aria-expanded={open}
          aria-controls={navId}
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>

      {open ? (
        <dialog
          ref={dialogRef}
          aria-labelledby={titleId}
          className="mobile-nav-dialog"
          onClose={close}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              close();
            }
          }}
        >
          <div className="motion-panel flex h-full w-[min(18.5rem,100%)] flex-col border-r border-[var(--color-border-subtle-02)] bg-[var(--color-page-bg-primary)] motion-safe:transition-transform motion-safe:duration-200">
            <div className="flex min-h-11 items-center justify-between gap-2xl border-b border-[var(--color-border-subtle-02)] px-2xl py-xl">
              <p
                id={titleId}
                className="font-[var(--font-weight-semi-bold)] tracking-tight"
                style={{ fontSize: "var(--font-size-sm)" }}
              >
                {siteName}
              </p>
              <button
                type="button"
                className="min-h-11 min-w-11 rounded-[var(--radius-sm)] px-xl font-[var(--font-weight-semi-bold)] text-[var(--color-text-primary)]"
                style={{ fontSize: "var(--font-size-sm)" }}
                onClick={close}
              >
                Close
              </button>
            </div>
            <div className="overflow-y-auto px-2xl py-4xl">
              <DocsNav id={navId} onNavigate={close} />
            </div>
          </div>
        </dialog>
      ) : null}
    </header>
  );
}
