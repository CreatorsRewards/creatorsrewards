import type { CampaignData } from "@/hooks/useAuthFlow";

const STORAGE_KEY = "cr:campaign-draft";

/**
 * Remembers the campaign details a visitor typed (or picked) on the landing
 * page while they sign in, so we can pre-fill campaign creation afterwards.
 * Lives in sessionStorage: it is gone when the tab closes, and it never leaves
 * the browser.
 */
export function saveCampaignDraft(draft: CampaignData): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Storage can be blocked (private mode, full). The draft is a convenience, so just skip it.
  }
}

export function readCampaignDraft(): CampaignData | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const value: unknown = JSON.parse(raw);
    if (
      typeof value === "object" &&
      value !== null &&
      "name" in value &&
      "type" in value &&
      "budget" in value &&
      typeof value.name === "string" &&
      typeof value.type === "string" &&
      typeof value.budget === "string"
    ) {
      return { name: value.name, type: value.type, budget: value.budget };
    }
    return null;
  } catch {
    return null;
  }
}

export function clearCampaignDraft(): void {
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to clear if storage is unavailable.
  }
}
