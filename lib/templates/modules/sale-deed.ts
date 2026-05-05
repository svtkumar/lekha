// ============================================================
// SALE DEED — IMMOVABLE PROPERTY
// Drop into: /lib/templates/sale-deed.ts
// Use case: Deed of sale / conveyance for transfer of immovable
//           property (residential flat, house, plot, or
//           commercial premises) between seller and buyer.
// Statute refs: Transfer of Property Act 1882 ss.54–57 (sale of
//   immovable property — must be by registered instrument for
//   property valued > ₹100); Registration Act 1908 s.17
//   (compulsory registration); Indian Stamp Act 1899 / state
//   stamp acts (stamp duty on sale deed — ad valorem);
//   Income Tax Act 1961 s.194-IA (TDS @ 1% on consideration
//   if > ₹50 lakh); s.55A (Capital Gains); s.50C (deemed
//   consideration = stamp value if stamp value > actual);
//   RERA Act 2016 (for under-construction units);
//   FEMA 20(R)/2017 (if NRI / foreign buyer / seller)
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const saleDeed: TemplateModule = {
  meta: {
    id: "sale-deed",
    name: "Sale Deed — Immovable Property",
    categoryId: "property",
    category: "Property",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Sale deed / conveyance deed for transfer of immovable property (flat, house, plot, commercial premises). Compulsory registration required. Includes stamp duty note, TDS under s.194-IA, s.50C capital gains, RERA compliance, and NRI/FEMA flag.",
    aliases: [
      "sale deed",
      "conveyance deed",
      "property sale deed",
      "sale deed flat",
      "house sale deed",
      "property transfer deed",
      "sale deed India",
      "plot sale deed",
    ],
    pages: 10,
    minutes: 15,
    status: "live",
  },

  groups: [
    {
      title: "Seller details",
      fields: [
        { id: "sd_seller_name", label: "Seller full name", type: "text", required: true, placeholder: "Suresh Kumar Sharma" },
        { id: "sd_seller_addr", label: "Seller address", type: "textarea", rows: 2, required: true },
        { id: "sd_seller_pan", label: "Seller PAN", type: "text", required: true, placeholder: "AABCS1234C" },
        { id: "sd_seller_aadhar", label: "Seller Aadhaar No.", type: "text", placeholder: "1234 5678 9012" },
        { id: "sd_seller_2_name", label: "Co-seller name (if joint owners)", type: "text", placeholder: "Sunita Sharma (wife)" },
        {
          id: "sd_seller_nri",
          label: "Is the seller an NRI / foreign national?",
          type: "radio",
          required: true,
          default: "no",
          options: [
            { value: "no", label: "No — Indian resident" },
            { value: "yes", label: "Yes — NRI / Person of Indian Origin / Foreign national" },
          ],
        },
      ],
    },
    {
      title: "Buyer details",
      fields: [
        { id: "sd_buyer_name", label: "Buyer full name", type: "text", required: true, placeholder: "Priya Sharma" },
        { id: "sd_buyer_addr", label: "Buyer address", type: "textarea", rows: 2, required: true },
        { id: "sd_buyer_pan", label: "Buyer PAN", type: "text", required: true, placeholder: "AABCP5678D" },
        { id: "sd_buyer_aadhar", label: "Buyer Aadhaar No.", type: "text", placeholder: "9876 5432 1098" },
        { id: "sd_buyer_2_name", label: "Co-buyer name (if joint purchase)", type: "text", placeholder: "Rahul Sharma (husband)" },
        {
          id: "sd_buyer_nri",
          label: "Is the buyer an NRI / foreign national?",
          type: "radio",
          required: true,
          default: "no",
          options: [
            { value: "no", label: "No — Indian resident" },
            { value: "yes", label: "Yes — NRI / OCI / Foreign national" },
          ],
        },
      ],
    },
    {
      title: "Property details",
      fields: [
        {
          id: "sd_property_type",
          label: "Property type",
          type: "select",
          required: true,
          default: "residential_flat",
          options: [
            { value: "residential_flat", label: "Residential — Flat / Apartment" },
            { value: "residential_house", label: "Residential — Independent House / Villa" },
            { value: "plot", label: "Plot / Land (residential)" },
            { value: "agricultural", label: "Agricultural Land" },
            { value: "commercial", label: "Commercial premises (office / shop)" },
          ],
        },
        { id: "sd_property_addr", label: "Full property address", type: "textarea", rows: 3, required: true, placeholder: "Flat No. 302, 3rd Floor, Prestige Sunrise Tower, Survey No. 15/2, Koramangala 4th Block, Bengaluru – 560 034" },
        { id: "sd_survey_no", label: "Survey No. / CTS No. / Plot No.", type: "text", placeholder: "Survey No. 15/2, Koramangala Village" },
        { id: "sd_extent", label: "Extent / area", type: "text", required: true, placeholder: "950 sq ft super built-up area / 2,400 sq ft / 30×40 sq ft plot" },
        { id: "sd_state", label: "State / UT", type: "select", required: true, options: [
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
        { id: "sd_city", label: "City", type: "text", required: true },
        { id: "sd_sro", label: "Sub-Registrar Office (SRO) where deed will be registered", type: "text", placeholder: "SRO Koramangala, Bengaluru" },
        {
          id: "sd_rera",
          label: "Is this an under-construction / RERA-registered property?",
          type: "radio",
          required: true,
          default: "no",
          options: [
            { value: "no", label: "No — ready possession / resale" },
            { value: "yes", label: "Yes — RERA registered project" },
          ],
        },
        { id: "sd_rera_no", label: "RERA Registration No. (if applicable)", type: "text", placeholder: "PRM/KA/RERA/1251/309/PR/171017/001234" },
      ],
    },
    {
      title: "Financial terms",
      fields: [
        { id: "sd_sale_consideration", label: "Sale consideration / sale price (₹)", type: "number", required: true, placeholder: "8000000" },
        { id: "sd_guideline_value", label: "Guideline / ready reckoner value (₹) — for stamp duty", type: "number", placeholder: "7500000" },
        {
          id: "sd_payment_mode",
          label: "Mode of payment",
          type: "select",
          required: true,
          default: "bank_transfer",
          options: [
            { value: "bank_transfer", label: "Bank transfer / NEFT / RTGS" },
            { value: "cheque_dd", label: "Cheque / Demand Draft" },
            { value: "home_loan", label: "Home loan from bank / HFC" },
            { value: "mixed", label: "Part cash + part loan" },
          ],
        },
        { id: "sd_loan_amount", label: "Home loan amount (₹) — if loan involved", type: "number", placeholder: "5000000" },
        { id: "sd_loan_bank", label: "Lending bank / HFC name", type: "text", placeholder: "HDFC Bank Limited" },
        { id: "sd_advance_paid", label: "Advance / token amount already paid (₹)", type: "number", placeholder: "500000" },
        { id: "sd_advance_date", label: "Date of advance / agreement to sell", type: "date" },
        { id: "sd_balance_payable", label: "Balance payable at registration (₹)", type: "number", placeholder: "7500000" },
      ],
    },
    {
      title: "Prior title and encumbrances",
      fields: [
        { id: "sd_title_doc", label: "Root of title / prior sale deed details", type: "textarea", rows: 2, required: true, placeholder: "Sale deed dated [date], Doc No. [no.], Book I, CD No. [no.], registered at SRO [name], by [prior seller] to [seller]." },
        { id: "sd_encumbrance", label: "Encumbrance / prior mortgage (if any)", type: "textarea", rows: 2, placeholder: "Nil encumbrances as per EC for last 30 years. / Existing home loan of ₹X with [Bank] being discharged simultaneously." },
        {
          id: "sd_occupation_certificate",
          label: "Occupation Certificate / CC obtained?",
          type: "radio",
          default: "yes",
          options: [
            { value: "yes", label: "Yes — OC / CC obtained" },
            { value: "no", label: "No — OC / CC not yet obtained" },
            { value: "na", label: "N/A — plot / land" },
          ],
        },
      ],
    },
  ],

  render(e) {
    const seller = e.sd_seller_name || "[Seller]";
    const seller2 = e.sd_seller_2_name || "";
    const buyer = e.sd_buyer_name || "[Buyer]";
    const buyer2 = e.sd_buyer_2_name || "";
    const consideration = Number(e.sd_sale_consideration || 0);
    const advance = Number(e.sd_advance_paid || 0);
    const balance = Number(e.sd_balance_payable || 0) || (consideration - advance);
    const loanAmt = Number(e.sd_loan_amount || 0);

    const propTypeLabel = {
      residential_flat: "residential flat / apartment",
      residential_house: "residential house / villa",
      plot: "residential plot / land",
      agricultural: "agricultural land",
      commercial: "commercial premises",
    }[e.sd_property_type || "residential_flat"] || "property";

    const blocks: DocSection[] = [];

    blocks.push({
      kind: "stamp_page",
      jurisdiction: e.sd_state || "[State]",
      stampValue: "Stamp duty as per " + (e.sd_state || "applicable state") + " Stamp Act on higher of sale consideration (₹" + consideration.toLocaleString("en-IN") + ") and guideline value (₹" + Number(e.sd_guideline_value || 0).toLocaleString("en-IN") + ")",
      instruction: "Execute on stamp paper / e-stamp / franked paper as directed by the Sub-Registrar. Original stamp paper must be presented at the time of registration.",
      registrationNote: "COMPULSORY REGISTRATION: This Sale Deed must be registered with the Sub-Registrar of Assurances (" + (e.sd_sro || "[SRO]") + ") under Section 17 of the Registration Act, 1908. Both parties must be present in person with original identity documents (Aadhaar, PAN).",
    });

    blocks.push({ kind: "title", text: "SALE DEED" });

    blocks.push({
      kind: "para",
      text:
        'THIS SALE DEED ("Deed") is made and executed on [DATE] at ' + (e.sd_city || "[City]") + ', [STATE_NAME], by and between:\n\n' +
        "1. " + seller + (e.sd_seller_addr ? " of " + e.sd_seller_addr : "") + (e.sd_seller_pan ? " (PAN: " + e.sd_seller_pan + ")" : "") + (e.sd_seller_aadhar ? " (Aadhaar: " + e.sd_seller_aadhar + ")" : "") +
        (seller2 ? " and " + seller2 : "") +
        ' (hereinafter called the "VENDOR" / "SELLER", which expression shall include their heirs, successors, legal representatives, and assigns); AND\n\n' +
        "2. " + buyer + (e.sd_buyer_addr ? " of " + e.sd_buyer_addr : "") + (e.sd_buyer_pan ? " (PAN: " + e.sd_buyer_pan + ")" : "") + (e.sd_buyer_aadhar ? " (Aadhaar: " + e.sd_buyer_aadhar + ")" : "") +
        (buyer2 ? " and " + buyer2 : "") +
        ' (hereinafter called the "PURCHASER" / "BUYER", which expression shall include their heirs, successors, legal representatives, and assigns).',
    });

    const clauses: DocSection[] = [
      {
        kind: "clause",
        number: 1,
        title: "Background and Title",
        text:
          "The Vendor is the absolute owner of the " + propTypeLabel + " described in the Schedule hereto (" + '"Schedule Property"' + "). The Vendor acquired the Schedule Property by virtue of " + (e.sd_title_doc || "[title details]") + ". The Schedule Property is free from all encumbrances except: " + (e.sd_encumbrance || "Nil"),
      },
      {
        kind: "clause",
        number: 2,
        title: "Sale Consideration and Receipt",
        text:
          "The Vendor has agreed to sell and the Purchaser has agreed to purchase the Schedule Property for a total sale consideration of ₹" + consideration.toLocaleString("en-IN") + " (Rupees [AMOUNT_IN_WORDS] only).\n\n" +
          "The sale consideration has been / is being paid as follows:\n\n" +
          (advance > 0 ? "(a) Advance / earnest money paid on [ADVANCE_DATE]: ₹" + advance.toLocaleString("en-IN") + "\n\n" : "") +
          (loanAmt > 0 ? "(b) Disbursed by " + (e.sd_loan_bank || "[Bank]") + " as home loan directly to the Vendor: ₹" + loanAmt.toLocaleString("en-IN") + "\n\n" : "") +
          "(c) Balance payable at / before registration: ₹" + balance.toLocaleString("en-IN") + "\n\n" +
          "The Vendor hereby acknowledges receipt of the full consideration of ₹" + consideration.toLocaleString("en-IN") + " and confirms that no further amount is outstanding.\n\n" +
          (consideration > 5000000 ? "The Purchaser confirms that TDS at 1% has been / will be deducted under s.194-IA of the IT Act and deposited via Form 26QB, and Form 16B shall be issued to the Vendor within 15 days of deposit." : ""),
      },
      {
        kind: "clause",
        number: 3,
        title: "Transfer of Title",
        text:
          "In consideration of the sale consideration received in full, the Vendor hereby SELLS, CONVEYS, TRANSFERS, and ASSURES to the Purchaser, absolutely and forever, all the right, title, interest, claim, and demand of the Vendor in and over the Schedule Property, together with all easements, privileges, appurtenances, and rights attached thereto.",
      },
      {
        kind: "clause",
        number: 4,
        title: "Delivery of Possession",
        text:
          "The Vendor hereby delivers and the Purchaser hereby takes possession of the Schedule Property on [DATE] / simultaneously with the registration of this Deed. From the date of possession, the Purchaser shall be the sole and exclusive owner of the Schedule Property and shall be entitled to use, enjoy, sell, mortgage, or otherwise deal with the same in any manner the Purchaser deems fit.",
      },
      {
        kind: "clause",
        number: 5,
        title: "Vendor's Covenants and Warranties",
        text:
          "The Vendor hereby covenants, represents, and warrants that:\n\n" +
          "(a) the Vendor has absolute and clear title to the Schedule Property;\n\n" +
          "(b) the Schedule Property is free from all encumbrances, mortgages, charges, attachments, lis pendens, and claims of any nature, except as disclosed herein;\n\n" +
          "(c) all property taxes, electricity bills, water charges, society maintenance, and other dues in respect of the Schedule Property up to the date of sale have been / will be cleared by the Vendor;\n\n" +
          "(d) the Vendor has not entered into any prior agreement to sell or transfer the Schedule Property to any other person;\n\n" +
          "(e) there are no pending court disputes, government acquisitions, or public authority claims in respect of the Schedule Property;\n\n" +
          "(f) the Vendor will execute all further deeds, documents, and assurances at the Purchaser's cost as may be required to perfect the Purchaser's title.",
      },
      {
        kind: "clause",
        number: 6,
        title: "Title Documents",
        text:
          "The Vendor shall hand over all original title documents, approved plans, occupation certificate" + (e.sd_occupation_certificate === "yes" ? "" : " (when obtained)") + ", share certificate (for co-operative society), property card, mutation register extract, and all other relevant records to the Purchaser on registration of this Deed.",
      },
    ];

    if (e.sd_rera === "yes") {
      clauses.push({
        kind: "clause",
        number: 7,
        title: "RERA Compliance",
        text:
          "The Schedule Property is part of a RERA-registered project bearing Registration No. " + (e.sd_rera_no || "[RERA No.]") + ". The Vendor confirms that the project is duly registered under the Real Estate (Regulation and Development) Act, 2016 and the applicable State RERA Rules, and that no material violation of RERA norms has occurred. The Purchaser's rights under RERA in respect of delayed possession, defect liability, and compensation are preserved.",
      });
    }

    clauses.push({
      kind: "clause",
      number: e.sd_rera === "yes" ? 8 : 7,
      title: "Governing Law",
      text:
        "This Deed is governed by the Transfer of Property Act 1882, the Registration Act 1908, and the laws of India. Disputes shall be subject to the jurisdiction of courts at " + (e.sd_city || "[City]") + ", [STATE_NAME].",
    });

    clauses.forEach((c) => blocks.push(c));

    blocks.push({ kind: "divider" });

    blocks.push({ kind: "subtitle", text: "SCHEDULE — DESCRIPTION OF THE PROPERTY" });
    blocks.push({
      kind: "para",
      text:
        "All that piece and parcel of the " + propTypeLabel + " known as:\n\n" +
        (e.sd_property_addr || "[Full property address and legal description]") +
        (e.sd_survey_no ? "\n\nSurvey / CTS / Plot No.: " + e.sd_survey_no : "") +
        (e.sd_extent ? "\n\nExtent / Area: " + e.sd_extent : "") +
        "\n\nBounded on: East — [boundary]; West — [boundary]; North — [boundary]; South — [boundary].",
    });

    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "kv",
      pairs: [
        { label: "Sale consideration", value: "₹" + consideration.toLocaleString("en-IN") },
        { label: "Guideline value", value: "₹" + Number(e.sd_guideline_value || 0).toLocaleString("en-IN") },
        { label: "TDS (s.194-IA)", value: consideration > 5000000 ? "₹" + Math.round(consideration * 0.01).toLocaleString("en-IN") + " @ 1%" : "N/A (< ₹50 lakh)" },
        { label: "NRI seller", value: e.sd_seller_nri === "yes" ? "Yes — s.195 TDS applicable" : "No" },
        { label: "Registration at", value: e.sd_sro || "[SRO]" },
      ],
    });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "VENDOR / SELLER\n" + seller + (seller2 ? "\n" + seller2 : ""), name: "[Signature]" },
        { role: "PURCHASER / BUYER\n" + buyer + (buyer2 ? "\n" + buyer2 : ""), name: "[Signature]" },
      ],
    });

    blocks.push({
      kind: "para",
      text: "ATTESTING WITNESSES:\n1. Name: ___________________ Signature: _______________ Address: _______________\n2. Name: ___________________ Signature: _______________ Address: _______________",
    });

    return blocks;
  },
};
