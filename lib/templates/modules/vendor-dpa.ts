import type { TemplateModule, DocSection } from "../types";

export const vendorDpa: TemplateModule = {
  meta: {
    id: "vendor-dpa",
    name: "Vendor DPA",
    categoryId: "compliance",
    category: "Compliance",
    country: ["IN", "EU", "UK"],
    formats: ["pdf", "docx"],
    description: "Data Processing Agreement between a Data Fiduciary and its Data Processor. Compliant with India's DPDP Act 2023 and optionally EU GDPR Article 28. Covers sub-processors, security measures, breach notification, and audit rights.",
    aliases: ["data processing agreement", "GDPR DPA", "SCC", "processor agreement", "data processing addendum"],
    pages: 10,
    minutes: 12,
    new: true,
    status: "live",
  },
  groups: [
    {
      title: "Data Fiduciary (Controller) details",
      fields: [
        { id: "dpa_fiduciary_name", label: "Data Fiduciary / Controller company name", type: "text", required: true, placeholder: "Acme Technologies Pvt Ltd" },
        { id: "dpa_fiduciary_addr", label: "Data Fiduciary registered address", type: "textarea", rows: 2, required: true },
        { id: "dpa_fiduciary_signatory", label: "Data Fiduciary authorised signatory", type: "text", placeholder: "Rajesh Mehta" },
        { id: "dpa_fiduciary_designation", label: "Signatory designation", type: "text", placeholder: "Chief Privacy Officer" },
      ],
    },
    {
      title: "Data Processor (Vendor) details",
      fields: [
        { id: "dpa_processor_name", label: "Data Processor / Vendor company name", type: "text", required: true, placeholder: "CloudServices Pvt Ltd" },
        { id: "dpa_processor_addr", label: "Data Processor registered address", type: "textarea", rows: 2, required: true },
        { id: "dpa_processor_signatory", label: "Data Processor authorised signatory", type: "text", placeholder: "Priya Kapoor" },
        { id: "dpa_processor_designation", label: "Signatory designation", type: "text", placeholder: "Chief Executive Officer" },
      ],
    },
    {
      title: "Data processing terms",
      fields: [
        { id: "dpa_agreement_date", label: "Agreement date", type: "date", required: true },
        { id: "dpa_processing_description", label: "Nature / description of processing", type: "textarea", rows: 3, required: true, placeholder: "Processing of customer contact data, usage analytics, and support tickets for the purpose of providing cloud CRM services." },
        { id: "dpa_data_categories", label: "Categories of personal data", type: "textarea", rows: 2, placeholder: "Name, email address, phone number, usage logs, support communication records" },
        { id: "dpa_data_subjects", label: "Categories of data subjects", type: "text", placeholder: "Customers, leads, support users" },
        { id: "dpa_processing_location", label: "Data processing location(s)", type: "text", placeholder: "India (Mumbai), Singapore" },
        { id: "dpa_term_months", label: "DPA term (months)", type: "number", placeholder: "24" },
        { id: "dpa_breach_notify_hours", label: "Breach notification deadline (hours)", type: "number", default: "72", placeholder: "72" },
        { id: "dpa_gdpr_applicable", label: "Is EU GDPR also applicable?", type: "select", default: "no", options: [
          { value: "yes", label: "Yes — include GDPR Art.28 provisions" },
          { value: "no", label: "No — DPDP Act only" },
        ]},
        { id: "dpa_jurisdiction", label: "Governing law / jurisdiction", type: "text", default: "India", placeholder: "India" },
        { id: "dpa_city", label: "Jurisdiction city", type: "text", placeholder: "Bengaluru" },
      ],
    },
  ],
  render(e): DocSection[] {
    const blocks: DocSection[] = [];
    const fiduciary = e.dpa_fiduciary_name || "[Data Fiduciary]";
    const processor = e.dpa_processor_name || "[Data Processor]";
    const agreementDate = e.dpa_agreement_date ? new Date(e.dpa_agreement_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Date]";
    const city = e.dpa_city || "[City]";
    const breachHours = e.dpa_breach_notify_hours || "72";

    blocks.push({
      kind: "info",
      title: "DPA — Regulatory Framework",
      acts: [
        "Digital Personal Data Protection Act, 2023 (India) — Data Processor obligations",
        "EU General Data Protection Regulation (GDPR) — Article 28 (if applicable)",
        "UK GDPR — Article 28 (if applicable)",
        "IT (Reasonable Security Practices and Procedures) Rules, 2011",
      ],
      text: "A Data Processing Agreement is mandatory when a Data Fiduciary engages a third-party Data Processor. Under the DPDP Act, Data Processors may process personal data only on documented instructions from the Data Fiduciary. GDPR-applicable entities must ensure processors provide sufficient guarantees (Art.28).",
    });

    blocks.push({ kind: "title", text: "DATA PROCESSING AGREEMENT" });
    blocks.push({ kind: "subtitle", text: `DPDP Act 2023${e.dpa_gdpr_applicable === "yes" ? " | GDPR Art.28" : ""}` });
    blocks.push({ kind: "divider" });

    blocks.push({ kind: "para", text: `This Data Processing Agreement ("DPA" or "Agreement") is entered into on ${agreementDate}, BETWEEN:` });

    blocks.push({ kind: "party", role: "DATA FIDUCIARY (CONTROLLER)", name: fiduciary, address: e.dpa_fiduciary_addr || "", rep: e.dpa_fiduciary_signatory ? `Signatory: ${e.dpa_fiduciary_signatory}, ${e.dpa_fiduciary_designation || ""}` : undefined });
    blocks.push({ kind: "party", role: "DATA PROCESSOR", name: processor, address: e.dpa_processor_addr || "", rep: e.dpa_processor_signatory ? `Signatory: ${e.dpa_processor_signatory}, ${e.dpa_processor_designation || ""}` : undefined });

    blocks.push({ kind: "para", text: `The Data Fiduciary and the Data Processor are individually referred to as a "Party" and collectively as the "Parties".` });

    blocks.push({ kind: "subtitle", text: "SCHEDULE 1 — DETAILS OF PROCESSING" });
    blocks.push({ kind: "kv", pairs: [
      { label: "Nature of Processing", value: e.dpa_processing_description || "[Description of Processing]" },
      { label: "Categories of Personal Data", value: e.dpa_data_categories || "[Data Categories]" },
      { label: "Categories of Data Subjects", value: e.dpa_data_subjects || "[Data Subjects]" },
      { label: "Processing Location(s)", value: e.dpa_processing_location || "[Location]" },
      { label: "DPA Term", value: e.dpa_term_months ? `${e.dpa_term_months} months from the Agreement date` : "As per the underlying service agreement" },
    ]});

    blocks.push({ kind: "divider" });

    const clauses: DocSection[] = [
      {
        kind: "clause", number: 1, title: "Definitions",
        text: `"Personal Data", "Data Fiduciary", "Data Processor", "Data Principal", "Consent", "Processing" shall have the meanings assigned to them under the Digital Personal Data Protection Act, 2023 ("DPDP Act").${e.dpa_gdpr_applicable === "yes" ? ' "Controller", "Processor", "Personal Data Breach", "Supervisory Authority" shall also have the meanings assigned under the EU/UK GDPR where applicable.' : ""}`,
      },
      {
        kind: "clause", number: 2, title: "Scope and Role of Parties",
        text: `The Data Processor shall process personal data only for and on behalf of the Data Fiduciary, and only in accordance with the documented instructions of the Data Fiduciary as set out in this DPA and the underlying service agreement. The Data Processor shall not process personal data for any other purpose. If the Data Processor determines that an instruction infringes applicable data protection law, it shall promptly notify the Data Fiduciary.`,
      },
      {
        kind: "clause", number: 3, title: "Obligations of the Data Processor",
        text: `The Data Processor shall: (a) process personal data only on documented instructions from the Data Fiduciary; (b) ensure that all personnel who process personal data are bound by appropriate confidentiality obligations; (c) implement and maintain appropriate technical and organisational security measures as specified in Schedule 2; (d) assist the Data Fiduciary in responding to Data Principals' rights requests under the DPDP Act within the applicable timelines; (e) make available all information necessary to demonstrate compliance with this DPA and cooperate with audits by the Data Fiduciary; (f) promptly notify the Data Fiduciary of any actual or suspected personal data breach.`,
      },
      {
        kind: "clause", number: 4, title: "Sub-Processors",
        text: `The Data Processor shall not engage any sub-processor to process personal data on behalf of the Data Fiduciary without prior written consent. Where sub-processors are approved, the Data Processor shall ensure equivalent data protection obligations are imposed on them by written contract. The Data Processor remains fully liable to the Data Fiduciary for the acts and omissions of its sub-processors as if such acts and omissions were its own.`,
      },
      {
        kind: "clause", number: 5, title: "Security Measures",
        text: `The Data Processor shall implement and maintain appropriate technical and organisational security measures to protect personal data against accidental or unlawful destruction, loss, alteration, unauthorised disclosure, or access. Such measures shall include at minimum: (a) encryption of personal data in transit and at rest; (b) access controls and multi-factor authentication for systems containing personal data; (c) regular security testing and vulnerability assessments; (d) employee training on data security; (e) incident response procedures.`,
      },
      {
        kind: "clause", number: 6, title: "Personal Data Breach Notification",
        text: `The Data Processor shall notify the Data Fiduciary without undue delay, and in any event within ${breachHours} hours of becoming aware of a personal data breach involving the Data Fiduciary's personal data. The notification shall include: (a) nature of the breach; (b) categories and approximate number of data subjects affected; (c) categories and approximate number of personal data records; (d) likely consequences; (e) measures taken or proposed. The Data Processor shall cooperate fully with the Data Fiduciary in investigating and responding to the breach.`,
      },
      {
        kind: "clause", number: 7, title: "Data Retention and Deletion",
        text: "At the termination of this DPA or the underlying service agreement, or at any earlier time on the Data Fiduciary's written request, the Data Processor shall, at the Data Fiduciary's election: (a) securely delete all personal data and all copies thereof; or (b) return all personal data to the Data Fiduciary. The Data Processor shall certify in writing that deletion has been completed.",
      },
      {
        kind: "clause", number: 8, title: "Audit Rights",
        text: "The Data Processor shall, on reasonable written notice (not less than 14 days except in case of a breach or regulatory request), allow the Data Fiduciary or its authorised representative to conduct audits and inspections of the Data Processor's processing activities and security measures. The Data Processor shall cooperate with such audits and provide all requested documentation.",
      },
    ];

    clauses.forEach(c => blocks.push(c));

    let clauseNum = 9;

    if (e.dpa_gdpr_applicable === "yes") {
      blocks.push({
        kind: "clause", number: clauseNum++, title: "GDPR Article 28 Compliance",
        text: "For processing subject to EU/UK GDPR, this DPA is intended to satisfy the requirements of Article 28 GDPR. The Data Processor shall assist the Data Controller in ensuring compliance with its GDPR obligations, including Data Protection Impact Assessments (Article 35), prior consultation (Article 36), and Data Principal rights. The Data Processor shall not transfer personal data to a third country unless on the instruction of the Data Controller and with appropriate safeguards (Chapter V GDPR).",
      });
    }

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Liability and Indemnity",
      text: "The Data Processor shall indemnify the Data Fiduciary for all losses, claims, damages, penalties, and regulatory fines arising from the Data Processor's breach of its obligations under this DPA or applicable data protection law, to the extent attributable to the Data Processor's acts or omissions.",
    });

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Governing Law",
      text: `This DPA shall be governed by the laws of ${e.dpa_jurisdiction || "India"}. Disputes shall be subject to the exclusive jurisdiction of the courts at ${city}.`,
    });

    blocks.push({ kind: "divider" });
    blocks.push({ kind: "para", text: "IN WITNESS WHEREOF the Parties have executed this Data Processing Agreement on the date first written above." });

    blocks.push({ kind: "signatures", parties: [
      { role: "DATA FIDUCIARY", name: `${e.dpa_fiduciary_signatory || fiduciary}\n${e.dpa_fiduciary_designation || "Authorised Signatory"}\n${fiduciary}` },
      { role: "DATA PROCESSOR", name: `${e.dpa_processor_signatory || processor}\n${e.dpa_processor_designation || "Authorised Signatory"}\n${processor}` },
    ]});

    blocks.push({ kind: "footer", text: `${fiduciary} ↔ ${processor} — Data Processing Agreement · Generated by Lekha · elevana.guru` });
    return blocks;
  },
};
