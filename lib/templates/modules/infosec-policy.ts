import type { TemplateModule, DocSection } from "../types";

export const infosecPolicy: TemplateModule = {
  meta: {
    id: "infosec-policy",
    name: "Information Security Policy",
    categoryId: "compliance",
    category: "Compliance",
    country: ["IN", "US", "UK", "EU"],
    formats: ["pdf", "docx"],
    description: "Information Security Policy aligned with ISO 27001:2022 and SOC 2 Trust Services Criteria. Covers access control, asset management, incident response, BCDR, cryptography, and security awareness.",
    aliases: ["ISO 27001", "SOC 2", "infosec policy", "ISMS policy", "information security"],
    pages: 12,
    minutes: 12,
    status: "live",
  },
  groups: [
    {
      title: "Organisation details",
      fields: [
        { id: "isp_org_name", label: "Organisation / company name", type: "text", required: true, placeholder: "Acme Technologies Pvt Ltd" },
        { id: "isp_effective_date", label: "Policy effective date", type: "date", required: true },
        { id: "isp_review_date", label: "Next review / expiry date", type: "date" },
        { id: "isp_ciso_name", label: "CISO / Security Officer name", type: "text", placeholder: "Vikram Patel" },
        { id: "isp_ciso_email", label: "Security incidents email", type: "email", placeholder: "security@company.com" },
        { id: "isp_ceo_name", label: "CEO / MD name (for management statement)", type: "text" },
      ],
    },
    {
      title: "Policy scope & framework",
      fields: [
        { id: "isp_framework", label: "Alignment framework", type: "select", default: "iso27001", options: [
          { value: "iso27001", label: "ISO 27001:2022" },
          { value: "soc2", label: "SOC 2 Trust Services Criteria" },
          { value: "both", label: "ISO 27001 + SOC 2" },
        ]},
        { id: "isp_cloud_scope", label: "Cloud services in scope?", type: "select", default: "yes", options: [
          { value: "yes", label: "Yes — cloud infrastructure in scope" },
          { value: "no", label: "No — on-premise only" },
        ]},
        { id: "isp_bcdr_rto", label: "Business Continuity RTO (hours)", type: "number", default: "4", placeholder: "4" },
        { id: "isp_bcdr_rpo", label: "Business Continuity RPO (hours)", type: "number", default: "1", placeholder: "1" },
        { id: "isp_incident_notify_hours", label: "Security incident escalation deadline (hours)", type: "number", default: "4", placeholder: "4" },
        { id: "isp_password_length", label: "Minimum password length (characters)", type: "number", default: "12", placeholder: "12" },
        { id: "isp_mfa_required", label: "Multi-factor authentication (MFA) required?", type: "select", default: "yes", options: [
          { value: "yes", label: "Yes — required for all systems" },
          { value: "critical_only", label: "Required for critical systems only" },
        ]},
      ],
    },
  ],
  render(e): DocSection[] {
    const blocks: DocSection[] = [];
    const org = e.isp_org_name || "[Organisation Name]";
    const effDate = e.isp_effective_date ? new Date(e.isp_effective_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Effective Date]";
    const reviewDate = e.isp_review_date ? new Date(e.isp_review_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Review Date]";
    const framework = e.isp_framework === "soc2" ? "SOC 2" : e.isp_framework === "both" ? "ISO 27001:2022 & SOC 2" : "ISO 27001:2022";
    const rto = e.isp_bcdr_rto || "4";
    const rpo = e.isp_bcdr_rpo || "1";
    const incidentHours = e.isp_incident_notify_hours || "4";
    const minPwdLength = e.isp_password_length || "12";

    blocks.push({
      kind: "info",
      title: "Compliance Framework Alignment",
      acts: [
        "ISO/IEC 27001:2022 — Information Security Management Systems",
        "ISO/IEC 27002:2022 — Information Security Controls",
        "SOC 2 (AICPA) — Trust Services Criteria (Security, Availability, Confidentiality)",
        "Digital Personal Data Protection Act, 2023 (DPDP Act, India)",
        "CERT-In Incident Reporting Guidelines (India)",
      ],
      text: `This policy is aligned with ${framework}. ISO 27001 certification requires a full ISMS implementation including risk assessment, Statement of Applicability, and internal audits. SOC 2 requires a Type II audit by an accredited CPA firm.`,
    });

    blocks.push({ kind: "title", text: org.toUpperCase() });
    blocks.push({ kind: "divider" });
    blocks.push({ kind: "subtitle", text: `INFORMATION SECURITY POLICY` });
    blocks.push({ kind: "subtitle", text: `Aligned with ${framework}` });
    blocks.push({ kind: "spacer" });

    blocks.push({ kind: "kv", pairs: [
      { label: "Effective Date", value: effDate },
      { label: "Review Date", value: reviewDate },
      { label: "Framework Alignment", value: framework },
      ...(e.isp_ciso_name ? [{ label: "Security Officer", value: e.isp_ciso_name }] : []),
      ...(e.isp_ciso_email ? [{ label: "Incident Reporting", value: e.isp_ciso_email }] : []),
    ]});

    blocks.push({ kind: "divider" });

    if (e.isp_ceo_name) {
      blocks.push({ kind: "para", text: `Management Statement — ${e.isp_ceo_name}, CEO/MD:\n\nThe security of information assets is fundamental to the trust of our customers, partners, and employees. ${org} is committed to maintaining a robust Information Security Management System (ISMS) aligned with ${framework}. This Policy establishes our commitment to protecting information assets from threats that could compromise their confidentiality, integrity, or availability.` });
    }

    const clauses: DocSection[] = [
      {
        kind: "clause", number: 1, title: "Purpose and Scope",
        text: `This Information Security Policy ("Policy") establishes the framework for managing information security across ${org}. It applies to all employees, contractors, consultants, and third parties who access the Company's information assets, systems, and infrastructure${e.isp_cloud_scope === "yes" ? ", including cloud-hosted environments" : ""}. The Policy supports compliance with ${framework} and applicable data protection regulations.`,
      },
      {
        kind: "clause", number: 2, title: "Information Security Objectives",
        text: "The Company's information security objectives are to: (a) ensure the Confidentiality of information — protecting information from unauthorised access; (b) maintain the Integrity of information — safeguarding accuracy and completeness; (c) ensure the Availability of information — ensuring authorised users can access information when needed; (d) comply with applicable legal, regulatory, and contractual security requirements; (e) continuously improve the ISMS through risk management and regular review.",
      },
      {
        kind: "clause", number: 3, title: "Information Asset Classification",
        text: "All information assets shall be classified and protected according to their sensitivity: (a) Public — information approved for public release; (b) Internal — non-sensitive business information for internal use; (c) Confidential — sensitive business, customer, or employee data requiring restricted access; (d) Restricted — highly sensitive data including personal data, trade secrets, financial records, and credentials — access on strict need-to-know basis.",
      },
      {
        kind: "clause", number: 4, title: "Access Control",
        text: `Access to information assets shall be based on the principle of least privilege: (a) access shall be granted only to the minimum necessary for an individual's job function; (b) user access rights shall be reviewed at least every 6 months and upon role changes; (c) access shall be promptly revoked upon termination of employment or contractor engagement; (d) ${e.isp_mfa_required === "critical_only" ? "multi-factor authentication (MFA) is required for all critical and privileged system access" : "multi-factor authentication (MFA) is required for all systems without exception"}; (e) shared or generic accounts are prohibited.`,
      },
      {
        kind: "clause", number: 5, title: "Password and Authentication Policy",
        text: `Passwords must meet the following minimum requirements: (a) minimum length of ${minPwdLength} characters; (b) include uppercase, lowercase, numbers, and special characters; (c) not reuse the last 10 passwords; (d) be changed every 90 days for privileged accounts, 180 days for standard accounts; (e) not be shared. Password managers are approved for use. Default vendor / manufacturer passwords must be changed immediately on deployment.`,
      },
      {
        kind: "clause", number: 6, title: "Network and System Security",
        text: `Network and system security controls shall include: (a) firewalls and network segmentation separating production, development, and corporate environments; (b) all systems patched within 30 days of critical patch release, 7 days for zero-day vulnerabilities; (c) endpoint protection (anti-malware) on all company devices; (d) encryption of all data in transit using TLS 1.2 or higher; (e) regular vulnerability assessments (at least quarterly) and penetration testing (at least annually); (f) web application firewall (WAF) for internet-facing applications.${e.isp_cloud_scope === "yes" ? " (g) Cloud environments shall follow the shared responsibility model with the cloud provider, with security baselines applied to all cloud accounts." : ""}`,
      },
      {
        kind: "clause", number: 7, title: "Data Protection and Encryption",
        text: `All sensitive data (Confidential and Restricted classification) must be encrypted: (a) at rest — using AES-256 or equivalent; (b) in transit — using TLS 1.2 or higher; (c) on portable devices and removable media — full-disk encryption required. Cryptographic keys shall be managed securely, rotated regularly, and stored separately from the data they protect.`,
      },
      {
        kind: "clause", number: 8, title: "Security Incident Management",
        text: `All actual or suspected security incidents must be reported immediately to ${e.isp_ciso_email || "the CISO / Security team"}. The incident response process includes: (a) Detection and reporting — within ${incidentHours} hours of detection; (b) Containment — immediate steps to limit damage; (c) Investigation — root cause analysis; (d) Remediation — address root cause and close vulnerabilities; (e) Post-incident review — lessons learned. Data breaches involving personal data must also be reported to CERT-In within 6 hours as per CERT-In guidelines, and to the Data Protection Board as required under the DPDP Act.`,
      },
      {
        kind: "clause", number: 9, title: "Business Continuity and Disaster Recovery",
        text: `The Company shall maintain a Business Continuity Plan (BCP) and Disaster Recovery Plan (DRP) with the following targets: Recovery Time Objective (RTO): ${rto} hours; Recovery Point Objective (RPO): ${rpo} hours. BCP/DRP shall be tested at least annually. Critical systems and data shall have automated backups with regular restore testing. Backup data must be stored in geographically separate locations.`,
      },
      {
        kind: "clause", number: 10, title: "Third-Party and Vendor Security",
        text: "Third-party vendors and service providers who access Company information assets must demonstrate adequate information security through: (a) security questionnaires and risk assessments before onboarding; (b) contractual security obligations (Data Processing Agreements where applicable); (c) periodic security reviews for critical vendors; (d) right-to-audit clauses for high-risk processors. Cloud service providers must provide SOC 2 reports or equivalent attestations.",
      },
      {
        kind: "clause", number: 11, title: "Security Awareness and Training",
        text: "All employees shall complete information security awareness training within 30 days of joining and annually thereafter. Phishing simulation exercises shall be conducted at least twice per year. Security training for developers shall include secure coding practices (OWASP Top 10). Personnel who fail phishing simulations or security assessments shall receive additional targeted training.",
      },
      {
        kind: "clause", number: 12, title: "Policy Compliance and Enforcement",
        text: "Compliance with this Policy is mandatory for all Personnel. Violations may result in disciplinary action up to and including termination of employment and, where applicable, criminal prosecution. The CISO is responsible for monitoring compliance. Internal audits of the ISMS shall be conducted at least annually.",
      },
      {
        kind: "clause", number: 13, title: "Policy Review and Update",
        text: `This Policy shall be reviewed at least annually, following significant security incidents, major organisational changes, or changes in the threat landscape. Policy changes must be approved by the CISO and management, and communicated to all Personnel. The next scheduled review date is ${reviewDate}.`,
      },
    ];

    clauses.forEach(c => blocks.push(c));

    blocks.push({ kind: "divider" });
    blocks.push({ kind: "para", text: `This Information Security Policy has been approved by the management of ${org} and is effective from ${effDate}.` });

    blocks.push({ kind: "signatures", parties: [
      { role: e.isp_ceo_name ? "CEO / Managing Director" : "Authorised Signatory", name: e.isp_ceo_name || org },
      { role: "CISO / Information Security Officer", name: e.isp_ciso_name || "___________________" },
    ]});

    blocks.push({ kind: "footer", text: `${org} — Information Security Policy · ${framework} · Generated by Lekha · elevana.guru` });
    return blocks;
  },
};
