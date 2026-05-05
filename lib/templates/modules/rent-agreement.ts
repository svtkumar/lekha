// ============================================================
// RENT AGREEMENT / LEASE DEED
// Drop into: /lib/templates/rent-agreement.ts
// Use case: Residential or commercial rental agreement between
//           landlord and tenant. Covers 11-month leave-and-licence
//           (most common) or registered lease for 12+ months.
// Statute refs: Transfer of Property Act 1882 ss.105–117 (lease);
//   Registration Act 1908 s.17 (compulsory registration for leases
//   > 1 year); Specific Relief Act 1963 s.12 (specific performance);
//   State Rent Control Acts (Maharashtra Rent Control Act 1999;
//   Delhi Rent Control Act 1958; Karnataka Rent Act 2001 etc.);
//   Indian Contract Act 1872; Indian Stamp Act 1899 / state stamp
//   acts (stamp duty on lease deeds)
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const rentAgreement: TemplateModule = {
  meta: {
    id: "rent-agreement",
    name: "Rent Agreement / Lease Deed",
    categoryId: "property",
    category: "Property",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Residential or commercial rent agreement / lease deed. Generates an 11-month leave-and-licence (no registration required) or a registered lease for longer terms. Covers rent, security deposit, maintenance, lock-in period, termination, and pet/alteration restrictions.",
    aliases: [
      "rent agreement",
      "lease deed",
      "rental agreement",
      "house rent agreement",
      "commercial rent agreement",
      "leave and licence agreement",
      "flat rent agreement",
      "11 month rent agreement",
    ],
    pages: 7,
    minutes: 10,
    status: "live",
  },

  groups: [
    {
      title: "Landlord details",
      fields: [
        { id: "ra_landlord_name", label: "Landlord full name", type: "text", required: true, placeholder: "Suresh Kumar" },
        { id: "ra_landlord_addr", label: "Landlord correspondence address", type: "textarea", rows: 2, required: true },
        { id: "ra_landlord_pan", label: "Landlord PAN", type: "text", placeholder: "AABCS1234C" },
        { id: "ra_landlord_aadhar", label: "Landlord Aadhaar (last 4 digits — for stamp paper)", type: "text", placeholder: "XXXX" },
      ],
    },
    {
      title: "Tenant details",
      fields: [
        { id: "ra_tenant_name", label: "Tenant full name (first tenant)", type: "text", required: true, placeholder: "Priya Sharma" },
        { id: "ra_tenant_addr", label: "Tenant permanent / home address", type: "textarea", rows: 2, required: true },
        { id: "ra_tenant_pan", label: "Tenant PAN", type: "text", placeholder: "AABCT5678D" },
        { id: "ra_tenant_company", label: "Tenant company (if corporate lease)", type: "text", placeholder: "Acme Technologies Pvt Ltd (for employee accommodation)" },
        { id: "ra_co_tenant", label: "Co-tenant / joint tenant name (if any)", type: "text" },
      ],
    },
    {
      title: "Property details",
      fields: [
        { id: "ra_property_addr", label: "Full property address", type: "textarea", rows: 3, required: true, placeholder: "Flat No. 302, 3rd Floor, Prestige Sunrise Tower, 15th Cross, Koramangala 4th Block, Bengaluru – 560 034" },
        {
          id: "ra_property_type",
          label: "Property type",
          type: "select",
          required: true,
          default: "residential_flat",
          options: [
            { value: "residential_flat", label: "Residential — Flat / Apartment" },
            { value: "residential_house", label: "Residential — Independent House / Villa" },
            { value: "commercial_office", label: "Commercial — Office Space" },
            { value: "commercial_shop", label: "Commercial — Shop / Showroom" },
            { value: "commercial_warehouse", label: "Commercial / Industrial — Warehouse / Godown" },
          ],
        },
        { id: "ra_carpet_area", label: "Carpet / built-up area (sq ft / sq m)", type: "text", placeholder: "950 sq ft" },
        { id: "ra_state", label: "State / UT where property is located", type: "select", required: true, options: [
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
        { id: "ra_city", label: "City", type: "text", required: true },
        {
          id: "ra_furnishing",
          label: "Furnishing status",
          type: "select",
          default: "semi_furnished",
          options: [
            { value: "unfurnished", label: "Unfurnished" },
            { value: "semi_furnished", label: "Semi-furnished" },
            { value: "fully_furnished", label: "Fully furnished" },
          ],
        },
        { id: "ra_fixtures_list", label: "Fixtures / fittings included (brief list)", type: "textarea", rows: 2, placeholder: "AC (2 units), refrigerator, washing machine, modular kitchen with chimney, water purifier" },
      ],
    },
    {
      title: "Rental terms",
      fields: [
        { id: "ra_start_date", label: "Commencement date", type: "date", required: true },
        {
          id: "ra_term_months",
          label: "Agreement term",
          type: "select",
          required: true,
          default: "11",
          options: [
            { value: "11", label: "11 months (leave & licence — no registration required)" },
            { value: "12", label: "12 months (registration required)" },
            { value: "24", label: "24 months (registration required)" },
            { value: "36", label: "36 months (registration required)" },
            { value: "60", label: "5 years (registration required)" },
          ],
        },
        { id: "ra_monthly_rent", label: "Monthly rent (₹)", type: "number", required: true, placeholder: "30000" },
        { id: "ra_maintenance", label: "Society maintenance / utility charges (₹/month)", type: "number", placeholder: "3000" },
        {
          id: "ra_maintenance_who",
          label: "Maintenance charges paid by",
          type: "select",
          default: "tenant",
          options: [
            { value: "tenant", label: "Tenant (over and above rent)" },
            { value: "landlord", label: "Landlord (included in rent)" },
            { value: "na", label: "N/A — no society maintenance" },
          ],
        },
        { id: "ra_security_deposit", label: "Security deposit (₹)", type: "number", required: true, placeholder: "90000" },
        { id: "ra_advance_months", label: "Advance rent months (if any, in addition to deposit)", type: "number", default: "0", placeholder: "0" },
        { id: "ra_rent_due_day", label: "Rent due date (day of month)", type: "number", default: "5", placeholder: "5" },
        {
          id: "ra_rent_escalation",
          label: "Annual rent escalation",
          type: "select",
          default: "5_pct",
          options: [
            { value: "none", label: "No escalation" },
            { value: "5_pct", label: "5% per annum" },
            { value: "10_pct", label: "10% per annum" },
            { value: "custom", label: "Custom (describe in additional terms)" },
          ],
        },
        {
          id: "ra_lock_in",
          label: "Lock-in period",
          type: "select",
          default: "3_months",
          options: [
            { value: "none", label: "No lock-in" },
            { value: "1_month", label: "1 month" },
            { value: "3_months", label: "3 months" },
            { value: "6_months", label: "6 months" },
            { value: "11_months", label: "Full term (11 months)" },
          ],
        },
        { id: "ra_notice_period", label: "Notice period for termination (months)", type: "select", default: "1", options: [{ value: "1", label: "1 month" }, { value: "2", label: "2 months" }, { value: "3", label: "3 months" }] },
      ],
    },
    {
      title: "Additional clauses",
      fields: [
        { id: "ra_pets", label: "Pets allowed?", type: "radio", default: "no", options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }] },
        { id: "ra_subletting", label: "Sub-letting / Airbnb allowed?", type: "radio", default: "no", options: [{ value: "yes", label: "Yes, with written consent" }, { value: "no", label: "No" }] },
        { id: "ra_tds", label: "Is TDS applicable (rent > ₹50,000/month)?", type: "radio", required: true, default: "no", options: [{ value: "yes", label: "Yes — tenant to deduct TDS @ 2% u/s 194-IB" }, { value: "no", label: "No — rent below ₹50,000/month" }] },
        { id: "ra_parking", label: "Parking included?", type: "radio", default: "yes", options: [{ value: "yes", label: "Yes — parking space(s) included" }, { value: "no", label: "No" }] },
        { id: "ra_parking_spaces", label: "No. of parking spaces", type: "number", default: "1", placeholder: "1" },
      ],
    },
  ],

  render(e) {
    const landlord = e.ra_landlord_name || "[Landlord]";
    const tenant = e.ra_tenant_name || "[Tenant]";
    const property = e.ra_property_addr || "[Property Address]";
    const rent = Number(e.ra_monthly_rent || 0);
    const deposit = Number(e.ra_security_deposit || 0);
    const termMonths = Number(e.ra_term_months || 11);
    const maintenance = Number(e.ra_maintenance || 0);
    const noticePeriod = e.ra_notice_period || "1";
    const lockIn = e.ra_lock_in || "3_months";

    const lockInText = {
      none: "no lock-in period",
      "1_month": "a lock-in period of one (1) month",
      "3_months": "a lock-in period of three (3) months",
      "6_months": "a lock-in period of six (6) months",
      "11_months": "a lock-in period equal to the full term of this Agreement",
    }[lockIn] || "a lock-in period of three months";

    const escalationText = {
      none: "no annual escalation",
      "5_pct": "5% per annum at the commencement of each renewal term",
      "10_pct": "10% per annum at the commencement of each renewal term",
      custom: "[as agreed]",
    }[e.ra_rent_escalation || "5_pct"] || "5% per annum";

    const propTypeLabel = {
      residential_flat: "residential flat / apartment",
      residential_house: "residential house / villa",
      commercial_office: "commercial office space",
      commercial_shop: "commercial shop / showroom",
      commercial_warehouse: "commercial / industrial warehouse",
    }[e.ra_property_type || "residential_flat"] || "premises";

    const isLnL = termMonths <= 11;
    const docTitle = isLnL ? "LEAVE AND LICENCE AGREEMENT" : "DEED OF LEASE";

    const blocks: DocSection[] = [];

    blocks.push({
      kind: "stamp_page",
      jurisdiction: e.ra_state || "[State]",
      stampValue: termMonths > 11 ? "As per state stamp act on lease deed" : "As per state stamp act on leave & licence",
      instruction: "Affix stamp paper of appropriate denomination as per " + (e.ra_state ? "[STATE_NAME]" : "applicable state") + " Stamp Act. Execute on stamp paper or franked paper.",
      registrationNote: termMonths > 11
        ? "COMPULSORY REGISTRATION: This deed must be registered with the Sub-Registrar of Assurances under s.17 of the Registration Act, 1908. Both parties must appear in person (or through power of attorney) with original identity documents."
        : "Registration is optional for this 11-month agreement. Online / e-registration is available and recommended.",
    });

    blocks.push({ kind: "title", text: docTitle });

    blocks.push({
      kind: "para",
      text:
        "This " + docTitle + ' ("Agreement") is executed on [DATE] by and between:\n\n' +
        "1. " + landlord + (e.ra_landlord_addr ? " of " + e.ra_landlord_addr : "") + (e.ra_landlord_pan ? " (PAN: " + e.ra_landlord_pan + ")" : "") + ' (hereinafter called the "Licensor / Landlord"); AND\n\n' +
        "2. " + tenant + (e.ra_tenant_addr ? " of " + e.ra_tenant_addr : "") + (e.ra_tenant_pan ? " (PAN: " + e.ra_tenant_pan + ")" : "") +
        (e.ra_co_tenant ? " and " + e.ra_co_tenant : "") +
        (e.ra_tenant_company ? ", employed with " + e.ra_tenant_company : "") +
        ' (hereinafter called the "Licensee / Tenant").',
    });

    const clauses: DocSection[] = [
      {
        kind: "clause",
        number: 1,
        title: "Grant of Licence / Lease",
        text:
          "The Licensor hereby grants to the Licensee a " +
          (isLnL ? "leave and licence" : "lease") +
          " in respect of the " +
          propTypeLabel +
          " bearing the address " +
          property +
          (e.ra_carpet_area ? " (area: " + e.ra_carpet_area + ")" : "") +
          (e.ra_furnishing !== "unfurnished" ? ", " + e.ra_furnishing + " with " + (e.ra_fixtures_list || "fixtures as listed in the inventory") : "") +
          (e.ra_parking === "yes" ? ", together with " + (e.ra_parking_spaces || "1") + " parking space(s)" : "") +
          " (" + '"Premises"' + "), for a term of " + termMonths + " months commencing from [START_DATE] and expiring on [END_DATE], for the purpose of " +
          (["residential_flat", "residential_house"].includes(e.ra_property_type) ? "residential occupation only" : "commercial / business use only") +
          ".",
      },
      {
        kind: "clause",
        number: 2,
        title: "Licence Fee / Rent",
        text:
          "The Licensee shall pay to the Licensor a monthly " +
          (isLnL ? "licence fee" : "rent") +
          " of ₹" + rent.toLocaleString("en-IN") +
          " (Rupees [RENT_IN_WORDS] only), payable on or before the " + (e.ra_rent_due_day || "5") + "th day of each calendar month" +
          (e.ra_maintenance_who === "tenant" && maintenance > 0 ? ", plus society maintenance / utility charges of ₹" + maintenance.toLocaleString("en-IN") + " per month payable directly to the society" : "") +
          ". Payment shall be made by bank transfer / cheque / UPI to the Licensor.\n\n" +
          (e.ra_rent_escalation !== "none"
            ? "The monthly " + (isLnL ? "licence fee" : "rent") + " shall be escalated by " + escalationText + " upon renewal."
            : "There shall be no escalation in rent during the term of this Agreement.") +
          (e.ra_tds === "yes" ? "\n\nThe Licensee shall deduct TDS at 2% under Section 194-IB of the Income Tax Act on monthly payments exceeding ₹50,000, deposit the same with the Income Tax Department, and issue Form 16C to the Licensor within 15 days of deposit." : ""),
      },
      {
        kind: "clause",
        number: 3,
        title: "Security Deposit",
        text:
          "The Licensee has paid to the Licensor a refundable security deposit of ₹" + deposit.toLocaleString("en-IN") +
          " (Rupees [DEPOSIT_IN_WORDS] only), the receipt of which the Licensor acknowledges. The deposit shall be refunded to the Licensee, without interest, within 15 days of vacating the Premises, after deducting any amounts due for outstanding rent, utility bills, or damage to the Premises beyond fair wear and tear. The Licensor shall not be entitled to adjust the deposit against the last month's rent without prior written consent of the Licensee.",
      },
      {
        kind: "clause",
        number: 4,
        title: "Obligations of the Licensee / Tenant",
        text:
          "The Licensee shall:\n\n" +
          "(a) use the Premises only for " + (["residential_flat", "residential_house"].includes(e.ra_property_type) ? "residential / personal occupation" : "the stated commercial purpose") + " and not for any unlawful, illegal, or immoral purpose;\n\n" +
          "(b) not carry out any structural alterations or additions to the Premises without prior written consent of the Licensor;\n\n" +
          "(c) maintain the Premises in good and tenantable condition and return it in the same condition (reasonable wear and tear excepted) on vacating;\n\n" +
          "(d) pay all electricity, water, gas, and utility bills in respect of the Premises during the term;\n\n" +
          "(e) not sub-let, assign, or part with possession of the Premises or any part thereof " + (e.ra_subletting === "yes" ? "without prior written consent of the Licensor" : "under any circumstances") + ";\n\n" +
          (e.ra_pets === "no" ? "(f) not keep any pets or animals in the Premises;\n\n" : "") +
          "(g) permit the Licensor or their representative to inspect the Premises on giving at least 48 hours' notice;\n\n" +
          "(h) comply with all applicable laws, society bye-laws, and local municipal regulations.",
      },
      {
        kind: "clause",
        number: 5,
        title: "Obligations of the Licensor / Landlord",
        text:
          "The Licensor shall:\n\n" +
          "(a) ensure the Licensee's quiet and peaceful enjoyment of the Premises during the term;\n\n" +
          "(b) be responsible for major structural repairs and maintenance of the Premises;\n\n" +
          "(c) pay all property taxes, municipal taxes, and society charges (other than maintenance charges allocated to the Licensee);\n\n" +
          "(d) ensure that all electrical and plumbing fittings are in working condition at the commencement of the term;\n\n" +
          "(e) not disturb or interfere with the Licensee's peaceful possession during the term, except as expressly permitted herein.",
      },
      {
        kind: "clause",
        number: 6,
        title: "Lock-in Period and Termination",
        text:
          "This Agreement has " + lockInText + ". During the lock-in period, neither Party shall be entitled to terminate this Agreement without the written consent of the other Party, and early termination shall entitle the other Party to forfeit / claim the equivalent of the lock-in period's rent as liquidated damages.\n\n" +
          "After the lock-in period, either Party may terminate this Agreement by giving " + noticePeriod + " calendar month(s)' written notice. The notice period shall commence from the first day of the month following the date of notice.\n\n" +
          "Notwithstanding the above, the Licensor may terminate this Agreement immediately upon: (a) non-payment of rent for two consecutive months; (b) use of the Premises for unlawful purposes; or (c) sub-letting without consent.",
      },
      {
        kind: "clause",
        number: 7,
        title: "Renewal",
        text:
          "On the expiry of this Agreement, it may be renewed by mutual written agreement on such terms and conditions (including revised rent) as the Parties may agree. There is no automatic right of renewal. If no written renewal agreement is executed, the Licensee / Tenant shall vacate the Premises on or before the expiry date.",
      },
      {
        kind: "clause",
        number: 8,
        title: "Governing Law",
        text:
          "This Agreement is governed by the laws of India, including the Transfer of Property Act 1882 and the applicable State Rent Control Act. Any dispute shall be subject to the jurisdiction of courts at " + (e.ra_city || "[City]") + ".",
      },
    ];

    clauses.forEach((c) => blocks.push(c));

    blocks.push({ kind: "divider" });

    blocks.push({
      kind: "kv",
      pairs: [
        { label: "Monthly rent", value: "₹" + rent.toLocaleString("en-IN") },
        { label: "Security deposit", value: "₹" + deposit.toLocaleString("en-IN") },
        { label: "Term", value: termMonths + " months ([START_DATE] to [END_DATE])" },
        { label: "Lock-in", value: lockInText },
        { label: "Notice period", value: noticePeriod + " month(s)" },
        { label: "Rent escalation", value: escalationText },
        { label: "TDS", value: e.ra_tds === "yes" ? "2% u/s 194-IB (tenant to deduct)" : "Not applicable" },
      ],
    });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "LICENSOR / LANDLORD\n" + landlord, name: "[Signature]" },
        { role: "LICENSEE / TENANT\n" + tenant + (e.ra_co_tenant ? "\nand " + e.ra_co_tenant : ""), name: "[Signature]" },
      ],
    });

    blocks.push({
      kind: "para",
      text: "WITNESSES:\n1. Name: ___________________ Signature: _______________ Address: _______________\n2. Name: ___________________ Signature: _______________ Address: _______________",
    });

    return blocks;
  },
};
