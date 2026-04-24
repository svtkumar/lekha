import type { TemplateModule, DocSection } from "../types";
import { formatDate } from "../types";

export const giftDeed: TemplateModule = {
  meta: {
    id: "gift-deed",
    name: "Gift Deed",
    categoryId: "property",
    category: "Property",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Transfer of property as gift — with blood-relative stamp duty guidance under the Transfer of Property Act 1882 and state stamp duty laws.",
    aliases: ["gift property"],
    pages: 6,
    minutes: 10,
    status: "live",
  },
  groups: [
    {
      title: "Deed basics",
      fields: [
        { id: "gd_date", label: "Date of execution", type: "date", required: true },
        { id: "gd_city", label: "City", type: "text", required: true },
        { id: "gd_state", label: "State", type: "text", required: true },
      ],
    },
    {
      title: "Donor (person giving the gift)",
      fields: [
        { id: "gd_donor_name", label: "Donor full name", type: "text", required: true },
        { id: "gd_donor_parent", label: "S/o, D/o, W/o", type: "text", required: true },
        { id: "gd_donor_age", label: "Age", type: "number", required: true },
        { id: "gd_donor_addr", label: "Donor address", type: "textarea", rows: 2, required: true },
        { id: "gd_donor_pan", label: "Donor PAN", type: "text" },
      ],
    },
    {
      title: "Donee (person receiving the gift)",
      fields: [
        { id: "gd_donee_name", label: "Donee full name", type: "text", required: true },
        { id: "gd_donee_parent", label: "S/o, D/o, W/o", type: "text", required: true },
        { id: "gd_donee_age", label: "Age", type: "number", required: true },
        { id: "gd_donee_addr", label: "Donee address", type: "textarea", rows: 2, required: true },
        { id: "gd_donee_relation", label: "Relationship to Donor", type: "text", required: true, placeholder: "Son / Daughter / Spouse / Sibling", help: "Blood-relative gifts typically get stamp duty concessions in most states." },
      ],
    },
    {
      title: "Property being gifted",
      fields: [
        { id: "gd_prop_type", label: "Property type", type: "select", required: true, options: [{value:"residential",label:"Residential"},{value:"commercial",label:"Commercial"},{value:"agricultural",label:"Agricultural land"},{value:"movable",label:"Movable property (jewellery, vehicles, shares)"}]},
        { id: "gd_prop_desc", label: "Detailed description", type: "textarea", rows: 4, required: true, placeholder: "Flat No. 4B, 2 BHK, 1250 sq ft built-up, Lake View Apartments, Indiranagar, Bengaluru 560038; bounded by — North: Flat 4A; South: Corridor; East: Main Road; West: Parking." },
        { id: "gd_prop_value", label: "Market value (₹) for stamp duty", type: "number", required: true },
        { id: "gd_acquisition", label: "How Donor acquired the property", type: "textarea", rows: 2, placeholder: "Purchased vide Sale Deed dated [date] registered at SRO [office], Reg No. [number]" },
      ],
    },
  ],
  render(values): DocSection[] {
    const val = Number(values.gd_prop_value || 0);
    const isBloodRel = ["son", "daughter", "spouse", "husband", "wife", "father", "mother", "brother", "sister", "grandson", "granddaughter"]
      .some((r) => (values.gd_donee_relation || "").toLowerCase().includes(r));

    const clauses: DocSection[] = [
      { kind: "clause", number: 1, title: "Recitals", text: `WHEREAS the Donor is the absolute owner in peaceful and exclusive possession of the property more particularly described in the Schedule hereunder (hereinafter referred to as the "Gifted Property"), having acquired the same ${values.gd_acquisition || "[Mode of Acquisition]"};` },
      { kind: "clause", number: 2, title: "Intent", text: `AND WHEREAS the Donor, out of natural love and affection for the Donee, who is the Donor's ${values.gd_donee_relation || "[Relation]"}, and without any consideration whatsoever, desires to gift the Gifted Property to the Donee absolutely and forever.` },
      { kind: "clause", number: 3, title: "Gift", text: `NOW THIS DEED WITNESSETH that the Donor, out of natural love and affection for the Donee, and without any monetary consideration, hereby GIFTS, CONVEYS, TRANSFERS, ASSURES, AND ASSIGNS absolutely unto and in favour of the Donee, the Gifted Property TO HAVE AND TO HOLD the same unto and to the use of the Donee absolutely and forever.` },
      { kind: "clause", number: 4, title: "Delivery of Possession", text: `The Donor has this day delivered peaceful and vacant possession of the Gifted Property to the Donee, and the Donee hereby acknowledges the receipt of such possession and accepts the gift.` },
      { kind: "clause", number: 5, title: "Donor's Covenants", text: `The Donor covenants with the Donee that: (a) the Donor is the sole and absolute owner of the Gifted Property; (b) the Gifted Property is free from all encumbrances, mortgages, charges, liens, attachments, prior agreements and disputes of whatsoever nature; (c) the Donor has full right, power and authority to make this gift; (d) the Donor has not entered into any prior agreement for sale, mortgage, gift or lease of the Gifted Property; (e) the Donor shall execute such further documents and do such further acts as may be reasonably required to effectuate this gift.` },
      { kind: "clause", number: 6, title: "Donee's Acceptance", text: `The Donee hereby accepts the aforesaid gift and undertakes to hold the Gifted Property absolutely, pay all future municipal taxes and other statutory dues, and mutate the records in the Donee's name.` },
      { kind: "clause", number: 7, title: "Irrevocability", text: `This gift is absolute, irrevocable and unconditional. The Donor shall have no right whatsoever to revoke or cancel this gift, except as may be permitted under section 126 of the Transfer of Property Act, 1882.` },
      { kind: "clause", number: 8, title: "Market Value & Stamp Duty", text: `For the purpose of stamp duty and registration, the Gifted Property is valued at ₹ ${val.toLocaleString("en-IN")}/-. ${isBloodRel ? `Since the Donee is the Donor's ${values.gd_donee_relation}, a blood relative, the parties have applied the concessional rate of stamp duty, if any, as prescribed by the Stamp Act / State rules applicable to ${values.gd_state || "[State]"}.` : `Stamp duty has been paid at the rate applicable under the Stamp Act / State rules of ${values.gd_state || "[State]"}.`} The stamp paper of appropriate value has been affixed, and the deed shall be duly registered with the Sub-Registrar of the jurisdiction in which the Gifted Property is situated.` },
      { kind: "clause", number: 9, title: "Schedule", text: `SCHEDULE: The Gifted Property is: ${values.gd_prop_desc || "[Property Description]"}` },
    ];

    return [
      { kind: "title", text: "Deed of Gift" },
      { kind: "subtitle", text: `Executed at ${values.gd_city || "[City]"}, ${values.gd_state || "[State]"} on ${formatDate(values.gd_date)}` },
      { kind: "para", text: `THIS DEED OF GIFT is made and executed on this ${formatDate(values.gd_date) || "[Date]"} at ${values.gd_city || "[City]"}, ${values.gd_state || "[State]"} BY AND BETWEEN:` },
      { kind: "party", role: "Donor", name: `${values.gd_donor_name || "[Donor]"}, ${values.gd_donor_parent || "[Parent]"}, aged ${values.gd_donor_age || "[Age]"} years${values.gd_donor_pan ? `, PAN: ${values.gd_donor_pan}` : ""}`, address: values.gd_donor_addr },
      { kind: "party", role: "Donee", name: `${values.gd_donee_name || "[Donee]"}, ${values.gd_donee_parent || "[Parent]"}, aged ${values.gd_donee_age || "[Age]"} years (${values.gd_donee_relation || "[Relation]"} of the Donor)`, address: values.gd_donee_addr },
      { kind: "divider" },
      ...clauses,
      { kind: "signatures", parties: [
        { role: "DONOR", name: values.gd_donor_name || "[Donor]" },
        { role: "DONEE (Accepted)", name: values.gd_donee_name || "[Donee]" },
        { role: "WITNESS 1", name: "Name: _______________________" },
        { role: "WITNESS 2", name: "Name: _______________________" },
      ]},
      { kind: "para", text: "Note: This Deed of Gift must be executed on non-judicial stamp paper of appropriate value as per the State stamp rules and registered with the jurisdictional Sub-Registrar within 4 (four) months of execution under the Registration Act, 1908.", align: "left" },
    ];
  },
};
