export type Category = {
  slug: string;
  name: string;
  emoji: string;
  count: number;
  blurb: string;
};

export type Template = {
  slug: string;
  title: string;
  category: string;
  tag: string;
  summary: string;
  pages: number;
  minutes?: number;
  featured?: boolean;
  hero?: boolean;
  whats_inside?: string[];
};

export const categories: Category[] = [
  {
    slug: "compliance",
    name: "Compliance",
    emoji: "⚖️",
    count: 5,
    blurb:
      "POSH policies, DPDP privacy notices, codes of conduct, DPAs, whistleblower policies.",
  },
  {
    slug: "hr",
    name: "HR & Employment",
    emoji: "👥",
    count: 8,
    blurb:
      "Offer letters, NDAs, employment agreements, leave policies, exit checklists.",
  },
  {
    slug: "contracts",
    name: "Contracts",
    emoji: "📝",
    count: 10,
    blurb:
      "MSAs, SaaS agreements, consulting contracts, vendor agreements, SOWs.",
  },
  {
    slug: "property",
    name: "Property",
    emoji: "🏠",
    count: 6,
    blurb:
      "Rent agreements, sale deeds, lease templates, gift deeds, occupancy letters.",
  },
  {
    slug: "personal",
    name: "Personal & Family",
    emoji: "👨‍👩‍👧",
    count: 6,
    blurb:
      "Wills, POAs, affidavits, guardianship letters, consent templates.",
  },
];

export const featured: Template[] = [
  {
    slug: "posh-policy-icc-charter",
    title: "POSH Policy & ICC Charter",
    category: "compliance",
    tag: "New · Compliance",
    summary: "Everything your Internal Committee needs on day one.",
    pages: 18,
    minutes: 20,
    featured: true,
    hero: true,
    whats_inside: [
      "Internal Committee charter",
      "Complaint form & workflow",
      "Annual return format",
      "Training log & case register",
    ],
  },
  {
    slug: "dpdp-privacy-notice",
    title: "DPDP Privacy Notice",
    category: "compliance",
    tag: "New · Compliance",
    summary:
      "Digital Personal Data Protection Act–aligned privacy notice for your website and app.",
    pages: 6,
    featured: true,
  },
  {
    slug: "employee-nda",
    title: "Employee NDA",
    category: "hr",
    tag: "New · HR",
    summary: "Mutual NDA with carve-outs for whistleblowing and statutory disclosures.",
    pages: 4,
    featured: true,
  },
  {
    slug: "code-of-conduct",
    title: "Code of Conduct",
    category: "compliance",
    tag: "New · Compliance",
    summary:
      "Plain-language employee code of conduct covering ethics, conflicts, AI usage and more.",
    pages: 10,
    featured: true,
  },
  {
    slug: "vendor-dpa",
    title: "Vendor DPA",
    category: "contracts",
    tag: "New · Contracts",
    summary:
      "Data processing agreement for vendors, aligned to DPDP's data-fiduciary obligations.",
    pages: 8,
    featured: true,
  },
];
