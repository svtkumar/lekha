// ============================================================
// JOINT VENTURE AGREEMENT
// Drop into: /lib/templates/joint-venture-agreement.ts
// Use case: Agreement between two or more parties to carry
//           on a joint venture — either through a special
//           purpose vehicle (SPV / JV company) or as a
//           contractual JV (unincorporated). Covers equity
//           split, governance, capital contributions,
//           management control, exit, deadlock, and
//           competition law considerations.
// Statute refs: Indian Contract Act 1872; Companies Act
//   2013 (if JV company); LLP Act 2008 (if JV LLP);
//   FEMA 20(R)/2017 (if foreign JV partner — FDI policy);
//   IT Act 1961 s.47(xiiib) (conversion of firm to company);
//   Competition Act 2002 ss.5,6 (CCI approval if JV meets
//   asset/turnover thresholds); SEBI (if listed entity)
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const jointVentureAgreement: TemplateModule = {
  meta: {
    id: "joint-venture-agreement",
    name: "Joint Venture Agreement",
    categoryId: "business",
    category: "Business Contracts",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Joint venture agreement between two or more parties, either as a contractual (unincorporated) JV or through a special purpose company/LLP. Covers equity split and capital contributions, management and governance (board composition, reserved matters), profit distribution, FEMA/FDI compliance for foreign JV partners, non-compete, deadlock resolution, exit mechanisms (tag-along, drag-along, put/call options), and CCI combination notification threshold note.",
    aliases: [
      "joint venture agreement",
      "jv agreement",
      "joint venture contract",
      "jv contract",
      "joint venture india",
      "spv agreement",
      "business joint venture",
      "international joint venture india",
    ],
    pages: 7,
    minutes: 10,
    status: "live",
  },

  groups: [
    {
      title: "Party 1 details",
      fields: [
        { id: "jv_p1_name", label: "Party 1 — legal name", type: "text", required: true, placeholder: "Alpha Industries Private Limited" },
        { id: "jv_p1_addr", label: "Party 1 — registered address", type: "textarea", rows: 2, required: true },
        { id: "jv_p1_country", label: "Party 1 — country of incorporation", type: "text", default: "India", placeholder: "India" },
        { id: "jv_p1_signatory", label: "Party 1 — authorised signatory", type: "text", required: true, placeholder: "Suresh Gupta, Managing Director" },
      ],
    },
    {
      title: "Party 2 details",
      fields: [
        { id: "jv_p2_name", label: "Party 2 — legal name", type: "text", required: true, placeholder: "Beta Tech GmbH" },
        { id: "jv_p2_addr", label: "Party 2 — address", type: "textarea", rows: 2, required: true },
        { id: "jv_p2_country", label: "Party 2 — country of incorporation", type: "text", placeholder: "Germany" },
        { id: "jv_p2_signatory", label: "Party 2 — authorised signatory", type: "text", required: true, placeholder: "Hans Müller, CEO" },
      ],
    },
    {
      title: "JV structure and purpose",
      fields: [
        {
          id: "jv_structure",
          label: "JV structure",
          type: "select",
          required: true,
          default: "jv_company",
          options: [
            { value: "jv_company", label: "Incorporated JV — new private limited company (SPV)" },
            { value: "jv_llp", label: "Incorporated JV — new LLP" },
            { value: "contractual", label: "Contractual / unincorporated JV" },
          ],
        },
        { id: "jv_entity_name", label: "JV entity name (proposed)", type: "text", placeholder: "AlphaBeta Technologies Private Limited" },
        { id: "jv_purpose", label: "Purpose / object of the JV", type: "textarea", rows: 3, required: true, placeholder: "Development and commercialisation of AI-based quality inspection systems for the Indian manufacturing sector." },
        { id: "jv_agreement_date", label: "Agreement date", type: "date", required: true },
        { id: "jv_term", label: "JV term", type: "select", default: "perpetual",
          options: [
            { value: "perpetual", label: "Perpetual (until wound up)" },
            { value: "5years", label: "5 years" },
            { value: "10years", label: "10 years" },
            { value: "project", label: "Project-based (until completion)" },
          ],
        },
        { id: "jv_state", label: "State of incorporation / operations", type: "select", required: true, options: [
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
      ],
    },
    {
      title: "Equity and contributions",
      fields: [
        { id: "jv_p1_equity", label: "Party 1 equity % in JV", type: "number", required: true, placeholder: "51" },
        { id: "jv_p2_equity", label: "Party 2 equity % in JV", type: "number", required: true, placeholder: "49" },
        { id: "jv_p1_contribution", label: "Party 1 capital contribution (₹ or description)", type: "text", required: true, placeholder: "₹2,00,00,000 cash + land & building valued at ₹3,00,00,000" },
        { id: "jv_p2_contribution", label: "Party 2 capital contribution (description)", type: "text", required: true, placeholder: "Technology licence, know-how, and ₹1,50,00,000 cash" },
        {
          id: "jv_foreign_partner",
          label: "Is any JV partner a foreign entity?",
          type: "radio",
          default: "no",
          options: [
            { value: "yes", label: "Yes — FEMA/FDI compliance required" },
            { value: "no", label: "No — all Indian parties" },
          ],
        },
        { id: "jv_fdi_sector", label: "FDI sector (if foreign partner) — for FDI policy route", type: "text", placeholder: "Manufacturing (100% FDI, automatic route) / Defence (74% automatic, above requires GoI approval)" },
      ],
    },
    {
      title: "Governance and exit",
      fields: [
        { id: "jv_p1_board_seats", label: "Party 1 board seats", type: "number", placeholder: "3" },
        { id: "jv_p2_board_seats", label: "Party 2 board seats", type: "number", placeholder: "2" },
        {
          id: "jv_reserved_matters",
          label: "Reserved matters requiring unanimous approval?",
          type: "radio",
          default: "yes",
          options: [
            { value: "yes", label: "Yes — list key reserved matters" },
            { value: "no", label: "No — majority board control only" },
          ],
        },
        {
          id: "jv_exit_mechanism",
          label: "Exit mechanism",
          type: "select",
          default: "put_call",
          options: [
            { value: "put_call", label: "Put / call option (Russian Roulette)" },
            { value: "rofr", label: "Right of first refusal (ROFR)" },
            { value: "tag_drag", label: "Tag-along / drag-along" },
            { value: "all", label: "All of the above" },
          ],
        },
        { id: "jv_non_compete_years", label: "Non-compete period (years post-exit)", type: "select", default: "2",
          options: [{ value: "1", label: "1 year" }, { value: "2", label: "2 years" }, { value: "3", label: "3 years" }],
        },
        { id: "jv_jurisdiction_city", label: "Jurisdiction city", type: "text", required: true, placeholder: "Mumbai" },
      ],
    },
  ],

  render(e) {
    const p1 = e.jv_p1_name || "[Party 1]";
    const p2 = e.jv_p2_name || "[Party 2]";
    const jvEntity = e.jv_entity_name || "[JV Entity]";
    const structure = e.jv_structure || "jv_company";
    const p1eq = Number(e.jv_p1_equity || 0);
    const p2eq = Number(e.jv_p2_equity || 0);
    const ncYears = e.jv_non_compete_years || "2";
    const exitMech = e.jv_exit_mechanism || "put_call";
    const termLabel = { "perpetual": "perpetual (until wound up or dissolved)", "5years": "5 years", "10years": "10 years", "project": "the duration of the project" }[e.jv_term || "perpetual"];

    const reservedMatters = "The following matters shall require the unanimous approval of all Parties / all board members:\n\n(a) any amendment to the constitutional documents of the JV entity;\n(b) issuance of new shares / equity interests or any dilution of existing holdings;\n(c) incurrence of debt above ₹1,00,00,000 (Rupees One Crore) per transaction;\n(d) sale or disposal of any material asset of the JV;\n(e) commencement of new business lines outside the JV purpose;\n(f) appointment or removal of the CEO / Managing Director;\n(g) declaration or payment of dividends;\n(h) commencement of litigation or settlement above ₹50,00,000;\n(i) winding up or dissolution of the JV entity;\n(j) any related-party transaction between the JV and a Party.";

    const exitText = (() => {
      if (exitMech === "put_call") return "Russian Roulette (Put / Call Option). If the Parties cannot resolve a deadlock within 60 days:\n\n(a) Either Party (\"Offering Party\") may serve a notice specifying a per-share price at which it is willing to buy the other Party's shares or sell its own shares;\n\n(b) The receiving Party shall, within 30 days, either buy all of the Offering Party's shares at the specified price, or sell all of its own shares to the Offering Party at the specified price;\n\n(c) If the receiving Party fails to respond within 30 days, it shall be deemed to have sold its shares to the Offering Party at the specified price.";
      if (exitMech === "rofr") return "Right of First Refusal. No Party may transfer its shares to a third party without first offering them to the other Party at the same price and on the same terms as the third-party offer. The other Party has 30 days to exercise its ROFR. If not exercised, the transferring Party may proceed with the third-party transfer at no less than the offered price.";
      if (exitMech === "tag_drag") return "Tag-Along and Drag-Along. Tag-Along: If one Party (\"Seller\") agrees to sell its shares to a third party, the other Party has the right to participate in the sale and sell its shares on the same terms (pro-rata). Drag-Along: If a Party holding more than 51% of the JV equity agrees to sell to a third party, it may require the other Party to sell its shares on the same terms.";
      return "The Parties agree on the following exit mechanisms: (a) Right of First Refusal on all share transfers; (b) Tag-along rights for the minority party; (c) Drag-along rights for the majority party (above 51%); and (d) Russian Roulette / put-call option as a deadlock resolution mechanism.";
    })();

    const blocks: DocSection[] = [];

    blocks.push({ kind: "title", text: "JOINT VENTURE AGREEMENT" });

    blocks.push({
      kind: "para",
      text:
        'THIS JOINT VENTURE AGREEMENT ("Agreement") is entered into as of [DATE] between:\n\n' +
        '1. ' + p1 + ', ' + (e.jv_p1_country && e.jv_p1_country !== "India" ? "a company incorporated in " + e.jv_p1_country + ", " : "") + 'having its registered office at ' + (e.jv_p1_addr || "[Address]") + ', represented by ' + (e.jv_p1_signatory || "[Signatory]") + ' (hereinafter "Party 1"); AND\n\n' +
        '2. ' + p2 + ', ' + (e.jv_p2_country && e.jv_p2_country !== "India" ? "a company incorporated in " + e.jv_p2_country + ", " : "") + 'having its registered office at ' + (e.jv_p2_addr || "[Address]") + ', represented by ' + (e.jv_p2_signatory || "[Signatory]") + ' (hereinafter "Party 2").\n\n' +
        'Party 1 and Party 2 are collectively referred to as "Parties".',
    });

    const clauses: DocSection[] = [
      {
        kind: "clause", number: 1, title: "Joint Venture — Purpose and Structure",
        text: "The Parties agree to establish a joint venture for the following purpose:\n\n" + (e.jv_purpose || "[Purpose of JV]") + "\n\nThe JV shall be " + (structure === "contractual" ? "operated as an unincorporated contractual joint venture, without forming a separate legal entity." : "carried out through a " + (structure === "jv_llp" ? "Limited Liability Partnership (LLP)" : "private limited company") + " to be incorporated / already incorporated under the name \"" + jvEntity + "\" (\"JV Entity\").\n\nThe Parties shall take all steps necessary to incorporate the JV Entity and shall execute all documents required for the same."),
      },
      {
        kind: "clause", number: 2, title: "Term",
        text: "This Agreement is effective from [DATE] and shall continue for " + termLabel + ", unless earlier terminated in accordance with this Agreement.",
      },
      {
        kind: "clause", number: 3, title: "Equity and Capital Contributions",
        text: "The equity interests in the JV shall be held as follows:\n\n" +
          "Party 1 (" + p1 + "): " + p1eq + "%\n" +
          "Party 2 (" + p2 + "): " + p2eq + "%\n\n" +
          "Contributions:\n" +
          "Party 1 shall contribute: " + (e.jv_p1_contribution || "[Contribution]") + "\n" +
          "Party 2 shall contribute: " + (e.jv_p2_contribution || "[Contribution]") + "\n\n" +
          "Additional capital requirements shall be funded by the Parties in proportion to their equity holdings, unless otherwise agreed in writing. Neither Party shall be obligated to provide capital beyond its agreed contribution without written consent." +
          (e.jv_foreign_partner === "yes" ? "\n\nFEMA / FDI Compliance: The foreign Party's contribution constitutes foreign direct investment and shall comply with FEMA 20(R)/2017, the applicable FDI sectoral cap and route, and the RBI's pricing guidelines. FC-GPR shall be filed with RBI within 30 days of allotment." : ""),
      },
      {
        kind: "clause", number: 4, title: "Management and Board Composition",
        text: "The JV Entity shall be managed by a Board of Directors / Governing Committee comprising:\n\n" +
          "Party 1 nominees: " + (e.jv_p1_board_seats || "[N]") + " director(s)\n" +
          "Party 2 nominees: " + (e.jv_p2_board_seats || "[N]") + " director(s)\n\n" +
          "Each Party shall have the right to appoint and remove its nominees. Ordinary decisions shall be taken by a simple majority of the Board. " +
          (e.jv_reserved_matters === "yes" ? reservedMatters : "All decisions shall be taken by simple majority."),
      },
      {
        kind: "clause", number: 5, title: "Profit Sharing and Dividends",
        text: "Profits and losses of the JV shall be shared between the Parties in proportion to their equity holdings (" + p1eq + "% / " + p2eq + "%) unless otherwise agreed. Dividends shall be declared by the Board as per the profits available for distribution, after retaining adequate reserves for business operations and debt obligations. Profits available for distribution shall be calculated after meeting all operational expenses, taxes, and capital expenditure approved by the Board.",
      },
      {
        kind: "clause", number: 6, title: "Non-Compete",
        text: "During the term of this Agreement and for " + ncYears + " year(s) after exit, each Party agrees not to, directly or indirectly, carry on or invest in a business that competes with the JV's core purpose as defined in Clause 1, within India, without the prior written consent of the other Party. Each Party acknowledges that the non-compete period and scope are reasonable given the nature of the JV.",
      },
      {
        kind: "clause", number: 7, title: "Transfer of Equity and Exit Mechanisms",
        text: exitText,
      },
      {
        kind: "clause", number: 8, title: "Deadlock",
        text: "A 'Deadlock' arises if the Parties are unable to agree on a Reserved Matter within 30 days of the matter being formally raised. On a Deadlock, the Parties shall first refer the matter to their respective CEOs / most senior management for resolution within 30 days. If unresolved, the exit mechanism in Clause 7 shall be triggered.",
      },
      {
        kind: "clause", number: 9, title: "Termination",
        text: "This Agreement may be terminated:\n\n(a) By mutual written agreement of all Parties;\n\n(b) By either Party upon material breach by the other that is not cured within 45 days of written notice;\n\n(c) Upon insolvency, winding up, or dissolution of a Party;\n\n(d) Upon completion of the JV purpose (if project-based).\n\nOn termination, the Parties shall wind up the JV in an orderly manner, pay all liabilities, and distribute residual assets in proportion to their equity holdings.",
      },
      {
        kind: "clause", number: 10, title: "Governing Law and Dispute Resolution",
        text: "This Agreement is governed by the laws of India. Disputes shall be referred to arbitration under the Arbitration and Conciliation Act 1996 by a panel of three arbitrators (one appointed by each Party, and the third by the two appointed arbitrators). The seat of arbitration shall be " + (e.jv_jurisdiction_city || "[City]") + ". The language shall be English.",
      },
    ];

    clauses.forEach((c) => blocks.push(c));

    blocks.push({ kind: "divider" });

    blocks.push({ kind: "para", text: "IN WITNESS WHEREOF the Parties have executed this Agreement as of the date first written above." });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "Party 1\n" + p1 + "\n" + (e.jv_p1_signatory || "[Signatory]"), name: "[Signature & Seal]" },
        { role: "Party 2\n" + p2 + "\n" + (e.jv_p2_signatory || "[Signatory]"), name: "[Signature & Seal]" },
      ],
    });

    return blocks;
  },
};
