export interface TermsSubsection {
  title?: string;
  content?: string[];
  list?: string[];
}
export interface TermsLink {
  label: string;
  href: string;
}
export interface TermsSection {
  id: string;
  title: string;
  content?: string[];
  list?: string[];
  subsections?: TermsSubsection[];
  links?: TermsLink[];
}

export const termsMeta = {
  companyName: "CreatorsRewards",
  website: "creatorsrewards.net",
  effectiveDate: "July 2026",
  contactEmail: "contact@creatorsrewards.net",
};

export const termsIntro: string[] = [
  'These Terms of Service ("Terms") apply to all brands, agencies, and advertisers ("Brand", "You") using CreatorsRewards, operated by CreatorsRewards ("we", "us", or "our"), to run campaigns, upload content assets, or engage creators through creatorsrewards.net (the "Platform"). By creating an account or submitting a campaign request, you agree to these Terms. If you do not agree, do not use the Platform.',
];

export const termsSections: TermsSection[] = [
  {
    id: "1",
    title: "1. Eligibility and Accounts",
    content: [
      "1.1 You must provide accurate and complete business information when creating your brand account.",
      "1.2 You are responsible for all activity conducted under your account.",
      "1.3 You may not impersonate another brand or business unless you have explicit written authorisation from that brand.",
      "1.4 We may suspend or remove accounts for violations, fraud, or abusive behaviour.",
      "1.5 By using CreatorsRewards, you represent and warrant that your business, products, services, and all campaign content comply with all applicable Nigerian laws and regulations, including the Nigeria Data Protection Regulation (NDPR), in every jurisdiction in which you operate or in which your campaigns may be viewed.",
      "1.6 It is solely your responsibility to ensure your use of the Platform does not violate any applicable law, regulation, or licensing requirement. CreatorsRewards does not verify the legal status, licensing, or regulatory compliance of any brand, and permitting your use of the Platform does not constitute endorsement or validation of your regulatory status.",
    ],
    list: [],
  },
  {
    id: "2",
    title: "2. Campaign Setup",
    content: [
      "2.1 To launch a campaign on CreatorsRewards, you must submit a campaign request through your brand dashboard. A CreatorsRewards Customer Representative will contact you to confirm campaign details, deliverables, payout structure, and budget before your campaign goes live.",
      "2.2 All campaign requirements, deliverables, content guidelines, approval criteria, and any other conditions for creator participation MUST be documented within the campaign brief on the CreatorsRewards Platform. Requirements communicated solely through external channels — including WhatsApp, email, Discord, or any medium outside the Platform — are not enforceable and do not constitute valid campaign requirements.",
      "2.3 By submitting a campaign request, you confirm that all campaign content, assets, and instructions comply with applicable Nigerian laws and social media platform policies.",
      "2.4 CreatorsRewards reserves the right to decline or remove any campaign at any time, including for policy violations or legal concerns.",
    ],
    list: [],
  },
  {
    id: "3",
    title: "3. Campaign Types",
    content: [
      "3.1 CreatorsRewards supports two campaign types, configured by our team at campaign setup:",
      "Deliverable-Based Campaigns: Creators complete and submit a defined deliverable. Payout is triggered on submission approval. Campaigns run for the full defined duration unless closed early per Section 7.",
      "Views-Based Campaigns: Campaigns have a total views cap. When collective creator views reach the cap, the campaign closes automatically. A minimum views threshold is set per campaign (minimum platform floor: 1,000 views). Creators who do not meet the threshold by campaign end receive no payout.",
      "3.2 Campaigns may also have an optional approved post count limit. When the limit is reached, the campaign closes automatically.",
      "3.3 The payout structure — including whether it is a flat fee per post, CPM (cost per 1,000 views), or tiered — is agreed between you and CreatorsRewards at campaign setup and documented in the campaign brief.",
    ],
    list: [],
  },
  {
    id: "4",
    title: "4. Submission Review and Rejection",
    content: [
      "4.1 CreatorsRewards admin reviews all creator submissions on your behalf at MVP. You will be able to view submissions through your brand dashboard but may not approve or reject submissions directly in this version of the Platform.",
      "4.2 You may ONLY base rejection criteria on requirements explicitly stated in the campaign brief within the Platform. Rejections based on criteria communicated solely through external channels are invalid and will not be enforced.",
      "4.3 Repeated invalid rejection requests may impact your account standing on the Platform.",
    ],
    list: [],
  },
  {
    id: "5",
    title: "5. Content and Asset Ownership",
    content: [
      "5.1 If you provide original content assets (templates, footage, scripts, or other materials) for a campaign, you confirm that you have full rights to those assets and that creators may clip, edit, and repost them for campaign purposes.",
      "5.2 You grant CreatorsRewards a licence to host, display, and distribute your assets on the Platform for campaign purposes.",
      "5.3 All assets you upload must be legally yours and must not infringe on any third-party intellectual property rights.",
    ],
    list: [],
  },
  {
    id: "6",
    title: "6. Rights to Creator Content",
    content: [
      "6.1 By default, approved creator submissions grant you a worldwide, royalty-free licence to repost and redistribute the content organically across your own channels.",
      "6.2 This default licence does NOT include the right to use creator content in paid advertisements (including but not limited to boosted posts, sponsored ads, or any paid media placements) unless this right is explicitly stated in the campaign brief and agreed to by the creator at the time of campaign participation.",
      "6.3 For campaigns where the brand provided the original content assets and the creator produced a clip or edit, the brand retains ownership of the final edited clip.",
      "6.4 No additional payments beyond the agreed campaign payout structure are owed to creators for content used within the scope of the licence granted.",
    ],
    list: [],
  },
  {
    id: "7",
    title: "7. Campaign Pause, Pull, and Closure",
    content: [
      "7.1 You may request to pull a campaign from the Platform. Pull requests must be submitted a minimum of 7 days before the campaign end date. Pull requests submitted with less than 7 days remaining will be rejected by the system.",
      "7.2 Campaigns close automatically when: the campaign end date is reached, the total views cap is hit (views-based campaigns), or the approved post count limit is reached (where applicable) — whichever occurs first.",
      "7.3 You may not pull a campaign to delay or avoid creator payouts for already approved submissions. Approved creator payouts remain valid regardless of campaign status.",
      "7.4 If a campaign is pulled while creator submissions are pending review, those submissions will still be reviewed. Submissions approved prior to campaign closure will be honoured.",
    ],
    list: [],
  },
  {
    id: "8",
    title: "8. Brand Dashboard",
    content: [
      "8.1 As a registered brand, you have access to a brand dashboard where you can:",
      "8.2 Brand approval or rejection of individual creator applications and submissions is not available in this version of the Platform. All application and submission reviews are managed by CreatorsRewards admin.",
    ],
    list: [
      "Submit campaign start requests",
      "View live campaign performance including views, submission count, and approved posts",
      "View all submissions on your campaigns (read-only at this version of the Platform)",
      "Track campaign status: Pending Setup, Live, Closing Soon, Closed",
      "View your campaign spend breakdown",
      "Communicate with CreatorsRewards admin and Customer Representatives",
      "Submit campaign pull requests",
    ],
  },
  {
    id: "9",
    title: "9. Non-Circumvention",
    content: [
      "9.1 Following any completed campaign participation — defined as an approved creator submission with a payout issued — you may not engage, hire, contract with, or enter into any direct paid business relationship with that creator outside of CreatorsRewards for content creation, UGC production, or influencer marketing services of the type performed on the Platform.",
      "9.2 The restricted period is:",
      "9.3 Browsing creator profiles, reviewing applications, or other Platform activity that does not result in an approved submission does not trigger this restriction.",
      "9.4 Violation of this clause entitles CreatorsRewards to liquidated damages equal to the greater of ₦500,000 or 2x the platform fees that would have been owed on the circumvented transaction.",
      "9.5 You acknowledge that this restriction is reasonable and necessary to protect CreatorsRewards’ business interests and the integrity of the Platform.",
    ],
    list: [
      "6 months from the date of the last approved submission for standard campaigns",
      "12 months from the date of the last approved deliverable for retainer campaigns",
    ],
  },
  {
    id: "10",
    title: "10. Prohibited Brand Behaviour",
    content: [
      "10.1 You may not:",
      "10.2 Violations result in immediate campaign removal and account termination.",
    ],
    list: [
      "Upload copyrighted content you do not own or have rights to",
      "Upload illegal, misleading, or defamatory content",
      "Request creators to violate Platform rules, social media platform policies, or applicable laws",
      "Encourage or incentivise creators to engage in artificial engagement, botting, or view manipulation",
      "Use the Platform to redirect or funnel creators to competing platforms or external services",
      "Use CreatorsRewards as a lead generation tool to solicit creators for work outside the Platform",
      "Harass, pressure, or make demands of creators outside the campaign framework",
      "Demand off-platform payments from creators or impose additional obligations not documented in the campaign brief",
      "Impersonate another brand or business",
    ],
  },
  {
    id: "11",
    title: "11. Creator Relationship",
    content: [
      "11.1 Creators on the Platform are independent users, not your employees, agents, or contractors. CreatorsRewards does not guarantee creator participation, content quality, or any specific campaign outcome.",
      "11.2 You may not impose obligations on creators beyond what is documented in the campaign brief within the Platform.",
    ],
    list: [],
  },
  {
    id: "12",
    title: "12. Fraud Prevention",
    content: [
      "12.1 CreatorsRewards monitors submissions for fraudulent or invalid activity, including view botting, fake engagement, and metric manipulation. We reserve the right to withhold, adjust, or reverse payouts linked to suspected or confirmed invalid activity.",
      "12.2 If you suspect fraud on a creator submission, you may flag it to our admin team via the Platform. All fraud investigations are conducted and decided by CreatorsRewards at our sole discretion.",
      "12.3 CreatorsRewards’ fraud detection methods are proprietary and confidential. We are not obligated to disclose specific detection factors or thresholds.",
    ],
    list: [],
  },
  {
    id: "13",
    title: "13. Campaign Performance Disclaimer",
    content: [
      "13.1 CreatorsRewards does not guarantee views, reach, creator participation levels, content virality, or any specific campaign performance outcome.",
      "13.2 Campaign results depend on creator activity, platform algorithms, and market conditions beyond CreatorsRewards’ control.",
    ],
    list: [],
  },
  {
    id: "14",
    title: "14. Appeals",
    content: [
      "14.1 Brands have the right to appeal:",
      "14.2 Appeals must be submitted through the Platform within 14 days of the relevant action.",
      "14.3 CreatorsRewards will respond to all appeals within 10 business days.",
      "14.4 CreatorsRewards’ final decision after appeal is binding.",
    ],
    list: [
      "Flagged or removed campaigns",
      "Fraud determinations on creator submissions",
      "Account restrictions",
    ],
  },
  {
    id: "15",
    title: "15. Data Usage and Privacy",
    content: [
      "15.1 You grant CreatorsRewards a worldwide, royalty-free licence to collect, analyse, and use data generated through your campaigns, including campaign performance metrics, submission data, and spend data.",
      "15.2 This data may be used for platform optimisation, aggregate reporting, fraud detection, and other lawful business purposes.",
      "15.3 Brand data will not be shared with competing brands without your consent.",
      "15.4 All personal data is handled in accordance with our Privacy Policy and the Nigeria Data Protection Regulation (NDPR). Please review our Privacy Policy at creatorsrewards.net.",
    ],
    list: [],
  },
  {
    id: "16",
    title: "16. Platform Rights",
    content: [
      "16.1 CreatorsRewards may modify, pause, or remove any campaign or Platform feature at any time.",
      "16.2 CreatorsRewards may terminate brand accounts without notice for violations of these Terms.",
      "16.3 CreatorsRewards is not responsible for downtime, outages, or third-party API disruptions.",
      "16.4 CreatorsRewards operates as a neutral technology platform connecting brands with creators. We do not independently verify the legality of any brand’s business, products, or services, and permitting your use of the Platform does not constitute endorsement of your regulatory status.",
    ],
    list: [],
  },
  {
    id: "17",
    title: "17. Dispute Resolution",
    content: [
      "17.1 Contact our support team first at contact@creatorsrewards.net. We will attempt to resolve all disputes within 30 days.",
      "17.2 If informal resolution fails, disputes will be resolved through Nigerian courts in accordance with Nigerian law.",
      "17.3 You agree to bring claims only in your individual capacity and not as a participant in any class or representative proceeding.",
    ],
    list: [],
  },
  {
    id: "18",
    title: "18. Termination",
    content: [
      "18.1 CreatorsRewards may terminate your access immediately for: violating these Terms; uploading harmful, illegal, or infringing content; manipulating creators or the Platform; or fraudulent behaviour.",
      "18.2 Upon termination: all active campaigns end immediately; your account access is revoked; creator payouts for approved submissions remain subject to fraud review and will be honoured where valid.",
      "18.3 The following sections survive termination: Sections 5, 6, 9, 12, 15, 16, 19, 20, and 21.",
    ],
    list: [],
  },
  {
    id: "19",
    title: "19. Limitation of Liability",
    content: [
      "19.1 The Platform is provided “AS IS” without warranties of any kind, express or implied.",
      "19.2 CreatorsRewards’ total liability to you shall not exceed the total amounts paid by you to CreatorsRewards in the 12 months preceding the claim.",
      "19.3 CreatorsRewards shall not be liable for brand-creator disputes where campaign requirements were not properly documented within the Platform.",
    ],
    list: [],
  },
  {
    id: "20",
    title: "20. Indemnification",
    content: [
      "You agree to indemnify, defend, and hold harmless CreatorsRewards, its officers, employees, and agents from any and all claims, damages, losses, liabilities, costs, and expenses (including legal fees) arising from: (a) your campaigns and campaign content; (b) your violation of these Terms; (c) your failure to comply with any applicable Nigerian or international law, regulation, or licensing requirement; (d) any claim that your business, products, or services are unlawful in any jurisdiction; (e) your failure to comply with any third-party platform’s terms and conditions; or (f) any third-party claim arising from content created, posted, or promoted in connection with your campaigns. This obligation survives termination of your account.",
    ],
    list: [],
  },
  {
    id: "21",
    title: "21. Governing Law",
    content: [
      "These Terms of Service are governed by and construed in accordance with the laws of the Federal Republic of Nigeria, including the Nigeria Data Protection Regulation (NDPR). Any disputes arising under these Terms that cannot be resolved informally shall be subject to the jurisdiction of Nigerian courts.",
    ],
    list: [],
  },
  {
    id: "22",
    title: "22. Changes to These Terms",
    content: [
      "22.1 CreatorsRewards may update these Terms at any time. When material changes are made, we will notify registered brands via email and in-platform notification.",
      "22.2 Your continued use of the Platform after changes are posted constitutes acceptance of the updated Terms.",
    ],
    list: [],
  },
  {
    id: "acknowledgment",
    title: "Acknowledgment",
    content: ["By using CreatorsRewards, you acknowledge that:"],
    list: [
      "You have read and agree to these Terms",
      "All campaign requirements must be documented within the Platform to be enforceable",
      "You may only reject creator submissions based on requirements explicitly stated in the campaign brief",
      "By default, you may repost and redistribute creator content organically but may not use it in paid advertisements unless explicitly stated in the campaign brief",
      "You may not engage creators you met on the Platform directly outside of CreatorsRewards for 6 months (standard) or 12 months (retainer) after the last approved submission, and violation entitles CreatorsRewards to liquidated damages",
      "Campaign performance is not guaranteed",
      "These Terms are governed by Nigerian law",
      "These Terms may be updated at any time",
    ],
  },
];
