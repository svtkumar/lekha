import {
  Document, Packer, Paragraph, TextRun, AlignmentType, Footer, PageNumber, Header,
  BorderStyle, Table, TableRow, TableCell, WidthType, convertInchesToTwip, ShadingType,
} from "docx";
import type { DocSection, StyleProfile } from "../templates/types";

const NAVY = "0a2f6e", GOLD = "c9a84c", INK = "17243d", MUTED = "4a566e", CREAM = "faf8f3";

/**
 * Profile-aware DOCX rendering.
 * Sizes are in half-points (docx convention): 24 = 12pt, 22 = 11pt.
 * Line spacing values are in twentieths of a point (twips × 20).
 *  - legal: Times New Roman 12pt, 1.5 spacing (360), 1" margins (1440 twips)
 *  - corporate: Calibri 11pt, 1.15 spacing (276), 1" margins
 *  - slip: Calibri 10pt, 1.0 spacing (240), 0.5" margins
 */
const PROFILES: Record<StyleProfile, {
  font: string; bodyHP: number; titleHP: number; subtitleHP: number; clauseTitleHP: number;
  lineSpacing: number; marginTwip: number; bodyAlign: (typeof AlignmentType)[keyof typeof AlignmentType];
}> = {
  legal: {
    font: "Times New Roman", bodyHP: 24, titleHP: 36, subtitleHP: 20, clauseTitleHP: 25,
    lineSpacing: 360, marginTwip: 1440, bodyAlign: AlignmentType.JUSTIFIED,
  },
  corporate: {
    font: "Calibri", bodyHP: 22, titleHP: 32, subtitleHP: 20, clauseTitleHP: 23,
    lineSpacing: 276, marginTwip: 1440, bodyAlign: AlignmentType.LEFT,
  },
  slip: {
    font: "Calibri", bodyHP: 20, titleHP: 28, subtitleHP: 18, clauseTitleHP: 21,
    lineSpacing: 240, marginTwip: 720, bodyAlign: AlignmentType.LEFT,
  },
};

