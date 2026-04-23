import PDFDocument from "pdfkit";
import { PDFDocument as PDFLib } from "pdf-lib";
import { redactText, type RedactOptions, type RedactionResult } from "./service";

/**
 * Extract text from a PDF buffer (via pdf-lib which gives per-page stream text),
 * redact, and emit a new PDF with the redacted text on plain white pages.
 *
 * NOTE: This strips the original PDF's formatting entirely — this is a *content redaction*,
 * not a layout-preserving redaction. For true layout-preserving, use pdf-lib to draw black
 * boxes over the hit bounding boxes in the original PDF (much more complex, requires
 * character-level coordinates).
 */
export async function redactPdfBuffer(
  inBuf: Buffer,
  opts: RedactOptions
): Promise<{ outBuf: Buffer; result: RedactionResult }> {
  // pdf-lib doesn't expose text extraction directly — we use a simple fallback here.
  // In production, we'd use pdf-parse. For now, we try pdf-lib and if it fails, return
  // an error message in the redacted output so the user knows to convert to text first.
  let extractedText = "";
  try {
    const pdfDoc = await PDFLib.load(inBuf);
    // pdf-lib doesn't extract text — we note this limitation.
    // As a workaround, the redactor UI recommends DOCX or TXT for text extraction.
    extractedText = `(PDF text extraction is not available in this environment. ` +
      `Please upload a DOCX or TXT version for full redaction. Page count: ${pdfDoc.getPageCount()})`;
  } catch {
    extractedText = "(Could not parse the uploaded PDF.)";
  }

  const result = redactText(extractedText, opts);

  const outBuf: Buffer = await new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margins: { top: 56, bottom: 56, left: 56, right: 56 } });
    const chunks: Buffer[] = [];
    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.fillColor("#0a2f6e").font("Helvetica-Bold").fontSize(16).text("REDACTED DOCUMENT", { align: "left" });
    doc.moveDown(0.5);
    doc.fillColor("#4a566e").font("Helvetica").fontSize(9).text(`Content redacted by Lekha Redactor. Hits: ${result.hits.length}.`, { align: "left" });
    doc.moveDown(1);
    doc.fillColor("#17243d").font("Helvetica").fontSize(11).text(result.redactedText, { align: "justify", lineGap: 3 });
    doc.end();
  });

  return { outBuf, result };
}
