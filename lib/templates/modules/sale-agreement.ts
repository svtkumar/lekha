import type { TemplateModule, DocSection } from "../types";

export const saleAgreement: TemplateModule = {
  meta: {
    id: "sale-agreement",
    name: "Sale Agreement (Agreement to Sell)",
    categoryId: "property",
    category: "Property",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Agreement to sell immovable property with payment milestones, possession schedule, and default provisions. Precedes the registered Sale Deed. Complies with Transfer of Property Act 1882 and Registration Act 1908.",
    aliases: ["agreement to sell", "ATS", "property purchase agreement", "sale agreement", "property sale agreement"],
    pages: 12,
    minutes: 15,
    status: "live",
  },
  groups: [
    {
      title: "Vendor (Seller) details",
      fields: [
        { id: "sa_vendor_name", label: "Vendor full name", type: "text", required: true, placeholder: "Ramesh Kumar Sharma" },
        { id: "sa_vendor_addr", label: "Vendor address", type: "textarea", rows: 2, required: true },
        { id: "sa_vendor_pan", label: "Vendor PAN", type: "text", placeholder: "AABCS1234D" },
        { id: "sa_vendor_aadhar", label: "Vendor Aadhaar (last 4 digits)", type: "text", placeholder: "XXXX" },
      ],
    },
    {
      title: "Purchaser (Buyer) details",
      fields: [
        { id: "sa_purchaser_name", label: "Purchaser full name", type: "text", required: true, placeholder: "Priya Nair" },
        { id: "sa_purchaser_addr", label: "Purchaser address", type: "textarea", rows: 2, required: true },
        { id: "sa_purchaser_pan", label: "Purchaser PAN", type: "text", placeholder: "AABCP5678E" },
        { id: "sa_purchaser_company", label: "Purchaser company (if buying through entity)", type: "text" },
      ],
    },
    {
      title: "Property details",
      fields: [
        { id: "sa_property_desc", label: "Full property description / address", type: "textarea", rows: 3, required: true, placeholder: "All that piece and parcel of residential flat bearing No. 4B, 4th Floor, Prestige Towers, Survey No. 45/2A, Koramangala, Bengaluru – 560 095, measuring 1,200 sq ft carpet area…" },
        { id: "sa_state", label: "State where property is located", type: "text", required: true, placeholder: "Karnataka" },
        { id: "sa_city", label: "City / jurisdiction", type: "text", required: true, placeholder: "Bengaluru" },
        { id: "sa_area_sqft", label: "Area (sq ft)", type: "text", placeholder: "1200" },
        { id: "sa_survey_no", label: "Survey / Khasra / Plot / CTS No.", type: "text", placeholder: "Survey No. 45/2A" },
        { id: "sa_title_document", label: "Title document reference", type: "text", placeholder: "Sale Deed dated 12/06/2018 registered as Doc No. 456/2018" },
      ],
    },
    {
      title: "Financial terms",
      fields: [
        { id: "sa_total_consideration", label: "Total sale consideration (₹)", type: "number", required: true, placeholder: "7500000" },
        { id: "sa_token_amount", label: "Token / earnest money paid (₹)", type: "number", required: true, placeholder: "500000" },
        { id: "sa_token_date", label: "Date of token payment", type: "date" },
        { id: "sa_second_instalment", label: "Second instalment amount (₹)", type: "number", placeholder: "2000000" },
        { id: "sa_second_instalment_date", label: "Second instalment due date", type: "date" },
        { id: "sa_balance_amount", label: "Balance amount payable at registration (₹)", type: "number", placeholder: "5000000" },
        { id: "sa_registration_deadline", label: "Deadline for execution of Sale Deed", type: "date" },
      ],
    },
    {
      title: "Possession & conditions",
      fields: [
        { id: "sa_possession_date", label: "Possession handover date", type: "date" },
        { id: "sa_possession_condition", label: "Possession condition", type: "select", default: "vacant", options: [
          { value: "vacant", label: "Vacant possession" },
          { value: "as_is", label: "As-is basis (with existing occupants/fixtures)" },
          { value: "on_registration", label: "On execution of Sale Deed" },
        ]},
        { id: "sa_encumbrance", label: "Property encumbrance status", type: "select", default: "free", options: [
          { value: "free", label: "Free from all encumbrances" },
          { value: "mortgage", label: "Under mortgage — to be discharged before registration" },
        ]},
        { id: "sa_mortgage_bank", label: "Mortgaged bank (if applicable)", type: "text", placeholder: "HDFC Bank" },
        { id: "sa_mortgage_amount", label: "Outstanding mortgage amount (₹)", type: "number", placeholder: "3500000" },
      ],
    },
  ],
  render(e): DocSection[] {
    const blocks: DocSection[] = [];
    const vendor = e.sa_vendor_name || "[Vendor Name]";
    const purchaser = e.sa_purchaser_name || "[Purchaser Name]";
    const city = e.sa_city || "[City]";
    const state = e.sa_state || "[State]";
    const total = e.sa_total_consideration ? `₹${Number(e.sa_total_consideration).toLocaleString("en-IN")}` : "[Total Consideration]";
    const token = e.sa_token_amount ? `₹${Number(e.sa_token_amount).toLocaleString("en-IN")}` : "[Token Amount]";
    const balance = e.sa_balance_amount ? `₹${Number(e.sa_balance_amount).toLocaleString("en-IN")}` : "[Balance Amount]";

    blocks.push({
      kind: "info",
      title: "Agreement to Sell — Key Legal Points",
      acts: [
        "Transfer of Property Act 1882 — s.54 (Sale defined), s.55 (Rights & liabilities)",
        "Registration Act 1908 — s.17 (Compulsory registration for sale deeds)",
        "Indian Stamp Act 1899 — Stamp duty on agreements to sell",
        "IT Act 1961 — s.194-IA (TDS @ 1% if consideration ≥ ₹50 lakh)",
      ],
      text: "An Agreement to Sell is not the same as a Sale Deed. Title does not pass until the Sale Deed is registered. The vendor must disclose all encumbrances. Stamp duty on this agreement varies by state.",
    });

    blocks.push({ kind: "title", text: "AGREEMENT TO SELL" });
    blocks.push({ kind: "subtitle", text: `Transfer of Property Act, 1882 | ${city}, ${state}` });
    blocks.push({ kind: "divider" });

    blocks.push({ kind: "para", text: `THIS AGREEMENT TO SELL is made on ${e.sa_token_date ? new Date(e.sa_token_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Date]"}, at ${city}, BETWEEN:` });

    blocks.push({ kind: "party", role: "VENDOR (SELLER)", name: vendor, address: e.sa_vendor_addr || "", rep: e.sa_vendor_pan ? `PAN: ${e.sa_vendor_pan}` : undefined });
    blocks.push({ kind: "party", role: "PURCHASER (BUYER)", name: e.sa_purchaser_company ? `${purchaser}, on behalf of ${e.sa_purchaser_company}` : purchaser, address: e.sa_purchaser_addr || "", rep: e.sa_purchaser_pan ? `PAN: ${e.sa_purchaser_pan}` : undefined });

    const clauses: DocSection[] = [
      {
        kind: "clause", number: 1, title: "Property",
        text: `The Vendor agrees to sell, and the Purchaser agrees to purchase, the following immovable property ("Property"): ${e.sa_property_desc || "[Property Description]"}${e.sa_survey_no ? ` (${e.sa_survey_no})` : ""}${e.sa_area_sqft ? `, measuring approximately ${e.sa_area_sqft} sq ft` : ""}. ${e.sa_title_document ? `The Vendor's title is derived from: ${e.sa_title_document}.` : ""}`,
      },
      {
        kind: "clause", number: 2, title: "Sale Consideration",
        text: `The total sale consideration agreed between the Parties is ${total} (Rupees ${Number(e.sa_total_consideration || 0).toLocaleString("en-IN")} only), to be paid as follows: (a) Token/Earnest Money: ${token} paid on the date of this Agreement${e.sa_token_date ? ` (${new Date(e.sa_token_date).toLocaleDateString("en-IN")})` : ""}; ${e.sa_second_instalment ? `(b) Second Instalment: ₹${Number(e.sa_second_instalment).toLocaleString("en-IN")} payable by ${e.sa_second_instalment_date ? new Date(e.sa_second_instalment_date).toLocaleDateString("en-IN") : "[Date]"};` : ""} ${e.sa_balance_amount ? `(${e.sa_second_instalment ? "c" : "b"}) Balance at Registration: ${balance} payable at the time of execution and registration of the Sale Deed.` : ""}`,
      },
      {
        kind: "clause", number: 3, title: "Title and Encumbrances",
        text: `The Vendor warrants that the Property is ${e.sa_encumbrance === "mortgage" ? `presently mortgaged with ${e.sa_mortgage_bank || "[Bank]"} for an outstanding amount of approximately ${e.sa_mortgage_amount ? `₹${Number(e.sa_mortgage_amount).toLocaleString("en-IN")}` : "[amount]"}, which shall be fully discharged and a No-Dues Certificate obtained prior to execution of the Sale Deed` : "free from all encumbrances, mortgages, charges, liens, attachments, and litigation"}. The Vendor has good and marketable title to the Property and is entitled to sell the same.`,
      },
      {
        kind: "clause", number: 4, title: "Sale Deed Execution",
        text: `Both Parties agree to execute the Sale Deed and get it registered before the Sub-Registrar of Assurances having jurisdiction over the Property, on or before ${e.sa_registration_deadline ? new Date(e.sa_registration_deadline).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Registration Deadline]"}. The cost of stamp duty, registration fees, and other charges for registration of the Sale Deed shall be borne by the Purchaser unless otherwise agreed.`,
      },
      {
        kind: "clause", number: 5, title: "Possession",
        text: `The Vendor shall hand over ${e.sa_possession_condition === "as_is" ? "as-is" : "vacant and peaceful"} possession of the Property to the Purchaser ${e.sa_possession_date ? `on or before ${new Date(e.sa_possession_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}` : "on execution of the Sale Deed"}.`,
      },
      {
        kind: "clause", number: 6, title: "TDS Obligation",
        text: `If the total sale consideration equals or exceeds ₹50,00,000 (Fifty Lakhs), the Purchaser shall deduct tax at source (TDS) at the rate of 1% of the total consideration under Section 194-IA of the Income Tax Act, 1961, and deposit the same with the Income Tax Department, and provide Form 16B to the Vendor.`,
      },
      {
        kind: "clause", number: 7, title: "Default by Vendor",
        text: "In the event the Vendor fails or refuses to execute the Sale Deed within the stipulated time despite the Purchaser being ready and willing, the Purchaser shall be entitled to: (a) enforce specific performance of this Agreement before the competent court; or (b) receive refund of the earnest money paid along with interest at 18% per annum from the date of default, as liquidated damages.",
      },
      {
        kind: "clause", number: 8, title: "Default by Purchaser",
        text: "In the event the Purchaser fails to pay the balance consideration or complete the purchase within the stipulated time for reasons attributable solely to the Purchaser, the Vendor shall be entitled to forfeit the earnest money paid as liquidated damages, after giving 30 days' written notice to the Purchaser.",
      },
      {
        kind: "clause", number: 9, title: "Governing Law",
        text: `This Agreement shall be governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of the courts at ${city}, ${state}.`,
      },
    ];

    clauses.forEach(c => blocks.push(c));

    blocks.push({ kind: "divider" });
    blocks.push({ kind: "para", text: "IN WITNESS WHEREOF the Parties have signed this Agreement to Sell on the date first written above." });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "VENDOR", name: vendor },
        { role: "PURCHASER", name: purchaser },
        { role: "Witness 1", name: "___________________" },
        { role: "Witness 2", name: "___________________" },
      ],
    });

    blocks.push({ kind: "footer", text: "Agreement to Sell · Generated by Lekha · elevana.guru" });
    return blocks;
  },
};
