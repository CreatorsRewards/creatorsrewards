// Fixed locale so the server and the browser always print the same text.
const NUMBER_FORMAT = new Intl.NumberFormat("en-US");

export const formatNumber = (value: number) => NUMBER_FORMAT.format(value);

export const formatNaira = (value: number) => `₦${formatNumber(value)}`;

/**
 * Reads a naira amount from what someone typed ("₦500,000", "500000", "1 200 000").
 * Returns whole naira, or null if there are no digits. Anything after a decimal
 * point is ignored.
 */
export function parseNaira(text: string): number | null {
  const wholePart = text.split(".")[0] ?? "";
  const digits = wholePart.replace(/\D/g, "");
  if (!digits) return null;

  const amount = Number(digits);
  return Number.isSafeInteger(amount) ? amount : null;
}
