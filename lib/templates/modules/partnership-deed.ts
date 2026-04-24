import type { TemplateModule, DocSection } from "../types";
import { formatDate } from "../types";

export const partnershipDeed: TemplateModule = {
  meta: {
    id: "partnership-deed",
    name: "Partnership Deed",
    categoryId: "business",
    category: "Business & Legal",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Partnership firm deed with capital contributions, profit sharing, management, and dissolution terms under the Indian Partnership Act, 1932.",
    aliases: ["firm agreement", "partnership"],
    pages: 8,
    minutes: 15,
    status: "live",
  },
  groups: [
    {
      title: "Firm details",
      fields: [
        { id: "pd_firm_name", label: "Firm name", type: "text", required: true, placeholder: "M/s Acme Traders" },
        { id: "pd_business", label: "Nature of business", type: "textarea", rows: 2, required: true, placeholder: "Trading in electronic goods and related accessories" },
        { id: "pd_place", label: "Principal place of business", type: "textarea", rows: 2, required: true },
        { id: "pd_date", label: "Date of execution", type: "date", required: true },
        { id: "pd_city", label: "City of execution", type: "text", required: true },
        { id: "pd_start", label: "Commencement of partnership", type: "date", required: true },
      ],
    },
    {
      title: "Partners (up to 4 — add extras in additional terms)",
      fields: [
        { id: "pd_p1_name", label: "Partner 1 name", type: "text", required: true },
        { id: "pd_p1_addr", label: "Partner 1 address", type: "textarea", rows: 2, required: true },
        { id: "pd_p1_capital", label: "Partner 1 capital contribution (₹)", type: "number", required: true },
        { id: "pd_p1_share", label: "Partner 1 profit share (%)", type: "number", required: true },
        { id: "pd_p2_name", label: "Partner 2 name", type: "text", required: true },
        { id: "pd_p2_addr", label: "Partner 2 address", type: "textarea", rows: 2, required: true },
        { id: "pd_p2_capital", label: "Partner 2 capital contribution (₹)", type: "number", required: true },
        { id: "pd_p2_share", label: "Partner 2 profit share (%)", type: "number", required: true },
        { id: "pd_p3_name", label: "Partner 3 name (optional)", type: "text" },
        { id: "pd_p3_addr", label: "Partner 3 address", type: "textarea", rows: 2 },
        { id: "pd_p3_capital", label: "Partner 3 capital contribution (₹)", type: "number" },
        { id: "pd_p3_share", label: "Partner 3 profit share (%)", type: "number" },
        { id: "pd_p4_name", label: "Partner 4 name (optional)", type: "text" },
        { id: "pd_p4_addr", label: "Partner 4 address", type: "textarea", rows: 2 },
        { id: "pd_p4_capital", label: "Partner 4 capital contribution (₹)", type: "number" },
        { id: "pd_p4_share", label: "Partner 4 profit share (%)", type: "number" },
      ],
    },
    {
      title: "Financial terms",
      fields: [
        { id: "pd_interest_capital", label: "Interest on capital (% p.a., if any)", type: "number", default: "6", help: "Capped at 12% per section 40(b) Income Tax Act for deductibility." },
        { id: "pd_remuneration", label: "Working partner remuneration policy", type: "textarea", rows: 3, placeholder: "Each working partner to receive a monthly salary of ₹X, subject to limits under section 40(b)." },
        { id: "pd_fy_end", label: "Financial year end", type: "select", options: [{value:"31_mar",label:"31 March"},{value:"31_dec",label:"31 December"}], default: "31_mar" },
        { id: "pd_bank", label: "Bank / branch where account to be opened", type: "text" },
        { id: "pd_custom", label: "Additional clauses (optional)", type: "textarea", rows: 4 },
      ],
    },
  ],
  render(values): DocSection[] {
    const partners: { name: string; addr: string; capital: number; share: number }[] = [];
    for (let i = 1; i <= 4; i++) {
      const name = values[`pd_p${i}_name`];
      if (name) {
        partners.push({
          name,
          addr: values[`pd_p${i}_addr`] || "",
          capital: Number(values[`pd_p${i}_capital`] || 0),
          share: Number(values[`pd_p${i}_share`] || 0),
        });
      }
    }
    const totalCapital = partners.reduce((a, p) => a + p.capital, 0);
    const interestRate = Number(values.pd_interest_capital || 0);

    const clauses: DocSection[] = [
      { kind: "clause", number: 1, title: "Name & Constitution", text: `The Partners have agreed to constitute and carry on the partnership business in the name and style of "${values.pd_firm_name || "[Firm Name]"}" (hereinafter referred to as the "Firm") with effect from ${formatDate(values.pd_start) || "[Commencement Date]"}.` },
      { kind: "clause", number: 2, title: "Nature of Business", text: `The business of the Firm shall be: ${values.pd_business || "[Business]"}. The Partners may, by mutual written consent, add to, modify, or discontinue any line of business.` },
      { kind: "clause", number: 3, title: "Principal Place of Business", text: `The principal place of business of the Firm shall be at ${values.pd_place || "[Address]"}. The Firm may open branches or offices at such other places as the Partners may mutually decide.` },
      { kind: "clause", number: 4, title: "Duration", text: `The partnership shall be a partnership at will. It shall commence on ${formatDate(values.pd_start) || "[Start Date]"} and shall continue until terminated in accordance with the provisions of this deed or the Indian Partnership Act, 1932.` },
      { kind: "clause", number: 5, title: "Capital Contributions", text: `The total capital of the Firm shall be ₹ ${totalCapital.toLocaleString("en-IN")}/-, contributed by the Partners as follows:` },
      { kind: "table", headers: ["Partner", "Capital (₹)", "Profit/Loss Share (%)"], rows: partners.map((p) => [p.name, p.capital.toLocaleString("en-IN"), `${p.share}%`]), widths: [50, 25, 25] },
      { kind: "clause", number: 6, title: "Interest on Capital", text: interestRate > 0 ? `Each Partner shall be entitled to interest on their capital account balance at the rate of ${interestRate}% (${interestRate} percent) per annum, calculated on the daily balances. Such interest shall be a charge against profits before distribution, and shall not exceed the limits prescribed under section 40(b) of the Income Tax Act, 1961.` : `No interest shall be payable on the capital contributions of the Partners.` },
      { kind: "clause", number: 7, title: "Profit & Loss Sharing", text: `The net profits or losses of the Firm (after adjustment of interest on capital and working partner remuneration) shall be shared among the Partners in the proportions set out in Clause 5 above.` },
      { kind: "clause", number: 8, title: "Working Partners & Remuneration", text: values.pd_remuneration || `Such of the Partners as are actively engaged in the conduct of the business shall be designated as "Working Partners" and shall be entitled to remuneration as may be mutually agreed from time to time, subject to the limits prescribed under section 40(b) of the Income Tax Act, 1961.` },
      { kind: "clause", number: 9, title: "Management & Authority", text: `All the Partners shall have equal right to participate in the conduct and management of the business. Major decisions — including admission of new partners, borrowing exceeding ₹10,00,000, sale of fixed assets, litigation, and amendment of this deed — shall require the unanimous written consent of all Partners.` },
      { kind: "clause", number: 10, title: "Books of Account & Audit", text: `The Firm shall maintain proper books of account at its principal place of business, which shall be open to inspection by any Partner at all reasonable times. Accounts shall be closed on ${values.pd_fy_end === "31_dec" ? "31st December" : "31st March"} each year. The accounts shall be audited by a Chartered Accountant appointed by mutual consent, if required under applicable law.` },
      { kind: "clause", number: 11, title: "Bank Account", text: `The Firm shall maintain a current account in the name of the Firm with ${values.pd_bank || "a scheduled bank to be mutually agreed"}. Cheques and banking operations shall be signed by such Partners as may be authorised by a resolution of the Partners.` },
      { kind: "clause", number: 12, title: "Drawings", text: `Each Partner may draw against their share of anticipated profits such sums as may be mutually agreed, subject to adjustment at year-end. Excessive drawings shall be recovered with interest from the defaulting Partner's share.` },
      { kind: "clause", number: 13, title: "Admission of New Partners", text: `No new partner shall be admitted into the Firm except with the unanimous written consent of all the existing Partners and on such terms as may be mutually agreed.` },
      { kind: "clause", number: 14, title: "Retirement & Death", text: `Any Partner may retire by giving 3 (three) months' prior written notice to the other Partners. On retirement or death of a Partner, the remaining Partners may continue the business, and the share of the outgoing/deceased Partner shall be paid out within 6 (six) months, together with interest @ 6% p.a. from the date of retirement/death until payment.` },
      { kind: "clause", number: 15, title: "Dissolution", text: `The Firm shall stand dissolved on (a) mutual consent of all Partners; (b) expiry of the term agreed (if any); (c) bankruptcy or insolvency of any Partner; (d) order of a competent court. On dissolution, the assets of the Firm shall be applied in the following order: (i) payment of debts of third parties; (ii) loans from Partners; (iii) capital contributions; (iv) residual balance in profit-sharing ratio.` },
      { kind: "clause", number: 16, title: "Non-competition", text: `During the subsistence of the partnership, no Partner shall directly or indirectly engage in any business that is the same as or competes with the business of the Firm, without the prior written consent of all other Partners.` },
      { kind: "clause", number: 17, title: "Dispute Resolution", text: `Any dispute or difference arising between the Partners in connection with the partnership shall be referred to a sole arbitrator mutually agreed upon, under the Arbitration and Conciliation Act, 1996. The seat of arbitration shall be ${values.pd_city || "[City]"}, India.` },
      { kind: "clause", number: 18, title: "Registration", text: `The Partners shall cause the Firm to be registered with the Registrar of Firms of the State in which the principal place of business is situated, within a reasonable time from the commencement of the partnership.` },
    ];

    if (values.pd_custom && values.pd_custom.trim()) {
      clauses.push({ kind: "clause", number: 19, title: "Additional Terms", text: values.pd_custom.trim() });
    }

    const partySections: DocSection[] = partners.map((p, i) => ({
      kind: "party",
      role: `Partner ${i + 1}`,
      name: p.name,
      address: p.addr,
    }));

    return [
      { kind: "title", text: "Deed of Partnership" },
      { kind: "subtitle", text: `${values.pd_firm_name || "[Firm]"} · ${values.pd_city || "[City]"} · ${formatDate(values.pd_date)}` },
      { kind: "para", text: `THIS DEED OF PARTNERSHIP is made and executed at ${values.pd_city || "[City]"} on this ${formatDate(values.pd_date) || "[Date]"} BY AND AMONGST:` },
      ...partySections,
      { kind: "para", text: "(hereinafter collectively referred to as the \"Partners\", which expression shall, unless repugnant to the context, include their respective heirs, legal representatives, executors, administrators, successors and permitted assigns)" },
      { kind: "divider" },
      { kind: "para", text: "WHEREAS the Partners have agreed to carry on business in partnership on the terms and conditions set out herein; NOW THIS DEED WITNESSETH as follows:" },
      ...clauses,
      { kind: "signatures", parties: [
        ...partners.map((p, i) => ({ role: `PARTNER ${i + 1}`, name: p.name })),
        { role: "WITNESS 1", name: "Name: ___________________" },
        { role: "WITNESS 2", name: "Name: ___________________" },
      ]},
    ];
  },
};
