// ============================================================
// TDS CERTIFICATE — FORM 16 WORKING / SALARY TDS SUMMARY
// Drop into: /lib/templates/tds-certificate-form16.ts
// Use case: Employer-generated Form 16 working sheet and
//           TDS computation summary for salary income.
//           Covers Part A (TDS deducted and deposited) and
//           Part B (computation of income and tax).
//           Mandatorily issued by employer by 15 June for
//           each financial year.
// Statute refs: Income Tax Act 1961 ss.192,203,206AA,234B/C;
//   Income Tax Rules 1962 rr.26A,31,31A; Form 16 (Annexure
//   to Rule 31); Finance Act amendments — new tax regime
//   (s.115BAC); Standard deduction (s.16); HRA (s.10(13A));
//   LTA (s.10(5)); Professional tax (s.16(iii)); Chapter
//   VI-A deductions (80C,80D,80CCD(1B),80G etc.)
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const tdsCertificateForm16: TemplateModule = {
  meta: {
    id: "tds-certificate-form16",
    name: "Form 16 — Salary TDS Certificate Working",
    categoryId: "compliance",
    category: "Tax & Compliance",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Form 16 working sheet — TDS certificate for salary income. Covers Part A (TDS deducted and deposited quarter-wise, TRACES-generated data) and Part B (detailed income computation: gross salary, exemptions, deductions, taxable income, tax under old and new regime). Mandatory issuance by employer by 15 June each year.",
    aliases: [
      "form 16",
      "tds certificate",
      "salary tds certificate",
      "form 16 salary",
      "income tax form 16",
      "tds salary working",
      "tax deduction certificate",
      "income certificate employer",
      "form 16 part a part b",
    ],
    pages: 4,
    minutes: 8,
    status: "live",
  },

  groups: [
    {
      title: "Employer (deductor) details",
      fields: [
        { id: "f16_emp_name", label: "Employer / company name", type: "text", required: true, placeholder: "Acme Technologies Private Limited" },
        { id: "f16_emp_addr", label: "Employer address", type: "textarea", rows: 2, required: true },
        { id: "f16_emp_tan", label: "Employer TAN", type: "text", required: true, placeholder: "MUMB12345A" },
        { id: "f16_emp_pan", label: "Employer PAN", type: "text", required: true, placeholder: "AABCA1234B" },
        { id: "f16_emp_cin", label: "CIN (if company)", type: "text", placeholder: "U72900MH2020PTC345678" },
      ],
    },
    {
      title: "Employee details",
      fields: [
        { id: "f16_ee_name", label: "Employee full name", type: "text", required: true, placeholder: "Rahul Verma" },
        { id: "f16_ee_pan", label: "Employee PAN", type: "text", required: true, placeholder: "AABCV5678D" },
        { id: "f16_ee_designation", label: "Employee designation", type: "text", placeholder: "Senior Software Engineer" },
        { id: "f16_ee_empid", label: "Employee ID", type: "text", placeholder: "EMP-1234" },
        { id: "f16_ee_doj", label: "Date of joining (if mid-year)", type: "date" },
        { id: "f16_ee_dol", label: "Date of leaving (if mid-year)", type: "date" },
        { id: "f16_fy", label: "Financial year", type: "text", required: true, placeholder: "2024-25" },
        { id: "f16_ay", label: "Assessment year", type: "text", required: true, placeholder: "2025-26" },
      ],
    },
    {
      title: "Salary components (₹ per annum)",
      fields: [
        { id: "f16_basic", label: "Basic salary", type: "number", required: true, placeholder: "720000" },
        { id: "f16_hra_received", label: "HRA received", type: "number", placeholder: "288000" },
        { id: "f16_hra_exempt", label: "HRA exempt (s.10(13A))", type: "number", placeholder: "180000" },
        { id: "f16_lta_received", label: "LTA received", type: "number", placeholder: "25000" },
        { id: "f16_lta_exempt", label: "LTA exempt (s.10(5))", type: "number", placeholder: "25000" },
        { id: "f16_special_allowance", label: "Special allowance", type: "number", placeholder: "180000" },
        { id: "f16_other_allowances", label: "Other taxable allowances", type: "number", placeholder: "0" },
        { id: "f16_bonus", label: "Bonus / incentive (taxable)", type: "number", placeholder: "60000" },
        { id: "f16_perquisites", label: "Perquisites / non-cash benefits (s.17(2))", type: "number", placeholder: "0" },
        { id: "f16_gross_salary", label: "Gross salary (pre-deduction, from payroll)", type: "number", required: true, placeholder: "1320000" },
      ],
    },
    {
      title: "Tax regime and deductions",
      fields: [
        {
          id: "f16_regime",
          label: "Tax regime opted by employee",
          type: "select",
          required: true,
          default: "new",
          options: [
            { value: "new", label: "New tax regime — s.115BAC (default from FY 2023-24)" },
            { value: "old", label: "Old tax regime (employee opted out of new regime)" },
          ],
        },
        { id: "f16_std_deduction", label: "Standard deduction (s.16(ia)) — auto ₹75,000 (FY 24-25)", type: "number", placeholder: "75000" },
        { id: "f16_prof_tax", label: "Professional tax paid (s.16(iii))", type: "number", placeholder: "2400" },
        { id: "f16_80c", label: "80C (PF, ELSS, LIC, PPF, home loan principal, tuition)", type: "number", placeholder: "150000" },
        { id: "f16_80d", label: "80D (medical insurance premium)", type: "number", placeholder: "25000" },
        { id: "f16_80ccd_1b", label: "80CCD(1B) (NPS additional contribution)", type: "number", placeholder: "50000" },
        { id: "f16_80g", label: "80G (donations to eligible funds)", type: "number", placeholder: "0" },
        { id: "f16_other_deductions", label: "Other Chapter VI-A deductions (describe)", type: "text", placeholder: "80E: ₹0; 80EEA: ₹0" },
        { id: "f16_other_deductions_amount", label: "Other Chapter VI-A deductions total (₹)", type: "number", placeholder: "0" },
        { id: "f16_home_loan_interest", label: "Sec 24(b) — Home loan interest (old regime only)", type: "number", placeholder: "200000" },
      ],
    },
    {
      title: "TDS Part A — Deducted and deposited",
      fields: [
        { id: "f16_tds_q1", label: "TDS Q1 (Apr–Jun) deducted (₹)", type: "number", placeholder: "22500" },
        { id: "f16_tds_q2", label: "TDS Q2 (Jul–Sep) deducted (₹)", type: "number", placeholder: "22500" },
        { id: "f16_tds_q3", label: "TDS Q3 (Oct–Dec) deducted (₹)", type: "number", placeholder: "22500" },
        { id: "f16_tds_q4", label: "TDS Q4 (Jan–Mar) deducted (₹)", type: "number", placeholder: "22500" },
        { id: "f16_cert_no", label: "Certificate serial / unique no. (from TRACES)", type: "text", placeholder: "ABC1234567" },
        { id: "f16_issue_date", label: "Date of Form 16 issue", type: "date", required: true },
        { id: "f16_signatory", label: "Authorised signatory name & designation", type: "text", required: true, placeholder: "Priya Sharma, HR Manager" },
      ],
    },
  ],

  render(e) {
    const emp = e.f16_emp_name || "[Employer]";
    const ee = e.f16_ee_name || "[Employee]";
    const regime = e.f16_regime || "new";
    const fy = e.f16_fy || "[FY]";
    const ay = e.f16_ay || "[AY]";

    const gross = Number(e.f16_gross_salary || 0);
    const hraRec = Number(e.f16_hra_received || 0);
    const hraExempt = Number(e.f16_hra_exempt || 0);
    const ltaRec = Number(e.f16_lta_received || 0);
    const ltaExempt = Number(e.f16_lta_exempt || 0);
    const stdDed = Number(e.f16_std_deduction || 75000);
    const profTax = Number(e.f16_prof_tax || 0);
    const perqs = Number(e.f16_perquisites || 0);

    const incomeFromSalary = Math.max(0, gross - hraExempt - ltaExempt);
    const incomeAfterStd = Math.max(0, incomeFromSalary - stdDed - profTax);

    const c80c = Math.min(Number(e.f16_80c || 0), 150000);
    const c80d = Number(e.f16_80d || 0);
    const c80ccd = Math.min(Number(e.f16_80ccd_1b || 0), 50000);
    const c80g = Number(e.f16_80g || 0);
    const cOther = Number(e.f16_other_deductions_amount || 0);
    const homeLoanInt = Math.min(Number(e.f16_home_loan_interest || 0), 200000);

    const totalChVIA = regime === "old" ? (c80c + c80d + c80ccd + c80g + cOther) : 0;
    const sec24b = regime === "old" ? homeLoanInt : 0;
    const taxableIncome = Math.max(0, incomeAfterStd - totalChVIA - sec24b);

    const tdsQ = [
      Number(e.f16_tds_q1 || 0),
      Number(e.f16_tds_q2 || 0),
      Number(e.f16_tds_q3 || 0),
      Number(e.f16_tds_q4 || 0),
    ];
    const totalTDS = tdsQ.reduce((s, t) => s + t, 0);

    const blocks: DocSection[] = [];

    // PART A
    blocks.push({ kind: "title", text: "FORM 16\nTDS CERTIFICATE FOR SALARY INCOME" });
    blocks.push({ kind: "subtitle", text: "PART A — TDS DEDUCTED AND DEPOSITED\n(As per TRACES / Form 26AS)" });

    blocks.push({
      kind: "kv",
      pairs: [
        { label: "Certificate No.", value: e.f16_cert_no || "[TRACES Certificate No.]" },
        { label: "Financial Year", value: fy },
        { label: "Assessment Year", value: ay },
        { label: "Date of Issue", value: "[ISSUE_DATE]" },
        { label: "Employer Name", value: emp },
        { label: "Employer Address", value: e.f16_emp_addr || "[Address]" },
        { label: "Employer TAN", value: e.f16_emp_tan || "[TAN]" },
        { label: "Employer PAN", value: e.f16_emp_pan || "[PAN]" },
        { label: "Employee Name", value: ee },
        { label: "Employee PAN", value: e.f16_ee_pan || "[PAN]" },
        { label: "Designation", value: e.f16_ee_designation || "[Designation]" },
        { label: "Employee ID", value: e.f16_ee_empid || "[EMP-ID]" },
        { label: "Period of Employment (FY)", value: (e.f16_ee_doj ? "[DOJ] to " : "1 April to ") + (e.f16_ee_dol ? "[DOL]" : "31 March") },
      ],
    });

    blocks.push({ kind: "subtitle", text: "Quarter-wise TDS Deducted and Deposited" });
    blocks.push({
      kind: "table",
      headers: ["Quarter", "Period", "TDS Deducted (₹)", "TDS Deposited (₹)", "BSR Code / Challan"],
      rows: [
        ["Q1", "Apr–Jun " + (fy.split("-")[0] || ""), "₹" + tdsQ[0].toLocaleString("en-IN"), "₹" + tdsQ[0].toLocaleString("en-IN"), "[From TRACES]"],
        ["Q2", "Jul–Sep " + (fy.split("-")[0] || ""), "₹" + tdsQ[1].toLocaleString("en-IN"), "₹" + tdsQ[1].toLocaleString("en-IN"), "[From TRACES]"],
        ["Q3", "Oct–Dec " + (fy.split("-")[0] || ""), "₹" + tdsQ[2].toLocaleString("en-IN"), "₹" + tdsQ[2].toLocaleString("en-IN"), "[From TRACES]"],
        ["Q4", "Jan–Mar " + ("20" + (fy.split("-")[1] || "")), "₹" + tdsQ[3].toLocaleString("en-IN"), "₹" + tdsQ[3].toLocaleString("en-IN"), "[From TRACES]"],
        ["Total", "", "₹" + totalTDS.toLocaleString("en-IN"), "₹" + totalTDS.toLocaleString("en-IN"), ""],
      ],
    });

    blocks.push({
      kind: "para",
      text: "Note: Part A of Form 16 must be downloaded from TRACES (www.tdscpc.gov.in) and bears a digital signature. The above is the working/working reference for Part A. The employer must provide the TRACES-generated Part A to the employee.",
    });

    blocks.push({ kind: "divider" });

    // PART B
    blocks.push({ kind: "subtitle", text: "PART B — COMPUTATION OF INCOME AND TAX\n(Annexure to Form 16)" });
    blocks.push({
      kind: "para",
      text: "Tax regime opted: " + (regime === "new" ? "New Tax Regime — s.115BAC (default)" : "Old Tax Regime (employee exercised option under s.115BAC(6))"),
    });

    // Salary computation table
    blocks.push({ kind: "subtitle", text: "A. Income from Salary" });
    const salaryRows = [
      ["Gross Salary (per payroll)", "₹" + gross.toLocaleString("en-IN")],
      ["(-) HRA received", hraRec > 0 ? "₹" + hraRec.toLocaleString("en-IN") : "Nil"],
      ["(-) HRA exempt u/s 10(13A)", hraExempt > 0 ? "(₹" + hraExempt.toLocaleString("en-IN") + ")" : "Nil"],
      ["(-) LTA received", ltaRec > 0 ? "₹" + ltaRec.toLocaleString("en-IN") : "Nil"],
      ["(-) LTA exempt u/s 10(5)", ltaExempt > 0 ? "(₹" + ltaExempt.toLocaleString("en-IN") + ")" : "Nil"],
      ...(perqs > 0 ? [["(+) Perquisites u/s 17(2)", "₹" + perqs.toLocaleString("en-IN")]] : []),
      ["Income chargeable under 'Salaries'", "₹" + incomeFromSalary.toLocaleString("en-IN")],
      ["(-) Standard deduction u/s 16(ia)", "(₹" + stdDed.toLocaleString("en-IN") + ")"],
      ["(-) Professional tax u/s 16(iii)", profTax > 0 ? "(₹" + profTax.toLocaleString("en-IN") + ")" : "Nil"],
      ["Net income from salary", "₹" + incomeAfterStd.toLocaleString("en-IN")],
    ];
    blocks.push({ kind: "table", headers: ["Particulars", "Amount"], rows: salaryRows });

    // Deductions (old regime only)
    if (regime === "old") {
      blocks.push({ kind: "subtitle", text: "B. Deductions under Chapter VI-A and Section 24(b)" });
      const dedRows = [
        ["80C (PF, ELSS, LIC, PPF, home loan principal, etc.)", c80c > 0 ? "(₹" + c80c.toLocaleString("en-IN") + ")" : "Nil"],
        ["80D (medical insurance)", c80d > 0 ? "(₹" + c80d.toLocaleString("en-IN") + ")" : "Nil"],
        ["80CCD(1B) — NPS additional (max ₹50,000)", c80ccd > 0 ? "(₹" + c80ccd.toLocaleString("en-IN") + ")" : "Nil"],
        ["80G (donations)", c80g > 0 ? "(₹" + c80g.toLocaleString("en-IN") + ")" : "Nil"],
        ...(cOther > 0 ? [["Other Chapter VI-A — " + (e.f16_other_deductions || "other"), "(₹" + cOther.toLocaleString("en-IN") + ")"]] : []),
        ["Section 24(b) — Home loan interest (max ₹2L for self-occ.)", sec24b > 0 ? "(₹" + sec24b.toLocaleString("en-IN") + ")" : "Nil"],
        ["Total deductions", "(₹" + (totalChVIA + sec24b).toLocaleString("en-IN") + ")"],
      ];
      blocks.push({ kind: "table", headers: ["Deduction", "Amount"], rows: dedRows });
    } else {
      blocks.push({
        kind: "para",
        text: "B. Chapter VI-A deductions: Not applicable under New Tax Regime (most deductions not available except employer NPS contribution u/s 80CCD(2)).",
      });
    }

    // Taxable income and tax
    blocks.push({ kind: "subtitle", text: "C. Tax Computation" });
    const taxRows = [
      ["Net Taxable Income", "₹" + taxableIncome.toLocaleString("en-IN")],
      ["Income Tax (as per applicable slab)", "₹[TAX_ON_INCOME]"],
      ["Rebate u/s 87A", regime === "new" ? "(Nil if taxable income > ₹7L)" : "(Nil if taxable income > ₹5L)"],
      ["Surcharge (if applicable)", "₹[SURCHARGE]"],
      ["Health & Education Cess @ 4%", "₹[CESS]"],
      ["Total Tax Payable", "₹[TOTAL_TAX]"],
      ["(-) TDS deducted by employer (Part A)", "(₹" + totalTDS.toLocaleString("en-IN") + ")"],
      ["Balance tax payable / (refundable)", "₹[BALANCE — file ITR to pay/claim]"],
    ];
    blocks.push({ kind: "table", headers: ["Particulars", "Amount"], rows: taxRows });

    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "para",
      text:
        "CERTIFICATION: I, " + (e.f16_signatory || "[Name, Designation]") + ", authorised signatory of " + emp + " (TAN: " + (e.f16_emp_tan || "[TAN]") + "), certify that the information furnished above is correct and complete to the best of my knowledge. The tax deducted at source has been / will be paid to the credit of the Central Government in accordance with s.192 read with Rule 26A of the Income Tax Rules 1962.\n\n" +
        "Important Notes:\n" +
        "1. This document is a working reference. The official Form 16 (Part A) must be downloaded from TRACES and bears a valid digital signature.\n" +
        "2. Employees must cross-check Form 26AS / Annual Information Statement (AIS) with this working before filing ITR.\n" +
        "3. If PAN is not furnished, TDS is deductible at 20% under s.206AA.\n" +
        "4. This Form 16 covers only salary income. Other income (interest, capital gains, etc.) must be declared separately in the ITR.",
    });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "Authorised Signatory\n" + (e.f16_signatory || "[Name & Designation]") + "\n" + emp + "\nTAN: " + (e.f16_emp_tan || "[TAN]"), name: "[Signature & Seal]" },
      ],
    });

    return blocks;
  },
};
