import PDFDocument from "pdfkit";
import type { DocSection } from "../templates/types";

/**
 * Renders the format-agnostic DocSection IR into a PDF using pdfkit.
 * Returns a Buffer (for Next.js API response).
 */
export async function renderPdf(
  sections: DocSection[],
  opts: { title?: string; author?: string; footerText?: string } = {}
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margins: { top: 56, bottom: 56, left: 56, right: 56 },
        info: {
          Title: opts.title,
          Author: opts.author || "Lekha · Elevana",
          Creator: "Lekha",
          Producer: "Lekha (elevana.guru)",
        },
        autoFirstPage: true,
      });

      const chunks: Buffer[] = [];
      doc.on("data", (c: Buffer) => chunks.push(c));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // Gold color for accents
      const NAVY = "#0a2f6e";
      const GOLD = "#c9a84c";
      const INK = "#17243d";
      const MUTED = "#4a566e";

      let clauseCount = 0;

      for (const s of sections) {
        switch (s.kind) {
          case "title":
            doc
              .fillColor(NAVY)
              .font("Helvetica-Bold")
              .fontSize(18)
              .text(s.text.toUpperCase(), { align: "center", characterSpacing: 1.4 });
            // Gold rule
            doc
              .moveDown(0.3)
              .strokeColor(GOLD)
              .lineWidth(1.2)
              .moveTo(220, doc.y)
              .lineTo(375, doc.y)
              .stroke();
            doc.moveDown(1);
            break;
          case "subtitle":
            doc
              .fillColor(MUTED)
              .font("Helvetica")
              .fontSize(10)
              .text(s.text.toUpperCase(), { align: "center", characterSpacing: 2 });
            doc.moveDown(0.8);
            break;
          case "para":
            doc
              .fillColor(INK)
              .font("Helvetica")
              .fontSize(11)
              .text(s.text, {
                align: s.align || "justify",
                lineGap: 3,
              });
            doc.moveDown(0.6);
            break;
          case "clause":
            clauseCount++;
            if (s.title) {
              doc
                .fillColor(NAVY)
                .font("Helvetica-Bold")
                .fontSize(11.5)
                .text(`${s.number}. ${s.title}`, { underline: false });
              doc.moveDown(0.15);
              doc
                .fillColor(INK)
                .font("Helvetica")
                .fontSize(11)
                .text(s.text, { align: "justify", lineGap: 3, indent: 14 });
            } else {
              doc
                .fillColor(INK)
                .font("Helvetica")
                .fontSize(11)
                .text(`${s.number}. ${s.text}`, { align: "justify", lineGap: 3 });
            }
            doc.moveDown(0.55);
            break;
          case "list": {
            doc.fillColor(INK).font("Helvetica").fontSize(11);
            s.items.forEach((item, i) => {
              const bullet = s.ordered ? `${i + 1}.` : "•";
              doc.text(`${bullet}  ${item}`, { indent: 14, lineGap: 2 });
            });
            doc.moveDown(0.4);
            break;
          }
          case "party":
            doc
              .fillColor(GOLD)
              .font("Helvetica-Bold")
              .fontSize(10)
              .text(s.role.toUpperCase(), { characterSpacing: 1.5 });
            doc
              .fillColor(NAVY)
              .font("Helvetica-Bold")
              .fontSize(12)
              .text(s.name);
            if (s.rep) {
              doc
                .fillColor(MUTED)
                .font("Helvetica")
                .fontSize(10)
                .text(`Represented by: ${s.rep}`);
            }
            if (s.address) {
              doc
                .fillColor(INK)
                .font("Helvetica")
                .fontSize(10.5)
                .text(s.address, { lineGap: 1.5 });
            }
            doc.moveDown(0.5);
            break;
          case "divider":
            doc
              .strokeColor(GOLD)
              .lineWidth(0.5)
              .moveTo(doc.page.margins.left, doc.y + 4)
              .lineTo(doc.page.width - doc.page.margins.right, doc.y + 4)
              .stroke();
            doc.moveDown(0.8);
            break;
          case "signatures":
            doc.moveDown(1.2);
            doc
              .fillColor(NAVY)
              .font("Helvetica-Bold")
              .fontSize(11)
              .text("SIGNED AND DELIVERED", { align: "left" });
            doc.moveDown(0.5);
            s.parties.forEach((p) => {
              doc
                .fillColor(INK)
                .font("Helvetica")
                .fontSize(10)
                .text(`${p.role}:`)
                .moveDown(1.8)
                .text("_______________________________", { continued: false })
                .text(p.name, { continued: false })
                .moveDown(0.5);
            });
            break;
          case "footer":
            break; // rendered by page hook below
          case "spacer":
            doc.moveDown((s.height || 1) * 0.4);
            break;
          case "kv":
            doc.fillColor(INK).font("Helvetica").fontSize(10.5);
            for (const kv of s.pairs) {
              doc.text(`${kv.label}: `, { continued: true }).font("Helvetica-Bold").text(kv.value).font("Helvetica");
            }
            doc.moveDown(0.4);
            break;
          case "table": {
            const startX = doc.page.margins.left;
            const contentWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
            const colWidths = s.widths && s.widths.length === s.headers.length
              ? s.widths.map((w) => (w / 100) * contentWidth)
              : new Array(s.headers.length).fill(contentWidth / s.headers.length);

            const drawRow = (cells: string[], bold: boolean, fill?: string) => {
              const startY = doc.y;
              let x = startX;
              // measure row height
              const heights = cells.map((cell, i) => {
                return doc.heightOfString(cell, {
                  width: colWidths[i] - 12,
                  align: "left",
                });
              });
              const rowH = Math.max(...heights) + 10;
              if (fill) {
                doc.rect(startX, startY, contentWidth, rowH).fill(fill).fillColor(NAVY);
              }
              doc.y = startY;
              x = startX;
              cells.forEach((cell, i) => {
                doc
                  .fillColor(bold ? NAVY : INK)
                  .font(bold ? "Helvetica-Bold" : "Helvetica")
                  .fontSize(10)
                  .text(cell, x + 6, startY + 5, {
                    width: colWidths[i] - 12,
                    align: "left",
                    lineGap: 2,
                  });
                x += colWidths[i];
              });
              doc.y = startY + rowH;
              // Cell borders
              doc.strokeColor("#e0e4ec").lineWidth(0.5);
              doc.moveTo(startX, startY + rowH).lineTo(startX + contentWidth, startY + rowH).stroke();
            };
            drawRow(s.headers, true, "#faf8f3");
            s.rows.forEach((r) => drawRow(r, false));
            doc.moveDown(0.6);
            break;
          }
        }
      }

      // Footer on every page
      const range = doc.bufferedPageRange();
      for (let i = 0; i < range.count; i++) {
        doc.switchToPage(range.start + i);
        const footerText = opts.footerText || "Generated by Lekha · elevana.guru";
        doc
          .fillColor(MUTED)
          .font("Helvetica")
          .fontSize(8)
          .text(
            `${footerText}   ·   Page ${i + 1} of ${range.count}`,
            doc.page.margins.left,
            doc.page.height - 40,
            {
              width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
              align: "center",
            }
          );
      }

      doc.end();
    } catch (e) {
      reject(e);
    }
  });
}
