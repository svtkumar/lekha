import type { TemplateModule, DocSection } from "../types";
import { formatDate } from "../types";

export const leaseAgreement: TemplateModule = {
  meta: {
    id: "lease-agreement",
    name: "Lease Agreement",
    categoryId: "property",
    category: "Property",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Long-term lease deed (3+ years) for residential or commercial premises — registration required.",
    aliases: ["long term lease", "commercial lease"],
    pages: 10,
    minutes: 15,
    status: "live",
  },
  groups: [
    {
      title: "Lease basics",
      fields: [
        { id: "la_date", label: "Date of execution", type: "date", required: true },
        { id: "la_city", label: "City", type: "text", required: true },
        { id: "la_state", label: "State", type: "text", required: true },
        { id: "la_term_years", label: "Lease term (years)", type: "select", required: true, options: [{value:"3",label:"3 years"},{value:"5",label:"5 years"},{value:"9",label:"9 years"},{value:"15",label:"15 years"},{value:"30",label:"30 years"},{value:"99",label:"99 years"}], default: "5" },
        { id: "la_start", label: "Lease commencement date", type: "date", required: true },
      ],
    },
    {
      title: "Lessor (owner)",
      fields: [
        { id: "la_lessor_name", label: "Lessor name", type: "text", required: true },
        { id: "la_lessor_addr", label: "Lessor address", type: "textarea", rows: 2, required: true },
        { id: "la_lessor_pan", label: "Lessor PAN", type: "text" },
      ],
    },
    {
      title: "Lessee (tenant)",
      fields: [
        { id: "la_lessee_name", label: "Lessee name / entity", type: "text", required: true },
        { id: "la_lessee_addr", label: "Lessee address", type: "textarea", rows: 2, required: true },
        { id: "la_lessee_pan", label: "Lessee PAN / entity registration no.", type: "text" },
      ],
    },
    {
      title: "Premises & commercials",
      fields: [
        { id: "la_prop_use", label: "Permitted use", type: "select", required: true, options: [{value:"residential",label:"Residential"},{value:"commercial",label:"Commercial / office"},{value:"industrial",label:"Industrial / warehouse"},{value:"retail",label:"Retail"}]},
        { id: "la_prop_desc", label: "Premises description", type: "textarea", rows: 4, required: true },
        { id: "la_area", label: "Carpet area (sq ft)", type: "number" },
        { id: "la_rent", label: "Monthly rent (₹)", type: "number", required: true },
        { id: "la_escalation_pct", label: "Rent escalation per year (%)", type: "number", default: "5" },
        { id: "la_deposit", label: "Security deposit (₹)", type: "number", required: true },
        { id: "la_lock_in_months", label: "Lock-in period (months)", type: "number", default: "12" },
        { id: "la_maint", label: "Maintenance & CAM charges (₹/month)", type: "number", default: "0" },
        { id: "la_notice_months", label: "Notice period (months)", type: "number", default: "3" },
        { id: "la_custom", label: "Additional clauses (optional)", type: "textarea", rows: 4 },
      ],
    },
  ],
  render(values): DocSection[] {
    const rent = Number(values.la_rent || 0);
    const dep = Number(values.la_deposit || 0);
    const esc = Number(values.la_escalation_pct || 5);
    const lock = Number(values.la_lock_in_months || 12);
    const maint = Number(values.la_maint || 0);
    const notice = Number(values.la_notice_months || 3);
    const years = values.la_term_years || "5";

    const clauses: DocSection[] = [
      { kind: "clause", number: 1, title: "Grant of Lease", text: `The Lessor hereby demises unto the Lessee, and the Lessee hereby takes on lease, the premises described in the Schedule (the "Premises") for a term of ${years} (${years}) years commencing from ${formatDate(values.la_start) || "[Start Date]"} (the "Term"), upon the terms and conditions hereinafter appearing.` },
      { kind: "clause", number: 2, title: "Rent", text: `The Lessee shall pay to the Lessor a monthly rent of ₹ ${rent.toLocaleString("en-IN")}/- (Rupees ____________ only), in advance on or before the 5th (fifth) day of each English calendar month, by bank transfer to the Lessor's designated account. Applicable TDS (where required) shall be deducted and deposited by the Lessee.` },
      { kind: "clause", number: 3, title: "Rent Escalation", text: `The monthly rent shall stand escalated by ${esc}% (${esc} percent) every 12 (twelve) months from the date of commencement, on a compounding basis, for the duration of the Term.` },
      { kind: "clause", number: 4, title: "Security Deposit", text: `The Lessee has this day paid to the Lessor an interest-free refundable security deposit of ₹ ${dep.toLocaleString("en-IN")}/-, the receipt of which the Lessor hereby acknowledges. The deposit shall be refundable on termination / expiry, after deduction of unpaid dues, restoration costs (beyond normal wear and tear), and any statutory liabilities, within 30 (thirty) days of handover of vacant possession.` },
      { kind: "clause", number: 5, title: "Lock-in", text: `The first ${lock} (${lock}) months of the Term shall be the "Lock-in Period". The Lessee shall not terminate the lease during the Lock-in Period, except for material breach by the Lessor not cured within 30 (thirty) days of written notice. In the event of early termination by the Lessee during Lock-in, rent for the balance Lock-in Period shall be payable and may be adjusted against the security deposit.` },
      { kind: "clause", number: 6, title: "Maintenance & CAM", text: maint > 0 ? `In addition to rent, the Lessee shall pay common area maintenance and building maintenance charges of ₹ ${maint.toLocaleString("en-IN")}/- per month to the society/building association, directly.` : `The Lessee shall bear and pay all common area maintenance and association charges for the Premises directly to the concerned authority.` },
      { kind: "clause", number: 7, title: "Utilities & Taxes", text: `The Lessee shall bear and pay all charges for electricity, water, gas, internet, telephone, DTH/cable and other utilities as per actual consumption, directly to the service providers. Municipal/property taxes shall be borne by the Lessor.` },
      { kind: "clause", number: 8, title: "Use of Premises", text: `The Lessee shall use the Premises solely for ${values.la_prop_use || "[Use]"} purposes, strictly in accordance with applicable law, and shall not carry out any unlawful, hazardous, or nuisance-causing activity.` },
      { kind: "clause", number: 9, title: "Maintenance & Repairs", text: `The Lessee shall keep the interior of the Premises in good tenantable condition, and shall be responsible for minor repairs (under ₹5,000 per instance). Structural repairs, external repairs, roof, and major electrical/plumbing failures shall be the Lessor's responsibility, provided the Lessee gives prompt written notice.` },
      { kind: "clause", number: 10, title: "Alterations & Fit-outs", text: `The Lessee may, with the Lessor's prior written consent (not to be unreasonably withheld), carry out non-structural alterations and interior fit-outs. All such alterations shall be removed by the Lessee on termination, restoring the Premises to its original condition, at the Lessee's cost — unless waived in writing.` },
      { kind: "clause", number: 11, title: "Assignment & Subletting", text: `The Lessee shall not assign, transfer, sublet, mortgage, or part with possession of the Premises or any part thereof, without the prior written consent of the Lessor.` },
      { kind: "clause", number: 12, title: "Termination", text: `After expiry of the Lock-in Period, either party may terminate this lease by giving ${notice} (${notice}) months' prior written notice, or equivalent rent in lieu. The Lessor may terminate forthwith for the Lessee's material breach (including 2 consecutive months' unpaid rent), after giving 15 days' written notice to cure.` },
      { kind: "clause", number: 13, title: "Renewal", text: `This lease may be renewed on such terms as may be mutually agreed in writing at least 6 (six) months before the expiry of the Term. In the absence of such renewal, the Lessee shall deliver vacant possession of the Premises on expiry.` },
      { kind: "clause", number: 14, title: "Vacating & Handover", text: `On expiry or earlier termination, the Lessee shall deliver vacant, peaceful possession of the Premises in the same condition as received (normal wear and tear excepted), with all keys and access cards, and shall allow the Lessor reasonable inspection in the last 60 (sixty) days.` },
      { kind: "clause", number: 15, title: "Indemnity", text: `The Lessee shall indemnify and keep the Lessor harmless from all claims, damages, losses and liabilities arising out of the Lessee's use or occupation of the Premises, including third-party injury or damage, negligence, or breach of applicable laws.` },
      { kind: "clause", number: 16, title: "Registration & Stamp Duty", text: `This lease being for a term of 3 (three) years or more, shall be registered with the Sub-Registrar of the jurisdiction in which the Premises is situated, under the Registration Act, 1908. Stamp duty and registration charges shall be borne equally by the parties.` },
      { kind: "clause", number: 17, title: "Force Majeure", text: `Neither party shall be liable for delay or failure in performance due to events beyond reasonable control, including acts of god, pandemics, war, lockdown, or governmental orders. If such event continues for more than 120 (one hundred twenty) days, either party may terminate by written notice.` },
      { kind: "clause", number: 18, title: "Governing Law & Dispute Resolution", text: `This lease shall be governed by the laws of India and the exclusive jurisdiction shall vest with the courts at ${values.la_city || "[City]"}, ${values.la_state || "[State]"}. Disputes may first be referred to arbitration under the Arbitration and Conciliation Act, 1996.` },
      { kind: "clause", number: 19, title: "Schedule — The Premises", text: values.la_prop_desc || "[Description]" },
    ];

    if (values.la_custom && values.la_custom.trim()) {
      clauses.push({ kind: "clause", number: 20, title: "Additional Terms", text: values.la_custom.trim() });
    }

    return [
      { kind: "title", text: "Deed of Lease" },
      { kind: "subtitle", text: `${values.la_prop_use || "[Use]"} · ${years} years · ${values.la_city || "[City]"}, ${values.la_state || "[State]"} · ${formatDate(values.la_date)}` },
      { kind: "para", text: `THIS DEED OF LEASE is made and executed on this ${formatDate(values.la_date) || "[Date]"} at ${values.la_city || "[City]"}, ${values.la_state || "[State]"} BY AND BETWEEN:` },
      { kind: "party", role: "Lessor", name: values.la_lessor_name || "[Lessor]", address: values.la_lessor_addr, rep: values.la_lessor_pan ? `PAN: ${values.la_lessor_pan}` : undefined },
      { kind: "party", role: "Lessee", name: values.la_lessee_name || "[Lessee]", address: values.la_lessee_addr, rep: values.la_lessee_pan ? `PAN/Reg: ${values.la_lessee_pan}` : undefined },
      { kind: "divider" },
      { kind: "para", text: "WHEREAS the Lessor is the absolute owner of the premises described in the Schedule below; AND WHEREAS the Lessee has requested the Lessor to grant a lease of the said premises, and the Lessor has agreed to do so on the terms and conditions hereinafter appearing; NOW THIS DEED WITNESSETH as follows:" },
      ...clauses,
      { kind: "signatures", parties: [
        { role: "LESSOR", name: values.la_lessor_name || "[Lessor]" },
        { role: "LESSEE", name: values.la_lessee_name || "[Lessee]" },
        { role: "WITNESS 1", name: "Name: ___________________" },
        { role: "WITNESS 2", name: "Name: ___________________" },
      ]},
    ];
  },
};
