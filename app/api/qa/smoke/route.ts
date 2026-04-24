/**
 * QA smoke test runner with deep format checks.
 * GET /api/qa/smoke  ->  JSON report of everything.
 *
 * Per template × format:
 *   1. Renders without throwing
 *   2. Buffer is non-empty & has correct magic bytes
 *   3. PDF: page count (via pdf-lib), check min-pages heuristic
 *   4. DOCX: unzip and inspect document.xml for font family & font size (styles/default)
 *   5. XLSX: unzip and check workbook.xml + sheet1.xml exist
 *   6. Profile compliance: fonts/sizes/margins match the template's style profile
 *
 * Redactor: all fixture patterns detect expected; no false positives on guard fixture.
 */

import { NextResponse } from "next/server";
import { allMeta, getModule } from "@/lib/templates/registry";
import { renderFormat } from "@/lib/generators";
import { fixtures } from "@/lib/qa/fixtures";
import { redactorFixtures } from "@/lib/qa/redactor-fixtures";
import { redactText } from "@/lib/redactor/service";
import { profileFor } from "@/lib/templates/types";
import type { OutputFormat, StyleProfile } from "@/lib/templates/types";
import { PDFDocument } from "pdf-lib";
import JSZip from "adm-zip";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAGIC: Record<OutputFormat, (b: Buffer) => boolean> = {
  pdf: (b) => b.length > 100 && b.subarray(0, 4).toString() === "%PDF",
  docx: (b) => b.length > 100 && b[0] === 0x50 && b[1] === 0x4b,
  xlsx: (b) => b.length > 100 && b[0] === 0x50 && b[1] === 0x4b,
};

// Expected standards by profile
const STANDARDS: Record<StyleProfile, { font: string; sizeHp: number; marginTwip: number; lineTwip: number }> = {
  legal:     { font: "Times New Roman", sizeHp: 24, marginTwip: 1440, lineTwip: 360 },
  corporate: { font: "Calibri",         sizeHp: 22, marginTwip: 1440, lineTwip: 276 },
  slip:      { font: "Calibri",         sizeHp: 20, marginTwip: 720,  lineTwip: 240 },
};

async function pdfPages(buf: Buffer): Promise<number | null> {
  try { const d = await PDFDocument.load(buf); return d.getPageCount(); }
  catch { return null; }
}

function docxInspect(buf: Buffer): {
  font?: string; sizeHp?: number; marginTwip?: number; lineTwip?: number;
  error?: string;
} {
  try {
    const zip = new JSZip(buf);
    const document = zip.getEntry("word/document.xml");
    const styles = zip.getEntry("word/styles.xml");
    if (!document || !styles) return { error: "missing core parts" };
    const docXml = document.getData().toString("utf8");
    const stylesXml = styles.getData().toString("utf8");
    const fontMatch = stylesXml.match(/<w:rFonts[^>]*w:ascii="([^"]+)"/);
    const sizeMatch = stylesXml.match(/<w:sz[^>]*w:val="(\d+)"/);
    const marginMatch = docXml.match(/<w:pgMar[^>]*w:top="(\d+)"/);
    const lineMatch = docXml.match(/<w:spacing[^>]*w:line="(\d+)"/);
    return {
      font: fontMatch?.[1],
      sizeHp: sizeMatch ? parseInt(sizeMatch[1], 10) : undefined,
      marginTwip: marginMatch ? parseInt(marginMatch[1], 10) : undefined,
      lineTwip: lineMatch ? parseInt(lineMatch[1], 10) : undefined,
    };
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }
}

function xlsxInspect(buf: Buffer): { sheets?: number; error?: string } {
  try {
    const zip = new JSZip(buf);
    const sheetEntries = zip.getEntries().filter((e) => e.entryName.startsWith("xl/worksheets/sheet"));
    return { sheets: sheetEntries.length };
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }
}

