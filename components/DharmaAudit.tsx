"use client";

import { useState } from "react";

const FRAMEWORKS: { id: string; label: string }[] = [
  { id: "dpdpa", label: "DPDP Act 2023 · India" },
  { id: "gdpr", label: "GDPR · EU" },
  { id: "iso27001", label: "ISO/IEC 27001:2022" },
];

type ControlFinding = {
  id: string;
  title: string;
  requirement: string;
  status: "met" | "partial" | "gap";
  matched: string[];
};

type FrameworkFinding = {
  id: string;
  name: string;
  authority: string;
  summary: string;
  score: number;
  counts: { met: number; partial: number; gap: number; total: number };
  controls: ControlFinding[];
};

type AuditResult = {
  characters: number;
  words: number;
  overallScore: number;
  frameworks: FrameworkFinding[];
};

const STATUS_META: Record<ControlFinding["status"], { label: string; color: string; bg: string }> = {
  met: { label: "Addressed", color: "#15803d", bg: "rgba(22,163,74,0.12)" },
  partial: { label: "Partial", color: "#b45309", bg: "rgba(201,168,76,0.16)" },
  gap: { label: "Gap", color: "#991b1b", bg: "rgba(220,38,38,0.10)" },
};

function scoreColor(score: number): string {
  if (score >= 75) return "#15803d";
  if (score >= 45) return "#b45309";
  return "#991b1b";
}

export default function DharmaAudit() {
  const [tab, setTab] = useState<"text" | "file">("text");
  const [text, setText] = useState("");
  const [picked, setPicked] = useState<string[]>(["dpdpa", "gdpr", "iso27001"]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const runText = async () => {
    setError(null);
    setResult(null);
    setBusy(true);
    try {
      const res = await fetch("/api/dharma/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, frameworks: picked }),
      });
      const j = await res.json();
      if (!res.ok) setError(j.error || "Audit failed");
      else setResult(j);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setBusy(false);
    }
  };

  const runFile = async () => {
    if (!file) return;
    setError(null);
    setResult(null);
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("frameworks", picked.join(","));
      const res = await fetch("/api/dharma/audit", { method: "POST", body: fd });
      const j = await res.json();
      if (!res.ok) setError(j.error || "Audit failed");
      else setResult(j);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setBusy(false);
    }
  };

  const chip = (active: boolean): React.CSSProperties => ({
    padding: "6px 12px",
    borderRadius: 999,
    border: `1px solid ${active ? "var(--navy-800)" : "var(--line)"}`,
    background: active ? "var(--navy-800)" : "#fff",
    color: active ? "#fff" : "var(--ink)",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    userSelect: "none",
  });

  const card: React.CSSProperties = {
    background: "#fff",
    border: "1px solid var(--line)",
    borderRadius: 14,
    padding: 28,
    marginBottom: 20,
  };

  return (
    <>
      <div style={card}>
        <h3 style={{ fontFamily: "var(--display)", fontSize: 18, margin: "0 0 14px", color: "var(--navy-900)" }}>
          Frameworks to audit against
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {FRAMEWORKS.map((f) => (
            <span key={f.id} style={chip(picked.includes(f.id))} onClick={() => toggle(f.id)}>
              {f.label}
            </span>
          ))}
        </div>
        <small style={{ display: "block", color: "var(--ink-muted)", fontSize: 12, marginTop: 12 }}>
          Dharma scans your policy text for evidence each obligation is addressed. It is a heuristic
          gap-finder to guide review — not a legal certification. Nothing is stored server-side.
        </small>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <span style={chip(tab === "text")} onClick={() => setTab("text")}>
          Paste text
        </span>
        <span style={chip(tab === "file")} onClick={() => setTab("file")}>
          Upload file (DOCX · TXT)
        </span>
      </div>

      {tab === "text" ? (
        <div style={card}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            Paste your privacy notice, DPA, or security policy
          </label>
          <textarea
            rows={12}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste the policy text you want to audit for compliance gaps."
            style={{ width: "100%", padding: "12px 14px", border: "1px solid var(--line)", borderRadius: 8, fontSize: 13, fontFamily: "ui-monospace, monospace", lineHeight: 1.5 }}
          />
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: 14 }}
            disabled={!text.trim() || picked.length === 0 || busy}
            onClick={runText}
          >
            {busy ? "Auditing…" : "Run audit"}
          </button>
        </div>
      ) : (
        <div style={card}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            Select a file
          </label>
          <input
            type="file"
            accept=".docx,.txt"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{ fontSize: 14 }}
          />
          <p style={{ color: "var(--ink-muted)", fontSize: 12, marginTop: 8 }}>
            DOCX and TXT are read directly. For PDFs, paste the text or convert to DOCX first.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: 14 }}
            disabled={!file || picked.length === 0 || busy}
            onClick={runFile}
          >
            {busy ? "Auditing…" : "Audit file"}
          </button>
        </div>
      )}

      {error && (
        <div style={{ background: "rgba(220,38,38,0.07)", border: "1px solid rgba(220,38,38,0.25)", color: "#991b1b", padding: "12px 16px", borderRadius: 10, marginTop: 12, fontSize: 14 }}>
          {error}
        </div>
      )}

      {result && (
        <>
          <div style={{ ...card, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 12, color: "var(--ink-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
                Overall coverage
              </div>
              <div style={{ fontFamily: "var(--display)", fontSize: 44, fontWeight: 700, color: scoreColor(result.overallScore), lineHeight: 1.1 }}>
                {result.overallScore}%
              </div>
            </div>
            <div style={{ color: "var(--ink-muted)", fontSize: 13 }}>
              {result.words.toLocaleString()} words analysed across {result.frameworks.length} framework
              {result.frameworks.length === 1 ? "" : "s"}.
            </div>
          </div>

          {result.frameworks.map((fw) => (
            <div key={fw.id} style={card}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 4 }}>
                <h3 style={{ fontFamily: "var(--display)", fontSize: 20, margin: 0, color: "var(--navy-900)" }}>
                  {fw.name}
                </h3>
                <span style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 700, color: scoreColor(fw.score) }}>
                  {fw.score}%
                </span>
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-muted)", marginBottom: 10 }}>{fw.authority}</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                <span style={{ padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: STATUS_META.met.bg, color: STATUS_META.met.color }}>
                  {fw.counts.met} addressed
                </span>
                <span style={{ padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: STATUS_META.partial.bg, color: STATUS_META.partial.color }}>
                  {fw.counts.partial} partial
                </span>
                <span style={{ padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: STATUS_META.gap.bg, color: STATUS_META.gap.color }}>
                  {fw.counts.gap} gaps
                </span>
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {fw.controls.map((c) => {
                  const m = STATUS_META[c.status];
                  return (
                    <div key={c.id} style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 12, alignItems: "start", padding: "10px 0", borderTop: "1px solid var(--line)" }}>
                      <span style={{ padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700, background: m.bg, color: m.color, justifySelf: "start" }}>
                        {m.label}
                      </span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>{c.title}</div>
                        <div style={{ fontSize: 13, color: "var(--ink-muted)", marginTop: 2 }}>{c.requirement}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
