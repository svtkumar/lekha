import PDFDocument from "pdfkit";
import type { DocSection, StyleProfile } from "../templates/types";

/**
 * Style profiles matching Indian legal and corporate document conventions.
 * - legal: Times New Roman 12pt, 1.5 line spacing, 1" margins, justified — for deeds, affidavits, policies
 * - corporate: Helvetica (Calibri-equiv) 11pt, 1.15 spacing, 1" margins, left-aligned — for HR letters
 * - slip: Helvetica 10pt, 0.5" margins, compact tables — for salary slips, FnF
 */
const PROFILES: Record<StyleProfile, {
  serif: string; sans: string; bodyFont: string; boldFont: string;
  bodySize: number; titleSize: number; subtitleSize: number; clauseTitleSize: number;
  lineGap: number; margin: number; bodyAlign: "justify" | "left";
}> = {
  legal: {
    serif: "Times-Roman", sans: "Helvetica",
    bodyFont: "Times-Roman", boldFont: "Times-Bold",
    bodySize: 12, titleSize: 18, subtitleSize: 10.5, clauseTitleSize: 12.5,
    lineGap: 6, margin: 72, bodyAlign: "justify",
  },
  corporate: {
    serif: "Times-Roman", sans: "Helvetica",
    bodyFont: "Helvetica", boldFont: "Helvetica-Bold",
    bodySize: 11, titleSize: 16, subtitleSize: 10, clauseTitleSize: 11.5,
    lineGap: 3, margin: 72, bodyAlign: "left",
  },
  slip: {
    serif: "Times-Roman", sans: "Helvetica",
    bodyFont: "Helvetica", boldFont: "Helvetica-Bold",
    bodySize: 10, titleSize: 14, subtitleSize: 9, clauseTitleSize: 10.5,
    lineGap: 2, margin: 36, bodyAlign: "left",
  },
};

