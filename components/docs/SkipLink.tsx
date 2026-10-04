export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="absolute left-2xl top-2xl z-50 -translate-y-[200%] bg-[var(--color-page-bg-primary)] px-2xl py-md font-[var(--font-weight-semi-bold)] text-[var(--color-text-primary)] focus:translate-y-0"
      style={{ fontSize: "var(--font-size-sm)" }}
    >
      Skip to main content
    </a>
  );
}
