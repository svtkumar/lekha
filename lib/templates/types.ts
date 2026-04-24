/**
 * Shared types for the Lekha document generator.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "email"
  | "tel"
  | "select"
  | "radio";

export type FieldOption = { value: string; label: string };

export type Field = {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  default?: string | number;
  options?: FieldOption[]; // for select/radio
  pattern?: string; // regex for validation
  rows?: number; // for textarea
  maxLength?: number;
  minLength?: number;
};

export type FieldGroup = {
  title: string;
  description?: string;
  fields: Field[];
};

export type OutputFormat = "pdf" | "docx" | "xlsx";

export type TemplateMeta = {
  id: string;
  name: string;
  categoryId: string;
  category: string;
  country: string[]; // ISO codes, e.g. ["IN","US","UK"]
  formats: OutputFormat[];
  description: string;
  aliases?: string[];
  pages?: number; // estimated
  minutes?: number; // estimated to fill
  hero?: boolean;
  new?: boolean;
  status: "live" | "stub" | "coming_soon";
};

/** What each template module must export. */
export type TemplateModule = {
  meta: TemplateMeta;
  groups: FieldGroup[];
  /** Returns a list of warnings / validation hints. Empty array = OK. */
  validate?: (values: Record<string, string>) => string[];
  /** The document body as structured sections (format-agnostic). */
  render: (values: Record<string, string>) => DocSection[];
};

/**
 * Format-agnostic document IR.
 * Each generator (PDF/DOCX/XLSX) consumes this IR and produces its format.
 */
export type DocSection =
  | { kind: "title"; text: string }
  | { kind: "subtitle"; text: string }
  | { kind: "para"; text: string; align?: "left" | "center" | "right" | "justify" }
  | { kind: "clause"; number: number; title?: string; text: string }
  | { kind: "list"; items: string[]; ordered?: boolean }
  | { kind: "party"; role: string; name: string; address?: string; rep?: string }
  | { kind: "divider" }
  | { kind: "signatures"; parties: { role: string; name: string }[] }
  | { kind: "footer"; text: string }
  | { kind: "spacer"; height?: number }
  | { kind: "table"; headers: string[]; rows: string[][]; widths?: number[] }
  | { kind: "kv"; pairs: { label: string; value: string }[] };

export type Category = {
  id: string;
  name: string;
  emoji: string;
  description: string;
};

export function formatDate(isoOrDmy: string): string {
  if (!isoOrDmy) return "";
  // Accept YYYY-MM-DD or DD/MM/YYYY; output "12 May 2026"
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoOrDmy);
  const dmy = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(isoOrDmy);
  let d: number, m: number, y: number;
  if (iso) {
    y = parseInt(iso[1], 10); m = parseInt(iso[2], 10); d = parseInt(iso[3], 10);
  } else if (dmy) {
    d = parseInt(dmy[1], 10); m = parseInt(dmy[2], 10); y = parseInt(dmy[3], 10);
  } else {
    return isoOrDmy;
  }
  return `${d} ${months[m - 1]} ${y}`;
}

export function sanitizeFilename(s: string): string {
  return s.replace(/[^A-Za-z0-9\-_]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 80) || "document";
}

export type StyleProfile = "legal" | "corporate" | "slip";

export function profileFor(categoryId: string, templateId?: string): StyleProfile {
  if (templateId === "salary-slip" || templateId === "fnf-settlement") return "slip";
  if (categoryId === "hr") return "corporate";
  return "legal"; // property, personal, business, compliance
}
