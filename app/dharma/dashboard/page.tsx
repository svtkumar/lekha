import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { frameworks } from "@/lib/dharma/frameworks";

export const metadata = {
  title: "Governance Dashboard — Dharma · Lekha",
  description:
    "The control register Dharma checks for: every obligation across the DPDP Act 2023, GDPR and ISO/IEC 27001:2022.",
};

const totalControls = frameworks.reduce((a, f) => a + f.controls.length, 0);

export default function DharmaDashboardPage() {
  const card: React.CSSProperties = {
    background: "#fff",
    border: "1px solid var(--line)",
    borderRadius: 14,
    padding: 24,
    marginBottom: 16,
  };

  return (
    <>
      <Nav />
      <section className="hero" style={{ padding: "48px 0 24px" }}>
        <div className="container">
          <span className="eyebrow">Dharma · Governance</span>
          <h1 className="hero-title" style={{ fontSize: "clamp(28px, 3.4vw, 44px)", margin: "14px 0 14px" }}>
            Control register
          </h1>
          <p className="hero-sub" style={{ maxWidth: 700 }}>
            This is the full set of obligations Dharma scans for — {totalControls} controls across{" "}
            {frameworks.length} frameworks. Run the{" "}
            <Link href="/dharma/audit" style={{ color: "var(--navy-800)", textDecoration: "underline" }}>compliance audit</Link>{" "}
            to score a document against them.
          </p>
        </div>
      </section>

      <section className="band" style={{ padding: "24px 0 96px" }}>
        <div className="container" style={{ maxWidth: 980 }}>
          <div style={{ ...card, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            {frameworks.map((f) => (
              <div key={f.id} style={{ minWidth: 160 }}>
                <div style={{ fontFamily: "var(--display)", fontSize: 26, fontWeight: 700, color: "var(--navy-900)" }}>
                  {f.controls.length}
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>{f.name} controls</div>
              </div>
            ))}
            <div style={{ marginLeft: "auto" }}>
              <Link href="/dharma/audit" className="btn btn-primary">Run an audit →</Link>
            </div>
          </div>

          {frameworks.map((f) => (
            <div key={f.id} style={card}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <h2 style={{ fontFamily: "var(--display)", fontSize: 22, margin: "0 0 2px", color: "var(--navy-900)" }}>{f.name}</h2>
                <span style={{ fontSize: 12, color: "var(--ink-muted)" }}>{f.authority}</span>
              </div>
              <p style={{ color: "var(--ink-muted)", fontSize: 14, margin: "6px 0 16px", maxWidth: 760 }}>{f.summary}</p>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(180px, 1fr) 2fr", gap: 4, fontSize: 13 }}>
                <div style={{ fontWeight: 700, borderBottom: "1px solid var(--line)", padding: "6px 4px", color: "var(--navy-900)" }}>Control</div>
                <div style={{ fontWeight: 700, borderBottom: "1px solid var(--line)", padding: "6px 4px", color: "var(--navy-900)" }}>Obligation</div>
                {f.controls.map((c) => (
                  <div key={c.id} style={{ display: "contents" }}>
                    <div style={{ padding: "8px 4px", borderBottom: "1px solid var(--line)", fontWeight: 600, color: "var(--ink)" }}>{c.title}</div>
                    <div style={{ padding: "8px 4px", borderBottom: "1px solid var(--line)", color: "var(--ink-muted)" }}>{c.requirement}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <p style={{ color: "var(--ink-muted)", fontSize: 13, marginTop: 8 }}>
            Heuristic gap-finder — guidance for review, not legal advice or certification.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
