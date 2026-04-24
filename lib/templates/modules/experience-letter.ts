import type { TemplateModule, DocSection } from "../types";
import { formatDate } from "../types";

export const experienceLetter: TemplateModule = {
  meta: {
    id: "experience-letter",
    name: "Experience Letter",
    categoryId: "hr",
    category: "HR & Workplace",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Service / experience certificate confirming employment period, role, and conduct.",
    aliases: ["service certificate", "experience certificate"],
    pages: 1,
    minutes: 3,
    status: "live",
  },
  groups: [
    {
      title: "Company",
      fields: [
        { id: "el_company", label: "Company name", type: "text", required: true },
        { id: "el_company_addr", label: "Company address", type: "textarea", rows: 2 },
        { id: "el_letter_date", label: "Letter date", type: "date", required: true },
        { id: "el_signer", label: "Signatory name", type: "text", required: true },
        { id: "el_signer_title", label: "Signatory designation", type: "text", required: true, placeholder: "Head, Human Resources" },
      ],
    },
    {
      title: "Employee & tenure",
      fields: [
        { id: "el_emp_name", label: "Employee full name", type: "text", required: true },
        { id: "el_emp_id", label: "Employee ID", type: "text" },
        { id: "el_from", label: "Employment from", type: "date", required: true },
        { id: "el_to", label: "Employment until", type: "date", required: true },
        { id: "el_last_desig", label: "Last designation held", type: "text", required: true },
        { id: "el_dept", label: "Department", type: "text" },
        { id: "el_responsibilities", label: "Brief responsibilities (optional)", type: "textarea", rows: 3 },
      ],
    },
  ],
  render(values): DocSection[] {
    return [
      { kind: "title", text: values.el_company || "Company Name" },
      { kind: "subtitle", text: values.el_company_addr || "" },
      { kind: "spacer", height: 1 },
      { kind: "para", text: `Date: ${formatDate(values.el_letter_date) || "[Date]"}`, align: "right" },
      { kind: "spacer", height: 1 },
      { kind: "para", text: "EXPERIENCE CERTIFICATE", align: "center" },
      { kind: "divider" },
      { kind: "para", text: "TO WHOMSOEVER IT MAY CONCERN" },
      { kind: "spacer", height: 1 },
      { kind: "para", text: `This is to certify that ${values.el_emp_name || "[Employee]"}${values.el_emp_id ? ` (Employee ID: ${values.el_emp_id})` : ""} was employed with ${values.el_company || "[Company]"} from ${formatDate(values.el_from) || "[From]"} to ${formatDate(values.el_to) || "[To]"}.` },
      { kind: "para", text: `During this tenure, ${values.el_emp_name || "the employee"} held the position of ${values.el_last_desig || "[Designation]"}${values.el_dept ? ` in the ${values.el_dept} department` : ""}.` },
      values.el_responsibilities
        ? { kind: "para", text: `Key responsibilities included: ${values.el_responsibilities}` }
        : { kind: "spacer", height: 0 },
      { kind: "para", text: `During the tenure, ${values.el_emp_name || "the employee"} was found to be sincere, hardworking, and of good conduct. We wish them all the best in their future endeavours.` },
      { kind: "para", text: `This certificate is issued on request for whatever purpose it may serve.` },
      { kind: "spacer", height: 2 },
      { kind: "signatures", parties: [
        { role: `For ${values.el_company || "[Company]"}`, name: `${values.el_signer || "[Signatory]"}\n${values.el_signer_title || "[Designation]"}` },
      ]},
    ];
  },
};
