import type { TemplateModule, DocSection } from "../types";
import { formatDate } from "../types";

export const rentalAgreement: TemplateModule = {
  meta: {
    id: "rental-agreement",
    name: "Rental Agreement (11-month)",
    categoryId: "property",
    category: "Property",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "11-month residential rental agreement with state-specific stamp duty guidance. Avoids registration requirements.",
    aliases: ["rent agreement", "11 month rent", "lease 11 month", "tenancy"],
    pages: 6,
    minutes: 12,
    status: "live",
  },
  groups: [
    {
      title: "Agreement details",
      fields: [
        { id: "ra_date", label: "Date of agreement", type: "date", required: true },
        { id: "ra_city", label: "City", type: "text", required: true, placeholder: "Bengaluru" },
        { id: "ra_state", label: "State", type: "text", required: true, placeholder: "Karnataka" },
      ],
    },
    {
      title: "Landlord",
      fields: [
        { id: "ra_ll_name", label: "Landlord full name", type: "text", required: true },
        { id: "ra_ll_parent", label: "S/o or D/o", type: "text" },
        { id: "ra_ll_addr", label: "Landlord address", type: "textarea", required: true, rows: 2 },
        { id: "ra_ll_pan", label: "Landlord PAN (optional)", type: "text", placeholder: "AAAPL1234C" },
      ],
    },
    {
      title: "Tenant",
      fields: [
        { id: "ra_tn_name", label: "Tenant full name", type: "text", required: true },
        { id: "ra_tn_parent", label: "S/o or D/o", type: "text" },
        { id: "ra_tn_addr", label: "Tenant permanent address", type: "textarea", required: true, rows: 2 },
        { id: "ra_tn_id", label: "Tenant ID proof (e.g. Aadhaar/Passport — masked)", type: "text" },
      ],
    },
    {
      title: "Property",
      fields: [
        {
          id: "ra_prop_addr",
          label: "Property address",
          type: "textarea",
          required: true,
          rows: 3,
          placeholder: "2 BHK, Flat 4B, Lake View Apartments, Indiranagar, Bengaluru 560038",
        },
        {
          id: "ra_prop_type",
          label: "Property type",
          type: "select",
          required: true,
          options: [
            { value: "residential", label: "Residential" },
            { value: "commercial", label: "Commercial" },
          ],
          default: "residential",
        },
        {
          id: "ra_prop_furn",
          label: "Furnishing",
          type: "select",
          required: true,
          options: [
            { value: "unfurnished", label: "Unfurnished" },
            { value: "semi", label: "Semi-furnished" },
            { value: "furnished", label: "Fully furnished" },
          ],
        },
      ],
    },
    {
      title: "Financial terms",
      fields: [
        { id: "ra_rent", label: "Monthly rent (₹)", type: "number", required: true, placeholder: "25000" },
        { id: "ra_deposit", label: "Security deposit (₹)", type: "number", required: true, help: "Typically 2–10 months' rent depending on city." },
        { id: "ra_maint", label: "Monthly maintenance (₹, if separate)", type: "number", default: "0" },
        { id: "ra_escalation", label: "Annual escalation (%)", type: "number", default: "5", help: "Applied on renewal." },
        { id: "ra_start", label: "Tenancy start date", type: "date", required: true },
        {
          id: "ra_notice",
          label: "Notice period (months)",
          type: "select",
          required: true,
          options: [
            { value: "1", label: "1 month" },
            { value: "2", label: "2 months" },
            { value: "3", label: "3 months" },
          ],
          default: "2",
        },
      ],
    },
    {
      title: "Additional terms (optional)",
      fields: [
        { id: "ra_custom", label: "Any extra clauses", type: "textarea", rows: 4, placeholder: "E.g., pet policy, parking slot number, internet responsibility." },
      ],
    },
  ],
  render(values): DocSection[] {
    const rent = Number(values.ra_rent || 0);
    const deposit = Number(values.ra_deposit || 0);
    const maint = Number(values.ra_maint || 0);
    const esc = Number(values.ra_escalation || 5);

    const clauses: DocSection[] = [
      {
        kind: "clause",
        number: 1,
        title: "Grant of Tenancy",
        text: `The Landlord hereby grants to the Tenant, and the Tenant hereby takes on rent, the residential/commercial premises described herein (the "Premises") for a fixed term of 11 (eleven) months commencing from ${formatDate(values.ra_start) || "[Start Date]"}.`,
      },
      {
        kind: "clause",
        number: 2,
        title: "Rent & Maintenance",
        text: `The monthly rent payable by the Tenant shall be ₹ ${rent.toLocaleString("en-IN")}/- (Rupees ${inWords(rent)} only), payable in advance on or before the 5th day of each English calendar month${maint > 0 ? `, exclusive of a separate monthly maintenance of ₹ ${maint.toLocaleString("en-IN")}/- payable to the society/association.` : `.`} Rent shall be paid by bank transfer to the Landlord's designated account; cash payments shall be avoided unless receipted in writing.`,
      },
      {
        kind: "clause",
        number: 3,
        title: "Security Deposit",
        text: `The Tenant has this day paid to the Landlord an interest-free refundable security deposit of ₹ ${deposit.toLocaleString("en-IN")}/- (Rupees ${inWords(deposit)} only) by way of bank transfer, receipt of which the Landlord hereby acknowledges. The deposit shall be refunded to the Tenant within 30 (thirty) days of vacating the Premises, after deduction of any outstanding dues, unpaid utilities, or cost of restoration (excluding normal wear and tear).`,
      },
      {
        kind: "clause",
        number: 4,
        title: "Renewal & Escalation",
        text: `This Agreement may be renewed by mutual consent of the Parties for a further term of 11 (eleven) months. Upon renewal, the monthly rent shall stand escalated by ${esc}% (${esc} percent) over the then-prevailing rent.`,
      },
      {
        kind: "clause",
        number: 5,
        title: "Utilities & Taxes",
        text: `The Tenant shall pay for all utility consumption bills (electricity, water, gas, internet, DTH/cable) as per actuals. Municipal property tax shall continue to be borne by the Landlord. The Tenant shall pay any transaction charges on utility bill connections raised in their name.`,
      },
      {
        kind: "clause",
        number: 6,
        title: "Use of Premises",
        text: `The Tenant shall use the Premises solely for ${values.ra_prop_type === "commercial" ? "lawful commercial purposes as permitted under the applicable local bylaws" : "residential purposes by the Tenant and their immediate family"}. The Tenant shall not sublet, assign, part with possession of, or use the Premises for any unlawful, immoral, or nuisance-causing activity.`,
      },
      {
        kind: "clause",
        number: 7,
        title: "Maintenance & Repairs",
        text: `The Tenant shall maintain the Premises, including fittings and fixtures, in good and tenantable condition. Minor day-to-day repairs (fuses, taps, plumbing leaks under ₹2,000) shall be at the Tenant's cost. Major structural repairs, roof leaks, and major electrical/plumbing failures shall be at the Landlord's cost, provided the Tenant gives prompt written notice.`,
      },
      {
        kind: "clause",
        number: 8,
        title: "Alterations",
        text: `The Tenant shall not carry out any structural alterations, additions, or modifications to the Premises without the prior written consent of the Landlord. Any alteration made with consent shall become the property of the Landlord on termination, without compensation, unless otherwise agreed.`,
      },
      {
        kind: "clause",
        number: 9,
        title: "Termination",
        text: `Either Party may terminate this Agreement by giving ${values.ra_notice || "2"} (${wordNum(values.ra_notice || "2")}) calendar months' written notice. In the event of a Tenant's material breach (including non-payment of rent for 2 consecutive months), the Landlord may terminate this Agreement forthwith after giving 15 (fifteen) days' written notice to cure.`,
      },
      {
        kind: "clause",
        number: 10,
        title: "Vacating & Handover",
        text: `On the expiry or earlier termination of this Agreement, the Tenant shall peaceably hand over vacant possession of the Premises to the Landlord in the same condition as received (normal wear and tear excepted), together with all keys and access cards. The Tenant shall make the Premises available for inspection during the last 30 (thirty) days of the term for re-letting.`,
      },
      {
        kind: "clause",
        number: 11,
        title: "Lock-in Period",
        text: `Notwithstanding Clause 9, the first 6 (six) months of this Agreement shall constitute a "Lock-in Period" during which neither Party shall terminate this Agreement except for material breach. If the Tenant vacates during the Lock-in Period, rent for the balance of the Lock-in Period shall remain payable and may be adjusted against the security deposit.`,
      },
      {
        kind: "clause",
        number: 12,
        title: "Indemnity",
        text: `The Tenant shall indemnify and hold harmless the Landlord from and against any loss, damage, claim, or liability arising out of the Tenant's use or occupation of the Premises, including but not limited to fire, third-party injury, or damage caused by negligence.`,
      },
      {
        kind: "clause",
        number: 13,
        title: "Governing Law & Dispute Resolution",
        text: `This Agreement shall be governed by the laws of India. Any dispute arising out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts at ${values.ra_city || "[City]"}, ${values.ra_state || "[State]"}.`,
      },
    ];

    if (values.ra_custom && values.ra_custom.trim()) {
      clauses.push({
        kind: "clause",
        number: 14,
        title: "Additional Terms",
        text: values.ra_custom.trim(),
      });
    }

    return [
      { kind: "title", text: "Rental Agreement" },
      {
        kind: "subtitle",
        text: `11-month tenancy · ${values.ra_city || "[City]"}, ${values.ra_state || "[State]"} · ${formatDate(values.ra_date)}`,
      },
      {
        kind: "para",
        text: `This Rental Agreement ("Agreement") is made and executed on ${formatDate(values.ra_date) || "[Date]"} at ${values.ra_city || "[City]"}, ${values.ra_state || "[State]"} BY AND BETWEEN:`,
      },
      {
        kind: "party",
        role: "Landlord",
        name: `${values.ra_ll_name || "[Landlord]"}${values.ra_ll_parent ? `, ${values.ra_ll_parent}` : ""}`,
        address: values.ra_ll_addr,
        rep: values.ra_ll_pan ? `PAN: ${values.ra_ll_pan}` : undefined,
      },
      {
        kind: "party",
        role: "Tenant",
        name: `${values.ra_tn_name || "[Tenant]"}${values.ra_tn_parent ? `, ${values.ra_tn_parent}` : ""}`,
        address: values.ra_tn_addr,
        rep: values.ra_tn_id ? `ID: ${values.ra_tn_id}` : undefined,
      },
      { kind: "divider" },
      {
        kind: "para",
        text: `WHEREAS the Landlord is the lawful owner of the property located at ${values.ra_prop_addr || "[Property Address]"} (the "Premises"), being a ${values.ra_prop_furn === "furnished" ? "fully furnished" : values.ra_prop_furn === "semi" ? "semi-furnished" : "unfurnished"} ${values.ra_prop_type || "residential"} property;`,
      },
      {
        kind: "para",
        text: `AND WHEREAS the Tenant has requested the Landlord to let out the Premises to the Tenant on leave and license / rental basis, and the Landlord has agreed to the same on the terms and conditions hereinafter appearing;`,
      },
      {
        kind: "para",
        text: "NOW THIS AGREEMENT WITNESSETH as follows:",
        align: "left",
      },
      ...clauses,
      {
        kind: "signatures",
        parties: [
          { role: "LANDLORD", name: values.ra_ll_name || "[Landlord]" },
          { role: "TENANT", name: values.ra_tn_name || "[Tenant]" },
          { role: "WITNESS 1", name: "Name: _______________________" },
          { role: "WITNESS 2", name: "Name: _______________________" },
        ],
      },
    ];
  },
};

