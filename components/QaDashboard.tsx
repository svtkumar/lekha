"use client";

import { useState } from "react";

type Report = {
  elapsed_ms: number;
  summary: {
    templates_total: number;
    templates_ok: number;
    templates_fail: number;
    redactor_total: number;
    redactor_ok: number;
    redactor_fail: number;
    overall: "PASS" | "FAIL";
  };
  templates: Array<{
    id: string; name: string; status: string; fmt: string;
    ok: boolean; bytes: number; magicOk: boolean; error?: string; ms: number;
  }>;
  redactor: Array<{
    name: string; countries: string[];
    expected: string[]; found: string[];
    hits: number; missing: string[]; ok: boolean;
  }>;
};

export default function QaDashboard() {
  const [busy, setBusy] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setBusy(true); setError(null); setReport(null);
    try {
      const res = await fetch("/api/qa/smoke", { cache: "no-store" });
      const j = await res.json();
      setReport(j);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setBusy(false);
    }
  };

  const card: React.CSSProperties = {
    background: "#fff",
    border: "1px solid var(--line)",
    borderRadius: 14,
    padding: 24,
    marginBottom: 16,
  };

  return (
    <>
      <div style={{ ...card, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <button className="btn btn-primary" onClick={run} disabled={busy}>
          {busy ? "Running…" : "Run smoke tests"}
        </button>
        {report && (
          <span
            style={{
              padding: "6px 14px",
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 13,
              background: report.summary.overall === "PASS" ? "rgba(22,163,74,0.12)" : "rgba(220,38,38,0.12)",
              color: report.summary.overall === "PASS" ? "#15803d" : "#991b1b",
            }}
          >
            {report.summary.overall} · {report.elapsed_ms}ms
          </span>
        )}
        {report && (
          <span style={{ color: "var(--ink-muted)", fontSize: 13 }}>
            Templates {report.summary.templates_ok}/{report.summary.templates_total} ·
            Redactor {report.summary.redactor_ok}/{report.summary.redactor_total}
          </span>
        )}
      </div>

      {error && (
        <div style={{ ...card, borderColor: "rgba(220,38,38,0.3)", color: "#991b1b" }}>
          {error}
        </div>
      )}

      {report && (
        <>
          <div style={card}>
            <h3 style={{ fontFamily: "var(--display)", fontSize: 20, margin: "0 0 12px", color: "var(--navy-900)" }}>
              Template renders
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.5fr 0.5fr 0.8fr 0.5fr 1fr", gap: 4, fontSize: 13 }}>
              <div style={{ fontWeight: 700, borderBottom: "1px solid var(--line)", padding: "6px 4px" }}>Template</div>
              <div style={{ fontWeight: 700, borderBottom: "1px solid var(--line)", padding: "6px 4px" }}>Format</div>
              <div style={{ fontWeight: 700, borderBottom: "1px solid var(--line)", padding: "6px 4px" }}>OK</div>
              <div style={{ fontWeight: 700, borderBottom: "1px solid var(--line)", padding: "6px 4px" }}>Bytes</div>
              <div style={{ fontWeight: 700, borderBottom: "1px solid var(--line)", padding: "6px 4px" }}>ms</div>
              <div style={{ fontWeight: 700, borderBottom: "1px solid var(--line)", padding: "6px 4px" }}>Notes</div>
              {report.templates.map((r, i) => (
                <Row key={i} cells={[
                  r.name,
                  r.fmt.toUpperCase(),
                  r.ok && r.magicOk ? "✓" : "✗",
                  r.bytes ? `${(r.bytes / 1024).toFixed(1)} KB` : "—",
                  String(r.ms),
                  r.error || (!r.magicOk && r.ok ? "bad magic bytes" : ""),
                ]} ok={r.ok && r.magicOk} />
              ))}
            </div>
          </div>

          <div style={card}>
            <h3 style={{ fontFamily: "var(--display)", fontSize: 20, margin: "0 0 12px", color: "var(--navy-900)" }}>
              Redactor patterns
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 0.8fr 0.5fr 1fr 1.5fr", gap: 4, fontSize: 13 }}>
              <div style={{ fontWeight: 700, borderBottom: "1px solid var(--line)", padding: "6px 4px" }}>Fixture</div>
              <div style={{ fontWeight: 700, borderBottom: "1px solid var(--line)", padding: "6px 4px" }}>Country</div>
              <div style={{ fontWeight: 700, borderBottom: "1px solid var(--line)", padding: "6px 4px" }}>OK</div>
              <div style={{ fontWeight: 700, borderBottom: "1px solid var(--line)", padding: "6px 4px" }}>Hits</div>
              <div style={{ fontWeight: 700, borderBottom: "1px solid var(--line)", padding: "6px 4px" }}>Missing</div>
              {report.redactor.map((r, i) => (
                <Row key={i} cells={[
                  r.name,
                  r.countries.join(", "),
                  r.ok ? "✓" : "✗",
                  String(r.hits),
                  r.missing.join(", ") || "—",
                ]} ok={r.ok} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

function Row({ cells, ok }: { cells: string[]; ok: boolean }) {
  const cs: React.CSSProperties = { padding: "6px 4px", borderBottom: "1px solid rgba(10,47,110,0.06)", fontSize: 12.5 };
  const ind: React.CSSProperties = { ...cs, color: ok ? "#15803d" : "#991b1b", fontWeight: 700 };
  return (
    <>
      <div style={cs}>{cells[0]}</div>
      <div style={cs}>{cells[1]}</div>
      <div style={ind}>{cells[2]}</div>
      <div style={cs}>{cells[3]}</div>
      <div style={cs}>{cells[4]}</div>
      {cells[5] !== undefined && <div style={{ ...cs, color: "var(--ink-muted)" }}>{cells[5]}</div>}
    </>
  );
}
