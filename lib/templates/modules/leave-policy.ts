import type { TemplateModule, DocSection } from "../types";

export const leavePolicy: TemplateModule = {
  meta: {
    id: "leave-policy",
    name: "Leave Policy",
    categoryId: "hr",
    category: "HR & Workplace",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Company leave policy covering Casual Leave, Sick Leave, Earned/Privilege Leave, Maternity, Paternity, and Bereavement leave. Configurable leave days and carry-forward rules.",
    aliases: ["CL", "SL", "EL", "maternity", "leave policy", "annual leave", "holiday policy"],
    pages: 5,
    minutes: 8,
    status: "live",
  },
  groups: [
    {
      title: "Company details",
      fields: [
        { id: "lp_company_name", label: "Company name", type: "text", required: true, placeholder: "Acme Technologies Pvt Ltd" },
        { id: "lp_effective_date", label: "Policy effective date", type: "date", required: true },
        { id: "lp_leave_year", label: "Leave year (calendar period)", type: "select", default: "jan_dec", options: [
          { value: "jan_dec", label: "January to December" },
          { value: "apr_mar", label: "April to March (Indian financial year)" },
        ]},
        { id: "lp_hr_name", label: "HR / Policy owner name", type: "text", placeholder: "Pooja Nair" },
        { id: "lp_hr_designation", label: "HR designation", type: "text", default: "Head — Human Resources" },
      ],
    },
    {
      title: "Leave entitlements",
      fields: [
        { id: "lp_cl_days", label: "Casual Leave (CL) days per year", type: "number", default: "12", placeholder: "12" },
        { id: "lp_sl_days", label: "Sick Leave (SL) days per year", type: "number", default: "12", placeholder: "12" },
        { id: "lp_el_days", label: "Earned / Privilege Leave (EL/PL) days per year", type: "number", default: "15", placeholder: "15" },
        { id: "lp_el_carryforward", label: "Max EL days carry-forward to next year", type: "number", default: "30", placeholder: "30" },
        { id: "lp_maternity_days", label: "Maternity leave (days)", type: "number", default: "182", placeholder: "182" },
        { id: "lp_paternity_days", label: "Paternity leave (days)", type: "number", default: "5", placeholder: "5" },
        { id: "lp_bereavement_days", label: "Bereavement leave (days)", type: "number", default: "3", placeholder: "3" },
        { id: "lp_optional_holidays", label: "Optional / restricted holidays per year", type: "number", default: "2", placeholder: "2" },
        { id: "lp_wfh_clause", label: "Include Work-from-Home leave provision?", type: "select", default: "no", options: [
          { value: "yes", label: "Yes — include WFH leave section" },
          { value: "no", label: "No" },
        ]},
        { id: "lp_lop_clause", label: "Include Loss of Pay (LOP) provision?", type: "select", default: "yes", options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]},
      ],
    },
  ],
  render(e): DocSection[] {
    const blocks: DocSection[] = [];
    const company = e.lp_company_name || "[Company Name]";
    const effDate = e.lp_effective_date ? new Date(e.lp_effective_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Effective Date]";
    const leaveYear = e.lp_leave_year === "apr_mar" ? "April to March" : "January to December";

    const cl = Number(e.lp_cl_days || 12);
    const sl = Number(e.lp_sl_days || 12);
    const el = Number(e.lp_el_days || 15);
    const elCarry = Number(e.lp_el_carryforward || 30);
    const maternity = Number(e.lp_maternity_days || 182);
    const paternity = Number(e.lp_paternity_days || 5);
    const bereavement = Number(e.lp_bereavement_days || 3);
    const optional = Number(e.lp_optional_holidays || 2);

    blocks.push({ kind: "title", text: company.toUpperCase() });
    blocks.push({ kind: "divider" });
    blocks.push({ kind: "subtitle", text: "EMPLOYEE LEAVE POLICY" });
    blocks.push({ kind: "spacer" });

    blocks.push({ kind: "kv", pairs: [
      { label: "Policy effective from", value: effDate },
      { label: "Leave year", value: leaveYear },
      { label: "Policy owner", value: `${e.lp_hr_name || company} — ${e.lp_hr_designation || "Head — Human Resources"}` },
    ]});

    blocks.push({ kind: "divider" });

    blocks.push({ kind: "para", text: "This Leave Policy governs the entitlement, application, approval, and administration of all leaves for employees of " + company + ". All employees are expected to comply with the provisions of this Policy." });

    const clauses: DocSection[] = [
      {
        kind: "clause", number: 1, title: "Scope and Applicability",
        text: "This Policy applies to all full-time permanent employees of the Company. Contract staff, interns, and consultants are governed by their respective engagement terms. Part-time employees shall be eligible for leave on a pro-rated basis.",
      },
      {
        kind: "clause", number: 2, title: "Leave Year",
        text: `The leave year for the purpose of this Policy shall be from ${leaveYear} ("Leave Year"). Leaves are credited at the beginning of each Leave Year. New joiners shall receive leave on a pro-rated basis from the month of joining.`,
      },
      {
        kind: "clause", number: 3, title: "Casual Leave (CL)",
        text: `Entitlement: ${cl} days per Leave Year. CL is intended for unforeseen personal exigencies, domestic requirements, or social obligations. CL cannot be accumulated or carried forward to the next Leave Year. Maximum 3 consecutive CL days can be taken at a time. CL cannot be clubbed with other leave types without prior managerial approval.`,
      },
      {
        kind: "clause", number: 4, title: "Sick Leave (SL)",
        text: `Entitlement: ${sl} days per Leave Year. SL is for genuine medical illness or injury. For SL exceeding 3 consecutive working days, a medical certificate from a registered medical practitioner is mandatory. Unused SL may be encashed at the rate of 50% of basic salary per day at the end of the year, subject to company discretion. SL cannot be pre-planned.`,
      },
      {
        kind: "clause", number: 5, title: "Earned / Privilege Leave (EL/PL)",
        text: `Entitlement: ${el} days per Leave Year (accrued at the rate of ${Math.round(el / 12 * 10) / 10} days per month of service). EL must be applied for a minimum of 3 days in advance. Minimum 3 consecutive working days must be applied at a time. Unused EL may be carried forward up to a maximum of ${elCarry} days. Excess EL above ${elCarry} days will lapse unless encashed (subject to company policy on encashment). EL may be encashed at the time of resignation / retirement subject to applicable tax and company norms.`,
      },
      {
        kind: "clause", number: 6, title: "Maternity Leave",
        text: `Entitlement: ${maternity} days (${Math.round(maternity / 7)} weeks) of paid Maternity Leave in accordance with the Maternity Benefit Act, 1961 (as amended). Applicable for female employees who have worked for at least 80 days in the preceding 12 months. An additional 26 weeks of unpaid leave may be granted at the discretion of the Management. Adoption and surrogacy leave: 12 weeks as per the Maternity Benefit (Amendment) Act, 2017.`,
      },
      {
        kind: "clause", number: 7, title: "Paternity Leave",
        text: `Entitlement: ${paternity} days of paid Paternity Leave. Applicable for male employees on the birth or adoption of a child. Must be applied within 6 months of the child's birth. Paternity leave is not carried forward.`,
      },
      {
        kind: "clause", number: 8, title: "Bereavement Leave",
        text: `Entitlement: ${bereavement} days of paid Bereavement Leave in the event of the death of an immediate family member (spouse, child, parent, sibling, parent-in-law). An additional ${bereavement} days may be granted at managerial discretion for close relatives. Bereavement leave is not carry-forwardable and cannot be clubbed with EL without prior approval.`,
      },
      {
        kind: "clause", number: 9, title: "Optional / Restricted Holidays",
        text: `Employees may avail ${optional} Optional Holidays per year from a list of regional / religious holidays declared by the Company at the start of the Leave Year. Optional Holidays are non-encashable and non-carry-forwardable.`,
      },
    ];

    clauses.forEach(c => blocks.push(c));

    let clauseNum = 10;

    if (e.lp_wfh_clause === "yes") {
      blocks.push({
        kind: "clause", number: clauseNum++, title: "Work-from-Home (WFH) Provision",
        text: "Employees may avail WFH days as per the applicable WFH / Hybrid Work Policy. WFH days are not counted as leave. Employees must remain available during core working hours and attend mandatory meetings as scheduled. WFH approval is subject to managerial discretion and business requirements.",
      });
    }

    if (e.lp_lop_clause === "yes") {
      blocks.push({
        kind: "clause", number: clauseNum++, title: "Leave Without Pay (LWP) / Loss of Pay (LOP)",
        text: "In the event an employee exhausts all paid leave balances, additional leave may be granted as Leave Without Pay (LWP) subject to managerial and HR approval. LWP days will result in proportional salary deduction. Continuous LWP exceeding 30 days without approval may be treated as abandonment of employment.",
      });
    }

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Leave Application Process",
      text: "All leave applications must be submitted through the designated HR Management System (HRMS) / leave management tool. Prior approval is required except in medical emergencies (SL). Retroactive leave applications are permitted for medical leave only, with a supporting certificate. Leaves taken without approval will be treated as Loss of Pay.",
    });

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Holidays",
      text: "The Company shall declare a list of Public / National Holidays at the beginning of each year. Employees required to work on a public holiday shall be entitled to a compensatory day off within 60 days.",
    });

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Amendments",
      text: "The Company reserves the right to amend, supplement, or repeal this Policy at any time. Amendments will be communicated to all employees via email / HRMS.",
    });

    blocks.push({ kind: "divider" });

    blocks.push({ kind: "subtitle", text: "LEAVE SUMMARY TABLE" });
    blocks.push({ kind: "table",
      headers: ["Leave Type", "Days/Year", "Carry Forward", "Encashable"],
      rows: [
        ["Casual Leave (CL)", `${cl} days`, "No", "No"],
        ["Sick Leave (SL)", `${sl} days`, "No", "Partial (50%)"],
        ["Earned / Privilege Leave (EL)", `${el} days`, `Up to ${elCarry} days`, "Yes (at exit)"],
        ["Maternity Leave", `${maternity} days`, "N/A", "N/A"],
        ["Paternity Leave", `${paternity} days`, "No", "No"],
        ["Bereavement Leave", `${bereavement} days`, "No", "No"],
        ["Optional Holidays", `${optional} days`, "No", "No"],
      ],
    });

    blocks.push({ kind: "spacer" });
    blocks.push({ kind: "para", text: `Approved by ${e.lp_hr_name || "HR"} — ${e.lp_hr_designation || "Head — Human Resources"}, ${company}\nEffective Date: ${effDate}` });

    blocks.push({ kind: "footer", text: `${company} — Leave Policy · Generated by Lekha` });
    return blocks;
  },
};
