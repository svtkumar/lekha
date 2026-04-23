import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
  Footer,
  PageNumber,
  Header,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  LevelFormat,
  convertInchesToTwip,
  ShadingType,
} from "docx";
import type { DocSection } from "../templates/types";

const NAVY = "0a2f6e";
const GOLD = "c9a84c";
const INK = "17243d";
const MUTED = "4a566e";
const CREAM = "faf8f3";

export async function renderDocx(
  sections: DocSection[],
  opts: { title?: string; author?: string; footerText?: string } = {}
): Promise<Buffer> {
  const children: Paragraph[] = [];

  for (const s of sections) {
    switch (s.kind) {
      case "title":
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: s.text.toUpperCase(),
                bold: true,
                color: NAVY,
                size: 36, // 18pt
                characterSpacing: 30,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200, before: 200 },
          })
        );
        // gold rule via underline paragraph
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: "\u2014\u2014\u2014\u2014\u2014",
                color: GOLD,
                size: 28,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
          })
        );
        break;
      case "subtitle":
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: s.text.toUpperCase(),
                color: MUTED,
                size: 20,
                characterSpacing: 40,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 },
          })
        );
        break;
      case "para":
        children.push(
          new Paragraph({
            children: [new TextRun({ text: s.text, color: INK, size: 22 })],
            alignment:
              s.align === "center"
                ? AlignmentType.CENTER
                : s.align === "right"
                  ? AlignmentType.RIGHT
                  : AlignmentType.JUSTIFIED,
            spacing: { after: 180, line: 340 },
          })
        );
        break;
      case "clause":
        if (s.title) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `${s.number}. ${s.title}`,
                  bold: true,
                  color: NAVY,
                  size: 23,
                }),
              ],
              spacing: { after: 80, before: 160 },
            })
          );
          children.push(
            new Paragraph({
              children: [new TextRun({ text: s.text, color: INK, size: 22 })],
              alignment: AlignmentType.JUSTIFIED,
              indent: { left: convertInchesToTwip(0.2) },
              spacing: { after: 180, line: 340 },
            })
          );
        } else {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: `${s.number}. `, bold: true, color: NAVY, size: 22 }),
                new TextRun({ text: s.text, color: INK, size: 22 }),
              ],
              alignment: AlignmentType.JUSTIFIED,
              spacing: { after: 180, line: 340 },
            })
          );
        }
        break;
      case "list":
        s.items.forEach((item, i) => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: s.ordered ? `${i + 1}.  ` : "•  ",
                  color: GOLD,
                  bold: true,
                  size: 22,
                }),
                new TextRun({ text: item, color: INK, size: 22 }),
              ],
              indent: { left: convertInchesToTwip(0.25) },
              spacing: { after: 80, line: 300 },
            })
          );
        });
        children.push(new Paragraph({ children: [], spacing: { after: 160 } }));
        break;
      case "party":
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: s.role.toUpperCase(),
                color: GOLD,
                bold: true,
                size: 18,
                characterSpacing: 30,
              }),
            ],
            spacing: { after: 40, before: 120 },
          })
        );
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: s.name, bold: true, color: NAVY, size: 24 }),
            ],
            spacing: { after: 40 },
          })
        );
        if (s.rep) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `Represented by: ${s.rep}`,
                  color: MUTED,
                  size: 20,
                }),
              ],
              spacing: { after: 40 },
            })
          );
        }
        if (s.address) {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: s.address, color: INK, size: 21 })],
              spacing: { after: 160 },
            })
          );
        }
        break;
      case "divider":
        children.push(
          new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD } },
            spacing: { after: 200, before: 100 },
          })
        );
        break;
      case "signatures":
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: "SIGNED AND DELIVERED",
                bold: true,
                color: NAVY,
                size: 22,
              }),
            ],
            spacing: { before: 400, after: 200 },
          })
        );
        s.parties.forEach((p) => {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: `${p.role}:`, color: INK, size: 21 })],
              spacing: { after: 100 },
            })
          );
          children.push(
            new Paragraph({
              children: [new TextRun({ text: "_______________________________", color: MUTED, size: 22 })],
              spacing: { after: 40 },
            })
          );
          children.push(
            new Paragraph({
              children: [new TextRun({ text: p.name, bold: true, color: NAVY, size: 21 })],
              spacing: { after: 240 },
            })
          );
        });
        break;
      case "spacer":
        children.push(
          new Paragraph({
            children: [],
            spacing: { after: (s.height || 1) * 160 },
          })
        );
        break;
      case "kv":
        for (const kv of s.pairs) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: `${kv.label}: `, color: MUTED, size: 21 }),
                new TextRun({ text: kv.value, color: INK, bold: true, size: 21 }),
              ],
              spacing: { after: 80 },
            })
          );
        }
        children.push(new Paragraph({ children: [], spacing: { after: 100 } }));
        break;
      case "table":
        children.push(
          new Paragraph({ children: [], spacing: { after: 100 } })
        );
        {
          const rowCells = (cells: string[], header: boolean) =>
            new TableRow({
              tableHeader: header,
              children: cells.map(
                (c) =>
                  new TableCell({
                    shading: header
                      ? { type: ShadingType.CLEAR, color: "auto", fill: CREAM }
                      : undefined,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: c,
                            color: header ? NAVY : INK,
                            bold: header,
                            size: 20,
                          }),
                        ],
                      }),
                    ],
                    width:
                      s.widths && s.widths[cells.indexOf(c)]
                        ? { size: s.widths[cells.indexOf(c)] * 50, type: WidthType.DXA }
                        : undefined,
                  })
              ),
            });
          const rows: TableRow[] = [rowCells(s.headers, true), ...s.rows.map((r) => rowCells(r, false))];
          // tables need to be children of Document, not a paragraph -> cheat by serializing after
          // docx lib allows: children: (Paragraph | Table)[]
          (children as unknown as (Paragraph | Table)[]).push(
            new Table({
              rows,
              width: { size: 100, type: WidthType.PERCENTAGE },
            })
          );
          children.push(new Paragraph({ children: [], spacing: { after: 200 } }));
        }
        break;
      case "footer":
        break;
    }
  }

  const footerText = opts.footerText || "Generated by Lekha · elevana.guru";

  const doc = new Document({
    creator: opts.author || "Lekha",
    title: opts.title,
    description: "Document generated by Lekha",
    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: 22 },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1000, bottom: 1200, left: 1000, right: 1000 },
          },
        },
        headers: {
          default: new Header({
            children: [new Paragraph({ children: [] })],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `${footerText}   ·   Page `,
                    color: MUTED,
                    size: 16,
                  }),
                  new TextRun({ children: [PageNumber.CURRENT], color: MUTED, size: 16 }),
                  new TextRun({ text: " of ", color: MUTED, size: 16 }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], color: MUTED, size: 16 }),
                ],
              }),
            ],
          }),
        },
        children: children as unknown as (Paragraph | Table)[],
      },
    ],
  });

  return Packer.toBuffer(doc);
}
