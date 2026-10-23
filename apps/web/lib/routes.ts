/** Every page the landing page links to, in one place, so paths are never typed twice. */
export const ROUTES = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
} as const;

const withQuery = (
  path: string,
  params: Record<string, string | undefined>,
) => {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) query.set(key, value);
  }
  const queryString = query.toString();
  return queryString ? `${path}?${queryString}` : path;
};

/**
 * The sign-up page. `role` and `lane` are optional hints the page can use to
 * pre-select what the visitor already chose, e.g. /sign-up?role=creator&lane=Clipper
 */
export function signUpHref(
  options: { role?: "creator" | "brand"; lane?: string } = {},
): string {
  return withQuery(ROUTES.signUp, { role: options.role, lane: options.lane });
}

/**
 * The sign-in page. `intent=campaign` means the visitor came from a
 * "start a campaign" button, so after signing in they should land on
 * campaign creation (we add that once sign-in exists).
 */
export function signInHref(options: { intent?: "campaign" } = {}): string {
  return withQuery(ROUTES.signIn, { intent: options.intent });
}
