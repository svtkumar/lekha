// ============================================================
// GENERAL PURPOSE AFFIDAVIT
// Drop into: /lib/templates/affidavit-general.ts
// Use case: Sworn statement / affidavit for a wide range of
//           purposes — change of name, address proof, income
//           declaration, lost document, character certificate,
//           date of birth, single girl child, undertaking for
//           loans, or any custom purpose.
// Statute refs: Oaths Act 1969 (swearing of affidavits);
//   Code of Civil Procedure 1908 Order XIX (affidavits as
//   evidence); Notaries Act 1952 (notarisation);
//   Indian Stamp Act 1899 (stamp duty on affidavit — varies
//   by state, typically ₹10–₹50 on stamp paper)
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const affidavitGeneral: TemplateModule = {
  meta: {
    id: "affidavit-general",
    name: "Affidavit (General Purpose)",
    categoryId: "personal",
    category: "Personal & Family",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "General-purpose sworn affidavit for personal or legal purposes. Covers name change / correction, address proof, income declaration, lost document, date of birth, single girl child declaration, character, undertaking, or any custom statement. To be sworn before a Notary / Magistrate / Commissioner.",
    aliases: [
      "affidavit",
      "sworn affidavit",
      "affidavit India",
      "name change affidavit",
      "address proof affidavit",
      "income affidavit",
      "lost document affidavit",
      "general affidavit",
      "affidavit format",
    ],
    pages: 2,
    minutes: 5,
    status: "live",
  },

  groups: [
    {
      title: "Deponent (person making the affidavit)",
      fields: [
        { id: "aff_name", label: "Deponent full name", type: "text", required: true, placeholder: "Priya Sharma" },
        { id: "aff_age", label: "Age", type: "number", required: true, placeholder: "32" },
        { id: "aff_father_spouse", label: "Son/Daughter/Wife of", type: "text", required: true, placeholder: "Ramesh Sharma" },
        { id: "aff_addr", label: "Residential address", type: "textarea", rows: 2, required: true },
        { id: "aff_state", label: "State / UT", type: "select", required: true, options: [
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
        { id: "aff_city", label: "City", type: "text", required: true },
        { id: "aff_id_type", label: "Identity document relied on", type: "select", default: "aadhar", options: [{ value: "aadhar", label: "Aadhaar Card" }, { value: "pan", label: "PAN Card" }, { value: "passport", label: "Passport" }, { value: "voter_id", label: "Voter ID" }, { value: "driving_licence", label: "Driving Licence" }] },
        { id: "aff_id_no", label: "ID document number (full or last 4 digits)", type: "text", placeholder: "XXXX XXXX 1234 (Aadhaar)" },
      ],
    },
    {
      title: "Purpose and content",
      fields: [
        {
          id: "aff_purpose",
          label: "Affidavit purpose",
          type: "select",
          required: true,
          default: "name_change",
          options: [
            { value: "name_change", label: "Name change / correction (before vs after)" },
            { value: "address_proof", label: "Address proof / residence declaration" },
            { value: "income", label: "Income declaration (annual income)" },
            { value: "lost_document", label: "Lost document declaration (passport, certificate, etc.)" },
            { value: "dob", label: "Date of birth declaration / correction" },
            { value: "character", label: "Character certificate / good standing" },
            { value: "single_girl_child", label: "Single girl child declaration (scholarship / scheme)" },
            { value: "property_possession", label: "Property possession / no objection" },
            { value: "undertaking_loan", label: "Undertaking for loan / financial institution" },
            { value: "custom", label: "Custom affidavit (free text)" },
          ],
        },
        { id: "aff_old_name", label: "Old / incorrect name (for name change affidavit)", type: "text", placeholder: "Priya Sharma" },
        { id: "aff_new_name", label: "New / correct name", type: "text", placeholder: "Priya Rahul Sharma" },
        { id: "aff_dob_old", label: "Old / incorrect date of birth (for DOB correction)", type: "date" },
        { id: "aff_dob_new", label: "Correct / new date of birth", type: "date" },
        { id: "aff_annual_income", label: "Annual income (₹) — for income affidavit", type: "number", placeholder: "600000" },
        { id: "aff_lost_doc", label: "Lost document description", type: "text", placeholder: "Degree Certificate in B.Tech from XYZ University, Year 2015" },
        { id: "aff_custom_content", label: "Custom affidavit content (full text of declarations)", type: "textarea", rows: 6, placeholder: "I, the deponent, hereby solemnly declare that..." },
        { id: "aff_place_of_swearing", label: "Place where affidavit will be sworn", type: "text", required: true, placeholder: "Bengaluru" },
      ],
    },
  ],

  render(e) {
    const deponent = e.aff_name || "[Deponent]";
    const age = e.aff_age || "[Age]";
    const fatherSpouse = e.aff_father_spouse || "[Father/Spouse Name]";
    const addr = e.aff_addr || "[Address]";
    const purpose = e.aff_purpose || "custom";
    const city = e.aff_city || e.aff_place_of_swearing || "[City]";

    // Build affidavit-specific declarations
    let declarations = "";

    if (purpose === "name_change") {
      declarations =
        "1. That my true and correct name is " + (e.aff_new_name || "[New Name]") + ".\n\n" +
        "2. That I have also been known as / referred to by the name " + (e.aff_old_name || "[Old Name]") + " in certain documents issued in my name.\n\n" +
        "3. That both " + (e.aff_old_name || "[Old Name]") + " and " + (e.aff_new_name || "[New Name]") + " refer to one and the same person, i.e., myself.\n\n" +
        "4. That I have decided to use my name as " + (e.aff_new_name || "[New Name]") + " henceforth for all purposes, and I request all authorities concerned to record my name accordingly.\n\n" +
        "5. That all documents, certificates, and records currently in the name of " + (e.aff_old_name || "[Old Name]") + " belong to me and are my genuine documents.";
    } else if (purpose === "address_proof") {
      declarations =
        "1. That I am ordinarily residing at the address stated above and have been residing there since [DATE].\n\n" +
        "2. That the said premises is my permanent / current residential address.\n\n" +
        "3. That the above address is my correct and current address for all correspondence, official, legal, and personal purposes.\n\n" +
        "4. That the particulars stated above are true and correct to the best of my knowledge and belief.";
    } else if (purpose === "income") {
      const income = Number(e.aff_annual_income || 0);
      declarations =
        "1. That my annual income from all sources during the current / last financial year is approximately ₹" + income.toLocaleString("en-IN") + " (Rupees [INCOME_IN_WORDS] only).\n\n" +
        "2. That the sources of my income include [salary / business / profession / rental / other].\n\n" +
        "3. That I am/am not an income taxpayer. [Delete as applicable.]\n\n" +
        "4. That the above declaration of income is true and correct to the best of my knowledge and belief.";
    } else if (purpose === "lost_document") {
      declarations =
        "1. That I was the lawful holder of the following document: " + (e.aff_lost_doc || "[Document Description]") + ".\n\n" +
        "2. That the said document has been lost / misplaced by me and despite diligent search, the same could not be found.\n\n" +
        "3. That I have not pledged, mortgaged, or otherwise transferred the said document to any person.\n\n" +
        "4. That I shall return the original document to the issuing authority, if found at a later date.\n\n" +
        "5. That I solemnly state that the contents of this affidavit are true to the best of my knowledge and belief and nothing material has been concealed.";
    } else if (purpose === "dob") {
      declarations =
        "1. That my correct date of birth is " + (e.aff_dob_new ? "[CORRECT_DOB]" : "[correct DOB]") + ".\n\n" +
        "2. That in certain documents issued in my name, my date of birth has been erroneously recorded as " + (e.aff_dob_old ? "[WRONG_DOB]" : "[incorrect DOB]") + " due to a clerical / transcription error.\n\n" +
        "3. That the correct date of birth as stated in clause 1 above is as per my birth certificate / school records / [other document].\n\n" +
        "4. That I request the concerned authority to correct the date of birth in their records accordingly.";
    } else if (purpose === "single_girl_child") {
      declarations =
        "1. That I am the mother/father of a single girl child named [Child's Name], born on [DOB].\n\n" +
        "2. That the said child is my only living child and there are no other living children born to me or my spouse.\n\n" +
        "3. That I have not adopted any child and do not intend to do so.\n\n" +
        "4. That I am applying for benefits / scholarships / scheme under [Scheme Name] for my single girl child.\n\n" +
        "5. That the above statements are true to the best of my knowledge and belief.";
    } else if (purpose === "character") {
      declarations =
        "1. That I am a person of good moral character and conduct.\n\n" +
        "2. That I have not been convicted of any criminal offence by any court of law.\n\n" +
        "3. That no criminal case / FIR is pending against me in any court or police station.\n\n" +
        "4. That I have not been involved in any anti-social or anti-national activity.\n\n" +
        "5. That the above statements are true and correct to the best of my knowledge and belief.";
    } else if (purpose === "undertaking_loan") {
      declarations =
        "1. That I have applied for a loan / financial facility from [Name of Financial Institution].\n\n" +
        "2. That all the information and documents submitted by me in support of the loan application are true, genuine, and correct.\n\n" +
        "3. That I have not suppressed or concealed any material information relating to my financial status, existing liabilities, or creditworthiness.\n\n" +
        "4. That I undertake to utilise the loan amount solely for the purpose stated in the loan application, viz. [purpose of loan].\n\n" +
        "5. That I undertake to repay the loan as per the agreed repayment schedule and shall not default without prior written intimation to the lender.";
    } else {
      // custom
      declarations = e.aff_custom_content || "[Deponent's custom declarations — please enter the specific statements to be made in this affidavit]";
    }

    const blocks: DocSection[] = [];

    blocks.push({ kind: "title", text: "AFFIDAVIT" });

    blocks.push({
      kind: "para",
      text:
        "I, " + deponent + ", aged " + age + " years, " +
        (["son", "daughter", "wife"].some((w) => (fatherSpouse || "").toLowerCase().startsWith(w))
          ? fatherSpouse
          : "son/daughter/wife of " + fatherSpouse) +
        ", residing at " + addr +
        (e.aff_id_type && e.aff_id_no ? ", holder of " + { aadhar: "Aadhaar Card", pan: "PAN Card", passport: "Passport", voter_id: "Voter ID Card", driving_licence: "Driving Licence" }[e.aff_id_type] + " No. " + e.aff_id_no : "") +
        ", do hereby solemnly affirm and declare as under:",
    });

    blocks.push({
      kind: "para",
      text: declarations,
    });

    blocks.push({
      kind: "para",
      text:
        "I state that the above declarations are true and correct to the best of my knowledge and belief, and that nothing material has been concealed therefrom.",
    });

    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "para",
      text: "SOLEMNLY AFFIRMED / SWORN at " + city + " on [DATE].",
    });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "DEPONENT", name: deponent },
      ],
    });

    blocks.push({
      kind: "para",
      text:
        "BEFORE ME:\n\nSignature: _______________________\nName: _______________________\nDesignation: Notary Public / Judicial Magistrate / Commissioner of Oaths\nNotary Registration No.: _______________________\nSeal: [Notary Seal]",
    });

    return blocks;
  },
};
