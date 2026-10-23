import { formatNaira, parseNaira } from "./currency";

export const MAX_CAMPAIGN_NAME_LENGTH = 80;

export interface CampaignDraftInput {
  name: string;
  type: string;
  /** What is in the budget field, e.g. "₦500,000". */
  budgetText: string;
}

export type CampaignDraftErrors = Partial<Record<"name" | "budget", string>>;

export interface ValidCampaignDraft {
  name: string;
  type: string;
  /** Whole naira. */
  budget: number;
}

/**
 * Checks the "New Campaign" form. This is only for fast feedback in the
 * browser: apps/api has to enforce the same rules again, because the browser
 * can always be bypassed.
 */
export function validateCampaignDraft(
  input: CampaignDraftInput,
  rules: { minBudget: number },
): { errors: CampaignDraftErrors; value?: ValidCampaignDraft } {
  const name = input.name.trim();
  const budget = parseNaira(input.budgetText);
  const errors: CampaignDraftErrors = {};

  if (!name) {
    errors.name = "Give your campaign a name.";
  } else if (name.length > MAX_CAMPAIGN_NAME_LENGTH) {
    errors.name = `Keep the name under ${MAX_CAMPAIGN_NAME_LENGTH} characters.`;
  }

  if (budget === null) {
    errors.budget = "Enter a budget in naira.";
  } else if (budget < rules.minBudget) {
    errors.budget = `The minimum budget is ${formatNaira(rules.minBudget)}.`;
  }

  if (errors.name || errors.budget || budget === null) return { errors };

  return { errors, value: { name, type: input.type, budget } };
}
