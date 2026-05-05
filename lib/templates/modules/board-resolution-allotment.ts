// ============================================================
// BOARD RESOLUTION — SHARE ALLOTMENT
// Drop into: /lib/templates/board-resolution-allotment.ts
// Use case: Board resolution for allotment of shares / CCPS /
//           CCD / ESOP shares to investors or employees.
// Statute refs: Companies Act 2013 s.62 (further issue of
//   capital); s.42 (private placement); s.56 (transfer and
//   transmission — share certificates); s.179(3)(c) (board
//   power to invest); Rule 13 of Companies (Share Capital and
//   Debentures) Rules 2014; FEMA 20(R)/2017 for FDI allotments;
//   SEBI SBEB Regulations 2021 for ESOP allotments
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const boardResolutionAllotment: TemplateModule = {
  meta: {
    id: "board-resolution-allotment",
    name: "Board Resolution — Share Allotment",
    categoryId: "companies",
    category: "Companies & MCA",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Board resolution for allotment of equity shares, CCPS, CCDs, or ESOP shares. Covers fresh issue on rights/private placement/ESOP exercise basis. Includes PAS-3 filing authority, share certificate issuance authority, and FEMA/FC-GPR flag for foreign investors.",
    aliases: [
      "board resolution allotment",
      "share allotment resolution",
      "allotment of shares board resolution",
      "CCPS allotment resolution",
      "ESOP allotment resolution",
      "private placement resolution",
    ],
    pages: 5,
    minutes: 8,
    status: "live",
  },

  groups: [
    {
      title: "Company details",
      fields: [
        { id: "bra_co_name", label: "Company legal name", type: "text", required: true, placeholder: "Acme Technologies Private Limited" },
        { id: "bra_cin", label: "CIN", type: "text", required: true, placeholder: "U72900KA2024PTC123456" },
        { id: "bra_co_addr", label: "Registered office", type: "textarea", rows: 2, required: true },
        { id: "bra_meeting_date", label: "Board meeting date", type: "date", required: true },
        { id: "bra_meeting_city", label: "Meeting city", type: "text", required: true },
        { id: "bra_state", label: "State / UT", type: "select", required: true, options: [
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
        { id: "bra_chair", label: "Chairperson of meeting", type: "text", required: true },
        { id: "bra_directors_present", label: "Directors present (names, comma-separated)", type: "textarea", rows: 2, required: true, placeholder: "Priya Sharma, Rahul Verma" },
      ],
    },
    {
      title: "Allotment details",
      fields: [
        {
          id: "bra_instrument",
          label: "Instrument being allotted",
          type: "select",
          required: true,
          default: "equity",
          options: [
            { value: "equity", label: "Equity Shares" },
            { value: "ccps", label: "Compulsorily Convertible Preference Shares (CCPS)" },
            { value: "ccd", label: "Compulsorily Convertible Debentures (CCDs)" },
            { value: "esop", label: "ESOP Shares (on exercise)" },
            { value: "rights", label: "Rights Issue — Equity Shares" },
            { value: "bonus", label: "Bonus Shares" },
          ],
        },
        {
          id: "bra_allotment_basis",
          label: "Basis of allotment",
          type: "select",
          required: true,
          default: "private_placement",
          options: [
            { value: "private_placement", label: "Private Placement (s.42)" },
            { value: "rights", label: "Rights Issue (s.62(1)(a))" },
            { value: "esop_exercise", label: "ESOP Exercise (s.62(1)(b))" },
            { value: "further_issue", label: "Further Issue — Board Approved (s.62(1)(c))" },
            { value: "conversion", label: "Conversion of CCPS / CCDs" },
            { value: "bonus", label: "Bonus Issue (s.63)" },
          ],
        },
        { id: "bra_num_shares", label: "Number of shares / debentures being allotted", type: "number", required: true, placeholder: "10000" },
        { id: "bra_face_value", label: "Face value per share (₹)", type: "number", required: true, default: "10", placeholder: "10" },
        { id: "bra_issue_price", label: "Issue price per share / debenture (₹)", type: "number", required: true, placeholder: "1000" },
        { id: "bra_total_consideration", label: "Total consideration (₹) — auto or override", type: "number", placeholder: "10000000" },
        { id: "bra_ppo_date", label: "Date of Private Placement Offer (PAS-4 / offer letter)", type: "date" },
      ],
    },
    {
      title: "Allottees",
      fields: [
        {
          id: "bra_allottee_type",
          label: "Allottee(s) category",
          type: "select",
          required: true,
          default: "domestic_investor",
          options: [
            { value: "domestic_investor", label: "Domestic investor(s) — Indian resident(s)" },
            { value: "foreign_investor", label: "Foreign investor(s) — FDI / NRI / OCI" },
            { value: "employee_esop", label: "Employee(s) — ESOP exercise" },
            { value: "promoter", label: "Promoter / existing shareholder" },
            { value: "mixed", label: "Mix of domestic and foreign" },
          ],
        },
        {
          id: "bra_allottees_list",
          label: "Allottee names, PAN, and shares (one per line: Name | PAN | Shares)",
          type: "textarea",
          rows: 4,
          required: true,
          placeholder: "Sequoia Capital India Investments | AABCS1234C | 5000\nAccel Partners India | AABCA5678D | 5000",
        },
        {
          id: "bra_fdi",
          label: "Does this allotment involve foreign direct investment (FDI)?",
          type: "radio",
          required: true,
          default: "no",
          options: [
            { value: "no", label: "No — all allottees are Indian residents" },
            { value: "yes", label: "Yes — one or more allottees are foreign investors" },
          ],
        },
        { id: "bra_fdi_sector", label: "FDI sector (for automatic route confirmation)", type: "text", placeholder: "IT / SaaS — 100% automatic route" },
      ],
    },
    {
      title: "Pre- and post-allotment capital",
      fields: [
        { id: "bra_pre_paid_up", label: "Pre-allotment paid-up share capital (₹)", type: "number", required: true, placeholder: "1000000" },
        { id: "bra_pre_shares", label: "Pre-allotment number of shares", type: "number", required: true, placeholder: "100000" },
        { id: "bra_authorised_capital", label: "Authorised share capital (₹)", type: "number", required: true, placeholder: "5000000" },
      ],
    },
  ],

  render(e) {
    const co = e.bra_co_name || "[Company]";
    const cin = e.bra_cin || "[CIN]";
    const chair = e.bra_chair || "[Chairperson]";
    const directors = (e.bra_directors_present || "").split(",").map((d) => d.trim()).filter(Boolean);
    const numShares = Number(e.bra_num_shares || 0);
    const issuePrice = Number(e.bra_issue_price || 0);
    const faceValue = Number(e.bra_face_value || 10);
    const preShares = Number(e.bra_pre_shares || 0);
    const prePaidUp = Number(e.bra_pre_paid_up || 0);
    const totalConsideration = Number(e.bra_total_consideration || 0) || numShares * issuePrice;
    const postShares = preShares + numShares;
    const postPaidUp = prePaidUp + numShares * faceValue;

    const instrumentLabel = {
      equity: "Equity Shares",
      ccps: "Compulsorily Convertible Preference Shares (CCPS)",
      ccd: "Compulsorily Convertible Debentures (CCDs)",
      esop: "Equity Shares (ESOP Exercise)",
      rights: "Equity Shares (Rights Issue)",
      bonus: "Bonus Equity Shares",
    }[e.bra_instrument || "equity"] || "Equity Shares";

    const basisLabel = {
      private_placement: "private placement under Section 42",
      rights: "rights issue under Section 62(1)(a)",
      esop_exercise: "ESOP exercise under Section 62(1)(b)",
      further_issue: "further issue under Section 62(1)(c)",
      conversion: "conversion of securities",
      bonus: "bonus issue under Section 63",
    }[e.bra_allotment_basis || "private_placement"] || "private placement";

    // Parse allottees
    const allotteeLines = (e.bra_allottees_list || "").split("\n").map((l) => l.trim()).filter(Boolean);
    const allotteeRows = allotteeLines.map((line) => {
      const parts = line.split("|").map((p) => p.trim());
      return [parts[0] || "", parts[1] || "", parts[2] || ""];
    });

    const blocks: DocSection[] = [];

    blocks.push({
      kind: "cover",
      title: "Board Resolution — Share Allotment",
      subtitle: co + " · Board Meeting dated [MEETING_DATE]",
      summary: [
        { label: "Company", value: co + " (CIN: " + cin + ")" },
        { label: "Meeting date", value: "[MEETING_DATE]" },
        { label: "Instrument", value: instrumentLabel },
        { label: "Allotment basis", value: basisLabel },
        { label: "Shares allotted", value: numShares.toLocaleString("en-IN") },
        { label: "Issue price", value: "₹" + issuePrice.toLocaleString("en-IN") + " per share" },
        { label: "Total consideration", value: "₹" + totalConsideration.toLocaleString("en-IN") },
        { label: "Post-allotment paid-up capital", value: "₹" + postPaidUp.toLocaleString("en-IN") + " (" + postShares.toLocaleString("en-IN") + " shares)" },
        { label: "FDI involved", value: e.bra_fdi === "yes" ? "Yes — FC-GPR required" : "No" },
      ],
    });

    blocks.push({ kind: "title", text: "Certified Extract of Board Meeting Minutes" });
    blocks.push({
      kind: "subtitle",
      text: "Board Meeting of " + co + " held on [MEETING_DATE] at " + (e.bra_meeting_city || "[City]") + ", [STATE_NAME]",
    });

    blocks.push({
      kind: "para",
      text:
        "A duly convened meeting of the Board of Directors of " + co + " (CIN: " + cin + "), having its registered office at " + (e.bra_co_addr || "[Address]") + ", was held on [MEETING_DATE] at " + (e.bra_meeting_city || "[City]") + ". " + chair + " acted as Chairperson. The following Directors were present: " + directors.join(", ") + ". Quorum was present and the following resolutions were unanimously passed:",
    });

    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "clause",
      number: 1,
      title: "Resolution: Noting of Offer / Application",
      text:
        '"RESOLVED THAT the Board hereby notes the receipt of valid application(s) and consideration' +
        (e.bra_ppo_date ? " pursuant to the Private Placement Offer dated [PPO_DATE]" : "") +
        " from the following allottee(s) for allotment of " +
        instrumentLabel +
        " on " +
        basisLabel +
        ":" +
        '"',
    });

    if (allotteeRows.length > 0) {
      blocks.push({
        kind: "table",
        headers: ["Allottee Name", "PAN", "Shares Applied / Allotted"],
        rows: allotteeRows,
      });
    }

    blocks.push({
      kind: "clause",
      number: 2,
      title: "Resolution: Allotment of Shares",
      text:
        '"RESOLVED THAT pursuant to Section ' +
        (e.bra_allotment_basis === "bonus" ? "63" : e.bra_allotment_basis === "rights" ? "62(1)(a)" : e.bra_allotment_basis === "esop_exercise" ? "62(1)(b)" : "42 read with Section 62(1)(c)") +
        " of the Companies Act, 2013, and the Articles of Association of the Company, the Board of Directors hereby allots " +
        numShares.toLocaleString("en-IN") +
        " " +
        instrumentLabel +
        " of face value ₹" +
        faceValue +
        " each, at an issue price of ₹" +
        issuePrice.toLocaleString("en-IN") +
        " per share, for a total consideration of ₹" +
        totalConsideration.toLocaleString("en-IN") +
        " (Rupees [AMOUNT_IN_WORDS] only), on a " +
        basisLabel +
        " basis, to the allottee(s) listed above in the proportions stated therein." +
        '"',
    });

    blocks.push({
      kind: "clause",
      number: 3,
      title: "Resolution: Post-allotment Capital",
      text:
        '"RESOLVED FURTHER THAT upon the above allotment, the paid-up share capital of the Company shall stand increased from ₹' +
        prePaidUp.toLocaleString("en-IN") +
        " (" +
        preShares.toLocaleString("en-IN") +
        " shares of ₹" +
        faceValue +
        " each) to ₹" +
        postPaidUp.toLocaleString("en-IN") +
        " (" +
        postShares.toLocaleString("en-IN") +
        " shares of ₹" +
        faceValue +
        " each), within the authorised share capital of the Company." +
        '"',
    });

    blocks.push({
      kind: "clause",
      number: 4,
      title: "Resolution: Share Certificates",
      text:
        '"RESOLVED FURTHER THAT the Company Secretary / authorised officer be and is hereby directed to issue share / debenture certificates to the allottee(s) in the prescribed form within two months from the date of allotment (as required under Section 56(4) of the Companies Act, 2013) and to update the Register of Members / Register of Debenture Holders accordingly."',
    });

    blocks.push({
      kind: "clause",
      number: 5,
      title: "Resolution: PAS-3 Filing",
      text:
        '"RESOLVED FURTHER THAT the Company Secretary / authorised Director be and is hereby authorised to file Form PAS-3 (Return of Allotment) with the Registrar of Companies within 30 days of allotment, together with all required attachments, and to pay the applicable ROC fees."',
    });

    if (e.bra_fdi === "yes") {
      blocks.push({
        kind: "clause",
        number: 6,
        title: "Resolution: FEMA / FC-GPR Compliance",
        text:
          '"RESOLVED FURTHER THAT the Company Secretary / authorised Director be and is hereby authorised to file Form FC-GPR with the Reserve Bank of India (through the Authorised Dealer bank) within 30 days of allotment in accordance with FEMA 20(R)/2017, and to provide all documents and certifications required for such filing, including the valuation certificate confirming compliance with the FEMA pricing guidelines."',
      });
    }

    const lastR = e.bra_fdi === "yes" ? 7 : 6;

    blocks.push({
      kind: "clause",
      number: lastR,
      title: "Resolution: General Authority",
      text:
        '"RESOLVED FURTHER THAT any Director or the Company Secretary of the Company be and is hereby authorised, severally, to do all such acts, deeds, matters, and things and to execute all such documents, agreements, forms, and writings as may be necessary or desirable to give full effect to the above resolutions, including making filings with the ROC, RBI, and any other regulatory authority."',
    });

    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "para",
      text: "Certified to be a true extract of the Minutes of the Board Meeting of " + co + " held on [MEETING_DATE].",
    });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "Chairperson of the Meeting", name: chair },
        { role: "Director / Company Secretary", name: "[Name]" },
      ],
    });

    return blocks;
  },
};
