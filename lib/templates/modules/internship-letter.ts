import type { TemplateModule, DocSection } from "../types";

export const internshipLetter: TemplateModule = {
  meta: {
    id: "internship-letter",
    name: "Internship Offer Letter",
    categoryId: "hr",
    category: "HR & Workplace",
    country: ["IN"],
    formats: ["pdf", "docx"],
    description: "Internship offer letter with stipend, project details, duration, confidentiality clause, and IP assignment. Suitable for college students and fresh graduates.",
    aliases: ["intern offer", "stipend letter", "internship letter", "trainee offer"],
    pages: 2,
    minutes: 5,
    status: "live",
  },
  groups: [
    {
      title: "Company details",
      fields: [
        { id: "int_company_name", label: "Company name", type: "text", required: true, placeholder: "Acme Technologies Pvt Ltd" },
        { id: "int_company_addr", label: "Company address", type: "textarea", rows: 2 },
        { id: "int_hr_name", label: "HR / Signatory name", type: "text", placeholder: "Ananya Krishnan" },
        { id: "int_hr_designation", label: "HR designation", type: "text", default: "Head — Human Resources" },
        { id: "int_letter_date", label: "Letter date", type: "date", required: true },
      ],
    },
    {
      title: "Intern details",
      fields: [
        { id: "int_name", label: "Intern name", type: "text", required: true, placeholder: "Aditya Verma" },
        { id: "int_college", label: "College / University", type: "text", placeholder: "IIT Bombay" },
        { id: "int_course", label: "Course / Programme", type: "text", placeholder: "B.Tech Computer Science (Final Year)" },
        { id: "int_email", label: "Intern email", type: "email", placeholder: "aditya.verma@iitb.ac.in" },
      ],
    },
    {
      title: "Internship terms",
      fields: [
        { id: "int_role", label: "Internship role / title", type: "text", required: true, placeholder: "Product Engineering Intern" },
        { id: "int_department", label: "Department / Team", type: "text", placeholder: "Engineering — Platform" },
        { id: "int_start_date", label: "Start date", type: "date", required: true },
        { id: "int_end_date", label: "End date", type: "date", required: true },
        { id: "int_stipend", label: "Monthly stipend (₹)", type: "number", placeholder: "15000" },
        { id: "int_work_mode", label: "Work mode", type: "select", default: "in_office", options: [
          { value: "in_office", label: "In-office" },
          { value: "remote", label: "Fully remote" },
          { value: "hybrid", label: "Hybrid" },
        ]},
        { id: "int_office_addr", label: "Office / work location", type: "text", placeholder: "Bengaluru, Karnataka" },
        { id: "int_project", label: "Project / work description", type: "textarea", rows: 3, placeholder: "Work on building the data pipeline for the analytics platform using Python and Apache Spark." },
        { id: "int_mentor", label: "Assigned mentor / manager", type: "text", placeholder: "Rahul Nair, Senior Engineer" },
        { id: "int_working_hours", label: "Working hours", type: "text", default: "9:30 AM – 6:30 PM, Monday to Friday", placeholder: "9:30 AM – 6:30 PM, Monday to Friday" },
        { id: "int_certificate", label: "Certificate of completion on successful internship?", type: "select", default: "yes", options: [
          { value: "yes", label: "Yes — certificate will be issued" },
          { value: "no", label: "No certificate" },
        ]},
        { id: "int_ppo", label: "Pre-placement offer (PPO) possibility", type: "select", default: "based_on_performance", options: [
          { value: "based_on_performance", label: "Based on performance" },
          { value: "no", label: "Not applicable" },
        ]},
      ],
    },
  ],
  render(e): DocSection[] {
    const blocks: DocSection[] = [];
    const intern = e.int_name || "[Intern Name]";
    const company = e.int_company_name || "[Company Name]";
    const startDate = e.int_start_date ? new Date(e.int_start_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Start Date]";
    const endDate = e.int_end_date ? new Date(e.int_end_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[End Date]";
    const letterDate = e.int_letter_date ? new Date(e.int_letter_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "[Date]";

    blocks.push({ kind: "title", text: company.toUpperCase() });
    if (e.int_company_addr) blocks.push({ kind: "subtitle", text: e.int_company_addr });
    blocks.push({ kind: "divider" });
    blocks.push({ kind: "subtitle", text: "INTERNSHIP OFFER LETTER" });
    blocks.push({ kind: "spacer" });

    blocks.push({ kind: "kv", pairs: [
      { label: "Date", value: letterDate },
      { label: "To", value: intern },
      ...(e.int_college ? [{ label: "Institution", value: e.int_college }] : []),
      ...(e.int_course ? [{ label: "Course", value: e.int_course }] : []),
      ...(e.int_email ? [{ label: "Email", value: e.int_email }] : []),
    ]});

    blocks.push({ kind: "divider" });

    blocks.push({ kind: "para", text: `Dear ${intern},\n\nWe are delighted to offer you an internship at ${company}. Following your application and interview, we are pleased to confirm your selection for the internship programme on the following terms:` });

    blocks.push({ kind: "kv", pairs: [
      { label: "Role / Title", value: e.int_role || "[Role]" },
      ...(e.int_department ? [{ label: "Department", value: e.int_department }] : []),
      { label: "Duration", value: `${startDate} to ${endDate}` },
      ...(e.int_stipend ? [{ label: "Monthly Stipend", value: `₹${Number(e.int_stipend).toLocaleString("en-IN")} per month` }] : [{ label: "Stipend", value: "No monetary stipend (learning experience)" }]),
      { label: "Work Mode", value: e.int_work_mode === "remote" ? "Fully Remote" : e.int_work_mode === "hybrid" ? "Hybrid" : "In-Office" },
      ...(e.int_office_addr ? [{ label: "Work Location", value: e.int_office_addr }] : []),
      { label: "Working Hours", value: e.int_working_hours || "9:30 AM – 6:30 PM, Monday to Friday" },
      ...(e.int_mentor ? [{ label: "Mentor / Reporting Manager", value: e.int_mentor }] : []),
    ]});

    if (e.int_project) {
      blocks.push({ kind: "subtitle", text: "PROJECT / SCOPE OF WORK" });
      blocks.push({ kind: "para", text: e.int_project });
    }

    blocks.push({ kind: "subtitle", text: "TERMS & CONDITIONS" });
    blocks.push({ kind: "list", items: [
      "This internship is for a fixed term and does not constitute an offer of employment.",
      "The intern shall maintain strict confidentiality of all proprietary, technical, and business information obtained during the internship. Any breach shall render the intern liable for damages.",
      "All work, code, designs, reports, or intellectual property created by the intern during the internship period shall be the sole property of the Company.",
      "The intern shall comply with all company policies, code of conduct, and data security guidelines.",
      "The internship may be terminated at any time by either party with 7 days' notice in case of breach of terms or unsatisfactory performance.",
      e.int_certificate === "yes" ? "Upon successful completion of the internship, a Certificate of Completion / Internship Certificate will be issued." : "No certificate of completion will be issued.",
      e.int_ppo === "based_on_performance" ? "Based on satisfactory performance and business requirements, the intern may be considered for a Pre-Placement Offer (PPO). This is not a guarantee of employment." : "",
    ].filter(Boolean) as string[]});

    blocks.push({ kind: "para", text: `We look forward to having you on the team. Please confirm your acceptance by signing and returning a copy of this letter by ${e.int_start_date ? new Date(e.int_start_date).toLocaleDateString("en-IN") : "[Start Date]"}.` });

    blocks.push({ kind: "signatures", parties: [
      { role: e.int_hr_designation || "Head — Human Resources", name: e.int_hr_name || company },
      { role: "Accepted by Intern", name: `${intern}\nDate: _______________` },
    ]});

    blocks.push({ kind: "footer", text: `${company} — Internship Offer Letter · Generated by Lekha` });
    return blocks;
  },
};