function wordNum(n: string | undefined): string {
  const map: Record<string, string> = { "1": "one", "2": "two", "3": "three", "5": "five", "6": "six", "7": "seven", "10": "ten" };
  return map[n || ""] || n || "";
}

function inWords(n: number): string {
  if (!n) return "Zero";
  // Lightweight Indian-number converter (up to crores)
  const a = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const b = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const inWordsSub = (num: number): string => {
    if (num < 20) return a[num];
    if (num < 100) return b[Math.floor(num / 10)] + (num % 10 ? " " + a[num % 10] : "");
    if (num < 1000) return a[Math.floor(num / 100)] + " hundred" + (num % 100 ? " " + inWordsSub(num % 100) : "");
    return "";
  };
  let num = Math.floor(n);
  const parts: string[] = [];
  const crore = Math.floor(num / 10000000); num %= 10000000;
  const lakh = Math.floor(num / 100000); num %= 100000;
  const thousand = Math.floor(num / 1000); num %= 1000;
  if (crore) parts.push(inWordsSub(crore) + " crore");
  if (lakh) parts.push(inWordsSub(lakh) + " lakh");
  if (thousand) parts.push(inWordsSub(thousand) + " thousand");
  if (num) parts.push(inWordsSub(num));
  return parts.join(" ").trim().replace(/^./, (c) => c.toUpperCase());
}
