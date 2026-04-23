import type { TemplateModule, DocSection } from "../types";
import { formatDate } from "../types";

export const nda: TemplateModule = {
  meta: {
    id: "nda",
    name: "Non-Disclosure Agreement",
    categoryId: "business",
    category: "Business & Legal",
    country: ["IN", "US", "UK"],
    formats: ["pdf", "docx"],
    description: "Mutual or one-way confidentiality agreement with standard carve-outs and reasonable protection obligations.",
    aliases: ["confidentiality", "NDA"],
    pages: 4,
    minutes: 8,
    status: "live",
    new: false,
  },
  groups: [
    {
      title: "Agreement basics",
      fields: [
        {
          id: "nda_type",
          label: "NDA type",
          type: "radio",
          required: true,
          options: [
            { value: "Mutual", label: "Mutual (both sides share confidential info)" },
            { value: "Unilateral", label: "Unilateral (only one side discloses)" },
          ],
          default: "Mutual",
        },
        { id: "nda_date", label: "Effective date", type: "date", required: true },
        { id: "nda_city", label: "Place of execution (city)", type: "text", required: true, placeholder: "Bengaluru" },
      ],
    },
    {
      title: "Disclosing party",
      fields: [
        { id: "nda_disc_name", label: "Name / entity", type: "text", required: true, placeholder: "Acme Private Limited" },
        { id: "nda_disc_rep", label: "Authorised representative (optional)", type: "text", placeholder: "Priya Sharma, Director" },
        { id: "nda_disc_addr", label: "Address", type: "textarea", required: true, rows: 2, placeholder: "123 MG Road, Bengaluru 560001" },
      ],
    },
    {
      title: "Receiving party",
      fields: [
        { id: "nda_recv_name", label: "Name / entity", type: "text", required: true, placeholder: "Vendor Co LLP" },
        { id: "nda_recv_rep", label: "Authorised representative (optional)", type: "text" },
        { id: "nda_recv_addr", label: "Address", type: "textarea", required: true, rows: 2 },
      ],
    },
    {
      title: "Scope & duration",
      fields: [
        {
          id: "nda_purpose",
          label: "Purpose of disclosure",
          type: "textarea",
          required: true,
          rows: 3,
          placeholder: "Evaluation of a potential software licensing arrangement.",
          help: "Be specific — courts read this narrowly.",
        },
        {
          id: "nda_term",
          label: "Confidentiality term",
          type: "select",
          required: true,
          options: [
            { value: "2", label: "2 years" },
            { value: "3", label: "3 years" },
            { value: "5", label: "5 years" },
            { value: "7", label: "7 years" },
            { value: "indefinite", label: "Indefinite (trade-secret level)" },
          ],
          default: "3",
        },
        {
          id: "nda_law",
          label: "Governing law / jurisdiction",
          type: "text",
          required: true,
          placeholder: "Karnataka, India",
          default: "India",
        },
        {
          id: "nda_custom",
          label: "Additional clauses (optional)",
          type: "textarea",
          rows: 4,
          help: "Anything extra — e.g., non-solicit, return of materials, specific exclusions.",
        },
      ],
    },
  ],
  render(values): DocSection[] {
    const type = values.nda_type || "Mutual";
    const termLabel =
      values.nda_term === "indefinite"
        ? "for so long as the Confidential Information retains its confidential nature"
        : `for a period of ${values.nda_term} (${wordNum(values.nda_term)}) years from the Effective Date`;

    const parties: DocSection[] = [
      {
        kind: "party",
        role: "Disclosing Party",
        name: values.nda_disc_name || "[Disclosing Party]",
        rep: values.nda_disc_rep,
        address: values.nda_disc_addr,
      },
      {
        kind: "party",
        role: "Receiving Party",
        name: values.nda_recv_name || "[Receiving Party]",
        rep: values.nda_recv_rep,
        address: values.nda_recv_addr,
      },
    ];

    const clauses: DocSection[] = [
      {
        kind: "clause",
        number: 1,
        title: "Confidential Information",
        text:
          `"Confidential Information" means all non-public information disclosed by either Party, whether orally, in writing, electronically, or by inspection, including but not limited to: business plans, financial data, customer lists, trade secrets, technology, source code, algorithms, product designs, marketing strategies, pricing information, employee data, and any information marked as confidential or that a reasonable person would understand to be confidential.`,
      },
      {
        kind: "clause",
        number: 2,
        title: "Purpose",
        text: `The Parties wish to explore ${values.nda_purpose || "a potential business relationship"} (the "Purpose"). Confidential Information may be disclosed by a Party (the "Discloser") to the other Party (the "Recipient") solely to evaluate or pursue the Purpose.`,
      },
      {
        kind: "clause",
        number: 3,
        title: "Obligations of the Receiving Party",
        text: `The Receiving Party shall: (a) hold Confidential Information in strict confidence; (b) not disclose it to any third party without prior written consent; (c) use it solely for the Purpose stated herein; (d) protect it with at least the same degree of care used for its own confidential information, but no less than reasonable care; (e) limit access to employees and agents who need to know and who are bound by similar obligations of confidentiality.`,
      },
      {
        kind: "clause",
        number: 4,
        title: "Exclusions",
        text: `Confidential Information does not include information that: (a) is or becomes publicly known through no breach of this Agreement; (b) was known to the Receiving Party before disclosure, as evidenced by written records; (c) is independently developed without use of the Confidential Information; (d) is rightfully received from a third party not under any confidentiality obligation; or (e) is required to be disclosed by law, court order, or regulatory authority, provided that the Receiving Party gives prompt written notice to permit the Discloser to seek a protective order.`,
      },
      {
        kind: "clause",
        number: 5,
        title: "Term",
        text: `This Agreement shall remain in effect ${termLabel}. The obligations of confidentiality shall survive any termination or expiration of this Agreement.`,
      },
      {
        kind: "clause",
        number: 6,
        title: "Return or Destruction",
        text: `Upon written request by the Discloser, the Receiving Party shall promptly return or destroy (at the Discloser's option) all Confidential Information in its possession, along with any copies, notes, and derivative materials, and shall certify such return or destruction in writing.`,
      },
      {
        kind: "clause",
        number: 7,
        title: "No License",
        text: `Nothing in this Agreement shall be construed as granting any license or other rights to the Receiving Party, whether by estoppel, implication, or otherwise, in or to any Confidential Information or any intellectual property rights of the Discloser, other than the limited right to use Confidential Information solely for the Purpose.`,
      },
      {
        kind: "clause",
        number: 8,
        title: "Governing Law",
        text: `This Agreement shall be governed by the laws of ${values.nda_law || "India"}. Any disputes shall be resolved through arbitration under the Arbitration and Conciliation Act, 1996, with the seat and venue at ${values.nda_law || "Bengaluru, India"}.`,
      },
      {
        kind: "clause",
        number: 9,
        title: "Remedies",
        text: `The Parties acknowledge that monetary damages may be insufficient for breach, and the Discloser shall be entitled to seek injunctive relief in addition to any other remedies available at law or in equity, without the requirement to post bond.`,
      },
      {
        kind: "clause",
        number: 10,
        title: "Entire Agreement",
        text: `This Agreement constitutes the entire understanding between the Parties with respect to the subject matter and supersedes all prior or contemporaneous communications. Any modification must be in writing and signed by both Parties.`,
      },
    ];

    if (values.nda_custom && values.nda_custom.trim()) {
      clauses.push({
        kind: "clause",
        number: 11,
        title: "Additional Terms",
        text: values.nda_custom.trim(),
      });
    }

    return [
      { kind: "title", text: `${type} Non-Disclosure Agreement` },
      { kind: "subtitle", text: `Executed on ${formatDate(values.nda_date)} at ${values.nda_city || "[City]"}` },
      {
        kind: "para",
        text: `This ${type} Non-Disclosure Agreement ("Agreement") is entered into on ${formatDate(values.nda_date) || "[Date]"} at ${values.nda_city || "[City]"} by and between:`,
      },
      ...parties,
      { kind: "para", text: `(each a "Party" and collectively the "Parties") who agree as follows:` },
      { kind: "divider" },
      ...clauses,
      {
        kind: "signatures",
        parties: [
          { role: "For the Disclosing Party", name: values.nda_disc_name || "[Disclosing Party]" },
          { role: "For the Receiving Party", name: values.nda_recv_name || "[Receiving Party]" },
        ],
      },
    ];
  },
};

function wordNum(n: string | undefined): string {
  const map: Record<string, string> = {
    "1": "one", "2": "two", "3": "three", "5": "five", "7": "seven", "10": "ten",
  };
  return map[n || ""] || n || "";
}
