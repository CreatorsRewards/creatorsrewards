export interface PrivacySubsection {
  title?: string;
  content?: string[];
  list?: string[];
}

export interface PrivacyLink {
  label: string;
  href: string;
}

export interface PrivacySection {
  id: string;
  title: string;
  content?: string[];
  list?: string[];
  subsections?: PrivacySubsection[];
  links?: PrivacyLink[];
}

export const privacyMeta = {
  companyName: "CreatorsRewards",
  website: "creatorsrewards.net",
  effectiveDate: "July 2026",
  contactEmail: "contact@creatorsrewards.net",
};

export const privacyIntro: string[] = [
  `CreatorsRewards ("we", "us", or "our") operates creatorsrewards.net and the CreatorsRewards platform (the "Platform"). This Privacy Policy explains how we collect, use, store, protect, and share your personal information when you use our Platform, whether as a creator (UGC Creator or Clipper), a brand, or a visitor to our website.`,
  `By registering on the Platform or using any of our services, you agree to the collection and use of your information in accordance with this Privacy Policy. If you do not agree, please do not use the Platform.`,
  `"Personally Identifiable Information" (PII) refers to any information that can be used on its own or with other information to identify, contact, or locate a single person. Please read this policy carefully to understand how we handle your PII.`,
];

export const privacySections: PrivacySection[] = [
  {
    id: "1",
    title: "1. Who This Policy Applies To",
    content: ["This Privacy Policy applies to:"],
    list: [
      "UGC Creators and Clippers who register and use the Platform",
      "Brands who register and manage campaigns on the Platform",
      "Visitors who browse creatorsrewards.net without registering",
    ],
  },
  {
    id: "2",
    title: "2. Information We Collect",
    content: ["We collect information in the following ways:"],
    subsections: [
      {
        title: "2.1 Information You Provide Directly",
        content: [
          "When you register on the Platform, apply to campaigns, submit content, or contact us, we may collect:",
        ],
        list: [
          "Full name and email address",
          "Country of residence",
          "Account role (UGC Creator, Clipper, or Brand)",
          "Social media handles, profile URLs, and platform follower counts",
          "Bank account details (for Naira payout processing)",
          "USDT wallet address (for international payout processing)",
          "Content files, links, and submissions uploaded to the Platform",
          "Screenshots and verification materials submitted for account verification",
          "Messages and communications sent through the Platform",
        ],
      },
      {
        title: "2.2 Information Collected via OAuth Integrations",
        content: [
          "When you connect your social media accounts to the Platform via OAuth (TikTok, Instagram, YouTube, Snapchat), we collect:",
        ],
        list: [
          "Confirmation of social account ownership",
          "Post performance data — including views, reach, and engagement metrics — for posts submitted as part of campaigns",
          "We do not access your private messages, contacts, or any data beyond what is necessary to verify account ownership and track campaign performance",
        ],
      },
      {
        title: "2.3 Information Collected Automatically",
        content: [
          "When you visit or use the Platform, we may automatically collect:",
        ],
        list: [
          "IP address and approximate location",
          "Browser type and device information",
          "Pages visited, time spent on pages, and navigation patterns",
          "Cookies and similar tracking technologies (see Section 7)",
        ],
      },
    ],
  },
  {
    id: "3",
    title: "3. How We Use Your Information",
    content: ["We use the information we collect for the following purposes:"],
    list: [
      "To create and manage your account on the Platform",
      "To verify your identity and confirm ownership of connected social media accounts",
      "To match creators with relevant campaigns based on their platform, content type, and profile",
      "To track and verify campaign performance — including views, post counts, and submission metrics — for payout calculation",
      "To process payouts via Naira bank transfer or USDT wallet, as applicable",
      "To send transactional notifications including account approval, campaign updates, submission status changes, and payout confirmations",
      "To notify you of new campaigns that match your creator profile",
      "To display your creator reputation score and campaign count to brands reviewing your applications",
      "To resolve disputes between creators and brands",
      "To improve the Platform and develop new features",
      "To comply with applicable laws and regulations, including the Nigeria Data Protection Regulation (NDPR)",
    ],
  },
  {
    id: "4",
    title: "4. How We Share Your Information",
    content: [
      "We do not sell, trade, or rent your personally identifiable information to third parties.",
      "We may share your information in the following limited circumstances:",
    ],
    subsections: [
      {
        title: "4.1 With Brands",
        content: [
          "When you apply to or participate in a campaign, the brand running that campaign may see your creator profile, reputation score, campaign count, submitted content, and post performance data. Brands do not have access to your bank details or wallet address.",
        ],
      },
      {
        title: "4.2 With Payment Processors",
        content: [
          "To process Naira payouts, we share your bank account details with our Nigerian payment processor. To process USDT payouts, your wallet address is used by our internal team to execute transfers. We do not store your bank or wallet details beyond what is necessary for payment processing.",
        ],
      },
      {
        title: "4.3 With Service Providers",
        content: [
          "We work with trusted third-party service providers who assist in operating the Platform, including cloud storage, email delivery, authentication, and background job processing. These providers are contractually required to handle your data securely and only for the purposes we specify.",
        ],
      },
      {
        title: "4.4 For Legal Compliance",
        content: [
          "We may disclose your information where required by law, regulation, or a valid legal process, or to protect the rights, property, or safety of CreatorsRewards, our users, or the public.",
        ],
      },
    ],
  },
  {
    id: "5",
    title: "5. Data Retention",
    content: [
      "We retain your personal information for as long as your account is active or as needed to provide you with our services. If you request account deletion:",
    ],
    list: [
      "Any pending earnings balance will be processed or resolved by our admin team before deletion is completed",
      "Your account data will be deleted within 30 days of the deletion request being processed",
      "We may retain certain records for longer periods where required by law or for legitimate business purposes such as fraud prevention and financial record-keeping",
    ],
  },
  {
    id: "6",
    title: "6. How We Protect Your Information",
    content: [
      "We take the security of your personal information seriously and implement the following measures:",
    ],
    list: [
      "All data is transmitted over HTTPS/TLS encrypted connections",
      "Passwords are stored as hashed values — never in plaintext",
      "Bank account details and USDT wallet addresses are encrypted at rest",
      "Access to personal data is restricted to authorised personnel only, on a need-to-know basis",
      "Uploaded files are scanned for malware before storage",
      "Admin actions are logged with timestamps and actor IDs for accountability",
      "Two-factor authentication is required for all admin accounts",
      "The Platform is regularly scanned for security vulnerabilities",
    ],
  },
  {
    id: "6b",
    title: "",
    content: [
      "While we implement industry-standard security measures, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but we are committed to protecting your information to the best of our ability.",
    ],
  },
  {
    id: "7",
    title: "7. Cookies",
    content: [
      "We use cookies and similar tracking technologies to improve your experience on the Platform. Cookies are small files stored on your device that help us:",
    ],
    list: [
      "Keep you logged in during your session",
      "Remember your preferences for future visits",
      "Understand how users interact with the Platform so we can improve it",
      "Compile aggregate data about site traffic and usage patterns",
    ],
  },
  {
    id: "8",
    title: "8. OAuth & Third-Party Platform Integrations",
    content: [
      "The Platform integrates with TikTok, Instagram, YouTube, and Snapchat via OAuth to verify creator account ownership and track campaign performance. By connecting your social accounts:",
    ],
    list: [
      "You authorise CreatorsRewards to access and retrieve post performance data for content submitted as part of campaigns",
      "You confirm that you are the legitimate owner of the connected accounts",
      "You can disconnect your social accounts from the Platform at any time via your profile settings",
    ],
  },
  {
    id: "9",
    title: "9. Your Rights",
    content: [
      "Depending on your location, you may have the following rights regarding your personal information:",
    ],
    list: [
      "Right to access — you can request a copy of the personal data we hold about you",
      "Right to correction — you can update or correct your personal information via your account settings or by contacting us",
      "Right to deletion — you can request that we delete your account and associated personal data, subject to any legal obligations or pending balances",
      "Right to object — you can object to certain uses of your data, including marketing communications",
      "Right to data portability — you can request your data in a portable format where applicable",
    ],
  },
  {
    id: "10",
    title: "10. Nigeria Data Protection Regulation (NDPR) Compliance",
    content: [
      "CreatorsRewards is committed to complying with the Nigeria Data Protection Regulation (NDPR). In accordance with the NDPR:",
    ],
    list: [
      "We collect and process personal data only for legitimate, specific, and lawful purposes",
      "We do not collect more personal data than is necessary for the purposes stated in this policy",
      "We take reasonable steps to ensure that personal data we hold is accurate and up to date",
      "We implement appropriate technical and organisational measures to protect personal data against unauthorised access, loss, or destruction",
      "In the event of a data breach that is likely to result in risk to your rights and freedoms, we will notify you and the relevant supervisory authority within the timeframes required by law",
    ],
  },
  {
    id: "11",
    title: "11. Children's Privacy",
    content: [
      "The Platform is not directed at or intended for use by individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13 without parental consent, we will take steps to delete that information promptly.",
    ],
  },
  {
    id: "12",
    title: "12. Data Breach Notification",
    content: [
      "In the event of a data breach that affects your personal information, we will:",
    ],
    list: [
      "Notify affected users via email within 1 business day of confirming the breach",
      "Post an in-platform notification within 1 business day",
      "Report the breach to the relevant regulatory authority as required by applicable law",
    ],
  },
  {
    id: "13",
    title: "13. Do Not Track",
    content: [
      "We honour Do Not Track (DNT) signals from your browser. When a DNT signal is detected, we will not plant cookies or use tracking technologies for advertising or behavioural profiling purposes.",
    ],
  },
  {
    id: "14",
    title: "14. Email Communications",
    content: [
      "We send transactional emails related to your use of the Platform, including account notifications, campaign updates, submission status changes, and payout confirmations. We may also send platform announcements and product updates.",
      "In all our email communications, we commit to:",
    ],
    list: [
      "Never using false or misleading subject lines or sender addresses",
      "Clearly identifying the purpose of each email",
      "Honouring unsubscribe requests promptly",
      "Including an unsubscribe option in all non-transactional emails",
    ],
  },
  {
    id: "14b",
    title: "",
    content: [
      "To unsubscribe from non-transactional emails, click the unsubscribe link at the bottom of any email or contact us at contact@creatorsrewards.net.",
    ],
  },
  {
    id: "15",
    title: "15. Changes to This Privacy Policy",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or Platform features. When we make material changes, we will:",
    ],
    list: [
      'Update the "Last Updated" date at the top of this policy',
      "Notify registered users via email and in-platform notification",
    ],
  },
  {
    id: "15b",
    title: "",
    content: [
      "Your continued use of the Platform after any changes constitutes your acceptance of the updated Privacy Policy. We encourage you to review this policy periodically.",
    ],
  },
  {
    id: "16",
    title: "16. Contact Us",
    content: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal information, please contact us:",
      "CreatorsRewards",
    ],
    links: [
      {
        label: "Email: contact@creatorsrewards.net",
        href: "mailto:contact@creatorsrewards.net",
      },
    ],
  },
];
