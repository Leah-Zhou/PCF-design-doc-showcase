import type { Metadata } from "next";
import { DocPage, DocSection } from "@/components/docs/DocPage";

export const metadata: Metadata = {
  title: "Introduction",
};

export default function HomePage() {
  return (
    <DocPage
      title="Design System Showcase"
      description="A small system built for consistency, accessibility, and scale."
    >
      <p>
        This showcase demonstrates how I think about scalable UI systems—from
        foundational decisions and reusable components to implementation and
        documentation, not just individual screens.
      </p>
      <blockquote className="border-l border-[var(--color-border-subtle-02)] pl-2xl text-[var(--color-text-secondary)]">
        This is a public-safe representation of my design-system practice.
        Examples are simplified and do not expose proprietary company
        information.
      </blockquote>
      <DocSection title="What this system demonstrates">
        <p>
          <strong className="font-[var(--font-weight-semi-bold)]">Foundations.</strong> A small set of
          reusable decisions for color and typography.
        </p>
        <p>
          <strong className="font-[var(--font-weight-semi-bold)]">Components.</strong> Button, with
          clear states, behavior, accessibility considerations, and
          implementation guidance.
        </p>
        <p>
          <strong className="font-[var(--font-weight-semi-bold)]">From design to code.</strong> A
          token-driven workflow that connects design decisions to reusable
          implementation.
        </p>
      </DocSection>
    </DocPage>
  );
}
