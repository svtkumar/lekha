/**
 * Known-PII test fixtures per country for the Document Redactor.
 * Each entry: { country, input, expectedHits: minimum expected hit count by pattern id }
 */

export type RedactorFixture = {
  name: string;
  countries: string[];
  input: string;
  expectsPattern: string[]; // pattern ids that MUST be detected
};

export const redactorFixtures: RedactorFixture[] = [
  {
    name: "India — PAN, Aadhaar, IFSC, phone, email",
    countries: ["IN"],
    input: [
      "Contact Priya Sharma at priya@example.com or +91 98765 12345.",
      "Her PAN is AAAPL1234C and Aadhaar is 2341 7894 5612.", // real-format, Verhoeff-valid may fail
      "Bank: HDFC0001234 account 12345678901.",
      "GSTIN 29AABCU9603R1ZM.",
      "Address: 560038, India.",
    ].join(" "),
    expectsPattern: ["pan_in", "email", "phone_in", "ifsc_in", "gstin_in"],
  },
  {
    name: "US — SSN, phone, EIN, ZIP",
    countries: ["US"],
    input: "John Doe, SSN 123-45-6789, phone (555) 123-4567, EIN 12-3456789, ZIP 94103. Email john@example.com.",
    expectsPattern: ["ssn_us", "phone_us", "ein_us", "email"],
  },
  {
    name: "UK — NI, NHS, postcode, sort code",
    countries: ["UK"],
    input: "Name: Alice Smith. NI: AB123456C. NHS: 485 777 3456. Address: 10 Downing Street, SW1A 2AA. Sort code 20-00-00.",
    expectsPattern: ["ni_uk", "postcode_uk", "sort_code_uk"],
  },
  {
    name: "EU — VAT, BIC",
    countries: ["EU"],
    input: "Our VAT number is DE123456789 and BIC is DEUTDEFF500.",
    expectsPattern: ["vat_eu", "bic_eu"],
  },
  {
    name: "Germany — Steuer-ID, phone",
    countries: ["DE"],
    input: "Steuer-ID: 12 345 678 901. Phone +49 30 12345678.",
    expectsPattern: ["steueridnr_de", "phone_de"],
  },
  {
    name: "Singapore — NRIC, phone",
    countries: ["SG"],
    input: "NRIC S1234567D, phone +65 9123 4567.",
    expectsPattern: ["nric_sg", "phone_sg"],
  },
  {
    name: "Australia — TFN, ABN",
    countries: ["AU"],
    input: "TFN 123 456 789, ABN 12 345 678 901.",
    expectsPattern: ["tfn_au", "abn_au"],
  },
  {
    name: "Canada — SIN (Luhn)",
    countries: ["CA"],
    input: "SIN 046 454 286. Postal M5V 3A8.",
    expectsPattern: ["sin_ca", "postal_ca"],
  },
  {
    name: "Japan — My Number, postal",
    countries: ["JP"],
    input: "My Number 1234 5678 9012. Postal 100-0001.",
    expectsPattern: ["mynumber_jp", "postal_jp"],
  },
  {
    name: "Brazil — CPF (checksum), CEP",
    countries: ["BR"],
    // Known-valid CPF for testing: 111.444.777-35
    input: "CPF 111.444.777-35, CEP 01310-100.",
    expectsPattern: ["cpf_br", "cep_br"],
  },
  {
    name: "Universal — credit card (Luhn) + IBAN",
    countries: ["IN"],
    // Test Visa: 4111 1111 1111 1111 (passes Luhn)
    input: "Card 4111 1111 1111 1111, IBAN DE89370400440532013000.",
    expectsPattern: ["credit_card", "iban"],
  },
  {
    name: "Universal — false positive guards",
    countries: ["IN"],
    // Credit card without Luhn validity — 1234 5678 9012 3456 should NOT be flagged
    input: "Reference number 1234 5678 9012 3456 is not a card.",
    expectsPattern: [], // nothing should match
  },
];
