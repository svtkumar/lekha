# Lekha — Next.js

Legal document generator + PII redactor for India and beyond.

Live at **lekha.elevana.guru**. `elevana.guru/lekha` redirects here.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Vanilla CSS (no Tailwind) · Playfair Display + Inter
- **Document generation**: `docx`, `pdfkit`, `exceljs` — server-side in Next.js API routes
- **Redaction**: `mammoth` (DOCX→text), `pdf-lib` (PDF structure) + custom pattern engine

## Architecture

```
app/
  page.tsx                     Landing
  templates/
    page.tsx                   Browse (?cat= filters)
    [slug]/page.tsx            Template detail + fill-online form
  earn/page.tsx                Earn with Lekha
  redactor/page.tsx            Document Redactor UI
  api/
    generate/[slug]/route.ts   POST form values → PDF/DOCX/XLSX
    redact/route.ts            POST text or file → redacted output
components/
  Nav, Footer, BrandMark
  TemplateForm                 Client component, renders from schema
  RedactorClient               Client component, file / text modes
lib/
  templates/
    types.ts                   DocSection IR, TemplateModule type
    categories.ts              5 categories
    registry.ts                35 templates (3 live, 32 stubs)
    modules/
      nda.ts                   Live — full clauses + fields
      rental-agreement.ts      Live — full clauses + fields
      salary-slip.ts           Live — PDF + XLSX support
  generators/
    pdf.ts                     DocSection IR → PDF (pdfkit)
    docx.ts                    DocSection IR → DOCX (docx lib)
    xlsx.ts                    DocSection IR → XLSX (ExcelJS)
    index.ts                   renderFormat(format, sections, opts)
  redactor/
    patterns.ts                Pattern packs: universal, IN, US, UK, EU, SG, AU, CA
    service.ts                 redactText() — text in, text + hits out
    docx-redact.ts             redactDocxBuffer() — DOCX in, redacted DOCX out
    pdf-redact.ts              redactPdfBuffer(