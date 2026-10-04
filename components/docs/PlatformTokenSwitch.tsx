"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/docs/SegmentedControl";
import { TokenName, TokenTable } from "@/components/docs/TokenTable";
import {
  tokenPlatforms,
  type TokenPlatform,
} from "@/lib/token-platforms";

export type PlatformTokenRow = {
  figma: string;
  refs: Record<TokenPlatform, string>;
};

type PlatformTokenSwitchProps = {
  colorRows: PlatformTokenRow[];
  valueRows: PlatformTokenRow[];
};

export function PlatformTokenSwitch({
  colorRows,
  valueRows,
}: PlatformTokenSwitchProps) {
  const [platform, setPlatform] = useState<TokenPlatform>("web");
  const platformLabel =
    tokenPlatforms.find((item) => item.id === platform)?.label ?? "Reference";

  return (
    <div className="flex flex-col gap-xl">
      <SegmentedControl
        label="Platform reference"
        value={platform}
        onChange={setPlatform}
        options={tokenPlatforms}
      />
      <p className="text-[var(--color-text-secondary)]" style={{ fontSize: "var(--font-size-sm)" }}>
        Web names are the CSS variables used in this repo. iOS and Android
        strings are a naming convention for this showcase, not verified native
        exports.
      </p>
      <TokenTable
        headers={["Figma", platformLabel]}
        rows={colorRows.map((row) => [
          <TokenName key={`${row.figma}-name`}>{row.figma}</TokenName>,
          <TokenName key={`${row.figma}-ref`}>{row.refs[platform]}</TokenName>,
        ])}
      />
      <TokenTable
        headers={["Figma", platformLabel]}
        rows={valueRows.map((row) => [
          <TokenName key={`${row.figma}-name`}>{row.figma}</TokenName>,
          <TokenName key={`${row.figma}-ref`}>{row.refs[platform]}</TokenName>,
        ])}
      />
    </div>
  );
}
