"use client";

import { useState } from "react";

type CodeBlockProps = {
  code: string;
  embedded?: boolean;
};

export function CodeBlock({ code, embedded = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div
      className={[
        "relative",
        embedded
          ? "border-t border-[var(--color-border-subtle-02)]"
          : "overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-subtle-02)]",
      ].join(" ")}
    >
      <pre className="overflow-x-auto bg-[var(--color-surface-neutral-02)] p-4xl pr-12xl">
        <code
          className="font-mono text-[var(--color-text-primary)]"
          style={{ fontSize: "var(--font-size-xs)", lineHeight: "var(--line-height-2xl)" }}
        >
          {code}
        </code>
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute top-xl right-xl cursor-pointer appearance-none rounded-[var(--radius-sm)] border border-[var(--color-border-subtle-02)] bg-[var(--color-page-bg-primary)] px-xl py-xs text-[var(--color-text-primary)]"
        style={{ fontSize: "var(--font-size-xs)" }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
