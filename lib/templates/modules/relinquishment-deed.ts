// ============================================================
// RELINQUISHMENT DEED
// Drop into: /lib/templates/relinquishment-deed.ts
// Use case: Deed by which a co-owner relinquishes / releases
//           their share in jointly owned immovable property
//           in favour of another co-owner. Commonly used in
//           inheritance / family property divisions.
// Statute refs: Transfer of Property Act 1882 s.6(a) (right to
//   relinquish); Transfer of Property Act s.17 not applicable —
//   but Registration Act 1908 s.17(1)(b) requires compulsory
//   registration of relinquishment deeds; Indian Stamp Act 1899
//   / state stamp acts (stamp duty — typically same as gift deed
//   or at concessional rates for blood relatives in many states);
//   Hindu Succession Act 1956 (relevant to co-ownership);
//   Indian Contract Act 1872; IT Act 1961 (capital gains on
//   relinquishment treated as 'transfer' u/s 2(47))
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const relinquishmentDeed: TemplateModule = {
  meta: {
    id: "relinquishment-deed",
    name: "Relinquishment Deed",
    categoryId: "property",
    category: "Property",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Deed of relinquishment by a co-owner releasing their undivided share in jointly owned immovable property in favour of another co-owner. Compulsory registration required. Covers consideration / nil consideration, family relinquishment, and IT Act capital gains note.",
    aliases: [
      "relinquishment deed",
      "release deed property",
      "deed of release",
      "relinquishment of share",
      "family property relinquishment",
      "co-owner release deed",
      "relinquishment deed India",
    ],
    pages: 5,
    minutes: 8,
    status: "live",
  },

  groups: [
    {
      title: "Releasor (who gives up their share)",
      fields: [
        { id: "rd_releasor_name", label: "Releasor full name", type: "text", required: true, placeholder: "Suresh Sharma" },
        { id: "rd_releasor_addr", label: "Releasor address", type: "textarea", rows: 2, required: true },
        { id: "rd_releasor_pan", label: "Releasor PAN", type: "text", required: true, placeholder: "AABCS1234C" },
        { id: "rd_releasor_aadhar", label: "Releasor Aadhaar No.", type: "text", placeholder: "1234 5678 9012" },
        { id: "rd_releasor_share", label: "Releasor's undivided share in property (fraction / %)", type: "text", required: true, placeholder: "1/3 (one-third) / 33.33%" },
        {
          id: "rd_how_acquired",
          label: "How did releasor acquire their share?",
          type: "select",
          required: true,
          default: "inheritance",
          options: [
            { value: "inheritance", label: "Inheritance / Succession (will / intestate)" },
            { value: "purchase", label: "Joint purchase" },
            { value: "gift", label: "Gift" },
            { value: "partition", label: "Prior partition / family settlement" },
          ],
        },
      ],
    },
    {
      title: "Releasee (who receives the share)",
      fields: [
        { id: "rd_releasee_name", label: "Releasee full name", type: "text", required: true, placeholder: "Priya Sharma" },
        { id: "rd_releasee_addr", label: "Releasee address", type: "textarea", rows: 2, required: true },
        { id: "rd_releasee_pan", label: "Releasee PAN", type: "text", required: true, placeholder: "AABCP5678D" },
        { id: "rd_releasee_aadhar", label: "Releasee Aadhaar No.", type: "text", placeholder: "9876 5432 1098" },
        {
          id: "rd_relationship",
          label: "Releasee's relationship to releasor",
          type: "select",
          required: true,
          default: "sibling",
          options: [
            { value: "sibling", label: "Sibling (brother / sister)" },
            { value: "spouse", label: "Spouse" },
            { value: "parent", label: "Parent" },
            { value: "child", label: "Child" },
            { value: "other_relative", label: "Other relative" },
            { value: "co_owner_unrelated", label: "Co-owner (non-relative)" },
          ],
        },
      ],
    },
    {
      title: "Property details",
      fields: [
        { id: "rd_property_desc", label: "Full description of property (schedule)", type: "textarea", rows: 4, required: true, placeholder: "All that piece and parcel of the residential flat bearing Door No. 302, 3rd Floor, Prestige Towers, Survey No. 12/1, Koramangala, Bengaluru – 560 034, measuring approximately 1,200 sq ft super built-up area, comprised in Sy. No. 12/1, bounded on the East by..., bounded on the West by..." },
        { id: "rd_state", label: "State / UT where property is located", type: "select", required: true, options: [
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
        { id: "rd_market_value", label: "Market / guideline value of property (₹) — full property", type: "number", required: true, placeholder: "8000000" },
        { id: "rd_doc_list", label: "Prior title documents (chain of title)", type: "textarea", rows: 2, placeholder: "Sale deed dated [date] registered as Doc No. [no.] in SRO [name]; Probate / succession certificate dated [date]" },
      ],
    },
    {
      title: "Consideration and terms",
      fields: [
        {
          id: "rd_consideration",
          label: "Consideration for relinquishment",
          type: "select",
          required: true,
          default: "nil",
          options: [
            { value: "nil", label: "Nil — out of natural love and affection / family settlement" },
            { value: "paid", label: "Paid — releasee pays releasor a consideration" },
          ],
        },
        { id: "rd_consideration_amount", label: "Consideration amount (₹) — if paid", type: "number", placeholder: "1000000" },
        { id: "rd_deed_date", label: "Date of this deed", type: "date", required: true },
        {
          id: "rd_other_coowners",
          label: "Are there other co-owners besides releasor and releasee?",
          type: "radio",
          required: true,
          default: "no",
          options: [
            { value: "no", label: "No — only releasor and releasee are co-owners" },
            { value: "yes", label: "Yes — other co-owners exist (they need not sign)" },
          ],
        },
        { id: "rd_other_coowners_names", label: "Other co-owners' names (if any)", type: "text", placeholder: "Mahesh Sharma, Kavita Sharma" },
      ],
    },
  ],

  render(e) {
    const releasor = e.rd_releasor_name || "[Releasor]";
    const releasee = e.rd_releasee_name || "[Releasee]";
    const releasorShare = e.rd_releasor_share || "[share]";
    const marketValue = Number(e.rd_market_value || 0);
    const consideration = Number(e.rd_consideration_amount || 0);
    const relationshipLabel = {
      sibling: "brother / sister",
      spouse: "husband / wife",
      parent: "father / mother",
      child: "son / daughter",
      other_relative: "relative",
      co_owner_unrelated: "co-owner",
    }[e.rd_relationship || "sibling"] || "co-owner";

    const howAcquiredLabel = {
      inheritance: "inheritance / succession",
      purchase: "joint purchase",
      gift: "gift",
      partition: "partition / family settlement",
    }[e.rd_how_acquired || "inheritance"] || "inheritance";

    const blocks: DocSection[] = [];

    blocks.push({
      kind: "stamp_page",
      jurisdiction: e.rd_state || "[State]",
      stampValue: "As per state Stamp Act on relinquishment deed — on value of share = " + releasorShare + " of ₹" + marketValue.toLocaleString("en-IN"),
      instruction: "Execute on stamp paper. Both releasor and releasee must sign. Minimum two attesting witnesses. Sub-Registrar registration is compulsory.",
      registrationNote: "COMPULSORY REGISTRATION: This deed must be registered with the Sub-Registrar of Assurances under s.17 of the Registration Act 1908. Failure to register renders the deed legally ineffective.",
    });

    blocks.push({ kind: "title", text: "DEED OF RELINQUISHMENT" });

    blocks.push({
      kind: "para",
      text:
        'THIS DEED OF RELINQUISHMENT ("Deed") is executed on [DATE] by and between:\n\n' +
        "1. " + releasor + (e.rd_releasor_addr ? " of " + e.rd_releasor_addr : "") + (e.rd_releasor_pan ? " (PAN: " + e.rd_releasor_pan + ")" : "") + (e.rd_releasor_aadhar ? " (Aadhaar: " + e.rd_releasor_aadhar + ")" : "") + ' (hereinafter called the "RELEASOR" or "First Party"); AND\n\n' +
        "2. " + releasee + (e.rd_releasee_addr ? " of " + e.rd_releasee_addr : "") + (e.rd_releasee_pan ? " (PAN: " + e.rd_releasee_pan + ")" : "") + (e.rd_releasee_aadhar ? " (Aadhaar: " + e.rd_releasee_aadhar + ")" : "") + ", " + relationshipLabel + ' of the Releasor (hereinafter called the "RELEASEE" or "Second Party").',
    });

    const clauses: DocSection[] = [
      {
        kind: "clause",
        number: 1,
        title: "Recitals — Ownership",
        text:
          "The Releasor and the Releasee are co-owners of the immovable property described in the Schedule hereto (" + '"Property"' + "). The Releasor holds an undivided share of " + releasorShare + " in the Property, acquired by way of " + howAcquiredLabel + "." +
          (e.rd_other_coowners === "yes" && e.rd_other_coowners_names ? " The remaining co-owners of the Property are: " + e.rd_other_coowners_names + "." : "") +
          "\n\nThe prior title documents in respect of the Property are: " + (e.rd_doc_list || "[list of title documents]") + ".",
      },
      {
        kind: "clause",
        number: 2,
        title: "Relinquishment",
        text:
          "In consideration of " +
          (e.rd_consideration === "nil"
            ? "natural love and affection for the Releasee and for no monetary consideration"
            : "the sum of ₹" + consideration.toLocaleString("en-IN") + " (Rupees [AMOUNT_IN_WORDS] only) paid by the Releasee to the Releasor (receipt acknowledged)") +
          ", the Releasor hereby RELINQUISHES, RELEASES, and SURRENDERS to the Releasee absolutely, all the undivided right, title, share, interest, and claim of the Releasor in and over the Property described in the Schedule, being " + releasorShare + " of the total property.\n\n" +
          "By virtue of this Deed, the Releasee shall, from the date of registration of this Deed, become the absolute owner of the Releasor's share in the Property, free from all claims by the Releasor or anyone claiming through the Releasor.",
      },
      {
        kind: "clause",
        number: 3,
        title: "Possession",
        text:
          "The Releasor hereby confirms that the Releasee is in possession and enjoyment of the Property (or shall obtain possession upon registration). The Releasor shall have no right to obstruct, interfere with, or claim possession of the Property or any part thereof after the execution and registration of this Deed.",
      },
      {
        kind: "clause",
        number: 4,
        title: "Representations and Warranties",
        text:
          "The Releasor hereby represents and warrants that:\n\n" +
          "(a) the Releasor has the full right and authority to relinquish their share in the Property;\n\n" +
          "(b) the Releasor's share is free from all encumbrances, mortgages, attachments, liens, lis pendens, and claims;\n\n" +
          "(c) the Releasor has not created any charge or lien on their share, nor entered into any prior agreement to transfer the same;\n\n" +
          "(d) the Releasor shall indemnify the Releasee against any claims, demands, or encumbrances arising from the Releasor's prior acts.",
      },
      {
        kind: "clause",
        number: 5,
        title: "Title Documents",
        text:
          "The Releasor shall hand over all original title documents, succession certificates, wills, prior deeds, and other relevant records pertaining to their share in the Property to the Releasee within 15 days of registration of this Deed.",
      },
      {
        kind: "clause",
        number: 6,
        title: "Further Assurance",
        text:
          "The Releasor shall, at the Releasee's cost and request, execute such further documents, affidavits, and instruments as may be necessary to complete the transfer of the Releasor's share to the Releasee, including mutation of the Property in local revenue / municipal records.",
      },
      {
        kind: "clause",
        number: 7,
        title: "Governing Law",
        text:
          "This Deed is governed by the laws of India. Disputes shall be subject to the jurisdiction of courts at [CITY], [STATE_NAME].",
      },
    ];

    clauses.forEach((c) => blocks.push(c));

    blocks.push({ kind: "divider" });

    blocks.push({ kind: "subtitle", text: "SCHEDULE — DESCRIPTION OF PROPERTY" });
    blocks.push({ kind: "para", text: e.rd_property_desc || "[Full property schedule — boundaries, survey numbers, extent, etc.]" });

    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "para",
      text: "IN WITNESS WHEREOF the Parties have executed this Deed on the date first written above.",
    });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "RELEASOR\n" + releasor, name: "[Signature]" },
        { role: "RELEASEE\n" + releasee, name: "[Signature — Acceptance]" },
      ],
    });

    blocks.push({
      kind: "para",
      text: "ATTESTING WITNESSES:\n1. Name: ___________________ Signature: _______________ Address: _______________\n2. Name: ___________________ Signature: _______________ Address: _______________",
    });

    return blocks;
  },
};
