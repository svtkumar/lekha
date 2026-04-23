import type { TemplateModule, DocSection } from "../types";
import { formatDate } from "../types";

export const legalNotice: TemplateModule = {
  meta: {
    id: "legal-notice",
    name: "Legal Notice",
    categoryId: "business",
    category: "Business & Legal",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Demand notice, eviction notice, cheque bounce notice (Section 138 NI Act), or breach-of-contract notice.",
    aliases: ["demand notice", "cheque bounce notice", "eviction notice"],
    pages: 3,
    minutes: 8,
    status: "live",
  },
  groups: [
    {
      title: "Notice basics",
      fields: [
        { id: "ln_type", label: "Notice type", type: "select", required: true, options: [
          { value: "demand", label: "Demand for payment / refund" },
          { value: "cheque_bounce", label: "Cheque bounce (Section 138 NI Act)" },
          { value: "eviction", label: "Eviction / vacate premises" },
          { value: "breach", label: "Breach of contract" },
          { value: "defamation", label: "Defamation cease & desist" },
        ], default: "demand" },
        { id: "ln_date", label: "Date of notice", type: "date", required: true },
        { id: "ln_city", label: "City", type: "text", required: true },
      ],
    },
    {
      title: "Advocate / sender",
      fields: [
        { id: "ln_advocate", label: "Advocate name", type: "text", required: true },
        { id: "ln_bar", label: "Bar Council enrolment number", type: "text", placeholder: "KAR/1234/2020" },
        { id: "ln_chamber_addr", label: "Chamber address", type: "textarea", rows: 2, required: true },
        { id: "ln_email", label: "Advocate email", type: "email" },
        { id: "ln_phone", label: "Advocate phone", type: "tel" },
      ],
    },
    {
      title: "Client (on whose behalf)",
      fields: [
        { id: "ln_client_name", label: "Client name / entity", type: "text", required: true },
        { id: "ln_client_addr", label: "Client address", type: "textarea", rows: 2 },
      ],
    },
    {
      title: "Addressee",
      fields: [
        { id: "ln_noticee_name", label: "Noticee (to whom the notice is sent)", type: "text", required: true },
        { id: "ln_noticee_addr", label: "Noticee address", type: "textarea", rows: 3, required: true },
      ],
    },
    {
      title: "Facts & relief",
      fields: [
        { id: "ln_facts", label: "Statement of facts / grievance", type: "textarea", required: true, rows: 8, placeholder: "Describe the facts leading to the dispute, chronologically. Reference dates, amounts, agreements, and prior communication." },
        { id: "ln_cheque_no", label: "Cheque number (for cheque-bounce only)", type: "text" },
        { id: "ln_cheque_amt", label: "Cheque amount in ₹ (for cheque-bounce only)", type: "number" },
        { id: "ln_cheque_bank", label: "Drawee bank & branch", type: "text" },
        { id: "ln_cheque_return_date", label: "Return/dishonour date", type: "date" },
        { id: "ln_demand_amt", label: "Amount demanded in ₹ (if any)", type: "number" },
        { id: "ln_relief", label: "Specific relief sought", type: "textarea", rows: 3, required: true, placeholder: "E.g. Pay ₹5,00,000 within 15 days / Vacate premises within 30 days / Cease and desist from publishing defamatory content." },
        { id: "ln_deadline_days", label: "Compliance period (days)", type: "number", required: true, default: "15" },
      ],
    },
  ],
  render(values): DocSection[] {
    const typeTitle: Record<string, string> = {
      demand: "LEGAL NOTICE FOR DEMAND OF PAYMENT",
      cheque_bounce: "LEGAL NOTICE UNDER SECTION 138 OF THE NEGOTIABLE INSTRUMENTS ACT, 1881",
      eviction: "LEGAL NOTICE FOR EVICTION / HANDOVER OF POSSESSION",
      breach: "LEGAL NOTICE FOR BREACH OF CONTRACT",
      defamation: "CEASE AND DESIST NOTICE FOR DEFAMATION",
    };
    const t = values.ln_type || "demand";

    const clauses: DocSection[] = [
      { kind: "clause", number: 1, title: "Instructions", text: `Under instructions from and on behalf of my client ${values.ln_client_name || "[Client]"}${values.ln_client_addr ? `, resident / having its office at ${values.ln_client_addr}` : ""} (hereinafter referred to as "my Client"), I hereby serve you with the following legal notice:` },
      { kind: "clause", number: 2, title: "Statement of Facts", text: values.ln_facts || "[Facts to be narrated]" },
    ];

    if (t === "cheque_bounce") {
      clauses.push({
        kind: "clause", number: 3, title: "Dishonour",
        text: `That in discharge of the said liability, you issued cheque no. ${values.ln_cheque_no || "[Cheque No.]"} dated [Cheque Date] drawn on ${values.ln_cheque_bank || "[Bank]"} for ₹ ${Number(values.ln_cheque_amt || 0).toLocaleString("en-IN")}/- in favour of my Client. On presentation, the said cheque was returned dishonoured on ${formatDate(values.ln_cheque_return_date) || "[Return Date]"} with the remarks issued by the bank. The return memo is available in original with my Client and shall be produced at the time of hearing, if any.`,
      });
      clauses.push({
        kind: "clause", number: 4, title: "Demand",
        text: `You are hereby called upon to make payment of the cheque amount of ₹ ${Number(values.ln_cheque_amt || 0).toLocaleString("en-IN")}/- together with interest @ 12% p.a. from the date of dishonour till realisation, within 15 (fifteen) days from the receipt of this notice, in compliance with Section 138 of the Negotiable Instruments Act, 1881.`,
      });
      clauses.push({
        kind: "clause", number: 5, title: "Consequences",
        text: `Failing which my Client shall be constrained to initiate criminal proceedings under Section 138 of the NI Act before the competent court, in addition to such civil remedies as may be available in law, entirely at your risk as to cost and consequences.`,
      });
    } else {
      clauses.push({
        kind: "clause", number: 3, title: "Relief Sought",
        text: values.ln_relief || "[Specific relief]",
      });
      if (Number(values.ln_demand_amt || 0) > 0) {
        clauses.push({
          kind: "clause", number: 4, title: "Demand",
          text: `You are hereby called upon to pay to my Client a sum of ₹ ${Number(values.ln_demand_amt || 0).toLocaleString("en-IN")}/- together with interest @ 12% per annum from the date of accrual till realisation, within ${values.ln_deadline_days || "15"} (${wordNum(values.ln_deadline_days || "15")}) days from the receipt of this notice.`,
        });
      }
      clauses.push({
        kind: "clause", number: clauses.length + 1, title: "Consequences",
        text: `Failing compliance within the stipulated period, my Client reserves the right to institute appropriate civil and/or criminal proceedings against you before the competent forum, entirely at your risk as to cost and consequences, of which this may kindly be noted.`,
      });
    }

    clauses.push({
      kind: "clause", number: clauses.length + 1, title: "Without Prejudice",
      text: `This notice is issued without prejudice to any other rights and remedies available to my Client in law or in equity, all of which are expressly reserved.`,
    });

    return [
      { kind: "title", text: typeTitle[t] || "LEGAL NOTICE" },
      { kind: "subtitle", text: `Issued on ${formatDate(values.ln_date)} at ${values.ln_city || "[City]"}` },
      { kind: "kv", pairs: [
        { label: "To", value: `${values.ln_noticee_name || "[Noticee]"}\n${values.ln_noticee_addr || "[Address]"}` },
        { label: "From", value: `${values.ln_advocate || "[Advocate]"}, Advocate${values.ln_bar ? `\nEnrolment: ${values.ln_bar}` : ""}\n${values.ln_chamber_addr || "[Chamber Address]"}${values.ln_email ? `\n${values.ln_email}` : ""}${values.ln_phone ? ` · ${values.ln_phone}` : ""}` },
      ]},
      { kind: "para", text: `Subject: ${typeTitle[t]}` , align: "left"},
      { kind: "para", text: "Dear Sir / Madam," },
      { kind: "divider" },
      ...clauses,
      { kind: "spacer", height: 2 },
      { kind: "para", text: `Please acknowledge receipt of this notice.` },
      { kind: "spacer", height: 1 },
      { kind: "signatures", parties: [{ role: "Advocate for the Client", name: `${values.ln_advocate || "[Advocate]"}${values.ln_bar ? `\n(Enrolment: ${values.ln_bar})` : ""}` }] },
    ];
  },
};

function wordNum(n: string): string {
  const m: Record<string, string> = { "7": "seven", "10": "ten", "15": "fifteen", "30": "thirty", "60": "sixty", "90": "ninety" };
  return m[n] || n;
}
