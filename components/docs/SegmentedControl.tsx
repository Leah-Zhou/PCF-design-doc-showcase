"use client";

import { useId, useRef, type KeyboardEvent } from "react";

type SegmentedOption<T extends string> = {
  id: T;
  label: string;
};

type SegmentedControlProps<T extends string> = {
  label: string;
  value: T;
  options: Array<SegmentedOption<T>>;
  onChange: (value: T) => void;
  hideLabel?: boolean;
};

export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
  hideLabel = false,
}: SegmentedControlProps<T>) {
  const labelId = useId();
  const optionRefs = useRef<Partial<Record<T, HTMLButtonElement | null>>>({});

  function select(next: T) {
    onChange(next);
    optionRefs.current[next]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const index = options.findIndex((option) => option.id === value);
    if (index === -1) {
      return;
    }

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      select(options[(index + 1) % options.length].id);
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      select(options[(index - 1 + options.length) % options.length].id);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      select(options[0].id);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      select(options[options.length - 1].id);
    }
  }

  return (
    <div className="flex flex-col gap-md">
      <p
        id={labelId}
        className={`font-[var(--font-weight-semi-bold)] text-[var(--color-text-secondary)] ${hideLabel ? "sr-only" : ""}`}
        style={{ fontSize: "var(--font-size-xs)", letterSpacing: "0.06em" }}
      >
        {label}
      </p>
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        aria-orientation="horizontal"
        className="flex overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-subtle-02)]"
      >
        {options.map((option) => {
          const selected = value === option.id;

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              ref={(node) => {
                optionRefs.current[option.id] = node;
              }}
              className="flex-1 cursor-pointer appearance-none border-0 px-2xl py-xl text-center"
              style={{
                background: selected
                  ? "var(--color-surface-neutral-02)"
                  : "var(--color-page-bg-primary)",
                color: "var(--color-text-primary)",
                fontSize: "var(--font-size-sm)",
                fontWeight: selected
                  ? "var(--font-weight-semi-bold)"
                  : "var(--font-weight-regular)",
              }}
              onClick={() => select(option.id)}
              onKeyDown={onKeyDown}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
