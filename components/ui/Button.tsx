import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./button.css";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function resolveButtonSize(
  variant: ButtonVariant,
  size?: ButtonSize,
): ButtonSize {
  const requested = size ?? (variant === "tertiary" ? "sm" : "lg");

  if ((variant === "primary" || variant === "secondary") && requested === "md") {
    return "sm";
  }

  return requested;
}

function hasVisibleLabel(children: ReactNode): boolean {
  if (children == null || children === false || children === true) {
    return false;
  }

  if (typeof children === "string" || typeof children === "number") {
    return String(children).trim().length > 0;
  }

  return true;
}

export function Button({
  variant = "primary",
  size,
  leadingIcon,
  trailingIcon,
  disabled = false,
  type = "button",
  className,
  children,
  ...props
}: ButtonProps) {
  const resolvedSize = resolveButtonSize(variant, size);
  const iconOnly = !hasVisibleLabel(children);
  const named =
    !iconOnly || Boolean(props["aria-label"] || props["aria-labelledby"]);

  if (process.env.NODE_ENV !== "production" && !named) {
    console.warn(
      "Button needs a visible label or aria-label when only an icon is provided.",
    );
  }

  return (
    <button
      {...props}
      type={type}
      className={["ds-button", className].filter(Boolean).join(" ")}
      data-variant={variant}
      data-size={resolvedSize}
      data-icon-only={iconOnly ? "true" : undefined}
      disabled={disabled}
    >
      {leadingIcon ? (
        <span className="ds-button__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}
      {hasVisibleLabel(children) ? (
        <span className="ds-button__label">{children}</span>
      ) : null}
      {trailingIcon ? (
        <span className="ds-button__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      ) : null}
    </button>
  );
}
