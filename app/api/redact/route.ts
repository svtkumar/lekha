import { NextResponse, type NextRequest } from "next/server";
import { redactText } from "@/lib/redactor/service";
import { redactDocxBuffer } from "@/lib/redactor/docx-redact";
import { redactPdfBuffer } from "@/lib/redactor/pdf-redact";
import { allCountries } from "@/lib/redactor/patterns";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";

  // Mode A: JSON body with raw text (simplest, fastest)
  if (contentType.includes("application/json")) {
    const body = await req.json();
    const text: string = body.text || "";
    const countries: string[] = Array.isArray(body.countries) ? body.countries : ["IN"];
    const mode = body.mode || "label";
    const includeNameHeuristic = Boolean(body.includeNameHeuristic);
    const customTerms: string[] = Array.isArray(body.customTerms) ? body.customTerms : [];
    const result = redactText(text, { countries, mode, includeNameHeuristic, customTerms });
    return NextResponse.json({
      redactedText: result.redactedText,
      hits: result.hits.length,
      summary: result.summary,
      details: result.hits.map((h) => ({
        pattern: h.pattern,
        label: h.label,
        original: h.original.slice(0, 4) + "…", // don't echo full PII back
        replacement: h.replacement,
      })),
    });
  }

  // Mode B: multipart form with a file
  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    const file = form.get("file");
    const countriesRaw = form.get("countries");
    const mode = (form.get("mode") as string) || "label";
    const includeNameHeuristic = form.get("includeNameHeuristic") === "true";
    const customTermsRaw = (form.get("customTerms") as string) || "";

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "file field required" }, { status: 400 });
    }

    const countries = (typeof countriesRaw === "string" ? countriesRaw : "IN")
      .split(",")
      .map((s) => s.trim())
      .filter((s) => allCountries.includes(s));
    const customTerms = customTermsRaw.split("\n").map((s) => s.trim()).filter(Boolean);

    const blob = file as File;
    const name = blob.name.toLowerCase();
    const buf = Buffer.from(await blob.arrayBuffer());

    const opts = { countries, mode: mode as "label" | "black" | "mask", includeNameHeuristic, customTerms };

    try {
      if (name.endsWith(".docx")) {
        const { outBuf, result } = await redactDocxBuffer(buf, opts);
        return new NextResponse(new Uint8Array(outBuf), {
          status: 200,
          headers: {
            "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "Content-Disposition": `attachment; filename="redacted_${Date.now()}.docx"`,
            "X-Redaction-Hits": String(result.hits.length),
          },
        });
      } else if (name.endsWith(".pdf")) {
        const { outBuf, result } = await redactPdfBuffer(buf, opts);
        return new NextResponse(new Uint8Array(outBuf), {
          status: 200,
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="redacted_${Date.now()}.pdf"`,
            "X-Redaction-Hits": String(result.hits.length),
          },
        });
      } else if (name.endsWith(".txt")) {
        const text = buf.toString("utf-8");
        const result = redactText(text, opts);
        return new NextResponse(result.redactedText, {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Content-Disposition": `attachment; filename="redacted_${Date.now()}.txt"`,
            "X-Redaction-Hits": String(result.hits.length),
          },
        });
      } else {
        return NextResponse.json(
          { error: "Unsupported file type. Upload .docx, .pdf, or .txt." },
          { status: 400 }
        );
      }
    } catch (e: unknown) {
      return NextResponse.json(
        { error: "Redaction failed", detail: e instanceof Error ? e.message : String(e) },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ error: "Use application/json or multipart/form-data" }, { status: 400 });
}
