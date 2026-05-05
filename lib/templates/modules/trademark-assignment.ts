// ============================================================
// TRADEMARK ASSIGNMENT DEED
// Drop into: /lib/templates/trademark-assignment.ts
// Use case: Assignment of a registered or pending trademark from
//           the Assignor (current TM owner) to the Assignee.
//           Covers complete vs. partial assignment, assignment
//           with or without goodwill, and recordal with TMR.
// Statute refs: Trade Marks Act 1999 ss.37–45 (assignment and
//   transmission); s.42 (assignment without goodwill — one-year
//   notice period); Rule 68–74 TM Rules 2017; Form TM-P for
//   recordal of assignment; Indian Stamp Act 1899 (stamp duty
//   on assignment deed); Indian Contract Act 1872
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const trademarkAssignment: TemplateModule = {
  meta: {
    id: "trademark-assignment",
    name: "Trademark Assignment Deed",
    categoryId: "ip",
    category: "IP & Trademarks",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Deed of assignment of a registered or pending trademark in India. Covers complete or partial assignment, with or without goodwill, with recordal authority under Trade Marks Act 1999. Includes Form TM-P filing authority.",
    aliases: [
      "trademark assignment",
      "trade mark assignment deed",
      "TM assignment",
      "brand assignment",
      "trademark transfer",
      "IP assignment trademark",
    ],
    pages: 6,
    minutes: 10,
    status: "live",
  },

  groups: [
    {
      title: "Assignor (current TM owner)",
      fields: [
        { id: "tma_assignor_name", label: "Assignor full legal name", type: "text", required: true, placeholder: "Acme Brands Private Limited" },
        { id: "tma_assignor_addr", label: "Assignor address", type: "textarea", rows: 2, required: true },
        { id: "tma_assignor_type", label: "Assignor type", type: "select", default: "company", options: [{ value: "company", label: "Company" }, { value: "individual", label: "Individual" }, { value: "llp", label: "LLP" }, { value: "firm", label: "Partnership Firm" }] },
        { id: "tma_assignor_rep", label: "Assignor signatory name & designation", type: "text", placeholder: "Priya Sharma, CEO" },
      ],
    },
    {
      title: "Assignee (new TM owner)",
      fields: [
        { id: "tma_assignee_name", label: "Assignee full legal name", type: "text", required: true, placeholder: "NewCo Technologies Private Limited" },
        { id: "tma_assignee_addr", label: "Assignee address", type: "textarea", rows: 2, required: true },
        { id: "tma_assignee_type", label: "Assignee type", type: "select", default: "company", options: [{ value: "company", label: "Company" }, { value: "individual", label: "Individual" }, { value: "llp", label: "LLP" }, { value: "firm", label: "Partnership Firm" }] },
        { id: "tma_assignee_rep", label: "Assignee signatory name & designation", type: "text", placeholder: "Rahul Verma, Director" },
      ],
    },
    {
      title: "Trademark details",
      fields: [
        { id: "tma_tm_name", label: "Trademark / brand name (word mark)", type: "text", required: true, placeholder: "ACMETECH" },
        { id: "tma_tm_logo", label: "Device / logo description (if device mark)", type: "text", placeholder: "Stylised letter A in blue and orange" },
        {
          id: "tma_tm_status",
          label: "Registration status",
          type: "select",
          required: true,
          default: "registered",
          options: [
            { value: "registered", label: "Registered — registration certificate issued" },
            { value: "pending", label: "Pending — application filed, awaiting registration" },
            { value: "renewal_due", label: "Registered — renewal due" },
          ],
        },
        { id: "tma_reg_no", label: "TM Application / Registration No.", type: "text", required: true, placeholder: "5012345" },
        { id: "tma_classes", label: "Nice Classification class(es)", type: "text", required: true, placeholder: "Class 9, Class 42" },
        { id: "tma_goods_services", label: "Goods / services covered", type: "textarea", rows: 3, required: true, placeholder: "Software as a service (SaaS); computer software; IT consultancy services" },
        { id: "tma_reg_date", label: "Date of registration / filing", type: "date" },
        { id: "tma_renewal_date", label: "Renewal due date (if registered)", type: "date" },
      ],
    },
    {
      title: "Assignment terms",
      fields: [
        {
          id: "tma_assignment_type",
          label: "Type of assignment",
          type: "select",
          required: true,
          default: "complete_with_goodwill",
          options: [
            { value: "complete_with_goodwill", label: "Complete assignment — with goodwill" },
            { value: "complete_without_goodwill", label: "Complete assignment — without goodwill (s.42)" },
            { value: "partial_goods", label: "Partial assignment — specific goods/services only" },
          ],
        },
        { id: "tma_partial_scope", label: "Partial assignment scope (goods/services included)", type: "textarea", rows: 2, placeholder: "Class 9 goods only (excluding Class 42 services)" },
        { id: "tma_consideration", label: "Assignment consideration (₹)", type: "number", required: true, placeholder: "500000" },
        { id: "tma_consideration_type", label: "Consideration type", type: "select", default: "lump_sum", options: [{ value: "lump_sum", label: "Lump sum — paid on execution" }, { value: "deferred", label: "Deferred / instalment" }, { value: "nil_love_affection", label: "Nil — natural love and affection / within group" }] },
        { id: "tma_effective_date", label: "Effective date of assignment", type: "date", required: true },
        {
          id: "tma_pending_proceedings",
          label: "Are there any pending TMR proceedings / oppositions on this mark?",
          type: "radio",
          required: true,
          default: "no",
          options: [
            { value: "no", label: "No pending proceedings" },
            { value: "yes", label: "Yes — opposition / cancellation / infringement proceeding pending" },
          ],
        },
        { id: "tma_proceeding_details", label: "Proceeding details (if any)", type: "textarea", rows: 2, placeholder: "Opposition No. TMO/OP/2023/123456 pending before Trademarks Registry, Mumbai" },
      ],
    },
  ],

  render(e) {
    const assignor = e.tma_assignor_name || "[Assignor]";
    const assignee = e.tma_assignee_name || "[Assignee]";
    const tmName = e.tma_tm_name || "[Trademark]";
    const consideration = Number(e.tma_consideration || 0);
    const assignType = e.tma_assignment_type || "complete_with_goodwill";

    const assignTypeLabel = {
      complete_with_goodwill: "complete assignment together with the goodwill of the business concerned",
      complete_without_goodwill: "complete assignment without the goodwill of the business in respect of the use of the trademark",
      partial_goods: "partial assignment in respect of specific goods/services only",
    }[assignType] || "complete assignment";

    const blocks: DocSection[] = [];

    blocks.push({
      kind: "info",
      title: "Trademark Assignment — Applicable Law",
      acts: [
        "Trade Marks Act 1999 — ss.37–45 (Assignment & Transmission)",
        "Trade Marks Rules 2017 — Rules 68–74, Form TM-P",
        "Indian Contract Act 1872",
        "Indian Stamp Act 1899",
      ],
      text: "A registered trademark may be assigned with or without the goodwill of the business. Assignment without goodwill requires statutory advertisement (s.42). Form TM-P must be filed with the Trademarks Registry to record the change of ownership.",
    });

    blocks.push({ kind: "title", text: "DEED OF ASSIGNMENT OF TRADEMARK" });

    blocks.push({
      kind: "para",
      text:
        "THIS DEED OF ASSIGNMENT OF TRADEMARK (" + '"Deed"' + ") is made and executed on [DATE] by and between:\n\n" +
        "1. " + assignor + (e.tma_assignor_addr ? ", having its principal place of business / address at " + e.tma_assignor_addr : "") + " (hereinafter referred to as the " + '"Assignor"' + ", which expression shall include its successors and permitted assigns); AND\n\n" +
        "2. " + assignee + (e.tma_assignee_addr ? ", having its principal place of business / address at " + e.tma_assignee_addr : "") + " (hereinafter referred to as the " + '"Assignee"' + ", which expression shall include its successors and permitted assigns).\n\n" +
        "The Assignor and Assignee are hereinafter collectively referred to as the " + '"Parties"' + ".",
    });

    blocks.push({
      kind: "clause",
      number: 1,
      title: "Background",
      text:
        "The Assignor is the registered owner / applicant of the trademark " + '"' + tmName + '"' +
        (e.tma_tm_logo ? " (device: " + e.tma_tm_logo + ")" : "") +
        ", bearing Application / Registration No. " + (e.tma_reg_no || "[Reg. No.]") +
        " in Class(es) " + (e.tma_classes || "[Classes]") +
        " in respect of " + (e.tma_goods_services || "[goods/services]") +
        ", registered / filed with the Office of the Trade Marks Registry, India" +
        (e.tma_reg_date ? " on [REG_DATE]" : "") +
        " (" + '"Trademark"' + "). The Assignor has agreed to assign the Trademark to the Assignee on the terms and conditions set out in this Deed.",
    });

    blocks.push({
      kind: "clause",
      number: 2,
      title: "Assignment",
      text:
        "In consideration of the sum of ₹" +
        (consideration > 0 ? consideration.toLocaleString("en-IN") + " (Rupees [AMOUNT_IN_WORDS] only)" : "[Consideration]") +
        (e.tma_consideration_type === "nil_love_affection" ? " and natural love and affection and other valuable consideration" : "") +
        " paid by the Assignee to the Assignor (the receipt and adequacy of which the Assignor hereby acknowledges), the Assignor hereby ASSIGNS, TRANSFERS, and CONVEYS to the Assignee, by way of " +
        assignTypeLabel +
        ", with effect from [EFFECTIVE_DATE], all the Assignor's right, title, and interest in and to the Trademark, including:\n\n" +
        "(a) the registered / applied-for trademark " + '"' + tmName + '"' + " bearing Registration / Application No. " + (e.tma_reg_no || "[No.]") + ";\n\n" +
        "(b) all renewals, extensions, and continuations of the registration;\n\n" +
        (assignType === "complete_with_goodwill" ? "(c) the goodwill of the business connected with the use of the Trademark;\n\n" : "") +
        (assignType === "partial_goods" ? "(c) the assignment is limited to the following goods/services: " + (e.tma_partial_scope || "[scope]") + ";\n\n" : "") +
        "(d) the right to sue for past infringement and to retain any damages or compensation awarded;\n\n" +
        "(e) all pending applications and proceedings relating to the Trademark.",
    });

    blocks.push({
      kind: "clause",
      number: 3,
      title: "Assignor's Representations and Warranties",
      text:
        "The Assignor represents and warrants that:\n\n" +
        "(a) the Assignor is the sole and exclusive owner of the Trademark and has the full right, power, and authority to assign the same;\n\n" +
        "(b) the Trademark is valid, subsisting" +
        (e.tma_tm_status === "registered" ? ", duly registered, and not subject to any cancellation or revocation proceeding" : ", and the application is in good standing") +
        ";\n\n" +
        "(c) " +
        (e.tma_pending_proceedings === "yes"
          ? "except as disclosed — namely, " + (e.tma_proceeding_details || "[proceedings]") + " — the Trademark is free from all encumbrances, liens, licences, and adverse claims"
          : "the Trademark is free from all encumbrances, liens, licences, and adverse claims") +
        ";\n\n" +
        "(d) the Assignor has not granted any licence or sub-licence in respect of the Trademark that would survive this assignment;\n\n" +
        "(e) to the Assignor's knowledge, the use of the Trademark does not infringe any third party's intellectual property rights.",
    });

    blocks.push({
      kind: "clause",
      number: 4,
      title: "Assignee's Obligations",
      text:
        "The Assignee agrees to:\n\n" +
        "(a) file Form TM-P with the Trademarks Registry within 6 months of this Deed to record the change of ownership;\n\n" +
        "(b) pay all renewal fees and maintain the Trademark in force;\n\n" +
        "(c) prosecute, defend, and protect the Trademark against infringement;\n\n" +
        (e.tma_pending_proceedings === "yes"
          ? "(d) take over conduct of and be responsible for all pending proceedings relating to the Trademark, including " + (e.tma_proceeding_details || "[proceedings]") + ";\n\n"
          : "") +
        "(e) indemnify the Assignor against any claims arising out of the Assignee's use of the Trademark after the Effective Date.",
    });

    blocks.push({
      kind: "clause",
      number: 5,
      title: "Further Assurance",
      text:
        "The Assignor shall, at the Assignee's cost and request, execute such further documents, deeds, and instruments, and do all such acts and things, as may be necessary or desirable to give full effect to this assignment, including signing Form TM-P or any power of attorney required for TMR filings.",
    });

    blocks.push({
      kind: "clause",
      number: 6,
      title: "Stamp Duty and Costs",
      text:
        "This Deed shall be duly stamped under the applicable provisions of the Indian Stamp Act 1899 / relevant State Stamp Act. The stamp duty and registration charges (if any) shall be borne by the Assignee. Each Party shall bear its own legal costs in connection with this Deed.",
    });

    blocks.push({
      kind: "clause",
      number: 7,
      title: "Governing Law",
      text:
        "This Deed is governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with this Deed shall be subject to the exclusive jurisdiction of the courts at [CITY] or, at the election of either Party, resolved by arbitration under the Arbitration and Conciliation Act, 1996.",
    });

    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "para",
      text: "IN WITNESS WHEREOF the Parties have executed this Deed on the date first written above.",
    });

    blocks.push({
      kind: "signatures",
      parties: [
        {
          role: "For and on behalf of ASSIGNOR\n" + assignor,
          name: e.tma_assignor_rep || "[Name & Designation]",
        },
        {
          role: "For and on behalf of ASSIGNEE\n" + assignee,
          name: e.tma_assignee_rep || "[Name & Designation]",
        },
      ],
    });

    blocks.push({
      kind: "para",
      text:
        "WITNESSES:\n1. Name: ___________________ Signature: _______________ Address: _______________\n2. Name: ___________________ Signature: _______________ Address: _______________",
    });

    blocks.push({ kind: "annex_signoff" });

    blocks.push({
      kind: "para",
      text:
        "ANNEXURE — TRADEMARK DETAILS\n\nTrademark: " + tmName + "\nApplication / Registration No.: " + (e.tma_reg_no || "[No.]") + "\nNice Class(es): " + (e.tma_classes || "[Classes]") + "\nGoods / Services: " + (e.tma_goods_services || "[Description]") + "\nRegistration Date: [REG_DATE]\nRenewal Due: " + (e.tma_renewal_date ? "[RENEWAL_DATE]" : "N/A"),
    });

    return blocks;
  },
};
