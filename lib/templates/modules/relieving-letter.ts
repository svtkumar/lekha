import type { TemplateModule, DocSection } from "../types";
import { formatDate } from "../types";

export const relievingLetter: TemplateModule = {
  meta: {
    id: "relieving-letter",
    name: "Relieving Letter",
    categoryId: "hr",
    category: "HR & Workplace",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Resignation acceptance and relieving letter confirming clearance and last working day.",
    aliases: ["resignation acceptance"],
    pages: 1,
    minutes: 3,
    status: "live",
  },
  groups: [
    {
      title: "Company",
      fields: [
        { id: "rl_company", label: "Company name", type: "text", required: true },
        { id: "rl_letter_date", label: "Letter date", type: "date", required: true },
        { id: "rl_signer", label: "Signatory name", type: "text", required: true },
        { id: "rl_signer_title", label: "Signatory designation", type: "text", required: true, placeholder: "Head, Human Resources" },
      ],
    },
    {
      title: "Employee & dates",
      fields: [
        { id: "rl_emp_name", label: "Employee full name", type: "text", required: true },
        { id: "rl_emp_id", label: "Employee ID", type: "text" },
        { id: "rl_desig", label: "Last designation", type: "text", required: true },
        { id: "rl_dept", label: "Department", type: "text" },
        { id: "rl_resig_date", label: "Date of resignation", type: "date", required: true },
        { id: "rl_last_working_day", label: "Last working day", type: "date", required: true },
        { id: "rl_join_date", label: "Date of joining", type: "date", required: true },
      ],
    },
  ],
  render(values): DocSection[] {
    return [
      { kind: "title", text: values.rl_company || "Company Name" },
      { kind: "subtitle", text: `Relieving Letter · ${formatDate(values.rl_letter_date)}` },
      { kind: "spacer", height: 1 },
      { kind: "para", text: `Date: ${formatDate(values.rl_letter_date) || "[Date]"}`, align: "right" },
      { kind: "spacer", height: 1 },
      { kind: "kv", pairs: [{ label: "To", value: `${values.rl_emp_name || "[Employee]"}${values.rl_emp_id ? ` (${values.rl_emp_id})` : ""}` }]},
      { kind: "para", text: `Dear ${values.rl_emp_name || "[Employee]"},` },
      { kind: "para", text: `This letter is in reference to your resignation dated ${formatDate(values.rl_resig_date) || "[Resignation Date]"} from the position of ${values.rl_desig || "[Designation]"}${values.rl_dept ? `, ${values.rl_dept} department` : ""} at ${values.rl_company || "[Company]"}.` },
      { kind: "para", text: `We confirm that your resignation has been accepted and you stand relieved from the services of the Company with effect from close of business on ${formatDate(values.rl_last_working_day) || "[Last Working Day]"}.` },
      { kind: "para", text: `You had joined ${values.rl_company || "[Company]"} on ${formatDate(values.rl_join_date) || "[Date of Joining]"}. During your association with us, we found your services satisfactory.` },
      { kind: "para", text: `Your full and final settlement, including any outstanding salary, leave encashment, and statutory dues, will be processed and credited to your registered bank account within the Company's standard settlement timelines.` },
      { kind: "para", text: `We take this opportunity to thank you for your contributions and wish you success in all your future endeavours.` },
      { kind: "spacer", height: 2 },
      { kind: "signatures", parties: [
        { role: `For ${values.rl_company || "[Company]"}`, name: `${values.rl_signer || "[Signatory]"}\n${values.rl_signer_title || "[Designation]"}` },
      ]},
    ];
  },
};
