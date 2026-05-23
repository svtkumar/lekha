// ============================================================
// GST TAX INVOICE
// Drop into: /lib/templates/gst-invoice.ts
// Use case: GST-compliant tax invoice for supply of goods or
//           services by a registered taxpayer. Covers B2B,
//           B2C large, IGST (inter-state), CGST+SGST
//           (intra-state), HSN/SAC codes, reverse charge,
//           and e-invoicing IRN/QR requirements.
// Statute refs: CGST Act 2017 ss.15,31,33; CGST Rules 2017
//   rr.46-55 (invoice rules); IGST Act 2017 s.5;
//   Notification 13/2020-CT (e-invoicing threshold);
//   GST Council circulars on HSN code mandates
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const gstInvoice: TemplateModule = {
  meta: {
    id: "gst-invoice",
    name: "GST Tax Invoice",
    categoryId: "compliance",
    category: "Tax & Compliance",
    country: ["IN"],
    formats: ["pdf", "docx", "xlsx"],
    description:
      "GST-compliant tax invoice for supply of goods or services. Covers B2B and B2C transactions, IGST (inter-state) and CGST+SGST (intra-state), HSN/SAC codes, reverse charge mechanism, and e-invoicing IRN/QR code fields. Mandatory fields as per CGST Rules 2017 Rule 46.",
    aliases: [
      "gst invoice",
      "tax invoice",
      "gst tax invoice",
      "gstin invoice",
      "b2b invoice gst",
      "gst bill",
      "service invoice gst",
      "goods invoice gst",
      "igst invoice",
      "cgst sgst invoice",
    ],
    pages: 2,
    minutes: 5,
    status: "live",
  },

  groups: [
    {
      title: "Supplier (seller) details",
      fields: [
        { id: "inv_sup_name", label: "Supplier / seller legal name", type: "text", required: true, placeholder: "Acme Technologies Private Limited" },
        { id: "inv_sup_addr", label: "Supplier address", type: "textarea", rows: 2, required: true },
        { id: "inv_sup_gstin", label: "Supplier GSTIN", type: "text", required: true, placeholder: "29AABCA1234C1ZX" },
        { id: "inv_sup_state", label: "Supplier state / UT", type: "select", required: true, options: [
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
        { id: "inv_sup_email", label: "Supplier email", type: "email", placeholder: "billing@acme.com" },
        { id: "inv_sup_phone", label: "Supplier phone", type: "tel", placeholder: "+91 98765 43210" },
      ],
    },
    {
      title: "Invoice details",
      fields: [
        { id: "inv_number", label: "Invoice number", type: "text", required: true, placeholder: "INV-2024-0042" },
        { id: "inv_date", label: "Invoice date", type: "date", required: true },
        { id: "inv_due_date", label: "Due date / payment terms", type: "text", placeholder: "30 days / Due by DD-MM-YYYY" },
        {
          id: "inv_supply_type",
          label: "Type of supply",
          type: "select",
          required: true,
          default: "services",
          options: [
            { value: "services", label: "Services" },
            { value: "goods", label: "Goods" },
            { value: "mixed", label: "Mixed (goods + services)" },
          ],
        },
        {
          id: "inv_transaction_type",
          label: "Transaction type",
          type: "select",
          required: true,
          default: "b2b",
          options: [
            { value: "b2b", label: "B2B — Registered buyer (GSTIN available)" },
            { value: "b2c_large", label: "B2C Large — Unregistered, value ≥ ₹2.5 lakh inter-state" },
            { value: "b2c_small", label: "B2C Small — Unregistered, other" },
            { value: "export", label: "Export (with payment / LUT)" },
            { value: "sez", label: "SEZ supply" },
          ],
        },
        {
          id: "inv_reverse_charge",
          label: "Is GST payable under reverse charge mechanism?",
          type: "radio",
          default: "no",
          options: [
            { value: "yes", label: "Yes — Reverse charge (recipient pays GST)" },
            { value: "no", label: "No — Forward charge (supplier pays GST)" },
          ],
        },
        {
          id: "inv_e_invoicing",
          label: "E-invoicing applicable? (Turnover ≥ ₹5 crore)",
          type: "radio",
          default: "no",
          options: [
            { value: "yes", label: "Yes — Include IRN and QR code fields" },
            { value: "no", label: "No — Standard invoice" },
          ],
        },
        { id: "inv_irn", label: "IRN (Invoice Reference Number)", type: "text", placeholder: "a1b2c3d4...64-character hash" },
        { id: "inv_ack_no", label: "Acknowledgement number (IRP)", type: "text", placeholder: "232412345678901" },
        { id: "inv_ack_date", label: "Acknowledgement date", type: "date" },
      ],
    },
    {
      title: "Buyer / recipient details",
      fields: [
        { id: "inv_buy_name", label: "Buyer / recipient name", type: "text", required: true, placeholder: "Beta Solutions Private Limited / Rahul Verma" },
        { id: "inv_buy_addr", label: "Buyer address", type: "textarea", rows: 2, required: true },
        { id: "inv_buy_gstin", label: "Buyer GSTIN (for B2B)", type: "text", placeholder: "27AABCB9876D1ZY" },
        { id: "inv_buy_state", label: "Buyer state / UT (for tax type determination)", type: "select", required: true, options: [
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
        { id: "inv_buy_pos", label: "Place of supply (if different from buyer state)", type: "select", options: [
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
        { id: "inv_buy_email", label: "Buyer email", type: "email" },
      ],
    },
    {
      title: "Line items",
      fields: [
        { id: "inv_items_raw", label: "Line items (one per line: Description | HSN/SAC | Qty | Unit | Rate ₹ | Discount ₹)", type: "textarea", rows: 6, required: true,
          placeholder: "Cloud Hosting Services | 998315 | 1 | Month | 50000 | 0\nSetup & Onboarding | 998311 | 1 | Service | 10000 | 0\nSupport Retainer | 998313 | 1 | Month | 15000 | 5000" },
        {
          id: "inv_gst_rate",
          label: "Primary GST rate applicable",
          type: "select",
          required: true,
          default: "18",
          options: [
            { value: "0", label: "0% — Exempt / Nil rated" },
            { value: "5", label: "5%" },
            { value: "12", label: "12%" },
            { value: "18", label: "18% (most services)" },
            { value: "28", label: "28%" },
          ],
        },
        { id: "inv_notes", label: "Notes / payment instructions", type: "textarea", rows: 2, placeholder: "Bank: HDFC Bank | A/C: 1234567890 | IFSC: HDFC0001234 | UPI: billing@acme" },
      ],
    },
  ],

  render(e) {
    const sup = e.inv_sup_name || "[Supplier]";
    const buy = e.inv_buy_name || "[Buyer]";
    const supState = e.inv_sup_state;
    const buyState = e.inv_buy_state || e.inv_buy_pos;
    const isInterState = supState && buyState && supState !== buyState;
    const gstRate = Number(e.inv_gst_rate || 18);

    // Parse line items
    const lineItems = [];
    if (e.inv_items_raw) {
      const lines = e.inv_items_raw.trim().split("\n");
      for (const line of lines) {
        const parts = line.split("|").map((p) => p.trim());
        if (parts.length >= 5) {
          const desc = parts[0] || "";
          const hsn = parts[1] || "";
          const qty = Number(parts[2]) || 0;
          const unit = parts[3] || "Nos";
          const rate = Number(parts[4]) || 0;
          const discount = Number(parts[5]) || 0;
          const taxable = qty * rate - discount;
          lineItems.push({ desc, hsn, qty, unit, rate, discount, taxable });
        }
      }
    }

    const subtotal = lineItems.reduce((s, i) => s + i.taxable, 0);
    const gstAmount = (subtotal * gstRate) / 100;
    const total = subtotal + gstAmount;

    const blocks: DocSection[] = [];

    // Header
    blocks.push({ kind: "subtitle", text: sup.toUpperCase() + "\n" + (e.inv_sup_addr || "[Address]") + "\nGSTIN: " + (e.inv_sup_gstin || "[GSTIN]") + (e.inv_sup_email ? " | " + e.inv_sup_email : "") + (e.inv_sup_phone ? " | " + e.inv_sup_phone : "") });

    blocks.push({ kind: "title", text: "TAX INVOICE" });

    // E-invoicing fields
    if (e.inv_e_invoicing === "yes") {
      const eiPairs = [
        { label: "IRN", value: e.inv_irn || "[IRN — 64 character hash from IRP]" },
        { label: "Ack No.", value: e.inv_ack_no || "[Acknowledgement Number]" },
        { label: "Ack Date", value: "[ACK_DATE]" },
      ];
      blocks.push({ kind: "kv", pairs: eiPairs });
      blocks.push({ kind: "para", text: "[QR CODE — generated by IRP, affix here]" });
    }

    // Invoice meta
    blocks.push({
      kind: "kv",
      pairs: [
        { label: "Invoice No.", value: e.inv_number || "[INV-XXXX]" },
        { label: "Invoice Date", value: "[INVOICE_DATE]" },
        { label: "Due Date / Terms", value: e.inv_due_date || "30 days" },
        { label: "Supply Type", value: { services: "Services", goods: "Goods", mixed: "Goods & Services" }[e.inv_supply_type || "services"] || "Services" },
        { label: "Transaction Type", value: { b2b: "B2B (Registered)", b2c_large: "B2C Large", b2c_small: "B2C Small", export: "Export", sez: "SEZ" }[e.inv_transaction_type || "b2b"] || "B2B" },
        { label: "Tax Type", value: isInterState ? "IGST" : "CGST + SGST/UTGST" },
        { label: "Place of Supply", value: e.inv_buy_pos || buyState || "[Buyer State]" },
        { label: "Reverse Charge", value: e.inv_reverse_charge === "yes" ? "Yes" : "No" },
      ],
    });

    // Buyer details
    blocks.push({ kind: "subtitle", text: "Bill To / Ship To" });
    blocks.push({
      kind: "kv",
      pairs: [
        { label: "Name", value: buy },
        { label: "Address", value: e.inv_buy_addr || "[Buyer Address]" },
        { label: "GSTIN", value: e.inv_buy_gstin || (e.inv_transaction_type === "b2c_small" || e.inv_transaction_type === "b2c_large" ? "Unregistered" : "[GSTIN]") },
        { label: "State", value: buyState || "[State]" },
      ].filter(p => p.value),
    });

    // Line items table
    const tableHeaders = isInterState
      ? ["#", "Description of Goods / Services", "HSN / SAC", "Qty", "Unit", "Rate (₹)", "Discount (₹)", "Taxable Value (₹)", `IGST ${gstRate}% (₹)`, "Total (₹)"]
      : ["#", "Description of Goods / Services", "HSN / SAC", "Qty", "Unit", "Rate (₹)", "Discount (₹)", "Taxable Value (₹)", `CGST ${gstRate / 2}% (₹)`, `SGST ${gstRate / 2}% (₹)`, "Total (₹)"];

    const tableRows = lineItems.map((item, idx) => {
      const igst = (item.taxable * gstRate) / 100;
      const cgst = igst / 2;
      const sgst = igst / 2;
      const lineTotal = item.taxable + igst;

      return isInterState
        ? [
            String(idx + 1),
            item.desc,
            item.hsn,
            String(item.qty),
            item.unit,
            "₹" + item.rate.toLocaleString("en-IN"),
            item.discount > 0 ? "₹" + item.discount.toLocaleString("en-IN") : "-",
            "₹" + item.taxable.toLocaleString("en-IN"),
            "₹" + igst.toLocaleString("en-IN"),
            "₹" + lineTotal.toLocaleString("en-IN"),
          ]
        : [
            String(idx + 1),
            item.desc,
            item.hsn,
            String(item.qty),
            item.unit,
            "₹" + item.rate.toLocaleString("en-IN"),
            item.discount > 0 ? "₹" + item.discount.toLocaleString("en-IN") : "-",
            "₹" + item.taxable.toLocaleString("en-IN"),
            "₹" + cgst.toLocaleString("en-IN"),
            "₹" + sgst.toLocaleString("en-IN"),
            "₹" + lineTotal.toLocaleString("en-IN"),
          ];
    });

    if (lineItems.length === 0) {
      tableRows.push(isInterState
        ? ["1", "[Item description]", "[HSN/SAC]", "1", "Nos", "₹0", "-", "₹0", "₹0", "₹0"]
        : ["1", "[Item description]", "[HSN/SAC]", "1", "Nos", "₹0", "-", "₹0", "₹0", "₹0", "₹0"]);
    }

    blocks.push({ kind: "table", headers: tableHeaders, rows: tableRows });

    // Totals
    const totalIGST = (subtotal * gstRate) / 100;
    const totalCGST = totalIGST / 2;
    const totalSGST = totalIGST / 2;

    const totalPairs = [
      { label: "Taxable Amount", value: "₹" + subtotal.toLocaleString("en-IN") },
    ];
    if (isInterState) {
      totalPairs.push({ label: `IGST @ ${gstRate}%`, value: "₹" + totalIGST.toLocaleString("en-IN") });
    } else {
      totalPairs.push({ label: `CGST @ ${gstRate / 2}%`, value: "₹" + totalCGST.toLocaleString("en-IN") });
      totalPairs.push({ label: `SGST/UTGST @ ${gstRate / 2}%`, value: "₹" + totalSGST.toLocaleString("en-IN") });
    }
    totalPairs.push({ label: "Total GST", value: "₹" + gstAmount.toLocaleString("en-IN") });
    totalPairs.push({ label: "GRAND TOTAL", value: "₹" + total.toLocaleString("en-IN", { maximumFractionDigits: 2 }) });
    totalPairs.push({ label: "Amount in Words", value: "[TOTAL_IN_WORDS] Rupees Only" });

    blocks.push({ kind: "kv", pairs: totalPairs });

    if (e.inv_notes) {
      blocks.push({ kind: "subtitle", text: "Payment Instructions" });
      blocks.push({ kind: "para", text: e.inv_notes });
    }

    blocks.push({
      kind: "para",
      text:
        "Declaration: We declare that this invoice shows the actual price of the goods / services described and that all particulars are true and correct.\n\n" +
        (e.inv_reverse_charge === "yes" ? "⚠ Tax is payable on reverse charge basis by the recipient.\n\n" : "") +
        "This is a computer-generated invoice.",
    });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "Authorised Signatory for\n" + sup + "\nGSTIN: " + (e.inv_sup_gstin || "[GSTIN]"), name: "[Signature & Seal]" },
      ],
    });

    return blocks;
  },
};
