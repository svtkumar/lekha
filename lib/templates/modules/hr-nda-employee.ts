// ============================================================
// EMPLOYEE NDA / CONFIDENTIALITY AGREEMENT
// Drop into: /lib/templates/hr-nda-employee.ts
// Use case: Standalone NDA executed between employer and
//           employee (or contractor) protecting trade secrets,
//           customer data, IP, source code, and business
//           strategies. Can be standalone or referenced from
//           the appointment letter.
// Statute refs: Indian Contract Act 1872 ss.27,39,73,74;
//   Information Technology Act 2000 / DPDP Act 2023;
//   Copyright Act 1957 s.17 (employer owns work for hire);
//   Trade Secrets — no standalone Act; protected via ICA s.27
//   and common law; IT Act s.43A for sensitive personal data
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const hrNdaEmployee: TemplateModule = {
  meta: {
    id: "hr-nda-employee",
    name: "Employee NDA / Confidentiality Agreement",
    categoryId: "hr",
    category: "HR & Employment",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Confidentiality and non-disclosure agreement between employer and employee or contractor. Covers trade secrets, source code, customer data, business strategies, DPDP Act obligations, work-for-hire IP assignment, and post-employment obligations. Standalone or attached to appointment letter.",
    aliases: [
      "employee nda",
      "staff nda",
      "confidentiality agreement employee",
      "non disclosure agreement employment",
      "employee confidentiality",
      "staff confidentiality agreement",
      "contractor nda",
      "employee secrecy agreement",
    ],
    pages: 4,
    minutes: 5,
    status: "live",
  },

  groups: [
    {
      title: "Employer details",
      fields: [
        { id: "nda_emp_co_name", label: "Company / employer legal name", type: "text", required: true, placeholder: "Acme Technologies Private Limited" },
        { id: "nda_emp_co_addr", label: "Registered address", type: "textarea", rows: 2, required: true },
        { id: "nda_emp_co_cin", label: "CIN (if company)", type: "text", placeholder: "U72900MH2020PTC345678" },
        { id: "nda_emp_signatory", label: "Authorised signatory name & designation", type: "text", required: true, placeholder: "Priya Sharma, Director" },
      ],
    },
    {
      title: "Employee / contractor details",
      fields: [
        { id: "nda_ee_name", label: "Employee / contractor full name", type: "text", required: true, placeholder: "Rahul Verma" },
        { id: "nda_ee_addr", label: "Residential address", type: "textarea", rows: 2, required: true },
        {
          id: "nda_ee_type",
          label: "Engagement type",
          type: "select",
          required: true,
          default: "employee",
          options: [
            { value: "employee", label: "Full-time employee" },
            { value: "fixed_term", label: "Fixed-term / contractual employee" },
            { value: "contractor", label: "Independent contractor / consultant" },
            { value: "intern", label: "Intern / trainee" },
          ],
        },
        { id: "nda_ee_designation", label: "Designation / role", type: "text", required: true, placeholder: "Senior Software Engineer" },
        { id: "nda_ee_department", label: "Department / team", type: "text", placeholder: "Engineering" },
        { id: "nda_agreement_date", label: "Date of agreement", type: "date", required: true },
      ],
    },
    {
      title: "Confidential information scope",
      fields: [
        {
          id: "nda_scope_type",
          label: "Scope of confidential information",
          type: "select",
          default: "broad",
          options: [
            { value: "broad", label: "Broad — all business information (recommended)" },
            { value: "tech_focused", label: "Tech-focused — source code, algorithms, technical data" },
            { value: "custom", label: "Custom — specify below" },
          ],
        },
        { id: "nda_scope_custom", label: "Custom scope description (if custom selected)", type: "textarea", rows: 3, placeholder: "Specify the categories of confidential information..." },
        {
          id: "nda_includes_personal_data",
          label: "Will employee handle personal data / DPDP Act obligations?",
          type: "radio",
          default: "yes",
          options: [
            { value: "yes", label: "Yes — include DPDP Act 2023 data processor obligations" },
            { value: "no", label: "No — standard confidentiality only" },
          ],
        },
        {
          id: "nda_ip_assignment",
          label: "IP / work-product assignment",
          type: "radio",
          default: "yes",
          options: [
            { value: "yes", label: "Yes — assign all work-product IP to employer" },
            { value: "no", label: "No — rely on s.17 Copyright Act (employer ownership for hire)" },
          ],
        },
      ],
    },
    {
      title: "Post-employment obligations",
      fields: [
        {
          id: "nda_post_term",
          label: "Duration of post-termination confidentiality",
          type: "select",
          default: "3",
          options: [
            { value: "1", label: "1 year" },
            { value: "2", label: "2 years" },
            { value: "3", label: "3 years" },
            { value: "5", label: "5 years" },
            { value: "indefinite", label: "Indefinite (for trade secrets)" },
          ],
        },
        {
          id: "nda_non_solicit",
          label: "Non-solicitation clause (employees / customers)?",
          type: "radio",
          default: "yes",
          options: [
            { value: "yes", label: "Yes — include non-solicitation (12 months post-exit)" },
            { value: "no", label: "No — confidentiality only" },
          ],
        },
        { id: "nda_jurisdiction_city", label: "Jurisdiction city (for dispute resolution)", type: "text", required: true, placeholder: "Bengaluru" },
        { id: "nda_jurisdiction_state", label: "Jurisdiction state", type: "select", required: true, options: [
            { value: "Andhra Pradesh", label: "Andhra Pradesh" },
            { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
            { value: "Assam", label: "Assam" },
            { value: "Bihar", label: "Bihar" },
            { value: "Chhattisgarh", label: "Chhattisgarh" },
            { value: "Goa", label: "Goa" },
            { value: "Gujarat", label: "Gujarat" },
            { value: "Haryana", label: "Haryana" },
            { value: "Himachal Pradesh", label: "Himachal Pradesh" },
            { value: "Jharkhand", label: "Jharkhand" },
            { value: "Karnataka", label: "Karnataka" },
            { value: "Kerala", label: "Kerala" },
            { value: "Madhya Pradesh", label: "Madhya Pradesh" },
            { value: "Maharashtra", label: "Maharashtra" },
            { value: "Manipur", label: "Manipur" },
            { value: "Meghalaya", label: "Meghalaya" },
            { value: "Mizoram", label: "Mizoram" },
            { value: "Nagaland", label: "Nagaland" },
            { value: "Odisha", label: "Odisha" },
            { value: "Punjab", label: "Punjab" },
            { value: "Rajasthan", label: "Rajasthan" },
            { value: "Sikkim", label: "Sikkim" },
            { value: "Tamil Nadu", label: "Tamil Nadu" },
            { value: "Telangana", label: "Telangana" },
            { value: "Tripura", label: "Tripura" },
            { value: "Uttar Pradesh", label: "Uttar Pradesh" },
            { value: "Uttarakhand", label: "Uttarakhand" },
            { value: "West Bengal", label: "West Bengal" },
            { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands" },
            { value: "Chandigarh", label: "Chandigarh" },
            { value: "Dadra and Nagar Haveli and Daman and Diu", label: "Dadra and Nagar Haveli and Daman and Diu" },
            { value: "Delhi", label: "Delhi" },
            { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
            { value: "Ladakh", label: "Ladakh" },
            { value: "Lakshadweep", label: "Lakshadweep" },
            { value: "Puducherry", label: "Puducherry" },
          ] },
      ],
    },
  ],

  render(e) {
    const co = e.nda_emp_co_name || "[Company]";
    const ee = e.nda_ee_name || "[Employee]";
    const eeType = { employee: "Employee", fixed_term: "Fixed-Term Employee", contractor: "Contractor", intern: "Intern" }[e.nda_ee_type || "employee"] || "Employee";
    const postTermLabel = e.nda_post_term === "indefinite" ? "indefinitely" : `${e.nda_post_term || "3"} (${({ "1": "one", "2": "two", "3": "three", "5": "five" }[e.nda_post_term] || "three")}) years`;

    const confidentialInfoDef = e.nda_scope_type === "custom" && e.nda_scope_custom
      ? e.nda_scope_custom
      : e.nda_scope_type === "tech_focused"
      ? "source code, algorithms, software architecture, technical specifications, API designs, databases, system designs, security protocols, cryptographic keys, test data, and related technical documentation"
      : "trade secrets, business strategies and plans, financial data, customer and prospective customer lists, vendor and supplier information, pricing data, product roadmaps and development plans, source code and technical data, research and development information, employee information, marketing strategies, and any other non-public information relating to the business of the Company";

    const blocks: DocSection[] = [];

    blocks.push({ kind: "title", text: "EMPLOYEE CONFIDENTIALITY AND\nNON-DISCLOSURE AGREEMENT" });

    blocks.push({
      kind: "para",
      text:
        'THIS CONFIDENTIALITY AND NON-DISCLOSURE AGREEMENT ("Agreement") is entered into as of [DATE] by and between:\n\n' +
        '1. ' + co + (e.nda_emp_co_addr ? ', having its registered office at ' + e.nda_emp_co_addr : '') + (e.nda_emp_co_cin ? ' (CIN: ' + e.nda_emp_co_cin + ')' : '') + ', represented by ' + (e.nda_emp_signatory || '[Signatory]') + ' (hereinafter referred to as the "Company" or "Employer"); AND\n\n' +
        '2. ' + ee + ', ' + eeType + ', residing at ' + (e.nda_ee_addr || '[Address]') + ' (hereinafter referred to as the "' + eeType + '" or "Receiving Party").\n\n' +
        'The Company and the ' + eeType + ' are each a "Party" and together the "Parties".',
    });

    const clauses: DocSection[] = [
      {
        kind: "clause",
        number: 1,
        title: "Purpose",
        text:
          "This Agreement is entered into in connection with the " + eeType + "'s engagement with the Company as " + (e.nda_ee_designation || "[Designation]") + (e.nda_ee_department ? " in the " + e.nda_ee_department + " department" : "") + ". In the course of this engagement, the " + eeType + " will have access to Confidential Information (as defined below) belonging to the Company. The " + eeType + " agrees to maintain the confidentiality of such information and to use it solely for the benefit of the Company.",
      },
      {
        kind: "clause",
        number: 2,
        title: "Definition of Confidential Information",
        text:
          '"Confidential Information" means any and all non-public information disclosed or made available to the ' + eeType + ' by the Company, whether orally, in writing, in electronic form, or by observation, including but not limited to: ' + confidentialInfoDef + '.\n\n' +
          "Confidential Information does not include information that: (a) is or becomes publicly available through no act or omission of the " + eeType + "; (b) was already known to the " + eeType + " before disclosure; (c) is rightfully obtained from a third party without breach of any obligation; or (d) is required to be disclosed by law or court order, provided the " + eeType + " provides prior written notice to the Company.",
      },
      {
        kind: "clause",
        number: 3,
        title: "Confidentiality Obligations",
        text:
          "The " + eeType + " agrees to:\n\n" +
          "(a) hold all Confidential Information in strict confidence and not disclose it to any third party without prior written consent of the Company;\n\n" +
          "(b) use Confidential Information solely for the purpose of performing duties for the Company;\n\n" +
          "(c) protect Confidential Information using at least the same degree of care used to protect the " + eeType + "'s own confidential information, but in no event less than reasonable care;\n\n" +
          "(d) immediately notify the Company of any unauthorised disclosure or use of Confidential Information;\n\n" +
          "(e) on termination of engagement or upon the Company's request, promptly return or destroy all tangible Confidential Information, including copies in any form;\n\n" +
          "(f) not copy, reproduce, store, or transmit Confidential Information except as strictly required for Company purposes.",
      },
    ];

    if (e.nda_includes_personal_data === "yes") {
      clauses.push({
        kind: "clause",
        number: 4,
        title: "Digital Personal Data Protection Act 2023 — Obligations",
        text:
          "In addition to the general confidentiality obligations above, where the " + eeType + " processes Personal Data (as defined under the Digital Personal Data Protection Act 2023, 'DPDP Act') on behalf of the Company:\n\n" +
          "(a) the " + eeType + " shall process Personal Data only in accordance with the Company's instructions and applicable provisions of the DPDP Act 2023;\n\n" +
          "(b) the " + eeType + " shall implement appropriate technical and organisational security safeguards to prevent Personal Data Breach;\n\n" +
          "(c) in the event of a Personal Data Breach, the " + eeType + " shall immediately notify the Company's designated Data Protection Officer (or HR/Legal team) to enable timely reporting to the Data Protection Board of India;\n\n" +
          "(d) the " + eeType + " shall not access, store, copy, or transmit any Personal Data outside the systems and processes designated by the Company;\n\n" +
          "(e) these obligations survive termination of the Agreement and remain binding as long as the " + eeType + " holds any Personal Data.",
      });
    }

    if (e.nda_ip_assignment === "yes") {
      const ipClauseNum = clauses.length + 1;
      clauses.push({
        kind: "clause",
        number: ipClauseNum,
        title: "Intellectual Property Assignment",
        text:
          "(a) Work for Hire. All Work Product created by the " + eeType + " during the course of the engagement — including but not limited to software, source code, algorithms, inventions, designs, reports, analyses, and other deliverables — shall be deemed work made for hire under s.17 of the Copyright Act 1957 and shall vest exclusively in the Company.\n\n" +
          "(b) Assignment. To the extent any Work Product does not qualify as work for hire, the " + eeType + " hereby irrevocably assigns to the Company all rights, title, and interest — including copyright, patent rights, and moral rights (to the extent assignable) — in all such Work Product.\n\n" +
          "(c) Disclosure & Assistance. The " + eeType + " shall promptly disclose all Work Product to the Company and sign all documents reasonably required to perfect the Company's ownership thereof.\n\n" +
          "(d) Pre-Existing IP. The " + eeType + " retains ownership of any intellectual property developed entirely before the commencement of this engagement, provided a list of such pre-existing IP is appended hereto or notified to the Company in writing at the time of joining.",
      });
    }

    const survivalClauseNum = clauses.length + 1;
    clauses.push({
      kind: "clause",
      number: survivalClauseNum,
      title: "Post-Termination Obligations",
      text:
        "The confidentiality obligations of the " + eeType + " under this Agreement shall continue in full force and effect for " + postTermLabel + " following the termination or expiry of the employment / engagement, or indefinitely with respect to trade secrets and source code of the Company.\n\n" +
        (e.nda_non_solicit === "yes"
          ? "For a period of 12 (twelve) months following the termination or expiry of engagement, the " + eeType + " shall not, directly or indirectly:\n\n(a) solicit, induce, or encourage any employee of the Company to leave the employment of the Company; or\n\n(b) solicit or do business with any customer of the Company with whom the " + eeType + " had material dealings during the 12 months preceding termination — in each case by using Confidential Information obtained during the engagement.\n\n"
          : "") +
        "Note: This Agreement does not contain a non-compete clause, as post-employment non-compete restrictions are void and unenforceable under Section 27 of the Indian Contract Act 1872.",
    });

    const remediesClauseNum = clauses.length + 1;
    clauses.push({
      kind: "clause",
      number: remediesClauseNum,
      title: "Remedies",
      text:
        "The " + eeType + " acknowledges that any breach or threatened breach of this Agreement may cause irreparable harm to the Company for which monetary damages alone would be an inadequate remedy. Accordingly, the Company shall be entitled to seek equitable relief, including injunction and specific performance, in addition to all other remedies available under the Indian Contract Act 1872, the Copyright Act 1957, the Information Technology Act 2000, the DPDP Act 2023, and any other applicable law.",
    });

    const govClauseNum = clauses.length + 1;
    clauses.push({
      kind: "clause",
      number: govClauseNum,
      title: "Governing Law and Dispute Resolution",
      text:
        "This Agreement shall be governed by the laws of India. Any dispute arising out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts at " + (e.nda_jurisdiction_city || "[City]") + (e.nda_jurisdiction_state ? ", " + e.nda_jurisdiction_state : "") + ".",
    });

    const generalClauseNum = clauses.length + 1;
    clauses.push({
      kind: "clause",
      number: generalClauseNum,
      title: "General",
      text:
        "(a) This Agreement constitutes the entire agreement between the Parties with respect to confidentiality of the Company's information and supersedes all prior discussions on the subject.\n\n" +
        "(b) This Agreement may not be amended except in writing signed by both Parties.\n\n" +
        "(c) If any provision of this Agreement is found to be unenforceable, the remaining provisions shall remain in full force.\n\n" +
        "(d) This Agreement may be executed in counterparts, including electronic signatures, each of which shall be deemed an original.",
    });

    clauses.forEach((c) => blocks.push(c));

    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "para",
      text: "IN WITNESS WHEREOF the Parties have executed this Agreement as of the date first written above.",
    });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "For " + co + "\n" + (e.nda_emp_signatory || "[Authorised Signatory]"), name: "[Signature]" },
        { role: eeType + "\n" + ee, name: "[Signature]" },
      ],
    });

    return blocks;
  },
};
