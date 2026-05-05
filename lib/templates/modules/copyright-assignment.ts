// ============================================================
// COPYRIGHT ASSIGNMENT DEED
// Drop into: /lib/templates/copyright-assignment.ts
// Use case: Deed of assignment of copyright in literary, artistic,
//           musical, dramatic works, software, or any other
//           copyright-protected work under the Copyright Act 1957.
// Statute refs: Copyright Act 1957 ss.17–19 (assignment of
//   copyright); s.18 (right to assign); s.19 (mode of assignment
//   — must be in writing, signed by assignor); s.19A (disputes);
//   s.21 (relinquishment); s.57 (moral rights — not assignable);
//   Indian Contract Act 1872; IT Act 1961 (royalties on software
//   copyright, TDS obligations)
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const copyrightAssignment: TemplateModule = {
  meta: {
    id: "copyright-assignment",
    name: "Copyright Assignment Deed",
    categoryId: "ip",
    category: "IP & Trademarks",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Deed of assignment of copyright under the Copyright Act 1957. Covers literary, artistic, musical, dramatic works, and software. Assigns full or limited copyright with or without moral rights waiver, includes future works provision, and covers royalty / nil consideration structures.",
    aliases: [
      "copyright assignment",
      "copyright transfer",
      "IP assignment copyright",
      "software copyright assignment",
      "content copyright assignment",
      "copyright deed India",
    ],
    pages: 5,
    minutes: 8,
    status: "live",
  },

  groups: [
    {
      title: "Assignor",
      fields: [
        { id: "ca_assignor_name", label: "Assignor full legal name", type: "text", required: true, placeholder: "Vikram Nair (or Acme Creative Studios Pvt Ltd)" },
        { id: "ca_assignor_addr", label: "Assignor address", type: "textarea", rows: 2, required: true },
        { id: "ca_assignor_type", label: "Assignor type", type: "select", default: "individual", options: [{ value: "individual", label: "Individual / Freelancer" }, { value: "company", label: "Company" }, { value: "llp", label: "LLP" }] },
        { id: "ca_assignor_rep", label: "Signatory name & designation (if company)", type: "text", placeholder: "Vikram Nair, Director" },
      ],
    },
    {
      title: "Assignee",
      fields: [
        { id: "ca_assignee_name", label: "Assignee full legal name", type: "text", required: true, placeholder: "TechStartup Private Limited" },
        { id: "ca_assignee_addr", label: "Assignee address", type: "textarea", rows: 2, required: true },
        { id: "ca_assignee_rep", label: "Signatory name & designation", type: "text", placeholder: "Priya Sharma, CEO" },
      ],
    },
    {
      title: "Work(s) being assigned",
      fields: [
        {
          id: "ca_work_type",
          label: "Type of copyrighted work",
          type: "select",
          required: true,
          default: "software",
          options: [
            { value: "software", label: "Software / Source Code / App" },
            { value: "literary", label: "Literary work (book / article / content)" },
            { value: "artistic", label: "Artistic work (designs / illustrations / UI/UX)" },
            { value: "musical", label: "Musical work (composition / lyrics)" },
            { value: "audiovisual", label: "Audiovisual work (film / video)" },
            { value: "database", label: "Database / compilation" },
            { value: "mixed", label: "Multiple / mixed works (describe below)" },
          ],
        },
        { id: "ca_work_title", label: "Title / description of the work(s)", type: "textarea", rows: 3, required: true, placeholder: "A mobile application for GST reconciliation named 'GST-Buddy', version 1.0 and all subsequent versions, including all source code, documentation, and UI/UX designs." },
        { id: "ca_creation_date", label: "Date of creation / completion (approx.)", type: "date" },
        { id: "ca_first_pub_date", label: "Date of first publication (if published)", type: "date" },
        { id: "ca_reg_no", label: "Copyright Registration No. (if registered with Copyright Office)", type: "text", placeholder: "L-123456/2024" },
        {
          id: "ca_future_works",
          label: "Does the assignment cover future works / versions?",
          type: "radio",
          required: true,
          default: "yes",
          options: [
            { value: "yes", label: "Yes — includes updates, enhancements, and future versions" },
            { value: "no", label: "No — specific work only" },
          ],
        },
      ],
    },
    {
      title: "Scope and consideration",
      fields: [
        {
          id: "ca_rights_assigned",
          label: "Rights being assigned",
          type: "select",
          required: true,
          default: "all",
          options: [
            { value: "all", label: "All economic rights (complete assignment)" },
            { value: "reproduction_distribution", label: "Reproduction and distribution rights only" },
            { value: "digital_online", label: "Digital / online rights only" },
            { value: "print_only", label: "Print / physical rights only" },
          ],
        },
        {
          id: "ca_territory_scope",
          label: "Territory",
          type: "select",
          required: true,
          default: "worldwide",
          options: [
            { value: "worldwide", label: "Worldwide" },
            { value: "india_only", label: "India only" },
          ],
        },
        {
          id: "ca_consideration",
          label: "Consideration (₹)",
          type: "number",
          required: true,
          placeholder: "500000",
        },
        {
          id: "ca_consideration_type",
          label: "Consideration type",
          type: "select",
          default: "lump_sum",
          options: [
            { value: "lump_sum", label: "Lump sum on execution" },
            { value: "royalty", label: "Ongoing royalty on sales / usage" },
            { value: "nil", label: "Nil — intra-company / natural love and affection" },
          ],
        },
        { id: "ca_royalty_rate", label: "Royalty rate (% of net revenue) — if royalty basis", type: "number", placeholder: "10" },
        {
          id: "ca_moral_rights",
          label: "Moral rights waiver (s.57 rights — author's right of attribution and integrity)",
          type: "radio",
          required: true,
          default: "waived",
          options: [
            { value: "waived", label: "Assignor waives moral rights to the extent permissible by law" },
            { value: "retained", label: "Moral rights retained — attribution required" },
          ],
        },
      ],
    },
  ],

  render(e) {
    const assignor = e.ca_assignor_name || "[Assignor]";
    const assignee = e.ca_assignee_name || "[Assignee]";
    const workTitle = e.ca_work_title || "[Work Description]";
    const consideration = Number(e.ca_consideration || 0);

    const workTypeLabel = {
      software: "computer programme / software",
      literary: "literary work",
      artistic: "artistic work",
      musical: "musical work",
      audiovisual: "audiovisual / cinematographic work",
      database: "database / compilation",
      mixed: "original works",
    }[e.ca_work_type || "software"] || "work";

    const rightsLabel = {
      all: "all economic rights subsisting in the Work under the Copyright Act 1957",
      reproduction_distribution: "the rights of reproduction and distribution of the Work",
      digital_online: "all digital and online exploitation rights in the Work",
      print_only: "the rights of printing, publishing, and physical distribution of the Work",
    }[e.ca_rights_assigned || "all"] || "all rights";

    const territoryLabel = {
      worldwide: "the world",
      india_only: "the territory of India",
    }[e.ca_territory_scope || "worldwide"] || "worldwide";

    const blocks: DocSection[] = [];

    blocks.push({
      kind: "info",
      title: "Copyright Assignment — Applicable Law",
      acts: [
        "Copyright Act 1957 — ss.17–19 (Assignment), s.57 (Moral Rights)",
        "Indian Contract Act 1872",
        "Indian Stamp Act 1899",
        "IT Act 1961 — s.194J (TDS on royalties / software fees)",
      ],
      text: "Copyright assignment must be in writing signed by the assignor (s.19). Moral rights under s.57 are not fully assignable. Future works assignment without a specified period is limited to 5 years (s.18 proviso).",
    });

    blocks.push({ kind: "title", text: "DEED OF ASSIGNMENT OF COPYRIGHT" });

    blocks.push({
      kind: "para",
      text:
        'THIS DEED OF ASSIGNMENT OF COPYRIGHT ("Deed") is made and executed on [DATE] by and between:\n\n' +
        "1. " + assignor + (e.ca_assignor_addr ? " of " + e.ca_assignor_addr : "") + ' ("Assignor"); and\n\n' +
        "2. " + assignee + (e.ca_assignee_addr ? " of " + e.ca_assignee_addr : "") + ' ("Assignee").\n\nTogether, the "Parties".',
    });

    const clauses: DocSection[] = [
      {
        kind: "clause",
        number: 1,
        title: "Background",
        text:
          "The Assignor is the author / creator of and is vested with all copyright in the " +
          workTypeLabel +
          " described as: " +
          workTitle +
          (e.ca_reg_no ? " (Copyright Registration No. " + e.ca_reg_no + ")" : "") +
          ' ("Work"). The Assignor has agreed to assign the copyright in the Work to the Assignee on the terms set out in this Deed.',
      },
      {
        kind: "clause",
        number: 2,
        title: "Assignment of Copyright",
        text:
          "In consideration of " +
          (e.ca_consideration_type === "nil"
            ? "natural love and affection and other valuable consideration"
            : e.ca_consideration_type === "royalty"
            ? "the royalty payments described in Clause 4"
            : "₹" + consideration.toLocaleString("en-IN") + " (Rupees [AMOUNT_IN_WORDS] only) paid by the Assignee to the Assignor (receipt acknowledged)") +
          ", the Assignor hereby ASSIGNS, TRANSFERS, and CONVEYS to the Assignee absolutely " +
          rightsLabel +
          " throughout " +
          territoryLabel +
          " for the full term of copyright protection and all renewals and extensions thereof.\n\n" +
          "The assignment includes:\n\n" +
          "(a) the right to reproduce, publish, communicate to the public, adapt, translate, and exploit the Work in any medium;\n\n" +
          "(b) the right to create derivative works;\n\n" +
          "(c) the right to assign, licence, or sub-licence the Work to third parties;\n\n" +
          "(d) the right to bring proceedings for infringement and retain damages;\n\n" +
          (e.ca_future_works === "yes" ? "(e) all updates, enhancements, modifications, and future versions of the Work, which shall vest in the Assignee immediately upon creation;" : "") +
          "\n\n(f) all documentation, source materials, and related assets comprising or associated with the Work.",
      },
      {
        kind: "clause",
        number: 3,
        title: "Moral Rights",
        text:
          e.ca_moral_rights === "waived"
            ? "To the fullest extent permitted by law, the Assignor hereby waives all moral rights in the Work under Section 57 of the Copyright Act 1957, including the right to claim authorship and the right to object to any modification or adaptation of the Work. The Assignor acknowledges that the Assignee may adapt, modify, or use the Work without attribution."
            : 'The Assignor retains moral rights in the Work under Section 57 of the Copyright Act 1957. The Assignee shall: (a) give appropriate credit to the Assignor as the original author of the Work; and (b) not distort or mutilate the Work in a manner prejudicial to the Assignor\'s honour or reputation. Moral rights are personal to the Assignor and cannot be further assigned.',
      },
    ];

    if (e.ca_consideration_type === "royalty" && e.ca_royalty_rate) {
      clauses.push({
        kind: "clause",
        number: 4,
        title: "Royalty Payments",
        text:
          "In consideration for this assignment, the Assignee shall pay the Assignor a royalty of " +
          e.ca_royalty_rate +
          "% of net revenues from exploitation of the Work, payable quarterly within 30 days of each quarter-end, together with a usage statement. The Assignee shall maintain accurate records and permit annual audit by the Assignor on 30 days' notice.",
      });
    }

    const nextNum = (e.ca_consideration_type === "royalty" ? 5 : 4);

    clauses.push(
      {
        kind: "clause",
        number: nextNum,
        title: "Assignor's Representations and Warranties",
        text:
          "The Assignor represents and warrants that:\n\n" +
          "(a) the Assignor is the sole author of the Work and has the full right to assign the copyright without obtaining consent of any third party;\n\n" +
          "(b) the Work is original and does not infringe any copyright, trade secret, patent, or other intellectual property right of any third party;\n\n" +
          "(c) the Work is not subject to any existing assignment, exclusive licence, charge, or encumbrance;\n\n" +
          "(d) the Work does not contain any defamatory, obscene, or unlawful content.",
      },
      {
        kind: "clause",
        number: nextNum + 1,
        title: "Further Assurance",
        text:
          "The Assignor shall, at the Assignee's cost and reasonable request, execute and deliver such further documents and do all such acts as may be necessary to vest the copyright in the Assignee and to enable the Assignee to register or record the assignment with the Copyright Office of India or any other authority.",
      },
      {
        kind: "clause",
        number: nextNum + 2,
        title: "Governing Law",
        text:
          "This Deed is governed by the laws of India, including the Copyright Act 1957. Any dispute arising out of or in connection with this Deed shall be resolved by arbitration under the Arbitration and Conciliation Act, 1996, at [CITY].",
      }
    );

    clauses.forEach((c) => blocks.push(c));

    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "para",
      text: "IN WITNESS WHEREOF the Parties have executed this Deed on the date first written above.",
    });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "ASSIGNOR\n" + assignor, name: e.ca_assignor_rep || "[Signature]" },
        { role: "ASSIGNEE\n" + assignee, name: e.ca_assignee_rep || "[Name & Designation]" },
      ],
    });

    blocks.push({
      kind: "para",
      text:
        "WITNESSES:\n1. Name: ___________________ Signature: _______________ Address: _______________\n2. Name: ___________________ Signature: _______________ Address: _______________",
    });

    return blocks;
  },
};
