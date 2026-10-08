import type { ReactNode } from "react";

export interface ChoiceOptionProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  /** Classes for the visible surface, including its checked/unchecked look. */
  surfaceClassName: string;
  children: ReactNode;
}

/** A native radio input (keyboard and screen-reader friendly) with a custom look. */
export function ChoiceOption({
  name,
  value,
  checked,
  onChange,
  surfaceClassName,
  children,
}: ChoiceOptionProps) {
  return (
    <label className="block cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        className={`${surfaceClassName} peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cr-pink`}
      >
        {children}
      </span>
    </label>
  );
}
