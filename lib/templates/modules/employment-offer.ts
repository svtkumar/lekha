import type { TemplateModule, DocSection } from "../types";
import { formatDate } from "../types";

export const employmentOffer: TemplateModule = {
  meta: {
    id: "employment-offer",
    name: "Employment Offer Letter",
    categoryId: "hr",
    category: "HR & Workplace",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Pre-joining offer with CTC breakdown, probation, notice, non-compete, and standard terms.",
    aliases: ["offer letter", "pre joining"],
    pages: 3,
    minutes: 7,
    status: "live",
  },
  groups: [
    {
      title: "Company details",
      fields: [
        { id: "eo_company", label: "Company name", type: "text", required: true },
        { id: "eo_company_addr", label: "Company address", type: "textarea", rows: 2, required: true },
        { id: "eo_signer_name", label: "Signatory name", type: "text", required: true },
        { id: "eo_signer_title", label: "Signatory designation", type: "text", required: true, placeholder: "Head, Human Resources" },
      ],
    },
    {
      title: "Candidate details",
      fields: [
        { id: "eo_cand_name", label: "Candidate full name", type: "text", required: true },
        { id: "eo_cand_addr", label: "Candidate address", type: "textarea", rows: 2 },
        { id: "eo_offer_date", label: "Offer date", type: "date", required: true },
      ],
    },
    {
      title: "Role",
      fields: [
        { id: "eo_desig", label: "Designation", type: "text", required: true, placeholder: "Senior Software Engineer" },
        { id: "eo_dept", label: "Department", type: "text", placeholder: "Engineering" },
        { id: "eo_location", label: "Work location", type: "text", required: true, placeholder: "Bengaluru (Hybrid)" },
        { id: "eo_reporting", label: "Reports to", type: "text", placeholder: "Engineering Manager" },
        { id: "eo_start_date", label: "Expected date of joining", type: "date", required: true },
      ],
    },
    {
      title: "Compensation (₹ per annum)",
      fields: [
        { id: "eo_basic", label: "Basic", type: "number", required: true, placeholder: "600000" },
        { id: "eo_hra", label: "HRA", type: "number", default: "0" },
        { id: "eo_special", label: "Special allowance", type: "number", default: "0" },
        { id: "eo_pf_employer", label: "Employer PF contribution", type: "number", default: "0" },
        { id: "eo_gratuity", label: "Gratuity", type: "number", default: "0" },
        { id: "eo_variable", label: "Variable pay (target)", type: "number", default: "0" },
        { id: "eo_joining_bonus", label: "Joining bonus (one-time)", type: "number", default: "0" },
      ],
    },
    {
      title: "Terms",
      fields: [
        { id: "eo_probation", label: "Probation period (months)", type: "select", required: true, options: [{value:"3",label:"3 months"},{value:"6",label:"6 months"},{value:"0",label:"No probation"}], default: "6" },
        { id: "eo_notice", label: "Notice period (months)", type: "select", required: true, options: [{value:"1",label:"1 month"},{value:"2",label:"2 months"},{value:"3",label:"3 months"}], default: "2" },
        { id: "eo_offer_validity", label: "Offer validity (days)", type: "number", default: "7" },
        { id: "eo_custom", label: "Additional clauses (optional)", type: "textarea", rows: 3 },
      ],
    },
  ],
  render(values): DocSection[] {
    const num = (k: string) => Number(values[k] || 0);
    const basic = num("eo_basic"), hra = num("eo_hra"), special = num("eo_special");
    const pf = num("eo_pf_employer"), grat = num("eo_gratuity"), variable = num("eo_variable"), joining = num("eo_joining_bonus");
    const ctc = basic + hra + special + pf + grat + variable + joining;

    const ctcRows: string[][] = [
      ["Basic", `₹ ${basic.toLocaleString("en-IN")}`],
      ["HRA", `₹ ${hra.toLocaleString("en-IN")}`],
      ["Special Allowance", `₹ ${special.toLocaleString("en-IN")}`],
      ["Employer PF Contribution", `₹ ${pf.toLocaleString("en-IN")}`],
      ["Gratuity", `₹ ${grat.toLocaleString("en-IN")}`],
      ["Variable Pay (target)", `₹ ${variable.toLocaleString("en-IN")}`],
    ];
    if (joining > 0) ctcRows.push(["Joining Bonus (one-time)", `₹ ${joining.toLocaleString("en-IN")}`]);
    ctcRows.push(["Total CTC", `₹ ${ctc.toLocaleString("en-IN")}`]);

    const probation = values.eo_probation || "6";
    const notice = values.eo_notice || "2";
    const validity = values.eo_offer_validity || "7";

    return [
      { kind: "title", text: "Letter of Offer" },
      { kind: "subtitle", text: `${values.eo_company || "[Company]"} · ${formatDate(values.eo_offer_date)}` },
      { kind: "para", text: `Dear ${values.eo_cand_name || "[Candidate]"},`, align: "left" },
      { kind: "para", text: `We are pleased to offer you the position of ${values.eo_desig || "[Designation]"}${values.eo_dept ? ` in our ${values.eo_dept} team` : ""} at ${values.eo_company || "[Company]"}. This letter sets out the terms on which you would be employed with us.` },
      { kind: "clause", number: 1, title: "Position & Reporting", text: `You will be designated as ${values.eo_desig || "[Designation]"}${values.eo_reporting ? `, reporting to ${values.eo_reporting}` : ""}. Your primary work location will be ${values.eo_location || "[Location]"}.` },
      { kind: "clause", number: 2, title: "Date of Joining", text: `Your expected date of joining is ${formatDate(values.eo_start_date) || "[Start Date]"}. Please confirm your acceptance of this offer within ${validity} (${wordNum(validity)}) days from the date hereof; thereafter this offer shall stand withdrawn unless extended in writing.` },
      { kind: "clause", number: 3, title: "Compensation", text: `Your total fixed compensation (Cost to Company) shall be ₹ ${ctc.toLocaleString("en-IN")} per annum, structured as below. Compensation is payable monthly, subject to applicable withholding taxes and statutory deductions.` },
      { kind: "table", headers: ["Component", "Amount (₹ p.a.)"], rows: ctcRows, widths: [60, 40] },
      { kind: "clause", number: 4, title: "Probation", text: probation === "0" ? `There is no probation period applicable to this role.` : `You will be on probation for a period of ${probation} (${wordNum(probation)}) months from your date of joining, during which your performance will be reviewed. Probation may be extended by written notice. On satisfactory completion, your employment shall be deemed confirmed.` },
      { kind: "clause", number: 5, title: "Hours, Leaves & Holidays", text: `Your working hours and leave entitlements shall be as per the Company's policies notified from time to time. Public holidays shall be as per the applicable state holiday list.` },
      { kind: "clause", number: 6, title: "Confidentiality & IP", text: `You shall be bound by the Company's confidentiality policy. All intellectual property created or developed by you in the course of your employment, including inventions, software, designs, and written works, shall vest absolutely in the Company. You will be required to sign a separate NDA and IP assignment on joining.` },
      { kind: "clause", number: 7, title: "Non-solicitation", text: `During your employment and for a period of 12 (twelve) months thereafter, you shall not directly or indirectly solicit any employee of the Company to terminate their employment, nor solicit or attempt to divert any customer or business of the Company.` },
      { kind: "clause", number: 8, title: "Notice Period & Termination", text: `This employment may be terminated by either party by giving ${notice} (${wordNum(notice)}) calendar months' written notice or equivalent pay in lieu of notice. The Company reserves the right to terminate your employment without notice in the event of gross misconduct, fraud, breach of this offer, or any conduct prejudicial to the Company's interests.` },
      { kind: "clause", number: 9, title: "Pre-joining Requirements", text: `Your employment is subject to: (a) satisfactory verification of documents (educational certificates, identity proof, previous employment records, and background checks); (b) medical fitness; (c) no conflicting non-compete, non-solicit, or notice-period obligations with your previous employer.` },
      { kind: "clause", number: 10, title: "Governing Law", text: `This offer and your employment shall be governed by the laws of India. Disputes, if any, shall be subject to the exclusive jurisdiction of the courts at the city where your primary work location is situated.` },
      values.eo_custom && values.eo_custom.trim()
        ? { kind: "clause", number: 11, title: "Additional Terms", text: values.eo_custom.trim() }
        : { kind: "spacer", height: 1 },
      { kind: "para", text: `We look forward to welcoming you to the ${values.eo_company || "[Company]"} team. Please signify your acceptance by signing a copy of this letter and returning it to us.` },
      { kind: "spacer", height: 2 },
      { kind: "signatures", parties: [
        { role: `For ${values.eo_company || "[Company]"}`, name: `${values.eo_signer_name || "[Signatory]"}\n${values.eo_signer_title || "[Designation]"}` },
        { role: "Accepted by Candidate", name: values.eo_cand_name || "[Candidate]" },
      ]},
    ];
  },
};

function wordNum(n: string): string {
  const m: Record<string, string> = { "0": "zero", "1": "one", "2": "two", "3": "three", "6": "six", "7": "seven", "14": "fourteen" };
  return m[n] || n;
}
