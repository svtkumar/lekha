import type { TemplateModule, DocSection } from "../types";

export const remoteWorkPolicy: TemplateModule = {
  meta: {
    id: "remote-work-policy",
    name: "Remote Work Policy",
    categoryId: "hr",
    category: "HR & Workplace",
    country: ["IN", "US", "UK", "SG", "AU"],
    formats: ["pdf", "docx"],
    description: "Remote work and Work-from-Home (WFH) policy. Covers eligibility, equipment, data security, core hours, performance expectations, and home workspace requirements.",
    aliases: ["WFH policy", "work from home", "hybrid work policy", "telecommuting policy"],
    pages: 6,
    minutes: 8,
    new: true,
    status: "live",
  },
  groups: [
    {
      title: "Company details",
      fields: [
        { id: "rwp_company_name", label: "Company name", type: "text", required: true, placeholder: "Acme Technologies Pvt Ltd" },
        { id: "rwp_effective_date", label: "Policy effective date", type: "date", required: true },
        { id: "rwp_hr_name", label: "HR / Policy owner name", type: "text", placeholder: "Pooja Nair" },
        { id: "rwp_hr_designation", label: "HR designation", type: "text", default: "Head — Human Resources" },
        { id: "rwp_it_contact", label: "IT support contact / email", type: "email", placeholder: "it@company.com" },
      ],
    },
    {
      title: "Remote work terms",
      fields: [
        { id: "rwp_model", label: "Remote work model", type: "select", required: true, default: "hybrid", options: [
          { value: "hybrid", label: "Hybrid — mix of office and remote" },
          { value: "fully_remote", label: "Fully remote — all remote by default" },
          { value: "wfh_on_approval", label: "WFH on manager approval only" },
        ]},
        { id: "rwp_office_days", label: "Minimum office days per week (for hybrid)", type: "number", default: "2", placeholder: "2" },
        { id: "rwp_core_hours_start", label: "Core hours start", type: "text", default: "10:00 AM", placeholder: "10:00 AM" },
        { id: "rwp_core_hours_end", label: "Core hours end", type: "text", default: "5:00 PM", placeholder: "5:00 PM" },
        { id: "rwp_max_consecutive_wfh", label: "Maximum consecutive remote days (hybrid)", type: "number", default: "5", placeholder: "5" },
        { id: "rwp_equipment_provided", label: "Company equipment provided?", type: "select", default: "yes", options: [
          { value: "yes", label: "Yes — laptop/device provided by company" },
          { value: "stipend", label: "Stipend provided for equipment" },
          { value: "byod", label: "BYOD — employee uses own device" },
        ]},
        { id: "rwp_internet_stipend", label: "Monthly internet / connectivity stipend (₹)", type: "number", placeholder: "1000" },
        { id: "rwp_international_remote", label: "International remote work permitted?", type: "select", default: "no", options: [
          { value: "yes", label: "Yes — with prior approval" },
          { value: "no", label: "No — must be based in India" },
        ]},
      ],
    },
  ],
  render(e): DocSection[] {
    const blocks: DocSection[] = [];
    const company = e.rwp_company_name || "[Company Name]";
    const effDate = e.rwp_effective_date ? new Date(e.rwp_effective_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Effective Date]";
    const coreStart = e.rwp_core_hours_start || "10:00 AM";
    const coreEnd = e.rwp_core_hours_end || "5:00 PM";
    const officeDays = Number(e.rwp_office_days || 2);

    const modelLabel = e.rwp_model === "fully_remote" ? "Fully Remote" : e.rwp_model === "wfh_on_approval" ? "WFH on Manager Approval" : "Hybrid";

    blocks.push({ kind: "title", text: company.toUpperCase() });
    blocks.push({ kind: "divider" });
    blocks.push({ kind: "subtitle", text: "REMOTE WORK AND WORK-FROM-HOME POLICY" });
    blocks.push({ kind: "spacer" });

    blocks.push({ kind: "kv", pairs: [
      { label: "Effective Date", value: effDate },
      { label: "Work Model", value: modelLabel },
      { label: "Core Hours", value: `${coreStart} to ${coreEnd} (local time)` },
      ...(e.rwp_model === "hybrid" ? [{ label: "Minimum Office Days", value: `${officeDays} days per week` }] : []),
      ...(e.rwp_it_contact ? [{ label: "IT Support", value: e.rwp_it_contact }] : []),
    ]});

    blocks.push({ kind: "divider" });

    const clauses: DocSection[] = [
      {
        kind: "clause", number: 1, title: "Purpose",
        text: `${company} ("Company") offers flexible work arrangements to support employee well-being, productivity, and work-life balance. This Remote Work Policy ("Policy") sets out the framework, responsibilities, and expectations for employees working remotely or under a hybrid arrangement.`,
      },
      {
        kind: "clause", number: 2, title: "Eligibility",
        text: "Remote work arrangements are available to permanent employees who: (a) have successfully completed their probation period; (b) have a satisfactory performance record; (c) work in a role that can be performed remotely without operational impact; (d) have a suitable home workspace with reliable internet connectivity. Interns, trainees, and employees under disciplinary action are not eligible for remote work unless specifically approved by HR.",
      },
      {
        kind: "clause", number: 3, title: "Work Model",
        text: e.rwp_model === "fully_remote"
          ? `The Company operates on a fully remote model. Employees are not required to report to the office on a regular basis. Periodic team meetings, all-hands, and mandatory in-person events may require physical attendance and will be communicated with reasonable advance notice.`
          : e.rwp_model === "wfh_on_approval"
          ? "WFH is permitted only with prior written approval from the direct manager on a case-by-case basis. Employees must be available to attend the office when required with reasonable notice."
          : `The Company operates on a Hybrid model. Employees are required to be present in the office for a minimum of ${officeDays} day${officeDays > 1 ? "s" : ""} per week, on days agreed with their manager. The remaining days may be worked remotely. Consecutive remote days must not exceed ${e.rwp_max_consecutive_wfh || 5} working days without specific manager approval.`,
      },
      {
        kind: "clause", number: 4, title: "Core Hours and Availability",
        text: `Regardless of work location, all employees must be reachable and available during core hours of ${coreStart} to ${coreEnd} (local time), Monday to Friday, unless on approved leave. Employees must attend all scheduled meetings, stand-ups, and client calls. Response times to internal messages during core hours should not exceed 30 minutes. Employees are not required to be available outside core hours, except in role-specific or client-facing emergencies.`,
      },
      {
        kind: "clause", number: 5, title: "Home Workspace Requirements",
        text: "Employees working remotely are responsible for maintaining a suitable home workspace that: (a) is private, secure, and free from distractions during work hours; (b) has a stable, high-speed internet connection (minimum 25 Mbps recommended); (c) meets basic ergonomic standards; (d) is not accessible to unauthorised persons who could view confidential work materials. The Company may request a self-certification confirming workspace suitability.",
      },
      {
        kind: "clause", number: 6, title: "Equipment and Technology",
        text: e.rwp_equipment_provided === "stipend"
          ? `The Company provides a one-time equipment stipend to eligible remote employees. Employees are responsible for procuring and maintaining their equipment. Company-provided software, VPN access, and IT tools will be provided.`
          : e.rwp_equipment_provided === "byod"
          ? "Employees use their own devices (BYOD). Company IT security software, VPN, and mobile device management (MDM) tools must be installed on all personal devices used for work. Employees must comply with IT security standards at all times."
          : `The Company provides a laptop and necessary peripherals to employees. Company equipment must not be used for personal activities beyond incidental use. Equipment must be returned upon termination of employment in good working condition.`,
      },
    ];

    clauses.forEach(c => blocks.push(c));

    let clauseNum = 7;

    if (e.rwp_internet_stipend && Number(e.rwp_internet_stipend) > 0) {
      blocks.push({
        kind: "clause", number: clauseNum++, title: "Connectivity Reimbursement",
        text: `The Company shall reimburse employees a monthly internet and connectivity allowance of ₹${Number(e.rwp_internet_stipend).toLocaleString("en-IN")} per month, subject to submission of bills / self-declaration. This allowance is taxable as per applicable income tax rules.`,
      });
    }

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Data Security and Confidentiality",
      text: `Employees must maintain data security standards irrespective of work location: (a) always connect via the Company VPN when accessing internal systems; (b) use only Company-approved collaboration tools and file-sharing platforms; (c) never use public Wi-Fi without VPN; (d) lock screens when unattended; (e) not discuss confidential information in shared or public spaces; (f) comply with the Company's Data Protection and IT Security Policies at all times. Security incidents must be reported immediately to ${e.rwp_it_contact || "IT support"}.`,
    });

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Performance and Accountability",
      text: "Remote work does not change performance expectations. Employees are accountable for meeting deliverables, targets, and quality standards. Managers will conduct regular one-on-one check-ins. Consistent failure to meet expectations or comply with this Policy may result in the remote work arrangement being revoked and may trigger disciplinary action.",
    });

    if (e.rwp_international_remote === "yes") {
      blocks.push({
        kind: "clause", number: clauseNum++, title: "International Remote Work",
        text: "Employees may request to work remotely from another country for a limited period (typically up to 30 days per year) with prior written approval from their manager and HR. Tax, legal, and visa implications must be assessed before approval. Employees are responsible for complying with all applicable immigration and tax laws of the country they work from.",
      });
    } else {
      blocks.push({
        kind: "clause", number: clauseNum++, title: "Geographic Restrictions",
        text: "Employees must work from within India unless specifically authorised in writing by HR. Unauthorised remote work from outside India may create tax and legal obligations for both the employee and the Company.",
      });
    }

    blocks.push({
      kind: "clause", number: clauseNum++, title: "Policy Amendments",
      text: "The Company reserves the right to modify, suspend, or terminate this Policy or any individual remote work arrangement at any time with reasonable notice. Employees may be required to resume office attendance if business needs change.",
    });

    blocks.push({ kind: "divider" });
    blocks.push({ kind: "para", text: `Approved by ${e.rwp_hr_name || "HR"} — ${e.rwp_hr_designation || "Head — Human Resources"}, ${company}\nEffective: ${effDate}` });

    blocks.push({ kind: "footer", text: `${company} — Remote Work Policy · Generated by Lekha · elevana.guru` });
    return blocks;
  },
};
