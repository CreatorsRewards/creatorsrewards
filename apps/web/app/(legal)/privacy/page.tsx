import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { privacyIntro, privacyMeta, privacySections } from "./privacy-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How CreatorsRewards collects, uses, stores and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      intro={privacyIntro}
      sections={privacySections}
      lastUpdated={privacyMeta.effectiveDate}
    />
  );
}
