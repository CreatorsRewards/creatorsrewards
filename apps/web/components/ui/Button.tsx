import Link from "next/link";
import { Loader2 } from "lucide-react";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonStyleOptions {
  /** primary: coral call to action. secondary: off-white. outline: white. ghost: text only. */
  variant?: ButtonVariant;
  /** sm: text-xs, md: text-sm, lg: text-base (hero-sized). */
  size?: ButtonSize;
  /** "full" makes a pill, e.g. the navbar's Join Now. */
  rounded?: "default" | "full";
  fullWidth?: boolean;
}

const BASE =
  "inline-flex items-center justify-center gap-2 font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-cr-pink text-white shadow-lg shadow-cr-pink/25 hover:bg-cr-coral-hover focus-visible:outline-cr-pink",
  secondary:
    "bg-cr-blush text-cr-dark border border-cr-dark/15 shadow-sm hover:bg-white focus-visible:outline-cr-dark",
  outline:
    "bg-white text-cr-dark border border-cr-dark/15 shadow-xs hover:bg-stone-50 focus-visible:outline-cr-dark",
  ghost: "text-cr-dark hover:text-cr-pink focus-visible:outline-cr-pink",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

// Filled buttons lift slightly on hover and press in on click (not for people who prefer less motion).
const PRESS = "motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98]";

/**
 * The button look as a class string, for the rare element that can't be a
 * <Button> (for example a link inside a component you don't control).
 */
export function buttonVariants({
  variant = "primary",
  size = "md",
  rounded = "default",
  fullWidth = false,
  disabled = false,
}: ButtonStyleOptions & { disabled?: boolean } = {}): string {
  return [
    BASE,
    VARIANTS[variant],
    SIZES[size],
    rounded === "full"
      ? "rounded-full"
      : size === "sm"
        ? "rounded-lg"
        : "rounded-xl",
    variant !== "ghost" && !disabled && PRESS,
    fullWidth && "w-full",
    disabled && "cursor-not-allowed opacity-60",
  ]
    .filter(Boolean)
    .join(" ");
}

interface CommonProps extends ButtonStyleOptions {
  children: ReactNode;
  /** Shown before the label. Decorative: hidden from screen readers. */
  iconLeft?: ReactNode;
  /** Shown after the label. Decorative: hidden from screen readers. */
  iconRight?: ReactNode;
  /** Layout only (margin, width at a breakpoint). Colors and padding come from the props above. */
  className?: string;
}

type ButtonAsButton = CommonProps & {
  href?: undefined;
  /** Link-only attributes: using them means you probably forgot `href`. */
  target?: never;
  rel?: never;
  /** Disables the button and shows a spinner, e.g. while a form is submitting. */
  loading?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "href">;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/** Pages of this app use Next's <Link>; hash anchors, other sites, mailto: etc. use a plain <a>. */
const isAppRoute = (href: string) =>
  href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/#");

function Icon({ children }: { children: ReactNode }) {
  if (!children) return null;
  return (
    <span aria-hidden="true" className="inline-flex shrink-0">
      {children}
    </span>
  );
}

/**
 * One button for the whole app. Pass `href` and it renders a link that looks
 * like a button; leave it out and you get a real <button> (type="button" unless
 * you say otherwise, so it never submits a form by accident).
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const {
      href,
      variant,
      size,
      rounded,
      fullWidth,
      iconLeft,
      iconRight,
      className = "",
      children,
      ...anchorProps
    } = props;

    const classes = `${buttonVariants({ variant, size, rounded, fullWidth })} ${className}`;
    const rel =
      anchorProps.rel ??
      (anchorProps.target === "_blank" ? "noopener noreferrer" : undefined);
    const content = (
      <>
        <Icon>{iconLeft}</Icon>
        {children}
        <Icon>{iconRight}</Icon>
      </>
    );

    return isAppRoute(href) ? (
      <Link href={href} className={classes} rel={rel} {...anchorProps}>
        {content}
      </Link>
    ) : (
      <a href={href} className={classes} rel={rel} {...anchorProps}>
        {content}
      </a>
    );
  }

  const {
    variant,
    size,
    rounded,
    fullWidth,
    iconLeft,
    iconRight,
    className = "",
    children,
    loading = false,
    disabled,
    type = "button",
    ...buttonProps
  } = props;

  const isDisabled = Boolean(disabled) || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={`${buttonVariants({ variant, size, rounded, fullWidth, disabled: isDisabled })} ${loading ? "cursor-wait" : ""} ${className}`}
      {...buttonProps}
    >
      {loading ? (
        <Icon>
          <Loader2 className="size-4 motion-safe:animate-spin" />
        </Icon>
      ) : (
        <Icon>{iconLeft}</Icon>
      )}
      {children}
      <Icon>{iconRight}</Icon>
    </button>
  );
}
