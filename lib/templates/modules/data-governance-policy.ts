import type { TemplateModule, DocSection } from "../types";

/**
 * Dharma — Data Governance & Compliance Policy.
 * A single governance policy that maps obligations from the DPDP Act 2023,
 * GDPR and ISO/IEC 27001:2022. Written so the generated document addresses the
 * controls the Dharma audit scans for.
 */
export const dataGovernancePolicy: TemplateModule = {
  meta: {
    id: "data-governance-policy",
    name: "Data Governance & Compliance Policy",
    categoryId: "dharma",
    category: "Dharma · Governance",
    country: ["IN", "EU", "UK"],
    formats: ["pdf", "docx"],
    description:
      "A board-ready data governance policy mapping the DPDP Act 2023, GDPR and ISO/IEC 27001:2022. Covers notice & consent, data-principal/subject rights, breach notification, retention, security safeguards and supplier governance — built to pass the Dharma audit.",
    aliases: ["data governance", "DPDP policy", "GDPR policy", "privacy policy", "governance policy", "dharma"],
    pages: 8,
    minutes: 10,
    new: true,
    status: "live",
  },
  groups: [
    {
      title: "Organisation details",
      fields: [
        { id: "dg_org_name", label: "Organisation / company name", type: "text", required: true, placeholder: "Acme Technologies Pvt Ltd" },
        { id: "dg_effective_date", label: "Policy effective date", type: "date", required: true },
        { id: "dg_review_date", label: "Next review date", type: "date" },
        { id: "dg_dpo_name", label: "Data Protection Officer / Grievance Officer name", type: "text", placeholder: "Vikram Patel" },
        { id: "dg_dpo_email", label: "Privacy / grievance contact email", type: "email", placeholder: "privacy@company.com" },
        { id: "dg_approver_name", label: "Approving authority (e.g. CEO / Board)", type: "text", placeholder: "Board of Directors" },
      ],
    },
    {
      title: "Scope & parameters",
      fields: [
        { id: "dg_scope", label: "Scope of personal data processed", type: "select", default: "customer_employee", options: [
          { value: "customer_employee", label: "Customer and employee data" },
          { value: "customer", label: "Customer data only" },
          { value: "employee", label: "Employee data only" },
        ]},
        { id: "dg_processes_children", label: "Do you process children's data?", type: "select", default: "no", options: [
          { value: "no", label: "No" },
          { value: "yes", label: "Yes — under-18 data is processed" },
        ]},
        { id: "dg_intl_transfer", label: "Do you transfer data outside the country/EEA?", type: "select", default: "yes", options: [
          { value: "yes", label: "Yes — cross-border transfers occur" },
          { value: "no", label: "No — data stays in-country" },
        ]},
        { id: "dg_retention_months", label: "Default retention period (months)", type: "number", default: "36", placeholder: "36" },
        { id: "dg_breach_hours", label: "Breach escalation deadline (hours)", type: "number", default: "72", placeholder: "72" },
      ],
    },
  ],
  validate(e) {
    const warnings: string[] = [];
    if (!e.dg_dpo_email) warnings.push("A grievance / privacy contact email is strongly recommended for DPDP s.13 and GDPR Art.13 compliance.");
    if (e.dg_processes_children === "yes") warnings.push("Processing children's data triggers verifiable parental-consent obligations (DPDP s.9).");
    return warnings;
  },
  render(e): DocSection[] {
    const blocks: DocSection[] = [];
    const org = e.dg_org_name || "[Organisation Name]";
    const fmt = (v?: string) => (v ? new Date(v).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Date]");
    const effDate = fmt(e.dg_effective_date);
    const reviewDate = e.dg_review_date ? fmt(e.dg_review_date) : "12 months from the effective date";
    const dpo = e.dg_dpo_name || "[Data Protection Officer]";
    const dpoEmail = e.dg_dpo_email || "[privacy contact email]";
    const approver = e.dg_approver_name || "the Board of Directors";
    const retention = e.dg_retention_months || "36";
    const breachHours = e.dg_breach_hours || "72";

    blocks.push({
      kind: "cover",
      title: "Data Governance & Compliance Policy",
      subtitle: org,
      summary: [
        { label: "Organisation", value: org },
        { label: "Effective date", value: effDate },
        { label: "Next review", value: reviewDate },
        { label: "Data Protection Officer", value: dpo },
        { label: "Approved by", value: approver },
      ],
    });

    blocks.push({
      kind: "info",
      title: "Frameworks mapped by this policy",
      acts: [
        "Digital Personal Data Protection Act, 2023 (DPDP Act, India)",
        "General Data Protection Regulation (EU) 2016/679 (GDPR)",
        "ISO/IEC 27001:2022 — Information Security Management Systems",
      ],
      text:
        "This Policy is the master governance document for " + org + ". It sets out how the organisation discharges its obligations as a Data Fiduciary / Controller and operates its Information Security Management System (ISMS).",
    });

    blocks.push({
      kind: "clause", number: 1, title: "Notice & lawful basis",
      text:
        "Before collecting personal data, " + org + " provides each Data Principal with an itemised notice describing the personal data collected and the purpose of processing. Every processing activity is recorded against a lawful basis (consent, contract, legal obligation or legitimate interest) and is limited to that specified, lawful purpose (purpose limitation). The notice is presented in clear language at or before the point of collection.",
    });

    blocks.push({
      kind: "clause", number: 2, title: "Consent & withdrawal",
      text:
        "Where processing relies on consent, that consent is free, specific, informed and unambiguous, and is recorded. Data Principals may withdraw consent at any time through the same channel used to give it, and withdrawal is made as easy as giving consent. Withdrawal does not affect the lawfulness of processing carried out before withdrawal.",
    });

    blocks.push({
      kind: "clause", number: 3, title: "Data-principal & data-subject rights",
      text:
        "The organisation facilitates the right to access, the right to correction and the right to erasure of personal data, together with the right to grievance redressal. Under the GDPR it additionally honours the right to be forgotten, data portability, restriction and objection. Verified requests are actioned within statutory timelines. These data subject rights are published alongside this Policy.",
    });

    blocks.push({
      kind: "clause", number: 4, title: "Grievance redressal & Data Protection Officer",
      text:
        "The organisation has appointed " + dpo + " as its Data Protection Officer and grievance officer. Any Data Principal may raise a complaint or exercise a right by contacting " + dpoEmail + ". The DPO maintains a register of requests and is the point of contact for the Data Protection Board and any supervisory authority.",
    });

    blocks.push({
      kind: "clause", number: 5, title: "Personal data breach notification",
      text:
        "On becoming aware of a personal data breach, the incident response team escalates within " + breachHours + " hours. The organisation notifies the Data Protection Board and, where required, the relevant supervisory authority within 72 hours, and informs affected Data Principals without undue delay. Every breach is logged with its cause, scope and remediation.",
    });

    if (e.dg_processes_children === "yes") {
      blocks.push({
        kind: "clause", number: 6, title: "Children's data",
        text:
          "Where the organisation processes the personal data of a child (any individual under 18), it obtains verifiable parental consent before processing and does not undertake tracking, behavioural monitoring or targeted advertising directed at children, in line with DPDP s.9.",
      });
    }

    blocks.push({
      kind: "clause", number: 7, title: "Retention, storage limitation & erasure",
      text:
        "Personal data is retained only for as long as necessary to fulfil the specified purpose, subject to a default retention period of " + retention + " months unless a longer period is required by law. The data retention schedule applies storage limitation: once data is no longer necessary it is securely erased or anonymised.",
    });

    blocks.push({
      kind: "clause", number: 8, title: "Security safeguards (ISMS)",
      text:
        "The organisation operates an Information Security Management System with an approved information security policy and demonstrable leadership commitment. It runs a documented risk assessment and risk treatment process, enforces access control on a least-privilege basis, protects data using encryption and key management, and provides regular security awareness training to all personnel. These reasonable security safeguards protect against a personal data breach.",
    });

    blocks.push({
      kind: "clause", number: 9, title: "Incident management & business continuity",
      text:
        "Defined responsibilities and procedures govern security incident response. The organisation maintains a business continuity and disaster recovery plan with documented RTO and RPO targets to preserve the availability of personal data and critical services.",
    });

    blocks.push({
      kind: "clause", number: 10, title: "Privacy by design & data protection impact assessments",
      text:
        "Data protection by design and by default is embedded in new systems and processes, applying data minimisation from the outset. A Data Protection Impact Assessment (DPIA) is carried out before any high-risk processing begins, and its mitigations are tracked to closure.",
    });

    blocks.push({
      kind: "clause", number: 11, title: "Supplier & third-party governance",
      text:
        "Information security in supplier and third-party relationships is managed through written agreements, due diligence and ongoing monitoring. Processors act only on documented instructions, and the organisation maintains records of processing activities (ROPA) covering each vendor.",
    });

    if (e.dg_intl_transfer === "yes") {
      blocks.push({
        kind: "clause", number: 12, title: "International transfers",
        text:
          "Cross-border transfers of personal data outside the country or the EEA are safeguarded through an adequacy decision, Standard Contractual Clauses (SCCs) or Binding Corporate Rules, with a transfer impact assessment retained on file.",
      });
    }

    blocks.push({
      kind: "info",
      title: "Review & accountability",
      acts: [
        "Owner: " + dpo + " (Data Protection Officer)",
        "Approved by: " + approver,
        "Effective: " + effDate + " · Next review: " + reviewDate,
      ],
      text:
        "This Policy is reviewed at least annually and after any material change in law or processing. Non-compliance may result in disciplinary action and regulatory liability.",
    });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "Approved for and on behalf of " + org, name: approver },
        { role: "Data Protection Officer", name: dpo },
      ],
    });

    blocks.push({ kind: "footer", text: org + " · Data Governance & Compliance Policy" });

    return blocks;
  },
};