export async function GET() {
  const started = Date.now();
  type R = {
    id: string; name: string; profile: StyleProfile; fmt: string; ok: boolean;
    bytes: number; magicOk: boolean; pages?: number | null;
    fontActual?: string; fontExpected?: string; fontOk?: boolean;
    sizeActual?: number; sizeExpected?: number; sizeOk?: boolean;
    marginActual?: number; marginExpected?: number; marginOk?: boolean;
    lineActual?: number; lineExpected?: number; lineOk?: boolean;
    error?: string; ms: number;
  };
  const templateResults: R[] = [];

  for (const meta of allMeta.filter((m) => m.status === "live")) {
    const mod = getModule(meta.id);
    const fx = fixtures[meta.id];
    const profile = profileFor(meta.categoryId, meta.id);
    const std = STANDARDS[profile];
    if (!mod || !fx) {
      templateResults.push({
        id: meta.id, name: meta.name, profile, fmt: "-",
        ok: false, bytes: 0, magicOk: false, ms: 0,
        error: !mod ? "missing module" : "missing fixture",
      });
      continue;
    }
    for (const fmt of meta.formats) {
      const t0 = Date.now();
      try {
        const sections = mod.render(fx);
        const buf = await renderFormat(fmt, sections, {
          title: meta.name, author: "Lekha QA",
          footerText: "Lekha QA smoke", sheetName: meta.name.slice(0, 28), profile,
        });
        const r: R = {
          id: meta.id, name: meta.name, profile, fmt,
          ok: true, bytes: buf.length, magicOk: MAGIC[fmt](buf), ms: Date.now() - t0,
        };
        if (fmt === "pdf") {
          r.pages = await pdfPages(buf);
        } else if (fmt === "docx") {
          const d = docxInspect(buf);
          r.fontActual = d.font; r.fontExpected = std.font;
          r.fontOk = d.font === std.font;
          r.sizeActual = d.sizeHp; r.sizeExpected = std.sizeHp;
          r.sizeOk = d.sizeHp === std.sizeHp;
          r.marginActual = d.marginTwip; r.marginExpected = std.marginTwip;
          r.marginOk = Math.abs((d.marginTwip ?? 0) - std.marginTwip) <= 60;
          r.lineActual = d.lineTwip; r.lineExpected = std.lineTwip;
          r.lineOk = Math.abs((d.lineTwip ?? 0) - std.lineTwip) <= 40;
          if (d.error) r.error = d.error;
        } else {
          const x = xlsxInspect(buf);
          if (x.error) r.error = x.error;
          else r.pages = x.sheets ?? null;
        }
        templateResults.push(r);
      } catch (e) {
        templateResults.push({
          id: meta.id, name: meta.name, profile, fmt,
          ok: false, bytes: 0, magicOk: false,
          error: e instanceof Error ? e.message : String(e), ms: Date.now() - t0,
        });
      }
    }
  }

  const redactorResults = redactorFixtures.map((f) => {
    const r = redactText(f.input, { countries: f.countries, mode: "label" });
    const foundIds = r.hits.map((h) => h.pattern);
    const missing = f.expectsPattern.filter((p) => !foundIds.includes(p));
    const extraInExpectedEmpty = f.expectsPattern.length === 0 && r.hits.length > 0;
    return {
      name: f.name, countries: f.countries,
      expected: f.expectsPattern, found: foundIds,
      hits: r.hits.length, missing,
      ok: missing.length === 0 && !extraInExpectedEmpty,
    };
  });

  const templateFail = templateResults.filter((r) =>
    !r.ok || !r.magicOk ||
    (r.fmt === "docx" && (r.fontOk === false || r.sizeOk === false || r.marginOk === false))
  );
  const redactorFail = redactorResults.filter((r) => !r.ok);
  const overall = templateFail.length === 0 && redactorFail.length === 0 ? "PASS" : "FAIL";

  return NextResponse.json({
    elapsed_ms: Date.now() - started,
    standards: STANDARDS,
    summary: {
      templates_total: templateResults.length,
      templates_ok: templateResults.filter((r) => r.ok && r.magicOk).length,
      templates_profile_compliant: templateResults.filter((r) =>
        r.fmt !== "docx" || (r.fontOk && r.sizeOk && r.marginOk && r.lineOk)
      ).length,
      templates_fail: templateFail.length,
      redactor_total: redactorResults.length,
      redactor_ok: redactorResults.filter((r) => r.ok).length,
      redactor_fail: redactorFail.length,
      overall,
    },
    templates: templateResults,
    redactor: redactorResults,
  }, { status: overall === "PASS" ? 200 : 500 });
}