export async function renderPdf(
  sections: DocSection[],
  opts: { title?: string; author?: string; footerText?: string; profile?: StyleProfile } = {}
): Promise<Buffer> {
  const profile = opts.profile || "legal";
  const P = PROFILES[profile];

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margins: { top: P.margin, bottom: P.margin, left: P.margin, right: P.margin },
        info: {
          Title: opts.title, Author: opts.author || "Lekha · Elevana",
          Creator: "Lekha", Producer: "Lekha (elevana.guru)",
        },
        autoFirstPage: true,
      });

      const chunks: Buffer[] = [];
      doc.on("data", (c: Buffer) => chunks.push(c));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      const NAVY = "#0a2f6e", GOLD = "#c9a84c", INK = "#17243d", MUTED = "#4a566e";

      for (const s of sections) {
        switch (s.kind) {
          case "title":
            doc.fillColor(NAVY).font(P.boldFont).fontSize(P.titleSize)
              .text(s.text.toUpperCase(), { align: "center", characterSpacing: 1.2 });
            doc.moveDown(0.3).strokeColor(GOLD).lineWidth(1.2)
              .moveTo(220, doc.y).lineTo(375, doc.y).stroke();
            doc.moveDown(1);
            break;
          case "subtitle":
            doc.fillColor(MUTED).font(P.bodyFont).fontSize(P.subtitleSize)
              .text(s.text.toUpperCase(), { align: "center", characterSpacing: 2 });
            doc.moveDown(0.8);
            break;
          case "para":
            doc.fillColor(INK).font(P.bodyFont).fontSize(P.bodySize)
              .text(s.text, { align: s.align || P.bodyAlign, lineGap: P.lineGap });
            doc.moveDown(0.6);
            break;
          case "clause":
            if (s.title) {
              doc.fillColor(NAVY).font(P.boldFont).fontSize(P.clauseTitleSize)
                .text(`${s.number}. ${s.title}`);
              doc.moveDown(0.15);
              doc.fillColor(INK).font(P.bodyFont).fontSize(P.bodySize)
                .text(s.text, { align: P.bodyAlign, lineGap: P.lineGap, indent: 14 });
            } else {
              doc.fillColor(INK).font(P.bodyFont).fontSize(P.bodySize)
                .text(`${s.number}. ${s.text}`, { align: P.bodyAlign, lineGap: P.lineGap });
            }
            doc.moveDown(0.55);
            break;
          case "list":
            doc.fillColor(INK).font(P.bodyFont).fontSize(P.bodySize);
            s.items.forEach((item, i) => {
              const bullet = s.ordered ? `${i + 1}.` : "•";
              doc.text(`${bullet}  ${item}`, { indent: 14, lineGap: P.lineGap - 1 });
            });
            doc.moveDown(0.4);
            break;
          case "party":
            doc.fillColor(GOLD).font(P.boldFont).fontSize(P.subtitleSize - 0.5)
              .text(s.role.toUpperCase(), { characterSpacing: 1.5 });
            doc.fillColor(NAVY).font(P.boldFont).fontSize(P.bodySize + 1).text(s.name);
            if (s.rep) doc.fillColor(MUTED).font(P.bodyFont).fontSize(P.bodySize - 1).text(`Represented by: ${s.rep}`);
            if (s.address) doc.fillColor(INK).font(P.bodyFont).fontSize(P.bodySize - 0.5).text(s.address, { lineGap: 1.5 });
            doc.moveDown(0.5);
            break;
          case "divider":
            doc.strokeColor(GOLD).lineWidth(0.5)
              .moveTo(doc.page.margins.left, doc.y + 4)
              .lineTo(doc.page.width - doc.page.margins.right, doc.y + 4).stroke();
            doc.moveDown(0.8);
            break;
          case "signatures":
            doc.moveDown(1.2);
            doc.fillColor(NAVY).font(P.boldFont).fontSize(P.bodySize).text("SIGNED AND DELIVERED");
            doc.moveDown(0.5);
            s.parties.forEach((p) => {
              doc.fillColor(INK).font(P.bodyFont).fontSize(P.bodySize - 1).text(`${p.role}:`).moveDown(1.8)
                .text("_______________________________").text(p.name).moveDown(0.5);
            });
            break;
          case "footer": break;
          case "spacer": doc.moveDown((s.height || 1) * 0.4); break;
          case "kv":
            doc.fillColor(INK).font(P.bodyFont).fontSize(P.bodySize - 0.5);
            for (const kv of s.pairs) {
              doc.text(`${kv.label}: `, { continued: true }).font(P.boldFont).text(kv.value).font(P.bodyFont);
            }
            doc.moveDown(0.4);
            break;
          case "table": {
            const startX = doc.page.margins.left;
            const contentWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
            const cw = s.widths && s.widths.length === s.headers.length
              ? s.widths.map((w) => (w / 100) * contentWidth)
              : new Array(s.headers.length).fill(contentWidth / s.headers.length);
            const drawRow = (cells: string[], bold: boolean, fill?: string) => {
              const startY = doc.y; let x = startX;
              const heights = cells.map((cell, i) => doc.heightOfString(cell, { width: cw[i] - 12, align: "left" }));
              const rowH = Math.max(...heights) + 10;
              if (fill) doc.rect(startX, startY, contentWidth, rowH).fill(fill).fillColor(NAVY);
              doc.y = startY; x = startX;
              cells.forEach((cell, i) => {
                doc.fillColor(bold ? NAVY : INK).font(bold ? P.boldFont : P.bodyFont).fontSize(P.bodySize - 1)
                  .text(cell, x + 6, startY + 5, { width: cw[i] - 12, align: "left", lineGap: 1 });
                x += cw[i];
              });
              doc.y = startY + rowH;
              doc.strokeColor("#e0e4ec").lineWidth(0.5).moveTo(startX, startY + rowH).lineTo(startX + contentWidth, startY + rowH).stroke();
            };
            drawRow(s.headers, true, "#faf8f3");
            s.rows.forEach((r) => drawRow(r, false));
            doc.moveDown(0.6);
            break;
          }
        }
      }

      // Footer with page numbers on every page
      const range = doc.bufferedPageRange();
      for (let i = 0; i < range.count; i++) {
        doc.switchToPage(range.start + i);
        const footerText = opts.footerText || "Generated by Lekha · elevana.guru";
        doc.fillColor(MUTED).font(P.bodyFont).fontSize(8)
          .text(`${footerText}   ·   Page ${i + 1} of ${range.count}`,
            doc.page.margins.left, doc.page.height - 40,
            { width: doc.page.width - doc.page.margins.left - doc.page.margins.right, align: "center" });
      }

      doc.end();
    } catch (e) { reject(e); }
  });
}
