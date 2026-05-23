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
import { partnershipDeed } from "./modules/partnership-deed";
import { appointmentLetter } from "./modules/appointment-letter";
import { experienceLetter } from "./modules/experience-letter";
import { terminationLetter } from "./modules/termination-letter";
import { relievingLetter } from "./modules/relieving-letter";
import { giftDeed } from "./modules/gift-deed";
import { leaseAgreement } from "./modules/lease-agreement";
import { affidavitGeneral } from "./modules/affidavit-general";
import { boardResolutionAllotment } from "./modules/board-resolution-allotment";
import { boardResolutionDirector } from "./modules/board-resolution-director";
import { consultancyAgreement } from "./modules/consultancy-agreement";
import { copyrightAssignment } from "./modules/copyright-assignment";
import { distributionAgreement } from "./modules/distribution-agreement";
import { franchiseAgreement } from "./modules/franchise-agreement";
import { freelancerAgreement } from "./modules/freelancer-agreement";
import { gstInvoice } from "./modules/gst-invoice";
import { hrAppointmentLetter } from "./modules/hr-appointment-letter";
import { hrNdaEmployee } from "./modules/hr-nda-employee";
import { hrRelievingLetter } from "./modules/hr-relieving-letter";
import { jointVentureAgreement } from "./modules/joint-venture-agreement";
import { legalNoticeGeneral } from "./modules/legal-notice-general";
import { nocLetter } from "./modules/noc-letter";
import { patentLicence } from "./modules/patent-licence";
import { poshComplaintProcedure } from "./modules/posh-complaint-procedure";
import { professionalTaxChallan } from "./modules/professional-tax-challan";
import { relinquishmentDeed } from "./modules/relinquishment-deed";
import { rentAgreement } from "./modules/rent-agreement";
import { saleDeed } from "./modules/sale-deed";
import { shareCertificate } from "./modules/share-certificate";
import { startupNdia } from "./modules/startup-ndia";
import { tdsCertificateForm16 } from "./modules/tds-certificate-form16";
import { trademarkAssignment } from "./modules/trademark-assignment";
import { willTestament } from "./modules/will-testament";
// Task #33 — 17 new live modules
import { leaveLicense } from "./modules/leave-license";
import { saleAgreement } from "./modules/sale-agreement";
import { mortgageDeed } from "./modules/mortgage-deed";
import { incrementLetter } from "./modules/increment-letter";
import { warningLetter } from "./modules/warning-letter";
import { fnfSettlement } from "./modules/fnf-settlement";
import { leavePolicy } from "./modules/leave-policy";
import { internshipLetter } from "./modules/internship-letter";
import { probationConfirmation } from "./modules/probation-confirmation";
import { poshPolicy } from "./modules/posh-policy";
import { codeOfConduct } from "./modules/code-of-conduct";
import { employeeNda } from "./modules/employee-nda";
import { remoteWorkPolicy } from "./modules/remote-work-policy";
import { dpdpPrivacyNotice } from "./modules/dpdp-privacy-notice";
import { vendorDpa } from "./modules/vendor-dpa";
import { boardResolution } from "./modules/board-resolution";
import { infosecPolicy } from "./modules/infosec-policy";
// Dharma — governance category
import { dataGovernancePolicy } from "./modules/data-governance-policy";

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
  [partnershipDeed.meta.id]: partnershipDeed,
  [appointmentLetter.meta.id]: appointmentLetter,
  [experienceLetter.meta.id]: experienceLetter,
  [terminationLetter.meta.id]: terminationLetter,
  [relievingLetter.meta.id]: relievingLetter,
  [giftDeed.meta.id]: giftDeed,
  [leaseAgreement.meta.id]: leaseAgreement,
  [affidavitGeneral.meta.id]: affidavitGeneral,
  [boardResolutionAllotment.meta.id]: boardResolutionAllotment,
  [boardResolutionDirector.meta.id]: boardResolutionDirector,
  [consultancyAgreement.meta.id]: consultancyAgreement,
  [copyrightAssignment.meta.id]: copyrightAssignment,
  [distributionAgreement.meta.id]: distributionAgreement,
  [franchiseAgreement.meta.id]: franchiseAgreement,
  [freelancerAgreement.meta.id]: freelancerAgreement,
  [gstInvoice.meta.id]: gstInvoice,
  [hrAppointmentLetter.meta.id]: hrAppointmentLetter,
  [hrNdaEmployee.meta.id]: hrNdaEmployee,
  [hrRelievingLetter.meta.id]: hrRelievingLetter,
  [jointVentureAgreement.meta.id]: jointVentureAgreement,
  [legalNoticeGeneral.meta.id]: legalNoticeGeneral,
  [nocLetter.meta.id]: nocLetter,
  [patentLicence.meta.id]: patentLicence,
  [poshComplaintProcedure.meta.id]: poshComplaintProcedure,
  [professionalTaxChallan.meta.id]: professionalTaxChallan,
  [relinquishmentDeed.meta.id]: relinquishmentDeed,
  [rentAgreement.meta.id]: rentAgreement,
  [saleDeed.meta.id]: saleDeed,
  [shareCertificate.meta.id]: shareCertificate,
  [startupNdia.meta.id]: startupNdia,
  [tdsCertificateForm16.meta.id]: tdsCertificateForm16,
  [trademarkAssignment.meta.id]: trademarkAssignment,
  [willTestament.meta.id]: willTestament,
  // Task #33 — 17 live modules
  [leaveLicense.meta.id]: leaveLicense,
  [saleAgreement.meta.id]: saleAgreement,
  [mortgageDeed.meta.id]: mortgageDeed,
  [incrementLetter.meta.id]: incrementLetter,
  [warningLetter.meta.id]: warningLetter,
  [fnfSettlement.meta.id]: fnfSettlement,
  [leavePolicy.meta.id]: leavePolicy,
  [internshipLetter.meta.id]: internshipLetter,
  [probationConfirmation.meta.id]: probationConfirmation,
  [poshPolicy.meta.id]: poshPolicy,
  [codeOfConduct.meta.id]: codeOfConduct,
  [employeeNda.meta.id]: employeeNda,
  [remoteWorkPolicy.meta.id]: remoteWorkPolicy,
  [dpdpPrivacyNotice.meta.id]: dpdpPrivacyNotice,
  [vendorDpa.meta.id]: vendorDpa,
  [boardResolution.meta.id]: boardResolution,
  [infosecPolicy.meta.id]: infosecPolicy,
  [dataGovernancePolicy.meta.id]: dataGovernancePolicy,
};

