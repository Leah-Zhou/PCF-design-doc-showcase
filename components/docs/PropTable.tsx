type PropRow = {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
};

type PropTableProps = {
  rows: PropRow[];
};

export function PropTable({ rows }: PropTableProps) {
  return (
    <div className="-mx-2xl overflow-x-auto sm:mx-0">
      <table className="w-full min-w-[32rem] border-collapse text-left">
        <thead>
          <tr className="border-b border-[var(--color-border-subtle-02)]">
            {["Property", "Type", "Default", "Description"].map((header) => (
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
          {rows.map((row) => (
            <tr
              key={row.name}
              className="border-b border-[var(--color-border-subtle-01)] align-top last:border-b-0"
            >
              <td className="py-xl pr-2xl">
                <code
                  className="font-mono"
                  style={{ fontSize: "var(--font-size-xs)" }}
                >
                  {row.name}
                </code>
              </td>
              <td className="py-xl pr-2xl">
                <code
                  className="font-mono text-[var(--color-text-secondary)]"
                  style={{ fontSize: "var(--font-size-xs)" }}
                >
                  {row.type}
                </code>
              </td>
              <td className="py-xl pr-2xl">
                <code
                  className="font-mono text-[var(--color-text-secondary)]"
                  style={{ fontSize: "var(--font-size-xs)" }}
                >
                  {row.defaultValue}
                </code>
              </td>
              <td
                className="py-xl pr-2xl"
                style={{
                  fontSize: "var(--font-size-sm)",
                  lineHeight: "var(--line-height-2xl)",
                }}
              >
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
