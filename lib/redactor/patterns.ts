/**
 * PII / sensitive-information regex patterns organised by country.
 * Add more packs by exporting another PatternPack and registering it in `packs`.
 */

export type RedactionMode = "black" | "label" | "mask";

export type Pattern = {
  id: string;
  label: string;
  regex: RegExp;
  validate?: (match: string) => boolean;
  replaceWith?: RedactionMode;
};

export type PatternPack = {
  country: string; // ISO
  name: string;
  patterns: Pattern[];
};

// --- Universal patterns (any country) ---
export const universal: PatternPack = {
  country: "universal",
  name: "Universal",
  patterns: [
    { id: "email", label: "Email address", regex: /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g, replaceWith: "label" },
    { id: "url", label: "URL", regex: /\bhttps?:\/\/[^\s<>"]+/gi, replaceWith: "label" },
    { id: "ipv4", label: "IPv4 address", regex: /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b/g, replaceWith: "label" },
    {
      id: "credit_card",
      label: "Credit card number",
      regex: /\b(?:\d[ \-]*?){13,19}\b/g,
      validate: (m) => { const d = m.replace(/\D/g, ""); return d.length >= 13 && d.length <= 19 && luhn(d); },
      replaceWith: "mask",
    },
    { id: "iban", label: "IBAN", regex: /\b[A-Z]{2}\d{2}[A-Z0-9]{11,30}\b/g, replaceWith: "mask" },
    { id: "mac_address", label: "MAC address", regex: /\b(?:[0-9A-Fa-f]{2}[:\-]){5}[0-9A-Fa-f]{2}\b/g, replaceWith: "label" },
    { id: "date_iso", label: "Date (ISO)", regex: /\b(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\b/g, replaceWith: "label" },
    { id: "phone_generic", label: "Phone number (international)", regex: /\+(?:\d[ \-]?){7,14}\d/g, replaceWith: "mask" },
  ],
};

// --- India ---
export const india: PatternPack = {
  country: "IN",
  name: "India",
  patterns: [
    { id: "pan_in", label: "PAN", regex: /\b[A-Z]{3}[PCFHATBLJG][A-Z]\d{4}[A-Z]\b/g, replaceWith: "label" },
    {
      id: "aadhaar_in", label: "Aadhaar",
      regex: /\b(?!0{4})(?!1{4})\d{4}[ \-]?\d{4}[ \-]?\d{4}\b/g,
      validate: (m) => verhoeff(m.replace(/\D/g, "")),
      replaceWith: "mask",
    },
    { id: "phone_in", label: "Indian mobile", regex: /\b(?:\+?91[ \-]?)?[6-9]\d{9}\b/g, replaceWith: "mask" },
    { id: "ifsc_in", label: "IFSC", regex: /\b[A-Z]{4}0[A-Z0-9]{6}\b/g, replaceWith: "label" },
    { id: "gstin_in", label: "GSTIN", regex: /\b\d{2}[A-Z]{5}\d{4}[A-Z]\d[A-Z0-9]Z[A-Z0-9]\b/g, replaceWith: "label" },
    { id: "bank_acct_in", label: "Bank account", regex: /\b\d{9,18}\b/g, replaceWith: "mask" },
    { id: "voter_id_in", label: "Voter ID (EPIC)", regex: /\b[A-Z]{3}\d{7}\b/g, replaceWith: "label" },
    { id: "passport_in", label: "Passport", regex: /\b[A-PR-WY][1-9]\d{6}\b/g, replaceWith: "label" },
    { id: "pin_in", label: "PIN code", regex: /\b[1-9]\d{5}\b/g, replaceWith: "label" },
    { id: "uan_in", label: "UAN (PF)", regex: /\b\d{12}\b/g, replaceWith: "mask" },
  ],
};

// --- United States ---
export const us: PatternPack = {
  country: "US",
  name: "United States",
  patterns: [
    { id: "ssn_us", label: "SSN", regex: /\b(?!000|666|9\d{2})\d{3}[\- ]?(?!00)\d{2}[\- ]?(?!0000)\d{4}\b/g, replaceWith: "mask" },
    { id: "ein_us", label: "EIN", regex: /\b\d{2}\-\d{7}\b/g, replaceWith: "label" },
    { id: "itin_us", label: "ITIN", regex: /\b9\d{2}[\- ]?(?:7\d|8\d)[\- ]?\d{4}\b/g, replaceWith: "mask" },
    { id: "phone_us", label: "US phone", regex: /\b(?:\+?1[ \-]?)?\(?[2-9]\d{2}\)?[ \-]?[2-9]\d{2}[ \-]?\d{4}\b/g, replaceWith: "mask" },
    { id: "zip_us", label: "US ZIP", regex: /\b\d{5}(?:\-\d{4})?\b/g, replaceWith: "label" },
    { id: "routing_us", label: "ABA routing", regex: /\b[0123678]\d{8}\b/g, validate: abaChecksum, replaceWith: "label" },
  ],
};

// --- United Kingdom ---
export const uk: PatternPack = {
  country: "UK",
  name: "United Kingdom",
  patterns: [
    { id: "ni_uk", label: "National Insurance", regex: /\b(?!BG|GB|NK|KN|TN|NT|ZZ)[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z] ?\d{2} ?\d{2} ?\d{2} ?[A-D]\b/g, replaceWith: "mask" },
    { id: "nhs_uk", label: "NHS number", regex: /\b\d{3}[ \-]?\d{3}[ \-]?\d{4}\b/g, replaceWith: "mask" },
    { id: "utr_uk", label: "UTR (tax)", regex: /\b\d{10}\b/g, replaceWith: "label" },
    { id: "sort_code_uk", label: "Sort code", regex: /\b\d{2}\-\d{2}\-\d{2}\b/g, replaceWith: "label" },
    { id: "postcode_uk", label: "UK postcode", regex: /\b[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}\b/g, replaceWith: "label" },
    { id: "phone_uk", label: "UK phone", regex: /\b(?:\+?44[ \-]?|0)(?:\d[ \-]?){9,10}\b/g, replaceWith: "mask" },
  ],
};

// --- European Union (supranational) ---
export const eu: PatternPack = {
  country: "EU",
  name: "European Union",
  patterns: [
    { id: "vat_eu", label: "VAT ID", regex: /\b(?:AT|BE|BG|CY|CZ|DE|DK|EE|EL|ES|FI|FR|HR|HU|IE|IT|LT|LU|LV|MT|NL|PL|PT|RO|SE|SI|SK)U?[A-Z0-9]{8,12}\b/g, replaceWith: "label" },
    { id: "bic_eu", label: "BIC / SWIFT", regex: /\b[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}(?:[A-Z0-9]{3})?\b/g, replaceWith: "label" },
  ],
};

// --- Germany (specifically) ---
export const de: PatternPack = {
  country: "DE",
  name: "Germany",
  patterns: [
    { id: "steueridnr_de", label: "Steuer-ID (Tax ID)", regex: /\b\d{2}[ ]?\d{3}[ ]?\d{3}[ ]?\d{3}\b/g, replaceWith: "mask" },
    { id: "steuernr_de", label: "Steuernummer", regex: /\b\d{2,3}\/\d{3,4}\/\d{4,5}\b/g, replaceWith: "label" },
    { id: "sv_number_de", label: "Sozialversicherungsnummer", regex: /\b\d{2}\d{6}[A-Z]\d{3}\b/g, replaceWith: "mask" },
    { id: "plz_de", label: "PLZ (postal)", regex: /\bDE-?\d{5}\b|\b[0-9]{5}\b(?=\s+[A-Z])/g, replaceWith: "label" },
    { id: "phone_de", label: "DE phone", regex: /\b(?:\+?49[ \-]?|0)(?:\d[ \-]?){9,11}\b/g, replaceWith: "mask" },
  ],
};

// --- Singapore ---
export const sg: PatternPack = {
  country: "SG",
  name: "Singapore",
  patterns: [
    { id: "nric_sg", label: "NRIC / FIN", regex: /\b[STFG]\d{7}[A-Z]\b/g, replaceWith: "mask" },
    { id: "uen_sg", label: "UEN", regex: /\b(?:\d{9}[A-Z]|\d{10}|[TS]\d{2}[A-Z]{2}\d{4}[A-Z])\b/g, replaceWith: "label" },
    { id: "phone_sg", label: "SG phone", regex: /\b(?:\+?65[ \-]?)?[36-9]\d{3}[ \-]?\d{4}\b/g, replaceWith: "mask" },
  ],
};

// --- Australia ---
export const au: PatternPack = {
  country: "AU",
  name: "Australia",
  patterns: [
    { id: "tfn_au", label: "Tax File Number", regex: /\b\d{3}[ \-]?\d{3}[ \-]?\d{3}\b/g, replaceWith: "mask" },
    { id: "abn_au", label: "ABN", regex: /\b\d{2}[ \-]?\d{3}[ \-]?\d{3}[ \-]?\d{3}\b/g, replaceWith: "label" },
    { id: "medicare_au", label: "Medicare", regex: /\b[2-6]\d{3}[ \-]?\d{5}[ \-]?\d\b/g, replaceWith: "mask" },
    { id: "phone_au", label: "AU phone", regex: /\b(?:\+?61[ \-]?|0)[2-478][ \-]?\d{4}[ \-]?\d{4}\b/g, replaceWith: "mask" },
  ],
};

// --- Canada ---
export const ca: PatternPack = {
  country: "CA",
  name: "Canada",
  patterns: [
    { id: "sin_ca", label: "SIN", regex: /\b\d{3}[ \-]?\d{3}[ \-]?\d{3}\b/g, validate: (m) => luhn(m.replace(/\D/g, "")), replaceWith: "mask" },
    { id: "phone_ca", label: "Canada phone", regex: /\b(?:\+?1[ \-]?)?\(?[2-9]\d{2}\)?[ \-]?[2-9]\d{2}[ \-]?\d{4}\b/g, replaceWith: "mask" },
    { id: "postal_ca", label: "Canadian postal code", regex: /\b[A-VXY]\d[A-Z][ \-]?\d[A-Z]\d\b/g, replaceWith: "label" },
  ],
};

// --- Japan ---
export const jp: PatternPack = {
  country: "JP",
  name: "Japan",
  patterns: [
    {
      id: "mynumber_jp", label: "My Number (個人番号)",
      regex: /\b\d{4}[ \-]?\d{4}[ \-]?\d{4}\b/g,
      // My Number has a check digit but we accept by format for now
      replaceWith: "mask",
    },
    { id: "corporate_jp", label: "Corporate Number (法人番号)", regex: /\b\d{13}\b/g, replaceWith: "label" },
    { id: "postal_jp", label: "Japan postal code", regex: /\b\d{3}\-\d{4}\b/g, replaceWith: "label" },
    { id: "phone_jp", label: "JP phone", regex: /\b(?:\+?81[ \-]?|0)(?:\d[ \-]?){9,10}\b/g, replaceWith: "mask" },
    { id: "passport_jp", label: "JP passport", regex: /\b[A-Z]{2}\d{7}\b/g, replaceWith: "label" },
  ],
};

// --- Brazil ---
export const br: PatternPack = {
  country: "BR",
  name: "Brazil",
  patterns: [
    {
      id: "cpf_br", label: "CPF",
      regex: /\b\d{3}\.?\d{3}\.?\d{3}[\- ]?\d{2}\b/g,
      validate: (m) => cpfValid(m.replace(/\D/g, "")),
      replaceWith: "mask",
    },
    {
      id: "cnpj_br", label: "CNPJ",
      regex: /\b\d{2}\.?\d{3}\.?\d{3}\/?0001[\- ]?\d{2}\b/g,
      replaceWith: "label",
    },
    { id: "rg_br", label: "RG (Identity)", regex: /\b\d{2}\.?\d{3}\.?\d{3}[\- ]?[\dXx]\b/g, replaceWith: "mask" },
    { id: "phone_br", label: "BR phone", regex: /\b(?:\+?55[ \-]?)?\(?\d{2}\)?[ \-]?9?\d{4}[ \-]?\d{4}\b/g, replaceWith: "mask" },
    { id: "cep_br", label: "CEP (postal)", regex: /\b\d{5}\-\d{3}\b/g, replaceWith: "label" },
  ],
};

// --- Mexico ---
export const mx: PatternPack = {
  country: "MX",
  name: "Mexico",
  patterns: [
    { id: "curp_mx", label: "CURP", regex: /\b[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]\d\b/g, replaceWith: "mask" },
    { id: "rfc_mx", label: "RFC", regex: /\b[A-Z&Ñ]{3,4}\d{6}(?:[A-Z0-9]{3})?\b/g, replaceWith: "label" },
    { id: "phone_mx", label: "MX phone", regex: /\b(?:\+?52[ \-]?)?(?:1[ \-]?)?\d{2}[ \-]?\d{4}[ \-]?\d{4}\b/g, replaceWith: "mask" },
  ],
};

export const packs: Record<string, PatternPack> = {
  universal,
  IN: india,
  US: us,
  UK: uk,
  EU: eu,
  DE: de,
  SG: sg,
  AU: au,
  CA: ca,
  JP: jp,
  BR: br,
  MX: mx,
};

export const allCountries = Object.keys(packs);

// --- Helpers ---

function luhn(digits: string): boolean {
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alt) { n *= 2; if (n > 9) n -= 9; }
    sum += n; alt = !alt;
  }
  return sum > 0 && sum % 10 === 0;
}

function abaChecksum(m: string): boolean {
  const d = m.replace(/\D/g, "");
  if (d.length !== 9) return false;
  const sum = 3 * (parseInt(d[0], 10) + parseInt(d[3], 10) + parseInt(d[6], 10))
            + 7 * (parseInt(d[1], 10) + parseInt(d[4], 10) + parseInt(d[7], 10))
            +     (parseInt(d[2], 10) + parseInt(d[5], 10) + parseInt(d[8], 10));
  return sum > 0 && sum % 10 === 0;
}

// Brazilian CPF algorithm
function cpfValid(cpf: string): boolean {
  if (!/^\d{11}$/.test(cpf)) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i], 10) * (10 - i);
  let rem = (sum * 10) % 11;
  if (rem === 10) rem = 0;
  if (rem !== parseInt(cpf[9], 10)) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i], 10) * (11 - i);
  rem = (sum * 10) % 11;
  if (rem === 10) rem = 0;
  return rem === parseInt(cpf[10], 10);
}

