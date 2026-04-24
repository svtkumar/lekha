import type { TemplateModule, DocSection } from "../types";
import { formatDate } from "../types";

export const appointmentLetter: TemplateModule = {
  meta: {
    id: "appointment-letter",
    name: "Appointment Letter",
    categoryId: "hr",
    category: "HR & Workplace",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Formal appointment letter issued on or after joining, with full CTC breakdown, probation, leave policy, confidentiality and notice terms.",
    aliases: ["job letter", "employment letter"],
    pages: 3,
    minutes: 6,
    status: "live",
  },
  groups: [
    {
      title: "Company",
      fields: [
        { id: "al_company", label: "Company name", type: "text", required: true },
        { id: "al_company_addr", label: "Company address", type: "textarea", rows: 2, required: true },
        { id: "al_signer_name", label: "Signatory name", type: "text", required: true },
        { id: "al_signer_title", label: "Signatory designation", type: "text", required: true, placeholder: "Head, Human Resources" },
        { id: "al_letter_date", label: "Letter date", type: "date", required: true },
      ],
    },
    {
      title: "Employee",
      fields: [
        { id: "al_emp_name", label: "Employee full name", type: "text", required: true },
        { id: "al_emp_addr", label: "Employee address", type: "textarea", rows: 2 },
        { id: "al_emp_id", label: "Employee ID", type: "text", placeholder: "EMP0043" },
        { id: "al_join_date", label: "Date of joining", type: "date", required: true },
        { id: "al_desig", label: "Designation", type: "text", required: true },
        { id: "al_dept", label: "Department", type: "text" },
        { id: "al_location", label: "Work location", type: "text", required: true },
        { id: "al_reporting", label: "Reporting manager", type: "text" },
      ],
    },
    {
      title: "CTC breakdown (₹ per annum)",
      fields: [
        { id: "al_basic", label: "Basic", type: "number", required: true, placeholder: "300000" },
        { id: "al_hra", label: "HRA", type: "number", default: "0" },
        { id: "al_conveyance", label: "Conveyance", type: "number", default: "0" },
        { id: "al_medical", label: "Medical allowance", type: "number", default: "0" },
        { id: "al_special", label: "Special allowance", type: "number", default: "0" },
        { id: "al_pf_er", label: "Employer PF contribution", type: "number", default: "0" },
        { id: "al_gratuity", label: "Gratuity", type: "number", default: "0" },
        { id: "al_insurance", label: "Group medical insurance", type: "number", default: "0" },
        { id: "al_variable", label: "Variable pay (target)", type: "number", default: "0" },
      ],
    },
    {
      title: "Terms",
      fields: [
        { id: "al_probation", label: "Probation (months)", type: "select", required: true, options: [{value:"0",label:"No probation"},{value:"3",label:"3 months"},{value:"6",label:"6 months"}], default: "6" },
        { id: "al_notice", label: "Notice period (months)", type: "select", required: true, options: [{value:"1",label:"1 month"},{value:"2",label:"2 months"},{value:"3",label:"3 months"}], default: "2" },
        { id: "al_retire_age", label: "Retirement age", type: "number", default: "58" },
        { id: "al_leaves", label: "Annual leave entitlement (days)", type: "number", default: "24" },
      ],
    },
  ],
  render(values): DocSection[] {
    const n = (k: string) => Number(values[k] || 0);
    const basic = n("al_basic"), hra = n("al_hra"), conv = n("al_conveyance"), med = n("al_medical"), spec = n("al_special");
    const pfer = n("al_pf_er"), grat = n("al_gratuity"), ins = n("al_insurance"), var_ = n("al_variable");
    const ctc = basic + hra + conv + med + spec + pfer + grat + ins + var_;

    const rows: string[][] = [
      ["Basic", `₹ ${basic.toLocaleString("en-IN")}`],
      ["HRA", `₹ ${hra.toLocaleString("en-IN")}`],
      ["Conveyance", `₹ ${conv.toLocaleString("en-IN")}`],
      ["Medical Allowance", `₹ ${med.toLocaleString("en-IN")}`],
      ["Special Allowance", `₹ ${spec.toLocaleString("en-IN")}`],
      ["Employer PF", `₹ ${pfer.toLocaleString("en-IN")}`],
      ["Gratuity", `₹ ${grat.toLocaleString("en-IN")}`],
      ["Group Medical Insurance", `₹ ${ins.toLocaleString("en-IN")}`],
      ["Variable Pay (target)", `₹ ${var_.toLocaleString("en-IN")}`],
      ["Total CTC", `₹ ${ctc.toLocaleString("en-IN")}`],
    ];

    const probation = values.al_probation || "6";
    const notice = values.al_notice || "2";
    const retire = values.al_retire_age || "58";
    const leaves = values.al_leaves || "24";

    const clauses: DocSection[] = [
      { kind: "clause", number: 1, title: "Position & Location", text: `You are appointed as ${values.al_desig || "[Designation]"}${values.al_dept ? ` in our ${values.al_dept} department` : ""}${values.al_reporting ? `, reporting to ${values.al_reporting}` : ""}. Your primary work location shall be ${values.al_location || "[Location]"}. The Company reserves the right to transfer you to any of its offices, branches, or affiliates as business requirements may dictate.` },
      { kind: "clause", number: 2, title: "Compensation", text: `Your total annual cost to the Company (CTC) is ₹ ${ctc.toLocaleString("en-IN")}/-, structured as under. Compensation will be paid in 12 monthly instalments, subject to applicable withholding and statutory deductions.` },
      { kind: "table", headers: ["Component", "Amount (₹ p.a.)"], rows, widths: [60, 40] },
      { kind: "clause", number: 3, title: "Probation", text: probation === "0" ? `No probation period applies to this appointment.` : `You shall be on probation for ${probation} (${probation}) months from your date of joining. During probation, either party may terminate the employment with 15 (fifteen) days' written notice. The Company may extend the probation period by written notice. Upon satisfactory completion, your employment shall be deemed confirmed.` },
      { kind: "clause", number: 4, title: "Working Hours & Days", text: `The regular working hours are 9 (nine) hours per day, 5 (five) days per week, with breaks as per the Company's policy. You may be required to work additional hours as necessary to fulfil your responsibilities, without additional compensation unless otherwise agreed.` },
      { kind: "clause", number: 5, title: "Leave", text: `You shall be entitled to leave as per the Company's Leave Policy, currently ${leaves} (${leaves}) days of annual leave per calendar year, in addition to public holidays as declared by the Company. Leave shall be availed with prior written approval of your reporting manager.` },
      { kind: "clause", number: 6, title: "Statutory Benefits", text: `You shall be covered under the Employees' Provident Fund & Miscellaneous Provisions Act, 1952, the Employees' State Insurance Act, 1948 (if applicable), the Payment of Gratuity Act, 1972, and such other social-security legislation as may apply. Contributions shall be deducted from your salary as required.` },
      { kind: "clause", number: 7, title: "Confidentiality", text: `You shall maintain strict confidentiality regarding all business information, trade secrets, customer data, financial data, source code, designs, processes, and any other proprietary information of the Company, during and after your employment. You shall be required to sign a separate Non-Disclosure Agreement on or before your date of joining.` },
      { kind: "clause", number: 8, title: "Intellectual Property", text: `All inventions, improvements, works of authorship, software, designs and other intellectual property created by you during the course of your employment, or using the Company's resources, shall be the sole and exclusive property of the Company. You shall execute such assignments and documents as the Company may require to perfect its rights.` },
      { kind: "clause", number: 9, title: "Non-compete & Non-solicit", text: `During the term of your employment and for 12 (twelve) months thereafter, you shall not (a) engage in any business that directly competes with the Company; (b) solicit any customer or supplier of the Company; (c) solicit or induce any employee or contractor of the Company to terminate their engagement.` },
      { kind: "clause", number: 10, title: "Code of Conduct", text: `You shall abide by the Company's Code of Conduct, Anti-Harassment Policy (POSH), Anti-Bribery Policy and all other policies as notified from time to time. Violation may result in disciplinary action up to and including termination.` },
      { kind: "clause", number: 11, title: "Notice Period & Termination", text: `Post-confirmation, this employment may be terminated by either party by giving ${notice} (${notice}) calendar months' written notice or equivalent pay in lieu of notice. The Company reserves the right to terminate the employment forthwith, without notice or pay in lieu, in the event of gross misconduct, fraud, wilful breach, or any conduct prejudicial to the interests of the Company.` },
      { kind: "clause", number: 12, title: "Retirement", text: `You shall retire from the services of the Company on attaining the age of ${retire} (${retire}) years, unless the Company elects to extend your engagement by a fixed-term consulting arrangement.` },
      { kind: "clause", number: 13, title: "Governing Law", text: `This appointment and your employment shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts at the city of your primary work location.` },
    ];

    return [
      { kind: "title", text: "Letter of Appointment" },
      { kind: "subtitle", text: `${values.al_company || "[Company]"} · ${formatDate(values.al_letter_date)}` },
      { kind: "kv", pairs: [
        { label: "Date", value: formatDate(values.al_letter_date) || "—" },
        { label: "Employee ID", value: values.al_emp_id || "—" },
      ]},
      { kind: "para", text: `Dear ${values.al_emp_name || "[Employee]"},` },
      { kind: "para", text: `We are pleased to confirm your appointment as ${values.al_desig || "[Designation]"} with ${values.al_company || "[Company]"} on the terms set out below, with effect from ${formatDate(values.al_join_date) || "[Date of Joining]"}.` },
      ...clauses,
      { kind: "spacer", height: 1 },
      { kind: "para", text: `Please sign and return a copy of this letter as a token of your acceptance of the terms hereof.` },
      { kind: "para", text: `We welcome you to the ${values.al_company || "[Company]"} team and wish you a long and successful career.` },
      { kind: "spacer", height: 2 },
      { kind: "signatures", parties: [
        { role: `For ${values.al_company || "[Company]"}`, name: `${values.al_signer_name || "[Signatory]"}\n${values.al_signer_title || "[Designation]"}` },
        { role: "Accepted by Employee", name: values.al_emp_name || "[Employee]" },
      ]},
    ];
  },
};
