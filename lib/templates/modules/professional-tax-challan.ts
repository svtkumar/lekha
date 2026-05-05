// ============================================================
// PROFESSIONAL TAX — EMPLOYER RETURN / CHALLAN WORKINGS
// Drop into: /lib/templates/professional-tax-challan.ts
// Use case: Monthly professional tax (PT) deduction working
//           and challan summary for an employer. Covers all
//           major states with different PT slabs, Form III
//           / equivalent annual return reference, and
//           employee-wise working sheet.
// Statute refs: State PT Acts — Maharashtra PT Act 1975;
//   Karnataka PT Act 1976; West Bengal PT Act 1979;
//   Andhra Pradesh PT Act 1987; Tamil Nadu PT Act 1992;
//   Telangana PT Act 1987; Gujarat PT Act 1976;
//   Madhya Pradesh Vritti Kar Adhiniyam 1995;
//   Odisha PT Act 2000; Kerala PT Act 1996;
//   PT is a state subject (Entry 60, List II, Sch VII);
//   Art. 276 Constitution caps PT at ₹2,500 per annum.
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const professionalTaxChallan: TemplateModule = {
  meta: {
    id: "professional-tax-challan",
    name: "Professional Tax — Employer Monthly Working",
    categoryId: "compliance",
    category: "Tax & Compliance",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Monthly professional tax deduction working sheet and challan summary for employers. Covers all major PT states — Maharashtra, Karnataka, West Bengal, AP/Telangana, Tamil Nadu, Gujarat, MP, Odisha, Kerala — with applicable salary slabs, deduction amounts, and payment due dates. Includes employee-wise register and Form III / annual return reference.",
    aliases: [
      "professional tax",
      "professional tax challan",
      "pt challan",
      "professional tax return",
      "professional tax employer",
      "pt deduction working",
      "profession tax",
      "professional tax form iii",
      "pt monthly return",
    ],
    pages: 3,
    minutes: 6,
    status: "live",
  },

  groups: [
    {
      title: "Employer details",
      fields: [
        { id: "pt_emp_name", label: "Employer / company name", type: "text", required: true, placeholder: "Acme Technologies Private Limited" },
        { id: "pt_emp_addr", label: "Employer address (registered for PT)", type: "textarea", rows: 2, required: true },
        { id: "pt_enroll_no", label: "PT Enrolment Certificate Number (PTEC)", type: "text", placeholder: "27970123456789" },
        { id: "pt_regn_no", label: "PT Registration Certificate Number (PTRC)", type: "text", required: true, placeholder: "27970123456789P" },
        { id: "pt_state", label: "State of PT registration", type: "select", required: true, options: [
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
        { id: "pt_signatory", label: "Authorised signatory name & designation", type: "text", required: true, placeholder: "Priya Sharma, HR Manager" },
      ],
    },
    {
      title: "Period and payment",
      fields: [
        {
          id: "pt_month",
          label: "Month of deduction",
          type: "select",
          required: true,
          default: "april",
          options: [
            { value: "april", label: "April" },
            { value: "may", label: "May" },
            { value: "june", label: "June" },
            { value: "july", label: "July" },
            { value: "august", label: "August" },
            { value: "september", label: "September" },
            { value: "october", label: "October" },
            { value: "november", label: "November" },
            { value: "december", label: "December" },
            { value: "january", label: "January" },
            { value: "february", label: "February" },
            { value: "march", label: "March" },
          ],
        },
        { id: "pt_year", label: "Financial year", type: "text", required: true, placeholder: "2024-25" },
        { id: "pt_payment_date", label: "Date of PT payment / challan", type: "date", required: true },
        { id: "pt_challan_no", label: "Challan / CIN number", type: "text", placeholder: "CIN generated after bank payment" },
        { id: "pt_bank_name", label: "Bank name and branch", type: "text", placeholder: "State Bank of India, Fort Branch, Mumbai" },
      ],
    },
    {
      title: "Employee-wise deduction details",
      fields: [
        {
          id: "pt_employees_raw",
          label: "Employee deduction entries (one per line: Employee Name | Gross Monthly Salary ₹ | PT Deducted ₹)",
          type: "textarea",
          rows: 8,
          required: true,
          placeholder: "Rahul Verma | 85000 | 200\nPriya Sharma | 55000 | 200\nAmit Kumar | 18000 | 150\nSunita Patel | 10000 | 100",
        },
        {
          id: "pt_include_slab_table",
          label: "Include applicable PT slab table in document?",
          type: "radio",
          default: "yes",
          options: [
            { value: "yes", label: "Yes — show applicable state PT slabs" },
            { value: "no", label: "No — deduction working only" },
          ],
        },
      ],
    },
  ],

  render(e) {
    const emp = e.pt_emp_name || "[Employer]";
    const stateCode = e.pt_state || "";
    const monthLabel = { april: "April", may: "May", june: "June", july: "July", august: "August", september: "September", october: "October", november: "November", december: "December", january: "January", february: "February", march: "March" }[e.pt_month || "april"] || "April";

    // State PT slab tables
    const statePTSlabs = {
      MH: { name: "Maharashtra", slabs: [
        { range: "Up to ₹7,500", monthly: "Nil" },
        { range: "₹7,501 – ₹10,000", monthly: "₹175 (Feb: ₹200)" },
        { range: "Above ₹10,000", monthly: "₹200 (Feb: ₹300 for Feb-Mar annual)" },
      ]},
      KA: { name: "Karnataka", slabs: [
        { range: "Up to ₹15,000", monthly: "Nil" },
        { range: "₹15,001 – ₹35,000", monthly: "₹150" },
        { range: "₹35,001 – ₹75,000", monthly: "₹200" },
        { range: "Above ₹75,000", monthly: "₹200" },
      ]},
      WB: { name: "West Bengal", slabs: [
        { range: "Up to ₹10,000", monthly: "Nil" },
        { range: "₹10,001 – ₹15,000", monthly: "₹110" },
        { range: "₹15,001 – ₹25,000", monthly: "₹130" },
        { range: "₹25,001 – ₹40,000", monthly: "₹150" },
        { range: "Above ₹40,000", monthly: "₹200" },
      ]},
      AP: { name: "Andhra Pradesh", slabs: [
        { range: "Up to ₹15,000", monthly: "Nil" },
        { range: "₹15,001 – ₹20,000", monthly: "₹150" },
        { range: "Above ₹20,000", monthly: "₹200" },
      ]},
      TG: { name: "Telangana", slabs: [
        { range: "Up to ₹15,000", monthly: "Nil" },
        { range: "₹15,001 – ₹20,000", monthly: "₹150" },
        { range: "Above ₹20,000", monthly: "₹200" },
      ]},
      TN: { name: "Tamil Nadu", slabs: [
        { range: "Up to ₹21,000", monthly: "Nil" },
        { range: "₹21,001 – ₹30,000", monthly: "₹135" },
        { range: "₹30,001 – ₹45,000", monthly: "₹315" },
        { range: "₹45,001 – ₹60,000", monthly: "₹690" },
        { range: "₹60,001 – ₹75,000", monthly: "₹1,025" },
        { range: "Above ₹75,000", monthly: "₹1,250" },
      ]},
      GJ: { name: "Gujarat", slabs: [
        { range: "Up to ₹5,999", monthly: "Nil" },
        { range: "₹6,000 – ₹8,999", monthly: "₹80" },
        { range: "₹9,000 – ₹11,999", monthly: "₹150" },
        { range: "₹12,000 and above", monthly: "₹200" },
      ]},
      MP: { name: "Madhya Pradesh", slabs: [
        { range: "Up to ₹18,750", monthly: "Nil" },
        { range: "₹18,751 – ₹25,000", monthly: "₹125" },
        { range: "₹25,001 – ₹33,333", monthly: "₹167" },
        { range: "Above ₹33,333", monthly: "₹208" },
      ]},
      OD: { name: "Odisha", slabs: [
        { range: "Up to ₹13,304", monthly: "Nil" },
        { range: "₹13,305 – ₹25,000", monthly: "₹125" },
        { range: "Above ₹25,000", monthly: "₹200" },
      ]},
      KL: { name: "Kerala", slabs: [
        { range: "Up to ₹11,999", monthly: "Nil" },
        { range: "₹12,000 – ₹17,999", monthly: "₹120" },
        { range: "₹18,000 – ₹29,999", monthly: "₹180" },
        { range: "₹30,000 – ₹44,999", monthly: "₹300" },
        { range: "₹45,000 – ₹59,999", monthly: "₹450" },
        { range: "₹60,000 – ₹74,999", monthly: "₹600" },
        { range: "₹75,000 – ₹99,999", monthly: "₹750" },
        { range: "₹1,00,000 and above", monthly: "₹1,250" },
      ]},
    };

    const stateData = statePTSlabs[stateCode as keyof typeof statePTSlabs];

    // Parse employees
    const employees: { name: string; salary: number; pt: number }[] = [];
    let totalDeducted = 0;
    if (e.pt_employees_raw) {
      const lines = e.pt_employees_raw.trim().split("\n");
      for (const line of lines) {
        const parts = line.split("|").map((p) => p.trim());
        if (parts.length >= 3) {
          const name = parts[0] || "";
          const salary = Number(parts[1]) || 0;
          const pt = Number(parts[2]) || 0;
          employees.push({ name, salary, pt });
          totalDeducted += pt;
        }
      }
    }

    const blocks: DocSection[] = [];

    blocks.push({ kind: "title", text: "PROFESSIONAL TAX — EMPLOYER MONTHLY WORKING SHEET" });

    blocks.push({
      kind: "kv",
      pairs: [
        { label: "Employer Name", value: emp },
        { label: "PTRC Number", value: e.pt_regn_no || "[PTRC]" },
        { label: "PTEC Number", value: e.pt_enroll_no || "[PTEC]" },
        { label: "Employer Address", value: e.pt_emp_addr || "[Address]" },
        { label: "State", value: stateData ? stateData.name : (stateCode || "[State]") },
        { label: "Month / Year", value: monthLabel + " " + (e.pt_year || "[FY]") },
        { label: "Challan Date", value: "[PT_PAYMENT_DATE]" },
        { label: "Challan / CIN No.", value: e.pt_challan_no || "[To be filled after payment]" },
        { label: "Bank", value: e.pt_bank_name || "[Bank Name & Branch]" },
        { label: "Authorised Signatory", value: e.pt_signatory || "[Signatory]" },
      ],
    });

    // Employee working table
    blocks.push({ kind: "subtitle", text: "Employee-wise PT Deduction Register — " + monthLabel + " " + (e.pt_year || "") });

    const empTableHeaders = ["#", "Employee Name", "Gross Monthly Salary (₹)", "PT Deducted (₹)"];
    const empTableRows = employees.length > 0
      ? employees.map((emp, idx) => [
          String(idx + 1),
          emp.name,
          "₹" + emp.salary.toLocaleString("en-IN"),
          "₹" + emp.pt.toLocaleString("en-IN"),
        ])
      : [["1", "[Employee Name]", "[₹ Salary]", "[₹ PT]"]];

    // Add total row
    empTableRows.push(["", "TOTAL", "", "₹" + totalDeducted.toLocaleString("en-IN")]);

    blocks.push({ kind: "table", headers: empTableHeaders, rows: empTableRows });

    // Challan summary
    blocks.push({ kind: "subtitle", text: "Challan Summary" });
    blocks.push({
      kind: "kv",
      pairs: [
        { label: "Total employees covered", value: String(employees.length || "[N]") },
        { label: "Total PT amount deducted", value: "₹" + totalDeducted.toLocaleString("en-IN") },
        { label: "Employer PT (PTEC)", value: "₹2,500 per annum (payable separately, if applicable)" },
        { label: "Total PT payable this month", value: "₹" + totalDeducted.toLocaleString("en-IN") },
        { label: "Payment due date", value: "As per " + (stateData ? stateData.name : "[State]") + " PT Act" },
      ],
    });

    // Optional slab table
    if (e.pt_include_slab_table === "yes" && stateData) {
      blocks.push({ kind: "subtitle", text: stateData.name + " Professional Tax — Salary Slabs (Reference)" });
      const slabHeaders = ["Gross Monthly Salary Range", "Monthly PT Deduction"];
      const slabRows = stateData.slabs.map((s) => [s.range, s.monthly]);
      blocks.push({ kind: "table", headers: slabHeaders, rows: slabRows });
      blocks.push({
        kind: "para",
        text: "Note: The above slab rates are indicative and subject to revision by the state government. Always verify with the latest notification from the " + stateData.name + " Commercial Taxes Department / Professional Tax portal.",
      });
    } else if (e.pt_include_slab_table === "yes") {
      blocks.push({
        kind: "para",
        text: "PT Slab Reference: Professional tax slabs are state-specific and are set by each state government. The maximum PT payable is ₹2,500 per annum per employee as per Article 276 of the Constitution of India. Please refer to your state's professional tax schedule for applicable rates.",
      });
    }

    blocks.push({
      kind: "para",
      text:
        "Declaration: I hereby declare that the above particulars of professional tax deducted from employees' salaries and payable to the " + (stateData ? stateData.name : "[State]") + " government for the month of " + monthLabel + " " + (e.pt_year || "[FY]") + " are true and correct to the best of my knowledge and belief.\n\n" +
        "This return/working sheet should be retained by the employer for a minimum of 5 years for audit purposes.",
    });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "Authorised Signatory\n" + (e.pt_signatory || "[Name & Designation]") + "\n" + emp, name: "[Signature & Seal]" },
      ],
    });

    return blocks;
  },
};
