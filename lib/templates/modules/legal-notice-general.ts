// ============================================================
// LEGAL NOTICE — GENERAL PURPOSE
// Drop into: /lib/templates/legal-notice-general.ts
// Use case: Formal legal notice by an advocate / sender to
//           a recipient requiring specific action or compliance.
//           Covers recovery of money, breach of contract,
//           service deficiency, property disputes, defamation,
//           and general demand notices.
// Statute refs: Indian Contract Act 1872 (breach of contract);
//   Limitation Act 1963 (notice preserves limitation period);
//   Consumer Protection Act 2019 (notice before consumer
//   forum complaint); CPC 1908 Order V (service of notice);
//   IT Act 2000 s.66A repealed but s.66C/66D relevant for
//   cyber notices; Transfer of Property Act 1882 (property);
//   Negotiable Instruments Act 1881 s.138 (separate template);
//   RERA Act 2016 (real estate notices)
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const legalNoticeGeneral: TemplateModule = {
  meta: {
    id: "legal-notice-general",
    name: "Legal Notice (General)",
    categoryId: "legal-notices",
    category: "Legal Notices",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "General-purpose legal notice by an advocate on behalf of a client. Covers money recovery, breach of contract, service deficiency (consumer), property / possession, unpaid dues, fraud / misrepresentation, defamation, and custom disputes. Includes demand, timeline, and consequences clause.",
    aliases: [
      "legal notice",
      "advocate notice",
      "legal notice India",
      "breach of contract notice",
      "money recovery notice",
      "consumer notice",
      "legal notice format",
      "demand notice",
      "property dispute notice",
    ],
    pages: 3,
    minutes: 8,
    status: "live",
  },

  groups: [
    {
      title: "Client (sender) details",
      fields: [
        { id: "ln_client_name", label: "Client full name / company name", type: "text", required: true, placeholder: "Priya Sharma / Acme Technologies Pvt Ltd" },
        { id: "ln_client_addr", label: "Client address", type: "textarea", rows: 2, required: true },
        {
          id: "ln_client_type",
          label: "Client type",
          type: "select",
          default: "individual",
          options: [
            { value: "individual", label: "Individual" },
            { value: "company", label: "Company / LLP" },
            { value: "partnership", label: "Partnership Firm" },
          ],
        },
      ],
    },
    {
      title: "Advocate / sender details",
      fields: [
        { id: "ln_advocate_name", label: "Advocate / counsel name", type: "text", required: true, placeholder: "Adv. Arjun Mehta" },
        { id: "ln_advocate_addr", label: "Advocate's chamber / office address", type: "textarea", rows: 2, required: true },
        { id: "ln_advocate_enrol", label: "Bar Council enrolment number", type: "text", placeholder: "KAR/1234/2010" },
        {
          id: "ln_send_method",
          label: "Mode of sending",
          type: "select",
          default: "rpad",
          options: [
            { value: "rpad", label: "Registered Post with A/D (RPAD)" },
            { value: "speed_post", label: "Speed Post" },
            { value: "courier", label: "Courier with POD" },
            { value: "email_rpad", label: "Email + RPAD (both)" },
            { value: "whatsapp_rpad", label: "WhatsApp + RPAD" },
          ],
        },
      ],
    },
    {
      title: "Noticee (recipient) details",
      fields: [
        { id: "ln_noticee_name", label: "Noticee full name / company name", type: "text", required: true, placeholder: "Rahul Verma / XYZ Builders Pvt Ltd" },
        { id: "ln_noticee_addr", label: "Noticee address", type: "textarea", rows: 2, required: true },
        {
          id: "ln_noticee_type",
          label: "Noticee type",
          type: "select",
          default: "individual",
          options: [
            { value: "individual", label: "Individual" },
            { value: "company", label: "Company" },
            { value: "partnership", label: "Partnership / LLP" },
            { value: "government", label: "Government / Authority" },
          ],
        },
        { id: "ln_noticee_email", label: "Noticee email (if sending by email)", type: "email" },
      ],
    },
    {
      title: "Nature of dispute",
      fields: [
        {
          id: "ln_dispute_type",
          label: "Nature of dispute",
          type: "select",
          required: true,
          default: "money_recovery",
          options: [
            { value: "money_recovery", label: "Money recovery / unpaid dues" },
            { value: "breach_contract", label: "Breach of contract" },
            { value: "consumer_deficiency", label: "Consumer deficiency / service complaint" },
            { value: "property_possession", label: "Property dispute / eviction / possession" },
            { value: "fraud_misrep", label: "Fraud / misrepresentation / cheating" },
            { value: "defamation", label: "Defamation / damage to reputation" },
            { value: "employment", label: "Employment dispute (dues / wrongful termination)" },
            { value: "rera", label: "RERA — Builder delay / deficiency" },
            { value: "intellectual_property", label: "IP infringement (trademark / copyright)" },
            { value: "custom", label: "Custom / other" },
          ],
        },
        { id: "ln_background", label: "Background and facts (chronological narration)", type: "textarea", rows: 6, required: true, placeholder: "On [date], my client entered into a [contract type] with you for [purpose]. Despite fulfilling all obligations, you have failed to [specific failure]. Specifically:\n1. On [date], [event 1].\n2. On [date], [event 2].\n3. Despite [demands / reminders], you have failed to respond / comply." },
        { id: "ln_amount_claimed", label: "Amount claimed / demanded (₹)", type: "number", placeholder: "500000" },
        { id: "ln_interest_rate", label: "Interest claimed (% p.a., if applicable)", type: "number", placeholder: "18" },
        { id: "ln_period_of_default", label: "Default period (describe)", type: "text", placeholder: "Since [date] to date" },
        { id: "ln_documents_relied", label: "Documents relied upon", type: "textarea", rows: 2, placeholder: "Invoice No. INV-2024-001 dated [date]; Agreement dated [date]; Email correspondence dated [dates]" },
      ],
    },
    {
      title: "Demand and consequences",
      fields: [
        { id: "ln_demand", label: "Specific demand (what you want them to do)", type: "textarea", rows: 3, required: true, placeholder: "Pay the outstanding amount of ₹5,00,000 along with interest at 18% p.a. from [date] to date of payment.\n\nOR\n\nVacate the premises at [address] and hand over vacant possession forthwith." },
        { id: "ln_response_days", label: "Days given to respond / comply", type: "select", default: "15", options: [{ value: "7", label: "7 days" }, { value: "15", label: "15 days" }, { value: "30", label: "30 days" }, { value: "60", label: "60 days" }] },
        {
          id: "ln_consequences",
          label: "Consequences if demand not met",
          type: "select",
          default: "civil_suit",
          options: [
            { value: "civil_suit", label: "Civil suit for recovery / specific performance / injunction" },
            { value: "consumer_forum", label: "Complaint before Consumer Forum / NCDRC" },
            { value: "criminal_complaint", label: "Criminal complaint (IPC / BNS)" },
            { value: "arbitration", label: "Arbitration proceedings" },
            { value: "rera", label: "Complaint before RERA Authority" },
            { value: "all_remedies", label: "All available legal remedies, civil and criminal" },
          ],
        },
        {
          id: "ln_without_prejudice",
          label: "Mark as 'Without Prejudice'?",
          type: "radio",
          default: "no",
          options: [
            { value: "no", label: "No — open notice (standard)" },
            { value: "yes", label: "Yes — without prejudice to all rights and remedies" },
          ],
        },
      ],
    },
  ],

  render(e) {
    const client = e.ln_client_name || "[Client]";
    const advocate = e.ln_advocate_name || "[Advocate]";
    const noticee = e.ln_noticee_name || "[Noticee]";
    const amount = Number(e.ln_amount_claimed || 0);
    const interest = Number(e.ln_interest_rate || 0);
    const days = e.ln_response_days || "15";

    const sendMethodLabel = {
      rpad: "REGISTERED POST WITH ACKNOWLEDGEMENT DUE (RPAD)",
      speed_post: "SPEED POST",
      courier: "COURIER WITH PROOF OF DELIVERY",
      email_rpad: "EMAIL AND REGISTERED POST WITH A/D",
      whatsapp_rpad: "WHATSAPP AND REGISTERED POST WITH A/D",
    }[e.ln_send_method || "rpad"] || "REGISTERED POST WITH A/D";

    const disputeLabel = {
      money_recovery: "Recovery of Money / Outstanding Dues",
      breach_contract: "Breach of Contract",
      consumer_deficiency: "Deficiency in Service / Consumer Complaint",
      property_possession: "Property Dispute / Possession",
      fraud_misrep: "Fraud and Misrepresentation",
      defamation: "Defamation / Damage to Reputation",
      employment: "Employment Dues / Wrongful Termination",
      rera: "RERA — Builder Deficiency",
      intellectual_property: "Intellectual Property Infringement",
      custom: "Legal Notice",
    }[e.ln_dispute_type || "money_recovery"] || "Legal Notice";

    const consequencesLabel = {
      civil_suit: "filing a civil suit before the competent court for recovery / specific performance / injunction / damages",
      consumer_forum: "filing a complaint before the appropriate Consumer Disputes Redressal Commission",
      criminal_complaint: "filing a criminal complaint before the appropriate Magistrate / Police",
      arbitration: "invoking arbitration proceedings as per the arbitration clause in the agreement",
      rera: "filing a complaint before the RERA Authority / Adjudicating Officer",
      all_remedies: "initiating all available civil and criminal remedies, including civil suit, criminal complaint, and regulatory proceedings",
    }[e.ln_consequences || "civil_suit"] || "initiating appropriate legal proceedings";

    const blocks: DocSection[] = [];

    // Letterhead
    blocks.push({
      kind: "subtitle",
      text: advocate.toUpperCase() + "\nAdvocate\n" + (e.ln_advocate_addr || "[Chamber Address]") + (e.ln_advocate_enrol ? "\nEnrolment No.: " + e.ln_advocate_enrol : ""),
    });

    blocks.push({
      kind: "kv",
      pairs: [
        { label: "Sent by", value: sendMethodLabel },
        { label: "Date", value: "[DATE]" },
      ],
    });

    // Addressee
    blocks.push({
      kind: "para",
      text: "To,\n" + noticee + "\n" + (e.ln_noticee_addr || "[Noticee Address]") + (e.ln_noticee_email ? "\nEmail: " + e.ln_noticee_email : ""),
    });

    // Subject line
    blocks.push({
      kind: "subtitle",
      text:
        (e.ln_without_prejudice === "yes" ? "WITHOUT PREJUDICE\n\n" : "") +
        "LEGAL NOTICE\nRe: " + disputeLabel + " — Notice on behalf of " + client,
    });

    // Body
    blocks.push({
      kind: "para",
      text:
        "Under the instructions of and on behalf of my client, " +
        client +
        (e.ln_client_addr ? " of " + e.ln_client_addr : "") +
        ", I address you this legal notice as under:",
    });

    blocks.push({
      kind: "clause",
      number: 1,
      title: "Background and Facts",
      text: e.ln_background || "[Background narration]",
    });

    if (e.ln_documents_relied) {
      blocks.push({
        kind: "clause",
        number: 2,
        title: "Documents Relied Upon",
        text: "My client relies upon the following documents in support of this notice: " + e.ln_documents_relied,
      });
    }

    const nextNum = e.ln_documents_relied ? 3 : 2;

    if (amount > 0) {
      blocks.push({
        kind: "clause",
        number: nextNum,
        title: "Amount Due and Payable",
        text:
          "The total amount due and payable by you to my client as on date is as follows:\n\n" +
          "Principal amount: ₹" + amount.toLocaleString("en-IN") + "\n" +
          (interest > 0 ? "Interest @ " + interest + "% p.a. from [DATE OF DEFAULT] to date: ₹[INTEREST AMOUNT]\n" : "") +
          "Total: ₹" + amount.toLocaleString("en-IN") + (interest > 0 ? " + interest as calculated" : "") + "\n\n" +
          "My client reserves the right to claim further interest till the date of actual payment.",
      });
    }

    blocks.push({
      kind: "clause",
      number: nextNum + (amount > 0 ? 1 : 0),
      title: "Demand",
      text:
        "Through this notice, my client hereby demands that you:\n\n" +
        (e.ln_demand || "[Specific demand]") +
        "\n\nYou are called upon to comply with the above demand within " +
        days +
        " days from the date of receipt of this notice.",
    });

    blocks.push({
      kind: "clause",
      number: nextNum + (amount > 0 ? 2 : 1),
      title: "Consequences of Non-Compliance",
      text:
        "Please take notice that in the event you fail to comply with the above demand within the stipulated period, my client shall be constrained to initiate appropriate legal proceedings against you, including " +
        consequencesLabel +
        ", entirely at your risk, cost, and consequences. My client reserves the right to claim all costs, legal fees, and damages arising from such proceedings.\n\n" +
        "This notice is issued without prejudice to any and all rights and remedies available to my client under law, and nothing herein shall be construed as a waiver of any such rights.",
    });

    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "Advocate for the Sender\n" + advocate, name: "[Signature & Stamp]" },
      ],
    });

    blocks.push({
      kind: "para",
      text:
        "Enclosures: Copies of documents as referred to above.\n\n" +
        "Note to client: Keep the original postal receipt / courier POD / delivery confirmation as proof of service. The date of service is the date of delivery / date of refusal (if refused). Follow up with a second notice if not received within 7 days of dispatch.",
    });

    return blocks;
  },
};
