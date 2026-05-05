// ============================================================
// PATENT LICENCE AGREEMENT
// Drop into: /lib/templates/patent-licence.ts
// Use case: Agreement by which a patent owner (Licensor) grants
//           a licence to use a patented invention to a Licensee.
//           Covers exclusive / non-exclusive / sole licences,
//           royalty structures, field-of-use restrictions, and
//           sub-licensing.
// Statute refs: Patents Act 1970 ss.68–71 (licences of right);
//   s.84 (compulsory licence); s.100 (Government use);
//   s.103 (right of exclusive licensee); Copyright Act 1957
//   (if software/design aspects); Income Tax Act 1961 s.115A
//   (withholding on royalties paid to non-residents);
//   Indian Contract Act 1872; FEMA 20(R)/2017 (if cross-border)
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const patentLicence: TemplateModule = {
  meta: {
    id: "patent-licence",
    name: "Patent Licence Agreement",
    categoryId: "ip",
    category: "IP & Trademarks",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Licence agreement for a patented invention in India. Covers exclusive, non-exclusive, or sole licence; royalty and milestone payments; field-of-use and territory restrictions; sub-licensing; improvements ownership; and compulsory licence awareness.",
    aliases: [
      "patent licence",
      "patent license agreement",
      "patent licensing agreement India",
      "technology licence",
      "exclusive licence patent",
      "patent royalty agreement",
    ],
    pages: 8,
    minutes: 12,
    status: "live",
  },

  groups: [
    {
      title: "Licensor (patent owner)",
      fields: [
        { id: "pl_licensor_name", label: "Licensor full legal name", type: "text", required: true, placeholder: "InnovateTech Research Private Limited" },
        { id: "pl_licensor_addr", label: "Licensor address", type: "textarea", rows: 2, required: true },
        { id: "pl_licensor_rep", label: "Licensor signatory name & designation", type: "text", placeholder: "Dr. Arjun Mehta, CEO" },
        {
          id: "pl_licensor_type",
          label: "Licensor type",
          type: "select",
          default: "company",
          options: [
            { value: "company", label: "Company (Indian)" },
            { value: "individual", label: "Individual inventor" },
            { value: "university", label: "University / Research Institution" },
            { value: "foreign", label: "Foreign entity" },
          ],
        },
      ],
    },
    {
      title: "Licensee",
      fields: [
        { id: "pl_licensee_name", label: "Licensee full legal name", type: "text", required: true, placeholder: "Acme Manufacturing Private Limited" },
        { id: "pl_licensee_addr", label: "Licensee address", type: "textarea", rows: 2, required: true },
        { id: "pl_licensee_rep", label: "Licensee signatory name & designation", type: "text", placeholder: "Priya Sharma, Director" },
      ],
    },
    {
      title: "Patent details",
      fields: [
        { id: "pl_patent_title", label: "Title of the invention", type: "text", required: true, placeholder: "A Method and System for Real-time GST Reconciliation Using Machine Learning" },
        { id: "pl_patent_no", label: "Indian Patent No. (IN)", type: "text", required: true, placeholder: "IN 345678" },
        { id: "pl_app_no", label: "Patent Application No. (if not yet granted)", type: "text", placeholder: "201841012345" },
        { id: "pl_filing_date", label: "Filing date", type: "date" },
        { id: "pl_grant_date", label: "Grant date (if granted)", type: "date" },
        { id: "pl_expiry_date", label: "Patent expiry date (20 years from filing)", type: "date" },
        { id: "pl_related_patents", label: "Related patents / applications (India and international, if any)", type: "textarea", rows: 2, placeholder: "PCT/IN2018/012345; US 11,234,567; EP 3,123,456" },
      ],
    },
    {
      title: "Licence terms",
      fields: [
        {
          id: "pl_licence_type",
          label: "Licence type",
          type: "select",
          required: true,
          default: "non_exclusive",
          options: [
            { value: "exclusive", label: "Exclusive — only Licensee may use in territory/field" },
            { value: "sole", label: "Sole — Licensor retains right to use but no other licensees" },
            { value: "non_exclusive", label: "Non-exclusive — Licensor may grant to others" },
          ],
        },
        {
          id: "pl_field_of_use",
          label: "Field of use / application",
          type: "textarea",
          rows: 2,
          required: true,
          placeholder: "Manufacture and sale of GST reconciliation software for SMEs in India. Excludes large enterprise / banking sector applications.",
        },
        {
          id: "pl_territory",
          label: "Territory",
          type: "select",
          required: true,
          default: "india_only",
          options: [
            { value: "india_only", label: "India only" },
            { value: "south_asia", label: "India and South Asia (SAARC)" },
            { value: "worldwide", label: "Worldwide" },
          ],
        },
        { id: "pl_start_date", label: "Licence commencement date", type: "date", required: true },
        {
          id: "pl_term_type",
          label: "Licence term",
          type: "select",
          required: true,
          default: "fixed",
          options: [
            { value: "fixed", label: "Fixed term (until patent expiry or agreed date)" },
            { value: "perpetual", label: "Perpetual (until patent expiry)" },
          ],
        },
        { id: "pl_end_date", label: "Licence end date (if fixed term)", type: "date" },
        {
          id: "pl_sublicence",
          label: "Sub-licensing rights",
          type: "radio",
          required: true,
          default: "no",
          options: [
            { value: "yes", label: "Yes — Licensee may sub-licence with prior written consent of Licensor" },
            { value: "no", label: "No — sub-licensing not permitted" },
          ],
        },
      ],
    },
    {
      title: "Royalty & payments",
      fields: [
        {
          id: "pl_royalty_type",
          label: "Royalty / compensation structure",
          type: "select",
          required: true,
          default: "running_royalty",
          options: [
            { value: "running_royalty", label: "Running royalty on net sales" },
            { value: "lump_sum", label: "Lump sum one-time payment" },
            { value: "milestone_royalty", label: "Milestones + running royalty" },
            { value: "nil", label: "Nil — no royalty (group company / research use)" },
          ],
        },
        { id: "pl_royalty_rate", label: "Royalty rate (% of net sales)", type: "number", placeholder: "5" },
        { id: "pl_minimum_royalty", label: "Minimum annual royalty (₹)", type: "number", placeholder: "500000" },
        { id: "pl_upfront_fee", label: "Upfront / milestone fee (₹)", type: "number", placeholder: "1000000" },
        { id: "pl_payment_frequency", label: "Royalty payment frequency", type: "select", default: "quarterly", options: [{ value: "monthly", label: "Monthly" }, { value: "quarterly", label: "Quarterly" }, { value: "annually", label: "Annually" }] },
        {
          id: "pl_cross_border",
          label: "Is the Licensor a foreign entity (cross-border royalty)?",
          type: "radio",
          required: true,
          default: "no",
          options: [
            { value: "no", label: "No — both parties Indian" },
            { value: "yes", label: "Yes — Licensor is a foreign entity; TDS / FEMA apply" },
          ],
        },
      ],
    },
    {
      title: "IP ownership & improvements",
      fields: [
        {
          id: "pl_improvements_ownership",
          label: "Ownership of improvements / derivative inventions made by Licensee",
          type: "select",
          required: true,
          default: "licensor",
          options: [
            { value: "licensor", label: "Vest in Licensor — Licensee to assign improvements" },
            { value: "licensee", label: "Vest in Licensee — Licensor gets grant-back licence" },
            { value: "joint", label: "Jointly owned — costs and benefits shared" },
          ],
        },
      ],
    },
  ],

  render(e) {
    const licensor = e.pl_licensor_name || "[Licensor]";
    const licensee = e.pl_licensee_name || "[Licensee]";
    const patentTitle = e.pl_patent_title || "[Patent Title]";
    const patentNo = e.pl_patent_no || (e.pl_app_no ? "Application No. " + e.pl_app_no : "[Patent No.]");
    const royaltyRate = Number(e.pl_royalty_rate || 0);
    const upfront = Number(e.pl_upfront_fee || 0);
    const minRoyalty = Number(e.pl_minimum_royalty || 0);

    const licenceTypeLabel = {
      exclusive: "exclusive",
      sole: "sole",
      non_exclusive: "non-exclusive",
    }[e.pl_licence_type || "non_exclusive"] || "non-exclusive";

    const territoryLabel = {
      india_only: "the territory of India",
      south_asia: "India and South Asia (SAARC member countries)",
      worldwide: "worldwide",
    }[e.pl_territory || "india_only"] || "India";

    const improvLabel = {
      licensor: "assigned to and vest absolutely in the Licensor",
      licensee: "owned by the Licensee, with a perpetual royalty-free grant-back licence to the Licensor",
      joint: "jointly owned by both Parties in equal shares",
    }[e.pl_improvements_ownership || "licensor"] || "vest in the Licensor";

    const blocks: DocSection[] = [];

    blocks.push({
      kind: "info",
      title: "Patent Licence — Applicable Law",
      acts: [
        "Patents Act 1970 — ss.68–71, 84, 100, 103",
        "Indian Contract Act 1872",
        "IT Act 1961 — s.115A (royalty TDS for non-residents)",
        "FEMA 20(R)/2017 (cross-border royalty remittances)",
      ],
      text: "An exclusive licensee has the same rights to bring infringement proceedings as the patent owner (s.103). Compulsory licence may be sought by a third party after 3 years from grant (s.84). Register with the Indian Patent Office for enforceability against successors.",
    });

    blocks.push({ kind: "title", text: "PATENT LICENCE AGREEMENT" });

    blocks.push({
      kind: "para",
      text:
        "This Patent Licence Agreement (" + '"Agreement"' + ") is entered into as of [DATE] by and between:\n\n" +
        "1. " + licensor + (e.pl_licensor_addr ? " of " + e.pl_licensor_addr : "") + ' ("Licensor"); and\n\n' +
        "2. " + licensee + (e.pl_licensee_addr ? " of " + e.pl_licensee_addr : "") + ' ("Licensee").\n\nTogether, the "Parties".',
    });

    const clauses: DocSection[] = [
      {
        kind: "clause",
        number: 1,
        title: "Definitions",
        text:
          '"Licensed Patent" means Indian Patent No. ' + patentNo + ' entitled "' + patentTitle + '"' +
          (e.pl_related_patents ? " and related patents/applications: " + e.pl_related_patents : "") + ".\n\n" +
          '"Net Sales" means gross revenues from the sale, lease, or other disposition of products or services incorporating or practising the Licensed Patent, less returns, discounts, taxes, and freight.\n\n' +
          '"Improvements" means any modification, enhancement, or derivative of the Licensed Patent made by the Licensee during the term of this Agreement.\n\n' +
          '"Field of Use" means: ' + (e.pl_field_of_use || "[field]") + ".",
      },
      {
        kind: "clause",
        number: 2,
        title: "Grant of Licence",
        text:
          "Subject to the terms of this Agreement, the Licensor hereby grants to the Licensee a " +
          licenceTypeLabel +
          ", " +
          (e.pl_sublicence === "yes" ? "sub-licensable (with prior written consent of Licensor)" : "non-sub-licensable") +
          " licence under the Licensed Patent to make, use, sell, import, and otherwise commercially exploit the patented invention within the Field of Use in " +
          territoryLabel +
          " for the term of this Agreement.",
      },
      {
        kind: "clause",
        number: 3,
        title: "Term",
        text:
          "This Agreement commences on [START_DATE] and continues " +
          (e.pl_term_type === "fixed" ? "until [END_DATE] or the expiry of the Licensed Patent, whichever is earlier" : "until the expiry of the last to expire of the Licensed Patents or any granted patent arising from the application") +
          ", unless earlier terminated in accordance with this Agreement.",
      },
      {
        kind: "clause",
        number: 4,
        title: "Royalties and Payments",
        text:
          e.pl_royalty_type === "nil"
            ? "No royalty is payable under this Agreement. The Licensor grants this licence for non-commercial research / intra-group purposes only."
            : e.pl_royalty_type === "lump_sum"
            ? "In consideration of the licence granted, the Licensee shall pay the Licensor a lump sum licence fee of ₹" + upfront.toLocaleString("en-IN") + " (Rupees [AMOUNT_IN_WORDS] only) on the date of this Agreement, after which no further royalties shall be payable."
            : "In consideration of the licence granted, the Licensee shall pay the Licensor:\n\n" +
              (upfront > 0 ? "(a) An upfront fee of ₹" + upfront.toLocaleString("en-IN") + " payable on execution of this Agreement;\n\n" : "") +
              "(b) A running royalty of " + royaltyRate + "% of Net Sales arising from the exploitation of the Licensed Patent, payable " + (e.pl_payment_frequency || "quarterly") + " within 30 days of the end of each payment period, together with a royalty statement;\n\n" +
              (minRoyalty > 0 ? "(c) A minimum annual royalty of ₹" + minRoyalty.toLocaleString("en-IN") + " regardless of actual Net Sales, commencing from the second year of this Agreement.\n\n" : "") +
              (e.pl_cross_border === "yes" ? "All payments shall be made after deduction of TDS under s.195 / s.115A of the IT Act 1961 at the applicable rate (or lower DTAA rate). The Licensee shall promptly provide TDS certificates to the Licensor." : "All payments are inclusive of applicable taxes. The Licensee shall deduct TDS as required by law and provide certificates accordingly."),
      },
      {
        kind: "clause",
        number: 5,
        title: "Records and Audit",
        text:
          "The Licensee shall maintain accurate books and records of all sales, uses, and other exploitation of the Licensed Patent. The Licensor shall have the right, not more than once per year, on 30 days' written notice, to audit the Licensee's records relevant to royalty computation. If an audit reveals an underpayment of more than 5%, the cost of the audit shall be borne by the Licensee.",
      },
      {
        kind: "clause",
        number: 6,
        title: "Improvements",
        text:
          "All Improvements made by the Licensee during the term shall be " +
          improvLabel +
          ". The Licensee shall promptly disclose all Improvements to the Licensor in writing. " +
          (e.pl_improvements_ownership === "licensee"
            ? "The Licensor is hereby granted a perpetual, irrevocable, royalty-free licence to use Licensee's Improvements."
            : e.pl_improvements_ownership === "joint"
            ? "Each Party shall cooperate in the filing and prosecution of joint patent applications at shared cost."
            : "The Licensee shall execute all documents necessary to assign Improvements to the Licensor."),
      },
      {
        kind: "clause",
        number: 7,
        title: "Patent Prosecution and Maintenance",
        text:
          "The Licensor shall be responsible for prosecuting and maintaining the Licensed Patent in India, including payment of annuity fees. " +
          (e.pl_licence_type === "exclusive"
            ? "The Licensor shall promptly notify the Licensee of any actions materially affecting the Licensed Patent. If the Licensor elects not to maintain the patent, it shall give the Licensee at least 90 days' notice, whereupon the Licensee may, at its own cost, take over such maintenance."
            : "The Licensee shall cooperate with the Licensor in patent prosecution and shall provide all relevant technical information."),
      },
      {
        kind: "clause",
        number: 8,
        title: "Infringement",
        text:
          e.pl_licence_type === "exclusive"
            ? "If either Party becomes aware of any infringement or suspected infringement of the Licensed Patent by a third party, it shall promptly notify the other Party. The Licensee shall have the right, as exclusive licensee under s.103 of the Patents Act 1970, to bring infringement proceedings in its own name and retain any damages awarded. The Licensor shall provide reasonable assistance at the Licensee's cost. If the Licensee does not commence infringement proceedings within 90 days of notice, the Licensor may do so."
            : "If the Licensor becomes aware of any infringement of the Licensed Patent, it shall notify the Licensee. The Licensor shall have the sole right to bring infringement proceedings. The Licensee shall provide reasonable cooperation at the Licensor's request.",
      },
      {
        kind: "clause",
        number: 9,
        title: "Representations and Warranties",
        text:
          "The Licensor represents that:\n\n(a) it has the right to grant this licence;\n\n(b) the Licensed Patent is valid and subsisting;\n\n(c) to the Licensor's knowledge, the practice of the Licensed Patent in the Field of Use does not infringe any third party's patent.\n\nThe Licensor makes no warranty as to the commercial utility of the Licensed Patent. THE LICENCE IS GRANTED " + '"AS IS"' + " WITHOUT ANY WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.",
      },
      {
        kind: "clause",
        number: 10,
        title: "Termination",
        text:
          "Either Party may terminate this Agreement: (a) on 90 days' written notice for convenience (non-exclusive licence only); (b) immediately upon written notice if the other Party commits a material breach and fails to cure it within 30 days of notice; (c) immediately if the other Party becomes insolvent or enters liquidation.\n\nUpon termination, all licences granted herein shall cease. The Licensee shall promptly discontinue use of the Licensed Patent and deliver or destroy all materials incorporating the same. Clauses on royalties due, audit rights, improvements, and governing law shall survive termination.",
      },
      {
        kind: "clause",
        number: 11,
        title: "Governing Law",
        text:
          "This Agreement is governed by the laws of India, specifically including the Patents Act 1970. Disputes shall be resolved by arbitration under the Arbitration and Conciliation Act, 1996, with the seat at [CITY].",
      },
    ];

    clauses.forEach((c) => blocks.push(c));

    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "LICENSOR\n" + licensor, name: e.pl_licensor_rep || "[Name & Designation]" },
        { role: "LICENSEE\n" + licensee, name: e.pl_licensee_rep || "[Name & Designation]" },
      ],
    });

    return blocks;
  },
};
