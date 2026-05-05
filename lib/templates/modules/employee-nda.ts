import type { TemplateModule, DocSection } from "../types";

export const employeeNda: TemplateModule = {
  meta: {
    id: "employee-nda",
    name: "Employee NDA",
    categoryId: "hr",
    category: "HR & Workplace",
    country: ["IN", "US", "UK"],
    formats: ["pdf", "docx"],
    description: "Employee confidentiality and non-disclosure agreement. Covers proprietary information, IP assignment, non-solicitation, return of materials, and post-employment obligations.",
    aliases: ["confidentiality", "employee confidentiality", "employee non-disclosure", "CNDA"],
    pages: 4,
    minutes: 8,
    new: true,
    status: "live",
  },
  groups: [
    {
      title: "Employer details",
      fields: [
        { id: "enda_company_name", label: "Company / Employer name", type: "text", required: true, placeholder: "Acme Technologies Pvt Ltd" },
        { id: "enda_company_addr", label: "Registered office address", type: "textarea", rows: 2 },
        { id: "enda_signatory_name", label: "Authorised signatory name", type: "text", placeholder: "Ananya Krishnan" },
        { id: "enda_signatory_designation", label: "Signatory designation", type: "text", placeholder: "Head — Human Resources" },
        { id: "enda_deed_date", label: "Agreement date", type: "date", required: true },
      ],
    },
    {
      title: "Employee details",
      fields: [
        { id: "enda_emp_name", label: "Employee full name", type: "text", required: true, placeholder: "Arjun Mehta" },
        { id: "enda_emp_addr", label: "Employee address", type: "textarea", rows: 2 },
        { id: "enda_designation", label: "Designation", type: "text", required: true, placeholder: "Senior Software Engineer" },
        { id: "enda_department", label: "Department", type: "text", placeholder: "Engineering" },
        { id: "enda_doj", label: "Date of joining", type: "date" },
      ],
    },
    {
      title: "Agreement terms",
      fields: [
        { id: "enda_nda_term", label: "Confidentiality obligation term (years after employment)", type: "select", default: "3", options: [
          { value: "2", label: "2 years after termination" },
          { value: "3", label: "3 years after termination" },
          { value: "5", label: "5 years after termination" },
          { value: "perpetual", label: "Perpetual (for trade secrets)" },
        ]},
        { id: "enda_non_solicit", label: "Include non-solicitation clause?", type: "select", default: "yes", options: [
          { value: "yes", label: "Yes — non-solicitation of employees and clients" },
          { value: "no", label: "No" },
        ]},
        { id: "enda_non_solicit_period", label: "Non-solicitation period (months after termination)", type: "number", default: "12", placeholder: "12" },
        { id: "enda_ip_assignment", label: "Include IP assignment clause?", type: "select", default: "yes", options: [
          { value: "yes", label: "Yes — all work product assigned to employer" },
          { value: "no", label: "No" },
        ]},
        { id: "enda_jurisdiction", label: "Governing law / jurisdiction", type: "text", default: "India", placeholder: "India" },
        { id: "enda_city", label: "Jurisdiction city (for courts)", type: "text", placeholder: "Bengaluru" },
      ],
    },
  ],
  render(e): DocSection[] {
    const blocks: DocSection[] = [];
    const company = e.enda_company_name || "[Company Name]";
    const emp = e.enda_emp_name || "[Employee Name]";
    const deedDate = e.enda_deed_date ? new Date(e.enda_deed_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Date]";
    const city = e.enda_city || "[City]";
    const ndaTerm = e.enda_nda_term === "perpetual" ? "perpetually" : `${e.enda_nda_term || "3"} years after the termination of employment`;
    const nonSolicitMonths = Number(e.enda_non_solicit_period || 12);

    blocks.push({ kind: "title", text: "EMPLOYEE CONFIDENTIALITY AND NON-DISCLOSURE AGREEMENT" });
    blocks.push({ kind: "subtitle", text: company.toUpperCase() });
    blocks.push({ kind: "divider" });

    blocks.push({ kind: "para", text: `This Employee Confidentiality and Non-Disclosure Agreement ("Agreement") is entered into on ${deedDate}, BETWEEN:` });

    blocks.push({ kind: "party", role: "EMPLOYER", name: company, address: e.enda_company_addr || "", rep: e.enda_signatory_name ? `Signatory: ${e.enda_signatory_name}, ${e.enda_signatory_designation || ""}` : undefined });
    blocks.push({ kind: "party", role: "EMPLOYEE", name: emp, address: e.enda_emp_addr || "", rep: e.enda_designation ? `Designation: ${e.enda_designation}${e.enda_department ? `, ${e.enda_department}` : ""}` : undefined });

    const clauses: DocSection[] = [
      {
        kind: "clause", number: 1, title: "Consideration",
        text: `In consideration of the employment of the Employee by the Employer${e.enda_doj ? ` commencing ${new Date(e.enda_doj).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}` : ""}, and the salary, benefits, and access to Confidential Information provided by the Employer, the Employee agrees to be bound by the terms of this Agreement.`,
      },
      {
        kind: "clause", number: 2, title: "Definition of Confidential Information",
        text: `"Confidential Information" means all information of or relating to ${company} or its affiliates, clients, or business partners, whether or not marked as confidential, that is not publicly available, including without limitation: (a) technical information — source code, algorithms, architectures, designs, trade secrets, inventions, processes, formulas; (b) business information — strategies, plans, financial data, pricing, customer lists, vendor details; (c) personnel information — compensation, performance, personal data of colleagues; (d) client data — any data provided by or relating to the Employer's clients; (e) any information disclosed to the Employee in the course of employment.`,
      },
      {
        kind: "clause", number: 3, title: "Obligations of Confidentiality",
        text: `The Employee agrees to: (a) hold all Confidential Information in strict confidence; (b) not use Confidential Information for any purpose other than the performance of employment duties; (c) not disclose Confidential Information to any third party without prior written consent of the Employer; (d) take all reasonable measures to protect Confidential Information, at least equal to measures the Employee takes to protect their own confidential information. These obligations shall continue ${ndaTerm}.`,
      },
      {
        kind: "clause", number: 4, title: "Exceptions",
        text: "The obligations of confidentiality shall not apply to information that: (a) is or becomes publicly available through no fault of the Employee; (b) was lawfully known to the Employee before employment, as evidenced by prior written records; (c) is required to be disclosed by applicable law or court order, provided the Employee gives prompt prior written notice to the Employer to enable it to seek a protective order.",
      },
    ];

    clauses.forEach(c => blocks.push(c));

    let clauseNum = 5;

    if (e.enda_ip_assignment === "yes") {
      blocks.push({
        kind: "clause", number: clauseNum++, title: "Assignment of Intellectual Property",
        text: `The Employee agrees that all inventions, discoveries, developments, works of authorship, software, designs, algorithms, processes, and other intellectual property ("Work Product") created, conceived, or developed by the Employee (alone or jointly) during the term of employment, whether during work hours or otherwise, using Employer resources or relating to the Employer's business, shall be the sole property of the Employer. The Employee hereby irrevocably assigns all right, title, and interest in such Work Product to the Employer. The Employee shall promptly disclose all Work Product to the Employer and execute any documents necessary to perfect such assignment.`,
      });
    }

    if (e.enda_non_solicit === "yes") {
      blocks.push({
        kind: "clause", number: clauseNum++, title: "Non-Solicitation",
        text: `For a period of ${nonSolicitMonths} months following the termination of employment for any reason, the Employee shall not, directly or indirectly: (a) solicit, induce, recruit, or encourage any employee, contractor, or consultant of the Employer to leave the Employer's employment or engagement; (b) solicit, divert, or attempt to divert any client, customer, or vendor with whom the Employee had material dealings during the last 12 months of employment, for the benefit of any competing business.`,
      });
    }

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Return of Materials",
      text: "Upon termination of employment, or at any time upon the Employer's request, the Employee shall promptly return all Confidential Information and all documents, devices, software, and materials (including copies) containing or relating to Confidential Information. The Employee shall permanently delete Confidential Information from personal devices and certify such deletion to the Employer.",
    });

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Remedies",
      text: "The Employee acknowledges that any breach of this Agreement would cause irreparable harm to the Employer for which monetary damages would be an inadequate remedy. The Employer shall therefore be entitled to seek injunctive relief, specific performance, and other equitable remedies in addition to monetary damages, without posting a bond.",
    });

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Governing Law and Jurisdiction",
      text: `This Agreement shall be governed by the laws of ${e.enda_jurisdiction || "India"}. Any disputes shall be subject to the exclusive jurisdiction of the courts at ${city}.`,
    });

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Entire Agreement",
      text: "This Agreement constitutes the entire agreement between the Parties with respect to its subject matter and supersedes all prior agreements, whether oral or written. This Agreement may only be amended in writing signed by both Parties.",
    });

    blocks.push({ kind: "divider" });
    blocks.push({ kind: "para", text: "IN WITNESS WHEREOF the Parties have executed this Agreement on the date first written above." });

    blocks.push({ kind: "signatures", parties: [
      { role: `FOR ${company.toUpperCase()}`, name: `${e.enda_signatory_name || company}\n${e.enda_signatory_designation || "Authorised Signatory"}` },
      { role: "EMPLOYEE", name: emp },
    ]});

    blocks.push({ kind: "footer", text: `${company} — Employee NDA · Generated by Lekha · elevana.guru` });
    return blocks;
  },
};
