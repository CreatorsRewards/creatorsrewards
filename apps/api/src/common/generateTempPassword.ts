import { randomInt } from 'crypto';

// No look-alike characters (0/O, 1/l/I), so it's easy to type from an email.
const LOWER = 'abcdefghijkmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const DIGITS = '23456789';
const ALL = LOWER + UPPER + DIGITS;

const pick = (chars: string) => chars[randomInt(chars.length)];

/**
 * Cryptographically secure random password (uses crypto.randomInt, not
 * Math.random). Always contains at least one lowercase letter, one uppercase
 * letter and one digit, so it passes typical password rules.
 */
export function generateTempPassword(length = 12): string {
  if (length < 8) {
    throw new Error('Temporary passwords must be at least 8 characters');
  }

  // Guarantee one of each class, fill the rest from the full alphabet
  const chars = [
    pick(LOWER),
    pick(UPPER),
    pick(DIGITS),
    ...Array.from({ length: length - 3 }, () => pick(ALL)),
  ];

  // Fisher-Yates shuffle so the guaranteed characters aren't always first
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join('');
}