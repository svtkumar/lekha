/**
 * QA smoke test runner.
 * GET /api/qa/smoke  ->  runs fixture-based smoke tests and returns JSON report.
 *
 * Checks:
 * 1. Every live template can render every advertised format without throwing,
 *    and the emitted buffer is non-empty and starts with the expected magic bytes.
 * 2. Every redactor fixture detects all expected patterns (no false negatives)
 *    and the false-positive-guard fixture stays clean.
 */

import { NextResponse } from "next/server";
import { allMeta, getModule } from "@/lib/templates/registry";
import { renderFormat } from "@/lib/generators";
import { fixtures } from "@/lib/qa/fixtures";
import { redactorFixtures } from "@/lib/qa/redactor-fixtures";
import { redactText } from "@/lib/redactor/service";
import type { OutputFormat } from "@/lib/templates/types";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAGIC: Record<OutputFormat, (b: Buffer) => boolean> = {
  pdf: (b) => b.length > 100 && b.subarray(0, 4).toString() === "%PDF",
  docx: (b) => b.length > 100 && b[0] === 0x50 && b[1] === 0x4b, // PK (zip)
  xlsx: (b) => b.length > 100 && b[0] === 0x50 && b[1] === 0x4b, // PK (zip)
};

export async function GET() {
  const started = Date.now();
  const templateResults: Array<{
    id: string;
    name: string;
    status: string;
    fmt: string;
    ok: boolean;
    bytes: number;
    magicOk: boolean;
    error?: string;
    ms: number;
  }> = [];

  for (const meta of allMeta.filter((m) => m.status === "live")) {
    const mod = getModule(meta.id);
    const fx = fixtures[meta.id];
    if (!mod) continue;
    if (!fx) {
      templateResults.push({
        id: meta.id, name: meta.name, status: meta.status, fmt: "-",
        ok: false, bytes: 0, magicOk: false,
        error: "missing fixture", ms: 0,
      });
      continue;
    }
    for (const fmt of meta.formats) {
      const t0 = Date.now();
      try {
        const sections = mod.render(fx);
        const buf = await renderFormat(fmt, sections, {
          title: meta.name, author: "Lekha QA",
          footerText: "Lekha QA smoke", sheetName: meta.name.slice(0, 28),
        });
        templateResults.push({
          id: meta.id, name: meta.name, status: meta.status, fmt,
          ok: true, bytes: buf.length,
          magicOk: MAGIC[fmt](buf), ms: Date.now() - t0,
        });
      } catch (e) {
        templateResults.push({
          id: meta.id, name: meta.name, status: meta.status, fmt,
          ok: false, bytes: 0, magicOk: false,
          error: e instanceof Error ? e.message : String(e),
          ms: Date.now() - t0,
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
      name: f.name,
      countries: f.countries,
      expected: f.expectsPattern,
      found: foundIds,
      hits: r.hits.length,
      missing,
      ok: missing.length === 0 && !extraInExpectedEmpty,
    };
  });

  const templateFail = templateResults.filter((r) => !r.ok || !r.magicOk);
  const redactorFail = redactorResults.filter((r) => !r.ok);

  return NextResponse.json({
    elapsed_ms: Date.now() - started,
    summary: {
      templates_total: templateResults.length,
      templates_ok: templateResults.filter((r) => r.ok && r.magicOk).length,
      templates_fail: templateFail.length,
      redactor_total: redactorResults.length,
      redactor_ok: redactorResults.filter((r) => r.ok).length,
      redactor_fail: redactorFail.length,
      overall: templateFail.length === 0 && redactorFail.length === 0 ? "PASS" : "FAIL",
    },
    templates: templateResults,
    redactor: redactorResults,
  }, { status: templateFail.length === 0 && redactorFail.length === 0 ? 200 : 500 });
}
