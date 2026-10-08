"use client";

import { useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  SpotlightCard,
  ViewportReveal,
} from "@/components/animation/AnimatedComponents";
import { ChoiceOption } from "@/components/ui/ChoiceOption";
import {
  MAX_CAMPAIGN_NAME_LENGTH,
  validateCampaignDraft,
} from "@/lib/campaign";
import type { CampaignDraftErrors } from "@/lib/campaign";
import { formatNaira, parseNaira } from "@/lib/currency";
import type { CampaignData } from "@/hooks/useAuthFlow";
import type { CampaignPreviewContent } from "@/lib/api/types";

export interface CampaignPreviewSectionProps {
  /** Form defaults and rules. Static in lib/api for now. */
  content: CampaignPreviewContent;
  onStartCampaign: (details: CampaignData) => void;
}

const INPUT_CLASSES =
  "w-full px-4 rounded-xl bg-white border text-cr-dark focus:outline-none focus:ring-1 transition-colors shadow-xs";

const inputStateClasses = (hasError: boolean) =>
  hasError
    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
    : "border-cr-dark/15 focus:border-cr-pink focus:ring-cr-pink";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 text-xs font-semibold text-red-600"
    >
      {message}
    </p>
  );
}

export default function CampaignPreviewSection({
  content,
  onStartCampaign,
}: CampaignPreviewSectionProps) {
  const uid = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const budgetRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(content.defaultName);
  const [creatorType, setCreatorType] = useState(content.creatorTypes[0] ?? "");
  const [budgetText, setBudgetText] = useState(
    formatNaira(content.defaultBudget),
  );
  const [errors, setErrors] = useState<CampaignDraftErrors>({});

  const budget = parseNaira(budgetText);

  const submit = () => {
    const result = validateCampaignDraft(
      { name, type: creatorType, budgetText },
      { minBudget: content.minBudget },
    );
    setErrors(result.errors);

    if (!result.value) {
      (result.errors.name ? nameRef : budgetRef).current?.focus();
      return;
    }

    onStartCampaign({
      name: result.value.name,
      type: result.value.type,
      budget: formatNaira(result.value.budget),
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  const nameId = `${uid}-name`;
  const budgetId = `${uid}-budget`;

  return (
    <section
      id="campaign-preview"
      aria-labelledby="campaign-preview-heading"
      className="py-24 md:py-36 text-cr-dark relative overflow-hidden border-t border-cr-dark/10"
    >
      <div aria-hidden="true" className="pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cr-purple opacity-70 blur-3xl -z-10" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cr-orange opacity-70 blur-3xl -z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <ViewportReveal
            scaleFrom={1}
            yOffset={20}
            duration={0.6}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cr-orange text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              Start In Minutes
            </div>

            <h2
              id="campaign-preview-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6"
            >
              The creators are already here.{" "}
              <span className="text-cr-pink">
                Give them something worth creating.
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-cr-dark/85 leading-relaxed font-normal mb-8 max-w-xl">
              Launch a campaign, set your budget, and see how your content
              performs, all in one place.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                id="closing-start-campaign-cta"
                type="button"
                onClick={submit}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-cr-pink hover:bg-cr-coral-hover shadow-lg shadow-cr-pink/25 motion-safe:hover:scale-105 transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cr-pink"
              >
                <span>Start a Campaign</span>
                <ArrowRight
                  className="w-4 h-4 motion-safe:group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </button>
              <span className="text-xs text-cr-dark/70 font-semibold">
                No subscription fees · Pay as you go
              </span>
            </div>
          </ViewportReveal>

          <ViewportReveal
            scaleFrom={0.96}
            yOffset={20}
            duration={0.6}
            delay={0.15}
            className="lg:col-span-6"
          >
            <SpotlightCard className="rounded-3xl bg-cr-blush border border-cr-dark/10 shadow-2xl p-6 sm:p-8 lg:p-10">
              <div
                aria-hidden="true"
                className="absolute top-0 inset-x-0 h-1.5 rounded-t-3xl bg-cr-pink"
              />

              <div className="flex items-center justify-between gap-3 mb-6">
                <h3 className="font-display text-2xl sm:text-3xl font-bold">
                  New Campaign
                </h3>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 whitespace-nowrap">
                  Ready to deploy
                </span>
              </div>

              {/* noValidate: we show our own, friendlier messages. */}
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label
                    htmlFor={nameId}
                    className="block text-xs font-bold uppercase tracking-wider text-cr-dark/70 mb-2"
                  >
                    Campaign name
                  </label>
                  <input
                    ref={nameRef}
                    id={nameId}
                    type="text"
                    value={name}
                    maxLength={MAX_CAMPAIGN_NAME_LENGTH}
                    autoComplete="off"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? `${nameId}-error` : undefined
                    }
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    className={`${INPUT_CLASSES} ${inputStateClasses(Boolean(errors.name))} py-3 font-semibold text-base`}
                  />
                  <FieldError id={`${nameId}-error`} message={errors.name} />
                </div>

                <fieldset className="min-w-0">
                  <legend className="text-xs font-bold uppercase tracking-wider text-cr-dark/70 mb-2">
                    Creator type
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {content.creatorTypes.map((type) => (
                      <ChoiceOption
                        key={type}
                        name={`${uid}-type`}
                        value={type}
                        checked={creatorType === type}
                        onChange={() => setCreatorType(type)}
                        surfaceClassName={`inline-block text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                          creatorType === type
                            ? "bg-cr-dark text-white border-cr-dark"
                            : "bg-white text-cr-dark/80 border-cr-dark/15 hover:border-cr-pink"
                        }`}
                      >
                        {type}
                      </ChoiceOption>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="min-w-0">
                  <legend className="flex w-full items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cr-dark/70">
                      Budget
                    </span>
                    <span className="text-[11px] font-semibold text-cr-dark/60">
                      Quick select:
                    </span>
                  </legend>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                    {content.budgetPresets.map((preset) => (
                      <ChoiceOption
                        key={preset}
                        name={`${uid}-preset`}
                        value={String(preset)}
                        checked={budget === preset}
                        onChange={() => {
                          setBudgetText(formatNaira(preset));
                          setErrors((prev) => ({ ...prev, budget: undefined }));
                        }}
                        surfaceClassName={`block text-xs font-bold py-2 px-2.5 rounded-lg border text-center transition-colors ${
                          budget === preset
                            ? "bg-cr-pink text-white border-cr-pink"
                            : "bg-white text-cr-dark border-cr-dark/15 hover:border-cr-pink"
                        }`}
                      >
                        {formatNaira(preset)}
                      </ChoiceOption>
                    ))}
                  </div>

                  <label htmlFor={budgetId} className="sr-only">
                    Budget in naira
                  </label>
                  <input
                    ref={budgetRef}
                    id={budgetId}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={budgetText}
                    aria-invalid={Boolean(errors.budget)}
                    aria-describedby={
                      errors.budget ? `${budgetId}-error` : undefined
                    }
                    onChange={(e) => {
                      setBudgetText(e.target.value);
                      setErrors((prev) => ({ ...prev, budget: undefined }));
                    }}
                    onBlur={() => {
                      // Tidy up what was typed, e.g. "500000" becomes "₦500,000".
                      if (budget !== null) setBudgetText(formatNaira(budget));
                    }}
                    className={`${INPUT_CLASSES} ${inputStateClasses(Boolean(errors.budget))} py-3 font-bold text-xl`}
                  />
                  <FieldError
                    id={`${budgetId}-error`}
                    message={errors.budget}
                  />
                </fieldset>

                <button
                  id="submit-create-campaign-button"
                  type="submit"
                  className="w-full mt-4 py-4 rounded-xl text-base font-bold text-white bg-cr-pink hover:bg-cr-coral-hover shadow-lg shadow-cr-pink/20 motion-safe:hover:scale-[1.01] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cr-pink"
                >
                  <span>Create Campaign</span>
                  <span aria-hidden="true">→</span>
                </button>
              </form>
            </SpotlightCard>
          </ViewportReveal>
        </div>
      </div>
    </section>
  );
}
