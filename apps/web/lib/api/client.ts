/**
 * Minimal typed fetch helper for apps/api.
 * Server-side only for now: API_URL is not exposed to the browser.
 */
const API_URL = process.env.API_URL;

export class ApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_URL) {
    throw new ApiError("API_URL is not set");
  }

  const response = await fetch(`${API_URL}${path}`, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(5000),
    ...init,
  });

  if (!response.ok) {
    throw new ApiError(`GET ${path} failed`, response.status);
  }

  return (await response.json()) as T;
}
