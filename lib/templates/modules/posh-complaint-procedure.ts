// ============================================================
// POSH INTERNAL COMPLAINTS COMMITTEE (ICC) POLICY
// Drop into: /lib/templates/posh-complaint-procedure.ts
// Use case: Written policy document constituting an Internal
//           Complaints Committee (ICC) under the Sexual
//           Harassment of Women at Workplace (Prevention,
//           Prohibition and Rehabilitation) Act 2013 and
//           setting out the complaint, inquiry, and
//           redressal procedure.
// Statute refs: POSH Act 2013 (Act 14 of 2013);
//   POSH Rules 2013 (SH(PPWR) Rules); Vishaka Guidelines
//   (SC 1997 — basis for the Act); IPC ss.354, 509 (now
//   BNS 2023 equivalents); Companies Act 2013 (BRSR/
//   annual report disclosure); Labour laws — POSH compliance
//   required for all workplaces with ≥10 employees
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const poshComplaintProcedure: TemplateModule = {
  meta: {
    id: "posh-complaint-procedure",
    name: "POSH Policy & ICC Constitution",
    categoryId: "hr",
    category: "HR & Employment",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Prevention of Sexual Harassment at Workplace (POSH) policy and Internal Complaints Committee (ICC) constitution document as required under the POSH Act 2013. Covers definition of sexual harassment, committee composition, complaint procedure, inquiry process, penalties, and confidentiality obligations. Mandatory for all employers with 10 or more employees.",
    aliases: [
      "posh policy",
      "posh act policy",
      "internal complaints committee",
      "icc constitution",
      "sexual harassment policy",
      "prevention sexual harassment",
      "posh complaint procedure",
      "posh committee",
    ],
    pages: 6,
    minutes: 8,
    status: "live",
  },

  groups: [
    {
      title: "Organisation details",
      fields: [
        { id: "posh_org_name", label: "Organisation / employer name", type: "text", required: true, placeholder: "Acme Technologies Private Limited" },
        { id: "posh_org_addr", label: "Registered / principal office address", type: "textarea", rows: 2, required: true },
        { id: "posh_org_type", label: "Organisation type", type: "select", default: "private_co",
          options: [
            { value: "private_co", label: "Private limited company" },
            { value: "public_co", label: "Public limited company" },
            { value: "llp", label: "LLP / partnership" },
            { value: "startup", label: "Startup (DPIIT recognised)" },
            { value: "ngo", label: "NGO / society / trust" },
            { value: "proprietorship", label: "Proprietorship / MSME" },
          ],
        },
        { id: "posh_effective_date", label: "Policy effective date", type: "date", required: true },
        { id: "posh_policy_version", label: "Policy version", type: "text", placeholder: "v1.0 / 2024" },
      ],
    },
    {
      title: "ICC composition",
      fields: [
        { id: "posh_presiding_officer", label: "Presiding Officer name & designation", type: "text", required: true, placeholder: "Priya Sharma, VP — People" },
        { id: "posh_member_2", label: "ICC Member 2 — name & designation", type: "text", required: true, placeholder: "Anita Rao, Senior Manager — Engineering" },
        { id: "posh_member_3", label: "ICC Member 3 — name & designation", type: "text", placeholder: "Deepa Mehta, Deputy Manager — Finance" },
        { id: "posh_external_member", label: "External member name (NGO / advocate / social worker)", type: "text", required: true, placeholder: "Kavita Krishnan — Advocate, Bengaluru Bar Association" },
        { id: "posh_icc_email", label: "ICC dedicated email address", type: "email", placeholder: "icc@company.com" },
        { id: "posh_icc_term", label: "ICC term (years)", type: "select", default: "3",
          options: [
            { value: "3", label: "3 years" },
            { value: "2", label: "2 years" },
          ],
        },
      ],
    },
    {
      title: "Workplace scope and contact",
      fields: [
        { id: "posh_workplace_desc", label: "Workplace locations covered", type: "textarea", rows: 2, required: true, placeholder: "All offices, remote/work-from-home, client sites, off-site events, and any other location where Company work is performed" },
        {
          id: "posh_employee_count",
          label: "Approximate employee count",
          type: "select",
          default: "10_50",
          options: [
            { value: "10_50", label: "10–50 employees" },
            { value: "51_200", label: "51–200 employees" },
            { value: "201_500", label: "201–500 employees" },
            { value: "500_plus", label: "500+ employees" },
          ],
        },
        { id: "posh_nodal_officer", label: "Nodal officer / HR contact for POSH matters", type: "text", placeholder: "Sunita Patel, HR Manager — posh-hr@company.com" },
        { id: "posh_grievance_email", label: "Grievance / POSH email (if different from ICC email)", type: "email", placeholder: "grievance@company.com" },
      ],
    },
    {
      title: "Policy options",
      fields: [
        {
          id: "posh_includes_third_party",
          label: "Cover third-party harassment (clients, vendors, visitors)?",
          type: "radio",
          default: "yes",
          options: [
            { value: "yes", label: "Yes — extend policy to third-party perpetrators" },
            { value: "no", label: "No — employee-on-employee only" },
          ],
        },
        {
          id: "posh_remote_work",
          label: "Include virtual / remote workplace provisions (video calls, messaging)?",
          type: "radio",
          default: "yes",
          options: [
            { value: "yes", label: "Yes — include digital and virtual workplace harassment" },
            { value: "no", label: "No — physical workplace only" },
          ],
        },
        {
          id: "posh_gender_scope",
          label: "Gender scope of protection",
          type: "select",
          default: "all_genders",
          options: [
            { value: "women_only", label: "Women only (POSH Act minimum)" },
            { value: "all_genders", label: "All genders — extended protection (recommended)" },
          ],
        },
      ],
    },
  ],

  render(e) {
    const org = e.posh_org_name || "[Organisation]";
    const presiding = e.posh_presiding_officer || "[Presiding Officer]";
    const extMember = e.posh_external_member || "[External Member]";
    const iccEmail = e.posh_icc_email || "[icc@company.com]";
    const protectedClass = e.posh_gender_scope === "women_only" ? "women employees" : "all employees regardless of gender";

    const blocks: DocSection[] = [];

    blocks.push({ kind: "title", text: "PREVENTION OF SEXUAL HARASSMENT AT\nWORKPLACE (POSH) POLICY" });
    blocks.push({ kind: "subtitle", text: org + "\nVersion: " + (e.posh_policy_version || "v1.0") + "  |  Effective: [EFFECTIVE_DATE]" });

    blocks.push({
      kind: "info",
      title: "Legal Basis",
      acts: [
        "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Rehabilitation) Act 2013",
        "SH(PPWR) Rules 2013",
        "Vishaka Guidelines (Supreme Court, 1997)",
        "Bharatiya Nyaya Sanhita 2023 (ss.74, 79 — successor to IPC ss.354, 509)",
        "Companies Act 2013 — BRSR disclosure obligations",
      ],
      text: "This Policy is issued in compliance with the POSH Act 2013 and extends to " + protectedClass + " of " + org + ".",
    });

    const clauses: DocSection[] = [
      {
        kind: "clause",
        number: 1,
        title: "Commitment and Scope",
        text:
          org + " is committed to providing a safe, respectful, and dignified workplace free from sexual harassment. This Policy applies to:\n\n" +
          "(a) all employees, workers, trainees, interns, contractual staff, and third-party service providers;\n\n" +
          "(b) all workplaces of the organisation, including: " + (e.posh_workplace_desc || "all offices, client sites, off-site events, and work-from-home environments") + ";\n\n" +
          (e.posh_remote_work === "yes"
            ? "(c) virtual workplaces — including conduct over video calls, email, messaging platforms, social media, and any digital communication channel used for work.\n\n"
            : "") +
          (e.posh_includes_third_party === "yes"
            ? "(d) harassment by third parties including clients, customers, vendors, and visitors at or related to the workplace.\n\n"
            : "") +
          "This Policy protects " + protectedClass + ".",
      },
      {
        kind: "clause",
        number: 2,
        title: "Definition of Sexual Harassment",
        text:
          '"Sexual harassment" includes any one or more of the following unwelcome acts or behaviour (whether directly or by implication):\n\n' +
          "(a) physical contact and advances;\n\n" +
          "(b) a demand or request for sexual favours;\n\n" +
          "(c) making sexually coloured remarks;\n\n" +
          "(d) showing pornography;\n\n" +
          "(e) any other unwelcome physical, verbal, or non-verbal conduct of a sexual nature;\n\n" +
          "(f) implied or explicit promise of preferential treatment in employment in exchange for sexual favours;\n\n" +
          "(g) implied or explicit threat of detrimental treatment for refusal of sexual advances;\n\n" +
          "(h) creating a hostile, intimidating, or offensive work environment through conduct of a sexual nature;\n\n" +
          (e.posh_remote_work === "yes"
            ? "(i) digital harassment — sending unwanted sexually explicit messages, images, or content via email, messaging apps, or social media in connection with the workplace.\n\n"
            : "") +
          'The above is aligned with Section 2(n) of the POSH Act 2013. "Unwelcome" conduct is determined from the perspective of the aggrieved person.',
      },
      {
        kind: "clause",
        number: 3,
        title: "Internal Complaints Committee (ICC) — Constitution",
        text:
          "As required under Section 4 of the POSH Act 2013, " + org + " hereby constitutes the following Internal Complaints Committee:\n\n" +
          "Presiding Officer: " + presiding + " (woman employee at a senior level)\n" +
          "Member 2: " + (e.posh_member_2 || "[Member 2]") + "\n" +
          (e.posh_member_3 ? "Member 3: " + e.posh_member_3 + "\n" : "") +
          "External Member: " + extMember + "\n\n" +
          "ICC Contact: " + iccEmail + (e.posh_nodal_officer ? " | Nodal Officer: " + e.posh_nodal_officer : "") + "\n\n" +
          "The term of each ICC member shall be " + (e.posh_icc_term || "3") + " years from the date of constitution or appointment. The ICC shall reconstitute members upon expiry of term, resignation, or disqualification. A quorum of 3 members (including Presiding Officer) is required to conduct proceedings.",
      },
      {
        kind: "clause",
        number: 4,
        title: "Filing a Complaint",
        text:
          "(a) Who may file. Any aggrieved employee who has experienced sexual harassment at the workplace may file a written complaint with the ICC.\n\n" +
          "(b) Time limit. A complaint must be filed within 3 months of the date of the last incident. The ICC may extend this period by a further 3 months for sufficient cause recorded in writing.\n\n" +
          "(c) How to file. The complaint must be filed in writing — in person to the Presiding Officer or any ICC member, or by email to " + iccEmail + ". The complaint should contain: (i) name and contact details of complainant; (ii) name and designation of the respondent; (iii) dates and description of the incident(s); (iv) names of witnesses, if any; (v) documentary evidence, if available.\n\n" +
          "(d) Assistance. If the aggrieved person is unable to file a complaint owing to physical incapacity, mental incapacity, or death, a complaint may be filed by a legal heir, or prescribed authority under the POSH Rules.\n\n" +
          "(e) False complaints. Malicious and false complaints attract disciplinary action. However, a complaint that cannot be proved shall not be deemed to be a false complaint.",
      },
      {
        kind: "clause",
        number: 5,
        title: "Interim Relief",
        text:
          "Upon receipt of a complaint, the ICC may recommend to the employer the following interim measures:\n\n" +
          "(a) transfer of the complainant or respondent to another team, department, or office;\n\n" +
          "(b) granting leave to the complainant for up to 3 months (in addition to leave otherwise available);\n\n" +
          "(c) granting leave without prejudice to existing leave entitlements;\n\n" +
          "(d) restraining the respondent from reporting on, or supervising, the complainant's work.",
      },
      {
        kind: "clause",
        number: 6,
        title: "Inquiry Procedure",
        text:
          "(a) Conciliation. The ICC may, at the request of the complainant, take steps to settle the matter through conciliation before commencing inquiry. Conciliation does not include monetary settlement. If conciliation succeeds, no further inquiry is conducted.\n\n" +
          "(b) Inquiry initiation. If conciliation is not requested or fails, the ICC shall initiate inquiry within 7 working days of receipt of the complaint and shall provide a copy to the respondent.\n\n" +
          "(c) Respondent's reply. The respondent has 10 working days to file a written reply with supporting documents and list of witnesses.\n\n" +
          "(d) Inquiry timeline. The ICC shall complete its inquiry within 90 days of receiving the complaint. Both parties shall have equal opportunity to present their case, cross-examine witnesses, and produce evidence.\n\n" +
          "(e) Inquiry report. The ICC shall submit its report with findings and recommendations to the employer within 10 days of completing inquiry.\n\n" +
          "(f) Action. The employer shall act upon the ICC's recommendations within 60 days of receiving the report.\n\n" +
          "(g) Appeals. Any party aggrieved by the ICC's recommendations may appeal to the appropriate court/tribunal within 90 days.",
      },
      {
        kind: "clause",
        number: 7,
        title: "Confidentiality",
        text:
          "All proceedings before the ICC, including the identity of the complainant, respondent, and witnesses, the complaint, and the inquiry report, are strictly confidential. No information relating to any complaint shall be communicated to the press, media, or any person not party to the proceedings. Breach of confidentiality by any ICC member or party is an offence under Section 16 of the POSH Act 2013 and attracts a fine up to ₹5,000.",
      },
      {
        kind: "clause",
        number: 8,
        title: "Penalties and Disciplinary Action",
        text:
          "Where the ICC finds the complaint proved, it may recommend one or more of the following actions to the employer:\n\n" +
          "(a) written warning or reprimand;\n\n" +
          "(b) transfer to another team, department, or location;\n\n" +
          "(c) withholding of increment or promotion;\n\n" +
          "(d) demotion;\n\n" +
          "(e) suspension with or without pay;\n\n" +
          "(f) termination of employment;\n\n" +
          "(g) deduction from salary / compensation to the complainant;\n\n" +
          "(h) referral to law enforcement authorities under applicable provisions of the Bharatiya Nyaya Sanhita 2023 (erstwhile IPC).\n\n" +
          "The employer shall act on these recommendations in accordance with its service rules and applicable labour law.",
      },
      {
        kind: "clause",
        number: 9,
        title: "Non-Retaliation",
        text:
          "The organisation strictly prohibits retaliation of any form against any person who has filed a complaint, assisted in an inquiry, or reported a POSH violation in good faith. Any act of retaliation shall itself constitute a disciplinary offence and be dealt with independently.",
      },
      {
        kind: "clause",
        number: 10,
        title: "Training and Awareness",
        text:
          "The organisation shall:\n\n" +
          "(a) conduct mandatory POSH awareness training for all employees at least once per year;\n\n" +
          "(b) display the policy at conspicuous places in all offices;\n\n" +
          "(c) provide all new employees with a copy of this policy at induction;\n\n" +
          "(d) conduct orientation for ICC members on their roles and the inquiry procedure;\n\n" +
          "(e) include POSH compliance status in the organisation's annual report (or BRSR, where applicable).",
      },
      {
        kind: "clause",
        number: 11,
        title: "Annual Report",
        text:
          "The ICC shall prepare and submit an annual report to the employer and the District Officer (as required under Rule 14 of the POSH Rules 2013) setting out: (a) number of complaints of sexual harassment received; (b) number of complaints disposed of during the year; (c) number of cases pending for more than 90 days; (d) number of workshops or awareness programmes conducted; and (e) nature of action taken by the employer.",
      },
    ];

    clauses.forEach((c) => blocks.push(c));

    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "para",
      text:
        "This Policy has been approved by the Board of Directors / management of " + org + " and takes effect from [EFFECTIVE_DATE].\n\n" +
        "Any questions regarding this Policy should be directed to the ICC at " + iccEmail + ".",
    });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "Authorised Signatory\n" + org, name: "[Signature & Seal]" },
        { role: "Presiding Officer, ICC\n" + presiding, name: "[Signature]" },
      ],
    });

    return blocks;
  },
};
