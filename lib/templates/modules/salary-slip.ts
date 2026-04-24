import type { TemplateModule, DocSection } from "../types";
import { formatDate } from "../types";

export const salarySlip: TemplateModule = {
  meta: {
    id: "salary-slip",
    name: "Salary Slip",
    categoryId: "hr",
    category: "HR & Workplace",
    country: ["IN"],
    formats: ["pdf", "xlsx"],
    description: "Monthly payslip with PF, ESI, professional tax, and income tax deductions.",
    aliases: ["payslip", "monthly pay"],
    pages: 1,
    minutes: 5,
    status: "live",
  },
  groups: [
    {
      title: "Company details",
      fields: [
        { id: "ss_company", label: "Company name", type: "text", required: true },
        { id: "ss_company_addr", label: "Company address", type: "textarea", rows: 2 },
        { id: "ss_pan", label: "Company PAN", type: "text", placeholder: "AABCU9603R" },
      ],
    },
    {
      title: "Employee details",
      fields: [
        { id: "ss_emp_name", label: "Employee name", type: "text", required: true },
        { id: "ss_emp_code", label: "Employee code", type: "text", placeholder: "EMP0043" },
        { id: "ss_emp_dept", label: "Department", type: "text" },
        { id: "ss_emp_desig", label: "Designation", type: "text" },
        { id: "ss_emp_doj", label: "Date of joining", type: "date" },
        { id: "ss_emp_pan", label: "Employee PAN", type: "text" },
        { id: "ss_emp_uan", label: "UAN (PF)", type: "text" },
        { id: "ss_emp_bank", label: "Bank account (last 4 digits)", type: "text", placeholder: "XXXX4567" },
      ],
    },
    {
      title: "Pay period",
      fields: [
        { id: "ss_period", label: "Pay period (e.g. April 2026)", type: "text", required: true, placeholder: "April 2026" },
        { id: "ss_paid_days", label: "Paid days", type: "number", required: true, default: "30" },
        { id: "ss_lop_days", label: "Loss of pay days", type: "number", default: "0" },
        { id: "ss_pay_date", label: "Pay date", type: "date" },
      ],
    },
    {
      title: "Earnings (₹)",
      fields: [
        { id: "ss_basic", label: "Basic", type: "number", required: true, placeholder: "30000" },
        { id: "ss_hra", label: "HRA", type: "number", default: "0" },
        { id: "ss_conveyance", label: "Conveyance", type: "number", default: "0" },
        { id: "ss_medical", label: "Medical allowance", type: "number", default: "0" },
        { id: "ss_special", label: "Special allowance", type: "number", default: "0" },
        { id: "ss_bonus", label: "Bonus", type: "number", default: "0" },
      ],
    },
    {
      title: "Deductions (₹)",
      fields: [
        { id: "ss_pf", label: "Provident Fund (PF)", type: "number", default: "0" },
        { id: "ss_esi", label: "ESI", type: "number", default: "0" },
        { id: "ss_pt", label: "Professional Tax", type: "number", default: "0" },
        { id: "ss_tds", label: "Income Tax (TDS)", type: "number", default: "0" },
        { id: "ss_other_deduct", label: "Other deductions", type: "number", default: "0" },
      ],
    },
  ],
  render(values): DocSection[] {
    const num = (k: string) => Number(values[k] || 0);

    const earnings: [string, number][] = [
      ["Basic", num("ss_basic")],
      ["HRA", num("ss_hra")],
      ["Conveyance", num("ss_conveyance")],
      ["Medical Allowance", num("ss_medical")],
      ["Special Allowance", num("ss_special")],
      ["Bonus", num("ss_bonus")],
        ].filter(([, v]) => Number(v) > 0) as [string, number][];

    const deductions: [string, number][] = [
      ["Provident Fund (PF)", num("ss_pf")],
      ["ESI", num("ss_esi")],
      ["Professional Tax", num("ss_pt")],
      ["Income Tax (TDS)", num("ss_tds")],
      ["Other Deductions", num("ss_other_deduct")],
        ].filter(([, v]) => Number(v) > 0) as [string, number][];

    const gross = earnings.reduce((a, [, v]) => a + v, 0);
    const totalDeductions = deductions.reduce((a, [, v]) => a + v, 0);
    const net = gross - totalDeductions;

    const maxRows = Math.max(earnings.length, deductions.length);
    const tableRows: string[][] = [];
    for (let i = 0; i < maxRows; i++) {
      const e = earnings[i] || ["", 0];
      const d = deductions[i] || ["", 0];
      tableRows.push([
        e[0] as string,
        e[1] ? `₹ ${(e[1] as number).toLocaleString("en-IN")}` : "",
        d[0] as string,
        d[1] ? `₹ ${(d[1] as number).toLocaleString("en-IN")}` : "",
      ]);
    }
    tableRows.push([
      "Gross Earnings",
      `₹ ${gross.toLocaleString("en-IN")}`,
      "Total Deductions",
      `₹ ${totalDeductions.toLocaleString("en-IN")}`,
    ]);

    return [
      { kind: "title", text: values.ss_company || "Company Name" },
      { kind: "subtitle", text: `Payslip for ${values.ss_period || "[Period]"}` },
      values.ss_company_addr
        ? { kind: "para", text: values.ss_company_addr, align: "center" }
        : { kind: "spacer", height: 1 },
      { kind: "divider" },
      {
        kind: "kv",
        pairs: [
          { label: "Employee Name", value: values.ss_emp_name || "—" },
          { label: "Employee Code", value: values.ss_emp_code || "—" },
          { label: "Designation", value: values.ss_emp_desig || "—" },
          { label: "Department", value: values.ss_emp_dept || "—" },
          { label: "Date of Joining", value: formatDate(values.ss_emp_doj) || "—" },
          { label: "PAN", value: values.ss_emp_pan || "—" },
          { label: "UAN", value: values.ss_emp_uan || "—" },
          { label: "Bank A/c", value: values.ss_emp_bank || "—" },
          { label: "Paid Days", value: values.ss_paid_days || "—" },
          { label: "LOP Days", value: values.ss_lop_days || "0" },
        ],
      },
      { kind: "spacer", height: 1 },
      {
        kind: "table",
        headers: ["Earnings", "Amount (₹)", "Deductions", "Amount (₹)"],
        rows: tableRows,
        widths: [30, 20, 30, 20],
      },
      { kind: "spacer", height: 1 },
      {
        kind: "kv",
        pairs: [{ label: "Net Pay", value: `₹ ${net.toLocaleString("en-IN")}` }],
      },
      { kind: "spacer", height: 2 },
      {
        kind: "para",
        text: "This is a system-generated payslip. Signature not required.",
        align: "center",
      },
      values.ss_pay_date
        ? { kind: "para", text: `Pay date: ${formatDate(values.ss_pay_date)}`, align: "center" }
        : { kind: "spacer", height: 1 },
    ];
  },
};
