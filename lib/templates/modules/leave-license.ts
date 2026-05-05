import type { TemplateModule, DocSection } from "../types";

export const leaveLicense: TemplateModule = {
  meta: {
    id: "leave-license",
    name: "Leave & License Agreement",
    categoryId: "property",
    category: "Property",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Maharashtra Leave & License Agreement. Licensed premises for residential/commercial use. Complies with Maharashtra Rent Control Act 1999. Covers license fee, deposit, term, termination, and restrictions.",
    aliases: ["maharashtra rent", "licensee", "leave and license", "mumbai rent agreement", "pune rent agreement"],
    pages: 9,
    minutes: 12,
    status: "live",
  },
  groups: [
    {
      title: "Licensor details",
      fields: [
        { id: "ll_licensor_name", label: "Licensor full name", type: "text", required: true, placeholder: "Rajesh Mehta" },
        { id: "ll_licensor_addr", label: "Licensor permanent address", type: "textarea", rows: 2, required: true },
        { id: "ll_licensor_pan", label: "Licensor PAN", type: "text", placeholder: "AABCM1234D" },
        { id: "ll_licensor_aadhar", label: "Licensor Aadhaar (last 4 digits)", type: "text", placeholder: "XXXX" },
      ],
    },
    {
      title: "Licensee details",
      fields: [
        { id: "ll_licensee_name", label: "Licensee full name", type: "text", required: true, placeholder: "Sunita Patil" },
        { id: "ll_licensee_addr", label: "Licensee permanent address", type: "textarea", rows: 2, required: true },
        { id: "ll_licensee_pan", label: "Licensee PAN", type: "text", placeholder: "AABCP5678E" },
        { id: "ll_licensee_company", label: "Licensee company (if corporate)", type: "text" },
      ],
    },
    {
      title: "Premises details",
      fields: [
        { id: "ll_premises_addr", label: "Full premises address", type: "textarea", rows: 3, required: true, placeholder: "Flat No. 201, 2nd Floor, Sunrise CHS, Sector 17, Vashi, Navi Mumbai – 400 703" },
        { id: "ll_premises_type", label: "Premises type", type: "select", required: true, default: "residential_flat", options: [
          { value: "residential_flat", label: "Residential — Flat / Apartment" },
          { value: "residential_bungalow", label: "Residential — Bungalow / Row House" },
          { value: "commercial_office", label: "Commercial — Office" },
          { value: "commercial_shop", label: "Commercial — Shop / Showroom" },
        ]},
        { id: "ll_carpet_area", label: "Carpet area (sq ft)", type: "text", placeholder: "750 sq ft" },
        { id: "ll_city", label: "City / Municipal area", type: "text", required: true, placeholder: "Navi Mumbai" },
        { id: "ll_survey_no", label: "Survey / CTS / Plot No.", type: "text", placeholder: "CTS No. 456/A" },
      ],
    },
    {
      title: "License terms",
      fields: [
        { id: "ll_start_date", label: "Commencement date", type: "date", required: true },
        { id: "ll_term_months", label: "License term (months)", type: "select", required: true, default: "11", options: [
          { value: "11", label: "11 months" },
          { value: "12", label: "12 months" },
          { value: "24", label: "24 months" },
          { value: "36", label: "36 months" },
        ]},
        { id: "ll_license_fee", label: "Monthly license fee (₹)", type: "number", required: true, placeholder: "25000" },
        { id: "ll_deposit", label: "Refundable security deposit (₹)", type: "number", required: true, placeholder: "75000" },
        { id: "ll_advance_months", label: "Advance license fee months (if any)", type: "number", default: "0", placeholder: "0" },
        { id: "ll_due_day", label: "License fee due date (day of month)", type: "number", default: "5", placeholder: "5" },
        { id: "ll_escalation", label: "Annual escalation", type: "select", default: "5_pct", options: [
          { value: "none", label: "No escalation" },
          { value: "5_pct", label: "5% per annum" },
          { value: "10_pct", label: "10% per annum" },
        ]},
        { id: "ll_notice_period", label: "Notice period for termination", type: "select", default: "1", options: [
          { value: "1", label: "1 month" },
          { value: "2", label: "2 months" },
          { value: "3", label: "3 months" },
        ]},
      ],
    },
    {
      title: "Additional details",
      fields: [
        { id: "ll_purpose", label: "Purpose of license", type: "select", default: "residential", options: [
          { value: "residential", label: "Residential use only" },
          { value: "commercial", label: "Commercial / office use" },
          { value: "residential_cum_office", label: "Residential cum home office" },
        ]},
        { id: "ll_maintenance", label: "Monthly maintenance charges (₹)", type: "number", placeholder: "2000" },
        { id: "ll_parking", label: "Parking spaces included", type: "number", default: "1", placeholder: "1" },
        { id: "ll_witness1", label: "Witness 1 name", type: "text" },
        { id: "ll_witness2", label: "Witness 2 name", type: "text" },
        { id: "ll_additional_terms", label: "Additional terms / special conditions", type: "textarea", rows: 3 },
      ],
    },
  ],
  render(e): DocSection[] {
    const blocks: DocSection[] = [];
    const licensor = e.ll_licensor_name || "[Licensor Name]";
    const licensee = e.ll_licensee_name || "[Licensee Name]";
    const premises = e.ll_premises_addr || "[Premises Address]";
    const city = e.ll_city || "[City]";
    const fee = e.ll_license_fee ? `₹${Number(e.ll_license_fee).toLocaleString("en-IN")}` : "[License Fee]";
    const deposit = e.ll_deposit ? `₹${Number(e.ll_deposit).toLocaleString("en-IN")}` : "[Deposit]";
    const termMonths = e.ll_term_months || "11";
    const dueDay = e.ll_due_day || "5";
    const noticePeriod = e.ll_notice_period || "1";

    const escalationText = e.ll_escalation === "5_pct" ? "5% per annum" : e.ll_escalation === "10_pct" ? "10% per annum" : "nil";

    blocks.push({
      kind: "stamp_page",
      jurisdiction: `${city}, Maharashtra`,
      stampValue: "₹500",
      instruction: "This agreement must be executed on stamp paper of appropriate value as prescribed by the Maharashtra Stamp Act. The agreement should be registered if the term exceeds 12 months.",
      registrationNote: "Registration: Mandatory if term > 12 months (Maharashtra Registration Act, Section 17). Recommended even for 11-month agreements.",
    });

    blocks.push({ kind: "title", text: "LEAVE AND LICENSE AGREEMENT" });
    blocks.push({ kind: "subtitle", text: `Under the Maharashtra Rent Control Act, 1999 | ${city}` });
    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "para",
      text: `This Leave and License Agreement ("Agreement") is entered into on ${e.ll_start_date ? new Date(e.ll_start_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Date]"}, at ${city}, Maharashtra, BETWEEN:`,
    });

    blocks.push({
      kind: "party",
      role: "LICENSOR",
      name: licensor,
      address: e.ll_licensor_addr || "",
      rep: e.ll_licensor_pan ? `PAN: ${e.ll_licensor_pan}` : undefined,
    });

    blocks.push({
      kind: "party",
      role: "LICENSEE",
      name: e.ll_licensee_company ? `${licensee} (on behalf of ${e.ll_licensee_company})` : licensee,
      address: e.ll_licensee_addr || "",
      rep: e.ll_licensee_pan ? `PAN: ${e.ll_licensee_pan}` : undefined,
    });

    blocks.push({ kind: "para", text: "The Licensor and Licensee are collectively referred to as the \"Parties\" and individually as a \"Party\"." });

    const clauses: DocSection[] = [
      {
        kind: "clause", number: 1, title: "Nature of Agreement",
        text: `This Agreement constitutes a Leave and License within the meaning of Sections 52 and 53 of the Indian Easements Act, 1882. The Licensor hereby grants a license to the Licensee to use and occupy the premises described hereunder, for the term and on the conditions set out herein. This Agreement does not create any tenancy, lease, or any other interest in the premises in favour of the Licensee and shall not be construed as a lease or tenancy agreement under any applicable law including the Maharashtra Rent Control Act, 1999.`,
      },
      {
        kind: "clause", number: 2, title: "Premises",
        text: `The Licensor grants a license to the Licensee to use and occupy the following premises: ${premises}${e.ll_carpet_area ? `, admeasuring approximately ${e.ll_carpet_area}` : ""}${e.ll_survey_no ? ` (${e.ll_survey_no})` : ""} ("Licensed Premises"), along with ${e.ll_parking && Number(e.ll_parking) > 0 ? `${e.ll_parking} parking space(s) and ` : ""}common amenities, if any.`,
      },
      {
        kind: "clause", number: 3, title: "Term",
        text: `This Agreement shall be for a period of ${termMonths} (${termMonths === "11" ? "Eleven" : termMonths === "12" ? "Twelve" : termMonths === "24" ? "Twenty-Four" : "Thirty-Six"}) months commencing from ${e.ll_start_date ? new Date(e.ll_start_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Start Date]"} ("License Period"), unless terminated earlier in accordance with the terms hereof. The license granted under this Agreement shall not be renewed automatically and any renewal shall require a fresh agreement in writing.`,
      },
      {
        kind: "clause", number: 4, title: "License Fee",
        text: `The Licensee shall pay the Licensor a monthly license fee of ${fee} per month, payable on or before the ${dueDay}th day of each calendar month. The license fee shall be paid by account payee cheque, NEFT, RTGS, or UPI transfer. ${escalationText !== "nil" ? `The license fee shall be escalated by ${escalationText} at the commencement of each renewal period.` : "There shall be no escalation in the license fee during the License Period."}`,
      },
      {
        kind: "clause", number: 5, title: "Security Deposit",
        text: `The Licensee shall pay the Licensor a refundable interest-free security deposit of ${deposit} ("Deposit") on or before execution of this Agreement. The Deposit shall be refunded to the Licensee within 30 (thirty) days of vacation of the Licensed Premises and delivery of possession, after deducting any amounts lawfully due to the Licensor including arrears of license fee, utility charges, and cost of repair of damages caused by the Licensee beyond normal wear and tear.`,
      },
      {
        kind: "clause", number: 6, title: "Purpose",
        text: `The Licensed Premises shall be used by the Licensee exclusively for ${e.ll_purpose === "commercial" ? "commercial / office purposes" : e.ll_purpose === "residential_cum_office" ? "residential cum home office purposes" : "residential purposes"} only and for no other purpose without the prior written consent of the Licensor.`,
      },
      {
        kind: "clause", number: 7, title: "Maintenance and Utilities",
        text: `The Licensee shall pay all electricity, water, gas, and other utility charges for the Licensed Premises during the License Period. ${e.ll_maintenance && Number(e.ll_maintenance) > 0 ? `The Licensee shall additionally pay monthly maintenance charges of ₹${Number(e.ll_maintenance).toLocaleString("en-IN")} to the housing society / building management, over and above the license fee.` : "Maintenance charges, if any levied by the housing society, shall be borne by the Licensor unless otherwise agreed."}`,
      },
      {
        kind: "clause", number: 8, title: "Restrictions on Licensee",
        text: `The Licensee shall not: (a) sub-license, sub-let, or part with possession of the Licensed Premises or any part thereof without prior written consent of the Licensor; (b) carry out any structural alterations or additions to the Licensed Premises; (c) use the premises for any illegal, immoral, or hazardous purpose; (d) keep or store any inflammable or hazardous goods; (e) cause any nuisance or annoyance to neighbouring occupants; (f) install any signboard or hoarding without Licensor's written consent.`,
      },
      {
        kind: "clause", number: 9, title: "Licensor's Rights",
        text: "The Licensor shall have the right to enter and inspect the Licensed Premises with reasonable prior notice during normal business hours. The Licensor shall maintain the structure and major repairs of the building in good condition.",
      },
      {
        kind: "clause", number: 10, title: "Termination",
        text: `Either Party may terminate this Agreement by giving ${noticePeriod === "1" ? "one (1) month's" : noticePeriod === "2" ? "two (2) months'" : "three (3) months'"} prior written notice to the other Party. On termination or expiry of this Agreement, the Licensee shall vacate the Licensed Premises and deliver peaceful possession to the Licensor in the same condition as received, fair wear and tear excepted. The Licensor may terminate this Agreement forthwith in the event of material breach by the Licensee, including non-payment of license fee for 2 or more consecutive months.`,
      },
      {
        kind: "clause", number: 11, title: "Governing Law",
        text: `This Agreement shall be governed by and construed in accordance with the laws of India, including the Maharashtra Rent Control Act, 1999, the Indian Easements Act, 1882, and the Registration Act, 1908. Disputes shall be subject to the exclusive jurisdiction of the courts at ${city}.`,
      },
    ];

    clauses.forEach(c => blocks.push(c));

    if (e.ll_additional_terms) {
      blocks.push({ kind: "clause", number: 12, title: "Special Conditions", text: e.ll_additional_terms });
    }

    blocks.push({ kind: "divider" });
    blocks.push({ kind: "para", text: "IN WITNESS WHEREOF the Parties have signed this Agreement on the date first written above." });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "LICENSOR", name: licensor },
        { role: "LICENSEE", name: licensee },
      ],
    });

    if (e.ll_witness1 || e.ll_witness2) {
      blocks.push({ kind: "subtitle", text: "WITNESSES" });
      blocks.push({
        kind: "signatures",
        parties: [
          { role: "Witness 1", name: e.ll_witness1 || "___________________" },
          { role: "Witness 2", name: e.ll_witness2 || "___________________" },
        ],
      });
    }

    blocks.push({ kind: "footer", text: "Leave & License Agreement · Generated by Lekha · elevana.guru" });
    return blocks;
  },
};
