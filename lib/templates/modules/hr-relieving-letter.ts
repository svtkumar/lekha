// ============================================================
// RELIEVING LETTER + EXPERIENCE CERTIFICATE
// Drop into: /lib/templates/hr-relieving-letter.ts
// Use case: Letter issued by employer on employee's last working
//           day, confirming their last day, good conduct, and
//           relieving them from all duties. Paired with an
//           Experience Certificate confirming duration and role.
// Statute refs: Industrial Disputes Act 1947 / Industrial
//   Relations Code 2020; Payment of Wages Act 1936 / Code on
//   Wages 2019 (F&F within 2 working days); Income Tax Act
//   1961 (TDS on gratuity / leave encashment on exit)
// ============================================================

import type { TemplateModule, DocSection } from "../types";

export const hrRelievingLetter: TemplateModule = {
  meta: {
    id: "hr-relieving-letter",
    name: "Relieving Letter + Experience Certificate",
    categoryId: "hr",
    category: "HR & Employment",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description:
      "Relieving letter confirming the employee's last working day and clearance from all duties, combined with an experience certificate. Issued on or after the last working day. Covers all separation types: resignation, mutual separation, end of contract, and retirement.",
    aliases: [
      "relieving letter",
      "experience letter",
      "experience certificate",
      "relieve letter",
      "experience certificate format",
      "service certificate",
      "relieving cum experience letter",
    ],
    pages: 2,
    minutes: 4,
    status: "live",
  },

  groups: [
    {
      title: "Company details",
      fields: [
        { id: "rl_co_name", label: "Company legal name", type: "text", required: true, placeholder: "Acme Technologies Private Limited" },
        { id: "rl_co_addr", label: "Company address", type: "textarea", rows: 2, required: true },
        { id: "rl_hr_name", label: "Issuing authority name & designation", type: "text", required: true, placeholder: "Sneha Patel, VP — People" },
        { id: "rl_letter_date", label: "Date of letter", type: "date", required: true },
      ],
    },
    {
      title: "Employee details",
      fields: [
        { id: "rl_emp_name", label: "Employee full name", type: "text", required: true, placeholder: "Rahul Verma" },
        { id: "rl_emp_id", label: "Employee ID", type: "text", placeholder: "EMP-1234" },
        { id: "rl_designation", label: "Last held designation", type: "text", required: true, placeholder: "Senior Software Engineer" },
        { id: "rl_department", label: "Department", type: "text", required: true, placeholder: "Engineering" },
        { id: "rl_date_of_joining", label: "Date of joining", type: "date", required: true },
        { id: "rl_last_working_day", label: "Last working day", type: "date", required: true },
        {
          id: "rl_separation_type",
          label: "Reason for separation",
          type: "select",
          required: true,
          default: "resignation",
          options: [
            { value: "resignation", label: "Resignation — accepted" },
            { value: "mutual_separation", label: "Mutual separation" },
            { value: "end_of_contract", label: "End of fixed-term contract" },
            { value: "retirement", label: "Retirement" },
            { value: "termination_no_cause", label: "Termination without cause (company's discretion)" },
          ],
        },
      ],
    },
    {
      title: "Conduct and clearance",
      fields: [
        {
          id: "rl_conduct",
          label: "Conduct during service",
          type: "select",
          default: "good",
          options: [
            { value: "good", label: "Good" },
            { value: "satisfactory", label: "Satisfactory" },
            { value: "excellent", label: "Excellent" },
          ],
        },
        {
          id: "rl_clearance",
          label: "Full and final clearance obtained?",
          type: "radio",
          required: true,
          default: "yes",
          options: [
            { value: "yes", label: "Yes — all dues settled and company property returned" },
            { value: "pending", label: "Pending — F&F settlement in process" },
          ],
        },
        { id: "rl_fnf_note", label: "F&F settlement note (if pending)", type: "text", placeholder: "F&F payment will be processed within 45 days as per company policy." },
        { id: "rl_recommend", label: "Wish them well / recommend for future employment?", type: "radio", default: "yes", options: [{ value: "yes", label: "Yes — wish them well" }, { value: "no", label: "No specific recommendation" }] },
      ],
    },
  ],

  render(e) {
    const co = e.rl_co_name || "[Company]";
    const emp = e.rl_emp_name || "[Employee]";
    const joining = e.rl_date_of_joining;
    const lwd = e.rl_last_working_day;

    // Compute tenure
    let tenureText = "[TENURE]";
    if (joining && lwd) {
      const jDate = new Date(joining);
      const lDate = new Date(lwd);
      const months = Math.round((lDate.getTime() - jDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44));
      const years = Math.floor(months / 12);
      const remMonths = months % 12;
      tenureText = (years > 0 ? years + " year" + (years > 1 ? "s" : "") + (remMonths > 0 ? " and " : "") : "") + (remMonths > 0 ? remMonths + " month" + (remMonths > 1 ? "s" : "") : "");
    }

    const separationText = {
      resignation: "resignation, which has been accepted",
      mutual_separation: "mutual separation agreement",
      end_of_contract: "conclusion of the fixed-term employment contract",
      retirement: "retirement from service",
      termination_no_cause: "termination without cause",
    }[e.rl_separation_type || "resignation"] || "separation";

    const conductLabel = { good: "good", satisfactory: "satisfactory", excellent: "excellent" }[e.rl_conduct || "good"];

    const blocks: DocSection[] = [];

    // PART 1: RELIEVING LETTER
    blocks.push({ kind: "subtitle", text: co.toUpperCase() + "\n" + (e.rl_co_addr || "[Address]") });
    blocks.push({ kind: "kv", pairs: [{ label: "Date", value: "[LETTER_DATE]" }, { label: "Ref.", value: "RL/" + (e.rl_emp_id || "[EMP-ID]") + "/[YEAR]" }] });

    blocks.push({ kind: "para", text: "To,\n" + emp });

    blocks.push({ kind: "title", text: "RELIEVING LETTER" });

    blocks.push({
      kind: "para",
      text:
        "Dear " + emp.split(" ")[0] + ",\n\n" +
        "This is to inform you that your employment with " + co + " as " + (e.rl_designation || "[Designation]") + " has been brought to a close with effect from [LAST_WORKING_DAY], pursuant to your " + separationText + ".\n\n" +
        "You stand relieved from your duties and responsibilities as of the close of business on [LAST_WORKING_DAY].\n\n" +
        (e.rl_clearance === "yes"
          ? "You have completed the exit formalities and returned all company assets, including access cards, laptops, and other equipment. Your full and final settlement has been / will be processed in due course."
          : "Your full and final settlement is currently being processed. " + (e.rl_fnf_note || "You will be informed once the settlement is complete.")) +
        "\n\n" +
        (e.rl_recommend === "yes"
          ? "We appreciate your contribution to " + co + " during your tenure and wish you all the best in your future endeavours."
          : "We thank you for your service to " + co + "."),
    });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "For " + co + "\n" + (e.rl_hr_name || "[HR Authority]"), name: "[Signature & Seal]" },
      ],
    });

    blocks.push({ kind: "divider" });

    // PART 2: EXPERIENCE CERTIFICATE
    blocks.push({ kind: "subtitle", text: co.toUpperCase() + "\n" + (e.rl_co_addr || "[Address]") });

    blocks.push({ kind: "title", text: "EXPERIENCE CERTIFICATE" });

    blocks.push({
      kind: "para",
      text:
        "TO WHOMSOEVER IT MAY CONCERN\n\n" +
        "This is to certify that " + emp +
        (e.rl_emp_id ? " (Employee ID: " + e.rl_emp_id + ")" : "") +
        " was employed with " + co + " as " + (e.rl_designation || "[Designation]") + " in the " + (e.rl_department || "[Department]") + " department from [DATE_OF_JOINING] to [LAST_WORKING_DAY] — a total tenure of approximately " + tenureText + ".\n\n" +
        "During " + emp.split(" ")[0] + "'s tenure, their conduct and performance were found to be " + conductLabel + ". " +
        (e.rl_recommend === "yes"
          ? "We wish " + emp.split(" ")[0] + " all success in their future career."
          : "We wish " + emp.split(" ")[0] + " well in future endeavours.") +
        "\n\nThis certificate is issued at the request of the employee for whatever purpose it may serve.",
    });

    blocks.push({
      kind: "signatures",
      parties: [
        { role: "For " + co + "\n" + (e.rl_hr_name || "[HR Authority]"), name: "[Signature & Seal]" },
      ],
    });

    return blocks;
  },
};
