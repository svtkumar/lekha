import type { DocSection, OutputFormat } from "../templates/types";
import { renderPdf } from "./pdf";
import { renderDocx } from "./docx";
import { renderXlsx } from "./xlsx";

export { renderPdf, renderDocx, renderXlsx };

export const mimeFor = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
} as const;

export async function renderFormat(
  format: OutputFormat,
  sections: DocSection[],
  opts: { title?: string; author?: string; footerText?: string; sheetName?: string } = {}
): Promise<Buffer> {
  if (format === "pdf") return renderPdf(sections, opts);
  if (format === "docx") return renderDocx(sections, opts);
  return renderXlsx(sections, opts);
}
