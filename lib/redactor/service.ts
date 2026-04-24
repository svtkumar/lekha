import { packs, type Pattern, type RedactionMode } from "./patterns";

export type RedactionHit = {
  pattern: string;
  label: string;
  start: number;
  end: number;
  original: string;
  replacement: string;
};

export type RedactOptions = {
  countries?: string[]; // codes to include, e.g. ["IN","US"]. Universal is always applied.
  mode?: RedactionMode; // default replacement mode if pattern doesn't specify one
  /** When true, names heuristically detected via NER-like rules are also redacted. */
  includeNameHeuristic?: boolean;
  /** Custom words/phrases to always redact (e.g. specific client names). */
  customTerms?: string[];
};

export type RedactionResult = {
  redactedText: string;
  hits: RedactionHit[];
  summary: Record<string, number>; // counts per pattern id
};

export function redactText(text: string, opts: RedactOptions = {}): RedactionResult {
  const countries = opts.countries && opts.countries.length > 0 ? opts.countries : ["IN"];
  const mode = opts.mode || "label";

  // Country packs first (most specific), universal last (fallback only)
  const active: Pattern[] = [];
  for (const c of countries) {
    const pack = packs[c];
    if (pack) active.push(...pack.patterns);
  }
  active.push(...packs.universal.patterns);

  // Collect all hits first (non-overlapping, preferring higher-signal labels)
  const hits: RedactionHit[] = [];
  for (const p of active) {
    const re = new RegExp(p.regex.source, p.regex.flags.includes("g") ? p.regex.flags : p.regex.flags + "g");
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      if (p.validate && !p.validate(m[0])) continue;
      // skip if already covered by a prior hit
      const overlap = hits.some(
        (h) =>
          (m!.index >= h.start && m!.index < h.end) ||
          (m!.index + m![0].length > h.start && m!.index + m![0].length <= h.end)
      );
      if (overlap) continue;
      hits.push({
        pattern: p.id,
        label: p.label,
        start: m.index,
        end: m.index + m[0].length,
        original: m[0],
        replacement: applyMode(m[0], p.replaceWith || mode, p.label),
      });
    }
  }

  // Custom terms (case-insensitive whole-word match)
  if (opts.customTerms && opts.customTerms.length) {
    for (const term of opts.customTerms) {
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(`\\b${escaped}\\b`, "gi");
      let m: RegExpExecArray | null;
      while ((m = re.exec(text))) {
        const overlap = hits.some(
          (h) =>
            (m!.index >= h.start && m!.index < h.end) ||
            (m!.index + m![0].length > h.start && m!.index + m![0].length <= h.end)
        );
        if (overlap) continue;
        hits.push({
          pattern: "custom",
          label: "Custom term",
          start: m.index,
          end: m.index + m[0].length,
          original: m[0],
          replacement: applyMode(m[0], mode, "CUSTOM"),
        });
      }
    }
  }

  // Name heuristic (titles + 2-3 title-case words)
  if (opts.includeNameHeuristic) {
    const nameRe =
      /\b(?:Mr|Mrs|Ms|Miss|Dr|Shri|Smt|Sri|Prof)\.? [A-Z][a-z']+(?:[ \-][A-Z][a-z']+){0,2}\b/g;
    let m: RegExpExecArray | null;
    while ((m = nameRe.exec(text))) {
      const overlap = hits.some(
        (h) =>
          (m!.index >= h.start && m!.index < h.end) ||
          (m!.index + m![0].length > h.start && m!.index + m![0].length <= h.end)
      );
      if (overlap) continue;
      hits.push({
        pattern: "name",
        label: "Person name",
        start: m.index,
        end: m.index + m[0].length,
        original: m[0],
        replacement: applyMode(m[0], mode, "NAME"),
      });
    }
  }

  // Sort hits by position and splice into text
  hits.sort((a, b) => a.start - b.start);
  let out = "";
  let cursor = 0;
  for (const h of hits) {
    out += text.slice(cursor, h.start);
    out += h.replacement;
    cursor = h.end;
  }
  out += text.slice(cursor);

  const summary: Record<string, number> = {};
  for (const h of hits) summary[h.pattern] = (summary[h.pattern] || 0) + 1;

  return { redactedText: out, hits, summary };
}

function applyMode(original: string, mode: RedactionMode, label: string): string {
  switch (mode) {
    case "black":
      return "█".repeat(Math.max(3, original.replace(/\s/g, "").length));
    case "mask": {
      const d = original.replace(/[^A-Za-z0-9]/g, "");
      if (d.length <= 4) return "****";
      return "•".repeat(d.length - 4) + d.slice(-4);
    }
    case "label":
    default:
      return `[REDACTED-${label.toUpperCase().replace(/[^A-Z]/g, "")}]`;
  }
}
