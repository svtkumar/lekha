import type { TemplateModule, DocSection } from "../types";

export const warningLetter: TemplateModule = {
  meta: {
    id: "warning-letter",
    name: "Warning Letter",
    categoryId: "hr",
    category: "HR & Workplace",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Formal written warning to an employee for misconduct, policy violation, or poor performance. Covers first warning, final warning, and show-cause notice variants.",
    aliases: ["misconduct", "warning letter", "show cause notice", "SCN", "disciplinary letter", "final warning"],
    pages: 2,
    minutes: 5,
    status: "live",
  },
  groups: [
    {
      title: "Company details",
      fields: [
        { id: "wl_company_name", label: "Company name", type: "text", required: true, placeholder: "Acme Technologies Pvt Ltd" },
        { id: "wl_hr_name", label: "HR / Signatory name", type: "text", placeholder: "Deepa Verma" },
        { id: "wl_hr_designation", label: "Signatory designation", type: "text", default: "Head — Human Resources" },
      ],
    },
    {
      title: "Employee details",
      fields: [
        { id: "wl_emp_name", label: "Employee name", type: "text", required: true, placeholder: "Rohit Sharma" },
        { id: "wl_emp_id", label: "Employee ID", type: "text", placeholder: "EMP-2021-078" },
        { id: "wl_designation", label: "Designation", type: "text", required: true, placeholder: "Sales Executive" },
        { id: "wl_department", label: "Department", type: "text", placeholder: "Sales" },
        { id: "wl_letter_date", label: "Letter date", type: "date", required: true },
      ],
    },
    {
      title: "Warning details",
      fields: [
        { id: "wl_warning_type", label: "Warning type", type: "select", required: true, default: "first_warning", options: [
          { value: "show_cause", label: "Show-Cause Notice (SCN)" },
          { value: "first_warning", label: "First Written Warning" },
          { value: "second_warning", label: "Second Written Warning" },
          { value: "final_warning", label: "Final Warning" },
        ]},
        { id: "wl_violation_category", label: "Violation category", type: "select", required: true, default: "misconduct", options: [
          { value: "misconduct", label: "Misconduct" },
          { value: "insubordination", label: "Insubordination" },
          { value: "absenteeism", label: "Unauthorized absence / absenteeism" },
          { value: "attendance", label: "Attendance / late-coming" },
          { value: "performance", label: "Poor performance / target miss" },
          { value: "policy_violation", label: "Company policy violation" },
          { value: "harassment", label: "Harassment / workplace behaviour" },
          { value: "data_breach", label: "Data / confidentiality breach" },
        ]},
        { id: "wl_incident_date", label: "Date of incident / observation", type: "date" },
        { id: "wl_incident_description", label: "Description of the incident / violation", type: "textarea", required: true, rows: 4, placeholder: "Describe the specific incident, behaviour, or policy violation in detail. Include dates, witnesses, and any prior verbal warnings given." },
        { id: "wl_prior_warnings", label: "Prior warnings issued (if any)", type: "text", placeholder: "Verbal warning on 15/03/2026" },
        { id: "wl_reply_deadline_days", label: "Days to respond (for SCN)", type: "number", default: "3", placeholder: "3" },
        { id: "wl_consequences", label: "Consequences if misconduct continues", type: "select", default: "termination", options: [
          { value: "termination", label: "Termination of employment" },
          { value: "suspension", label: "Suspension without pay" },
          { value: "demotion", label: "Demotion / reassignment" },
          { value: "further_action", label: "Further disciplinary action" },
        ]},
      ],
    },
  ],
  render(e): DocSection[] {
    const blocks: DocSection[] = [];
    const emp = e.wl_emp_name || "[Employee Name]";
    const company = e.wl_company_name || "[Company Name]";
    const warningType = e.wl_warning_type || "first_warning";
    const letterDate = e.wl_letter_date ? new Date(e.wl_letter_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Date]";

    const headings: Record<string, string> = {
      show_cause: "SHOW-CAUSE NOTICE",
      first_warning: "FIRST WRITTEN WARNING",
      second_warning: "SECOND WRITTEN WARNING",
      final_warning: "FINAL WARNING LETTER",
    };
    const heading = headings[warningType] || "WARNING LETTER";

    const violationLabels: Record<string, string> = {
      misconduct: "misconduct",
      insubordination: "insubordination and disrespectful behaviour",
      absenteeism: "unauthorized absence",
      attendance: "poor attendance and habitual late-coming",
      performance: "failure to meet performance standards",
      policy_violation: "violation of company policy",
      harassment: "workplace misconduct and harassment",
      data_breach: "breach of data confidentiality policy",
    };
    const violationLabel = violationLabels[e.wl_violation_category || "misconduct"] || "misconduct";

    const consequenceLabels: Record<string, string> = {
      termination: "termination of your employment without further notice",
      suspension: "suspension without pay",
      demotion: "demotion or reassignment",
      further_action: "further disciplinary action up to and including termination",
    };
    const consequenceText = consequenceLabels[e.wl_consequences || "termination"] || "termination of employment";

    blocks.push({ kind: "title", text: company.toUpperCase() });
    blocks.push({ kind: "divider" });
    blocks.push({ kind: "subtitle", text: heading });
    blocks.push({ kind: "spacer", height: 1 });

    blocks.push({
      kind: "kv",
      pairs: [
        { label: "Date", value: letterDate },
        { label: "To", value: emp },
        ...(e.wl_emp_id ? [{ label: "Employee ID", value: e.wl_emp_id }] : []),
        { label: "Designation", value: e.wl_designation || "[Designation]" },
        ...(e.wl_department ? [{ label: "Department", value: e.wl_department }] : []),
      ],
    });

    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "para",
      text: `Dear ${emp},\n\nThis letter serves as a ${heading.toLowerCase()} regarding the following matter pertaining to your conduct/performance.`,
    });

    blocks.push({ kind: "subtitle", text: "SUBJECT OF CONCERN" });
    blocks.push({
      kind: "para",
      text: `The management has observed ${violationLabel} on your part${e.wl_incident_date ? ` on ${new Date(e.wl_incident_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}` : ""}. The specific details are as follows:`,
    });

    blocks.push({ kind: "para", text: e.wl_incident_description || "[Description of incident]" });

    if (e.wl_prior_warnings) {
      blocks.push({ kind: "para", text: `Please note that the company had previously brought this matter to your attention: ${e.wl_prior_warnings}. Despite this, the behaviour has continued.` });
    }

    if (warningType === "show_cause") {
      blocks.push({ kind: "subtitle", text: "RESPONSE REQUIRED" });
      blocks.push({ kind: "para", text: `You are hereby directed to submit a written explanation / show cause as to why disciplinary action should not be taken against you, within ${e.wl_reply_deadline_days || "3"} working days of receipt of this notice. Failure to respond within the stipulated time will be construed as an admission of the charges, and the Company reserves the right to proceed with appropriate disciplinary action.` });
    } else {
      blocks.push({ kind: "subtitle", text: "CONSEQUENCE OF CONTINUED MISCONDUCT" });
      blocks.push({ kind: "para", text: `Please be advised that ${warningType === "final_warning" ? "this is your final warning. Any" : "any"} recurrence of such behaviour or further violations of company policy will result in ${consequenceText}, without any further notice.` });
      blocks.push({ kind: "para", text: "We strongly advise you to reflect on this matter and take immediate corrective action. You are expected to maintain the highest standards of professional conduct." });
    }

    blocks.push({ kind: "para", text: "Please acknowledge receipt of this letter by signing and returning the duplicate copy." });

    blocks.push({ kind: "divider" });
    blocks.push({
      kind: "signatures",
      parties: [
        { role: e.wl_hr_designation || "Head — Human Resources", name: e.wl_hr_name || company },
        { role: "Acknowledged by Employee", name: `${emp}\nDate: _______________` },
      ],
    });

    blocks.push({ kind: "footer", text: `${company} — ${heading} · Generated by Lekha · elevana.guru` });
    return blocks;
  },
};
