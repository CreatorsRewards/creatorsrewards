import type { RefObject } from "react";

export const INPUT_CLASSES =
  "w-full rounded-xl bg-white border text-cr-dark placeholder:text-cr-dark/40 text-sm focus:outline-none focus:ring-1 transition-colors";

export const inputStateClasses = (hasError: boolean) =>
  hasError
    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
    : "border-cr-dark/15 focus:border-cr-pink focus:ring-cr-pink";

export const LABEL_CLASSES =
  "block text-xs font-bold uppercase tracking-wider text-cr-dark/70 mb-1.5";

export interface TextFieldProps {
  id: string;
  label: string;
  type?: "text" | "email";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
  /** The modal focuses the first field marked with this when it opens. */
  autoFocusOnOpen?: boolean;
}

export function TextField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  inputRef,
  autoFocusOnOpen,
}: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASSES}>
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        data-autofocus={autoFocusOnOpen ? "" : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`${INPUT_CLASSES} ${inputStateClasses(Boolean(error))} px-4 py-2.5`}
      />
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-xs font-semibold text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
