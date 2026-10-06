import type { HowItWorksContent } from "./types";

// Static for now. This is marketing copy, so it can stay a constant even after
// the backend exists, or move to a CMS later.
export const HOW_IT_WORKS: HowItWorksContent = {
  creatorSteps: [
    {
      id: "signup",
      title: "Sign up and get verified",
      description:
        "Two-step verification keeps the network credible for brands.",
    },
    {
      id: "browse",
      title: "Browse live briefs",
      description: "UGC briefs or clipping campaigns, pick what fits you.",
    },
    {
      id: "submit",
      title: "Submit your content",
      description: "Post and submit, we track views and approval status.",
    },
    {
      id: "payout",
      title: "Get paid",
      description: "Straight to your account in Naira.",
    },
  ],
  brandSteps: [
    {
      id: "brief",
      title: "Set your brief and budget",
      description: "Tell us what you need and what you're working with.",
    },
    {
      id: "match",
      title: "Get matched with vetted creators",
      description: "Only verified creators can apply to your campaign.",
    },
    {
      id: "approve",
      title: "Approve content as it comes in",
      description: "Review submissions and approve what fits your brand.",
    },
    {
      id: "pay",
      title: "Pay for what performs",
      description: "Budget goes toward views and deliverables, not guesswork.",
    },
  ],
};
