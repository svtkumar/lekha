import type { TemplateModule, DocSection } from "../types";

export const fnfSettlement: TemplateModule = {
  meta: {
    id: "fnf-settlement",
    name: "Full & Final Settlement",
    categoryId: "hr",
    category: "HR & Workplace",
    country: ["IN"],
    formats: ["pdf", "xlsx"],
    description: "Exit settlement letter with leave encashment, gratuity calculation, notice pay, and deductions. Generates itemised settlement statement for departing employees.",
    aliases: ["FnF", "exit settlement", "full and final", "f&f settlement", "employee settlement"],
    pages: 2,
    minutes: 8,
    status: "live",
  },
  groups: [
    {
      title: "Company details",
      fields: [
        { id: "fnf_company_name", label: "Company name", type: "text", required: true, placeholder: "Acme Technologies Pvt Ltd" },
        { id: "fnf_company_addr", label: "Company address", type: "textarea", rows: 2 },
        { id: "fnf_hr_name", label: "HR / Signatory name", type: "text", placeholder: "Priya Sharma" },
        { id: "fnf_hr_designation", label: "HR designation", type: "text", default: "Head — Human Resources" },
        { id: "fnf_letter_date", label: "Settlement letter date", type: "date", required: true },
      ],
    },
    {
      title: "Employee details",
      fields: [
        { id: "fnf_emp_name", label: "Employee name", type: "text", required: true, placeholder: "Vikram Mehta" },
        { id: "fnf_emp_id", label: "Employee ID", type: "text", placeholder: "EMP-2020-112" },
        { id: "fnf_designation", label: "Designation", type: "text", required: true, placeholder: "Senior Engineer" },
        { id: "fnf_department", label: "Department", type: "text", placeholder: "Engineering" },
        { id: "fnf_doj", label: "Date of joining", type: "date", required: true },
        { id: "fnf_dol", label: "Last working day / date of leaving", type: "date", required: true },
        { id: "fnf_separation_type", label: "Separation type", type: "select", default: "resignation", options: [
          { value: "resignation", label: "Resignation" },
          { value: "termination", label: "Termination" },
          { value: "retirement", label: "Retirement" },
          { value: "end_of_contract", label: "End of contract" },
        ]},
      ],
    },
    {
      title: "Settlement components",
      fields: [
        { id: "fnf_last_monthly_gross", label: "Last drawn monthly gross salary (₹)", type: "number", required: true, placeholder: "80000" },
        { id: "fnf_basic_salary", label: "Basic salary per month (₹)", type: "number", required: true, placeholder: "32000" },
        { id: "fnf_days_worked_last_month", label: "Days worked in last month", type: "number", placeholder: "15" },
        { id: "fnf_days_in_last_month", label: "Total calendar days in last month", type: "number", placeholder: "31" },
        { id: "fnf_notice_period_days", label: "Notice period (days)", type: "number", default: "60", placeholder: "60" },
        { id: "fnf_notice_served_days", label: "Notice period served (days)", type: "number", placeholder: "60" },
        { id: "fnf_leaves_pending", label: "Earned leaves pending (days)", type: "number", placeholder: "12" },
        { id: "fnf_reimbursements_pending", label: "Pending reimbursements (₹)", type: "number", placeholder: "5000" },
        { id: "fnf_performance_bonus", label: "Pro-rated performance bonus (₹)", type: "number", placeholder: "0" },
      ],
    },
    {
      title: "Deductions",
      fields: [
        { id: "fnf_advances_recovery", label: "Salary / loan advances to recover (₹)", type: "number", placeholder: "0" },
        { id: "fnf_asset_recovery", label: "Asset recovery / damage deduction (₹)", type: "number", placeholder: "0" },
        { id: "fnf_other_deductions", label: "Other deductions (₹)", type: "number", placeholder: "0" },
        { id: "fnf_other_deductions_desc", label: "Description of other deductions", type: "text", placeholder: "Mobile bill recovery" },
        { id: "fnf_pf_applicable", label: "PF applicable?", type: "select", default: "yes", options: [
          { value: "yes", label: "Yes — PF deductions applicable" },
          { value: "no", label: "No" },
        ]},
        { id: "fnf_gratuity_applicable", label: "Gratuity applicable? (≥5 years service)", type: "select", default: "auto", options: [
          { value: "auto", label: "Calculate automatically" },
          { value: "yes", label: "Yes — include gratuity" },
          { value: "no", label: "No / not eligible" },
        ]},
      ],
    },
  ],
  render(e): DocSection[] {
    const blocks: DocSection[] = [];
    const emp = e.fnf_emp_name || "[Employee Name]";
    const company = e.fnf_company_name || "[Company Name]";
    const letterDate = e.fnf_letter_date ? new Date(e.fnf_letter_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Date]";
    const doj = e.fnf_doj ? new Date(e.fnf_doj) : null;
    const dol = e.fnf_dol ? new Date(e.fnf_dol) : null;
    const dolStr = dol ? dol.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Last Working Day]";
    const dojStr = doj ? doj.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Date of Joining]";

    // Calculate service years for gratuity
    let serviceYears = 0;
    if (doj && dol) {
      serviceYears = Math.floor((dol.getTime() - doj.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
    }

    const gross = Number(e.fnf_last_monthly_gross || 0);
    const basic = Number(e.fnf_basic_salary || 0);
    const daysWorked = Number(e.fnf_days_worked_last_month || 0);
    const daysInMonth = Number(e.fnf_days_in_last_month || 30);
    const noticePeriod = Number(e.fnf_notice_period_days || 60);
    const noticeServed = Number(e.fnf_notice_served_days || noticePeriod);
    const leavePending = Number(e.fnf_leaves_pending || 0);
    const reimbursements = Number(e.fnf_reimbursements_pending || 0);
    const perfBonus = Number(e.fnf_performance_bonus || 0);
    const advances = Number(e.fnf_advances_recovery || 0);
    const assetDeduction = Number(e.fnf_asset_recovery || 0);
    const otherDeductions = Number(e.fnf_other_deductions || 0);

    // Salary for days worked in last month
    const dailyRate = gross / daysInMonth;
    const lastMonthSalary = daysWorked > 0 ? Math.round(dailyRate * daysWorked) : gross;

    // Notice pay recovery / in lieu
    const noticeDiff = noticePeriod - noticeServed;
    const dailyRateBasic = gross / 30;
    const noticePayRecovery = noticeDiff > 0 ? Math.round(dailyRateBasic * noticeDiff) : 0;
    const noticePayInLieu = noticeDiff < 0 ? Math.round(dailyRateBasic * Math.abs(noticeDiff)) : 0;

    // Leave encashment: (basic / 26) * pending leaves
    const leaveEncashment = leavePending > 0 ? Math.round((basic / 26) * leavePending) : 0;

    // Gratuity: (basic / 26) * 15 * years of service (≥5 years)
    const gratuityEligible = e.fnf_gratuity_applicable === "yes" || (e.fnf_gratuity_applicable === "auto" && serviceYears >= 5);
    const gratuity = gratuityEligible ? Math.round((basic / 26) * 15 * serviceYears) : 0;

    // Totals
    const totalCredits = lastMonthSalary + noticePayInLieu + leaveEncashment + gratuity + reimbursements + perfBonus;
    const totalDeductions = noticePayRecovery + advances + assetDeduction + otherDeductions;
    const netSettlement = totalCredits - totalDeductions;

    blocks.push({ kind: "title", text: company.toUpperCase() });
    if (e.fnf_company_addr) blocks.push({ kind: "subtitle", text: e.fnf_company_addr });
    blocks.push({ kind: "divider" });
    blocks.push({ kind: "subtitle", text: "FULL & FINAL SETTLEMENT STATEMENT" });
    blocks.push({ kind: "spacer" });

    blocks.push({ kind: "kv", pairs: [
      { label: "Date", value: letterDate },
      { label: "To", value: emp },
      ...(e.fnf_emp_id ? [{ label: "Employee ID", value: e.fnf_emp_id }] : []),
      { label: "Designation", value: e.fnf_designation || "[Designation]" },
      ...(e.fnf_department ? [{ label: "Department", value: e.fnf_department }] : []),
      { label: "Date of Joining", value: dojStr },
      { label: "Last Working Day", value: dolStr },
      { label: "Total Service", value: serviceYears > 0 ? `${serviceYears} year${serviceYears !== 1 ? "s" : ""}` : "[Service Period]" },
      { label: "Separation Type", value: e.fnf_separation_type === "termination" ? "Termination" : e.fnf_separation_type === "retirement" ? "Retirement" : e.fnf_separation_type === "end_of_contract" ? "End of Contract" : "Resignation" },
    ]});

    blocks.push({ kind: "divider" });

    blocks.push({ kind: "para", text: `Dear ${emp},\n\nThis letter sets out the Full & Final Settlement of all dues and liabilities between you and ${company}, effective from your last working day, ${dolStr}. The following amounts are payable / recoverable:` });

    // Credits table
    blocks.push({ kind: "subtitle", text: "A. CREDITS (PAYABLE TO EMPLOYEE)" });
    const creditRows: string[][] = [];
    creditRows.push(["1", `Salary for days worked (${daysWorked > 0 ? daysWorked : "full month"} days @ ₹${gross.toLocaleString("en-IN")}/month)`, `₹${lastMonthSalary.toLocaleString("en-IN")}`]);
    if (noticePayInLieu > 0) {
      creditRows.push(["2", `Notice pay in lieu (${Math.abs(noticeDiff)} days in excess of notice period)`, `₹${noticePayInLieu.toLocaleString("en-IN")}`]);
    }
    if (leaveEncashment > 0) {
      creditRows.push([creditRows.length + 1 + "", `Earned leave encashment (${leavePending} days)`, `₹${leaveEncashment.toLocaleString("en-IN")}`]);
    }
    if (gratuity > 0) {
      creditRows.push([creditRows.length + 1 + "", `Gratuity (${serviceYears} years of service)`, `₹${gratuity.toLocaleString("en-IN")}`]);
    }
    if (reimbursements > 0) {
      creditRows.push([creditRows.length + 1 + "", "Pending reimbursements / expense claims", `₹${reimbursements.toLocaleString("en-IN")}`]);
    }
    if (perfBonus > 0) {
      creditRows.push([creditRows.length + 1 + "", "Pro-rated performance bonus", `₹${perfBonus.toLocaleString("en-IN")}`]);
    }
    creditRows.push(["", "TOTAL CREDITS (A)", `₹${totalCredits.toLocaleString("en-IN")}`]);

    blocks.push({ kind: "table", headers: ["#", "Component", "Amount"], rows: creditRows });

    // Deductions table
    blocks.push({ kind: "subtitle", text: "B. DEDUCTIONS / RECOVERIES" });
    const deductionRows: string[][] = [];
    if (noticePayRecovery > 0) {
      deductionRows.push(["1", `Notice pay recovery (${noticeDiff} days shortfall)`, `₹${noticePayRecovery.toLocaleString("en-IN")}`]);
    }
    if (advances > 0) {
      deductionRows.push([deductionRows.length + 1 + "", "Salary advance / loan recovery", `₹${advances.toLocaleString("en-IN")}`]);
    }
    if (assetDeduction > 0) {
      deductionRows.push([deductionRows.length + 1 + "", "Asset recovery / damage charges", `₹${assetDeduction.toLocaleString("en-IN")}`]);
    }
    if (otherDeductions > 0) {
      deductionRows.push([deductionRows.length + 1 + "", e.fnf_other_deductions_desc || "Other deductions", `₹${otherDeductions.toLocaleString("en-IN")}`]);
    }
    if (deductionRows.length === 0) {
      deductionRows.push(["—", "No deductions", "₹0"]);
    }
    deductionRows.push(["", "TOTAL DEDUCTIONS (B)", `₹${totalDeductions.toLocaleString("en-IN")}`]);

    blocks.push({ kind: "table", headers: ["#", "Component", "Amount"], rows: deductionRows });

    // Net settlement
    blocks.push({ kind: "kv", pairs: [
      { label: "Total Credits (A)", value: `₹${totalCredits.toLocaleString("en-IN")}` },
      { label: "Total Deductions (B)", value: `₹${totalDeductions.toLocaleString("en-IN")}` },
      { label: "NET SETTLEMENT AMOUNT (A − B)", value: `₹${netSettlement.toLocaleString("en-IN")}` },
    ]});

    blocks.push({ kind: "para", text: `${netSettlement >= 0 ? `The net settlement amount of ₹${netSettlement.toLocaleString("en-IN")} will be credited to your registered bank account within 45 days of your last working day, subject to submission of all company assets and clearance of all dues.` : `You are requested to pay the balance amount of ₹${Math.abs(netSettlement).toLocaleString("en-IN")} to the company within 30 days.`}` });

    blocks.push({ kind: "para", text: e.fnf_pf_applicable === "yes" ? "Your PF accumulations will be transferred / withdrawn as per EPFO procedures. Please submit Form 19 / Form 10C / UAN transfer request as applicable." : "" });

    blocks.push({ kind: "para", text: "By signing this letter, you confirm that you have received all dues and have no other claims, demands, or grievances of any nature against the Company, its directors, officers, or employees." });

    blocks.push({ kind: "signatures", parties: [
      { role: e.fnf_hr_designation || "Head — Human Resources", name: e.fnf_hr_name || company },
      { role: "Employee Acknowledgement", name: `${emp}\nDate: _______________` },
    ]});

    blocks.push({ kind: "footer", text: `${company} — Full & Final Settlement · Generated by Lekha` });
    return blocks;
  },
};
