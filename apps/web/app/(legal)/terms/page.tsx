import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import {
  termsIntro as creatorsIntro,
  termsMeta as creatorsMeta,
  termsSections as creatorsSections,
} from "./creators-data";
import {
  termsIntro as brandsIntro,
  termsSections as brandsSections,
} from "./brands-data";
import type { TermsSection } from "./creators-data";

export const metadata: Metadata = {
  title: "Terms of Service | CreatorsRewards",
  description:
    "Read the CreatorsRewards Terms of Service for creators, clippers, brands, agencies, and advertisers.",
};

// The existing LegalDocument component is reused. These heading sections keep
// the creator and brand terms clearly separated on one public page.
const sections: TermsSection[] = [
  {
    id: "creators-terms-heading",
    title: "Part I — Creators Terms of Service",
    content: creatorsIntro,
  },
  ...creatorsSections.map((section) => ({
    ...section,
    id: `creator-${section.id}`,
  })),
  {
    id: "brands-terms-heading",
    title: "Part II — Brands Terms of Service",
    content: brandsIntro,
  },
  ...brandsSections.map((section) => ({
    ...section,
    id: `brand-${section.id}`,
  })),
];

const termsIntro = [
  "These Terms of Service apply to the relevant CreatorsRewards users described in each part below. Part I applies to UGC Creators and Clippers. Part II applies to brands, agencies, and advertisers. Please read the part relevant to your use of the Platform.",
];

const TermsPage = () => (
  <LegalDocument
    title="Terms of Service"
    intro={termsIntro}
    sections={sections}
    lastUpdated={creatorsMeta.effectiveDate}
  />
);

export default TermsPage;
