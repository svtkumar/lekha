import type { TemplateModule, DocSection } from "../types";
import { formatDate } from "../types";

export const powerOfAttorney: TemplateModule = {
  meta: {
    id: "power-of-attorney",
    name: "Power of Attorney",
    categoryId: "property",
    category: "Property",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "General or Special Power of Attorney for property transactions, banking, or personal representation. Revocable.",
    aliases: ["POA", "GPA", "SPA"],
    pages: 4,
    minutes: 9,
    status: "live",
  },
  groups: [
    {
      title: "POA basics",
      fields: [
        { id: "poa_type", label: "POA type", type: "radio", required: true, options: [
          { value: "general", label: "General POA (broad authority)" },
          { value: "special", label: "Special POA (limited to specific acts)" },
        ], default: "special" },
        { id: "poa_date", label: "Date of execution", type: "date", required: true },
        { id: "poa_city", label: "City of execution", type: "text", required: true },
        { id: "poa_state", label: "State", type: "text", required: true },
      ],
    },
    {
      title: "Principal (Executant / Grantor)",
      fields: [
        { id: "poa_p_name", label: "Principal name", type: "text", required: true },
        { id: "poa_p_parent", label: "S/o, D/o, W/o", type: "text", required: true },
        { id: "poa_p_age", label: "Age", type: "number", required: true },
        { id: "poa_p_occupation", label: "Occupation", type: "text" },
        { id: "poa_p_addr", label: "Principal address", type: "textarea", rows: 2, required: true },
      ],
    },
    {
      title: "Attorney (Agent / Attorney-in-Fact)",
      fields: [
        { id: "poa_a_name", label: "Attorney name", type: "text", required: true },
        { id: "poa_a_parent", label: "S/o, D/o, W/o", type: "text", required: true },
        { id: "poa_a_age", label: "Age", type: "number" },
        { id: "poa_a_rel", label: "Relationship to Principal", type: "text", placeholder: "Son / Daughter / Spouse / Friend / None" },
        { id: "poa_a_addr", label: "Attorney address", type: "textarea", rows: 2, required: true },
      ],
    },
    {
      title: "Scope of authority",
      fields: [
        { id: "poa_property_desc", label: "Property description (if POA is for property)", type: "textarea", rows: 3, placeholder: "Flat No. 4B, Lake View Apartments, Indiranagar, Bengaluru 560038" },
        { id: "poa_acts", label: "Specific acts authorised (one per line)", type: "textarea", required: true, rows: 8, placeholder: "To sign, verify and present documents before the Sub-Registrar for registration of the sale deed of the above property\nTo collect sale consideration and issue receipts therefor\nTo operate my bank account no. XXXXXXXXX2345 with HDFC Bank, Indiranagar Branch\nTo represent me before the income tax authorities in respect of AY 2025-26" },
        { id: "poa_duration", label: "Duration", type: "select", required: true, options: [
          { value: "until_revoked", label: "Until revoked in writing" },
          { value: "one_year", label: "1 year" },
          { value: "specific_purpose", label: "Until specific purpose is achieved" },
          { value: "till_date", label: "Until specific date" },
        ], default: "specific_purpose" },
        { id: "poa_end_date", label: "End date (if specified)", type: "date" },
        { id: "poa_sub_power", label: "Allow substitution / sub-delegation?", type: "radio", options: [
          { value: "no", label: "No" },
          { value: "yes", label: "Yes — attorney may appoint sub-attorneys" },
        ], default: "no" },
      ],
    },
  ],
  render(values): DocSection[] {
    const isGeneral = values.poa_type === "general";
    const acts = (values.poa_acts || "").split("\n").map((s) => s.trim()).filter(Boolean);
    const durationText = {
      until_revoked: "until the same is revoked by me in writing",
      one_year: "for a period of 1 (one) year from the date hereof",
      specific_purpose: "until the specific purpose for which this Power of Attorney has been granted is accomplished",
      till_date: `until ${formatDate(values.poa_end_date) || "[End Date]"}, unless revoked earlier by me in writing`,
    }[values.poa_duration || "until_revoked"];

    const clauses: DocSection[] = [
      { kind: "clause", number: 1, title: "Appointment", text: `I, ${values.poa_p_name || "[Principal]"}, ${values.poa_p_parent || "[Parent Name]"}, aged about ${values.poa_p_age || "[Age]"} years${values.poa_p_occupation ? `, by occupation ${values.poa_p_occupation}` : ""}, residing at ${values.poa_p_addr || "[Address]"} (hereinafter referred to as the "Principal"), do hereby nominate, constitute and appoint ${values.poa_a_name || "[Attorney]"}, ${values.poa_a_parent || "[Parent]"}${values.poa_a_age ? `, aged about ${values.poa_a_age} years` : ""}${values.poa_a_rel ? `, my ${values.poa_a_rel}` : ""}, residing at ${values.poa_a_addr || "[Address]"} (hereinafter referred to as the "Attorney"), to be my true and lawful attorney to do and execute on my behalf all or any of the following acts, deeds, matters and things${values.poa_property_desc ? ` in relation to the property more particularly described below:` : ":"}` },
    ];

    if (values.poa_property_desc) {
      clauses.push({ kind: "clause", number: 2, title: "Property", text: `The property in respect of which this Power of Attorney is being executed is: ${values.poa_property_desc}.` });
    }

    const actsClauseNum = clauses.length + 1;
    clauses.push({ kind: "clause", number: actsClauseNum, title: "Authorities Conferred", text: `The Attorney is hereby authorised to do, execute and perform on behalf of the Principal the following acts, deeds and things, namely:` });
    clauses.push({ kind: "list", items: acts.length ? acts : ["[Please specify the acts authorised]"], ordered: true });

    if (isGeneral) {
      clauses.push({
        kind: "clause", number: clauses.length + 1, title: "General Powers",
        text: `Without prejudice to the generality of the above, the Attorney shall have full authority to do all such acts, deeds, matters and things necessary or incidental to the effective exercise of the powers herein conferred, including to sign, execute, attest, verify, present and register such deeds, documents, forms, affidavits, vakalatnamas and other papers as may be required, to appear before any court, tribunal, authority, registrar, sub-registrar, police, bank, or any statutory body, and to receive or pay monies and give valid receipts therefor.`,
      });
    }

    clauses.push({ kind: "clause", number: clauses.length + 1, title: "Duration & Revocation", text: `This Power of Attorney shall be in force ${durationText}. It may be revoked by the Principal at any time by giving written notice to the Attorney, such revocation being effective only from the date of receipt of such notice by the Attorney.` });

    clauses.push({ kind: "clause", number: clauses.length + 1, title: "Substitution", text: values.poa_sub_power === "yes"
      ? `The Attorney is hereby authorised to appoint one or more sub-attorneys for any of the acts hereby authorised, and to revoke such appointments. The Principal shall remain bound by the acts of such sub-attorneys as if they had been done by the Attorney directly.`
      : `The Attorney shall not have the right to appoint or substitute any other person to exercise any of the powers hereby conferred. All acts done under this Power of Attorney must be performed personally by the Attorney.`,
    });

    clauses.push({
      kind: "clause", number: clauses.length + 1, title: "Ratification",
      text: `I hereby ratify and confirm all acts, deeds and things lawfully done by the Attorney under and by virtue of this Power of Attorney as if the same had been done by me personally.`,
    });

    clauses.push({
      kind: "clause", number: clauses.length + 1, title: "Binding Effect",
      text: `This Power of Attorney shall bind me, my heirs, legal representatives, executors and administrators. It shall not stand revoked or terminated by any subsequent incapacity of the Principal unless such incapacity affects the Principal's legal capacity to grant a Power of Attorney under law.`,
    });

    return [
      { kind: "title", text: isGeneral ? "General Power of Attorney" : "Special Power of Attorney" },
      { kind: "subtitle", text: `Executed at ${values.poa_city || "[City]"}, ${values.poa_state || "[State]"} on ${formatDate(values.poa_date)}` },
      { kind: "para", text: `TO ALL TO WHOM THESE PRESENTS SHALL COME, I, ${values.poa_p_name || "[Principal]"}, the Principal named herein, SEND GREETINGS.` },
      { kind: "para", text: `KNOW YE ALL by these presents that:` },
      { kind: "divider" },
      ...clauses,
      { kind: "spacer", height: 2 },
      { kind: "para", text: `IN WITNESS WHEREOF, I, ${values.poa_p_name || "[Principal]"}, have set my hand to this Power of Attorney on this ${formatDate(values.poa_date) || "[Date]"} at ${values.poa_city || "[City]"}, ${values.poa_state || "[State]"}.` },
      { kind: "spacer", height: 2 },
      { kind: "signatures", parties: [
        { role: "PRINCIPAL", name: values.poa_p_name || "[Principal]" },
        { role: "ATTORNEY (Accepted)", name: values.poa_a_name || "[Attorney]" },
        { role: "WITNESS 1", name: "Name: _______________________" },
        { role: "WITNESS 2", name: "Name: _______________________" },
      ]},
      { kind: "para", text: "Note: For property-related POAs in India, this document typically requires notarisation and, in some states (e.g. Maharashtra, Delhi), registration under the Registration Act 1908. A General POA authorising immovable-property transactions may require stamping and registration.", align: "left" },
    ];
  },
};