const stubs: TemplateMeta[] = [];

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
  partnershipDeed.meta,
  appointmentLetter.meta,
  experienceLetter.meta,
  terminationLetter.meta,
  relievingLetter.meta,
  giftDeed.meta,
  leaseAgreement.meta,
  affidavitGeneral.meta,
  boardResolutionAllotment.meta,
  boardResolutionDirector.meta,
  consultancyAgreement.meta,
  copyrightAssignment.meta,
  distributionAgreement.meta,
  franchiseAgreement.meta,
  freelancerAgreement.meta,
  gstInvoice.meta,
  hrAppointmentLetter.meta,
  hrNdaEmployee.meta,
  hrRelievingLetter.meta,
  jointVentureAgreement.meta,
  legalNoticeGeneral.meta,
  nocLetter.meta,
  patentLicence.meta,
  poshComplaintProcedure.meta,
  professionalTaxChallan.meta,
  relinquishmentDeed.meta,
  rentAgreement.meta,
  saleDeed.meta,
  shareCertificate.meta,
  startupNdia.meta,
  tdsCertificateForm16.meta,
  trademarkAssignment.meta,
  willTestament.meta,
  // Task #33 — 17 live modules
  leaveLicense.meta,
  saleAgreement.meta,
  mortgageDeed.meta,
  incrementLetter.meta,
  warningLetter.meta,
  fnfSettlement.meta,
  leavePolicy.meta,
  internshipLetter.meta,
  probationConfirmation.meta,
  poshPolicy.meta,
  codeOfConduct.meta,
  employeeNda.meta,
  remoteWorkPolicy.meta,
  dpdpPrivacyNotice.meta,
  vendorDpa.meta,
  boardResolution.meta,
  infosecPolicy.meta,
  // Dharma
  dataGovernancePolicy.meta,
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
