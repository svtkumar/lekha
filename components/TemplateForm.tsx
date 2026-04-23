"use client";

import { useState, useMemo } from "react";
import type { FieldGroup, TemplateMeta, OutputFormat, Field } from "@/lib/templates/types";

type Props = {
  slug: string;
  meta: TemplateMeta;
  groups: FieldGroup[];
};

export default function TemplateForm({ slug, meta, groups }: Props) {
  const initial = useMemo<Record<string, string>>(() => {
    const vals: Record<string, string> = {};
    groups.forEach((g) =>
      g.fields.forEach((f) => {
        if (f.default !== undefined) vals[f.id] = String(f.default);
        else vals[f.id] = "";
      })
    );
    return vals;
  }, [groups]);

  const [values, setValues] = useState<Record<string, string>>(initial);
  const [busy, setBusy] = useState<OutputFormat | null>(null);
  const [error, setError] = useState<string | null>(null);

  const set = (id: string, v: string) => setValues((s) => ({ ...s, [id]: v }));

  const submit = async (format: OutputFormat) => {
    setError(null);
    setBusy(format);
    try {
      const res = await fetch(`/api/generate/${slug}?format=${format}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({ error: "Generation failed" }));
        setError(j.error || `Generation failed (${res.status})`);
        return;
      }
      const blob = await res.blob();
      const cd = res.headers.get("content-disposition") || "";
      const match = /filename="([^"]+)"/.exec(cd);
      const name = match ? match[1] : `${slug}.${format}`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setBusy(null);
    }
  };

  const allRequiredFilled = groups
    .flatMap((g) => g.fields.filter((f) => f.required))
    .every((f) => values[f.id] && values[f.id].trim());

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {groups.map((group) => (
        <section key={group.title} style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: "var(--display)", fontSize: 22, color: "var(--navy-900)", margin: "0 0 6px" }}>
            {group.title}
          </h2>
          {group.description && (
            <p style={{ color: "var(--ink-muted)", fontSize: 14, margin: "0 0 18px" }}>{group.description}</p>
          )}
          <div style={{ display: "grid", gap: 18 }}>
            {group.fields.map((f) => (
              <FieldRow key={f.id} field={f} value={values[f.id] || ""} onChange={(v) => set(f.id, v)} />
            ))}
          </div>
        </section>
      ))}

      {error && (
        <div
          style={{
            background: "rgba(220,38,38,0.07)",
            border: "1px solid rgba(220,38,38,0.25)",
            color: "#991b1b",
            padding: "12px 16px",
            borderRadius: 10,
            margin: "16px 0",
            fontSize: 14,
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          marginTop: 28,
          paddingTop: 24,
          borderTop: "1px solid var(--line)",
        }}
      >
        {meta.formats.includes("pdf") && (
          <button
            type="button"
            onClick={() => submit("pdf")}
            disabled={!allRequiredFilled || busy !== null}
            className="btn btn-primary"
          >
            {busy === "pdf" ? "Generating…" : "Download PDF"}
          </button>
        )}
        {meta.formats.includes("docx") && (
          <button
            type="button"
            onClick={() => submit("docx")}
            disabled={!allRequiredFilled || busy !== null}
            className="btn btn-ghost"
          >
            {busy === "docx" ? "Generating…" : "Download DOCX"}
          </button>
        )}
        {meta.formats.includes("xlsx") && (
          <button
            type="button"
            onClick={() => submit("xlsx")}
            disabled={!allRequiredFilled || busy !== null}
            className="btn btn-ghost"
          >
            {busy === "xlsx" ? "Generating…" : "Download XLSX"}
          </button>
        )}
      </div>
      {!allRequiredFilled && (
        <p style={{ color: "var(--ink-muted)", fontSize: 13, marginTop: 12 }}>
          Please fill all required fields to generate.
        </p>
      )}
    </form>
  );
}

function FieldRow({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string;
  onChange: (v: string) => void;
}) {
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "var(--ink)",
    marginBottom: 6,
  };
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid var(--line)",
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "inherit",
    color: "var(--ink)",
    background: "#fff",
  };
  const helpStyle: React.CSSProperties = {
    display: "block",
    fontSize: 12,
    color: "var(--ink-muted)",
    marginTop: 4,
  };

  return (
    <div>
      <label htmlFor={field.id} style={labelStyle}>
        {field.label}
        {field.required ? <span style={{ color: "var(--gold-500)" }}> *</span> : null}
      </label>
      {field.type === "textarea" ? (
        <textarea
          id={field.id}
          rows={field.rows || 3}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit", lineHeight: 1.5 }}
        />
      ) : field.type === "select" ? (
        <select
          id={field.id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          style={inputStyle}
        >
          <option value="">— choose —</option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : field.type === "radio" ? (
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 4 }}>
          {field.options?.map((o) => (
            <label key={o.value} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14 }}>
              <input
                type="radio"
                name={field.id}
                value={o.value}
                checked={value === o.value}
                onChange={(e) => onChange(e.target.value)}
              />
              {o.label}
            </label>
          ))}
        </div>
      ) : (
        <input
          id={field.id}
          type={field.type}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          maxLength={field.maxLength}
          minLength={field.minLength}
          pattern={field.pattern}
          style={inputStyle}
        />
      )}
      {field.help && <small style={helpStyle}>{field.help}</small>}
    </div>
  );
}
