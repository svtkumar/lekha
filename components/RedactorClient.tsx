"use client";

import { useState } from "react";

const COUNTRIES: { code: string; name: string }[] = [
  { code: "IN", name: "India" },
  { code: "US", name: "United States" },
  { code: "UK", name: "United Kingdom" },
  { code: "EU", name: "European Union" },
  { code: "DE", name: "Germany" },
  { code: "SG", name: "Singapore" },
  { code: "AU", name: "Australia" },
  { code: "CA", name: "Canada" },
  { code: "JP", name: "Japan" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
];

type Mode = "label" | "black" | "mask";

export default function RedactorClient() {
  const [tab, setTab] = useState<"text" | "file">("text");
  const [text, setText] = useState("");
  const [countries, setCountries] = useState<string[]>(["IN"]);
  const [mode, setMode] = useState<Mode>("label");
  const [includeNameHeuristic, setName] = useState(true);
  const [customTerms, setCustomTerms] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{
    redactedText?: string;
    hits: number;
    summary: Record<string, number>;
    details?: { pattern: string; label: string; original: string; replacement: string }[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const toggleCountry = (c: string) => {
    setCountries((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));
  };

  const runTextRedaction = async () => {
    setError(null);
    setResult(null);
    setBusy(true);
    try {
      const res = await fetch("/api/redact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          countries,
          mode,
          includeNameHeuristic,
          customTerms: customTerms.split("\n").map((s) => s.trim()).filter(Boolean),
        }),
      });
      const j = await res.json();
      if (!res.ok) {
        setError(j.error || "Redaction failed");
      } else {
        setResult(j);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setBusy(false);
    }
  };

  const runFileRedaction = async () => {
    if (!file) return;
    setError(null);
    setResult(null);
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("countries", countries.join(","));
      fd.append("mode", mode);
      fd.append("includeNameHeuristic", String(includeNameHeuristic));
      fd.append("customTerms", customTerms);
      const res = await fetch("/api/redact", { method: "POST", body: fd });
      if (!res.ok) {
        const j = await res.json().catch(() => ({ error: `Failed (${res.status})` }));
        setError(j.error || "Redaction failed");
        return;
      }
      const blob = await res.blob();
      const cd = res.headers.get("content-disposition") || "";
      const match = /filename="([^"]+)"/.exec(cd);
      const name = match ? match[1] : `redacted_${Date.now()}`;
      const hits = Number(res.headers.get("x-redaction-hits") || 0);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setResult({ hits, summary: {}, details: [] });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setBusy(false);
    }
  };

  const chipStyle = (active: boolean): React.CSSProperties => ({
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
      {/* Settings */}
      <div style={card}>
        <h3 style={{ fontFamily: "var(--display)", fontSize: 18, margin: "0 0 14px", color: "var(--navy-900)" }}>
          Settings
        </h3>

        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
          Country pattern packs
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
          {COUNTRIES.map((c) => (
            <span key={c.code} style={chipStyle(countries.includes(c.code))} onClick={() => toggleCountry(c.code)}>
              {c.name} · {c.code}
            </span>
          ))}
          <small style={{ width: "100%", color: "var(--ink-muted)", fontSize: 12, marginTop: 4 }}>
            Universal patterns (email, credit card, IBAN) always apply. Tip: turn on only what's relevant to avoid false positives.
          </small>
        </div>

        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
          Replacement style
        </label>
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          {(["label", "black", "mask"] as Mode[]).map((m) => (
            <span key={m} style={chipStyle(mode === m)} onClick={() => setMode(m)}>
              {m === "label" ? "[REDACTED-LABEL]" : m === "black" ? "█████" : "Last 4 visible"}
            </span>
          ))}
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, marginBottom: 16 }}>
          <input type="checkbox" checked={includeNameHeuristic} onChange={(e) => setName(e.target.checked)} />
          Also redact names with honorifics (Mr./Ms./Dr./Shri etc.)
        </label>

        <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
          Custom terms to redact (one per line)
        </label>
        <textarea
          rows={3}
          value={customTerms}
          onChange={(e) => setCustomTerms(e.target.value)}
          placeholder="Acme Corp&#10;Project Phoenix"
          style={{
            width: "100%",
            padding: "10px 12px",
            border: "1px solid var(--line)",
            borderRadius: 8,
            fontSize: 13,
            fontFamily: "inherit",
          }}
        />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <span style={chipStyle(tab === "text")} onClick={() => setTab("text")}>
          Paste text
        </span>
        <span style={chipStyle(tab === "file")} onClick={() => setTab("file")}>
          Upload file (DOCX · PDF · TXT)
        </span>
      </div>

      {tab === "text" ? (
        <div style={card}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            Paste text to redact
          </label>
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type any text — emails, ID numbers, phone numbers, addresses will be found and replaced…"
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "1px solid var(--line)",
              borderRadius: 8,
              fontSize: 13,
              fontFamily: "ui-monospace, monospace",
              lineHeight: 1.5,
            }}
          />
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: 14 }}
            disabled={!text.trim() || busy}
            onClick={runTextRedaction}
          >
            {busy ? "Redacting…" : "Redact text"}
          </button>
        </div>
      ) : (
        <div style={card}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            Select a file
          </label>
          <input
            type="file"
            accept=".docx,.pdf,.txt"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{ fontSize: 14 }}
          />
          <p style={{ color: "var(--ink-muted)", fontSize: 12, marginTop: 8 }}>
            DOCX and TXT are fully redacted with layout reset. PDF text extraction is limited — if yours is an image-only PDF, first convert to DOCX.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: 14 }}
            disabled={!file || busy}
            onClick={runFileRedaction}
          >
            {busy ? "Processing…" : "Redact file"}
          </button>
        </div>
      )}

      {error && (
        <div
          style={{
            background: "rgba(220,38,38,0.07)",
            border: "1px solid rgba(220,38,38,0.25)",
            color: "#991b1b",
            padding: "12px 16px",
            borderRadius: 10,
            marginTop: 12,
            fontSize: 14,
          }}
        >
          {error}
        </div>
      )}

      {result && (
        <div style={card}>
          <h3 style={{ fontFamily: "var(--display)", fontSize: 18, margin: "0 0 12px", color: "var(--navy-900)" }}>
            Result — {result.hits} hit{result.hits === 1 ? "" : "s"}
          </h3>
          {result.redactedText !== undefined && (
            <>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Redacted text</label>
              <textarea
                readOnly
                rows={10}
                value={result.redactedText}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1px solid var(--line)",
                  borderRadius: 8,
                  fontSize: 13,
                  fontFamily: "ui-monospace, monospace",
                  background: "#faf8f3",
                }}
              />
              <button
                className="btn btn-ghost"
                style={{ marginTop: 10 }}
                onClick={() => navigator.clipboard.writeText(result.redactedText || "")}
              >
                Copy to clipboard
              </button>
            </>
          )}
          {Object.keys(result.summary).length > 0 && (
            <div style={{ marginTop: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                Counts by type
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {Object.entries(result.summary).map(([k, v]) => (
                  <span
                    key={k}
                    style={{
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: "rgba(201,168,76,0.14)",
                      color: "var(--gold-500)",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {k}: {v}
  