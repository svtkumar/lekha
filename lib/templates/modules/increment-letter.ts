import type { TemplateModule, DocSection } from "../types";

export const incrementLetter: TemplateModule = {
  meta: {
    id: "increment-letter",
    name: "Salary Increment Letter",
    categoryId: "hr",
    category: "HR & Workplace",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Formal salary revision / increment letter with revised CTC breakup. Covers performance-based increment, effective date, and revised pay components.",
    aliases: ["salary revision", "appraisal letter", "increment letter", "pay hike letter", "salary hike letter"],
    pages: 1,
    minutes: 5,
    status: "live",
  },
  groups: [
    {
      title: "Company details",
      fields: [
        { id: "il_company_name", label: "Company name", type: "text", required: true, placeholder: "Acme Technologies Pvt Ltd" },
        { id: "il_company_addr", label: "Company address", type: "textarea", rows: 2 },
        { id: "il_hr_name", label: "HR / Signatory name", type: "text", placeholder: "Ananya Krishnan" },
        { id: "il_hr_designation", label: "HR designation", type: "text", default: "Head — Human Resources" },
      ],
    },
    {
      title: "Employee details",
      fields: [
        { id: "il_emp_name", label: "Employee name", type: "text", required: true, placeholder: "Vikram Joshi" },
        { id: "il_emp_id", label: "Employee ID", type: "text", placeholder: "EMP-2019-045" },
        { id: "il_designation", label: "Current designation", type: "text", required: true, placeholder: "Senior Software Engineer" },
        { id: "il_department", label: "Department", type: "text", placeholder: "Engineering" },
        { id: "il_letter_date", label: "Letter date", type: "date", required: true },
      ],
    },
    {
      title: "Increment details",
      fields: [
        { id: "il_effective_date", label: "Effective date of increment", type: "date", required: true },
        { id: "il_old_ctc", label: "Current CTC per annum (₹)", type: "number", required: true, placeholder: "1200000" },
        { id: "il_new_ctc", label: "Revised CTC per annum (₹)", type: "number", required: true, placeholder: "1500000" },
        { id: "il_increment_type", label: "Increment type", type: "select", default: "performance", options: [
          { value: "performance", label: "Performance-based increment" },
          { value: "annual", label: "Annual increment" },
          { value: "promotion", label: "Promotion increment" },
          { value: "special", label: "Special / merit increment" },
          { value: "correction", label: "Pay correction" },
        ]},
        { id: "il_new_designation", label: "New designation (if promoted)", type: "text" },
        { id: "il_performance_rating", label: "Performance rating / band (optional)", type: "text", placeholder: "Exceeds Expectations" },
        { id: "il_basic_salary", label: "New basic salary per month (₹)", type: "number", placeholder: "50000" },
        { id: "il_hra", label: "HRA per month (₹)", type: "number", placeholder: "20000" },
        { id: "il_special_allowance", label: "Special allowance per month (₹)", type: "number", placeholder: "30000" },
        { id: "il_additional_message", label: "Additional message / note", type: "textarea", rows: 2 },
      ],
    },
  ],
  render(e): DocSection[] {
    const blocks: DocSection[] = [];
    const emp = e.il_emp_name || "[Employee Name]";
    const company = e.il_company_name || "[Company Name]";
    const oldCtc = e.il_old_ctc ? Number(e.il_old_ctc) : 0;
    const newCtc = e.il_new_ctc ? Number(e.il_new_ctc) : 0;
    const pct = oldCtc > 0 ? Math.round(((newCtc - oldCtc) / oldCtc) * 100) : 0;
    const effDate = e.il_effective_date ? new Date(e.il_effective_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Effective Date]";
    const letterDate = e.il_letter_date ? new Date(e.il_letter_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Date]";

    blocks.push({ kind: "title", text: company.toUpperCase() });
    if (e.il_company_addr) blocks.push({ kind: "subtitle", text: e.il_company_addr });
    blocks.push({ kind: "divider" });

    blocks.push({ kind: "subtitle", text: `SALARY ${e.il_increment_type === "promotion" ? "REVISION & PROMOTION" : "REVISION"} LETTER` });
    blocks.push({ kind: "spacer", height: 1 });

    blocks.push({
      kind: "kv",
      pairs: [
        { label: "Date", value: letterDate },
        { label: "To", value: emp },
        ...(e.il_emp_id ? [{ label: "Employee ID", value: e.il_emp_id }] : []),
        { label: "Designation", value: e.il_new_designation || e.il_designation || "[Designation]" },
        ...(e.il_department ? [{ label: "Department", value: e.il_department }] : []),
      ],
    });

    blocks.push({ kind: "divider" });

    let body = `Dear ${emp},\n\nWe are pleased to inform you that, in recognition of your ${e.il_increment_type === "performance" ? "outstanding performance and valuable contributions" : e.il_increment_type === "promotion" ? "exceptional performance and readiness for the next level of responsibility" : e.il_increment_type === "special" ? "exceptional merit and dedication" : "continued contributions and hard work"} to ${company}, the management has decided to revise your compensation with effect from ${effDate}.`;

    if (e.il_performance_rating) {
      body += ` Your performance rating for the review period is "${e.il_performance_rating}".`;
    }
    if (e.il_new_designation && e.il_increment_type === "promotion") {
      body += ` You are also hereby promoted to the designation of ${e.il_new_designation}, effective the same date.`;
    }

    blocks.push({ kind: "para", text: body });

    blocks.push({ kind: "subtitle", text: "REVISED COMPENSATION DETAILS" });
    const ctcPairs: { label: string; value: string }[] = [
      { label: "Current CTC (per annum)", value: `₹${oldCtc.toLocaleString("en-IN")}` },
      { label: "Revised CTC (per annum)", value: `₹${newCtc.toLocaleString("en-IN")}` },
      { label: "Increment Amount", value: `₹${(newCtc - oldCtc).toLocaleString("en-IN")}` },
      { label: "Increment Percentage", value: `${pct}%` },
      { label: "Effective Date", value: effDate },
    ];
    if (e.il_basic_salary) ctcPairs.push({ label: "Basic Salary (per month)", value: `₹${Number(e.il_basic_salary).toLocaleString("en-IN")}` });
    if (e.il_hra) ctcPairs.push({ label: "HRA (per month)", value: `₹${Number(e.il_hra).toLocaleString("en-IN")}` });
    if (e.il_special_allowance) ctcPairs.push({ label: "Special Allowance (per month)", value: `₹${Number(e.il_special_allowance).toLocaleString("en-IN")}` });

    blocks.push({ kind: "kv", pairs: ctcPairs });

    blocks.push({ kind: "para", text: `${e.il_additional_message || "We value your dedication and look forward to your continued growth with the organisation. We hope this revision reflects our appreciation for your contributions."}\n\nPlease sign and return a copy of this letter as your acknowledgement.` });

    blocks.push({ kind: "para", text: "Yours sincerely," });
    blocks.push({
      kind: "signatures",
      parties: [
        { role: e.il_hr_designation || "Head — Human Resources", name: e.il_hr_name || company },
        { role: "Employee Acknowledgement", name: emp },
      ],
    });

    blocks.push({ kind: "footer", text: `${company} — Salary Increment Letter · Generated by Lekha` });
    return blocks;
  },
};
