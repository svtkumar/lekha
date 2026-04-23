import mammoth from "mammoth";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { redactText, type RedactOptions, type RedactionResult } from "./service";

/**
 * Extract text from a DOCX buffer, redact, and emit a new DOCX.
 * Loses formatting (intentional — preserves privacy over layout fidelity).
 */
export async function redactDocxBuffer(
  inBuf: Buffer,
  opts: RedactOptions
): Promise<{ outBuf: Buffer; result: RedactionResult }> {
  const { value: text } = await mammoth.extractRawText({ buffer: inBuf });
  const result = redactText(text, opts);

  const paragraphs = result.redactedText.split(/\n+/).map(
    (p) =>
      new Paragraph({
        children: [new TextRun({ text: p, size: 22, color: "17243D" })],
        spacing: { after: 160 },
      })
  );

  const doc = new Document({
    creator: "Lekha Redactor",
    description: "Redacted document (content extracted as text)",
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "REDACTED DOCUMENT",
                bold: true,
                color: "0A2F6E",
                size: 28,
              }),
            ],
            spacing: { after: 200 },
          }),
          ...paragraphs,
        ],
      },
    ],
  });

  const outBuf = await Packer.toBuffer(doc);
  return { outBuf, result };
}
