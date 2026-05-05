// ============================================================
// CONSULTANCY / ADVISORY AGREEMENT
// Drop into: /lib/templates/consultancy-agreement.ts
// Use case: Agreement appointing an individual consultant /
//           advisor or a consulting firm to provide advisory,
//           strategic, or specialist services. Covers TDS,
//           independent contractor status, non-solicitation,
//           retainer vs. project-based fee models, and
//           IP/work-product ownership.
// Statute refs: Indian Contract Act 1872; IT Act 1961 ss.
//   194J (TDS on professional fees @10%); CGST Act 2017
//   (GST @ 18% on consulting services); Copyright Act 1957
//   s.17; ESI Act 1948 / PF Act 1952 (not applicable to
//   independent contractors — key distinction from employees)
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const consultancyAgreement: TemplateModule = {
  meta: {
    id: "consultancy-agreement",
    name: "Consultancy / Advisory Agreement",
    categoryId: "business",
    category: "Business Contracts",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Consultancy and advisory agreement appointing an individual consultant or consulting firm to provide specialist, strategic, or advisory services. Covers retainer or project-based fee structures, TDS u/s 194J, GST, independent contractor status (no employer-employee relationship), IP assignment, non-solicitation, and confidentiality.",
    aliases: [
      "consultancy agreement",
      "consulting agreement",
      "advisory agreement",
      "advisor agreement",
      "consultant contract",
      "independent contractor agreement",
      "advisory services agreement",
      "consultant india",
      "retainer agreement",
    ],
    pages: 5,
    minutes: 7,
    status: "live",
  },

  groups: [
    {
      title: "Client / company details",
      fields: [
        { id: "ca_client_name", label: "Client / company legal name", type: "text", required: true, placeholder: "Acme Technologies Private Limited" },
        { id: "ca_client_addr", label: "Client address", type: "textarea", rows: 2, required: true },
        { id: "ca_client_signatory", label: "Client authorised signatory", type: "text", required: true, placeholder: "Priya Sharma, CEO" },
      ],
    },
    {
      title: "Consultant / advisor details",
      fields: [
        { id: "ca_consultant_name", label: "Consultant / advisor name (individual or firm)", type: "text", required: true, placeholder: "Rajesh Kumar / Kumar Advisory LLP" },
        { id: "ca_consultant_addr", label: "Consultant address", type: "textarea", rows: 2, required: true },
        { id: "ca_consultant_pan", label: "Consultant PAN", type: "text", required: true, placeholder: "AABCK1234D" },
        { id: "ca_consultant_type", label: "Consultant type", type: "select", default: "individual",
          options: [
            { value: "individual", label: "Individual consultant / advisor" },
            { value: "firm", label: "Consulting firm / LLP / company" },
          ],
        },
        { id: "ca_consultant_gstin", label: "Consultant GSTIN (if GST registered)", type: "text", placeholder: "29AABCK1234C1ZX" },
      ],
    },
    {
      title: "Engagement scope",
      fields: [
        { id: "ca_scope", label: "Scope of consulting services", type: "textarea", rows: 3, required: true, placeholder: "Strategic advisory on market expansion into Southeast Asia; competitive intelligence; quarterly board presentations; introduction to investor network." },
        { id: "ca_start_date", label: "Engagement start date", type: "date", required: true },
        {
          id: "ca_term",
          label: "Engagement term",
          type: "select",
          default: "12months",
          options: [
            { value: "3months", label: "3 months" },
            { value: "6months", label: "6 months" },
            { value: "12months", label: "12 months" },
            { value: "24months", label: "24 months" },
            { value: "project", label: "Project-based (until deliverable)" },
          ],
        },
        { id: "ca_time_commitment", label: "Time commitment (hours/days per month)", type: "text", placeholder: "2–3 days per month / up to 8 hours per week" },
      ],
    },
    {
      title: "Fee structure",
      fields: [
        {
          id: "ca_fee_type",
          label: "Fee model",
          type: "select",
          required: true,
          default: "retainer",
          options: [
            { value: "retainer", label: "Monthly retainer (fixed)" },
            { value: "project", label: "Project / milestone-based lump sum" },
            { value: "hourly", label: "Hourly / daily rate" },
            { value: "retainer_plus_success", label: "Retainer + success fee / equity" },
          ],
        },
        { id: "ca_retainer_amount", label: "Monthly retainer / fee amount (₹)", type: "number", placeholder: "100000" },
        { id: "ca_hourly_rate", label: "Hourly rate (₹) — if hourly model", type: "number", placeholder: "5000" },
        { id: "ca_success_fee", label: "Success fee / equity description (if applicable)", type: "text", placeholder: "0.25% ESOP on Series A close / 2% of deal value on M&A transaction close" },
        {
          id: "ca_gst_applicable",
          label: "Is GST applicable?",
          type: "radio",
          default: "yes",
          options: [
            { value: "yes", label: "Yes — consultant is GST registered (18% GST on fees)" },
            { value: "no", label: "No — below GST threshold / composition" },
          ],
        },
        { id: "ca_payment_day", label: "Payment due (day of month)", type: "text", placeholder: "5th of each month / 30 days from invoice" },
      ],
    },
    {
      title: "Post-engagement obligations",
      fields: [
        { id: "ca_non_solicit_months", label: "Non-solicitation period (months post-termination)", type: "select", default: "12",
          options: [{ value: "6", label: "6 months" }, { value: "12", label: "12 months" }, { value: "18", label: "18 months" }, { value: "0", label: "None" }],
        },
        { id: "ca_conf_years", label: "Confidentiality duration post-termination", type: "select", default: "3",
          options: [{ value: "2", label: "2 years" }, { value: "3", label: "3 years" }, { value: "5", label: "5 years" }, { value: "indefinite", label: "Indefinite" }],
        },
        { id: "ca_jurisdiction_city", label: "Jurisdiction city", type: "text", required: true, placeholder: "Mumbai" },
        { id: "ca_jurisdiction_state", label: "Jurisdiction state", type: "select", required: true, options: [
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
    const client = e.ca_client_name || "[Client]";
    const consultant = e.ca_consultant_name || "[Consultant]";
    const isIndividual = (e.ca_consultant_type || "individual") === "individual";
    const feeType = e.ca_fee_type || "retainer";
    const retainer = Number(e.ca_retainer_amount || 0);
    const hourly = Number(e.ca_hourly_rate || 0);
    const gstApplicable = e.ca_gst_applicable === "yes";
    const nsMonths = e.ca_non_solicit_months || "12";
    const confYears = e.ca_conf_years === "indefinite" ? "indefinitely" : `${e.ca_conf_years || "3"} years`;
    const termLabel = { "3months": "3 months", "6months": "6 months", "12months": "12 months", "24months": "24 months", "project": "the duration of the project" }[e.ca_term || "12months"] || "12 months";

    const feeDescription = feeType === "retainer"
      ? "A monthly retainer fee of ₹" + retainer.toLocaleString("en-IN") + " (Rupees [AMOUNT_IN_WORDS] only) plus applicable GST" + (gstApplicable ? " at 18%" : " (if applicable)") + ", payable by the " + (e.ca_payment_day || "5th") + " of each month, subject to deduction of TDS under s.194J of the Income Tax Act 1961."
      : feeType === "hourly"
      ? "Fees at the rate of ₹" + hourly.toLocaleString("en-IN") + " per hour (plus applicable GST), invoiced monthly based on hours worked and supported by timesheets. Payment due within 30 days of invoice."
      : feeType === "project"
      ? "A project fee as specified in the project order / work order agreed by the Parties. Invoiced on milestone completion as per the agreed payment schedule."
      : "A monthly retainer of ₹" + retainer.toLocaleString("en-IN") + " plus applicable GST, and a success fee as follows: " + (e.ca_success_fee || "[Success fee description]") + ".";

    const blocks: DocSection[] = [];

    blocks.push({ kind: "title", text: "CONSULTANCY AND ADVISORY AGREEMENT" });

    blocks.push({
      kind: "para",
      text:
        'THIS CONSULTANCY AND ADVISORY AGREEMENT ("Agreement") is entered into as of [START_DATE] between:\n\n' +
        '1. ' + client + ', having its address at ' + (e.ca_client_addr || "[Address]") + ', represented by ' + (e.ca_client_signatory || "[Signatory]") + ' (hereinafter "Client"); AND\n\n' +
        '2. ' + consultant + (e.ca_consultant_addr ? ', of ' + e.ca_consultant_addr : '') + (e.ca_consultant_pan ? ' (PAN: ' + e.ca_consultant_pan + ')' : '') + (e.ca_consultant_gstin ? ' (GSTIN: ' + e.ca_consultant_gstin + ')' : '') + ' (hereinafter "Consultant").',
    });

    const clauses: DocSection[] = [
      {
        kind: "clause", number: 1, title: "Appointment and Scope",
        text: "The Client hereby appoints the Consultant to provide the following advisory and consulting services (\"Services\"):\n\n" + (e.ca_scope || "[Describe scope of consulting services]") + "\n\nThe Consultant shall devote approximately " + (e.ca_time_commitment || "[time commitment]") + " to the engagement. The Consultant shall perform the Services diligently and in accordance with professional standards.",
      },
      {
        kind: "clause", number: 2, title: "Term",
        text: "This Agreement commences on [START_DATE] and continues for " + termLabel + " unless earlier terminated in accordance with Clause 8. " + (e.ca_term !== "project" ? "Either Party may extend this Agreement by mutual written consent." : "The Agreement terminates upon completion and acceptance of the project deliverables."),
      },
      {
        kind: "clause", number: 3, title: "Fees and Payment",
        text: feeDescription + "\n\nThe Client shall deduct TDS at 10% under s.194J and issue Form 16A quarterly. All payments shall be made by NEFT/RTGS to the Consultant's bank account. The Consultant shall issue GST-compliant invoices where applicable.",
      },
      {
        kind: "clause", number: 4, title: "Independent Contractor Status",
        text: "The Consultant is an independent contractor and not an employee, agent, partner, or joint venture of the Client. The Client shall have no obligation to deduct Provident Fund contributions, ESI contributions, or pay gratuity to the Consultant. The Consultant shall be solely responsible for their own taxes (other than TDS deductible by the Client), statutory filings, and compliance with applicable laws. The Consultant may engage in other consulting activities, subject to the non-solicitation provisions below, provided such activities do not conflict with the Services or breach this Agreement.",
      },
      {
        kind: "clause", number: 5, title: "Intellectual Property",
        text: "All work product, reports, analyses, presentations, and other deliverables created by the Consultant specifically for the Client under this Agreement (\"Work Product\") shall, upon full payment, be the exclusive property of the Client. The Consultant hereby assigns all intellectual property rights therein to the Client. The Consultant retains ownership of all pre-existing tools, methodologies, frameworks, and background materials and grants the Client a non-exclusive licence to use them as incorporated in the Work Product.",
      },
      {
        kind: "clause", number: 6, title: "Confidentiality",
        text: "The Consultant shall maintain strict confidentiality of all non-public information of the Client received in connection with this engagement and shall not disclose it to any third party. These obligations continue for " + confYears + " after termination. The Consultant shall promptly return all confidential materials upon termination.",
      },
      {
        kind: "clause", number: 7, title: "Non-Solicitation",
        text: nsMonths !== "0"
          ? "For a period of " + nsMonths + " months following the termination of this Agreement, the Consultant shall not, directly or indirectly: (a) solicit or hire any employee of the Client with whom the Consultant had contact during this engagement; (b) solicit or do business with any client or customer of the Client with whom the Consultant had material dealings, using information obtained during this engagement. This clause does not restrict general advertising or the Consultant's right to do business in their area of expertise."
          : "No post-engagement non-solicitation obligations apply.",
      },
      {
        kind: "clause", number: 8, title: "Termination",
        text: "Either Party may terminate this Agreement by giving 30 days' written notice. Either Party may terminate immediately if the other commits a material breach not remedied within 15 days of written notice, becomes insolvent, or engages in fraud or wilful misconduct. On termination, the Client shall pay fees for all Services performed up to the date of termination.",
      },
      {
        kind: "clause", number: 9, title: "Governing Law",
        text: "This Agreement is governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of the courts at " + (e.ca_jurisdiction_city || "[City]") + ", " + (e.ca_jurisdiction_state || "[State]") + ".",
      },
    ];

    clauses.forEach((c) => blocks.push(c));

    blocks.push({ kind: "divider" });

    blocks.push({ kind: "para", text: "IN WITNESS WHEREOF the Parties have signed this Agreement as of the date first written above." });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "Client\n" + client + "\n" + (e.ca_client_signatory || "[Signatory]"), name: "[Signature & Seal]" },
        { role: "Consultant\n" + consultant, name: "[Signature]" },
      ],
    });

    return blocks;
  },
};
