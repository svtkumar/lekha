import type { TemplateModule, DocSection } from "../types";

export const poshPolicy: TemplateModule = {
  meta: {
    id: "posh-policy",
    name: "POSH Policy & IC Charter",
    categoryId: "hr",
    category: "HR & Workplace",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Mandatory POSH policy and Internal Committee (IC) constitution under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013. Covers definitions, complaint procedure, inquiry process, and penalties.",
    aliases: ["sexual harassment", "internal committee", "IC", "ICC", "POSH Act", "workplace harassment policy"],
    pages: 18,
    minutes: 12,
    new: true,
    status: "live",
  },
  groups: [
    {
      title: "Organisation details",
      fields: [
        { id: "posh_org_name", label: "Organisation / company name", type: "text", required: true, placeholder: "Acme Technologies Pvt Ltd" },
        { id: "posh_org_addr", label: "Registered office address", type: "textarea", rows: 2, required: true },
        { id: "posh_effective_date", label: "Policy effective date", type: "date", required: true },
        { id: "posh_emp_count", label: "Approximate employee count", type: "number", placeholder: "150" },
      ],
    },
    {
      title: "Internal Committee (IC) constitution",
      fields: [
        { id: "posh_ic_presiding_officer", label: "Presiding Officer name", type: "text", required: true, placeholder: "Nisha Mehta" },
        { id: "posh_ic_presiding_designation", label: "Presiding Officer designation", type: "text", placeholder: "Senior Manager — HR" },
        { id: "posh_ic_member1", label: "IC Member 1 name", type: "text", placeholder: "Kavita Rao" },
        { id: "posh_ic_member1_desig", label: "IC Member 1 designation", type: "text", placeholder: "Team Lead — Engineering" },
        { id: "posh_ic_member2", label: "IC Member 2 name", type: "text", placeholder: "Ravi Shankar" },
        { id: "posh_ic_member2_desig", label: "IC Member 2 designation", type: "text", placeholder: "Manager — Legal" },
        { id: "posh_ic_external_member", label: "External / NGO member name", type: "text", placeholder: "Dr. Priya Desai" },
        { id: "posh_ic_external_org", label: "External member NGO / organisation", type: "text", placeholder: "Sakhi Women's Collective" },
        { id: "posh_nodal_officer", label: "Nodal officer name", type: "text", placeholder: "Anand Verma" },
        { id: "posh_nodal_email", label: "POSH complaint email", type: "email", placeholder: "posh@company.com" },
      ],
    },
  ],
  render(e): DocSection[] {
    const blocks: DocSection[] = [];
    const org = e.posh_org_name || "[Organisation Name]";
    const effDate = e.posh_effective_date ? new Date(e.posh_effective_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Effective Date]";

    blocks.push({
      kind: "info",
      title: "POSH Act 2013 — Compliance Requirements",
      acts: [
        "Sexual Harassment of Women at Workplace (Prevention, Prohibition & Redressal) Act, 2013",
        "Sexual Harassment of Women at Workplace Rules, 2013",
        "Vishaka Guidelines (Supreme Court, 1997) — Precursor to POSH Act",
        "Companies Act, 2013 — Directors' Report must include POSH compliance disclosure",
      ],
      text: "Organisations with 10 or more employees must constitute an Internal Committee (IC). Failure to comply attracts a fine of up to ₹50,000 (first offence) and ₹1 lakh (subsequent offences) plus possible cancellation of registration/licence. Annual reports must be submitted to the District Officer.",
    });

    blocks.push({ kind: "title", text: org.toUpperCase() });
    if (e.posh_org_addr) blocks.push({ kind: "subtitle", text: e.posh_org_addr });
    blocks.push({ kind: "divider" });
    blocks.push({ kind: "subtitle", text: "POLICY ON PREVENTION, PROHIBITION AND REDRESSAL OF SEXUAL HARASSMENT AT WORKPLACE" });
    blocks.push({ kind: "subtitle", text: "(POSH Policy) — As per the POSH Act, 2013" });
    blocks.push({ kind: "spacer" });

    blocks.push({ kind: "kv", pairs: [
      { label: "Effective Date", value: effDate },
      { label: "Applies to", value: "All employees, contract staff, interns, visitors, and third parties at all workplaces of " + org },
      ...(e.posh_nodal_email ? [{ label: "POSH Complaint Email", value: e.posh_nodal_email }] : []),
    ]});

    blocks.push({ kind: "divider" });

    const clauses: DocSection[] = [
      {
        kind: "clause", number: 1, title: "Preamble and Commitment",
        text: `${org} ("Company") is committed to providing a safe, respectful, and harassment-free workplace for all employees, irrespective of gender, position, or tenure. The Company has zero tolerance for sexual harassment in any form. This Policy is enacted in compliance with the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 ("POSH Act") and the Rules thereunder.`,
      },
      {
        kind: "clause", number: 2, title: "Scope",
        text: "This Policy applies to all: (a) permanent employees, temporary employees, trainees, interns, and consultants; (b) third parties including vendors, clients, visitors, and contractors; at all workplaces including offices, client sites, travel, outstation assignments, company events, and virtual/online platforms.",
      },
      {
        kind: "clause", number: 3, title: "Definition of Sexual Harassment",
        text: `Under the POSH Act, Sexual Harassment includes any unwelcome act or behaviour (whether directly or by implication) such as: (a) physical contact and advances; (b) a demand or request for sexual favours; (c) making sexually coloured remarks; (d) showing pornography; (e) any other unwelcome physical, verbal, or non-verbal conduct of a sexual nature. It also includes implied or explicit: (i) promise of preferential treatment in employment; (ii) threat of detrimental treatment; (iii) threat about present or future employment status; (iv) interference with work or creation of an intimidating, hostile, or offensive work environment; (v) humiliating treatment likely to affect health or safety.`,
      },
      {
        kind: "clause", number: 4, title: "Internal Committee (IC) Constitution",
        text: `In accordance with Section 4 of the POSH Act, the Company has constituted the Internal Committee (IC) as follows:`,
      },
    ];

    clauses.forEach(c => blocks.push(c));

    // IC Constitution table
    const icRows: string[][] = [];
    if (e.posh_ic_presiding_officer) icRows.push([e.posh_ic_presiding_officer, e.posh_ic_presiding_designation || "Senior Employee", "Presiding Officer"]);
    if (e.posh_ic_member1) icRows.push([e.posh_ic_member1, e.posh_ic_member1_desig || "Employee Member", "Member"]);
    if (e.posh_ic_member2) icRows.push([e.posh_ic_member2, e.posh_ic_member2_desig || "Employee Member", "Member"]);
    if (e.posh_ic_external_member) icRows.push([e.posh_ic_external_member, e.posh_ic_external_org || "External Member", "External Member (s.4(2)(d))"]);
    if (icRows.length === 0) {
      icRows.push(["[Presiding Officer Name]", "[Senior Employee Designation]", "Presiding Officer"]);
      icRows.push(["[Member 1 Name]", "[Designation]", "Member"]);
      icRows.push(["[External Member Name]", "[NGO / Organisation]", "External Member"]);
    }

    blocks.push({ kind: "table", headers: ["Name", "Designation / Organisation", "Role in IC"], rows: icRows });

    const remainingClauses: DocSection[] = [
      {
        kind: "clause", number: 5, title: "Complaint Procedure",
        text: `An aggrieved woman may file a written complaint with the IC within 3 months of the incident (extendable by another 3 months for exceptional reasons). The complaint must be addressed to the Presiding Officer${e.posh_nodal_email ? ` at ${e.posh_nodal_email}` : ""}${e.posh_nodal_officer ? ` or delivered to ${e.posh_nodal_officer} (Nodal Officer)` : ""}. If the aggrieved woman is unable to file a written complaint due to physical or mental incapacity or otherwise, the Presiding Officer may take cognisance of the complaint on her behalf.`,
      },
      {
        kind: "clause", number: 6, title: "Conciliation",
        text: "Before initiating an inquiry, the IC may, at the request of the aggrieved woman, take steps to settle the matter through Conciliation between the parties. No monetary settlement shall be made as the basis of conciliation. If conciliation is reached, the IC shall record and forward the settlement to the employer and the aggrieved woman and the respondent shall comply with the settlement.",
      },
      {
        kind: "clause", number: 7, title: "Inquiry Process",
        text: "Where conciliation is not sought or fails, the IC shall proceed with an inquiry in accordance with the provisions of the POSH Act and the Principles of Natural Justice: (a) both parties shall be given an opportunity to be heard; (b) the inquiry shall be completed within 90 days; (c) the IC shall have the power to call witnesses and examine documents; (d) the proceedings shall be kept confidential; (e) no legal practitioner shall represent either party during inquiry proceedings.",
      },
      {
        kind: "clause", number: 8, title: "Interim Relief",
        text: "Pending the inquiry, the IC may recommend to the employer: (a) transfer of the aggrieved woman or respondent; (b) grant leave to the aggrieved woman up to 3 months; (c) restraining the respondent from reporting on the work performance of the aggrieved woman.",
      },
      {
        kind: "clause", number: 9, title: "Penalties for Sexual Harassment",
        text: "On completion of the inquiry, if the allegation is proved: (a) the IC shall recommend termination of employment, demotion, or other disciplinary action as per the company's service rules; (b) the IC may recommend deduction from salary / compensation of the respondent to be paid to the aggrieved woman; (c) if the respondent is a third party, the Company shall take appropriate action including cancellation of vendor/contract arrangement.",
      },
      {
        kind: "clause", number: 10, title: "Protection against Retaliation",
        text: "No employee shall be penalised, retaliated against, or suffer any adverse consequence in employment for making a complaint in good faith, cooperating in an inquiry, or exercising any right under this Policy or the POSH Act. Any retaliatory action is itself a disciplinary offence.",
      },
      {
        kind: "clause", number: 11, title: "False Complaints",
        text: "If the IC concludes that the allegation is false or malicious, it may recommend disciplinary action against the complainant. However, the failure to prove a complaint shall not constitute a false complaint per se.",
      },
      {
        kind: "clause", number: 12, title: "Confidentiality",
        text: "The identity of the aggrieved woman, the respondent, witnesses, and the contents of the complaint, inquiry, and final report shall be kept strictly confidential. Breach of confidentiality is a disciplinary offence and may also attract penalties under the POSH Act.",
      },
      {
        kind: "clause", number: 13, title: "Awareness and Training",
        text: "The Company shall organise awareness programmes and workshops on sexual harassment at the workplace at regular intervals (minimum once per year) for all employees. The IC members shall undergo periodic sensitisation training.",
      },
      {
        kind: "clause", number: 14, title: "Annual Report",
        text: "The IC shall prepare an Annual Report to be submitted to the employer and the District Officer, containing: number of complaints received, disposed of, pending, and action taken.",
      },
    ];

    remainingClauses.forEach(c => blocks.push(c));

    blocks.push({ kind: "divider" });
    blocks.push({ kind: "para", text: `This Policy has been adopted by ${org} and shall be effective from ${effDate}. All employees are required to acknowledge and comply with this Policy.` });

    blocks.push({ kind: "signatures", parties: [
      { role: "Authorised Signatory", name: org },
      { role: "Presiding Officer, IC", name: e.posh_ic_presiding_officer || "___________________" },
    ]});

    blocks.push({ kind: "footer", text: `${org} — POSH Policy · Generated by Lekha · elevana.guru` });
    return blocks;
  },
};
