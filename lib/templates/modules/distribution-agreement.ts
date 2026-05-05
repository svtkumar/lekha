// ============================================================
// DISTRIBUTION / RESELLER AGREEMENT
// Drop into: /lib/templates/distribution-agreement.ts
// Use case: Agreement appointing a distributor or reseller
//           for products in a defined territory. Covers
//           exclusive / non-exclusive distribution, minimum
//           purchase commitments, pricing and margins, IP
//           licence, warranty pass-through, and termination
//           with stock buyback.
// Statute refs: Indian Contract Act 1872; Sale of Goods Act
//   1930 (title, risk, warranty); Competition Act 2002
//   (exclusive dealing, resale price maintenance — RPM is
//   per se prohibited under s.3(4)(e)); Trade Marks Act 1999;
//   CGST Act 2017; Consumer Protection Act 2019
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const distributionAgreement: TemplateModule = {
  meta: {
    id: "distribution-agreement",
    name: "Distribution / Reseller Agreement",
    categoryId: "business",
    category: "Business Contracts",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Distribution and reseller agreement appointing a distributor or reseller for products in a defined territory. Covers exclusive and non-exclusive distribution, minimum purchase commitments, pricing and margins, prohibited resale price maintenance (Competition Act 2002 s.3(4)(e)), IP licence, warranty, product liability, stock buyback on termination, and dispute resolution.",
    aliases: [
      "distribution agreement",
      "distributor agreement",
      "reseller agreement",
      "dealership agreement",
      "wholesale agreement",
      "channel partner agreement",
      "distribution contract india",
      "exclusive distribution agreement",
      "authorised distributor",
    ],
    pages: 6,
    minutes: 8,
    status: "live",
  },

  groups: [
    {
      title: "Supplier / manufacturer details",
      fields: [
        { id: "da_sup_name", label: "Supplier / manufacturer legal name", type: "text", required: true, placeholder: "Acme Electronics Private Limited" },
        { id: "da_sup_addr", label: "Supplier address", type: "textarea", rows: 2, required: true },
        { id: "da_sup_gstin", label: "Supplier GSTIN", type: "text", placeholder: "29AABCA1234C1ZX" },
        { id: "da_sup_signatory", label: "Supplier authorised signatory", type: "text", required: true, placeholder: "Priya Sharma, Director — Sales" },
      ],
    },
    {
      title: "Distributor / reseller details",
      fields: [
        { id: "da_dist_name", label: "Distributor / reseller legal name", type: "text", required: true, placeholder: "Northern Distribution LLP" },
        { id: "da_dist_addr", label: "Distributor address", type: "textarea", rows: 2, required: true },
        { id: "da_dist_gstin", label: "Distributor GSTIN", type: "text", placeholder: "07AABCN5678D1ZY" },
        { id: "da_dist_signatory", label: "Distributor authorised signatory", type: "text", required: true, placeholder: "Rahul Gupta, Managing Partner" },
      ],
    },
    {
      title: "Distribution terms",
      fields: [
        { id: "da_products", label: "Products / product lines covered", type: "textarea", rows: 2, required: true, placeholder: "All SKUs under the 'AcmePro' range of consumer electronics — see Product List (Schedule A)" },
        { id: "da_territory", label: "Distribution territory", type: "text", required: true, placeholder: "States of Punjab, Haryana, Delhi NCT, and Himachal Pradesh" },
        {
          id: "da_exclusivity",
          label: "Exclusivity",
          type: "select",
          required: true,
          default: "exclusive",
          options: [
            { value: "exclusive", label: "Exclusive — supplier will not appoint other distributors in territory" },
            { value: "non_exclusive", label: "Non-exclusive — supplier may appoint multiple distributors" },
            { value: "sole", label: "Sole — only this distributor (supplier may also sell direct)" },
          ],
        },
        { id: "da_agreement_date", label: "Agreement date", type: "date", required: true },
        { id: "da_term_years", label: "Initial term (years)", type: "select", default: "2",
          options: [{ value: "1", label: "1 year" }, { value: "2", label: "2 years" }, { value: "3", label: "3 years" }],
        },
        { id: "da_minimum_purchase", label: "Minimum annual purchase commitment (₹, net of taxes)", type: "number", placeholder: "5000000" },
      ],
    },
    {
      title: "Commercial terms",
      fields: [
        { id: "da_pricing_basis", label: "Pricing basis", type: "select", default: "trade_price",
          options: [
            { value: "trade_price", label: "Trade price list (supplier's trade price + distributor margin)" },
            { value: "mrp_minus", label: "MRP minus distributor discount %" },
            { value: "cost_plus", label: "Cost plus margin" },
          ],
        },
        { id: "da_distributor_margin", label: "Distributor margin / discount (%)", type: "number", placeholder: "30" },
        { id: "da_payment_terms", label: "Payment terms", type: "select", default: "30",
          options: [
            { value: "advance", label: "100% advance before dispatch" },
            { value: "15", label: "Net 15 days from invoice" },
            { value: "30", label: "Net 30 days from invoice" },
            { value: "45", label: "Net 45 days from invoice" },
            { value: "lc", label: "Letter of credit / bank guarantee" },
          ],
        },
        { id: "da_credit_limit", label: "Credit limit (₹) — if credit terms", type: "number", placeholder: "2000000" },
        {
          id: "da_rpm_clause",
          label: "Suggested resale price guidance",
          type: "radio",
          default: "suggested_only",
          options: [
            { value: "suggested_only", label: "Suggested MRP only — distributor free to discount (Competition Act compliant)" },
            { value: "mrp_cap", label: "Not to exceed MRP — capped at MRP (permissible)" },
          ],
        },
      ],
    },
    {
      title: "Stock and termination",
      fields: [
        {
          id: "da_stock_return",
          label: "Stock buyback on termination",
          type: "radio",
          default: "yes",
          options: [
            { value: "yes", label: "Yes — supplier to buy back unsold marketable stock at invoice price" },
            { value: "no", label: "No — distributor responsible for stock disposal" },
          ],
        },
        { id: "da_warranty_period", label: "Product warranty period (months)", type: "number", placeholder: "12" },
        { id: "da_jurisdiction_city", label: "Jurisdiction city", type: "text", required: true, placeholder: "Delhi" },
        { id: "da_jurisdiction_state", label: "Jurisdiction state", type: "select", required: true, options: [
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
    const sup = e.da_sup_name || "[Supplier]";
    const dist = e.da_dist_name || "[Distributor]";
    const exclusivityLabel = { "exclusive": "exclusive", "non_exclusive": "non-exclusive", "sole": "sole" }[e.da_exclusivity || "exclusive"];
    const termYears = e.da_term_years || "2";
    const minPurchase = Number(e.da_minimum_purchase || 0);
    const margin = Number(e.da_distributor_margin || 0);
    const payTerms = { "advance": "100% advance before dispatch", "15": "net 15 days from invoice", "30": "net 30 days from invoice", "45": "net 45 days from invoice", "lc": "by confirmed Letter of Credit / bank guarantee" }[e.da_payment_terms || "30"];
    const creditLimit = Number(e.da_credit_limit || 0);

    const blocks: DocSection[] = [];

    blocks.push({ kind: "title", text: "DISTRIBUTION AGREEMENT" });

    blocks.push({
      kind: "para",
      text:
        'THIS DISTRIBUTION AGREEMENT ("Agreement") is entered into as of [DATE] between:\n\n' +
        '1. ' + sup + ', having its address at ' + (e.da_sup_addr || "[Address]") + (e.da_sup_gstin ? ' (GSTIN: ' + e.da_sup_gstin + ')' : '') + ', represented by ' + (e.da_sup_signatory || "[Signatory]") + ' (hereinafter "Supplier"); AND\n\n' +
        '2. ' + dist + ', having its address at ' + (e.da_dist_addr || "[Address]") + (e.da_dist_gstin ? ' (GSTIN: ' + e.da_dist_gstin + ')' : '') + ', represented by ' + (e.da_dist_signatory || "[Signatory]") + ' (hereinafter "Distributor").',
    });

    const clauses: DocSection[] = [
      {
        kind: "clause", number: 1, title: "Appointment",
        text: "The Supplier hereby appoints the Distributor as its " + exclusivityLabel + " distributor for the following products (\"Products\"): " + (e.da_products || "[Product list — see Schedule A]") + ", in the following territory (\"Territory\"): " + (e.da_territory || "[Territory]") + ".\n\n" + (e.da_exclusivity === "exclusive" ? "During the term of this Agreement, the Supplier shall not appoint any other distributor for the Products in the Territory, provided the Distributor meets the minimum purchase commitments set out in Clause 4." : e.da_exclusivity === "sole" ? "The Supplier may sell the Products directly within the Territory but shall not appoint other distributors." : "The Supplier may appoint additional distributors for the Products in the Territory."),
      },
      {
        kind: "clause", number: 2, title: "Term",
        text: "This Agreement is effective from [DATE] and shall continue for " + termYears + " (" + ({ "1": "one", "2": "two", "3": "three" }[termYears] || termYears) + ") year(s). Either Party may give 90 days' written notice of non-renewal before the end of the term. Upon renewal, terms will be as mutually agreed in writing.",
      },
      {
        kind: "clause", number: 3, title: "Pricing and Margins",
        text: "The Supplier shall sell the Products to the Distributor at the trade prices published from time to time, less a distributor discount of " + margin + "%. All prices are exclusive of applicable GST. The Supplier may revise prices by giving 30 days' written notice.\n\nResale Pricing: The Distributor may sell the Products at such prices as it deems appropriate, subject to not exceeding the Maximum Retail Price (MRP) printed on the product. The Supplier may provide suggested resale prices as a reference only — these are not binding and the Distributor is free to discount at its discretion. The Parties acknowledge that fixing minimum resale prices is prohibited under s.3(4)(e) of the Competition Act 2002.",
      },
      {
        kind: "clause", number: 4, title: "Purchase Commitments and Minimum Offtake",
        text: (minPurchase > 0
          ? "The Distributor shall purchase Products with a minimum net invoice value of ₹" + minPurchase.toLocaleString("en-IN") + " (Rupees [AMOUNT_IN_WORDS] only, net of taxes) per contract year. Failure to meet this commitment for two consecutive quarters shall entitle the Supplier to: (a) convert the distribution to non-exclusive status; or (b) terminate this Agreement upon 60 days' written notice."
          : "The Distributor shall purchase Products in such quantities as it deems appropriate. No minimum purchase commitment is imposed."),
      },
      {
        kind: "clause", number: 5, title: "Payment Terms",
        text: "All purchases shall be on " + payTerms + " terms." + (creditLimit > 0 ? " The Supplier grants the Distributor a revolving credit limit of ₹" + creditLimit.toLocaleString("en-IN") + ", subject to periodic review. The credit limit may be withdrawn if any invoice is overdue by more than 15 days." : "") + "\n\nLate payments attract interest at 18% per annum. The Supplier may suspend supplies if any undisputed invoice remains unpaid for more than 30 days after the due date.",
      },
      {
        kind: "clause", number: 6, title: "Distributor Obligations",
        text: "(a) Maintain adequate stocks of Products and appropriate warehousing and distribution infrastructure;\n\n(b) Actively promote and market the Products within the Territory;\n\n(c) Not sell the Products outside the Territory without prior written consent;\n\n(d) Not distribute or represent competing products without the Supplier's written consent;\n\n(e) Comply with all applicable laws including GST, consumer protection, product labelling, and import/export regulations;\n\n(f) Maintain all statutory licences required for distribution of the Products;\n\n(g) Provide quarterly sales reports to the Supplier.",
      },
      {
        kind: "clause", number: 7, title: "Intellectual Property",
        text: "The Supplier grants the Distributor a limited, non-exclusive, non-transferable licence to use the Supplier's trade marks, trade names, and logos solely for the purpose of marketing and distributing the Products in the Territory during the term. The Distributor shall not modify, reverse-engineer, or create derivative works from any Product or IP.",
      },
      {
        kind: "clause", number: 8, title: "Warranty and Product Liability",
        text: "The Supplier warrants that the Products comply with applicable specifications and quality standards." + (e.da_warranty_period ? " The Products carry a " + e.da_warranty_period + "-month warranty against manufacturing defects." : "") + " The Distributor shall pass through the Supplier's warranty terms to end customers. The Supplier shall indemnify the Distributor against product liability claims arising from manufacturing defects. The Distributor shall indemnify the Supplier against claims arising from improper handling, storage, or representation by the Distributor.",
      },
      {
        kind: "clause", number: 9, title: "Termination and Stock Buyback",
        text: "Either Party may terminate this Agreement by giving 90 days' written notice. Either Party may terminate immediately for: (a) material uncured breach; (b) insolvency or winding up; (c) assignment without consent.\n\nOn termination:" + (e.da_stock_return === "yes" ? "\n\n(a) The Supplier shall repurchase, within 60 days of termination, all unsold marketable stock of the Products held by the Distributor, at the original invoiced price (excluding GST), provided the stock is undamaged and within its shelf-life." : "\n\n(a) The Distributor shall be responsible for disposal of any unsold stock.") + "\n\n(b) The Distributor shall immediately cease using the Supplier's IP and return all marketing materials;\n\n(c) All outstanding invoices shall be settled within 30 days.",
      },
      {
        kind: "clause", number: 10, title: "Governing Law",
        text: "This Agreement is governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of the courts at " + (e.da_jurisdiction_city || "[City]") + ", " + (e.da_jurisdiction_state || "[State]") + ".",
      },
    ];

    clauses.forEach((c) => blocks.push(c));

    blocks.push({ kind: "divider" });

    blocks.push({ kind: "para", text: "IN WITNESS WHEREOF the Parties have executed this Agreement as of the date first written above." });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "Supplier\n" + sup + "\n" + (e.da_sup_signatory || "[Signatory]"), name: "[Signature & Seal]" },
        { role: "Distributor\n" + dist + "\n" + (e.da_dist_signatory || "[Signatory]"), name: "[Signature & Seal]" },
      ],
    });

    return blocks;
  },
};
