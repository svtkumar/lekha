import ExcelJS from "exceljs";
import type { DocSection } from "../templates/types";

const NAVY = "FF0A2F6E";
const GOLD = "FFC9A84C";
const GOLD_LIGHT = "FFFAF8F3";
const INK = "FF17243D";
const MUTED = "FF4A566E";

/**
 * Renders the DocSection IR into XLSX.
 * XLSX is grid-oriented, so we map each section into rows.
 * - title → large merged header row
 * - party, kv, table → natural structured rows
 * - clause/para → wrapped text rows (less ideal; XLSX is best for templates with tables)
 */
export async function renderXlsx(
  sections: DocSection[],
  opts: { title?: string; author?: string; sheetName?: string } = {}
): Promise<Buffer> {
  const wb = new ExcelJS.Workbook();
  wb.creator = opts.author || "Lekha";
  wb.title = opts.title;

  const ws = wb.addWorksheet(opts.sheetName || "Document", {
    pageSetup: { paperSize: 9, orientation: "portrait", fitToPage: true },
  });

  // Base columns
  ws.columns = [
    { width: 30 },
    { width: 30 },
    { width: 30 },
    { width: 30 },
  ];

  const titleStyle: Partial<ExcelJS.Style> = {
    font: { name: "Calibri", size: 16, bold: true, color: { argb: NAVY } },
    alignment: { horizontal: "center", vertical: "middle" },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: GOLD_LIGHT } },
  };

  let row = 1;

  for (const s of sections) {
    switch (s.kind) {
      case "title": {
        ws.mergeCells(row, 1, row, 4);
        const c = ws.getCell(row, 1);
        c.value = s.text;
        c.style = titleStyle;
        ws.getRow(row).height = 34;
        row++;
        // gold rule
        ws.mergeCells(row, 1, row, 4);
        ws.getCell(row, 1).border = { bottom: { style: "medium", color: { argb: GOLD } } };
        row++;
        row++;
        break;
      }
      case "subtitle": {
        ws.mergeCells(row, 1, row, 4);
        const c = ws.getCell(row, 1);
        c.value = s.text;
        c.style = {
          font: { name: "Calibri", size: 10, color: { argb: MUTED } },
          alignment: { horizontal: "center" },
        };
        row++;
        break;
      }
      case "para": {
        ws.mergeCells(row, 1, row, 4);
        const c = ws.getCell(row, 1);
        c.value = s.text;
        c.alignment = { wrapText: true, vertical: "top", horizontal: "left" };
        c.font = { name: "Calibri", size: 11, color: { argb: INK } };
        ws.getRow(row).height = Math.max(20, Math.ceil(s.text.length / 90) * 16);
        row += 2;
        break;
      }
      case "clause": {
        const c = ws.getCell(row, 1);
        c.value = `${s.number}.${s.title ? " " + s.title : ""}`;
        c.font = { name: "Calibri", size: 11, bold: true, color: { argb: NAVY } };
        ws.mergeCells(row, 1, row, 4);
        row++;
        ws.mergeCells(row, 1, row, 4);
        const c2 = ws.getCell(row, 1);
        c2.value = s.text;
        c2.alignment = { wrapText: true, vertical: "top" };
        c2.font = { name: "Calibri", size: 11, color: { argb: INK } };
        ws.getRow(row).height = Math.max(22, Math.ceil(s.text.length / 90) * 16);
        row += 2;
        break;
      }
      case "party": {
        const c = ws.getCell(row, 1);
        c.value = s.role.toUpperCase();
        c.font = { name: "Calibri", size: 9, bold: true, color: { argb: GOLD } };
        ws.mergeCells(row, 1, row, 4);
        row++;
        ws.getCell(row, 1).value = s.name;
        ws.getCell(row, 1).font = { name: "Calibri", size: 12, bold: true, color: { argb: NAVY } };
        ws.mergeCells(row, 1, row, 4);
        row++;
        if (s.rep) {
          ws.getCell(row, 1).value = `Represented by: ${s.rep}`;
          ws.getCell(row, 1).font = { name: "Calibri", size: 10, color: { argb: MUTED } };
          ws.mergeCells(row, 1, row, 4);
          row++;
        }
        if (s.address) {
          ws.getCell(row, 1).value = s.address;
          ws.getCell(row, 1).font = { name: "Calibri", size: 10, color: { argb: INK } };
          ws.mergeCells(row, 1, row, 4);
          row += 2;
        } else {
          row++;
        }
        break;
      }
      case "kv": {
        for (const kv of s.pairs) {
          ws.getCell(row, 1).value = kv.label;
          ws.getCell(row, 1).font = { name: "Calibri", size: 10, color: { argb: MUTED } };
          ws.mergeCells(row, 2, row, 4);
          ws.getCell(row, 2).value = kv.value;
          ws.getCell(row, 2).font = { name: "Calibri", size: 11, bold: true, color: { argb: INK } };
          row++;
        }
        row++;
        break;
      }
      case "table": {
        const widths = s.widths && s.widths.length === s.headers.length ? s.widths : undefined;
        if (widths) {
          widths.forEach((w, i) => {
            ws.getColumn(i + 1).width = (w / 100) * 100;
          });
        }
        // Header row
        s.headers.forEach((h, i) => {
          const cell = ws.getCell(row, i + 1);
          cell.value = h;
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: GOLD_LIGHT } };
          cell.font = { name: "Calibri", size: 10, bold: true, color: { argb: NAVY } };
          cell.alignment = { vertical: "middle", wrapText: true };
          cell.border = {
            top: { style: "thin", color: { argb: "FFE0E4EC" } },
            left: { style: "thin", color: { argb: "FFE0E4EC" } },
            right: { style: "thin", color: { argb: "FFE0E4EC" } },
            bottom: { style: "thin", color: { argb: "FFE0E4EC" } },
          };
        });
        ws.getRow(row).height = 22;
        row++;
        // Data rows
        for (const r of s.rows) {
          r.forEach((v, i) => {
            const cell = ws.getCell(row, i + 1);
            cell.value = isFinite(Number(v)) && v.trim() !== "" ? Number(v) : v;
            cell.font = { name: "Calibri", size: 10, color: { argb: INK } };
            cell.alignment = { vertical: "top", wrapText: true };
            cell.border = {
              top: { style: "thin", color: { argb: "FFE0E4EC" } },
              left: { style: "thin", color: { argb: "FFE0E4EC" } },
              right: { style: "thin", color: { argb: "FFE0E4EC" } },
              bottom: { style: "thin", color: { argb: "FFE0E4EC" } },
            };
          });
          row++;
        }
        row += 1;
        break;
      }
      case "list": {
        s.items.forEach((item, i) => {
          const bullet = s.ordered ? `${i + 1}.` : "•";
          ws.mergeCells(row, 1, row, 4);
          ws.getCell(row, 1).value = `${bullet}  ${item}`;
          ws.getCell(row, 1).alignment = { wrapText: true };
          ws.getCell(row, 1).font = { name: "Calibri", size: 11, color: { argb: INK } };
          row++;
        });
        row++;
        break;
      }
      case "signatures": {
        row++;
        ws.mergeCells(row, 1, row, 4);
        ws.getCell(row, 1).value = "SIGNED AND DELIVERED";
        ws.getCell(row, 1).font = { name: "Calibri", size: 11, bold: true, color: { argb: NAVY } };
        row++;
        s.parties.forEach((p) => {
          ws.getCell(row, 1).value = `${p.role}:`;
          ws.getCell(row, 1).font = { name: "Calibri", size: 10, color: { argb: INK } };
          row++;
          row++;
          ws.getCell(row, 1).value = "_____________________________";
          row++;
          ws.getCell(row, 1).value = p.name;
          ws.getCell(row, 1).font = { name: "Calibri", size: 10, bold: true, color: { argb: NAVY } };
          row += 2;
        });
        break;
      }
      case "divider":
        ws.mergeCells(row, 1, row, 4);
        ws.getCell(row, 1).border = { bottom: { style: "medium", color: { argb: GOLD } } };
        row++;
        break;
      case "spacer":
        row += s.height || 1;
        break;
      case "footer":
        break;
    }
  }

  return (await wb.xlsx.writeBuffer()) as unknown as Buffer;
}
