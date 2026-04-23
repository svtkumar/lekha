import type { TemplateModule, DocSection } from "../types";
import { formatDate } from "../types";

export const affidavit: TemplateModule = {
  meta: {
    id: "affidavit",
    name: "Affidavit",
    categoryId: "personal",
    category: "Personal & Family",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "General-purpose sworn affidavit — name change, address, date-of-birth, income, education gap, and custom declarations.",
    aliases: ["sworn statement", "name change", "DOB affidavit"],
    pages: 2,
    minutes: 5,
    status: "live",
  },
  groups: [
    {
      title: "Deponent details",
      fields: [
        { id: "af_name", label: "Full name", type: "text", required: true },
        { id: "af_parent", label: "S/o, D/o, or W/o", type: "text", required: true, placeholder: "S/o Ramesh Kumar" },
        { id: "af_age", label: "Age (years)", type: "number", required: true },
        { id: "af_occupation", label: "Occupation", type: "text", placeholder: "Business / Service / Homemaker / Student" },
        { id: "af_addr", label: "Permanent address", type: "textarea", required: true, rows: 2 },
        { id: "af_id_type", label: "ID proof type", type: "select", options: [
          { value: "aadhaar", label: "Aadhaar" },
          { value: "passport", label: "Passport" },
          { value: "voter", label: "Voter ID" },
          { value: "driving", label: "Driving Licence" },
          { value: "pan", label: "PAN" },
        ]},
        { id: "af_id_number", label: "ID number (last 4 only)", type: "text", placeholder: "XXXX-XXXX-1234" },
      ],
    },
    {
      title: "Affidavit type & purpose",
      fields: [
        { id: "af_type", label: "Type", type: "select", required: true, options: [
          { value: "name_change", label: "Name change" },
          { value: "address", label: "Address proof" },
          { value: "dob", label: "Date of birth" },
          { value: "income", label: "Income declaration" },
          { value: "gap", label: "Education / employment gap" },
          { value: "custom", label: "General / custom" },
        ]},
        { id: "af_purpose", label: "Purpose (where it will be submitted)", type: "text", required: true, placeholder: "For submission to Regional Passport Office" },
        { id: "af_city", label: "City of execution", type: "text", required: true },
        { id: "af_state", label: "State", type: "text", required: true },
        { id: "af_date", label: "Date of execution", type: "date", required: true },
      ],
    },
    {
      title: "Declaration details",
      fields: [
        { id: "af_old_name", label: "Old / former name (for name-change only)", type: "text" },
        { id: "af_new_name", label: "New name (for name-change only)", type: "text" },
        { id: "af_dob", label: "Date of birth (for DOB affidavit)", type: "date" },
        { id: "af_annual_income", label: "Annual income in ₹ (for income affidavit)", type: "number" },
        { id: "af_gap_from", label: "Gap period from (for gap affidavit)", type: "date" },
        { id: "af_gap_to", label: "Gap period to", type: "date" },
        { id: "af_gap_reason", label: "Reason for gap", type: "textarea", rows: 3 },
        { id: "af_custom_statements", label: "Custom statements (one per line, for general affidavit)", type: "textarea", rows: 5 },
      ],
    },
  ],
  render(values): DocSection[] {
    const intro = `I, ${values.af_name || "[Name]"}, ${values.af_parent || "[S/o, D/o, W/o]"}, aged about ${values.af_age || "[Age]"} years, ${values.af_occupation ? `by occupation ${values.af_occupation}, ` : ""}residing at ${values.af_addr || "[Address]"}, do hereby solemnly affirm and declare on oath as follows:`;

    const clauses: DocSection[] = [
      { kind: "clause", number: 1, title: "Identity", text: `That I am a citizen of India and am competent to swear this affidavit.` },
    ];

    switch (values.af_type) {
      case "name_change":
        clauses.push(
          { kind: "clause", number: 2, title: "Name Change Declaration", text: `That my name has been recorded variously as "${values.af_old_name || "[Old Name]"}" in certain documents. Henceforth, I wish to be known as and called by the name "${values.af_new_name || "[New Name]"}" for all purposes.` },
          { kind: "clause", number: 3, title: "Binding Effect", text: `That the names "${values.af_old_name || "[Old Name]"}" and "${values.af_new_name || "[New Name]"}" refer to one and the same person, i.e., the Deponent. I hereby request all authorities and persons concerned to treat the said names as referring to me.` },
          { kind: "clause", number: 4, title: "Intent", text: `That I shall use the name "${values.af_new_name || "[New Name]"}" exclusively in all my future correspondence, records, and official documents.` },
        );
        break;
      case "address":
        clauses.push(
          { kind: "clause", number: 2, title: "Address Declaration", text: `That I have been residing at the address ${values.af_addr || "[Address]"} since [date of moving in], and the same is my current and permanent address.` },
          { kind: "clause", number: 3, title: "Documentary Proof", text: `That all my documents, correspondence, bills, and official records bear or shall bear this address.` },
        );
        break;
      case "dob":
        clauses.push(
          { kind: "clause", number: 2, title: "Date of Birth Declaration", text: `That my correct date of birth is ${formatDate(values.af_dob) || "[DOB]"} and the same has been erroneously recorded differently in certain documents.` },
          { kind: "clause", number: 3, title: "Request", text: `I request all concerned authorities to treat ${formatDate(values.af_dob) || "[DOB]"} as my correct date of birth for all purposes.` },
        );
        break;
      case "income":
        clauses.push(
          { kind: "clause", number: 2, title: "Income Declaration", text: `That my annual income from all sources for the financial year is ₹ ${Number(values.af_annual_income || 0).toLocaleString("en-IN")}/-. ` },
          { kind: "clause", number: 3, title: "Source", text: `The aforesaid income has been derived from ${values.af_occupation || "[Source]"} and I do not have any income from any other undisclosed source.` },
        );
        break;
      case "gap":
        clauses.push(
          { kind: "clause", number: 2, title: "Gap Declaration", text: `That there was a gap in my ${values.af_occupation?.toLowerCase().includes("stud") ? "education" : "employment"} between ${formatDate(values.af_gap_from) || "[From]"} and ${formatDate(values.af_gap_to) || "[To]"}.` },
          { kind: "clause", number: 3, title: "Reason", text: `The reason for the said gap is as follows: ${values.af_gap_reason || "[Reason]"}. During the said period, I was not engaged in any unlawful activity.` },
        );
        break;
      default: {
        const stmts = (values.af_custom_statements || "").split("\n").map((s) => s.trim()).filter(Boolean);
        stmts.forEach((s, i) => clauses.push({ kind: "clause", number: 2 + i, title: "Declaration", text: s }));
        break;
      }
    }

    const nextNum = clauses.length + 1;
    clauses.push({ kind: "clause", number: nextNum, title: "Purpose", text: `That this affidavit is being made for the purpose of: ${values.af_purpose || "[Purpose]"}.` });
    clauses.push({ kind: "clause", number: nextNum + 1, title: "Truth", text: `That the contents of this affidavit are true to the best of my knowledge and belief, and nothing material has been concealed therefrom.` });

    return [
      { kind: "title", text: "Affidavit" },
      { kind: "subtitle", text: `Before ${values.af_city || "[City]"}, ${values.af_state || "[State]"} · ${formatDate(values.af_date)}` },
      { kind: "para", text: intro },
      { kind: "divider" },
      ...clauses,
      { kind: "spacer", height: 2 },
      { kind: "para", text: "DEPONENT", align: "right" },
      { kind: "spacer", height: 1 },
      { kind: "para", text: "VERIFICATION" },
      { kind: "para", text: `Verified at ${values.af_city || "[City]"} on this ${formatDate(values.af_date) || "[Date]"} that the contents of the above affidavit are true to the best of my knowledge and belief, and that no part of it is false and nothing material has been concealed therefrom.` },
      { kind: "spacer", height: 2 },
      { kind: "signatures", parties: [{ role: "DEPONENT", name: values.af_name || "[Name]" }] },
    ];
  },
};
