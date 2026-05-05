// ============================================================
// NO OBJECTION CERTIFICATE (NOC)
// Drop into: /lib/templates/noc-letter.ts
// Use case: General-purpose NOC letter issued by an employer,
//           company, landlord, bank, or authority to certify
//           no objection to a specific act or request.
//           Covers employment/visa NOC, property NOC,
//           bank NOC on loan closure, college/school NOC,
//           and business/government NOC.
// Statute refs: Indian Contract Act 1872 (evidentiary value);
//   Specific Relief Act 1963 (injunctions / specific performance
//   context); CPC 1908 (evidentiary use in court proceedings);
//   Passports Act 1967 / Visa rules (employer NOC for visa);
//   Transfer of Property Act 1882 (property NOC context)
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const nocLetter: TemplateModule = {
  meta: {
    id: "noc-letter",
    name: "No Objection Certificate (NOC)",
    categoryId: "business",
    category: "Business & Operations",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "No Objection Certificate (NOC) letter for employment/visa applications, property transactions, bank loan closure, educational institutions, and general business purposes. Covers employer NOC for employee travel/visa/higher studies, property NOC from landlord or bank, and company NOC for third-party dealings.",
    aliases: [
      "no objection certificate",
      "NOC letter",
      "NOC from employer",
      "NOC for visa",
      "NOC property",
      "bank NOC",
      "no objection letter",
      "NOC for higher studies",
      "NOC for business",
    ],
    pages: 2,
    minutes: 4,
    status: "live",
  },

  groups: [
    {
      title: "Issuing party (who gives the NOC)",
      fields: [
        { id: "noc_issuer_name", label: "Issuing organisation / person name", type: "text", required: true, placeholder: "Acme Technologies Private Limited" },
        { id: "noc_issuer_addr", label: "Issuer address", type: "textarea", rows: 2, required: true },
        { id: "noc_issuer_designation", label: "Designation / role of signatory", type: "text", required: true, placeholder: "HR Manager / CEO / Landlord / Branch Manager" },
        { id: "noc_ref_no", label: "Reference number (optional)", type: "text", placeholder: "HR/NOC/2024-25/001" },
        { id: "noc_date", label: "Date of issue", type: "date", required: true },
      ],
    },
    {
      title: "Beneficiary (in whose favour NOC is issued)",
      fields: [
        { id: "noc_beneficiary_name", label: "Beneficiary full name", type: "text", required: true, placeholder: "Rahul Verma" },
        { id: "noc_beneficiary_id", label: "Beneficiary ID / designation / relationship", type: "text", placeholder: "Employee ID: EMP-123 / Tenant / Borrower / Student" },
        { id: "noc_beneficiary_addr", label: "Beneficiary address (if relevant)", type: "textarea", rows: 2 },
      ],
    },
    {
      title: "NOC type and purpose",
      fields: [
        {
          id: "noc_type",
          label: "NOC type",
          type: "select",
          required: true,
          default: "employment_visa",
          options: [
            { value: "employment_visa", label: "Employment NOC — Visa / Travel / Passport" },
            { value: "employment_studies", label: "Employment NOC — Higher Studies / Education" },
            { value: "employment_business", label: "Employment NOC — Side Business / Freelancing" },
            { value: "property_landlord", label: "Property NOC — from Landlord (tenant's dealings)" },
            { value: "property_bank", label: "Property NOC — from Bank / Lender (loan closure)" },
            { value: "bank_loan_closure", label: "Bank NOC — Loan Closure / No Dues Certificate" },
            { value: "college_school", label: "College / School NOC — for student" },
            { value: "general_business", label: "General / Business NOC" },
          ],
        },
        { id: "noc_purpose", label: "Specific purpose (what is the NOC for)", type: "textarea", rows: 3, required: true, placeholder: "To apply for a long-term business visa to the United States of America to attend client meetings and conferences. / To pursue a part-time MBA programme at IIM Bangalore. / No dues outstanding on Home Loan Account No. HL-123456." },
        { id: "noc_address_to", label: "Addressed to (authority / institution, if specific)", type: "text", placeholder: "The Embassy of the United States of America, New Delhi / Admissions Office, IIM Bangalore" },
        {
          id: "noc_validity",
          label: "Validity of NOC",
          type: "select",
          default: "3_months",
          options: [
            { value: "1_month", label: "1 month from date of issue" },
            { value: "3_months", label: "3 months from date of issue" },
            { value: "6_months", label: "6 months from date of issue" },
            { value: "1_year", label: "1 year from date of issue" },
            { value: "one_time", label: "One-time use — single transaction" },
            { value: "no_expiry", label: "No fixed expiry" },
          ],
        },
      ],
    },
    {
      title: "Additional details (context-specific)",
      fields: [
        { id: "noc_employment_since", label: "Date of employment / tenancy / loan since (if applicable)", type: "date" },
        { id: "noc_designation_role", label: "Beneficiary's current designation / role (if employment NOC)", type: "text", placeholder: "Software Engineer" },
        { id: "noc_loan_account", label: "Loan / account number (if bank/property NOC)", type: "text", placeholder: "HL-123456789" },
        { id: "noc_property_addr", label: "Property address (if property NOC)", type: "textarea", rows: 2 },
        {
          id: "noc_conditions",
          label: "Any conditions attached to the NOC?",
          type: "radio",
          required: true,
          default: "no",
          options: [
            { value: "no", label: "No — unconditional NOC" },
            { value: "yes", label: "Yes — conditional NOC" },
          ],
        },
        { id: "noc_conditions_text", label: "Conditions (if any)", type: "textarea", rows: 2, placeholder: "This NOC is valid only for the specific purpose stated herein. The employee's primary employment obligations shall continue to take precedence." },
      ],
    },
  ],

  render(e) {
    const issuer = e.noc_issuer_name || "[Issuer]";
    const beneficiary = e.noc_beneficiary_name || "[Beneficiary]";
    const purpose = e.noc_purpose || "[Purpose]";
    const nocType = e.noc_type || "general_business";

    const validityText = {
      "1_month": "one (1) month from the date of this certificate",
      "3_months": "three (3) months from the date of this certificate",
      "6_months": "six (6) months from the date of this certificate",
      "1_year": "one (1) year from the date of this certificate",
      "one_time": "the specific transaction / purpose stated herein only, and shall be deemed to have expired on completion of such transaction",
      "no_expiry": "an indefinite period, unless specifically revoked in writing by the issuer",
    }[e.noc_validity || "3_months"] || "three months from the date of this certificate";

    const noctypeHeading = {
      employment_visa: "NO OBJECTION CERTIFICATE\n(For Visa / Travel / Passport Application)",
      employment_studies: "NO OBJECTION CERTIFICATE\n(For Higher Education / Course Enrolment)",
      employment_business: "NO OBJECTION CERTIFICATE\n(For Business / Freelance Activity)",
      property_landlord: "NO OBJECTION CERTIFICATE\n(Landlord — Property Dealings)",
      property_bank: "NO OBJECTION CERTIFICATE\n(Bank — Property Mortgage Release)",
      bank_loan_closure: "NO DUES CERTIFICATE / NO OBJECTION CERTIFICATE\n(Loan Account Closure)",
      college_school: "NO OBJECTION CERTIFICATE\n(Educational Institution)",
      general_business: "NO OBJECTION CERTIFICATE",
    }[nocType] || "NO OBJECTION CERTIFICATE";

    const blocks: DocSection[] = [];

    // Letterhead
    blocks.push({
      kind: "subtitle",
      text: issuer.toUpperCase() + "\n" + (e.noc_issuer_addr || "[Address]"),
    });

    if (e.noc_ref_no) {
      blocks.push({
        kind: "kv",
        pairs: [
          { label: "Ref. No.", value: e.noc_ref_no },
          { label: "Date", value: "[DATE]" },
        ],
      });
    } else {
      blocks.push({ kind: "kv", pairs: [{ label: "Date", value: "[DATE]" }] });
    }

    if (e.noc_address_to) {
      blocks.push({
        kind: "para",
        text: "To,\n" + e.noc_address_to,
      });
    }

    blocks.push({ kind: "title", text: noctypeHeading });

    // Subject line
    blocks.push({
      kind: "subtitle",
      text: "Subject: No Objection Certificate for " + beneficiary,
    });

    // Main body — context-specific
    let bodyText = "";

    if (nocType === "employment_visa" || nocType === "employment_studies" || nocType === "employment_business") {
      bodyText =
        "This is to certify that " +
        beneficiary +
        " (ID: " +
        (e.noc_beneficiary_id || "[Employee ID]") +
        ") has been employed with " +
        issuer +
        " as " +
        (e.noc_designation_role || "[Designation]") +
        " since [EMPLOYMENT_SINCE].\n\n" +
        issuer +
        " has no objection to " +
        beneficiary +
        "'s request to " +
        purpose +
        ".\n\n" +
        (nocType === "employment_visa"
          ? "We confirm that " + beneficiary + " is a permanent employee in good standing. He/she will continue in our employment after the proposed travel and is expected to return to his/her duties thereafter. We request the concerned authorities to extend all visa/immigration facilities to him/her."
          : nocType === "employment_studies"
          ? "We confirm that " + beneficiary + "'s studies will be pursued on a part-time / distance-learning basis and will not interfere with his/her employment obligations. " + issuer + " supports the professional development of its employees."
          : "We confirm that the proposed business / freelance activity does not conflict with " + beneficiary + "'s duties, nor does it compete with the business of " + issuer + ".");
    } else if (nocType === "property_landlord") {
      bodyText =
        "This is to certify that " +
        beneficiary +
        " is/was a tenant at the property situated at " +
        (e.noc_property_addr || "[Property Address]") +
        ".\n\n" +
        issuer +
        ", as owner/landlord of the said property, hereby has no objection to " +
        beneficiary +
        "'s request to " +
        purpose +
        ". We confirm that there is no outstanding rent or dispute pending between us with respect to the said property.";
    } else if (nocType === "property_bank" || nocType === "bank_loan_closure") {
      bodyText =
        "This is to certify that the loan / credit facility bearing Account No. " +
        (e.noc_loan_account || "[Account No.]") +
        " in the name of " +
        beneficiary +
        " with " +
        issuer +
        " has been fully repaid and closed as on [DATE].\n\n" +
        issuer +
        " hereby confirms that:\n\n" +
        "(a) All outstanding dues, principal, interest, and charges in respect of the above account have been received in full;\n\n" +
        "(b) " + issuer + " has no further claim against " + beneficiary + " in respect of the said account;\n\n" +
        (e.noc_property_addr ? "(c) All original title documents pertaining to the property at " + e.noc_property_addr + " have been / will be returned to " + beneficiary + ";\n\n" : "") +
        "(d) " + issuer + " has no objection to " + beneficiary + "'s request to " + purpose + ".";
    } else if (nocType === "college_school") {
      bodyText =
        "This is to certify that " +
        beneficiary +
        " (ID/Roll No.: " +
        (e.noc_beneficiary_id || "[Roll No.]") +
        ") " +
        (e.noc_employment_since ? "has been enrolled with / associated with " + issuer + " since [SINCE_DATE]" : "is/was a student / faculty member of " + issuer) +
        ".\n\n" +
        issuer +
        " has no objection to " +
        beneficiary +
        "'s request to " +
        purpose +
        ".";
    } else {
      bodyText =
        issuer +
        " hereby certifies that it has no objection to " +
        beneficiary +
        (e.noc_beneficiary_addr ? " of " + e.noc_beneficiary_addr : "") +
        " proceeding with the following: " +
        purpose +
        ".";
    }

    blocks.push({ kind: "para", text: bodyText });

    if (e.noc_conditions === "yes" && e.noc_conditions_text) {
      blocks.push({
        kind: "para",
        text: "This NOC is subject to the following conditions:\n\n" + e.noc_conditions_text,
      });
    }

    blocks.push({
      kind: "para",
      text: "This NOC is valid for " + validityText + ". It is issued for the specific purpose stated above and shall not be construed as a general authorisation or waiver of any rights.",
    });

    blocks.push({
      kind: "signatures",
      parties: [
        {
          role: "Authorised Signatory\n" + issuer,
          name: e.noc_issuer_designation || "[Name & Designation]",
        },
      ],
    });

    blocks.push({
      kind: "para",
      text: "(To be issued on official letterhead with organisation stamp/seal)",
    });

    return blocks;
  },
};
