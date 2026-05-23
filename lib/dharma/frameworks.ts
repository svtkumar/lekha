/**
 * Dharma — compliance framework control libraries.
 *
 * Each control is a discrete obligation drawn from a published framework.
 * `signals` are lowercase phrases whose presence in a policy/document is
 * positive evidence that the obligation is addressed. This is a heuristic
 * gap-finder, NOT legal certification — it flags what to review, not what is
 * compliant. Keep signal lists conservative to avoid false "met" results.
 */

export type Control = {
  id: string;
  title: string;
  requirement: string;
  /** lowercase phrases; presence is positive evidence the control is addressed */
  signals: string[];
  /** relative importance, default 1 */
  weight?: number;
};

export type Framework = {
  id: string;
  name: string;
  authority: string;
  summary: string;
  controls: Control[];
};

export const frameworks: Framework[] = [
  {
    id: "dpdpa",
    name: "DPDP Act 2023",
    authority: "India · Digital Personal Data Protection Act, 2023",
    summary:
      "India's data-protection statute. Governs processing of digital personal data, consent, data-principal rights, and breach reporting to the Data Protection Board.",
    controls: [
      { id: "dpdpa-notice", title: "Notice to Data Principal", requirement: "Provide an itemised notice of personal data collected and the purpose of processing (s.5).", signals: ["notice", "purpose of processing", "personal data collected", "itemised notice"] },
      { id: "dpdpa-consent", title: "Consent & withdrawal", requirement: "Obtain free, specific, informed consent and offer an equally easy means to withdraw it (s.6).", signals: ["consent", "withdraw consent", "withdrawal of consent", "informed consent"] },
      { id: "dpdpa-purpose", title: "Purpose limitation", requirement: "Process data only for the specified lawful purpose for which consent was given (s.6).", signals: ["purpose limitation", "specified purpose", "lawful purpose", "only for the purpose"] },
      { id: "dpdpa-rights", title: "Data-principal rights", requirement: "Enable rights to access, correction, erasure and grievance redressal (s.11–13).", signals: ["right to access", "right to correction", "right to erasure", "data principal rights", "right to grievance"] },
      { id: "dpdpa-grievance", title: "Grievance redressal / DPO", requirement: "Publish a Data Protection Officer / grievance contact and a redressal mechanism (s.8(9), s.13).", signals: ["data protection officer", "grievance", "dpo", "grievance officer", "contact for complaints"] },
      { id: "dpdpa-breach", title: "Breach notification", requirement: "Notify the Data Protection Board and affected principals of a personal data breach (s.8(6)).", signals: ["personal data breach", "breach notification", "notify the board", "data protection board", "breach of personal data"] },
      { id: "dpdpa-children", title: "Children's data", requirement: "Obtain verifiable parental consent before processing a child's data; no tracking/targeted ads (s.9).", signals: ["children", "child's data", "parental consent", "verifiable consent", "under 18"] },
      { id: "dpdpa-retention", title: "Retention & erasure", requirement: "Erase personal data once the purpose is served and retention is no longer necessary (s.8(7)).", signals: ["data retention", "retention period", "erase", "no longer necessary", "deletion of data"] },
      { id: "dpdpa-security", title: "Reasonable security safeguards", requirement: "Implement reasonable security safeguards to prevent a personal data breach (s.8(5)).", signals: ["security safeguards", "technical and organisational", "encryption", "access control", "reasonable security"] },
      { id: "dpdpa-fiduciary", title: "Data fiduciary obligations", requirement: "Identify the Data Fiduciary and ensure accuracy and accountability for processing (s.8).", signals: ["data fiduciary", "data processor", "accountability", "accuracy of data"] },
    ],
  },
  {
    id: "gdpr",
    name: "GDPR",
    authority: "EU · General Data Protection Regulation 2016/679",
    summary:
      "The EU's data-protection regulation. Establishes lawful bases, data-subject rights, accountability, DPIAs, and a 72-hour breach-notification duty.",
    controls: [
      { id: "gdpr-lawful", title: "Lawful basis for processing", requirement: "Identify a lawful basis under Art.6 (consent, contract, legal obligation, legitimate interest, etc.).", signals: ["lawful basis", "legitimate interest", "legal basis for processing", "article 6", "consent"] },
      { id: "gdpr-consent", title: "Consent standard", requirement: "Where relying on consent, it must be freely given, specific, informed and withdrawable (Art.7).", signals: ["consent", "withdraw consent", "freely given", "explicit consent"] },
      { id: "gdpr-rights", title: "Data-subject rights", requirement: "Facilitate access, rectification, erasure, portability, restriction and objection (Art.15–22).", signals: ["right to access", "right to erasure", "right to be forgotten", "data portability", "rectification", "data subject rights"] },
      { id: "gdpr-dpo", title: "Data Protection Officer", requirement: "Appoint a DPO where required and publish contact details (Art.37–39).", signals: ["data protection officer", "dpo", "supervisory authority contact"] },
      { id: "gdpr-dpia", title: "Data Protection Impact Assessment", requirement: "Carry out a DPIA for high-risk processing (Art.35).", signals: ["data protection impact assessment", "dpia", "impact assessment", "high-risk processing"] },
      { id: "gdpr-breach", title: "72-hour breach notification", requirement: "Notify the supervisory authority within 72 hours of becoming aware of a breach (Art.33–34).", signals: ["72 hours", "breach notification", "supervisory authority", "personal data breach", "notify within"] },
      { id: "gdpr-records", title: "Records of processing (ROPA)", requirement: "Maintain records of processing activities (Art.30).", signals: ["records of processing", "ropa", "processing activities", "record of processing"] },
      { id: "gdpr-transfers", title: "International transfers", requirement: "Safeguard transfers outside the EEA via adequacy, SCCs or BCRs (Art.44–49).", signals: ["international transfer", "standard contractual clauses", "scc", "adequacy decision", "cross-border transfer", "binding corporate rules"] },
      { id: "gdpr-privacy-by-design", title: "Privacy by design & default", requirement: "Implement data protection by design and by default (Art.25).", signals: ["privacy by design", "data protection by design", "by default", "data minimisation"] },
      { id: "gdpr-retention", title: "Storage limitation", requirement: "Keep personal data no longer than necessary for the purpose (Art.5(1)(e)).", signals: ["storage limitation", "retention period", "no longer than necessary", "data retention"] },
    ],
  },
  {
    id: "iso27001",
    name: "ISO/IEC 27001:2022",
    authority: "ISO · Information Security Management Systems",
    summary:
      "The international standard for an Information Security Management System (ISMS). Covers leadership, risk assessment, Annex A controls, and continual improvement.",
    controls: [
      { id: "iso-scope", title: "ISMS scope & policy", requirement: "Define the ISMS scope and an approved information security policy (cl.4–5).", signals: ["isms", "information security policy", "scope of the isms", "security management system"] },
      { id: "iso-leadership", title: "Leadership & commitment", requirement: "Demonstrate top-management commitment and assign security roles (cl.5).", signals: ["top management", "leadership commitment", "roles and responsibilities", "management review"] },
      { id: "iso-risk", title: "Risk assessment & treatment", requirement: "Operate a documented information security risk assessment and treatment process (cl.6, 8).", signals: ["risk assessment", "risk treatment", "statement of applicability", "risk register", "soa"] },
      { id: "iso-access", title: "Access control", requirement: "Restrict access to information and systems on least-privilege and need-to-know (A.5.15–A.5.18).", signals: ["access control", "least privilege", "need-to-know", "user access", "privileged access"] },
      { id: "iso-crypto", title: "Cryptography", requirement: "Protect information using cryptographic controls and key management (A.8.24).", signals: ["cryptography", "encryption", "key management", "cryptographic controls", "tls"] },
      { id: "iso-incident", title: "Incident management", requirement: "Establish responsibilities and procedures for security incident response (A.5.24–A.5.28).", signals: ["incident management", "incident response", "security incident", "incident response plan"] },
      { id: "iso-continuity", title: "Business continuity", requirement: "Plan ICT readiness for business continuity, including RTO/RPO (A.5.29–A.5.30).", signals: ["business continuity", "disaster recovery", "rto", "rpo", "bcdr", "continuity plan"] },
      { id: "iso-assets", title: "Asset management", requirement: "Maintain an inventory of assets and acceptable-use rules (A.5.9–A.5.11).", signals: ["asset management", "asset inventory", "acceptable use", "information assets"] },
      { id: "iso-supplier", title: "Supplier security", requirement: "Manage information security in supplier and third-party relationships (A.5.19–A.5.23).", signals: ["supplier", "third party", "vendor security", "supplier relationships", "outsourcing"] },
      { id: "iso-awareness", title: "Awareness & training", requirement: "Provide security awareness, education and training to personnel (A.6.3).", signals: ["security awareness", "training", "awareness programme", "staff training"] },
    ],
  },
];

export function frameworkById(id: string): Framework | undefined {
  return frameworks.find((f) => f.id === id);
}

export const allFrameworkIds = frameworks.map((f) => f.id);
