import type { TemplateModule, DocSection } from "../types";

export const codeOfConduct: TemplateModule = {
  meta: {
    id: "code-of-conduct",
    name: "Code of Conduct",
    categoryId: "hr",
    category: "HR & Workplace",
    country: ["IN", "US", "UK", "EU", "SG", "AU"],
    formats: ["pdf", "docx"],
    description: "Employee code of conduct and ethics policy. Covers professional behaviour, conflicts of interest, anti-bribery, data protection, social media, disciplinary process, and reporting obligations.",
    aliases: ["ethics policy", "employee conduct policy", "behavioural policy"],
    pages: 10,
    minutes: 10,
    new: true,
    status: "live",
  },
  groups: [
    {
      title: "Company details",
      fields: [
        { id: "coc_company_name", label: "Company name", type: "text", required: true, placeholder: "Acme Technologies Pvt Ltd" },
        { id: "coc_effective_date", label: "Policy effective date", type: "date", required: true },
        { id: "coc_ceo_name", label: "CEO / MD name (optional)", type: "text", placeholder: "Arjun Sharma" },
        { id: "coc_hr_name", label: "HR / Policy owner name", type: "text", placeholder: "Pooja Nair" },
        { id: "coc_hr_designation", label: "HR designation", type: "text", default: "Head — Human Resources" },
        { id: "coc_reporting_email", label: "Ethics reporting / whistleblower email", type: "email", placeholder: "ethics@company.com" },
      ],
    },
    {
      title: "Policy options",
      fields: [
        { id: "coc_anti_bribery", label: "Include Anti-Bribery & Corruption section?", type: "select", default: "yes", options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]},
        { id: "coc_social_media", label: "Include Social Media policy section?", type: "select", default: "yes", options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]},
        { id: "coc_gift_limit", label: "Maximum acceptable gift value (₹)", type: "number", default: "1000", placeholder: "1000" },
        { id: "coc_insider_trading", label: "Include Insider Trading / SEBI clause?", type: "select", default: "no", options: [
          { value: "yes", label: "Yes (for listed companies)" },
          { value: "no", label: "No" },
        ]},
      ],
    },
  ],
  render(e): DocSection[] {
    const blocks: DocSection[] = [];
    const company = e.coc_company_name || "[Company Name]";
    const effDate = e.coc_effective_date ? new Date(e.coc_effective_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Effective Date]";
    const giftLimit = e.coc_gift_limit ? `₹${Number(e.coc_gift_limit).toLocaleString("en-IN")}` : "₹1,000";

    blocks.push({ kind: "title", text: company.toUpperCase() });
    blocks.push({ kind: "divider" });
    blocks.push({ kind: "subtitle", text: "CODE OF CONDUCT AND ETHICS POLICY" });
    blocks.push({ kind: "spacer" });

    blocks.push({ kind: "kv", pairs: [
      { label: "Effective Date", value: effDate },
      { label: "Applies to", value: `All employees, directors, officers, contractors, and representatives of ${company}` },
      ...(e.coc_reporting_email ? [{ label: "Ethics Reporting Email", value: e.coc_reporting_email }] : []),
    ]});

    blocks.push({ kind: "divider" });

    if (e.coc_ceo_name) {
      blocks.push({ kind: "para", text: `Message from ${e.coc_ceo_name}, CEO/MD:\n\nOur reputation is built on trust — with our clients, partners, employees, and the communities we serve. This Code of Conduct sets out the standards of behaviour and ethics we expect from every person who represents ${company}. I ask each of you to read, understand, and commit to upholding these principles in everything we do.` });
    }

    const clauses: DocSection[] = [
      {
        kind: "clause", number: 1, title: "Purpose and Scope",
        text: `This Code of Conduct ("Code") establishes the standards of professional behaviour, ethics, and integrity expected of all employees, directors, officers, and contractors ("Personnel") of ${company}. This Code supplements, and does not replace, applicable laws and the Company's specific policies. In case of any conflict between this Code and applicable law, the law prevails.`,
      },
      {
        kind: "clause", number: 2, title: "Professional Conduct",
        text: "All Personnel are expected to: (a) act with honesty, integrity, and fairness in all business dealings; (b) treat colleagues, clients, and stakeholders with respect and dignity; (c) not engage in discrimination, bullying, harassment, or intimidation of any kind; (d) maintain punctuality, meet professional commitments, and deliver work to the agreed standard; (e) comply with all company policies, procedures, and applicable laws; (f) preserve company assets and resources and not use them for personal benefit.",
      },
      {
        kind: "clause", number: 3, title: "Conflicts of Interest",
        text: "Personnel must avoid situations where their personal interests conflict with the interests of the Company. A conflict of interest arises when: (a) an employee or their close family member has a financial interest in a competitor, supplier, or client; (b) an employee uses company information or position for personal gain; (c) an employee receives undisclosed benefits from a third party. All actual or potential conflicts of interest must be disclosed promptly in writing to the immediate manager and HR.",
      },
      {
        kind: "clause", number: 4, title: "Gifts, Entertainment and Hospitality",
        text: `Accepting or offering gifts, entertainment, or hospitality that could improperly influence business decisions is prohibited. Personnel may accept modest, infrequent gifts of genuine nominal value not exceeding ${giftLimit} per occasion. Gifts of cash or cash equivalents (gift cards, vouchers) are strictly prohibited. All gifts received above ${giftLimit} in value must be reported to HR and may be donated to charity or surrendered to the Company.`,
      },
    ];

    clauses.forEach(c => blocks.push(c));

    let clauseNum = 5;

    if (e.coc_anti_bribery === "yes") {
      blocks.push({
        kind: "clause", number: clauseNum++, title: "Anti-Bribery and Corruption",
        text: `${company} has a zero-tolerance policy towards bribery and corruption. Personnel must not, directly or indirectly: (a) offer, promise, give, request, or accept a bribe in any form — including cash, gifts, kickbacks, or any other benefit; (b) make or receive facilitation payments; (c) engage any intermediary to make payments that would themselves be prohibited under this Code. This applies in dealings with government officials and private persons alike. Violations may constitute criminal offences under the Prevention of Corruption Act, 1988 (India), UK Bribery Act 2010, or Foreign Corrupt Practices Act (US), as applicable.`,
      });
    }

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Confidentiality and Data Protection",
      text: `Personnel shall maintain strict confidentiality of all proprietary, technical, financial, and personal information obtained in the course of employment. This obligation continues after termination of employment. Personnel must handle personal data in compliance with applicable data protection laws including the Digital Personal Data Protection Act, 2023 (India) and/or GDPR (EU/UK) as applicable. Personnel must not access, use, or disclose personal data beyond what is required for legitimate business purposes.`,
    });

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Use of Company Assets and IT Resources",
      text: "Company assets — including IT equipment, software, networks, data, and intellectual property — are for business use. Incidental personal use is permitted provided it does not: (a) interfere with work; (b) involve illegal or inappropriate content; (c) compromise security. Personnel must not install unauthorised software, bypass security controls, or access systems without authorisation. Emails and files on company systems may be monitored for security and compliance purposes.",
    });

    if (e.coc_social_media === "yes") {
      blocks.push({
        kind: "clause", number: clauseNum++, title: "Social Media and Public Communications",
        text: "Personnel may use personal social media but must not: (a) post content that defames, harasses, or disparages the Company, its clients, partners, or colleagues; (b) share confidential business information, client names, financial data, or internal matters; (c) claim to speak on behalf of the Company without authorisation; (d) post discriminatory, offensive, or illegal content. Only designated spokespersons may make public statements or media comments on behalf of the Company.",
      });
    }

    if (e.coc_insider_trading === "yes") {
      blocks.push({
        kind: "clause", number: clauseNum++, title: "Insider Trading and SEBI Compliance",
        text: "Personnel who have access to Unpublished Price Sensitive Information (UPSI) about the Company or any listed entity must comply with the SEBI (Prohibition of Insider Trading) Regulations, 2015. Insider trading is a serious criminal offence. Personnel must not trade in securities of the Company during trading restriction windows and must comply with the Company's Insider Trading Code.",
      });
    }

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Reporting Violations and Whistleblower Protection",
      text: `Any Personnel who becomes aware of a suspected or actual violation of this Code, or any applicable law, must report it promptly${e.coc_reporting_email ? ` to ${e.coc_reporting_email}` : " to their manager or HR"}. Reports may be made anonymously where the reporting channel supports it. The Company prohibits retaliation against any person who, in good faith, reports a concern or participates in an investigation. Whistleblowers will be protected from adverse employment consequences for bona fide reports.`,
    });

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Disciplinary Action",
      text: "Violations of this Code may result in disciplinary action up to and including termination of employment, and in serious cases, referral to law enforcement authorities. The severity of the disciplinary action will depend on the nature and seriousness of the violation, the employee's seniority, and whether the violation was intentional.",
    });

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Acknowledgement and Updates",
      text: "All Personnel are required to sign an acknowledgement confirming they have read and understood this Code. The Code will be reviewed annually and updated as necessary. Personnel will be notified of material updates and may be required to re-acknowledge.",
    });

    blocks.push({ kind: "divider" });
    blocks.push({ kind: "para", text: `This Code of Conduct has been adopted by ${company} and is effective from ${effDate}.` });

    blocks.push({ kind: "signatures", parties: [
      { role: e.coc_hr_designation || "Head — Human Resources", name: e.coc_hr_name || company },
      { role: "Employee Acknowledgement", name: `[Employee Name]\nDate: _______________` },
    ]});

    blocks.push({ kind: "footer", text: `${company} — Code of Conduct · Generated by Lekha · elevana.guru` });
    return blocks;
  },
};
