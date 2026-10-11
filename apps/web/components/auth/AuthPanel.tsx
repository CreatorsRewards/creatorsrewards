"use client";

import { useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ChoiceOption } from "@/components/ui/ChoiceOption";
import type { AuthType, CampaignData } from "@/hooks/useAuthFlow";
import { toAuthMode, validateAuthForm } from "@/lib/auth";
import type {
  AuthFormErrors,
  AuthMode,
  AuthResult,
  AuthSubmission,
} from "@/lib/auth";
import { AuthSuccess } from "./AuthSuccess";
import {
  INPUT_CLASSES,
  LABEL_CLASSES,
  TextField,
  inputStateClasses,
} from "./TextField";

const GENERIC_ERROR = "Something went wrong. Please try again.";

const MODE_OPTIONS: readonly {
  mode: AuthMode;
  label: string;
  className: string;
  activeClassName: string;
}[] = [
  {
    mode: "creator",
    label: "Join as Creator",
    className: "flex-1",
    activeClassName: "bg-cr-pink text-white shadow-xs",
  },
  {
    mode: "brand",
    label: "Launch Brand Campaign",
    className: "flex-1",
    activeClassName: "bg-cr-pink text-white shadow-xs",
  },
  {
    mode: "login",
    label: "Log In",
    className: "",
    activeClassName: "bg-cr-dark text-white shadow-xs",
  },
];

export interface AuthPanelProps {
  initialType: AuthType;
  campaignData: CampaignData | null;
  /** Lane names offered to creators. */
  laneOptions: readonly string[];
  onSubmit: (submission: AuthSubmission) => Promise<AuthResult>;
  onClose: () => void;
}

