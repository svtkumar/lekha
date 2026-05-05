import type { TemplateModule, DocSection } from "../types";

export const mortgageDeed: TemplateModule = {
  meta: {
    id: "mortgage-deed",
    name: "Mortgage Deed",
    categoryId: "property",
    category: "Property",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Simple, English, or equitable mortgage deed formats. Covers loan amount, interest, repayment schedule, default provisions, and power of sale. Complies with Transfer of Property Act 1882.",
    aliases: ["english mortgage", "equitable mortgage", "simple mortgage", "home loan deed"],
    pages: 12,
    minutes: 15,
    status: "live",
  },
  groups: [
    {
      title: "Mortgagor (Borrower) details",
      fields: [
        { id: "md_mortgagor_name", label: "Mortgagor full name", type: "text", required: true, placeholder: "Suresh Kumar Patel" },
        { id: "md_mortgagor_addr", label: "Mortgagor address", type: "textarea", rows: 2, required: true },
        { id: "md_mortgagor_pan", label: "Mortgagor PAN", type: "text", placeholder: "AABCP1234D" },
        { id: "md_mortgagor_aadhar", label: "Mortgagor Aadhaar (last 4 digits)", type: "text", placeholder: "XXXX" },
      ],
    },
    {
      title: "Mortgagee (Lender) details",
      fields: [
        { id: "md_mortgagee_name", label: "Mortgagee name (bank/lender)", type: "text", required: true, placeholder: "State Bank of India" },
        { id: "md_mortgagee_addr", label: "Mortgagee address / branch", type: "textarea", rows: 2, required: true },
        { id: "md_mortgagee_type", label: "Mortgagee type", type: "select", default: "bank", options: [
          { value: "bank", label: "Scheduled bank" },
          { value: "nbfc", label: "NBFC / HFC" },
          { value: "individual", label: "Individual / private lender" },
        ]},
      ],
    },
    {
      title: "Property details",
      fields: [
        { id: "md_property_desc", label: "Full property description / address", type: "textarea", rows: 3, required: true, placeholder: "All that piece and parcel of residential flat No. 301, 3rd Floor, Shanti Heights, Sector 12, Dwarka, New Delhi – 110 078, measuring 1,400 sq ft…" },
        { id: "md_state", label: "State", type: "text", required: true, placeholder: "Delhi" },
        { id: "md_city", label: "City / jurisdiction", type: "text", required: true, placeholder: "New Delhi" },
        { id: "md_area_sqft", label: "Area (sq ft)", type: "text", placeholder: "1400" },
        { id: "md_survey_no", label: "Survey / Plot / CTS No.", type: "text", placeholder: "Plot No. 12, Sector 12" },
        { id: "md_title_document", label: "Title document reference", type: "text", placeholder: "Sale Deed dated 10/03/2020, Doc No. 789/2020" },
      ],
    },
    {
      title: "Loan & mortgage terms",
      fields: [
        { id: "md_mortgage_type", label: "Mortgage type", type: "select", required: true, default: "simple", options: [
          { value: "simple", label: "Simple Mortgage (s.58(b) TPA)" },
          { value: "english", label: "English Mortgage (s.58(e) TPA)" },
          { value: "equitable", label: "Equitable / Deposit of Title Deeds (s.58(f) TPA)" },
        ]},
        { id: "md_loan_amount", label: "Loan / principal amount (₹)", type: "number", required: true, placeholder: "5000000" },
        { id: "md_deed_date", label: "Deed execution date", type: "date", required: true },
        { id: "md_interest_rate", label: "Rate of interest (% per annum)", type: "text", required: true, placeholder: "8.5" },
        { id: "md_interest_type", label: "Interest type", type: "select", default: "reducing", options: [
          { value: "reducing", label: "Reducing / diminishing balance" },
          { value: "flat", label: "Flat rate" },
          { value: "simple", label: "Simple interest" },
        ]},
        { id: "md_repayment_months", label: "Repayment tenure (months)", type: "number", placeholder: "240" },
        { id: "md_emi_day", label: "EMI due date (day of month)", type: "number", default: "1", placeholder: "1" },
        { id: "md_repayment_start_date", label: "First EMI / repayment date", type: "date" },
        { id: "md_prepayment_penalty", label: "Prepayment penalty", type: "select", default: "nil", options: [
          { value: "nil", label: "No prepayment penalty" },
          { value: "2pct", label: "2% on outstanding principal" },
        ]},
      ],
    },
  ],
  render(e): DocSection[] {
    const blocks: DocSection[] = [];
    const mortgagor = e.md_mortgagor_name || "[Mortgagor Name]";
    const mortgagee = e.md_mortgagee_name || "[Mortgagee Name]";
    const city = e.md_city || "[City]";
    const state = e.md_state || "[State]";
    const loanAmt = e.md_loan_amount ? `₹${Number(e.md_loan_amount).toLocaleString("en-IN")}` : "[Loan Amount]";
    const deedDate = e.md_deed_date ? new Date(e.md_deed_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Date]";
    const interestRate = e.md_interest_rate || "[Rate]";
    const tenure = e.md_repayment_months ? `${e.md_repayment_months} months` : "[Tenure]";

    const mortgageTypeLabels: Record<string, string> = {
      simple: "Simple Mortgage",
      english: "English Mortgage",
      equitable: "Equitable Mortgage by Deposit of Title Deeds",
    };
    const mortgageTypeLabel = mortgageTypeLabels[e.md_mortgage_type || "simple"] || "Simple Mortgage";

    blocks.push({
      kind: "info",
      title: "Mortgage Deed — Key Legal Points",
      acts: [
        "Transfer of Property Act 1882 — ss.58–67 (Mortgage defined and types)",
        "Registration Act 1908 — s.17 (Simple & English mortgage deeds must be registered)",
        "Indian Stamp Act 1899 — Stamp duty varies by state and loan amount",
        "SARFAESI Act 2002 — Enforcement rights for secured creditors (banks/NBFCs)",
      ],
      text: "Registration is compulsory for Simple and English Mortgage deeds. An Equitable Mortgage by deposit of title deeds does not require registration but must be in a notified city (Mumbai, Kolkata, Chennai, and other notified towns). Stamp duty varies by state.",
    });

    blocks.push({ kind: "title", text: `${mortgageTypeLabel.toUpperCase()} DEED` });
    blocks.push({ kind: "subtitle", text: `Transfer of Property Act, 1882 — Section 58 | ${city}, ${state}` });
    blocks.push({ kind: "divider" });

    blocks.push({ kind: "para", text: `THIS ${mortgageTypeLabel.toUpperCase()} DEED is made and executed on ${deedDate}, at ${city}, BETWEEN:` });

    blocks.push({ kind: "party", role: "MORTGAGOR (BORROWER)", name: mortgagor, address: e.md_mortgagor_addr || "", rep: e.md_mortgagor_pan ? `PAN: ${e.md_mortgagor_pan}` : undefined });
    blocks.push({ kind: "party", role: "MORTGAGEE (LENDER)", name: mortgagee, address: e.md_mortgagee_addr || "" });

    const clauses: DocSection[] = [
      {
        kind: "clause", number: 1, title: "Recitals",
        text: `The Mortgagor is the absolute owner of the property described hereunder and has applied to the Mortgagee for a loan of ${loanAmt}. The Mortgagee has agreed to advance the said loan on the security of the property described in Schedule A hereto, on the terms and conditions herein set forth.`,
      },
      {
        kind: "clause", number: 2, title: "Schedule A — Mortgaged Property",
        text: `${e.md_property_desc || "[Property Description]"}${e.md_survey_no ? ` (${e.md_survey_no})` : ""}${e.md_area_sqft ? `, measuring approximately ${e.md_area_sqft} sq ft` : ""}. ${e.md_title_document ? `Title document: ${e.md_title_document}.` : ""} ("Mortgaged Property")`,
      },
      {
        kind: "clause", number: 3, title: "Loan Amount and Disbursement",
        text: `In consideration of the Mortgagee having advanced / agreed to advance the sum of ${loanAmt} (Rupees ${Number(e.md_loan_amount || 0).toLocaleString("en-IN")} only) ("Principal"), which the Mortgagor acknowledges to have received, the Mortgagor hereby mortgages and charges the Mortgaged Property as security for repayment of the Principal together with interest thereon.`,
      },
      {
        kind: "clause", number: 4, title: "Interest",
        text: `The Mortgagor shall pay interest on the outstanding Principal at the rate of ${interestRate}% per annum, calculated on a ${e.md_interest_type === "flat" ? "flat rate" : e.md_interest_type === "simple" ? "simple interest" : "reducing / diminishing balance"} basis, subject to revision as per the Mortgagee's applicable base rate / RLLR / MCLR from time to time.`,
      },
      {
        kind: "clause", number: 5, title: "Repayment",
        text: `The Principal together with interest shall be repaid by the Mortgagor in equated monthly instalments (EMIs) over a period of ${tenure}, commencing from ${e.md_repayment_start_date ? new Date(e.md_repayment_start_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[First EMI Date]"}. Each EMI shall be due and payable on or before the ${e.md_emi_day || "1"}st day of each calendar month.`,
      },
      {
        kind: "clause", number: 6, title: "Mortgage and Security",
        text: e.md_mortgage_type === "english"
          ? `In an English Mortgage, the Mortgagor hereby transfers the Mortgaged Property absolutely to the Mortgagee, with a covenant that the Mortgagee will re-transfer the property to the Mortgagor upon repayment of the mortgage money on the stipulated date.`
          : e.md_mortgage_type === "equitable"
          ? `The Mortgagor hereby deposits the original title deeds and documents relating to the Mortgaged Property with the Mortgagee as security for repayment of the mortgage debt, and the Mortgagor agrees that such deposit constitutes an equitable mortgage over the Mortgaged Property.`
          : `Without delivering possession, the Mortgagor binds himself personally to pay the mortgage money and agrees that, in the event of default, the Mortgagee shall have the right to cause the Mortgaged Property to be sold through a decree of court and apply the sale proceeds towards satisfaction of the mortgage money.`,
      },
      {
        kind: "clause", number: 7, title: "Mortgagor's Representations and Covenants",
        text: "The Mortgagor represents and covenants that: (a) the Mortgagor has good and marketable title to the Mortgaged Property; (b) the Mortgaged Property is free from all prior encumbrances, charges, liens, and attachments; (c) the Mortgagor shall not create any further charge or encumbrance on the Mortgaged Property without the prior written consent of the Mortgagee; (d) the Mortgagor shall keep the Mortgaged Property insured and pay all taxes, levies, and outgoings; (e) the Mortgagor shall maintain the Mortgaged Property in good repair and condition.",
      },
      {
        kind: "clause", number: 8, title: "Default and Enforcement",
        text: `In the event of: (a) default in payment of two or more consecutive EMIs; (b) breach of any covenant herein; or (c) insolvency of the Mortgagor — the entire outstanding mortgage money shall immediately become due and payable. The Mortgagee shall be entitled to enforce the mortgage security in accordance with applicable law, including under the SARFAESI Act, 2002 (if applicable), or by filing a suit for sale of the Mortgaged Property.`,
      },
      {
        kind: "clause", number: 9, title: "Prepayment",
        text: `The Mortgagor may prepay the outstanding Principal in whole or in part. ${e.md_prepayment_penalty === "2pct" ? "A prepayment penalty of 2% of the outstanding Principal amount shall be charged on such prepayment." : "No prepayment penalty shall be charged."}`,
      },
      {
        kind: "clause", number: 10, title: "Governing Law and Jurisdiction",
        text: `This Deed shall be governed by the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the courts at ${city}, ${state}.`,
      },
    ];

    clauses.forEach(c => blocks.push(c));

    blocks.push({ kind: "divider" });
    blocks.push({ kind: "para", text: "IN WITNESS WHEREOF the Mortgagor has executed this Deed on the date first written above, in the presence of the witnesses named below." });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "MORTGAGOR", name: mortgagor },
        { role: "MORTGAGEE (Authorised Signatory)", name: mortgagee },
        { role: "Witness 1", name: "___________________" },
        { role: "Witness 2", name: "___________________" },
      ],
    });

    blocks.push({ kind: "footer", text: `${mortgageTypeLabel} Deed · Generated by Lekha · elevana.guru` });
    return blocks;
  },
};
