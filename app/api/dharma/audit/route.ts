import { NextResponse, type NextRequest } from "next/server";
import mammoth from "mammoth";
import { auditText } from "@/lib/dharma/service";
import { allFrameworkIds } from "@/lib/dharma/frameworks";

export const runtime = "nodejs";
export const maxDuration = 30;

function pickFrameworks(raw: unknown): string[] {
  const arr = Array.isArray(raw)
    ? raw
    : typeof raw === "string"
    ? raw.split(",")
    : [];
  const ids = arr.map((s) => String(s).trim()).filter((s) => allFrameworkIds.includes(s));
  return ids.length > 0 ? ids : allFrameworkIds;
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";

  // Mode A: JSON body with raw text
  if (contentType.includes("application/json")) {
    const body = await req.json().catch(() => ({}));
    const text: string = typeof body.text === "string" ? body.text : "";
    if (!text.trim()) {
      return NextResponse.json({ error: "No text provided to audit." }, { status: 400 });
    }
    const result = auditText(text, { frameworks: pickFrameworks(body.frameworks) });
    return NextResponse.json(result);
  }

  // Mode B: multipart form with a file
  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    const file = form.get("file");
    const frameworks = pickFrameworks(form.get("frameworks"));

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "file field required" }, { status: 400 });
    }

    const blob = file as File;
    const name = blob.name.toLowerCase();
    const buf = Buffer.from(await blob.arrayBuffer());

    try {
      let text = "";
      if (name.endsWith(".docx")) {
        const { value } = await mammoth.extractRawText({ buffer: buf });
        text = value;
      } else if (name.endsWith(".txt")) {
        text = buf.toString("utf-8");
      } else if (name.endsWith(".pdf")) {
        return NextResponse.json(
          {
            error:
              "PDF text extraction is not available here. Upload a DOCX or TXT version, or paste the text directly.",
          },
          { status: 400 }
        );
      } else {
        return NextResponse.json(
          { error: "Unsupported file type. Upload .docx or .txt, or paste text." },
          { status: 400 }
        );
      }

      if (!text.trim()) {
        return NextResponse.json({ error: "The document appears to be empty." }, { status: 400 });
      }
      const result = auditText(text, { frameworks });
      return NextResponse.json(result);
    } catch (e: unknown) {
      return NextResponse.json(
        { error: "Audit failed", detail: e instanceof Error ? e.message : String(e) },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ error: "Use application/json or multipart/form-data" }, { status: 400 });
}