// Aadhaar Verhoeff check
const verhoeffD = [
  [0,1,2,3,4,5,6,7,8,9],[1,2,3,4,0,6,7,8,9,5],[2,3,4,0,1,7,8,9,5,6],
  [3,4,0,1,2,8,9,5,6,7],[4,0,1,2,3,9,5,6,7,8],[5,9,8,7,6,0,4,3,2,1],
  [6,5,9,8,7,1,0,4,3,2],[7,6,5,9,8,2,1,0,4,3],[8,7,6,5,9,3,2,1,0,4],
  [9,8,7,6,5,4,3,2,1,0]
];
const verhoeffP = [
  [0,1,2,3,4,5,6,7,8,9],[1,5,7,6,2,8,3,0,9,4],[5,8,0,3,7,9,6,1,4,2],
  [8,9,1,6,0,4,3,5,2,7],[9,4,5,3,1,2,6,8,7,0],[4,2,8,6,5,7,3,9,0,1],
  [2,7,9,3,8,0,6,4,1,5],[7,0,4,6,9,1,3,2,5,8]
];
function verhoeff(num: string): boolean {
  if (!/^\d+$/.test(num)) return false;
  let c = 0;
  const reversed = num.split("").reverse();
  for (let i = 0; i < reversed.length; i++) {
    c = verhoeffD[c][verhoeffP[i % 8][parseInt(reversed[i], 10)]];
  }
  return c === 0;
}
