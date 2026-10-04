"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { SegmentedControl } from "@/components/docs/SegmentedControl";

type ThemePreviewProps = {
  children: ReactNode;
};

export function ThemePreview({ children }: ThemePreviewProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className="flex flex-col gap-xl">
      <SegmentedControl
        label="Theme"
        value={theme}
        onChange={setTheme}
        options={[
          { id: "light", label: "Light" },
          { id: "dark", label: "Dark" },
        ]}
      />
      <div
        data-theme={theme}
        className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border-subtle-02)] bg-[var(--color-page-bg-primary)] p-4xl"
      >
        {children}
      </div>
    </div>
  );
}
