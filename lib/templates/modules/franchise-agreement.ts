// ============================================================
// FRANCHISE AGREEMENT
// Drop into: /lib/templates/franchise-agreement.ts
// Use case: Agreement granting a franchisee the right to
//           operate a business using the franchisor's brand,
//           IP, and business system in a defined territory.
//           Covers franchise fee, royalty, operations manual,
//           territory exclusivity, quality control, IP
//           licence, training, and termination.
// Statute refs: Indian Contract Act 1872; Trade Marks Act
//   1999 (IP licence); Copyright Act 1957 (manual/materials);
//   CGST Act 2017 (GST on franchise services / royalties);
//   IT Act 1961 s.194J (TDS on royalties @10%); Competition
//   Act 2002 (exclusive territory — must not foreclose market);
//   Foreign Exchange Management Act 1999 / RBI (if foreign
//   franchisor — automatic approval route for royalties up to
//   1% domestic sales, 2% exports under FEMA 20R)
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const franchiseAgreement: TemplateModule = {
  meta: {
    id: "franchise-agreement",
    name: "Franchise Agreement",
    categoryId: "business",
    category: "Business Contracts",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Franchise agreement granting a franchisee the right to operate under the franchisor's brand, trade marks, and business system. Covers upfront franchise fee, ongoing royalty, territory exclusivity, operations manual compliance, quality audits, training, IP licence, renewal, and termination provisions. Applicable to F&B, retail, services, education, and healthcare franchise models.",
    aliases: [
      "franchise agreement",
      "franchise contract",
      "franchisee agreement",
      "franchise deed",
      "business franchise agreement",
      "food franchise agreement",
      "retail franchise agreement",
    ],
    pages: 7,
    minutes: 10,
    status: "live",
  },

  groups: [
    {
      title: "Franchisor details",
      fields: [
        { id: "fa_franchisor_name", label: "Franchisor legal name", type: "text", required: true, placeholder: "Tasty Bites Foods Private Limited" },
        { id: "fa_franchisor_addr", label: "Franchisor address", type: "textarea", rows: 2, required: true },
        { id: "fa_brand_name", label: "Brand / trade name", type: "text", required: true, placeholder: "Tasty Bites" },
        { id: "fa_franchisor_gstin", label: "Franchisor GSTIN", type: "text", placeholder: "07AABCT1234C1ZX" },
        { id: "fa_franchisor_signatory", label: "Franchisor authorised signatory", type: "text", required: true, placeholder: "Ankit Gupta, Director" },
      ],
    },
    {
      title: "Franchisee details",
      fields: [
        { id: "fa_franchisee_name", label: "Franchisee legal name (individual or company)", type: "text", required: true, placeholder: "Sharma Enterprises / Mohan Sharma" },
        { id: "fa_franchisee_addr", label: "Franchisee address", type: "textarea", rows: 2, required: true },
        { id: "fa_franchisee_pan", label: "Franchisee PAN", type: "text", required: true, placeholder: "AABCS5678D" },
        { id: "fa_franchisee_gstin", label: "Franchisee GSTIN", type: "text", placeholder: "29AABCS5678D1ZY" },
        { id: "fa_franchisee_signatory", label: "Franchisee authorised signatory", type: "text", required: true, placeholder: "Mohan Sharma, Proprietor" },
      ],
    },
    {
      title: "Franchise terms",
      fields: [
        { id: "fa_territory", label: "Exclusive territory / location", type: "textarea", rows: 2, required: true, placeholder: "Indiranagar, Bengaluru (within a 2 km radius of the outlet at 12th Main Road) / HSR Layout ward, Bengaluru" },
        { id: "fa_outlet_addr", label: "Franchised outlet address", type: "textarea", rows: 2, placeholder: "Shop No. 5, 12th Main Road, Indiranagar, Bengaluru – 560 038" },
        {
          id: "fa_exclusivity",
          label: "Territory exclusivity",
          type: "radio",
          default: "exclusive",
          options: [
            { value: "exclusive", label: "Exclusive — franchisor will not appoint another franchisee in the territory" },
            { value: "non_exclusive", label: "Non-exclusive" },
          ],
        },
        { id: "fa_agreement_date", label: "Agreement date", type: "date", required: true },
        { id: "fa_term_years", label: "Initial franchise term (years)", type: "select", default: "5",
          options: [{ value: "1", label: "1 year" }, { value: "2", label: "2 years" }, { value: "3", label: "3 years" }, { value: "5", label: "5 years" }, { value: "10", label: "10 years" }],
        },
        { id: "fa_renewal_years", label: "Renewal term (years)", type: "select", default: "5",
          options: [{ value: "1", label: "1 year" }, { value: "3", label: "3 years" }, { value: "5", label: "5 years" }],
        },
      ],
    },
    {
      title: "Financial terms",
      fields: [
        { id: "fa_franchise_fee", label: "One-time franchise / licence fee (₹, excluding GST)", type: "number", required: true, placeholder: "500000" },
        { id: "fa_royalty_type", label: "Royalty model", type: "select", default: "percent_revenue",
          options: [
            { value: "percent_revenue", label: "% of gross revenue / sales" },
            { value: "fixed_monthly", label: "Fixed monthly royalty" },
            { value: "nil", label: "No ongoing royalty (one-time fee only)" },
          ],
        },
        { id: "fa_royalty_percent", label: "Royalty rate (% of gross revenue)", type: "number", placeholder: "6" },
        { id: "fa_royalty_fixed", label: "Fixed monthly royalty amount (₹)", type: "number", placeholder: "25000" },
        { id: "fa_marketing_fund", label: "Marketing / advertising fund contribution (% of revenue or fixed)", type: "text", placeholder: "2% of monthly gross revenue" },
        { id: "fa_security_deposit", label: "Security deposit / performance guarantee (₹)", type: "number", placeholder: "200000" },
        { id: "fa_royalty_payment_day", label: "Royalty payment due (day of month)", type: "text", placeholder: "10th of the following month" },
      ],
    },
    {
      title: "Operations and compliance",
      fields: [
        { id: "fa_operations_manual", label: "Operations manual / SOP reference", type: "text", placeholder: "Tasty Bites Operations Manual v3.0 (2024)" },
        {
          id: "fa_quality_audit",
          label: "Quality audit frequency",
          type: "select",
          default: "quarterly",
          options: [
            { value: "monthly", label: "Monthly" },
            { value: "quarterly", label: "Quarterly" },
            { value: "biannual", label: "Bi-annual" },
            { value: "annual", label: "Annual" },
          ],
        },
        { id: "fa_training_days", label: "Initial training duration (days)", type: "text", placeholder: "21 days at franchisor's training centre" },
        { id: "fa_jurisdiction_city", label: "Jurisdiction city", type: "text", required: true, placeholder: "Bengaluru" },
        { id: "fa_jurisdiction_state", label: "Jurisdiction state", type: "select", required: true, options: [
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
    const franchisor = e.fa_franchisor_name || "[Franchisor]";
    const franchisee = e.fa_franchisee_name || "[Franchisee]";
    const brand = e.fa_brand_name || "[Brand]";
    const termYears = e.fa_term_years || "5";
    const renewalYears = e.fa_renewal_years || "5";
    const franchiseFee = Number(e.fa_franchise_fee || 0);
    const royaltyType = e.fa_royalty_type || "percent_revenue";
    const royaltyPct = Number(e.fa_royalty_percent || 0);
    const royaltyFixed = Number(e.fa_royalty_fixed || 0);
    const secDeposit = Number(e.fa_security_deposit || 0);

    const royaltyDesc = royaltyType === "nil"
      ? "No ongoing royalty is payable. The franchise fee above covers the licence for the full term."
      : royaltyType === "fixed_monthly"
      ? "A fixed monthly royalty of ₹" + royaltyFixed.toLocaleString("en-IN") + " (plus applicable GST), payable by the " + (e.fa_royalty_payment_day || "10th of the following month") + "."
      : royaltyPct + "% of the Franchisee's gross monthly revenue (plus applicable GST), payable by the " + (e.fa_royalty_payment_day || "10th of the following month") + ", supported by monthly revenue statements.";

    const blocks: DocSection[] = [];

    blocks.push({ kind: "title", text: "FRANCHISE AGREEMENT" });

    blocks.push({
      kind: "para",
      text:
        'THIS FRANCHISE AGREEMENT ("Agreement") is entered into as of [DATE] between:\n\n' +
        '1. ' + franchisor + ', having its registered office at ' + (e.fa_franchisor_addr || "[Address]") + (e.fa_franchisor_gstin ? ' (GSTIN: ' + e.fa_franchisor_gstin + ')' : '') + ', represented by ' + (e.fa_franchisor_signatory || "[Signatory]") + ' (hereinafter "Franchisor"); AND\n\n' +
        '2. ' + franchisee + ', having its address at ' + (e.fa_franchisee_addr || "[Address]") + (e.fa_franchisee_pan ? ' (PAN: ' + e.fa_franchisee_pan + ')' : '') + (e.fa_franchisee_gstin ? ' (GSTIN: ' + e.fa_franchisee_gstin + ')' : '') + ', represented by ' + (e.fa_franchisee_signatory || "[Signatory]") + ' (hereinafter "Franchisee").',
    });

    const clauses: DocSection[] = [
      {
        kind: "clause", number: 1, title: "Grant of Franchise",
        text: "The Franchisor hereby grants to the Franchisee a " + (e.fa_exclusivity === "exclusive" ? "limited, exclusive" : "limited, non-exclusive") + " right and licence to operate a franchised outlet under the \"" + brand + "\" brand and trade mark in the following territory:\n\n" + (e.fa_territory || "[Territory]") + "\n\nThe franchise outlet shall be operated at: " + (e.fa_outlet_addr || "[Outlet address]") + ".\n\n" + (e.fa_exclusivity === "exclusive" ? "During the term of this Agreement, the Franchisor shall not appoint any other franchisee or operate a company-owned outlet within the exclusive territory." : "The Franchisor may appoint additional franchisees or operate company-owned outlets in the same territory."),
      },
      {
        kind: "clause", number: 2, title: "Term and Renewal",
        text: "This Agreement is effective from [DATE] and shall continue for an initial term of " + termYears + " (" + ({ "1": "one", "2": "two", "3": "three", "5": "five", "10": "ten" }[termYears] || termYears) + ") year(s). The Franchisee may renew this Agreement for successive terms of " + renewalYears + " year(s) by: (a) giving written notice at least 90 days before expiry; (b) not being in material breach; (c) signing the then-current form of franchise agreement; and (d) paying the applicable renewal fee.",
      },
      {
        kind: "clause", number: 3, title: "Franchise Fee and Royalty",
        text: "Franchise Fee. The Franchisee shall pay a one-time franchise fee of ₹" + franchiseFee.toLocaleString("en-IN") + " (Rupees [FEE_IN_WORDS] only) plus applicable GST (currently 18%), upon signing this Agreement. The franchise fee is non-refundable.\n\nRoyalty. " + royaltyDesc + "\n\n" + (e.fa_marketing_fund ? "Marketing Fund. The Franchisee shall contribute " + e.fa_marketing_fund + " to the Franchisor's advertising and marketing fund, payable monthly.\n\n" : "") + (secDeposit > 0 ? "Security Deposit. The Franchisee shall pay a security deposit of ₹" + secDeposit.toLocaleString("en-IN") + " upon signing, refundable (interest-free) on expiry of the term provided no dues are outstanding.\n\n" : "") + "TDS: The Franchisee shall deduct TDS at 10% under s.194J of the Income Tax Act 1961 on all royalty payments and issue Form 16A quarterly to the Franchisor.",
      },
      {
        kind: "clause", number: 4, title: "Intellectual Property Licence",
        text: "The Franchisor grants the Franchisee a non-exclusive, non-transferable licence to use the \"" + brand + "\" trade mark, logo, trade dress, copyrighted materials, and associated intellectual property solely in connection with the operation of the franchised outlet during the term of this Agreement. The Franchisee shall not: (a) use the IP for any other purpose; (b) modify, sub-licence, or assign the IP; (c) register or apply for any IP rights similar to the Franchisor's IP. All IP usage must conform to the brand guidelines issued by the Franchisor from time to time.",
      },
      {
        kind: "clause", number: 5, title: "Operations and Quality Standards",
        text: "The Franchisee shall:\n\n(a) operate the outlet strictly in accordance with the " + (e.fa_operations_manual || brand + " Operations Manual") + " as updated from time to time;\n\n(b) maintain the quality standards, specifications, and sourcing requirements prescribed by the Franchisor;\n\n(c) attend and complete the initial training programme (" + (e.fa_training_days || "[N] days") + ") and all mandatory refresher training;\n\n(d) permit the Franchisor's representatives to conduct " + (e.fa_quality_audit || "quarterly") + " quality audits of the outlet;\n\n(e) promptly remedy any deficiencies identified during audits within the timeframe specified by the Franchisor;\n\n(f) maintain all statutory licences, FSSAI registration, GST registration, municipal trade licence, and other required permits.",
      },
      {
        kind: "clause", number: 6, title: "Franchisee Obligations",
        text: "(a) The Franchisee shall operate the outlet only from the approved location and may not relocate without the Franchisor's written consent.\n\n(b) The Franchisee shall not operate or be involved in any competing business within the territory during the term.\n\n(c) The Franchisee shall maintain accurate books of accounts and submit monthly revenue reports to the Franchisor.\n\n(d) The Franchisee shall not assign or sub-franchise this Agreement without the Franchisor's prior written consent.\n\n(e) The Franchisee shall comply with all applicable laws including FSSAI, GST, labour laws, and consumer protection regulations.",
      },
      {
        kind: "clause", number: 7, title: "Confidentiality",
        text: "The Franchisee shall keep confidential all trade secrets, proprietary recipes, formulations, supplier information, pricing strategies, business systems, and other confidential information of the Franchisor. These obligations survive termination for three (3) years and indefinitely for trade secrets.",
      },
      {
        kind: "clause", number: 8, title: "Termination",
        text: "The Franchisor may terminate this Agreement immediately upon written notice if the Franchisee: (a) fails to pay any fees or royalties within 15 days of the due date; (b) operates the outlet in a manner that brings the brand into disrepute; (c) repeatedly fails quality audits; (d) becomes insolvent or is wound up; (e) is convicted of a criminal offence; (f) assigns or sub-franchises without consent.\n\nEither Party may terminate for material breach by giving 30 days' written notice if the breach is not cured within such period.\n\nOn termination: (i) the Franchisee shall cease to use all brand materials and IP; (ii) de-identify the outlet; (iii) pay all outstanding fees; (iv) allow the Franchisor to purchase the outlet's stock and equipment at fair value. The Franchisee shall not solicit the Franchisor's customers or employees for 12 months post-termination.",
      },
      {
        kind: "clause", number: 9, title: "Governing Law",
        text: "This Agreement is governed by the laws of India. Disputes shall be first attempted to be resolved by mutual negotiation. If unresolved within 30 days, disputes shall be submitted to arbitration under the Arbitration and Conciliation Act 1996, by a sole arbitrator, at " + (e.fa_jurisdiction_city || "[City]") + ". Courts at " + (e.fa_jurisdiction_city || "[City]") + " shall have exclusive jurisdiction for interim relief.",
      },
    ];

    clauses.forEach((c) => blocks.push(c));

    blocks.push({ kind: "divider" });

    blocks.push({ kind: "para", text: "IN WITNESS WHEREOF the Parties have executed this Agreement as of the date first written above." });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "Franchisor\n" + franchisor + "\n" + (e.fa_franchisor_signatory || "[Signatory]"), name: "[Signature & Seal]" },
        { role: "Franchisee\n" + franchisee + "\n" + (e.fa_franchisee_signatory || "[Signatory]"), name: "[Signature & Seal]" },
      ],
    });

    return blocks;
  },
};
