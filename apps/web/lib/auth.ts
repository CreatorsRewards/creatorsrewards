import type { AuthType, CampaignData } from "@/hooks/useAuthFlow";

export type AuthMode = "login" | "creator" | "brand";

export const toAuthMode = (type: AuthType): AuthMode =>
  type === "login" ? "login" : type === "brand" ? "brand" : "creator";

/** What the modal sends when the form is submitted. Plain data, safe to send to a server. */
export type AuthSubmission =
  | { kind: "login"; email: string }
  | {
      kind: "creator";
      name: string;
      email: string;
      lane: string;
      handle: string;
    }
  | {
      kind: "brand";
      name: string;
      email: string;
      campaign: CampaignData | null;
    };

export type AuthResult = { ok: true } | { ok: false; message: string };

export interface AuthFormValues {
  name: string;
  email: string;
  lane: string;
  handle: string;
}

export type AuthFormErrors = Partial<
  Record<"name" | "email" | "handle", string>
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HANDLE_PATTERN = /^@[\w.]{2,30}$/;

/** "amaracreates" and " @amaracreates " both become "@amaracreates". */
export function normalizeHandle(raw: string): string {
  const trimmed = raw.trim();
  return trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
}

/**
 * Checks the modal form. This is only for fast feedback in the browser:
 * apps/api has to validate the same things again, because the browser can
 * always be bypassed.
 */
export function validateAuthForm(
  mode: AuthMode,
  values: AuthFormValues,
  campaign: CampaignData | null,
): { errors: AuthFormErrors; submission?: AuthSubmission } {
  const errors: AuthFormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim().toLowerCase();
  const handle = normalizeHandle(values.handle);

  if (mode !== "login" && !name) {
    errors.name =
      mode === "creator"
        ? "Enter your name or creator alias."
        : "Enter your brand or agency name.";
  }

  if (!email) {
    errors.email = "Enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address, like name@domain.com.";
  }

  if (mode === "creator" && !HANDLE_PATTERN.test(handle)) {
    errors.handle = "Enter your handle, like @amaracreates.";
  }

  if (errors.name || errors.email || errors.handle) return { errors };

  switch (mode) {
    case "login":
      return { errors, submission: { kind: "login", email } };
    case "creator":
      return {
        errors,
        submission: { kind: "creator", name, email, lane: values.lane, handle },
      };
    case "brand":
      return {
        errors,
        submission: { kind: "brand", name, email, campaign },
      };
  }
}
