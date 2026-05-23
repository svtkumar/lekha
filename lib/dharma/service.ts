/**
 * Dharma — compliance gap-audit engine.
 *
 * Given a policy/notice document's text, score it against one or more
 * frameworks by checking for positive "signals" of each control. Output is a
 * per-control status (met / partial / gap), a weighted score, and a list of
 * recommended actions for the gaps. Heuristic only — surfaces what to review.
 */

import { frameworks as ALL, frameworkById, type Control, type Framework } from "./frameworks";

export type ControlStatus = "met" | "partial" | "gap";

export type ControlFinding = {
  id: string;
  title: string;
  requirement: string;
  status: ControlStatus;
  matched: string[];
};

export type FrameworkFinding = {
  id: string;
  name: string;
  authority: string;
  summary: string;
  score: number; // 0–100, weighted
  counts: { met: number; partial: number; gap: number; total: number };
  controls: ControlFinding[];
};

export type AuditResult = {
  characters: number;
  words: number;
  overallScore: number; // mean of framework scores
  frameworks: FrameworkFinding[];
};

export type AuditOptions = {
  /** framework ids to score against; defaults to all */
  frameworks?: string[];
};

function evaluateControl(text: string, c: Control): ControlFinding {
  const matched: string[] = [];
  for (const s of c.signals) {
    if (text.includes(s)) matched.push(s);
  }
  const distinct = matched.length;
  // Conservative: 2+ distinct signals = met, exactly 1 = partial, 0 = gap.
  const status: ControlStatus = distinct >= 2 ? "met" : distinct === 1 ? "partial" : "gap";
  return { id: c.id, title: c.title, requirement: c.requirement, status, matched };
}

function scoreFramework(text: string, fw: Framework): FrameworkFinding {
  const controls = fw.controls.map((c) => evaluateControl(text, c));
  let earned = 0;
  let possible = 0;
  const counts = { met: 0, partial: 0, gap: 0, total: controls.length };
  controls.forEach((cf, i) => {
    const w = fw.controls[i].weight ?? 1;
    possible += w;
    if (cf.status === "met") {
      earned += w;
      counts.met++;
    } else if (cf.status === "partial") {
      earned += w * 0.5;
      counts.partial++;
    } else {
      counts.gap++;
    }
  });
  const score = possible > 0 ? Math.round((earned / possible) * 100) : 0;
  return {
    id: fw.id,
    name: fw.name,
    authority: fw.authority,
    summary: fw.summary,
    score,
    counts,
    controls,
  };
}

export function auditText(input: string, opts: AuditOptions = {}): AuditResult {
  const text = (input || "").toLowerCase();
  const ids = opts.frameworks && opts.frameworks.length > 0 ? opts.frameworks : ALL.map((f) => f.id);
  const selected = ids
    .map((id) => frameworkById(id))
    .filter((f): f is Framework => Boolean(f));

  const findings = selected.map((fw) => scoreFramework(text, fw));
  const overallScore =
    findings.length > 0
      ? Math.round(findings.reduce((a, f) => a + f.score, 0) / findings.length)
      : 0;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return {
    characters: input ? input.length : 0,
    words,
    overallScore,
    frameworks: findings,
  };
}
