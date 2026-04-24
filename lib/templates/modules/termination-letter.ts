import type { TemplateModule, DocSection } from "../types";
import { formatDate } from "../types";

export const terminationLetter: TemplateModule = {
  meta: {
    id: "termination-letter",
    name: "Termination Letter",
    categoryId: "hr",
    category: "HR & Workplace",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Employment termination letter covering performance, misconduct, redundancy, or with-cause scenarios, with notice and settlement terms.",
    aliases: ["dismissal", "separation letter"],
    pages: 2,
    minutes: 5,
    status: "live",
  },
  groups: [
    {
      title: "Company",
      fields: [
        { id: "tl_company", label: "Company name", type: "text", required: true },
        { id: "tl_letter_date", label: "Letter date", type: "date", required: true },
        { id: "tl_signer", label: "Signatory name", type: "text", required: true },
        { id: "tl_signer_title", label: "Signatory designation", type: "text", required: true },
      ],
    },
    {
      title: "Employee",
      fields: [
        { id: "tl_emp_name", label: "Employee full name", type: "text", required: true },
        { id: "tl_emp_id", label: "Employee ID", type: "text" },
        { id: "tl_emp_addr", label: "Employee address", type: "textarea", rows: 2 },
        { id: "tl_desig", label: "Designation", type: "text", required: true },
      ],
    },
    {
      title: "Termination details",
      fields: [
        { id: "tl_reason", label: "Reason", type: "select", required: true, options: [
          { value: "performance", label: "Non-performance" },
          { value: "misconduct", label: "Misconduct" },
          { value: "redundancy", label: "Redundancy / role elimination" },
          { value: "probation", label: "Failure to complete probation" },
          { value: "with_cause", label: "With cause (specify)" },
        ]},
        { id: "tl_reason_details", label: "Details / specifics", type: "textarea", rows: 4, placeholder: "Describe the facts supporting the termination. For misconduct, reference show-cause notices and replies." },
        { id: "tl_effective", label: "Effective date of termination", type: "date", required: true },
        { id: "tl_notice_type", label: "Notice handling", type: "radio", required: true, options: [
          { value: "served", label: "Notice served — employee to work through period" },
          { value: "pay_in_lieu", label: "Pay in lieu — no further service required" },
          { value: "summary", label: "Summary termination — no notice (for gross misconduct)" },
        ]},
        { id: "tl_notice_days", label: "Notice / pay-in-lieu days", type: "number", default: "60" },
        { id: "tl_fnf_amount", label: "Full and final settlement (₹, if computed)", type: "number" },
        { id: "tl_handover", label: "Handover & return of property instructions", type: "textarea", rows: 3, placeholder: "Return laptop, access cards, company documents. Hand over ongoing work to [person]." },
      ],
    },
  ],
  render(values): DocSection[] {
    const reasonLabels: Record<string, string> = {
      performance: "continued unsatisfactory performance despite prior feedback and performance improvement opportunities",
      misconduct: "acts of misconduct as communicated to you through prior show-cause notice(s) and not adequately explained",
      redundancy: "organisational restructuring resulting in the elimination of your role",
      probation: "failure to meet the performance and conduct standards required during your probation period",
      with_cause: "reasons set out below",
    };
    const reason = values.tl_reason || "performance";
    const noticeType = values.tl_notice_type || "pay_in_lieu";
    const fnf = Number(values.tl_fnf_amount || 0);

    const clauses: DocSection[] = [
      { kind: "clause", number: 1, title: "Termination of Employment", text: `After due consideration, the Company has decided to terminate your employment with effect from close of business on ${formatDate(values.tl_effective) || "[Effective Date]"} on account of ${reasonLabels[reason]}.` },
      { kind: "clause", number: 2, title: "Reasons / Facts", text: values.tl_reason_details || "[Reasons to be provided]" },
      { kind: "clause", number: 3, title: "Notice Period", text: noticeType === "served"
        ? `In accordance with your appointment terms, you are required to serve the notice period of ${values.tl_notice_days || "60"} (${values.tl_notice_days || "60"}) days up to ${formatDate(values.tl_effective) || "[Effective Date]"}. You shall continue to discharge your duties professionally during this period, and facilitate orderly handover.`
        : noticeType === "pay_in_lieu"
          ? `In lieu of the notice period of ${values.tl_notice_days || "60"} (${values.tl_notice_days || "60"}) days, the Company shall pay you the equivalent pay. You are relieved from your duties with immediate effect as of the date of this letter.`
          : `As this termination is on account of gross misconduct, no notice period or pay in lieu thereof is payable or required, in accordance with the terms of your appointment and applicable law.`
      },
      { kind: "clause", number: 4, title: "Full & Final Settlement", text: fnf > 0
        ? `Your full and final settlement, computed at ₹ ${fnf.toLocaleString("en-IN")}/-, will be credited to your registered bank account within 30 (thirty) days of the effective date, after adjustment of any outstanding dues, notice shortfall, or loss recoveries. A detailed computation will be shared separately.`
        : `The Full and Final settlement statement — including outstanding salary, leave encashment, statutory dues, gratuity (if applicable) and any recoverable advances — will be prepared and communicated to you within 30 (thirty) days from the effective date. Payment shall be made within 45 (forty-five) days thereof.`
      },
      { kind: "clause", number: 5, title: "Handover", text: values.tl_handover || `You are required to hand over all Company property in your possession — including laptop, access cards, mobile devices, SIM cards, documents, files, and any other material — to Human Resources on or before your last working day. You are also required to complete a structured handover of all ongoing work.` },
      { kind: "clause", number: 6, title: "Continuing Obligations", text: `Notwithstanding termination, your obligations of confidentiality, non-disclosure, intellectual property assignment, non-solicitation and any other post-employment restrictions as set out in your appointment letter, NDA or other agreements with the Company shall survive and continue to bind you.` },
      { kind: "clause", number: 7, title: "Acknowledgement", text: `Please acknowledge receipt of this letter by signing a copy and returning it to Human Resources. Your cooperation in ensuring a smooth transition is appreciated.` },
    ];

    return [
      { kind: "title", text: values.tl_company || "Company Name" },
      { kind: "subtitle", text: `Letter of Termination · ${formatDate(values.tl_letter_date)}` },
      { kind: "kv", pairs: [
        { label: "To", value: `${values.tl_emp_name || "[Employee]"}${values.tl_emp_id ? ` (${values.tl_emp_id})` : ""}\n${values.tl_emp_addr || ""}` },
        { label: "Designation", value: values.tl_desig || "[Designation]" },
      ]},
      { kind: "para", text: `Dear ${values.tl_emp_name || "[Employee]"},` },
      ...clauses,
      { kind: "spacer", height: 2 },
      { kind: "signatures", parties: [
        { role: `For ${values.tl_company || "[Company]"}`, name: `${values.tl_signer || "[Signatory]"}\n${values.tl_signer_title || "[Designation]"}` },
        { role: "Acknowledged", name: values.tl_emp_name || "[Employee]" },
      ]},
    ];
  },
};
