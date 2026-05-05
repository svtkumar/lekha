// ============================================================
// FREELANCER / INDEPENDENT CONTRACTOR AGREEMENT
// Drop into: /lib/templates/freelancer-agreement.ts
// Use case: Short-form agreement for engaging an individual
//           freelancer or creative professional for a
//           specific project or ongoing work. Covers project
//           scope, milestones, payment, IP ownership, TDS,
//           GST, and basic IP/confidentiality obligations.
//           Lighter-weight than a full MSA.
// Statute refs: Indian Contract Act 1872; Copyright Act 1957
//   s.17 (employer-for-hire distinction); IT Act 1961 s.194J
//   (TDS @10% on professional/technical fees); CGST Act 2017
//   (GST on freelance services); ESI Act / PF Act (not
//   applicable to genuine independent contractors)
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const freelancerAgreement: TemplateModule = {
  meta: {
    id: "freelancer-agreement",
    name: "Freelancer / Independent Contractor Agreement",
    categoryId: "business",
    category: "Business Contracts",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Project-based or ongoing freelancer agreement between a client and an individual freelancer or independent contractor. Covers project scope, milestones and deliverables, flat or milestone-based payment, TDS u/s 194J at 10%, GST applicability, IP/work-product ownership assigned to client, confidentiality, and revision policy. Lighter than a full MSA — ideal for creative, technical, and professional freelance work.",
    aliases: [
      "freelancer agreement",
      "freelance contract",
      "independent contractor agreement",
      "freelance agreement india",
      "creative services agreement",
      "project contract",
      "gig worker contract",
      "freelancer contract india",
      "work for hire agreement",
    ],
    pages: 3,
    minutes: 5,
    status: "live",
  },

  groups: [
    {
      title: "Client details",
      fields: [
        { id: "fl_client_name", label: "Client / company name", type: "text", required: true, placeholder: "Acme Marketing Private Limited" },
        { id: "fl_client_addr", label: "Client address", type: "textarea", rows: 2, required: true },
        { id: "fl_client_signatory", label: "Client signatory name & designation", type: "text", required: true, placeholder: "Meera Patel, Marketing Head" },
      ],
    },
    {
      title: "Freelancer details",
      fields: [
        { id: "fl_freelancer_name", label: "Freelancer full name", type: "text", required: true, placeholder: "Arjun Mehta" },
        { id: "fl_freelancer_addr", label: "Freelancer address", type: "textarea", rows: 2, required: true },
        { id: "fl_freelancer_pan", label: "Freelancer PAN", type: "text", required: true, placeholder: "AABCM1234D" },
        { id: "fl_freelancer_gstin", label: "Freelancer GSTIN (if registered)", type: "text", placeholder: "29AABCM1234D1ZX" },
        { id: "fl_skill_type", label: "Type of work / skill", type: "select", default: "design",
          options: [
            { value: "design", label: "Design / visual / creative" },
            { value: "development", label: "Software / app / web development" },
            { value: "content", label: "Content writing / copywriting" },
            { value: "video", label: "Video / animation / photography" },
            { value: "marketing", label: "Digital marketing / SEO" },
            { value: "consulting", label: "Technical / management consulting" },
            { value: "other", label: "Other / general" },
          ],
        },
      ],
    },
    {
      title: "Project and deliverables",
      fields: [
        { id: "fl_project_name", label: "Project name / reference", type: "text", required: true, placeholder: "Brand Identity Redesign — Q1 2025" },
        { id: "fl_scope", label: "Project scope and deliverables", type: "textarea", rows: 4, required: true, placeholder: "1. Brand logo (5 concepts, 2 revision rounds)\n2. Brand style guide (colour palette, typography, usage guidelines)\n3. Social media profile templates (Facebook, Instagram, LinkedIn)\n4. Business card and letterhead design\n\nAll in AI/PSD source files + PDF exports." },
        { id: "fl_start_date", label: "Project start date", type: "date", required: true },
        { id: "fl_end_date", label: "Project / delivery deadline", type: "date", required: true },
        { id: "fl_revisions", label: "Revision rounds included", type: "text", placeholder: "2 rounds of revisions per deliverable" },
      ],
    },
    {
      title: "Payment",
      fields: [
        {
          id: "fl_payment_type",
          label: "Payment model",
          type: "select",
          required: true,
          default: "fixed",
          options: [
            { value: "fixed", label: "Fixed project fee (lump sum)" },
            { value: "milestone", label: "Milestone-based payments" },
            { value: "hourly", label: "Hourly rate" },
            { value: "monthly", label: "Monthly retainer" },
          ],
        },
        { id: "fl_total_fee", label: "Total project fee / monthly rate (₹, excluding GST and TDS)", type: "number", required: true, placeholder: "75000" },
        { id: "fl_advance", label: "Advance on signing (₹)", type: "number", placeholder: "25000" },
        { id: "fl_milestone_desc", label: "Payment milestones (if milestone-based)", type: "textarea", rows: 3, placeholder: "50% on signing\n25% on logo approval\n25% on final delivery of all files" },
        {
          id: "fl_gst_applicable",
          label: "GST applicable?",
          type: "radio",
          default: "no",
          options: [
            { value: "yes", label: "Yes — freelancer is GST registered (add 18% GST to fee)" },
            { value: "no", label: "No — freelancer below GST threshold" },
          ],
        },
      ],
    },
    {
      title: "IP and confidentiality",
      fields: [
        {
          id: "fl_ip_ownership",
          label: "IP ownership of deliverables",
          type: "select",
          required: true,
          default: "client_on_payment",
          options: [
            { value: "client_on_payment", label: "Client — all IP assigned to client upon full payment" },
            { value: "client_immediately", label: "Client — IP transfers immediately on delivery" },
            { value: "freelancer_licence", label: "Freelancer retains IP — client gets non-exclusive licence" },
          ],
        },
        { id: "fl_conf_years", label: "Confidentiality duration post-project", type: "select", default: "2",
          options: [{ value: "1", label: "1 year" }, { value: "2", label: "2 years" }, { value: "3", label: "3 years" }],
        },
        {
          id: "fl_portfolio_rights",
          label: "Freelancer portfolio rights",
          type: "radio",
          default: "yes",
          options: [
            { value: "yes", label: "Yes — freelancer may display work in portfolio (unless client is confidential)" },
            { value: "no", label: "No — client requires full confidentiality, no portfolio display" },
          ],
        },
        { id: "fl_jurisdiction_city", label: "Jurisdiction city", type: "text", required: true, placeholder: "Bengaluru" },
      ],
    },
  ],

  render(e) {
    const client = e.fl_client_name || "[Client]";
    const freelancer = e.fl_freelancer_name || "[Freelancer]";
    const fee = Number(e.fl_total_fee || 0);
    const advance = Number(e.fl_advance || 0);
    const gst = e.fl_gst_applicable === "yes" ? Math.round(fee * 0.18) : 0;
    const tds = Math.round(fee * 0.10);
    const paymentType = e.fl_payment_type || "fixed";
    const ipOwnership = e.fl_ip_ownership || "client_on_payment";
    const confYears = e.fl_conf_years || "2";

    const paymentDesc = paymentType === "milestone" && e.fl_milestone_desc
      ? "Milestone-based payments as follows:\n" + e.fl_milestone_desc
      : paymentType === "hourly"
      ? "Hourly rate of ₹" + fee.toLocaleString("en-IN") + " per hour, invoiced monthly based on actual hours worked with supporting timesheet."
      : paymentType === "monthly"
      ? "Monthly retainer of ₹" + fee.toLocaleString("en-IN") + " per month, payable within 15 days of the freelancer's monthly invoice."
      : "A fixed project fee of ₹" + fee.toLocaleString("en-IN") + " (Rupees [AMOUNT_IN_WORDS] only)." +
        (advance > 0 ? " An advance of ₹" + advance.toLocaleString("en-IN") + " is payable upon signing. The balance of ₹" + (fee - advance).toLocaleString("en-IN") + " is payable upon delivery and acceptance of all deliverables." : " The full amount is payable upon delivery and acceptance of all deliverables.");

    const ipClause = ipOwnership === "client_immediately"
      ? "All intellectual property rights in the Deliverables, including copyright, are assigned to the Client with immediate effect upon delivery. The Freelancer waives all moral rights (to the extent permitted by law) in favour of the Client."
      : ipOwnership === "freelancer_licence"
      ? "The Freelancer retains all intellectual property rights in the Deliverables. The Freelancer grants the Client a non-exclusive, perpetual, royalty-free licence to use the Deliverables for the Client's own business purposes. The Client may not sub-licence, resell, or transfer the Deliverables without the Freelancer's written consent."
      : "All intellectual property rights in the Deliverables, including copyright in designs, code, content, and other work product, shall be assigned to the Client upon receipt of full payment. Until full payment is received, the Freelancer retains all IP rights and the Client shall not use the Deliverables commercially.";

    const blocks: DocSection[] = [];

    blocks.push({ kind: "title", text: "FREELANCER / INDEPENDENT CONTRACTOR AGREEMENT" });

    blocks.push({
      kind: "para",
      text:
        'THIS AGREEMENT is entered into as of [START_DATE] between:\n\n' +
        '1. ' + client + ', at ' + (e.fl_client_addr || "[Address]") + ', represented by ' + (e.fl_client_signatory || "[Signatory]") + ' (hereinafter "Client"); AND\n\n' +
        '2. ' + freelancer + ', at ' + (e.fl_freelancer_addr || "[Address]") + (e.fl_freelancer_pan ? ' (PAN: ' + e.fl_freelancer_pan + ')' : '') + (e.fl_freelancer_gstin ? ' (GSTIN: ' + e.fl_freelancer_gstin + ')' : '') + ' (hereinafter "Freelancer").',
    });

    const clauses: DocSection[] = [
      {
        kind: "clause", number: 1, title: "Project Scope and Deliverables",
        text: "Project: " + (e.fl_project_name || "[Project Name]") + "\n\nScope and Deliverables:\n" + (e.fl_scope || "[Describe scope and deliverables]") + "\n\nTimeline: Start date [START_DATE]. Delivery deadline: [END_DATE]." + (e.fl_revisions ? "\n\nRevisions: " + e.fl_revisions + ". Additional revisions beyond the agreed rounds will be billed at ₹[RATE]/hour." : ""),
      },
      {
        kind: "clause", number: 2, title: "Fees and Payment",
        text: paymentDesc + "\n\nAll fees are exclusive of applicable GST." + (gst > 0 ? " GST at 18% will be charged additionally by the Freelancer as per GSTIN: " + (e.fl_freelancer_gstin || "[GSTIN]") + "." : "") + "\n\nTDS: The Client shall deduct TDS at 10% under s.194J of the Income Tax Act 1961 on all payments and deposit it with the government. The Client shall issue Form 16A to the Freelancer within 15 days of the end of each quarter.",
      },
      {
        kind: "clause", number: 3, title: "Independent Contractor",
        text: "The Freelancer is an independent contractor. This Agreement does not create an employer-employee, principal-agent, or partnership relationship. The Freelancer shall be responsible for their own taxes (other than TDS deductible by the Client), insurance, and compliance with applicable laws. The Client has no obligation to provide the Freelancer with PF, ESI, gratuity, leave, or other employment benefits.",
      },
      {
        kind: "clause", number: 4, title: "Intellectual Property",
        text: ipClause,
      },
      {
        kind: "clause", number: 5, title: "Confidentiality",
        text: "The Freelancer shall keep confidential all business information, strategies, client data, and other non-public information of the Client received during this engagement and shall not disclose it to third parties. These obligations continue for " + confYears + " years after completion of the project." + (e.fl_portfolio_rights === "yes" ? "\n\nPortfolio: The Freelancer may display the Deliverables in their portfolio or online profiles, unless the Client notifies in writing that the work is confidential." : "\n\nPortfolio: The Freelancer shall not display or reference the Deliverables in any portfolio, social media, or promotional material without the Client's prior written consent."),
      },
      {
        kind: "clause", number: 6, title: "Warranties",
        text: "The Freelancer warrants that: (a) the Deliverables are the Freelancer's original work; (b) the Deliverables do not infringe any third-party intellectual property rights; (c) the Freelancer has the full right and authority to enter into this Agreement and perform the services.",
      },
      {
        kind: "clause", number: 7, title: "Termination",
        text: "Either Party may terminate this Agreement on 7 days' written notice. If the Client terminates early, the Freelancer shall be paid for all work completed and accepted up to the date of termination, pro-rated from the total fee. If the Freelancer terminates early, the Client shall pay for completed milestones only and the Freelancer shall deliver all work-in-progress to the Client.",
      },
      {
        kind: "clause", number: 8, title: "Governing Law",
        text: "This Agreement is governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of the courts at " + (e.fl_jurisdiction_city || "[City]") + ".",
      },
    ];

    clauses.forEach((c) => blocks.push(c));

    blocks.push({ kind: "divider" });
    blocks.push({ kind: "para", text: "IN WITNESS WHEREOF the Parties have executed this Agreement as of the date first written above." });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "Client\n" + client + "\n" + (e.fl_client_signatory || "[Signatory]"), name: "[Signature]" },
        { role: "Freelancer\n" + freelancer, name: "[Signature]" },
      ],
    });

    return blocks;
  },
};
