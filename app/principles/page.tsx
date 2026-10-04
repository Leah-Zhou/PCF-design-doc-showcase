import type { Metadata } from "next";
import { DocPage } from "@/components/docs/DocPage";

export const metadata: Metadata = {
  title: "Principles",
};

const principles = [
  "Consistency without rigidity",
  "Accessible by default",
  "Clear before clever",
  "Reusable before one-off",
  "Document decisions, not just specifications",
];

export default function PrinciplesPage() {
  return (
    <DocPage
      title="Principles"
      description="The decisions that keep this system consistent without becoming rigid."
    >
      <ul className="flex flex-col gap-xl">
        {principles.map((principle) => (
          <li key={principle} className="border-b border-[var(--color-border-subtle-02)] pb-xl last:border-b-0 last:pb-0">
            {principle}
          </li>
        ))}
      </ul>
    </DocPage>
  );
}
