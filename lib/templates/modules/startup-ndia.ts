// ============================================================
// DPIIT STARTUP INDIA — Recognition Undertaking & Board Resolution
// Drop into: /lib/templates/startup-ndia.ts
// Use case: Document package for a startup applying for DPIIT
//           recognition under the Startup India scheme. Includes
//           (1) Board resolution authorising the application and
//           (2) Self-declaration / undertaking on eligibility.
// Statute refs: DPIIT Notification G.S.R. 127(E) dated 19-Feb-2019
//   (as amended); DPIIT OM F. No. DIPP11/4/2018-Startup Policy
//   dated 11-Apr-2018; Companies Act 2013 s.179 (board powers);
//   IT Act 1961 s.80-IAC (income tax exemption);
//   CGST Act 2017 s.54 (GST refund eligibility for recognised
//   startups); SEBI (ICDR) Regulations 2018 — relaxed norms;
//   Code on Wages 2019 — startup exemptions
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const startupNdia: TemplateModule = {
  meta: {
    id: "startup-ndia",
    name: "DPIIT Startup India — Recognition Undertaking",
    categoryId: "startups",
    category: "Startups & Funding",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Board resolution and self-declaration undertaking for DPIIT Startup India recognition. Covers eligibility declarations, innovation description, authorisation to apply on the DPIIT portal, and s.80-IAC tax exemption intent. Generates the formal undertaking letter required for DPIIT recognition.",
    aliases: [
      "DPIIT recognition",
      "startup india registration",
      "startup india certificate",
      "startup recognition letter",
      "DPIIT undertaking",
      "80-IAC exemption",
      "startup india application",
      "DPIIT board resolution",
    ],
    pages: 5,
    minutes: 10,
    status: "live",
  },

  groups: [
    {
      title: "Entity details",
      fields: [
        { id: "ndia_entity_name", label: "Entity legal name", type: "text", required: true, placeholder: "Acme Technologies Private Limited" },
        {
          id: "ndia_entity_type",
          label: "Entity type",
          type: "select",
          required: true,
          default: "pvt_ltd",
          options: [
            { value: "pvt_ltd", label: "Private Limited Company" },
            { value: "opc", label: "One Person Company (OPC)" },
            { value: "llp", label: "Limited Liability Partnership (LLP)" },
            { value: "partnership", label: "Registered Partnership Firm" },
          ],
        },
        { id: "ndia_cin", label: "CIN / LLPIN / Registration No.", type: "text", required: true, placeholder: "U72900KA2024PTC123456" },
        { id: "ndia_incorp_date", label: "Date of incorporation / registration", type: "date", required: true },
        { id: "ndia_reg_addr", label: "Registered address", type: "textarea", rows: 2, required: true },
        { id: "ndia_state", label: "State / UT", type: "select", required: true, options: [
            { value: "Andhra Pradesh", label: "Andhra Pradesh" },
            { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
            { value: "Assam", label: "Assam" },
            { value: "Bihar", label: "Bihar" },
            { value: "Chhattisgarh", label: "Chhattisgarh" },
            { value: "Goa", label: "Goa" },
            { value: "Gujarat", label: "Gujarat" },
            { value: "Haryana", label: "Haryana" },
            { value: "Himachal Pradesh", label: "Himachal Pradesh" },
            { value: "Jharkhand", label: "Jharkhand" },
            { value: "Karnataka", label: "Karnataka" },
            { value: "Kerala", label: "Kerala" },
            { value: "Madhya Pradesh", label: "Madhya Pradesh" },
            { value: "Maharashtra", label: "Maharashtra" },
            { value: "Manipur", label: "Manipur" },
            { value: "Meghalaya", label: "Meghalaya" },
            { value: "Mizoram", label: "Mizoram" },
            { value: "Nagaland", label: "Nagaland" },
            { value: "Odisha", label: "Odisha" },
            { value: "Punjab", label: "Punjab" },
            { value: "Rajasthan", label: "Rajasthan" },
            { value: "Sikkim", label: "Sikkim" },
            { value: "Tamil Nadu", label: "Tamil Nadu" },
            { value: "Telangana", label: "Telangana" },
            { value: "Tripura", label: "Tripura" },
            { value: "Uttar Pradesh", label: "Uttar Pradesh" },
            { value: "Uttarakhand", label: "Uttarakhand" },
            { value: "West Bengal", label: "West Bengal" },
            { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands" },
            { value: "Chandigarh", label: "Chandigarh" },
            { value: "Dadra and Nagar Haveli and Daman and Diu", label: "Dadra and Nagar Haveli and Daman and Diu" },
            { value: "Delhi", label: "Delhi" },
            { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
            { value: "Ladakh", label: "Ladakh" },
            { value: "Lakshadweep", label: "Lakshadweep" },
            { value: "Puducherry", label: "Puducherry" },
          ] },
        { id: "ndia_pan", label: "PAN of entity", type: "text", required: true, placeholder: "AABCT1234C" },
        { id: "ndia_gstin", label: "GSTIN (if registered)", type: "text", placeholder: "29AABCT1234C1ZB" },
        { id: "ndia_website", label: "Website / app URL", type: "text", placeholder: "https://www.acmetech.in" },
      ],
    },
    {
      title: "Promoters & authorised signatory",
      fields: [
        {
          id: "ndia_promoters",
          label: "Promoter / Director names (comma-separated)",
          type: "textarea",
          rows: 2,
          required: true,
          placeholder: "Priya Sharma (DIN: 01234567), Rahul Verma (DIN: 07654321)",
        },
        { id: "ndia_auth_signatory", label: "Authorised signatory for DPIIT application", type: "text", required: true, placeholder: "Priya Sharma, CEO & Director" },
        { id: "ndia_auth_din", label: "DIN / DPIN of authorised signatory", type: "text", placeholder: "01234567" },
        { id: "ndia_board_date", label: "Board / Partners meeting date (for resolution)", type: "date", required: true },
      ],
    },
    {
      title: "Eligibility & sector",
      fields: [
        {
          id: "ndia_sector",
          label: "Primary sector / industry",
          type: "select",
          required: true,
          default: "technology",
          options: [
            { value: "technology", label: "Technology / SaaS / Software" },
            { value: "fintech", label: "FinTech / Payments / InsurTech" },
            { value: "healthtech", label: "HealthTech / MedTech / Pharma" },
            { value: "edtech", label: "EdTech / Skill Development" },
            { value: "agritech", label: "AgriTech / FoodTech" },
            { value: "cleantech", label: "CleanTech / Renewable Energy" },
            { value: "manufacturing", label: "Manufacturing / Deep Tech / Hardware" },
            { value: "ecommerce", label: "E-commerce / D2C / Retail" },
            { value: "logistics", label: "Logistics / Supply Chain" },
            { value: "ai_ml", label: "Artificial Intelligence / ML / Data Analytics" },
            { value: "other", label: "Other" },
          ],
        },
        {
          id: "ndia_turnover_crore",
          label: "Highest annual turnover in any financial year since incorporation (₹ crore)",
          type: "number",
          required: true,
          placeholder: "2.5",
          help: "Must be below ₹100 crore. Entity is ineligible for DPIIT recognition if turnover exceeds ₹100 crore.",
        },
        {
          id: "ndia_prior_recognition",
          label: "Has the entity been formed by splitting up or reconstructing an existing business?",
          type: "radio",
          required: true,
          default: "no",
          options: [
            { value: "no", label: "No — original entity, not a split-up or reconstruction" },
            { value: "yes", label: "Yes — split up / reconstructed (may be ineligible)" },
          ],
        },
        {
          id: "ndia_existing_recognition",
          label: "Does the entity already hold a DPIIT recognition certificate?",
          type: "radio",
          required: true,
          default: "no",
          options: [
            { value: "no", label: "No — applying for the first time" },
            { value: "yes", label: "Yes — renewal / update application" },
          ],
        },
        { id: "ndia_existing_cert_no", label: "Existing DPIIT Certificate No. (if renewal)", type: "text", placeholder: "DIPP12345" },
      ],
    },
    {
      title: "Innovation & business description",
      fields: [
        {
          id: "ndia_innovation_type",
          label: "Nature of innovation",
          type: "select",
          required: true,
          default: "product",
          options: [
            { value: "product", label: "Novel product / technology" },
            { value: "process", label: "Improved process / method" },
            { value: "service", label: "Innovative service / business model" },
            { value: "platform", label: "Platform / marketplace innovation" },
          ],
        },
        {
          id: "ndia_innovation_desc",
          label: "Innovation description (explain what is novel, unique, or scalable)",
          type: "textarea",
          rows: 5,
          required: true,
          placeholder:
            "We have developed an AI-powered SaaS platform that automates GST reconciliation for SMEs using machine learning. Unlike existing products, our platform integrates directly with Tally, Zoho Books, and GSTN APIs to auto-match purchase records and flag mismatches in real time, reducing reconciliation time by 90%. This product is novel, scalable, and addresses a significant unmet need in the Indian SME market.",
        },
        {
          id: "ndia_scalability",
          label: "Scalability / employment potential (brief statement)",
          type: "textarea",
          rows: 3,
          required: true,
          placeholder: "The platform is currently used by 150 SMEs and is capable of scaling to 10,000+ customers without proportionate increase in costs. We plan to hire 20 additional engineers and sales personnel over the next 12 months.",
        },
        { id: "ndia_current_employees", label: "Current number of employees (approx.)", type: "number", placeholder: "12" },
        {
          id: "ndia_ip_status",
          label: "Intellectual property / patents",
          type: "select",
          default: "none",
          options: [
            { value: "none", label: "No IP filed" },
            { value: "patent_pending", label: "Patent application pending (Indian Patent Office)" },
            { value: "patent_granted", label: "Patent granted" },
            { value: "copyright", label: "Copyright registered" },
            { value: "trademark", label: "Trademark registered / pending" },
          ],
        },
        { id: "ndia_ip_details", label: "IP details (application/registration number, if any)", type: "text", placeholder: "Patent App. No. 202141012345" },
      ],
    },
    {
      title: "Benefits sought",
      fields: [
        {
          id: "ndia_80iac",
          label: "Intend to apply for s.80-IAC income tax exemption?",
          type: "radio",
          required: true,
          default: "yes",
          options: [
            { value: "yes", label: "Yes — will separately apply to DPIIT/IMB for s.80-IAC certificate" },
            { value: "no", label: "No — recognition only" },
          ],
        },
        {
          id: "ndia_self_cert_labour",
          label: "Intend to use self-certification for labour law compliances?",
          type: "radio",
          required: true,
          default: "yes",
          options: [
            { value: "yes", label: "Yes — avail self-certification under 9 labour laws" },
            { value: "no", label: "No" },
          ],
        },
        {
          id: "ndia_self_cert_env",
          label: "Intend to use self-certification for 3 environment laws?",
          type: "radio",
          required: true,
          default: "no",
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No / Not applicable" },
          ],
        },
        {
          id: "ndia_govt_tenders",
          label: "Intend to bid on government tenders / GeM portal using startup exemptions?",
          type: "radio",
          required: true,
          default: "no",
          options: [
            { value: "yes", label: "Yes — will use DPIIT recognition for tender eligibility relaxations" },
            { value: "no", label: "No" },
          ],
        },
        {
          id: "ndia_ipr_fee",
          label: "Intend to avail reduced IPR filing fees?",
          type: "radio",
          required: true,
          default: "yes",
          options: [
            { value: "yes", label: "Yes — 80% reduction on patent fees, 50% on trademark" },
            { value: "no", label: "No" },
          ],
        },
      ],
    },
  ],

  render(e) {
    const entity = e.ndia_entity_name || "[Entity Name]";
    const entityType = {
      pvt_ltd: "Private Limited Company",
      opc: "One Person Company",
      llp: "Limited Liability Partnership",
      partnership: "Registered Partnership Firm",
    }[e.ndia_entity_type || "pvt_ltd"] || "Company";
    const cin = e.ndia_cin || "[CIN/LLPIN]";
    const signatory = e.ndia_auth_signatory || "[Authorised Signatory]";
    const promoters = (e.ndia_promoters || "").split(",").map((p) => p.trim()).filter(Boolean);
    const sectorLabel = {
      technology: "Technology / SaaS / Software",
      fintech: "FinTech / Payments / InsurTech",
      healthtech: "HealthTech / MedTech / Pharma",
      edtech: "EdTech / Skill Development",
      agritech: "AgriTech / FoodTech",
      cleantech: "CleanTech / Renewable Energy",
      manufacturing: "Manufacturing / Deep Tech / Hardware",
      ecommerce: "E-commerce / D2C / Retail",
      logistics: "Logistics / Supply Chain",
      ai_ml: "Artificial Intelligence / ML / Data Analytics",
      other: "Other",
    }[e.ndia_sector || "technology"] || "Technology";

    const blocks: DocSection[] = [];

    // Info block — compliance overview
    blocks.push({
      kind: "info",
      title: "DPIIT Startup India Recognition — Key Facts",
      acts: [
        "DPIIT Notification G.S.R. 127(E) dated 19-Feb-2019",
        "IT Act 1961 s.80-IAC — Income Tax Exemption",
        "IT Act 1961 s.56(2)(viib) — Angel Tax Exemption",
        "CGST Act 2017 — GST exemptions for recognised startups",
        "Companies Act 2013 s.179 — Board powers",
      ],
      text:
        "Eligibility: Incorporated within the last 10 years; annual turnover not exceeding ₹100 crore in any FY; working towards innovation, development, or improvement of products/processes/services, or a scalable business model with high employment/wealth creation potential; not formed by splitting or reconstructing an existing business.",
    });

    // Cover block
    blocks.push({
      kind: "cover",
      title: "DPIIT Startup India — Recognition Application Package",
      subtitle: entity + " · " + entityType,
      summary: [
        { label: "Entity", value: entity + " (" + cin + ")" },
        { label: "Entity type", value: entityType },
        { label: "Incorporation date", value: "[INCORP_DATE]" },
        { label: "Sector", value: sectorLabel },
        { label: "PAN", value: e.ndia_pan || "[PAN]" },
        { label: "GSTIN", value: e.ndia_gstin || "Not yet registered" },
        { label: "Authorised signatory", value: signatory },
        { label: "Board resolution date", value: "[BOARD_DATE]" },
        {
          label: "Benefits sought",
          value: [
            e.ndia_80iac === "yes" ? "s.80-IAC tax exemption" : null,
            e.ndia_self_cert_labour === "yes" ? "Labour law self-certification" : null,
            e.ndia_ipr_fee === "yes" ? "Reduced IPR fees" : null,
            e.ndia_govt_tenders === "yes" ? "GeM / Tender relaxations" : null,
          ]
            .filter(Boolean)
            .join(", ") || "DPIIT recognition only",
        },
      ],
    });

    // ── PART A: BOARD RESOLUTION ──────────────────────────────

    blocks.push({ kind: "title", text: "PART A — Board Resolution / Partners' Resolution" });
    blocks.push({
      kind: "subtitle",
      text: "Authorising Application for DPIIT Startup India Recognition",
    });

    blocks.push({
      kind: "para",
      text:
        "A duly convened meeting of the Board of Directors" +
        (e.ndia_entity_type === "llp" || e.ndia_entity_type === "partnership"
          ? " / Partners"
          : "") +
        " of " +
        entity +
        " (" +
        entityType +
        "), CIN/LLPIN: " +
        cin +
        ", having its registered address at " +
        (e.ndia_reg_addr || "[Address]") +
        ", was held on [BOARD_DATE]. The following promoters / directors / designated partners were present: " +
        (promoters.join("; ") || "[Names]") +
        ". Quorum being present, the following resolutions were passed unanimously:",
    });

    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "clause",
      number: 1,
      title: "Resolution: Application for DPIIT Startup India Recognition",
      text:
        '"RESOLVED THAT the Board / Partners hereby approves the filing of an application for recognition of ' +
        entity +
        " as a " +
        '"Startup"' +
        " under the Startup India initiative of the Government of India, administered by the Department for Promotion of Industry and Internal Trade (DPIIT), in accordance with DPIIT Notification G.S.R. 127(E) dated 19 February 2019 as amended from time to time." +
        "\n\n" +
        '"RESOLVED FURTHER THAT ' +
        signatory +
        (e.ndia_auth_din ? " (DIN/DPIN: " + e.ndia_auth_din + ")" : "") +
        " be and is hereby authorised to submit the online application on the DPIIT / Startup India portal (startupindia.gov.in), upload all required documents, sign and submit the self-declaration / undertaking on behalf of the Company / LLP / Firm, and do all other acts, deeds, and things as may be necessary to obtain DPIIT recognition." +
        '"',
    });

    blocks.push({
      kind: "clause",
      number: 2,
      title: "Resolution: Authority for s.80-IAC Application",
      text:
        e.ndia_80iac === "yes"
          ? '"RESOLVED FURTHER THAT upon obtaining DPIIT recognition, ' +
            signatory +
            " be and is hereby authorised to submit an application to the Inter-Ministerial Board (IMB) / DPIIT for a certificate under Section 80-IAC of the Income-tax Act, 1961, for claiming income tax exemption for three consecutive financial years out of ten years from the date of incorporation, and to provide all documents and information as may be required by the IMB." +
            '"'
          : '"RESOLVED FURTHER THAT the Company / LLP / Firm intends to avail DPIIT recognition benefits. Applications for additional benefits such as s.80-IAC exemption may be made by a separate resolution at the appropriate time."',
    });

    blocks.push({
      kind: "clause",
      number: 3,
      title: "Resolution: Self-Certification under Labour Laws",
      text:
        e.ndia_self_cert_labour === "yes"
          ? '"RESOLVED FURTHER THAT the Company / LLP / Firm shall avail the facility of self-certification of compliance under applicable labour laws as made available to DPIIT-recognised startups, in accordance with the Startup India Action Plan. ' +
            signatory +
            " be and is hereby authorised to file the relevant self-certifications and maintain compliance records accordingly." +
            '"'
          : '"NOTED THAT the Company / LLP / Firm takes note of the self-certification facility available for recognised startups under applicable labour laws and will evaluate the same at an appropriate time."',
    });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "Chairperson of Meeting", name: promoters[0] || "[Director 1]" },
        { role: "Director / Designated Partner", name: promoters[1] || "[Director 2]" },
      ],
    });

    blocks.push({ kind: "page_break" });

    // ── PART B: SELF-DECLARATION / UNDERTAKING ────────────────

    blocks.push({ kind: "title", text: "PART B — Self-Declaration and Undertaking" });
    blocks.push({
      kind: "subtitle",
      text: "For DPIIT Startup India Recognition — To Be Submitted on Startup India Portal",
    });

    blocks.push({
      kind: "para",
      text:
        "I, " +
        signatory +
        ", authorised representative of " +
        entity +
        " (" +
        entityType +
        " incorporated / registered under CIN/LLPIN: " +
        cin +
        " on [INCORP_DATE]), having its registered address at " +
        (e.ndia_reg_addr || "[Address]") +
        ", do hereby solemnly affirm and declare as follows:",
    });

    blocks.push({
      kind: "clause",
      number: 1,
      title: "Eligibility Declaration — Entity Age",
      text:
        "The entity was incorporated / registered on [INCORP_DATE] and has not completed ten years from the said date of incorporation / registration as on the date of this application. The entity is within the prescribed eligibility period for Startup India recognition.",
    });

    blocks.push({
      kind: "clause",
      number: 2,
      title: "Eligibility Declaration — Turnover",
      text:
        "The annual turnover of the entity has not exceeded Rupees One Hundred Crore (₹100,00,00,000/-) in any of the financial years since its incorporation / registration. The highest annual turnover recorded to date is approximately ₹" +
        (e.ndia_turnover_crore || "[Amount]") +
        " crore.",
    });

    blocks.push({
      kind: "clause",
      number: 3,
      title: "Eligibility Declaration — Not a Split-up / Reconstruction",
      text:
        "The entity has NOT been formed by splitting up or reconstruction of a business already in existence. It is an original entity established as " +
        entity +
        " and has not been formed from any pre-existing business, enterprise, or entity.",
    });

    blocks.push({
      kind: "clause",
      number: 4,
      title: "Innovation and Scalability Declaration",
      text:
        "The entity is working towards:\n\n" +
        "(" + "a) Innovation, development, or improvement of products, processes or services; and/or\n\n" +
        "(b) A scalable business model with a high potential of employment generation or wealth creation.\n\n" +
        "Brief description of the innovation / scalable model:\n\n" +
        (e.ndia_innovation_desc || "[Innovation description]") +
        "\n\nScalability and employment potential:\n\n" +
        (e.ndia_scalability || "[Scalability description]"),
    });

    blocks.push({
      kind: "clause",
      number: 5,
      title: "Intellectual Property",
      text:
        e.ndia_ip_status === "none"
          ? "The entity has not yet filed any formal intellectual property applications. The entity intends to protect its innovations through appropriate IP filings and may avail the reduced IPR filing fee facility available to DPIIT-recognised startups."
          : "The entity has the following IP filings / registrations in respect of its core innovations: " +
            (e.ndia_ip_details || "[IP details]") +
            ". The entity " +
            (e.ndia_ipr_fee === "yes"
              ? "intends to avail the reduced patent filing fee (80% reduction) and trademark filing fee (50% reduction) available to DPIIT-recognised startups."
              : "will maintain and expand its IP portfolio as appropriate."),
    });

    blocks.push({
      kind: "clause",
      number: 6,
      title: "DPIIT Portal Registration",
      text:
        "The entity is registered / will be registered on the Startup India portal at startupindia.gov.in with a valid mobile number and email address, and the online application for recognition has been / will be filed under the category of " +
        entityType +
        " in the sector: " +
        sectorLabel +
        ".",
    });

    blocks.push({
      kind: "clause",
      number: 7,
      title: "Angel Tax — s.56(2)(viib)",
      text:
        "The entity acknowledges that DPIIT-recognised startups are eligible for exemption from Section 56(2)(viib) of the Income-tax Act, 1961 (angel tax) in respect of share premium received from investors, subject to conditions prescribed. The entity shall comply with all conditions and file Form 2 (or such other form) as may be required.",
    });

    if (e.ndia_80iac === "yes") {
      blocks.push({
        kind: "clause",
        number: 8,
        title: "Section 80-IAC — Tax Exemption Intent",
        text:
          "The entity intends to apply separately for a certificate under Section 80-IAC of the Income-tax Act, 1961, which provides for a deduction of 100% of profits and gains for any three consecutive years out of ten years from the date of incorporation, subject to the entity being incorporated on or after 1 April 2016 and obtaining IMB certification. The entity acknowledges that DPIIT recognition is a prerequisite for the s.80-IAC application and that the IMB may require additional documentation.",
      });
    }

    const lastClause = e.ndia_80iac === "yes" ? 9 : 8;

    blocks.push({
      kind: "clause",
      number: lastClause,
      title: "Undertaking as to Accuracy",
      text:
        "I hereby undertake that:\n\n" +
        "(a) All information provided in this application and the supporting documents is true, correct, and complete to the best of my knowledge and belief;\n\n" +
        "(b) The entity shall promptly inform DPIIT of any material change in the information provided herein, including any change in incorporation status, turnover, or business model;\n\n" +
        "(c) The entity shall comply with all conditions attached to DPIIT recognition and shall not misrepresent its status as a DPIIT-recognised startup;\n\n" +
        "(d) The entity is aware that providing false information or obtaining recognition by fraud or misrepresentation may result in cancellation of recognition and other legal consequences;\n\n" +
        "(e) The entity shall maintain proper books of accounts, statutory registers, and records as required under applicable law and provide the same for inspection if called upon by DPIIT or any other competent authority.",
    });

    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "kv",
      pairs: [
        { label: "Entity", value: entity },
        { label: "CIN / LLPIN", value: cin },
        { label: "PAN", value: e.ndia_pan || "[PAN]" },
        { label: "GSTIN", value: e.ndia_gstin || "N/A" },
        { label: "Date of declaration", value: "[DATE]" },
        { label: "Place", value: e.ndia_reg_addr ? e.ndia_reg_addr.split(",").slice(-2).join(",").trim() : "[City]" },
      ],
    });

    blocks.push({
      kind: "signatures",
      parties: [
        {
          role: "Authorised Signatory\n" + signatory + (e.ndia_auth_din ? "\nDIN/DPIN: " + e.ndia_auth_din : ""),
          name: "For " + entity,
        },
      ],
    });

    blocks.push({
      kind: "para",
      text:
        "Documents to be uploaded with DPIIT application:\n" +
        "1. Certificate of Incorporation / LLP Agreement / Partnership Deed\n" +
        "2. PAN card of the entity\n" +
        "3. Board Resolution / Partners' Resolution (Part A above)\n" +
        "4. Brief pitch deck / concept note describing the innovation\n" +
        "5. Website / product demo link\n" +
        "6. Audited financial statements (if turnover > ₹0)\n" +
        (e.ndia_ip_status !== "none" ? "7. IP filing / registration certificates\n" : "") +
        (e.ndia_80iac === "yes"
          ? "Note: For s.80-IAC application, additionally prepare: Detailed business plan, revenue model, product demo, and financial projections for IMB review.\n"
          : ""),
    });

    return blocks;
  },
};
