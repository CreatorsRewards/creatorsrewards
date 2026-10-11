import type { AuthResult, AuthSubmission } from "@/lib/auth";

/**
 * Sends the auth modal's form to the backend.
 *
 * PLACEHOLDER: apps/api has no routes yet, so this waits a moment and reports
 * success. When the API exists:
 *   1. Add `"use server"` as the first line of this file (it becomes a Next.js
 *      Server Action, so the browser never sees the API URL and there is no CORS).
 *   2. Replace the body with a fetch to `${process.env.API_URL}/...`, one route
 *      per `submission.kind`, and return `{ ok: false, message }` on errors.
 * Nothing else in the app has to change.
 */
export async function submitAuth(
  submission: AuthSubmission,
): Promise<AuthResult> {
  void submission;
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { ok: true };
}
