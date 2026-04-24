import type { TemplateMeta, TemplateModule } from "./types";
import { nda } from "./modules/nda";
import { rentalAgreement } from "./modules/rental-agreement";
import { salarySlip } from "./modules/salary-slip";
import { employmentOffer } from "./modules/employment-offer";
import { affidavit } from "./modules/affidavit";
import { legalNotice } from "./modules/legal-notice";
import { serviceAgreement } from "./modules/service-agreement";
import { will } from "./modules/will";
import { powerOfAttorney } from "./modules/power-of-attorney";

const modules: Record<string, TemplateModule> = {
  [nda.meta.id]: nda,
  [rentalAgreement.meta.id]: rentalAgreement,
  [salarySlip.meta.id]: salarySlip,
  [employmentOffer.meta.id]: employmentOffer,
  [affidavit.meta.id]: affidavit,
  [legalNotice.meta.id]: legalNotice,
  [serviceAgreement.meta.id]: serviceAgreement,
  [will.meta.id]: will,
  [powerOfAttorney.meta.id]: powerOfAttorney,
};

// Remaining WP templates still as stubs (ETA ~30 min each to port)
const stubs: TemplateMeta[] = [
  // Property
  { id: "lease-agreement", name: "Lease Agreement", categoryId: "property", category: "Property", country: ["IN"], formats: ["pdf", "docx"], description: "Long-term lease deed for residential or commercial property.", aliases: ["long term lease", "commercial lease"], pages: 10, status: "stub" },
  { id: "leave-license", name: "Leave & License", categoryId: "property", category: "Property", country: ["IN"], formats: ["pdf", "docx"], description: "Required in Maharashtra. Licensed-premises agreement.", aliases: ["maharashtra rent", "licensee"], pages: 8, status: "stub" },
  { id: "sale-agreement", name: "Sale Agreement", categoryId: "property", category: "Property", country: ["IN"], formats: ["pdf", "docx"], description: "Agreement to sell immovable property with payment milestones.", aliases: ["agreement to sell", "ATS"], pages: 12, status: "stub" },
  { id: "sale-deed", name: "Sale Deed", categoryId: "property", category: "Property", country: ["IN"], formats: ["pdf", "docx"], description: "Conveyance deed for property ownership transfer.", aliases: ["conveyance deed"], pages: 10, status: "stub" },
  { id: "gift-deed", name: "Gift Deed", categoryId: "property", category: "Property", country: ["IN"], formats: ["pdf", "docx"], description: "Transfer of property as gift with blood-relative stamp duty guidance.", aliases: ["gift property"], pages: 6, status: "stub" },
  { id: "mortgage-deed", name: "Mortgage Deed", categoryId: "property", category: "Property", country: ["IN"], formats: ["pdf", "docx"], description: "Simple, English, or equitable mortgage formats.", aliases: ["english mortgage", "equitable mortgage"], pages: 12, status: "stub" },

  // HR
  { id: "appointment-letter", name: "Appointment Letter", categoryId: "hr", category: "HR & Workplace", country: ["IN"], formats: ["pdf"], description: "Formal appointment with CTC breakdown, probation, and terms.", aliases: ["job letter", "employment letter"], pages: 3, status: "stub" },
  { id: "experience-letter", name: "Experience Letter", categoryId: "hr", category: "HR & Workplace", country: ["IN"], formats: ["pdf"], description: "Employment experience certificate.", aliases: ["service certificate"], pages: 1, status: "stub" },
  { id: "relieving-letter", name: "Relieving Letter", categoryId: "hr", category: "HR & Workplace", country: ["IN"], formats: ["pdf"], description: "Confirmation of resignation acceptance.", aliases: ["resignation acceptance"], pages: 1, status: "stub" },
  { id: "increment-letter", name: "Increment Letter", categoryId: "hr", category: "HR & Workplace", country: ["IN"], formats: ["pdf"], description: "Salary revision letter with revised CTC.", aliases: ["salary revision", "appraisal letter"], pages: 1, status: "stub" },
  { id: "warning-letter", name: "Warning Letter", categoryId: "hr", category: "HR & Workplace", country: ["IN"], formats: ["pdf"], description: "Formal warning for misconduct or policy violation.", aliases: ["misconduct"], pages: 1, status: "stub" },
  { id: "termination-letter", name: "Termination Letter", categoryId: "hr", category: "HR & Workplace", country: ["IN"], formats: ["pdf"], description: "Employment termination with notice and settlement.", aliases: ["dismissal"], pages: 2, status: "stub" },
  { id: "fnf-settlement", name: "Full & Final Settlement", categoryId: "hr", category: "HR & Workplace", country: ["IN"], formats: ["pdf", "xlsx"], description: "Exit settlement with leave encashment and gratuity.", aliases: ["FnF", "exit settlement"], pages: 2, status: "stub" },
  { id: "leave-policy", name: "Leave Policy", categoryId: "hr", category: "HR & Workplace", country: ["IN"], formats: ["pdf"], description: "Company leave policy template.", aliases: ["CL", "SL", "EL", "maternity"], pages: 5, status: "stub" },
  { id: "internship-letter", name: "Internship Letter", categoryId: "hr", category: "HR & Workplace", country: ["IN"], formats: ["pdf"], description: "Internship offer with stipend and project details.", aliases: ["intern offer", "stipend"], pages: 1, status: "stub" },
  { id: "probation-confirmation", name: "Probation Confirmation", categoryId: "hr", category: "HR & Workplace", country: ["IN"], formats: ["pdf"], description: "Confirmation of probation completion.", aliases: ["regularisation"], pages: 1, status: "stub" },
  { id: "posh-policy", name: "POSH Policy & IC Charter", categoryId: "hr", category: "HR & Workplace", country: ["IN"], formats: ["pdf", "docx"], description: "Mandatory POSH policy + Internal Committee constitution under POSH Act 2013.", aliases: ["sexual harassment", "internal committee", "IC", "ICC"], pages: 18, new: true, status: "stub" },
  { id: "code-of-conduct", name: "Code of Conduct", categoryId: "hr", category: "HR & Workplace", country: ["IN", "US", "UK", "EU", "SG", "AU"], formats: ["pdf", "docx"], description: "Employee code of conduct and ethics policy.", aliases: ["ethics policy"], pages: 10, new: true, status: "stub" },
  { id: "employee-nda", name: "Employee NDA", categoryId: "hr", category: "HR & Workplace", country: ["IN", "US", "UK"], formats: ["pdf", "docx"], description: "Confidentiality agreement for employees. Covers IP, non-solicit, return of materials.", aliases: ["confidentiality", "employee confidentiality"], pages: 4, new: true, status: "stub" },
  { id: "remote-work-policy", name: "Remote Work Policy", categoryId: "hr", category: "HR & Workplace", country: ["IN", "US", "UK", "SG", "AU"], formats: ["pdf", "docx"], description: "Remote work / WFH policy.", aliases: ["WFH policy", "work from home"], pages: 6, new: true, status: "stub" },

  // Business
  { id: "partnership-deed", name: "Partnership Deed", categoryId: "business", category: "Business & Legal", country: ["IN"], formats: ["pdf", "docx"], description: "Partnership firm with capital, profit sharing, dissolution.", aliases: ["firm agreement"], pages: 8, status: "stub" },

  // Compliance
  { id: "dpdp-privacy-notice", name: "DPDP Privacy Notice", categoryId: "compliance", category: "Compliance", country: ["IN"], formats: ["pdf", "docx"], description: "Privacy notice compliant with the DPDP Act 2023.", aliases: ["data privacy", "DPDP", "privacy policy"], pages: 6, new: true, status: "stub" },
  { id: "vendor-dpa", name: "Vendor DPA", categoryId: "compliance", category: "Compliance", country: ["IN", "EU", "UK"], formats: ["pdf", "docx"], description: "Data Processing Agreement — Indian DPDP + EU GDPR SCCs.", aliases: ["data processing agreement", "GDPR DPA", "SCC"], pages: 10, new: true, status: "stub" },
  { id: "board-resolution", name: "Board Resolution", categoryId: "compliance", category: "Compliance", country: ["IN"], formats: ["pdf", "docx"], description: "Generic board resolution + bank/borrowing/investment variants.", aliases: ["BR", "board minute"], pages: 2, status: "stub" },
  { id: "infosec-policy", name: "Information Security Policy", categoryId: "compliance", category: "Compliance", country: ["IN", "US", "UK", "EU"], formats: ["pdf", "docx"], description: "InfoSec policy aligned with ISO 27001 / SOC 2.", aliases: ["ISO 27001", "SOC 2"], pages: 12, status: "stub" },
];

export const allMeta: TemplateMeta[] = [
  nda.meta,
  rentalAgreement.meta,
  salarySlip.meta,
  employmentOffer.meta,
  affidavit.meta,
  legalNotice.meta,
  serviceAgreement.meta,
  will.meta,
  powerOfAttorney.meta,
  ...stubs,
];

export function getModule(id: string): TemplateModule | undefined {
  return modules[id];
}

export function getMeta(id: string): TemplateMeta | undefined {
  return allMeta.find((m) => m.id === id);
}

export function listByCategory(categoryId: string): TemplateMeta[] {
  return allMeta.filter((m) => m.categoryId === categoryId);
}

export function allLiveIds(): string[] {
  return allMeta.filter((m) => m.status === "live").map((m) => m.id);
}

export function allIds(): string[] {
  return allMeta.map((m) => m.id);
}