/** Mounted fresh each time the modal opens, so it never needs a manual reset. */
export default function AuthPanel({
  initialType,
  campaignData,
  laneOptions,
  onSubmit,
  onClose,
}: AuthPanelProps) {
  const uid = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const handleRef = useRef<HTMLInputElement>(null);

  const [mode, setMode] = useState<AuthMode>(toAuthMode(initialType));
  const [values, setValues] = useState({
    name: "",
    email: "",
    // Prefill from the card the visitor clicked, if it is a lane we offer.
    lane:
      laneOptions.find((lane) => lane === campaignData?.type) ??
      laneOptions[0] ??
      "",
    handle: "@",
  });
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [done, setDone] = useState<AuthSubmission | null>(null);

  const setField = (field: keyof typeof values) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (field !== "lane") {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const changeMode = (next: AuthMode) => {
    setMode(next);
    setErrors({});
    setSubmitError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    const result = validateAuthForm(mode, values, campaignData);
    setErrors(result.errors);
    setSubmitError(null);

    if (!result.submission) {
      const first = result.errors.name
        ? nameRef
        : result.errors.email
          ? emailRef
          : handleRef;
      first.current?.focus();
      return;
    }

    setStatus("submitting");
    const outcome = await onSubmit(result.submission).catch(
      (): AuthResult => ({ ok: false, message: GENERIC_ERROR }),
    );

    if (outcome.ok) {
      setDone(result.submission);
      setStatus("success");
    } else {
      setSubmitError(outcome.message);
      setStatus("idle");
    }
  };

  if (status === "success" && done) {
    return <AuthSuccess done={done} onClose={onClose} />;
  }

  const isSubmitting = status === "submitting";
  const campaignRows = campaignData
    ? (
        [
          ["Name", campaignData.name],
          ["Creator type", campaignData.type],
          ["Budget", campaignData.budget],
        ] as const
      ).filter(([, value]) => value)
    : [];

  return (
    <div className="p-5 sm:p-8 overflow-y-auto">
      <fieldset className="mb-6 min-w-0">
        <legend className="sr-only">What would you like to do?</legend>
        <div className="flex items-center gap-1.5 p-1 bg-cr-yellow/60 rounded-xl border border-cr-dark/10">
          {MODE_OPTIONS.map((option) => (
            <ChoiceOption
              key={option.mode}
              name={`${uid}-mode`}
              value={option.mode}
              checked={mode === option.mode}
              onChange={() => changeMode(option.mode)}
              className={option.className}
              surfaceClassName={`block py-2 px-3 text-center text-xs font-bold rounded-lg transition-colors ${
                mode === option.mode
                  ? option.activeClassName
                  : "text-cr-dark/70 hover:text-cr-dark"
              }`}
            >
              {option.label}
            </ChoiceOption>
          ))}
        </div>
      </fieldset>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {mode !== "login" && (
          <TextField
            id={`${uid}-name`}
            inputRef={nameRef}
            label={
              mode === "creator"
                ? "Full Name / Creator Alias"
                : "Brand or Agency Name"
            }
            value={values.name}
            onChange={setField("name")}
            error={errors.name}
            autoComplete="name"
            autoFocusOnOpen
            placeholder={
              mode === "creator"
                ? "Amara Okafor"
                : "Flutterwave, Paystack, etc."
            }
          />
        )}

        <TextField
          id={`${uid}-email`}
          inputRef={emailRef}
          type="email"
          label="Email Address"
          value={values.email}
          onChange={setField("email")}
          error={errors.email}
          autoComplete="email"
          autoFocusOnOpen={mode === "login"}
          placeholder="creator@domain.africa"
        />

        {mode === "creator" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={`${uid}-lane`} className={LABEL_CLASSES}>
                  Creator Lane
                </label>
                <select
                  id={`${uid}-lane`}
                  value={values.lane}
                  onChange={(e) => setField("lane")(e.target.value)}
                  className={`${INPUT_CLASSES} ${inputStateClasses(false)} px-3 py-2.5`}
                >
                  {laneOptions.map((lane) => (
                    <option key={lane} value={lane}>
                      {lane}
                    </option>
                  ))}
                </select>
              </div>

              <TextField
                id={`${uid}-handle`}
                inputRef={handleRef}
                label="Primary Handle"
                value={values.handle}
                onChange={setField("handle")}
                error={errors.handle}
                autoComplete="off"
                placeholder="@amaracreates"
              />
            </div>

            <div>
              <div className={LABEL_CLASSES}>Payout Rail</div>
              <div className="p-3 rounded-xl border border-cr-dark/15 bg-white flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="w-2.5 h-2.5 rounded-full bg-emerald-500 motion-safe:animate-pulse shrink-0"
                  />
                  <span className="text-xs font-bold">
                    ₦ Naira (NGN) · Direct Bank Settlement
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Active
                </span>
              </div>
            </div>
          </>
        )}

        {mode === "brand" && (
          <div className="p-3.5 rounded-xl bg-cr-yellow/60 border border-cr-dark/10 text-xs text-cr-dark/80">
            {campaignRows.length > 0 ? (
              <>
                <div className="font-bold text-cr-dark mb-1">
                  Campaign details loaded:
                </div>
                <dl className="space-y-0.5">
                  {campaignRows.map(([label, value]) => (
                    <div key={label} className="flex gap-1.5">
                      <dt>{label}:</dt>
                      <dd className="font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
              </>
            ) : (
              <p>You&apos;ll set your campaign details after signing up.</p>
            )}
          </div>
        )}

        {submitError && (
          <p
            role="alert"
            className="text-sm font-semibold text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
          >
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="w-full mt-4 py-3.5 rounded-xl bg-cr-pink hover:bg-cr-coral-hover disabled:opacity-70 disabled:cursor-wait text-white text-sm font-bold shadow-lg shadow-cr-pink/25 transition-colors cursor-pointer flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cr-pink"
        >
          <span>
            {isSubmitting
              ? "Submitting…"
              : mode === "creator"
                ? "Submit for Two-Gate Verification →"
                : mode === "brand"
                  ? "Publish Campaign to Vetted Network →"
                  : "Log In to Dashboard →"}
          </span>
        </button>
      </form>
    </div>
  );
}
