import type { TemplateModule, DocSection } from "../types";
import { formatDate } from "../types";

export const serviceAgreement: TemplateModule = {
  meta: {
    id: "service-agreement",
    name: "Service Agreement",
    categoryId: "business",
    category: "Business & Legal",
    country: ["IN", "US", "UK"],
    formats: ["pdf", "docx"],
    description: "Freelance / consultant / contractor services with scope, IP, confidentiality, payment, and termination.",
    aliases: ["freelance contract", "consultant", "independent contractor"],
    pages: 6,
    minutes: 12,
    status: "live",
  },
  groups: [
    {
      title: "Agreement basics",
      fields: [
        { id: "sa_date", label: "Effective date", type: "date", required: true },
        { id: "sa_city", label: "City of execution", type: "text", required: true },
      ],
    },
    {
      title: "Client",
      fields: [
        { id: "sa_client_name", label: "Client name / entity", type: "text", required: true },
        { id: "sa_client_addr", label: "Client address", type: "textarea", rows: 2, required: true },
      ],
    },
    {
      title: "Service Provider",
      fields: [
        { id: "sa_sp_name", label: "Service Provider name", type: "text", required: true },
        { id: "sa_sp_addr", label: "Service Provider address", type: "textarea", rows: 2, required: true },
      ],
    },
    {
      title: "Scope & fees",
      fields: [
        { id: "sa_scope", label: "Scope of services", type: "textarea", required: true, rows: 6, placeholder: "Describe deliverables, milestones, timelines, and exclusions." },
        { id: "sa_start", label: "Start date", type: "date", required: true },
        { id: "sa_end", label: "End date", type: "date" },
        { id: "sa_fee_type", label: "Fee structure", type: "select", required: true, options: [
          { value: "fixed", label: "Fixed fee" },
          { value: "hourly", label: "Hourly / per-day rate" },
          { value: "monthly", label: "Monthly retainer" },
        ]},
        { id: "sa_fee_amount", label: "Fee amount in ₹", type: "number", required: true },
        { id: "sa_fee_terms", label: "Payment terms", type: "textarea", rows: 2, placeholder: "E.g., 50% upfront, 50% on delivery. Net 15 days from invoice." },
        { id: "sa_expense", label: "Expense reimbursement policy (optional)", type: "textarea", rows: 2 },
      ],
    },
    {
      title: "Terms",
      fields: [
        { id: "sa_ip", label: "IP ownership", type: "radio", required: true, options: [
          { value: "client", label: "All work product belongs to Client (work-for-hire)" },
          { value: "sp", label: "Service Provider retains ownership; Client gets license" },
        ], default: "client" },
        { id: "sa_nda", label: "Include mutual NDA?", type: "radio", options: [
          { value: "yes", label: "Yes — mutual confidentiality" },
          { value: "no", label: "No separate NDA" },
        ], default: "yes" },
        { id: "sa_term_notice", label: "Termination notice period (days)", type: "number", default: "15" },
        { id: "sa_law", label: "Governing law / jurisdiction", type: "text", required: true, placeholder: "Karnataka, India" },
        { id: "sa_custom", label: "Additional clauses (optional)", type: "textarea", rows: 3 },
      ],
    },
  ],
  render(values): DocSection[] {
    const feeType = values.sa_fee_type || "fixed";
    const feeAmt = Number(values.sa_fee_amount || 0);
    const feeLine = {
      fixed: `a fixed fee of ₹ ${feeAmt.toLocaleString("en-IN")}/- for the entire scope of work`,
      hourly: `an hourly rate of ₹ ${feeAmt.toLocaleString("en-IN")}/- per hour / per day, billable monthly in arrears`,
      monthly: `a monthly retainer of ₹ ${feeAmt.toLocaleString("en-IN")}/- payable within 15 days of each invoice`,
    }[feeType] || `a fee of ₹ ${feeAmt.toLocaleString("en-IN")}/-`;

    const ipClient = values.sa_ip !== "sp";
    const ipText = ipClient
      ? `All work product, deliverables, reports, source code, designs, documentation and all other materials created by the Service Provider in the course of providing the Services (collectively, the "Work Product") shall be considered "work-for-hire" and shall be the sole and exclusive property of the Client. The Service Provider hereby assigns to the Client all rights, title and interest in and to the Work Product, including all intellectual property rights therein, free of any encumbrance.`
      : `The Service Provider shall retain ownership of all intellectual property rights in the Work Product. The Service Provider hereby grants to the Client a non-exclusive, worldwide, royalty-free, perpetual license to use, reproduce, modify, and distribute the Work Product solely for the Client's internal business purposes as contemplated by this Agreement.`;

    const notice = values.sa_term_notice || "15";

    const clauses: DocSection[] = [
      { kind: "clause", number: 1, title: "Scope of Services", text: `The Service Provider agrees to provide the following services (the "Services") to the Client: ${values.sa_scope || "[Scope]"}` },
      { kind: "clause", number: 2, title: "Term", text: `This Agreement shall commence on ${formatDate(values.sa_start) || "[Start Date]"} and shall continue until ${values.sa_end ? formatDate(values.sa_end) : "completion of the Services or termination in accordance with Clause 8"}.` },
      { kind: "clause", number: 3, title: "Fees & Payment", text: `In consideration for the Services, the Client shall pay the Service Provider ${feeLine}, subject to any applicable withholding taxes (including TDS under Section 194J of the Indian Income Tax Act, where applicable). ${values.sa_fee_terms ? `Payment terms: ${values.sa_fee_terms}.` : ""} All invoices shall be payable by bank transfer within 15 (fifteen) days of receipt, unless otherwise agreed in writing.` },
      { kind: "clause", number: 4, title: "Independent Contractor", text: `The Service Provider shall perform the Services as an independent contractor and not as an employee, agent, or partner of the Client. The Service Provider shall be solely responsible for the payment of all taxes, including income tax, GST (if applicable), professional tax, and any other statutory dues arising out of the fees paid hereunder. Nothing in this Agreement shall create any employer-employee relationship.` },
      { kind: "clause", number: 5, title: "Intellectual Property", text: ipText },
      { kind: "clause", number: 6, title: "Confidentiality", text: values.sa_nda !== "no"
        ? `Each Party shall hold in strict confidence all non-public information disclosed by the other Party in connection with this Agreement, including without limitation business plans, financial data, customer lists, trade secrets, source code, and any information marked as confidential. The Receiving Party shall use such information solely for the performance of its obligations hereunder, and shall not disclose the same to any third party without the prior written consent of the Disclosing Party. These obligations shall survive termination of this Agreement for a period of 3 (three) years.`
        : `Each Party shall treat information received from the other with reasonable care and shall not disclose the same except as required by law or court order.`
      },
      { kind: "clause", number: 7, title: "Warranties", text: `The Service Provider warrants that (a) the Services shall be performed in a professional and workmanlike manner; (b) the Work Product shall be original and shall not infringe any third-party intellectual property rights; (c) the Service Provider has the full authority and all necessary rights to enter into and perform this Agreement.` },
      { kind: "clause", number: 8, title: "Termination", text: `Either Party may terminate this Agreement for convenience by giving ${notice} (${wordNum(notice)}) days' prior written notice. Either Party may terminate this Agreement forthwith on written notice for material breach by the other Party that is not cured within 10 (ten) days of notice. On termination, the Service Provider shall deliver all Work Product completed up to the date of termination and shall be paid pro-rata for Services rendered until such date.` },
      { kind: "clause", number: 9, title: "Indemnity", text: `Each Party shall indemnify and hold harmless the other Party from and against any claims, damages, losses, costs and expenses (including reasonable legal fees) arising out of or in connection with its breach of this Agreement or its negligence or wilful misconduct.` },
      { kind: "clause", number: 10, title: "Limitation of Liability", text: `Except in respect of a Party's indemnity obligations, breach of confidentiality, or breach of intellectual property obligations, neither Party shall be liable for any indirect, incidental, consequential, special, or punitive damages. The aggregate liability of either Party arising under this Agreement shall not exceed the total fees paid or payable under this Agreement in the 12 (twelve) months preceding the claim.` },
      { kind: "clause", number: 11, title: "Non-solicitation", text: `During the term of this Agreement and for 12 (twelve) months thereafter, neither Party shall directly or indirectly solicit or attempt to hire any employee or contractor of the other Party who was engaged in or exposed to the Services.` },
      { kind: "clause", number: 12, title: "Governing Law & Dispute Resolution", text: `This Agreement shall be governed by the laws of ${values.sa_law || "India"}. Any dispute arising out of or in connection with this Agreement shall be first attempted to be resolved through good-faith discussions between the Parties. Failing resolution within 30 (thirty) days, the dispute shall be referred to arbitration under the Arbitration and Conciliation Act, 1996 before a sole arbitrator mutually agreed between the Parties, with the seat and venue at ${values.sa_city || "[City]"}, ${values.sa_law || "India"}.` },
      { kind: "clause", number: 13, title: "Entire Agreement", text: `This Agreement constitutes the entire agreement between the Parties with respect to the subject matter and supersedes all prior or contemporaneous understandings. Any modification must be in writing and signed by both Parties.` },
    ];

    if (values.sa_expense) {
      clauses.splice(3, 0, { kind: "clause", number: 3.5 as unknown as number, title: "Expense Reimbursement", text: values.sa_expense });
    }

    if (values.sa_custom && values.sa_custom.trim()) {
      clauses.push({ kind: "clause", number: clauses.length + 1, title: "Additional Terms", text: values.sa_custom.trim() });
    }

    return [
      { kind: "title", text: "Service Agreement" },
      { kind: "subtitle", text: `Effective from ${formatDate(values.sa_date)} · ${values.sa_city || "[City]"}` },
      { kind: "para", text: `This Service Agreement ("Agreement") is entered into on ${formatDate(values.sa_date) || "[Date]"} at ${values.sa_city || "[City]"} by and between:` },
      { kind: "party", role: "Client", name: values.sa_client_name || "[Client]", address: values.sa_client_addr },
      { kind: "party", role: "Service Provider", name: values.sa_sp_name || "[Service Provider]", address: values.sa_sp_addr },
      { kind: "para", text: `(each a "Party" and collectively the "Parties") who agree as follows:` },
      { kind: "divider" },
      ...clauses.map((c, i) => (c.kind === "clause" ? { ...c, number: i + 1 } : c)),
      { kind: "signatures", parties: [
        { role: "CLIENT", name: values.sa_client_name || "[Client]" },
        { role: "SERVICE PROVIDER", name: values.sa_sp_name || "[Service Provider]" },
      ]},
    ];
  },
};

function wordNum(n: string): string {
  const m: Record<string, string> = { "7": "seven", "10": "ten", "15": "fifteen", "30": "thirty", "60": "sixty" };
  return m[n] || n;
}
