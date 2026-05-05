import type { TemplateModule, DocSection } from "../types";

export const boardResolution: TemplateModule = {
  meta: {
    id: "board-resolution",
    name: "Board Resolution",
    categoryId: "compliance",
    category: "Compliance",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Board Resolution for common corporate actions — bank account opening, borrowing authority, investment approval, office lease, vendor contract, and general purpose resolutions. Complies with Companies Act 2013.",
    aliases: ["BR", "board minute", "board resolution", "directors resolution"],
    pages: 2,
    minutes: 5,
    status: "live",
  },
  groups: [
    {
      title: "Company details",
      fields: [
        { id: "br_company_name", label: "Company name", type: "text", required: true, placeholder: "Acme Technologies Private Limited" },
        { id: "br_cin", label: "CIN (Company Identification Number)", type: "text", placeholder: "U72900KA2021PTC123456" },
        { id: "br_registered_addr", label: "Registered office address", type: "textarea", rows: 2 },
        { id: "br_meeting_date", label: "Date of Board Meeting", type: "date", required: true },
        { id: "br_meeting_place", label: "Place of meeting", type: "text", placeholder: "Bengaluru, Karnataka" },
        { id: "br_chairman", label: "Chairman of meeting", type: "text", required: true, placeholder: "Arjun Sharma" },
        { id: "br_company_secretary", label: "Company Secretary name (if any)", type: "text", placeholder: "CS Meera Nair" },
      ],
    },
    {
      title: "Directors present",
      fields: [
        { id: "br_director1", label: "Director 1 name", type: "text", required: true, placeholder: "Arjun Sharma" },
        { id: "br_director1_din", label: "Director 1 DIN", type: "text", placeholder: "07654321" },
        { id: "br_director2", label: "Director 2 name", type: "text", placeholder: "Meena Kapoor" },
        { id: "br_director2_din", label: "Director 2 DIN", type: "text", placeholder: "07654322" },
        { id: "br_director3", label: "Director 3 name (if any)", type: "text" },
        { id: "br_director3_din", label: "Director 3 DIN (if any)", type: "text" },
      ],
    },
    {
      title: "Resolution details",
      fields: [
        { id: "br_resolution_type", label: "Type of resolution", type: "select", required: true, default: "bank_account", options: [
          { value: "bank_account", label: "Bank Account Opening" },
          { value: "borrowing", label: "Borrowing / Loan Authority" },
          { value: "signatory", label: "Authorised Signatory Appointment" },
          { value: "investment", label: "Investment Approval" },
          { value: "office_lease", label: "Office / Premises Lease Approval" },
          { value: "vendor_contract", label: "Vendor / Service Contract Approval" },
          { value: "general", label: "General Purpose Resolution" },
        ]},
        { id: "br_bank_name", label: "Bank name (for bank account resolution)", type: "text", placeholder: "HDFC Bank Limited" },
        { id: "br_bank_branch", label: "Bank branch / location", type: "text", placeholder: "Koramangala, Bengaluru" },
        { id: "br_loan_amount", label: "Loan / borrowing amount (₹)", type: "number", placeholder: "10000000" },
        { id: "br_authorized_person", label: "Authorised person name (for signing/banking)", type: "text", placeholder: "Arjun Sharma" },
        { id: "br_authorized_designation", label: "Authorised person designation", type: "text", placeholder: "Managing Director" },
        { id: "br_contract_party", label: "Counterparty name (for contract resolution)", type: "text", placeholder: "AWS India" },
        { id: "br_contract_value", label: "Contract value (₹)", type: "number", placeholder: "500000" },
        { id: "br_resolution_text", label: "Resolution text (for general resolution)", type: "textarea", rows: 4, placeholder: "Describe the specific resolution to be passed…" },
      ],
    },
  ],
  render(e): DocSection[] {
    const blocks: DocSection[] = [];
    const company = e.br_company_name || "[Company Name]";
    const meetingDate = e.br_meeting_date ? new Date(e.br_meeting_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Meeting Date]";
    const place = e.br_meeting_place || "[Place]";
    const chairman = e.br_chairman || "[Chairman]";

    blocks.push({ kind: "title", text: company.toUpperCase() });
    if (e.br_cin) blocks.push({ kind: "subtitle", text: `CIN: ${e.br_cin}` });
    if (e.br_registered_addr) blocks.push({ kind: "subtitle", text: e.br_registered_addr });
    blocks.push({ kind: "divider" });
    blocks.push({ kind: "subtitle", text: "MINUTES OF THE BOARD MEETING" });
    blocks.push({ kind: "spacer" });

    blocks.push({ kind: "kv", pairs: [
      { label: "Date", value: meetingDate },
      { label: "Place", value: place },
      { label: "Chairman", value: chairman },
      { label: "Mode", value: "Physical Meeting" },
    ]});

    blocks.push({ kind: "divider" });

    // Directors present
    blocks.push({ kind: "subtitle", text: "DIRECTORS PRESENT" });
    const dirRows: string[][] = [];
    if (e.br_director1) dirRows.push([e.br_director1, e.br_director1_din ? `DIN: ${e.br_director1_din}` : ""]);
    if (e.br_director2) dirRows.push([e.br_director2, e.br_director2_din ? `DIN: ${e.br_director2_din}` : ""]);
    if (e.br_director3) dirRows.push([e.br_director3, e.br_director3_din ? `DIN: ${e.br_director3_din}` : ""]);
    if (dirRows.length === 0) dirRows.push(["[Director Name]", "DIN: [DIN]"]);

    blocks.push({ kind: "table", headers: ["Director Name", "DIN"], rows: dirRows });

    if (e.br_company_secretary) {
      blocks.push({ kind: "para", text: `Also present: ${e.br_company_secretary} (Company Secretary, acting as Secretary to the Meeting).` });
    }

    blocks.push({ kind: "para", text: `${chairman} (Chairman) noted that a quorum was present and called the meeting to order.` });

    // Resolution
    blocks.push({ kind: "divider" });
    blocks.push({ kind: "subtitle", text: "RESOLUTION" });

    let resolutionText = "";
    const resType = e.br_resolution_type || "bank_account";

    if (resType === "bank_account") {
      resolutionText = `RESOLVED THAT pursuant to Section 179 of the Companies Act, 2013, the Company be and is hereby authorised to open and operate a current account with ${e.br_bank_name || "[Bank Name]"}, ${e.br_bank_branch || "[Branch]"} ("Bank").

RESOLVED FURTHER THAT ${e.br_authorized_person || "[Authorised Person]"}, ${e.br_authorized_designation || "Director"} of the Company, be and is hereby authorised to: (a) sign account opening forms and all related documents; (b) operate the said account; (c) sign cheques, demand drafts, fund transfer instructions, NEFT/RTGS instructions, and all banking correspondence on behalf of the Company, singly or jointly as may be required by the Bank.

RESOLVED FURTHER THAT the Company Secretary / Director be and is hereby authorised to provide the Bank with a certified copy of this Resolution and such other documents as the Bank may require.`;
    } else if (resType === "borrowing") {
      const loanAmt = e.br_loan_amount ? `₹${Number(e.br_loan_amount).toLocaleString("en-IN")}` : "[Loan Amount]";
      resolutionText = `RESOLVED THAT pursuant to Section 179(3)(d) and Section 180 of the Companies Act, 2013, consent of the Board of Directors of the Company be and is hereby accorded to borrow money up to ${loanAmt} from ${e.br_bank_name || "[Lender / Bank]"} on such terms and conditions as may be agreed upon.

RESOLVED FURTHER THAT ${e.br_authorized_person || "[Authorised Person]"}, ${e.br_authorized_designation || "Director"}, be and is hereby authorised to sign and execute all loan agreements, security documents, hypothecation deeds, and any other documents required for the purpose of the said borrowing.`;
    } else if (resType === "signatory") {
      resolutionText = `RESOLVED THAT ${e.br_authorized_person || "[Authorised Person]"}, ${e.br_authorized_designation || "Director"}, be and is hereby authorised as the Authorised Signatory of the Company for the purpose of signing and executing all contracts, agreements, letters, representations, and documents on behalf of the Company with respect to [specify scope].

RESOLVED FURTHER THAT the said authority shall remain valid until revoked by a further resolution of the Board.`;
    } else if (resType === "investment") {
      resolutionText = `RESOLVED THAT pursuant to Section 179(3)(e) of the Companies Act, 2013, the Board hereby approves the investment of ${e.br_contract_value ? `₹${Number(e.br_contract_value).toLocaleString("en-IN")}` : "[Amount]"} in ${e.br_contract_party || "[Investment Target]"} on the terms and conditions discussed at the meeting.

RESOLVED FURTHER THAT ${e.br_authorized_person || "[Authorised Person]"}, ${e.br_authorized_designation || "Director"}, be and is hereby authorised to execute all documents necessary to give effect to the aforesaid investment.`;
    } else if (resType === "office_lease") {
      resolutionText = `RESOLVED THAT pursuant to Section 179 of the Companies Act, 2013, the Board hereby approves the entering into of a Lease / Leave & License Agreement for the premises at ${e.br_contract_party || "[Premises Address]"} for the purposes of the Company's business.

RESOLVED FURTHER THAT ${e.br_authorized_person || "[Authorised Person]"}, ${e.br_authorized_designation || "Director"}, be and is hereby authorised to negotiate, finalise, and execute the Lease / Leave & License Agreement and all ancillary documents on behalf of the Company.`;
    } else if (resType === "vendor_contract") {
      resolutionText = `RESOLVED THAT the Board hereby approves the entering into of a Service / Vendor Agreement with ${e.br_contract_party || "[Vendor Name]"} for the value of ${e.br_contract_value ? `₹${Number(e.br_contract_value).toLocaleString("en-IN")}` : "[Contract Value]"} per annum on the terms discussed at the meeting.

RESOLVED FURTHER THAT ${e.br_authorized_person || "[Authorised Person]"}, ${e.br_authorized_designation || "Director"}, be and is hereby authorised to sign and execute the Agreement and all related documents on behalf of the Company.`;
    } else {
      resolutionText = e.br_resolution_text || `RESOLVED THAT [Insert Resolution Text]`;
    }

    blocks.push({ kind: "para", text: resolutionText });

    blocks.push({ kind: "divider" });

    blocks.push({ kind: "para", text: `There being no other business, the meeting concluded with a vote of thanks to the Chair.\n\nCertified as a True Copy of the Resolution passed at the Board Meeting held on ${meetingDate}.` });

    const signatories: { role: string; name: string }[] = [
      { role: "Chairman", name: chairman },
    ];
    if (e.br_director2) signatories.push({ role: "Director", name: e.br_director2 });
    if (e.br_company_secretary) signatories.push({ role: "Company Secretary", name: e.br_company_secretary });

    blocks.push({ kind: "signatures", parties: signatories });

    blocks.push({ kind: "footer", text: `${company} — Board Resolution · Generated by Lekha · elevana.guru` });
    return blocks;
  },
};
