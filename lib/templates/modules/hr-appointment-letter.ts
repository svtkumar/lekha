// ============================================================
// APPOINTMENT LETTER (FORMAL OFFER + TERMS OF EMPLOYMENT)
// Drop into: /lib/templates/hr-appointment-letter.ts
// Use case: Formal appointment / offer letter to a new employee
//           confirming their position, CTC, joining date,
//           probation, and key employment terms.
// Statute refs: Indian Contract Act 1872; Payment of Wages
//   Act 1936; Minimum Wages Act 1948 / Code on Wages 2019;
//   Employees' PF & MP Act 1952; Employees' State Insurance
//   Act 1948; Payment of Gratuity Act 1972; Shops & Estab.
//   Acts (state-wise); IT Act 1961 (TDS on salary);
//   POSH Act 2013 (disclosure obligation); DPDP Act 2023
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const hrAppointmentLetter: TemplateModule = {
  meta: {
    id: "hr-appointment-letter",
    name: "Appointment Letter",
    categoryId: "hr",
    category: "HR & Employment",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Formal appointment letter / offer letter issued to a new employee. Includes CTC breakup, joining date, probation terms, notice period, confidentiality, IP assignment, and key conditions of employment. Suitable for full-time and fixed-term employment.",
    aliases: [
      "appointment letter",
      "offer letter",
      "joining letter",
      "employment offer",
      "HR appointment letter",
      "job offer letter India",
    ],
    pages: 5,
    minutes: 8,
    status: "live",
  },

  groups: [
    {
      title: "Company details",
      fields: [
        { id: "al_co_name", label: "Company legal name", type: "text", required: true, placeholder: "Acme Technologies Private Limited" },
        { id: "al_co_addr", label: "Company address", type: "textarea", rows: 2, required: true },
        { id: "al_co_gstin", label: "GSTIN (optional)", type: "text" },
        { id: "al_hr_name", label: "HR / issuing authority name & designation", type: "text", required: true, placeholder: "Sneha Patel, VP — People" },
        { id: "al_letter_date", label: "Date of appointment letter", type: "date", required: true },
      ],
    },
    {
      title: "Employee details",
      fields: [
        { id: "al_emp_name", label: "Employee full name", type: "text", required: true, placeholder: "Rahul Verma" },
        { id: "al_emp_addr", label: "Employee address", type: "textarea", rows: 2, required: true },
        { id: "al_designation", label: "Designation / role title", type: "text", required: true, placeholder: "Senior Software Engineer" },
        { id: "al_department", label: "Department", type: "text", required: true, placeholder: "Engineering" },
        { id: "al_reporting_to", label: "Reports to", type: "text", placeholder: "Priya Sharma, CTO" },
        { id: "al_joining_date", label: "Date of joining", type: "date", required: true },
        { id: "al_work_location", label: "Place of work / office location", type: "text", required: true, placeholder: "Bengaluru (Koramangala)" },
        {
          id: "al_employment_type",
          label: "Employment type",
          type: "select",
          required: true,
          default: "full_time_permanent",
          options: [
            { value: "full_time_permanent", label: "Full-time Permanent" },
            { value: "full_time_fixed", label: "Full-time Fixed Term" },
            { value: "part_time", label: "Part-time" },
          ],
        },
        { id: "al_contract_end_date", label: "Contract end date (for fixed term)", type: "date" },
      ],
    },
    {
      title: "Compensation (CTC)",
      fields: [
        { id: "al_ctc_annual", label: "Annual CTC (₹)", type: "number", required: true, placeholder: "1200000" },
        { id: "al_basic_pct", label: "Basic salary as % of CTC", type: "number", default: "40", placeholder: "40" },
        { id: "al_hra_pct", label: "HRA as % of basic", type: "number", default: "50", placeholder: "50" },
        { id: "al_variable_pct", label: "Variable pay (% of CTC)", type: "number", default: "0", placeholder: "10" },
        { id: "al_pf_applicable", label: "PF applicable?", type: "radio", required: true, default: "yes", options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No (CTC > ₹15,000 basic — opted out / waived)" }] },
        { id: "al_esic_applicable", label: "ESIC applicable?", type: "radio", required: true, default: "no", options: [{ value: "yes", label: "Yes (gross < ₹21,000/month)" }, { value: "no", label: "No (gross ≥ ₹21,000/month)" }] },
        { id: "al_gratuity_note", label: "Include gratuity in CTC?", type: "radio", default: "yes", options: [{ value: "yes", label: "Yes — show as CTC component" }, { value: "no", label: "No — not shown in CTC" }] },
      ],
    },
    {
      title: "Employment terms",
      fields: [
        { id: "al_probation_months", label: "Probation period (months)", type: "select", default: "6", options: [{ value: "0", label: "No probation" }, { value: "3", label: "3 months" }, { value: "6", label: "6 months" }, { value: "12", label: "12 months" }] },
        { id: "al_notice_period_probation", label: "Notice period during probation", type: "select", default: "1_week", options: [{ value: "immediate", label: "Immediate" }, { value: "1_week", label: "1 week" }, { value: "15_days", label: "15 days" }, { value: "1_month", label: "1 month" }] },
        { id: "al_notice_period_confirmed", label: "Notice period after confirmation", type: "select", default: "2_months", options: [{ value: "1_month", label: "1 month" }, { value: "2_months", label: "2 months" }, { value: "3_months", label: "3 months" }] },
        { id: "al_working_hours", label: "Working hours", type: "select", default: "9_5", options: [{ value: "9_5", label: "9:00 AM – 6:00 PM (Monday–Friday)" }, { value: "9_6", label: "9:30 AM – 6:30 PM (Monday–Friday)" }, { value: "flexible", label: "Flexible hours (outcome-based)" }, { value: "shifts", label: "Shift-based (as rostered)" }] },
        { id: "al_leave_annual", label: "Annual earned / privilege leave (days)", type: "number", default: "18", placeholder: "18" },
        { id: "al_leave_sick", label: "Sick leave (days per year)", type: "number", default: "12", placeholder: "12" },
        { id: "al_wfh", label: "Work from home / remote policy", type: "select", default: "hybrid", options: [{ value: "office_only", label: "Office only" }, { value: "hybrid", label: "Hybrid (as per team norms)" }, { value: "remote_first", label: "Remote-first" }] },
        { id: "al_non_compete_months", label: "Post-employment non-compete period (months, 0 = none)", type: "number", default: "0", placeholder: "12" },
      ],
    },
  ],

  render(e) {
    const co = e.al_co_name || "[Company]";
    const emp = e.al_emp_name || "[Employee]";
    const ctc = Number(e.al_ctc_annual || 0);
    const basicPct = Number(e.al_basic_pct || 40) / 100;
    const hraPct = Number(e.al_hra_pct || 50) / 100;
    const variablePct = Number(e.al_variable_pct || 0) / 100;
    const gratuityRate = 4.81 / 100;

    const monthlyBasic = Math.round((ctc * basicPct) / 12);
    const monthlyHra = Math.round(monthlyBasic * hraPct);
    const monthlySpecialAllowance = Math.round(((ctc * (1 - variablePct) - ctc * gratuityRate - (e.al_pf_applicable === "yes" ? Math.min(monthlyBasic, 15000) * 12 * 0.12 : 0)) / 12) - monthlyBasic - monthlyHra);
    const monthlyVariable = Math.round((ctc * variablePct) / 12);
    const pfEmployer = e.al_pf_applicable === "yes" ? Math.round(Math.min(monthlyBasic, 15000) * 0.12) : 0;
    const gratuityPerMonth = Math.round((ctc * gratuityRate) / 12);
    const monthlyGross = monthlyBasic + monthlyHra + Math.max(monthlySpecialAllowance, 0);
    const pfEmployee = pfEmployer;
    const esicEmployee = e.al_esic_applicable === "yes" ? Math.round(monthlyGross * 0.0075) : 0;

    const noticeProbationLabel = { immediate: "immediate", "1_week": "one week", "15_days": "fifteen days", "1_month": "one month" }[e.al_notice_period_probation || "1_week"] || "one week";
    const noticeConfirmedLabel = { "1_month": "one month", "2_months": "two months", "3_months": "three months" }[e.al_notice_period_confirmed || "2_months"] || "two months";

    const blocks: DocSection[] = [];

    // Letterhead
    blocks.push({ kind: "subtitle", text: co.toUpperCase() + "\n" + (e.al_co_addr || "[Company Address]") });

    blocks.push({
      kind: "kv",
      pairs: [
        { label: "Date", value: "[LETTER_DATE]" },
        { label: "Employee ID", value: "[EMP-ID] (to be assigned on joining)" },
      ],
    });

    blocks.push({ kind: "para", text: "To,\n" + emp + "\n" + (e.al_emp_addr || "[Employee Address]") });

    blocks.push({ kind: "title", text: "APPOINTMENT LETTER" });

    blocks.push({
      kind: "para",
      text:
        "Dear " + emp.split(" ")[0] + ",\n\nWe are pleased to appoint you as " + (e.al_designation || "[Designation]") + " in the " + (e.al_department || "[Department]") + " department of " + co + ". This letter sets out the terms and conditions of your employment.",
    });

    const clauses: DocSection[] = [
      {
        kind: "clause",
        number: 1,
        title: "Position and Joining",
        text:
          "You are appointed as " + (e.al_designation || "[Designation]") + ", reporting to " + (e.al_reporting_to || "[Manager]") + ", at our " + (e.al_work_location || "[Location]") + " office. Your employment commences on [JOINING_DATE]. " +
          (e.al_employment_type === "full_time_fixed" ? "This is a fixed-term appointment expiring on [CONTRACT_END_DATE], unless renewed or converted to a permanent role." : "This is a full-time, permanent employment."),
      },
      {
        kind: "clause",
        number: 2,
        title: "Probation",
        text:
          e.al_probation_months === "0"
            ? "This appointment is confirmed from the date of joining. There is no probation period."
            : "You will be on probation for a period of " + e.al_probation_months + " months from the date of joining. During the probation period, your employment may be terminated by either party on " + noticeProbationLabel + "'s notice. On satisfactory completion of probation, you will be confirmed in writing.",
      },
      {
        kind: "clause",
        number: 3,
        title: "Compensation",
        text:
          "Your annual Cost to Company (CTC) is ₹" + ctc.toLocaleString("en-IN") + " (Rupees [CTC_IN_WORDS] only) as per the structure detailed in Annexure A. Your CTC includes all statutory contributions payable by the Company. Applicable TDS will be deducted from your salary each month. The Company will review compensation annually.",
      },
      {
        kind: "clause",
        number: 4,
        title: "Working Hours and Leave",
        text:
          "Working hours are " + ({ "9_5": "9:00 AM to 6:00 PM, Monday to Friday", "9_6": "9:30 AM to 6:30 PM, Monday to Friday", flexible: "flexible / outcome-based, as mutually agreed", shifts: "as per rostered shifts" }[e.al_working_hours || "9_5"] || "standard business hours") + ".\n\n" +
          "You are entitled to " + (e.al_leave_annual || 18) + " days of earned / privilege leave, " + (e.al_leave_sick || 12) + " days of sick leave, and public holidays as notified by the Company each year. Leave entitlements accrue from the date of confirmation, unless otherwise stated in the Leave Policy.",
      },
      {
        kind: "clause",
        number: 5,
        title: "Notice Period",
        text:
          (e.al_probation_months !== "0" ? "During probation: " + noticeProbationLabel + "'s written notice by either party.\n\nAfter confirmation: " : "Either party may terminate employment by giving ") +
          noticeConfirmedLabel + "'s written notice or payment in lieu of notice. The Company reserves the right to waive notice and make payment in lieu.",
      },
      {
        kind: "clause",
        number: 6,
        title: "Confidentiality and Intellectual Property",
        text:
          "During and after employment, you shall not disclose any Confidential Information of " + co + " to any third party. All intellectual property, inventions, software, reports, or other work product created by you in the course of your employment shall vest exclusively in " + co + ". You will be required to sign the Company's standard Non-Disclosure and IP Assignment Agreement on joining.",
      },
      {
        kind: "clause",
        number: 7,
        title: "Code of Conduct and Policies",
        text:
          "You are required to comply with the Company's policies, including the Employee Handbook, Code of Conduct, IT and Data Security Policy, POSH Policy (Sexual Harassment of Women at Workplace — Prevention, Prohibition and Redressal Act, 2013), and the DPDP Act 2023 compliance guidelines. The Company reserves the right to amend policies with reasonable notice.",
      },
      {
        kind: "clause",
        number: 8,
        title: "Statutory Benefits",
        text:
          "You will be covered under: " +
          (e.al_pf_applicable === "yes" ? "Employees' Provident Fund (EPF) at 12% of basic salary (employer matching contribution); " : "") +
          (e.al_esic_applicable === "yes" ? "Employees' State Insurance (ESI) at applicable rates; " : "") +
          "Payment of Gratuity Act 1972 (eligible after 5 years of continuous service); Maternity Benefit Act 1961 (as applicable); and any other applicable statutory benefits.",
      },
    ];

    if (Number(e.al_non_compete_months || 0) > 0) {
      clauses.push({
        kind: "clause",
        number: 9,
        title: "Non-Solicitation",
        text:
          "For a period of " + e.al_non_compete_months + " months following termination of employment, you shall not solicit or attempt to solicit any employee, customer, or client of " + co + " with whom you had material dealings during your employment. This clause is intended to protect legitimate business interests and is subject to applicable law.",
      });
    }

    clauses.forEach((c) => blocks.push(c));

    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "para",
      text:
        "Please sign and return the duplicate copy of this letter as your acceptance of these terms. Your joining is subject to submission of all educational certificates, identity documents, previous employment relieving letter, and successful background verification.\n\nWe look forward to welcoming you to the " + co + " family.",
    });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "For " + co + "\n" + (e.al_hr_name || "[HR Authority]"), name: "[Signature & Seal]" },
        { role: "ACCEPTED BY\n" + emp, name: "[Signature & Date]" },
      ],
    });

    // Annexure A — CTC
    blocks.push({ kind: "page_break" });
    blocks.push({ kind: "subtitle", text: "ANNEXURE A — COMPENSATION STRUCTURE" });
    blocks.push({ kind: "para", text: "Employee: " + emp + " | Designation: " + (e.al_designation || "[Designation]") + " | Annual CTC: ₹" + ctc.toLocaleString("en-IN") });

    blocks.push({
      kind: "table",
      headers: ["Component", "Monthly (₹)", "Annual (₹)"],
      rows: [
        ["Basic Salary (" + (e.al_basic_pct || 40) + "% of CTC)", monthlyBasic.toLocaleString("en-IN"), (monthlyBasic * 12).toLocaleString("en-IN")],
        ["HRA (" + (e.al_hra_pct || 50) + "% of Basic)", monthlyHra.toLocaleString("en-IN"), (monthlyHra * 12).toLocaleString("en-IN")],
        ["Special Allowance", Math.max(monthlySpecialAllowance, 0).toLocaleString("en-IN"), Math.max(monthlySpecialAllowance * 12, 0).toLocaleString("en-IN")],
        ...(monthlyVariable > 0 ? [["Variable Pay (" + (e.al_variable_pct || 0) + "% of CTC, performance-linked)", monthlyVariable.toLocaleString("en-IN"), (monthlyVariable * 12).toLocaleString("en-IN")]] : []),
        ["Gross Salary", (monthlyGross + (monthlyVariable > 0 ? monthlyVariable : 0)).toLocaleString("en-IN"), ((monthlyGross + (monthlyVariable > 0 ? monthlyVariable : 0)) * 12).toLocaleString("en-IN")],
        ...(e.al_pf_applicable === "yes" ? [["Employer PF Contribution (12% of Basic, max ₹1,800/month)", pfEmployer.toLocaleString("en-IN"), (pfEmployer * 12).toLocaleString("en-IN")]] : []),
        ...(e.al_gratuity_note === "yes" ? [["Gratuity (4.81% of annual Basic)", gratuityPerMonth.toLocaleString("en-IN"), (gratuityPerMonth * 12).toLocaleString("en-IN")]] : []),
        ["TOTAL CTC", Math.round(ctc / 12).toLocaleString("en-IN"), ctc.toLocaleString("en-IN")],
        ...(e.al_pf_applicable === "yes" ? [["Less: Employee PF (12% of Basic)", "(" + pfEmployee.toLocaleString("en-IN") + ")", "(" + (pfEmployee * 12).toLocaleString("en-IN") + ")"]] : []),
        ...(e.al_esic_applicable === "yes" ? [["Less: Employee ESIC (0.75% of Gross)", "(" + esicEmployee.toLocaleString("en-IN") + ")", "(" + (esicEmployee * 12).toLocaleString("en-IN") + ")"]] : []),
        ["Less: TDS (as per IT Act, to be computed based on regime)", "[As applicable]", "[As applicable]"],
        ["NET IN-HAND (approx., before TDS)", (monthlyGross - pfEmployee - esicEmployee).toLocaleString("en-IN"), ((monthlyGross - pfEmployee - esicEmployee) * 12).toLocaleString("en-IN")],
      ],
    });

    return blocks;
  },
};
