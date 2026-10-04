import type { ReactNode } from "react";

type TokenTableProps = {
  headers: string[];
  rows: ReactNode[][];
};

export function TokenTable({ headers, rows }: TokenTableProps) {
  return (
    <div className="-mx-2xl overflow-x-auto sm:mx-0">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[var(--color-border-subtle-02)]">
            {headers.map((header) => (
              <th
                key={header}
                className="py-md pr-2xl font-[var(--font-weight-semi-bold)] text-[var(--color-text-secondary)]"
                style={{
                  fontSize: "var(--font-size-xs)",
                  lineHeight: "var(--line-height-3xl)",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className="border-b border-[var(--color-border-subtle-01)] align-middle"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="py-xl pr-2xl"
                  style={{
                    fontSize: "var(--font-size-sm)",
                    lineHeight: "var(--line-height-2xl)",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TokenName({ children }: { children: string }) {
  return (
    <code
      className="font-mono text-[var(--color-text-primary)]"
      style={{ fontSize: "var(--font-size-xs)" }}
    >
      {children}
    </code>
  );
}

export function Swatch({
  cssVar,
  hex,
}: {
  cssVar: string;
  hex: string;
}) {
  return (
    <span className="inline-flex items-center gap-md">
      <span
        aria-hidden="true"
        className="size-7xl shrink-0 rounded-[var(--radius-sm)] border border-[var(--color-border-subtle-02)]"
        style={{ background: cssVar.startsWith("--") ? `var(${cssVar})` : cssVar }}
      />
      <span className="font-mono" style={{ fontSize: "var(--font-size-xs)" }}>
        {hex}
      </span>
    </span>
  );
}
