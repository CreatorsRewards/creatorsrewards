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
  'Welcome to CreatorsRewards, operated by CreatorsRewards ("we", "us", or "our"). By registering, connecting your social media accounts, or participating in any campaign on creatorsrewards.net (the "Platform"), you agree to these Terms of Service ("Terms"). If you do not agree, do not use the Platform.',
  '"Creator" refers to any UGC Creator or Clipper registered on the Platform. These Terms apply to all Creators regardless of role.',
];

export const termsSections: TermsSection[] = [
  {
    id: "1",
    title: "1. Eligibility",
    content: [
      "1.1 You must be 18 years of age or older to use the Platform independently.",
      "1.2 Users between the ages of 13 and 17 may use the Platform with verified parental or guardian consent. A parent or legal guardian must create the account on behalf of the minor, agree to these Terms, and assume full responsibility for all activity under that account. The parent or legal guardian is bound by these Terms as if they were the Creator, including all provisions regarding content, payouts, indemnification, and liability. CreatorsRewards reserves the right to request additional verification of parental consent at any time and to suspend accounts where consent cannot be verified.",
      "1.3 You must use your real social media accounts. Fake identities, duplicate accounts, or accounts created to cheat metrics or payouts are prohibited.",
      "1.4 You must provide accurate and complete information when registering on the Platform.",
      "1.5 By using the Platform, you represent and warrant that all content you create and post in connection with any campaign complies with: (a) all applicable Nigerian laws and regulations, including the Nigeria Data Protection Regulation (NDPR); and (b) the terms and conditions of any social media platform on which you post content.",
      "1.6 It is solely your responsibility to ensure your participation in campaigns does not violate any applicable law, regulation, or social media platform policy. CreatorsRewards does not verify the legality of any campaign or brand, and permitting your participation does not constitute legal advice or endorsement of any brand's regulatory status.",
    ],
    list: [],
  },
  {
    id: "2",
    title: "2. Your Account",
    content: [
      "2.1 You are responsible for maintaining the confidentiality of your login credentials and for all activity conducted under your account.",
      "2.2 You may select one Creator role at signup — UGC Creator or Clipper. You may not hold both roles simultaneously.",
      "2.3 You may not transfer, sell, or assign your account to any other person or entity.",
      "2.4 If we detect suspicious activity, compromised credentials, or policy violations, we may suspend or remove your account without prior notice.",
    ],
    list: [],
  },
  {
    id: "3",
    title: "3. Platform Verification",
    content: [
      "3.1 All Creators must pass platform-level verification (Gate 1) before accessing campaigns. Verification confirms that you are the legitimate owner of the social media accounts connected to your profile.",
      "3.2 Verification is completed by connecting your social accounts via OAuth. If OAuth is unavailable, you may submit a screenshot of your profile or post a platform-provided verification code on your account for manual review by our admin team.",
      "3.3 You are permitted one resubmission if your initial verification is rejected. After two failed verification attempts, your account will be permanently locked and you may not register a new account using the same email address.",
      "3.4 Submitting false or misleading verification materials constitutes fraud and will result in immediate permanent account termination and forfeiture of all earnings.",
    ],
    list: [],
  },
  {
    id: "4",
    title: "4. Zero Tolerance: Fraud, Botting, and Invalid Activity",
    content: [
      "4.1 The following actions result in a PERMANENT BAN with NO APPEAL and forfeiture of ALL pending and earned payouts:",
      "4.2 CreatorsRewards reserves the right to:",
      "4.3 Upon issuing a permanent ban, CreatorsRewards reserves the right to permanently blacklist all social media accounts connected to the banned Creator. Blacklisted accounts may not be used to create new CreatorsRewards accounts or participate in any campaigns, even if connected to a different email address or identity.",
      "4.4 Any attempt to circumvent a ban by creating new accounts or using alternate social media accounts will result in immediate termination and forfeiture of all earnings.",
    ],
    list: [
      "Botting views, engagement, or any performance metric",
      "Buying followers, likes, comments, shares, or views",
      "Automating posting or engagement through any third-party tool",
      "Faking, manipulating, or misrepresenting performance data",
      "Participating in engagement pods or view manipulation schemes",
      "Multi-posting the same content solely to farm payouts",
      "Using collaborative post features (e.g. Instagram Collab Reels or similar) to attribute a single video's views to multiple accounts and submitting the same content or views more than once for payout",
      "Collaborating with inactive, dormant, or newly created accounts to duplicate view counts or engagement metrics from a single piece of content",
      "Any scheme designed to artificially inflate performance metrics or circumvent fraud detection",
      "Flag, pause, or remove submissions or accounts for suspected invalid activity",
      "Zero out or reverse earnings derived from invalid activity",
      "Suspend or terminate accounts that attempt to circumvent fraud detection",
    ],
  },
  {
    id: "5",
    title: "5. Creator Reputation Score",
    content: [
      "5.1 CreatorsRewards maintains an auto-calculated Reputation Score for each Creator. This score influences campaign access, application visibility to brands, and payout priority.",
      "5.2 Reputation Score is calculated based on: total campaigns completed, submission approval rate, revision request rate, and rejection rate.",
      "5.3 Factors that may increase your Reputation Score include: high approval rates, volume of approved submissions, consistent on-brief submissions, and platform activity.",
      "5.4 Factors that may decrease your Reputation Score include: rejected submissions, revision requests, policy violations, and extended periods of inactivity.",
      "5.5 Your Reputation Score and campaign count are visible to brands when reviewing your campaign applications.",
      "5.6 New Creators with no submission history will display a 'New Creator' status in place of a score.",
      "5.7 The Reputation Score formula, weights, and thresholds are proprietary to CreatorsRewards and may be updated at any time without notice.",
    ],
    list: [],
  },
  {
    id: "6",
    title: "6. Content Ownership and Licensing",
    content: [
      "6.1 UGC Creators retain ownership of original content they produce for campaigns unless the campaign brief explicitly states otherwise.",
      "6.2 By submitting content to a campaign, you grant the brand a worldwide, royalty-free license to repost and redistribute your content organically. This license does not include the right to use your content in paid advertisements unless the campaign brief explicitly grants that right.",
      "6.3 For Clipper campaigns where the brand provided the original content assets (templates, long-form footage, scripts, or other materials), the brand retains ownership of the final edited clip.",
      "6.4 By submitting any content to the Platform, you grant CreatorsRewards a worldwide, royalty-free license to host, display, and use your content for platform operations, reporting, and promotional purposes.",
      "6.5 You confirm that all content you submit is your own original work or that you have full rights to use it, and that it does not infringe on any third-party intellectual property rights.",
      "6.6 You may use content you create in your personal portfolio unless the campaign brief explicitly restricts portfolio use.",
    ],
    list: [],
  },
  {
    id: "7",
    title: "7. Campaign Rules",
    content: [
      "7.1 All campaign instructions must be followed exactly as specified in the campaign brief within the CreatorsRewards Platform.",
      "7.2 All campaign requirements, deliverables, content guidelines, and approval criteria must be documented within the Platform to be enforceable. Requirements communicated solely through external channels — including WhatsApp, email, Discord, or any medium outside the Platform — are not enforceable and do not constitute valid campaign requirements.",
      "7.3 If your content is removed by TikTok, Instagram, YouTube, Snapchat, or any other platform for policy violations, it becomes ineligible for payout.",
      "7.4 UGC Creators must complete two submission stages: Stage 1 (content submission for review and approval) and Stage 2 (submission of the live social media link after posting approved content). Payouts are only triggered after both stages are successfully completed and approved.",
      "7.5 Clippers must submit the live link to their posted clip. Performance data is pulled automatically via OAuth. If OAuth tracking fails, admin may manually enter performance data.",
      "7.6 Each Creator is permitted a maximum of 5 submission attempts per campaign (1 initial submission plus 4 resubmissions). After 5 attempts, the submission form is permanently locked for that campaign.",
      "7.7 CreatorsRewards and brands may pause or remove campaigns at any time in accordance with platform rules.",
    ],
    list: [],
  },
  {
    id: "8",
    title: "8. Views-Based Campaigns",
    content: [
      "8.1 Some campaigns operate on a views-based model with a total views cap. When the collective views across all participating Creators reach the campaign cap, the campaign closes automatically.",
      "8.2 Each campaign sets a minimum views threshold. The platform minimum is 1,000 views. Campaigns may set a higher minimum at the brand's discretion.",
      "8.3 Creators who do not meet the campaign's minimum views threshold by the campaign end date will not receive a payout. Their submission status will be updated to [Not Qualified].",
      "8.4 For campaigns that allow multiple posts, views accumulate across all of a Creator's approved posts toward the minimum threshold.",
      "8.5 Views are tracked automatically via OAuth. Views are locked at the campaign end date. Views accumulated after campaign closure are not counted.",
      "8.6 If a Creator deletes a post after views have been tracked, the last tracked view count is retained. CreatorsRewards admin will determine the outcome on a case-by-case basis.",
    ],
    list: [],
  },
  {
    id: "9",
    title: "9. Payouts",
    content: [
      "9.1 Naira Payouts: Earnings from Naira campaigns accumulate in your Naira balance. Payouts are processed automatically every Monday if your balance is ₦5,000 or above. Balances below ₦5,000 roll over to the following Monday automatically.",
      "9.2 USDT Payouts: Earnings from international campaigns accumulate in your USDT balance. USDT payouts are not automatic. You must submit a manual withdrawal request through the Platform. The minimum withdrawal amount is $10. Withdrawals are processed by our admin team to your submitted wallet address.",
      "9.3 You are responsible for providing accurate bank account details (Naira) and wallet addresses (USDT). CreatorsRewards is not responsible for failed or misdirected payments resulting from incorrect details.",
      "9.4 CreatorsRewards may withhold, delay, or adjust payouts if fraud, botting, or policy violations are suspected.",
      "9.5 Payout amounts shown are provisional until fraud checks and admin review are complete.",
      "9.6 In the event of a payout failure due to a platform or processor error, CreatorsRewards will retain your balance and retry the payment in the next available payout cycle. You will be notified of any payout failure.",
    ],
    list: [],
  },
  {
    id: "10",
    title: "10. Campaign Pull and Closure",
    content: [
      "10.1 Brands may request to withdraw a campaign from the Platform. Pull requests must be submitted a minimum of 7 days before the campaign end date. Pull requests submitted with less than 7 days remaining will be rejected.",
      "10.2 If a campaign is pulled while you have a pending submission, your submission will still be reviewed. If approved prior to campaign closure, your payout will be honoured.",
      "10.3 Campaigns close automatically when: the campaign end date is reached, the total views cap is hit (views-based campaigns), or the approved post count limit is reached (where applicable).",
    ],
    list: [],
  },
  {
    id: "11",
    title: "11. Prohibited Behaviour",
    content: [
      "11.1 You may not:",
      "11.2 Any violation may result in immediate account termination and forfeiture of all pending payouts.",
    ],
    list: [
      "Harass, threaten, or abuse other users, brands, or CreatorsRewards staff",
      "Impersonate any person, brand, or entity",
      "Post illegal, explicit, or infringing content",
      "Upload copyrighted material you do not have the rights to use",
      "Hack, reverse engineer, or interfere with Platform functionality",
      "Solicit brands to work with you outside the Platform",
      "Submit the same post URL to more than one campaign",
      "Misrepresent your audience demographics, follower counts, or platform metrics",
    ],
  },
  {
    id: "12",
    title: "12. Non-Circumvention",
    content: [
      "12.1 Following any completed campaign participation — defined as an approved submission with a payout issued — Creators may not engage in, accept, or enter into any direct paid business relationship with that brand outside of CreatorsRewards for content creation, UGC production, or influencer marketing services of the type performed on the Platform.",
      "12.2 The restricted period is:",
      "12.3 Browsing campaigns, applying, or messaging that does not result in an approved submission does not trigger this restriction.",
      "12.4 Violation of this clause entitles CreatorsRewards to liquidated damages equal to the greater of ₦500,000 or 2x the platform fees that would have been owed on the circumvented transaction.",
      "12.5 You acknowledge that this restriction is reasonable and necessary to protect CreatorsRewards' business interests and the integrity of the Platform.",
    ],
    list: [
      "6 months from the date of the last approved submission for standard campaigns",
      "12 months from the date of the last approved deliverable for retainer campaigns",
    ],
  },
  {
    id: "13",
    title: "13. Dispute Resolution",
    content: [
      "13.1 If you have a dispute regarding a submission rejection, payout, or campaign outcome, contact our support team first via contact@creatorsrewards.net. We will attempt to resolve all disputes within 30 days.",
      "13.2 Disputes are first reviewed by a Customer Representative. Our admin team has final say on all dispute outcomes.",
      "13.3 If informal resolution fails, disputes will be resolved through Nigerian courts in accordance with Nigerian law.",
      "13.4 You agree to bring claims only in your individual capacity and not as a participant in any class or representative proceeding.",
    ],
    list: [],
  },
  {
    id: "14",
    title: "14. Appeals",
    content: [
      "14.1 Creators have the right to appeal:",
      "14.2 Appeals must be submitted through the Platform within 14 days of the relevant action.",
      "14.3 CreatorsRewards will respond to all appeals within 10 business days.",
      "14.4 Permanent bans issued under Section 4 (fraud and botting) are not eligible for appeal.",
      "14.5 CreatorsRewards' final decision after appeal is binding.",
    ],
    list: [
      "Submission rejections",
      "Account suspensions (excluding permanent bans issued under Section 4)",
      "Payout disputes",
      "Not Qualified determinations on views-based campaigns",
    ],
  },
  {
    id: "15",
    title: "15. Tax Responsibility",
    content: [
      "15.1 You are solely responsible for all taxes applicable to your earnings on the Platform, including any income tax, withholding tax, or VAT obligations under Nigerian law or the laws of your country of residence.",
      "15.2 CreatorsRewards may report earnings to relevant tax authorities as required by applicable law.",
      "15.3 CreatorsRewards is not responsible for any tax liabilities arising from your use of the Platform.",
    ],
    list: [],
  },
  {
    id: "16",
    title: "16. Data Usage and Privacy",
    content: [
      "16.1 By using the Platform, you grant CreatorsRewards a worldwide, royalty-free licence to collect, analyse, store, and use data generated through your use of the Platform, including performance metrics, submission history, earnings history, and content metadata.",
      "16.2 This data may be used for platform optimisation, fraud detection, aggregate reporting to brands, and other lawful business purposes.",
      "16.3 Your individual creator data — including your Reputation Score and campaign count — may be shared with brands as part of the campaign application process.",
      "16.4 Your personal data is handled in accordance with our Privacy Policy and the Nigeria Data Protection Regulation (NDPR). Please review our Privacy Policy at creatorsrewards.net.",
    ],
    list: [],
  },
  {
    id: "17",
    title: "17. Platform Access and Changes",
    content: [
      "17.1 CreatorsRewards may update, change, pause, or remove any feature of the Platform at any time.",
      "17.2 CreatorsRewards may remove your submissions or content for any reason, including policy violations or campaign closure.",
      "17.3 CreatorsRewards may terminate accounts for any violation of these Terms.",
      "17.4 We are not responsible for downtime, outages, or third-party API issues including OAuth platform disruptions.",
    ],
    list: [],
  },
  {
    id: "18",
    title: "18. Limitation of Liability",
    content: [
      '18.1 The Platform is provided "AS IS" without warranties of any kind, express or implied.',
      "18.2 CreatorsRewards shall not be liable for indirect, incidental, special, or consequential damages arising from your use of the Platform.",
      "18.3 CreatorsRewards shall not be liable for losses resulting from fraud clawbacks or invalid activity determinations.",
      "18.4 CreatorsRewards' total liability to you shall not exceed the total earnings paid to you in the 12 months preceding the claim.",
    ],
    list: [],
  },
  {
    id: "19",
    title: "19. Indemnification",
    content: [
      "You agree to indemnify, defend, and hold harmless CreatorsRewards, its officers, employees, and agents from any and all claims, damages, losses, liabilities, costs, and expenses (including legal fees) arising from: (a) your use of the Platform; (b) your violation of these Terms; (c) your content, including content posted to social media platforms in connection with any campaign; (d) your failure to comply with any applicable law or regulation; (e) your failure to comply with any social media platform's terms and conditions; or (f) any third-party claim arising from content you created or posted through the Platform. This obligation survives termination of your account.",
    ],
    list: [],
  },
  {
    id: "20",
    title: "20. Termination",
    content: [
      "20.1 CreatorsRewards may terminate your access immediately for:",
      "20.2 Upon termination: all pending payouts are forfeited; you lose access to the Platform and all campaigns; you may not return under a new account; your connected social media accounts may be permanently blacklisted.",
      "20.3 The following sections survive termination: Sections 4, 6, 9, 12, 13, 15, 16, 18, 19, and 21.",
    ],
    list: [
      "Violating these Terms",
      "Fraud, botting, or invalid activity (Section 4)",
      "Violating campaign rules",
      "Harassment or malicious activity",
    ],
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
      "22.1 CreatorsRewards may update these Terms at any time. When material changes are made, we will notify registered Creators via email and in-platform notification.",
      "22.2 Your continued use of the Platform after changes are posted constitutes acceptance of the updated Terms.",
    ],
    list: [],
  },
  {
    id: "acknowledgment",
    title: "Acknowledgment",
    content: ["By registering on CreatorsRewards, you acknowledge that:"],
    list: [
      "You have read and agree to these Terms",
      "You must be 18+ or have verified parental consent if aged 13-17",
      "Fraud, botting, and invalid activity result in permanent ban with no appeal and forfeiture of all earnings",
      "Brands may repost and redistribute your content but may not use it in paid advertisements unless explicitly stated in the campaign brief",
      "Your Reputation Score and campaign count are visible to brands reviewing your applications",
      "Payouts are subject to fraud checks and are provisional until validated",
      "You are solely responsible for all taxes on your earnings",
      "You may not work directly with brands you met on the Platform for 6 months (standard) or 12 months (retainer) after your last approved submission, and violation entitles CreatorsRewards to liquidated damages",
      "These Terms are governed by Nigerian law",
      "These Terms may be updated at any time",
    ],
  },
];