export async function renderDocx(
  sections: DocSection[],
  opts: { title?: string; author?: string; footerText?: string; profile?: StyleProfile } = {}
): Promise<Buffer> {
  const profile = opts.profile || "legal";
  const P = PROFILES[profile];
  const children: Paragraph[] = [];
  const t = (text: string, size = P.bodyHP, color = INK, bold = false) =>
    new TextRun({ text, color, size, bold, font: P.font });

  for (const s of sections) {
    switch (s.kind) {
      case "title":
        children.push(new Paragraph({
          children: [t(s.text.toUpperCase(), P.titleHP, NAVY, true)],
          alignment: AlignmentType.CENTER, spacing: { after: 200, before: 200 },
        }));
        children.push(new Paragraph({
          children: [t("— — — — —", P.subtitleHP + 4, GOLD)],
          alignment: AlignmentType.CENTER, spacing: { after: 300 },
        }));
        break;
      case "subtitle":
        children.push(new Paragraph({
          children: [t(s.text.toUpperCase(), P.subtitleHP, MUTED)],
          alignment: AlignmentType.CENTER, spacing: { after: 240 },
        }));
        break;
      case "para":
        children.push(new Paragraph({
          children: [t(s.text)],
          alignment: s.align === "center" ? AlignmentType.CENTER
                    : s.align === "right" ? AlignmentType.RIGHT
                    : s.align === "left" ? AlignmentType.LEFT
                    : P.bodyAlign,
          spacing: { after: 180, line: P.lineSpacing },
        }));
        break;
      case "clause":
        if (s.title) {
          children.push(new Paragraph({
            children: [t(`${s.number}. ${s.title}`, P.clauseTitleHP, NAVY, true)],
            spacing: { after: 80, before: 160 },
          }));
          children.push(new Paragraph({
            children: [t(s.text)],
            alignment: P.bodyAlign,
            indent: { left: convertInchesToTwip(0.2) },
            spacing: { after: 180, line: P.lineSpacing },
          }));
        } else {
          children.push(new Paragraph({
            children: [
              t(`${s.number}. `, P.bodyHP, NAVY, true),
              t(s.text),
            ],
            alignment: P.bodyAlign,
            spacing: { after: 180, line: P.lineSpacing },
          }));
        }
        break;
      case "list":
        s.items.forEach((item, i) => {
          children.push(new Paragraph({
            children: [
              t(s.ordered ? `${i + 1}.  ` : "•  ", P.bodyHP, GOLD, true),
              t(item),
            ],
            indent: { left: convertInchesToTwip(0.25) },
            spacing: { after: 80, line: Math.max(P.lineSpacing - 60, 240) },
          }));
        });
        children.push(new Paragraph({ children: [], spacing: { after: 160 } }));
        break;
      case "party":
        children.push(new Paragraph({
          children: [t(s.role.toUpperCase(), P.subtitleHP - 2, GOLD, true)],
          spacing: { after: 40, before: 120 },
        }));
        children.push(new Paragraph({
          children: [t(s.name, P.bodyHP + 2, NAVY, true)],
          spacing: { after: 40 },
        }));
        if (s.rep) children.push(new Paragraph({
          children: [t(`Represented by: ${s.rep}`, P.bodyHP - 2, MUTED)],
          spacing: { after: 40 },
        }));
        if (s.address) children.push(new Paragraph({
          children: [t(s.address, P.bodyHP - 1)],
          spacing: { after: 160 },
        }));
        break;
      case "divider":
        children.push(new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD } },
          spacing: { after: 200, before: 100 },
        }));
        break;
      case "signatures":
        children.push(new Paragraph({
          children: [t("SIGNED AND DELIVERED", P.bodyHP, NAVY, true)],
          spacing: { before: 400, after: 200 },
        }));
        s.parties.forEach((p) => {
          children.push(new Paragraph({ children: [t(`${p.role}:`, P.bodyHP - 1)], spacing: { after: 100 } }));
          children.push(new Paragraph({ children: [t("_______________________________", P.bodyHP, MUTED)], spacing: { after: 40 } }));
          children.push(new Paragraph({ children: [t(p.name, P.bodyHP - 1, NAVY, true)], spacing: { after: 240 } }));
        });
        break;
      case "spacer":
        children.push(new Paragraph({ children: [], spacing: { after: (s.height || 1) * 160 } }));
        break;
      case "kv":
        for (const kv of s.pairs) {
          children.push(new Paragraph({
            children: [t(`${kv.label}: `, P.bodyHP - 1, MUTED), t(kv.value, P.bodyHP - 1, INK, true)],
            spacing: { after: 80 },
          }));
        }
        children.push(new Paragraph({ children: [], spacing: { after: 100 } }));
        break;
      case "table":
        children.push(new Paragraph({ children: [], spacing: { after: 100 } }));
        {
          const rowCells = (cells: string[], header: boolean) =>
            new TableRow({
              tableHeader: header,
              children: cells.map((c) =>
                new TableCell({
                  shading: header ? { type: ShadingType.CLEAR, color: "auto", fill: CREAM } : undefined,
                  children: [new Paragraph({
                    children: [t(c, P.bodyHP - 2, header ? NAVY : INK, header)],
                  })],
                })),
            });
          const rows: TableRow[] = [rowCells(s.headers, true), ...s.rows.map((r) => rowCells(r, false))];
          (children as unknown as (Paragraph | Table)[]).push(new Table({
            rows, width: { size: 100, type: WidthType.PERCENTAGE },
          }));
          children.push(new Paragraph({ children: [], spacing: { after: 200 } }));
        }
        break;
      case "footer": break;
    }
  }

  const footerText = opts.footerText || "Generated by Lekha · elevana.guru";
  const doc = new Document({
    creator: opts.author || "Lekha", title: opts.title, description: "Document generated by Lekha",
    styles: { default: { document: { run: { font: P.font, size: P.bodyHP } } } },
    sections: [{
      properties: {
        page: { margin: { top: P.marginTwip, bottom: P.marginTwip + 240, left: P.marginTwip, right: P.marginTwip } },
      },
      headers: { default: new Header({ children: [new Paragraph({ children: [] })] }) },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: `${footerText}   ·   Page `, color: MUTED, size: 16, font: P.font }),
              new TextRun({ children: [PageNumber.CURRENT], color: MUTED, size: 16, font: P.font }),
              new TextRun({ text: " of ", color: MUTED, size: 16, font: P.font }),
              new TextRun({ children: [PageNumber.TOTAL_PAGES], color: MUTED, size: 16, font: P.font }),
            ],
          })],
        }),
      },
      children: children as unknown as (Paragraph | Table)[],
    }],
  });

  return Packer.toBuffer(doc);
}
