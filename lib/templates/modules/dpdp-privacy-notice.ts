import type { TemplateModule, DocSection } from "../types";

export const dpdpPrivacyNotice: TemplateModule = {
  meta: {
    id: "dpdp-privacy-notice",
    name: "DPDP Privacy Notice",
    categoryId: "compliance",
    category: "Compliance",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Privacy Notice compliant with the Digital Personal Data Protection Act, 2023 (DPDP Act). Covers categories of data collected, purposes, consent, data principals' rights, and grievance redressal.",
    aliases: ["data privacy", "DPDP", "privacy policy", "data protection notice", "DPDP Act privacy policy"],
    pages: 6,
    minutes: 10,
    new: true,
    status: "live",
  },
  groups: [
    {
      title: "Data Fiduciary (Organisation) details",
      fields: [
        { id: "dp_org_name", label: "Organisation / company name (Data Fiduciary)", type: "text", required: true, placeholder: "Acme Technologies Pvt Ltd" },
        { id: "dp_org_addr", label: "Registered office address", type: "textarea", rows: 2 },
        { id: "dp_website", label: "Website URL", type: "text", placeholder: "https://www.acmetechnologies.in" },
        { id: "dp_effective_date", label: "Notice effective date", type: "date", required: true },
        { id: "dp_dpo_name", label: "Data Protection Officer / Grievance Officer name", type: "text", placeholder: "Priya Sharma" },
        { id: "dp_dpo_email", label: "DPO / Grievance Officer email", type: "email", required: true, placeholder: "privacy@acme.in" },
        { id: "dp_grievance_resolution_days", label: "Grievance resolution period (days)", type: "number", default: "30", placeholder: "30" },
      ],
    },
    {
      title: "Data processing details",
      fields: [
        { id: "dp_audience", label: "Primary audience / data principals", type: "select", required: true, default: "customers", options: [
          { value: "customers", label: "Customers / end users" },
          { value: "employees", label: "Employees / job applicants" },
          { value: "both", label: "Both customers and employees" },
          { value: "website_visitors", label: "Website / app visitors" },
        ]},
        { id: "dp_collects_sensitive", label: "Sensitive personal data collected?", type: "select", default: "no", options: [
          { value: "yes", label: "Yes — financial, health, biometric, or special category data" },
          { value: "no", label: "No sensitive data collected" },
        ]},
        { id: "dp_children_data", label: "Process children's data (under 18)?", type: "select", default: "no", options: [
          { value: "yes", label: "Yes — verifiable parental consent required" },
          { value: "no", label: "No — services not directed at children" },
        ]},
        { id: "dp_cross_border", label: "Cross-border data transfers?", type: "select", default: "no", options: [
          { value: "yes", label: "Yes — data transferred outside India" },
          { value: "no", label: "No — data stays within India" },
        ]},
        { id: "dp_cross_border_countries", label: "Countries of cross-border transfer (if yes)", type: "text", placeholder: "United States, Singapore" },
        { id: "dp_retention_period", label: "General data retention period", type: "text", default: "As long as necessary for the stated purpose or as required by law", placeholder: "3 years from last interaction" },
      ],
    },
  ],
  render(e): DocSection[] {
    const blocks: DocSection[] = [];
    const org = e.dp_org_name || "[Organisation Name]";
    const effDate = e.dp_effective_date ? new Date(e.dp_effective_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Effective Date]";
    const dpoEmail = e.dp_dpo_email || "[DPO Email]";
    const grievanceDays = e.dp_grievance_resolution_days || "30";
    const retentionPeriod = e.dp_retention_period || "As long as necessary for the stated purpose or as required by law";

    blocks.push({
      kind: "info",
      title: "DPDP Act 2023 — Key Obligations",
      acts: [
        "Digital Personal Data Protection Act, 2023 (DPDP Act)",
        "Digital Personal Data Protection Rules, 2025 (when notified)",
        "Information Technology Act, 2000 — s.43A (Sensitive Personal Data Rules)",
        "SEBI, IRDA, RBI regulations — sector-specific data requirements",
      ],
      text: "The DPDP Act applies to processing of digital personal data in India, and to processing outside India if related to offering goods/services in India. Significant Data Fiduciaries will face heightened obligations. Consent must be free, specific, informed, unconditional, and unambiguous. Data principals have rights to access, correction, erasure, and grievance redressal.",
    });

    blocks.push({ kind: "title", text: "PRIVACY NOTICE" });
    blocks.push({ kind: "subtitle", text: `${org} — Digital Personal Data Protection Act, 2023` });
    if (e.dp_website) blocks.push({ kind: "subtitle", text: e.dp_website });
    blocks.push({ kind: "divider" });

    blocks.push({ kind: "kv", pairs: [
      { label: "Data Fiduciary", value: org },
      { label: "Effective Date", value: effDate },
      { label: "Grievance Officer", value: `${e.dp_dpo_name || org} | ${dpoEmail}` },
    ]});

    blocks.push({ kind: "divider" });

    const clauses: DocSection[] = [
      {
        kind: "clause", number: 1, title: "Who We Are",
        text: `${org}${e.dp_org_addr ? `, with its registered office at ${e.dp_org_addr},` : ""} is the Data Fiduciary as defined under the Digital Personal Data Protection Act, 2023 ("DPDP Act"). We are responsible for the personal data you share with us.`,
      },
      {
        kind: "clause", number: 2, title: "What Personal Data We Collect",
        text: `We collect personal data that you provide directly or that is generated through your interaction with our ${e.dp_audience === "website_visitors" ? "website or application" : "services"}. This may include: (a) Identity information — name, date of birth, government-issued ID details; (b) Contact information — email address, phone number, mailing address; (c) Account information — username, password (hashed), preferences; (d) Transaction and usage data — service usage, purchase history, log data; (e) Device and technical data — IP address, browser type, cookies; ${e.dp_collects_sensitive === "yes" ? "(f) Sensitive personal data — financial account details, health information, biometric data (collected only with explicit consent and for specific, disclosed purposes)." : "(f) We do not collect sensitive personal data such as financial account numbers, health records, or biometric data as a routine matter."}`,
      },
      {
        kind: "clause", number: 3, title: "Purposes of Processing",
        text: `We process your personal data for the following purposes: (a) to provide and operate our services; (b) to communicate with you about your account, transactions, and service updates; (c) to comply with legal and regulatory obligations; (d) to prevent fraud, abuse, and ensure security; (e) to improve our products and services through analytics (in aggregated, de-identified form); (f) to send marketing communications where you have given consent or there is a legitimate interest. We will not process your data for any purpose other than those for which it was collected without your consent or as required by law.`,
      },
      {
        kind: "clause", number: 4, title: "Consent",
        text: "Where we rely on your consent to process personal data, such consent will be: (a) free — not coerced; (b) specific — for a clearly specified purpose; (c) informed — with this Notice provided in advance; (d) unconditional — not bundled with unrelated services; (e) unambiguous — through a clear affirmative action. You have the right to withdraw your consent at any time. Withdrawal of consent does not affect the lawfulness of processing based on consent before its withdrawal.",
      },
      {
        kind: "clause", number: 5, title: "Legal Bases for Processing",
        text: "We process personal data on one or more of the following legal bases under the DPDP Act: (a) your consent; (b) legitimate uses permitted by the DPDP Act including employment, provision of services, legal obligation, research/statistics (with appropriate safeguards), medical emergencies; (c) compliance with court orders or statutory obligations.",
      },
      {
        kind: "clause", number: 6, title: "Data Sharing and Disclosure",
        text: `We may share personal data with: (a) Data Processors — third-party vendors who process data on our behalf under contractual safeguards; (b) Affiliates and subsidiaries — for group-wide services; (c) Law enforcement and regulatory authorities — when required by law or to protect legal rights; (d) Professional advisors — lawyers, auditors, under confidentiality obligations. We do not sell your personal data to third parties.`,
      },
    ];

    clauses.forEach(c => blocks.push(c));

    let clauseNum = 7;

    if (e.dp_cross_border === "yes") {
      blocks.push({
        kind: "clause", number: clauseNum++, title: "Cross-Border Data Transfers",
        text: `We may transfer personal data outside India to${e.dp_cross_border_countries ? ` ${e.dp_cross_border_countries}` : " other countries"} for the purposes described in this Notice. Such transfers are made only to countries or entities that provide an adequate level of protection as determined by the Central Government under the DPDP Act, or under appropriate contractual safeguards.`,
      });
    }

    if (e.dp_children_data === "yes") {
      blocks.push({
        kind: "clause", number: clauseNum++, title: "Children's Data",
        text: "Our services may be used by children under 18. We do not knowingly process children's personal data without verifiable parental or guardian consent. Where our services are directed at children, we implement age-verification and parental consent mechanisms as required under the DPDP Act. We will not process children's data for behavioural tracking or targeted advertising.",
      });
    }

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Data Retention",
      text: `We retain personal data only for as long as necessary to fulfil the purpose for which it was collected, or as required by applicable law. Our general retention period is: ${retentionPeriod}. After this period, personal data is securely deleted or anonymised.`,
    });

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Your Rights as a Data Principal",
      text: `Under the DPDP Act, you have the right to: (a) Access — obtain a summary of personal data processed and information about third parties with whom it has been shared; (b) Correction and Erasure — have inaccurate or incomplete data corrected, or request erasure where the purpose has been fulfilled or consent withdrawn; (c) Grievance Redressal — file a complaint with our Grievance Officer if your rights are not addressed; (d) Nominate — nominate another person to exercise rights on your behalf in case of death or incapacity. To exercise any right, please contact us at ${dpoEmail}.`,
    });

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Grievance Redressal",
      text: `If you have any complaint, concern, or query about the handling of your personal data, please contact our Grievance Officer: ${e.dp_dpo_name || org} at ${dpoEmail}. We will acknowledge your grievance within 48 hours and endeavour to resolve it within ${grievanceDays} days. If your grievance is not resolved to your satisfaction, you may approach the Data Protection Board of India.`,
    });

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Cookies and Tracking",
      text: "Our website and application may use cookies and similar tracking technologies to improve user experience and analyse usage. You may manage cookie preferences through your browser settings. Essential cookies required for the functioning of the website cannot be disabled.",
    });

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Updates to this Notice",
      text: "We may update this Privacy Notice from time to time. Material changes will be communicated via email or a prominent notice on our website. Continued use of our services after the update constitutes acceptance of the revised Notice.",
    });

    blocks.push({ kind: "divider" });
    blocks.push({ kind: "para", text: `Last updated: ${effDate}\nFor questions about this Privacy Notice, contact: ${dpoEmail}` });

    blocks.push({ kind: "footer", text: `${org} — Privacy Notice (DPDP Act 2023) · Generated by Lekha · elevana.guru` });
    return blocks;
  },
};
