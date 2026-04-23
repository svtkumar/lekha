import type { TemplateModule, DocSection } from "../types";
import { formatDate } from "../types";

export const will: TemplateModule = {
  meta: {
    id: "will",
    name: "Will / Last Testament",
    categoryId: "personal",
    category: "Personal & Family",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Last Will and Testament with executor, beneficiaries, specific bequests and residuary estate distribution.",
    aliases: ["testament", "last will"],
    pages: 4,
    minutes: 10,
    status: "live",
  },
  groups: [
    {
      title: "Testator details",
      fields: [
        { id: "w_name", label: "Full name", type: "text", required: true },
        { id: "w_parent", label: "S/o, D/o, or W/o", type: "text", required: true },
        { id: "w_age", label: "Age", type: "number", required: true },
        { id: "w_occupation", label: "Occupation", type: "text" },
        { id: "w_religion", label: "Religion", type: "text", placeholder: "Hindu / Muslim / Christian / Sikh / Other", help: "Affects applicable succession laws if no will." },
        { id: "w_addr", label: "Permanent address", type: "textarea", rows: 2, required: true },
        { id: "w_date", label: "Date of will", type: "date", required: true },
        { id: "w_city", label: "City of execution", type: "text", required: true },
      ],
    },
    {
      title: "Executor (person who carries out your wishes)",
      fields: [
        { id: "w_exec_name", label: "Executor name", type: "text", required: true },
        { id: "w_exec_rel", label: "Relationship to Testator", type: "text", placeholder: "Spouse / Son / Daughter / Friend" },
        { id: "w_exec_addr", label: "Executor address", type: "textarea", rows: 2 },
        { id: "w_alt_exec_name", label: "Alternate executor (if primary is unable)", type: "text" },
      ],
    },
    {
      title: "Bequests",
      fields: [
        { id: "w_bequests", label: "Specific bequests — one per line", type: "textarea", required: true, rows: 8, placeholder: "Flat no. 4B, Lake View Apartments, Bengaluru — to my son Rohan Sharma\n₹10,00,000 fixed deposit in HDFC Bank — to my daughter Priya Sharma\nMy gold jewellery — to my spouse Sunita Sharma\nMaruti Swift car KA-01-AB-1234 — to my son Rohan Sharma" },
        { id: "w_residuary", label: "Residuary beneficiary (gets everything not specifically bequeathed)", type: "text", required: true, placeholder: "My spouse, Sunita Sharma" },
      ],
    },
    {
      title: "Witnesses (minimum 2 required)",
      fields: [
        { id: "w_wit1_name", label: "Witness 1 name", type: "text", required: true },
        { id: "w_wit1_addr", label: "Witness 1 address", type: "textarea", rows: 2 },
        { id: "w_wit2_name", label: "Witness 2 name", type: "text", required: true },
        { id: "w_wit2_addr", label: "Witness 2 address", type: "textarea", rows: 2 },
      ],
    },
  ],
  render(values): DocSection[] {
    const bequests = (values.w_bequests || "").split("\n").map((s) => s.trim()).filter(Boolean);

    const clauses: DocSection[] = [
      { kind: "clause", number: 1, title: "Declaration", text: `I, ${values.w_name || "[Name]"}, ${values.w_parent || "[S/o, D/o, W/o]"}, aged about ${values.w_age || "[Age]"} years${values.w_occupation ? `, by occupation ${values.w_occupation}` : ""}${values.w_religion ? `, of ${values.w_religion} faith` : ""}, residing at ${values.w_addr || "[Address]"}, being of sound disposing mind, memory and understanding, and not acting under any coercion or undue influence, do hereby make, publish and declare this to be my LAST WILL AND TESTAMENT, hereby revoking all former wills, codicils and testamentary dispositions made by me.` },
      { kind: "clause", number: 2, title: "Appointment of Executor", text: `I hereby appoint ${values.w_exec_name || "[Executor]"}${values.w_exec_rel ? `, my ${values.w_exec_rel}` : ""}${values.w_exec_addr ? `, residing at ${values.w_exec_addr}` : ""}, as the Executor of this my Will. ${values.w_alt_exec_name ? `In the event that the said Executor is unable or unwilling to act or continue to act, I appoint ${values.w_alt_exec_name} as the alternate Executor.` : ""} The Executor shall have all the powers granted by law for the administration of my estate, including the power to collect, retain, invest, sell or transfer my assets as they see fit for the due discharge of my wishes set out herein.` },
      { kind: "clause", number: 3, title: "Debts & Expenses", text: `I direct my Executor to first pay out of my estate all my just debts, funeral expenses, testamentary expenses, and any taxes or statutory dues payable by or in respect of my estate.` },
      { kind: "clause", number: 4, title: "Specific Bequests", text: `Subject to the payment of debts and expenses, I hereby give, devise and bequeath the following specific items of my estate as under:` },
      { kind: "list", items: bequests.length ? bequests : ["[Please specify bequests]"], ordered: true },
      { kind: "clause", number: 5, title: "Residuary Estate", text: `All the rest, residue and remainder of my property, both movable and immovable, whatsoever and wheresoever situated, which I may own or be entitled to at the time of my death, and which has not been specifically bequeathed above (the "Residuary Estate"), I give, devise and bequeath absolutely to ${values.w_residuary || "[Residuary Beneficiary]"}. Should the said beneficiary predecease me, the Residuary Estate shall devolve upon my legal heirs according to the law of intestate succession applicable to me.` },
      { kind: "clause", number: 6, title: "Survivorship", text: `If any beneficiary named in this Will predeceases me or fails to survive me by 30 (thirty) days, their share shall lapse and be distributed under the Residuary Clause above, unless otherwise specified.` },
      { kind: "clause", number: 7, title: "Guardianship", text: `In the event that I leave behind any minor children at the time of my death, I appoint my Executor as their legal guardian until they attain the age of majority.` },
      { kind: "clause", number: 8, title: "Declaration of Sound Mind", text: `I declare that I am executing this Will of my own free will, without any coercion, undue influence or fraud, and that I am fully aware of the contents hereof. This Will consists of pages numbered 1 to the last page, each of which has been signed by me in the presence of the witnesses named below.` },
    ];

    return [
      { kind: "title", text: "Last Will and Testament" },
      { kind: "subtitle", text: `Executed at ${values.w_city || "[City]"} on ${formatDate(values.w_date)}` },
      ...clauses,
      { kind: "spacer", height: 2 },
      { kind: "para", text: `IN WITNESS WHEREOF, I, ${values.w_name || "[Name]"}, have signed this my Last Will and Testament at ${values.w_city || "[City]"} on this ${formatDate(values.w_date) || "[Date]"} in the presence of the witnesses named below, all of whom have signed in my presence and in the presence of each other.` },
      { kind: "spacer", height: 2 },
      { kind: "signatures", parties: [
        { role: "TESTATOR", name: values.w_name || "[Testator]" },
        { role: "WITNESS 1", name: `${values.w_wit1_name || "[Witness 1]"}${values.w_wit1_addr ? `\n${values.w_wit1_addr}` : ""}` },
        { role: "WITNESS 2", name: `${values.w_wit2_name || "[Witness 2]"}${values.w_wit2_addr ? `\n${values.w_wit2_addr}` : ""}` },
      ]},
      { kind: "spacer", height: 1 },
      { kind: "para", text: "Note: Under the Indian Succession Act, 1925, a will need not be compulsorily registered; however, registration provides additional authenticity. A will should be revisited whenever there is a significant change in family circumstances or assets. This template is a starting point — consult a lawyer for complex estates.", align: "left" },
    ];
  },
};
