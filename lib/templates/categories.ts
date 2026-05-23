import type { Category } from "./types";

export const categories: Category[] = [
  {
    id: "property",
    name: "Property",
    emoji: "🏠",
    description: "Rental agreements, sale deeds, leases, gift deeds, power of attorney.",
  },
  {
    id: "hr",
    name: "HR & Workplace",
    emoji: "👥",
    description: "Offer letters, NDAs, appointment letters, salary slips, policies, exit docs.",
  },
  {
    id: "business",
    name: "Business & Legal",
    emoji: "🤝",
    description: "NDAs, partnership deeds, service agreements, legal notices.",
  },
  {
    id: "personal",
    name: "Personal & Family",
    emoji: "👨‍👩‍👧",
    description: "Wills, affidavits, guardianship, consent letters.",
  },
  {
    id: "compliance",
    name: "Compliance",
    emoji: "🛡️",
    description: "DPDP, Vendor DPAs, InfoSec, board resolutions.",
  },
  {
    id: "dharma",
    name: "Dharma · Governance",
    emoji: "⚖️",
    description: "Governance policies aligned to DPDP Act 2023, GDPR and ISO 27001 — built to pass the Dharma audit.",
  },
];

export function categoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
