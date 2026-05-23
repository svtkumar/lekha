// ============================================================
// SHARE CERTIFICATE
// Drop into: /lib/templates/share-certificate.ts
// Use case: Formal share certificate issued by a private limited
//           company to a member on allotment or transfer.
//           Generates a printable certificate in the format
//           prescribed by Companies Act 2013, Schedule I, Table F
//           (Articles of Association model) and Section 46.
// Statute refs: Companies Act 2013 s.46 (certificate of shares);
//   Companies (Share Capital and Debentures) Rules 2014, Rule 5;
//   Companies (Management & Administration) Rules 2014 — stamp;
//   Stamp Act 1899 / Indian Stamp Act — ad valorem stamp duty;
//   SEBI (LODR) not applicable to private companies
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const shareCertificate: TemplateModule = {
  meta: {
    id: "share-certificate",
    name: "Share Certificate",
    categoryId: "companies",
    category: "Companies & MCA",
    country: ["IN"],
    formats: ["pdf", "docx", "xlsx"],
    description:
      "Formal share certificate in the form prescribed under the Companies Act 2013 (Schedule I Table F / Rule 5). Issued to a member on allotment or transfer. Includes all statutory fields, duplicate certificate provisions, and a transmission/split record table.",
    aliases: [
      "share certificate",
      "share certificate format",
      "equity share certificate",
      "share certificate India",
      "preference share certificate",
      "company share certificate",
    ],
    pages: 2,
    minutes: 4,
    status: "live",
  },

  groups: [
    {
      title: "Company details",
      fields: [
        { id: "sc_co_name", label: "Company legal name", type: "text", required: true, placeholder: "Acme Technologies Private Limited" },
        { id: "sc_cin", label: "CIN", type: "text", required: true, placeholder: "U72900KA2024PTC123456" },
        { id: "sc_co_addr", label: "Registered office", type: "textarea", rows: 2, required: true },
        { id: "sc_incorp_date", label: "Date of incorporation", type: "date", required: true },
        { id: "sc_authorised_capital", label: "Authorised share capital (₹)", type: "number", required: true, placeholder: "5000000" },
        { id: "sc_paid_up_capital", label: "Paid-up share capital (₹)", type: "number", required: true, placeholder: "1000000" },
      ],
    },
    {
      title: "Certificate details",
      fields: [
        { id: "sc_cert_no", label: "Certificate number", type: "text", required: true, placeholder: "001" },
        { id: "sc_folio_no", label: "Folio / Register of Members entry no.", type: "text", required: true, placeholder: "F-001" },
        { id: "sc_issue_date", label: "Date of issue of certificate", type: "date", required: true },
        {
          id: "sc_share_class",
          label: "Class of shares",
          type: "select",
          required: true,
          default: "equity",
          options: [
            { value: "equity", label: "Equity Shares" },
            { value: "ccps", label: "Compulsorily Convertible Preference Shares (CCPS)" },
            { value: "preference", label: "Preference Shares (Non-convertible)" },
          ],
        },
        { id: "sc_face_value", label: "Face value per share (₹)", type: "number", required: true, default: "10", placeholder: "10" },
        { id: "sc_num_shares", label: "Number of shares this certificate represents", type: "number", required: true, placeholder: "1000" },
        { id: "sc_from_folio", label: "Share numbers — From (distinctive number start)", type: "number", required: true, placeholder: "1" },
        { id: "sc_to_folio", label: "Share numbers — To (distinctive number end)", type: "number", required: true, placeholder: "1000" },
        {
          id: "sc_allotment_basis",
          label: "Basis of holding (allotment / transfer)",
          type: "select",
          required: true,
          default: "allotment",
          options: [
            { value: "allotment", label: "Original allotment" },
            { value: "transfer", label: "Transfer from previous holder" },
            { value: "transmission", label: "Transmission (death / succession)" },
            { value: "split", label: "Sub-division / split of shares" },
            { value: "bonus", label: "Bonus shares" },
            { value: "esop", label: "ESOP exercise" },
          ],
        },
        { id: "sc_allotment_date", label: "Date of allotment / transfer / board resolution", type: "date", required: true },
      ],
    },
    {
      title: "Member details",
      fields: [
        { id: "sc_member_name", label: "Member full name (first holder)", type: "text", required: true, placeholder: "Priya Sharma" },
        { id: "sc_member_addr", label: "Member address", type: "textarea", rows: 2, required: true },
        { id: "sc_member_pan", label: "Member PAN", type: "text", required: true, placeholder: "AABCS1234C" },
        { id: "sc_joint_holder_1", label: "Joint holder 1 name (if any)", type: "text", placeholder: "Rahul Sharma" },
        { id: "sc_joint_holder_2", label: "Joint holder 2 name (if any)", type: "text" },
        {
          id: "sc_holding_mode",
          label: "Mode of holding (for joint holders)",
          type: "select",
          default: "jointly",
          options: [
            { value: "single", label: "Single holder" },
            { value: "jointly", label: "Jointly (all holders to sign)" },
            { value: "either_or_survivor", label: "Either or Survivor" },
          ],
        },
        {
          id: "sc_nominee",
          label: "Nominee name (if nomination filed)",
          type: "text",
          placeholder: "Sunita Sharma",
        },
      ],
    },
    {
      title: "Signatories",
      fields: [
        { id: "sc_dir1_name", label: "Director 1 name (signatory)", type: "text", required: true, placeholder: "Priya Sharma" },
        { id: "sc_dir1_din", label: "Director 1 DIN", type: "text", placeholder: "01234567" },
        { id: "sc_dir2_name", label: "Director 2 name (signatory)", type: "text", required: true, placeholder: "Rahul Verma" },
        { id: "sc_dir2_din", label: "Director 2 DIN", type: "text", placeholder: "07654321" },
        { id: "sc_cs_name", label: "Company Secretary name (if applicable)", type: "text", placeholder: "Anita Iyer (ACS 12345)" },
      ],
    },
  ],

  render(e) {
    const co = e.sc_co_name || "[Company]";
    const cin = e.sc_cin || "[CIN]";
    const numShares = Number(e.sc_num_shares || 0);
    const faceValue = Number(e.sc_face_value || 10);
    const nominalValue = numShares * faceValue;

    const classLabel = {
      equity: "Equity Shares",
      ccps: "Compulsorily Convertible Preference Shares",
      preference: "Preference Shares",
    }[e.sc_share_class || "equity"] || "Equity Shares";

    const holdersLine = [e.sc_member_name, e.sc_joint_holder_1, e.sc_joint_holder_2]
      .filter(Boolean)
      .join(" and ");

    const blocks: DocSection[] = [];

    // ── THE CERTIFICATE ────────────────────────────────────────

    blocks.push({ kind: "title", text: co.toUpperCase() });
    blocks.push({
      kind: "subtitle",
      text:
        "CIN: " + cin + " | Incorporated on [INCORP_DATE]\nRegistered Office: " + (e.sc_co_addr || "[Address]"),
    });

    blocks.push({
      kind: "subtitle",
      text: "Authorised Capital: ₹" + Number(e.sc_authorised_capital || 0).toLocaleString("en-IN") + "  |  Paid-up Capital: ₹" + Number(e.sc_paid_up_capital || 0).toLocaleString("en-IN"),
    });

    blocks.push({ kind: "divider" });
    blocks.push({ kind: "title", text: "SHARE CERTIFICATE" });

    blocks.push({
      kind: "kv",
      pairs: [
        { label: "Certificate No.", value: e.sc_cert_no || "[Cert No.]" },
        { label: "Folio No.", value: e.sc_folio_no || "[Folio No.]" },
        { label: "Class of shares", value: classLabel },
        { label: "Face value per share", value: "₹" + faceValue },
        { label: "Number of shares", value: numShares.toLocaleString("en-IN") },
        { label: "Distinctive numbers", value: (e.sc_from_folio || "[From]") + " to " + (e.sc_to_folio || "[To]") },
        { label: "Nominal value", value: "₹" + nominalValue.toLocaleString("en-IN") },
      ],
    });

    blocks.push({
      kind: "para",
      text:
        "THIS IS TO CERTIFY that " +
        holdersLine +
        (e.sc_member_addr ? " of " + e.sc_member_addr : "") +
        (e.sc_member_pan ? " (PAN: " + e.sc_member_pan + ")" : "") +
        " is/are the Registered Holder(s) of " +
        numShares.toLocaleString("en-IN") +
        " fully paid-up " +
        classLabel +
        " of face value ₹" +
        faceValue +
        " each, bearing distinctive numbers " +
        (e.sc_from_folio || "[From]") +
        " to " +
        (e.sc_to_folio || "[To]") +
        " (both inclusive), in " +
        co +
        ", subject to the Memorandum and Articles of Association of the Company.",
    });

    if (e.sc_joint_holder_1 || e.sc_joint_holder_2) {
      blocks.push({
        kind: "para",
        text:
          "The shares are held " +
          (e.sc_holding_mode === "either_or_survivor"
            ? "by Either or Survivor of the joint holders."
            : "jointly, and transfers / redemptions shall require signatures of all joint holders."),
      });
    }

    if (e.sc_nominee) {
      blocks.push({
        kind: "para",
        text: "Nominee on record: " + e.sc_nominee + ".",
      });
    }

    blocks.push({
      kind: "para",
      text:
        "Date of allotment / transfer: [ALLOTMENT_DATE]. Date of issue of this certificate: [ISSUE_DATE].\n\nThis certificate replaces / is issued in lieu of no previous certificate (original issue).",
    });

    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "para",
      text:
        "IN WITNESS WHEREOF, the Company has caused this certificate to be signed by its authorised Directors / Officers on [ISSUE_DATE].",
    });

    blocks.push({
      kind: "signatures",
      parties: [
        {
          role: "Director\n" + (e.sc_dir1_name || "[Director 1]") + (e.sc_dir1_din ? "\nDIN: " + e.sc_dir1_din : ""),
          name: "[Signature]",
        },
        {
          role: "Director\n" + (e.sc_dir2_name || "[Director 2]") + (e.sc_dir2_din ? "\nDIN: " + e.sc_dir2_din : ""),
          name: "[Signature]",
        },
        ...(e.sc_cs_name
          ? [{ role: "Company Secretary\n" + e.sc_cs_name, name: "[Seal]" }]
          : [{ role: "Common Seal / Stamp", name: "[Company Seal]" }]),
      ],
    });

    blocks.push({ kind: "divider" });

    // ── TRANSMISSION TABLE ────────────────────────────────────

    blocks.push({ kind: "subtitle", text: "Record of Duplicate Certificates / Transmission / Sub-division" });

    blocks.push({
      kind: "table",
      headers: [
        "Date",
        "Nature (Duplicate / Transmission / Split)",
        "Number of Shares",
        "New Certificate No(s).",
        "Authorised by (Director / CS)",
      ],
      rows: [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
      ],
    });

    blocks.push({
      kind: "para",
      text:
        "Note: A duplicate certificate may be issued under s.46(2) of the Companies Act 2013 on payment of applicable fee and on such terms as the Board may think fit, if the original is proved to have been lost or destroyed, or is defaced, mutilated, or torn and is surrendered to the Company.",
    });

    return blocks;
  },
};
