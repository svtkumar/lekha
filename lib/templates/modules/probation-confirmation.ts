import type { TemplateModule, DocSection } from "../types";

export const probationConfirmation: TemplateModule = {
  meta: {
    id: "probation-confirmation",
    name: "Probation Confirmation",
    categoryId: "hr",
    category: "HR & Workplace",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Confirmation of probation completion letter. Formally confirms permanent employment status, revised benefits, and salary revision (if any) on successful completion of the probationary period.",
    aliases: ["regularisation", "confirmation letter", "probation completion", "permanent employment"],
    pages: 1,
    minutes: 5,
    status: "live",
  },
  groups: [
    {
      title: "Company details",
      fields: [
        { id: "pc_company_name", label: "Company name", type: "text", required: true, placeholder: "Acme Technologies Pvt Ltd" },
        { id: "pc_company_addr", label: "Company address", type: "textarea", rows: 2 },
        { id: "pc_hr_name", label: "HR / Signatory name", type: "text", placeholder: "Sunita Reddy" },
        { id: "pc_hr_designation", label: "HR designation", type: "text", default: "Head — Human Resources" },
        { id: "pc_letter_date", label: "Letter date", type: "date", required: true },
      ],
    },
    {
      title: "Employee details",
      fields: [
        { id: "pc_emp_name", label: "Employee name", type: "text", required: true, placeholder: "Rohan Kapoor" },
        { id: "pc_emp_id", label: "Employee ID", type: "text", placeholder: "EMP-2025-220" },
        { id: "pc_designation", label: "Designation", type: "text", required: true, placeholder: "Software Engineer" },
        { id: "pc_department", label: "Department / Team", type: "text", placeholder: "Engineering" },
        { id: "pc_doj", label: "Date of joining", type: "date", required: true },
        { id: "pc_probation_end_date", label: "Probation end / confirmation date", type: "date", required: true },
      ],
    },
    {
      title: "Confirmation terms",
      fields: [
        { id: "pc_probation_months", label: "Probation period (months)", type: "number", default: "6", placeholder: "6" },
        { id: "pc_salary_revision", label: "Salary revision on confirmation?", type: "select", default: "no", options: [
          { value: "yes", label: "Yes — revised CTC" },
          { value: "no", label: "No change in salary" },
        ]},
        { id: "pc_old_ctc", label: "Current CTC per annum (₹)", type: "number", placeholder: "600000" },
        { id: "pc_new_ctc", label: "Revised CTC on confirmation (₹)", type: "number", placeholder: "700000" },
        { id: "pc_new_designation", label: "Revised designation on confirmation (if changed)", type: "text" },
        { id: "pc_performance_note", label: "Performance acknowledgement note (optional)", type: "textarea", rows: 2, placeholder: "Your performance during the probation period has been commendable and you have demonstrated excellent technical skills…" },
        { id: "pc_benefits_note", label: "Benefits effective on confirmation (optional)", type: "text", placeholder: "Group Medical Insurance, PF contributions, and Annual Increment cycle" },
      ],
    },
  ],
  render(e): DocSection[] {
    const blocks: DocSection[] = [];
    const emp = e.pc_emp_name || "[Employee Name]";
    const company = e.pc_company_name || "[Company Name]";
    const letterDate = e.pc_letter_date ? new Date(e.pc_letter_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Date]";
    const doj = e.pc_doj ? new Date(e.pc_doj).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Date of Joining]";
    const confirmDate = e.pc_probation_end_date ? new Date(e.pc_probation_end_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Confirmation Date]";
    const probationMonths = e.pc_probation_months || "6";
    const designation = e.pc_new_designation || e.pc_designation || "[Designation]";

    blocks.push({ kind: "title", text: company.toUpperCase() });
    if (e.pc_company_addr) blocks.push({ kind: "subtitle", text: e.pc_company_addr });
    blocks.push({ kind: "divider" });
    blocks.push({ kind: "subtitle", text: "PROBATION CONFIRMATION LETTER" });
    blocks.push({ kind: "spacer" });

    blocks.push({ kind: "kv", pairs: [
      { label: "Date", value: letterDate },
      { label: "To", value: emp },
      ...(e.pc_emp_id ? [{ label: "Employee ID", value: e.pc_emp_id }] : []),
      { label: "Designation", value: designation },
      ...(e.pc_department ? [{ label: "Department", value: e.pc_department }] : []),
      { label: "Date of Joining", value: doj },
    ]});

    blocks.push({ kind: "divider" });

    let bodyText = `Dear ${emp},\n\nWe are pleased to confirm your appointment with ${company} as a permanent employee with effect from ${confirmDate}, following the successful completion of your probation period of ${probationMonths} months commencing from ${doj}.`;

    if (e.pc_performance_note) {
      bodyText += `\n\n${e.pc_performance_note}`;
    } else {
      bodyText += `\n\nYour performance and conduct during the probationary period have been found satisfactory, and we are happy to confirm your continued employment with the company on the terms and conditions set out below.`;
    }

    blocks.push({ kind: "para", text: bodyText });

    const confirmPairs: { label: string; value: string }[] = [
      { label: "Employment Status", value: "Confirmed / Permanent Employee" },
      { label: "Effective Date of Confirmation", value: confirmDate },
      { label: "Designation", value: designation },
    ];
    if (e.pc_department) confirmPairs.push({ label: "Department", value: e.pc_department });
    if (e.pc_salary_revision === "yes" && e.pc_new_ctc) {
      if (e.pc_old_ctc) confirmPairs.push({ label: "Current CTC (per annum)", value: `₹${Number(e.pc_old_ctc).toLocaleString("en-IN")}` });
      confirmPairs.push({ label: "Revised CTC (per annum)", value: `₹${Number(e.pc_new_ctc).toLocaleString("en-IN")}` });
    } else if (e.pc_old_ctc) {
      confirmPairs.push({ label: "CTC (per annum)", value: `₹${Number(e.pc_old_ctc).toLocaleString("en-IN")} (unchanged)` });
    }

    blocks.push({ kind: "kv", pairs: confirmPairs });

    if (e.pc_benefits_note) {
      blocks.push({ kind: "subtitle", text: "BENEFITS EFFECTIVE ON CONFIRMATION" });
      blocks.push({ kind: "para", text: e.pc_benefits_note });
    }

    blocks.push({ kind: "para", text: "All other terms and conditions of your employment as set out in your Appointment Letter remain unchanged unless expressly modified herein. Your continued employment remains subject to the company's policies and code of conduct." });

    blocks.push({ kind: "para", text: "We look forward to your continued contributions and wish you a successful career with us. Please acknowledge receipt and acceptance of this letter by signing below." });

    blocks.push({ kind: "signatures", parties: [
      { role: e.pc_hr_designation || "Head — Human Resources", name: e.pc_hr_name || company },
      { role: "Employee Acknowledgement", name: `${emp}\nDate: _______________` },
    ]});

    blocks.push({ kind: "footer", text: `${company} — Probation Confirmation Letter · Generated by Lekha` });
    return blocks;
  },
};
