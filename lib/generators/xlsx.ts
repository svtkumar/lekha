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
  wb.title = opts.title || "";

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
      case "cover": {
        ws.mergeCells(row, 1, row, 4);
        const ct = ws.getCell(row, 1);
        ct.value = s.title;
        ct.style = titleStyle;
        ws.getRow(row).height = 34;
        row++;
        ws.mergeCells(row, 1, row, 4);
        const cs = ws.getCell(row, 1);
        cs.value = s.subtitle;
        cs.style = {
          font: { name: "Calibri", size: 10, color: { argb: MUTED } },
          alignment: { horizontal: "center" },
        };
        row += 2;
        for (const item of s.summary) {
          ws.getCell(row, 1).value = item.label;
          ws.getCell(row, 1).font = { name: "Calibri", size: 10, color: { argb: MUTED } };
          ws.mergeCells(row, 2, row, 4);
          ws.getCell(row, 2).value = item.value;
          ws.getCell(row, 2).font = { name: "Calibri", size: 11, bold: true, color: { argb: INK } };
          row++;
        }
        row++;
        ws.mergeCells(row, 1, row, 4);
        ws.getCell(row, 1).border = { bottom: { style: "medium", color: { argb: GOLD } } };
        row += 2;
        break;
      }
      case "info": {
        ws.mergeCells(row, 1, row, 4);
        const it = ws.getCell(row, 1);
        it.value = s.title;
        it.fill = { type: "pattern", pattern: "solid", fgColor: { argb: GOLD_LIGHT } };
        it.font = { name: "Calibri", size: 11, bold: true, color: { argb: NAVY } };
        row++;
        for (const a of s.acts) {
          ws.mergeCells(row, 1, row, 4);
          const ac = ws.getCell(row, 1);
          ac.value = `\u2022  ${a}`;
          ac.alignment = { wrapText: true, vertical: "top" };
          ac.font = { name: "Calibri", size: 10, color: { argb: INK } };
          ac.fill = { type: "pattern", pattern: "solid", fgColor: { argb: GOLD_LIGHT } };
          row++;
        }
        if (s.text) {
          ws.mergeCells(row, 1, row, 4);
          const tx = ws.getCell(row, 1);
          tx.value = s.text;
          tx.alignment = { wrapText: true, vertical: "top" };
          tx.font = { name: "Calibri", size: 10, italic: true, color: { argb: MUTED } };
          tx.fill = { type: "pattern", pattern: "solid", fgColor: { argb: GOLD_LIGHT } };
          ws.getRow(row).height = Math.max(20, Math.ceil(s.text.length / 90) * 16);
          row++;
        }
        row += 2;
        break;
      }
      case "page_break": {
        ws.getRow(row).addPageBreak();
        row += 1;
        break;
      }
      case "annex_signoff": {
        ws.mergeCells(row, 1, row, 4);
        ws.getCell(row, 1).border = { bottom: { style: "medium", color: { argb: GOLD } } };
        row++;
        ws.mergeCells(row, 1, row, 4);
        const as = ws.getCell(row, 1);
        as.value = "Executed and signed by the parties as set out above.";
        as.alignment = { horizontal: "center" };
        as.font = { name: "Calibri", size: 10, italic: true, color: { argb: MUTED } };
        row += 2;
        break;
      }
      case "stamp_page": {
        ws.getRow(row).addPageBreak();
        row++;
        ws.mergeCells(row, 1, row, 4);
        const sh = ws.getCell(row, 1);
        sh.value = "STAMP DUTY & REGISTRATION";
        sh.style = titleStyle;
        ws.getRow(row).height = 30;
        row += 2;
        ([
          ["Jurisdiction", s.jurisdiction],
          ["Stamp value", s.stampValue],
          ["Execution", s.instruction],
        ] as [string, string][]).forEach(([label, value]) => {
          ws.getCell(row, 1).value = label;
          ws.getCell(row, 1).font = { name: "Calibri", size: 10, bold: true, color: { argb: GOLD } };
          ws.mergeCells(row, 2, row, 4);
          const vc = ws.getCell(row, 2);
          vc.value = value;
          vc.alignment = { wrapText: true, vertical: "top" };
          vc.font = { name: "Calibri", size: 11, color: { argb: INK } };
          ws.getRow(row).height = Math.max(20, Math.ceil(value.length / 70) * 16);
          row++;
        });
        row++;
        ws.mergeCells(row, 1, row, 4);
        const rn = ws.getCell(row, 1);
        rn.value = s.registrationNote;
        rn.alignment = { wrapText: true, vertical: "top" };
        rn.font = { name: "Calibri", size: 10, bold: true, color: { argb: NAVY } };
        rn.fill = { type: "pattern", pattern: "solid", fgColor: { argb: GOLD_LIGHT } };
        ws.getRow(row).height = Math.max(24, Math.ceil(s.registrationNote.length / 90) * 16);
        row += 2;
        break;
      }
      case "footer":
        break;
    }
  }

  return (await wb.xlsx.writeBuffer()) as unknown as Buffer;
}
