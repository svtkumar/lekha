import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { frameworks } from "@/lib/dharma/frameworks";
import { listByCategory } from "@/lib/templates/registry";

export const metadata = {
  title: "Dharma — Governance & Compliance · Lekha",
  description:
    "Dharma is Lekha's governance hub: audit policies against DPDP Act 2023, GDPR and ISO 27001, generate compliance documents, and track your control coverage.",
};

const totalControls = frameworks.reduce((a, f) => a + f.controls.length, 0);

export default function DharmaPage() {
  const dharmaTemplates = listByCategory("dharma");

  const card: React.CSSProperties = {
    background: "#fff",
    border: "1px solid var(--line)",
    borderRadius: 14,
    padding: 28,
    height: "100%",
  };

  return (
    <>
      <Nav />
      <section className="hero" style={{ padding: "72px 0 40px" }}>
        <div className="container">
          <span className="eyebrow">Dharma · Governance &amp; compliance</span>
          <h1 className="hero-title" style={{ fontSize: "clamp(34px, 4vw, 56px)", margin: "16px 0 16px" }}>
            Do the right thing, <em>provably.</em>
          </h1>
          <p className="hero-sub" style={{ maxWidth: 700 }}>
            Dharma brings Lekha&apos;s compliance tooling under one roof: audit an existing policy for gaps,
            draft governance documents from vetted templates, and see your coverage against the frameworks
            that matter — the DPDP Act 2023, GDPR and ISO/IEC 27001:2022.
          </p>
          <div className="btn-row" style={{ marginTop: 24 }}>
            <Link href="/dharma/audit" className="btn btn-primary">
              Run a compliance audit <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/dharma/dashboard" className="btn btn-ghost">
              View governance dashboard
            </Link>
          </div>
        </div>
      </section>

      <div className="trust">
        <div className="container trust-inner">
          <div className="trust-item"><div className="num">{frameworks.length}</div><div className="lbl">Frameworks covered</div></div>
          <div className="trust-item"><div className="num">{totalControls}</div><div className="lbl">Controls scanned</div></div>
          <div className="trust-item"><div className="num">0</div><div className="lbl">Data stored server-side</div></div>
          <div className="trust-item"><div className="num">DOCX</div><div className="lbl">Audit-ready documents</div></div>
        </div>
      </div>

      <section className="band" style={{ padding: "56px 0" }}>
        <div className="container">
          <div className="band-head">
            <span className="eyebrow">Three ways in</span>
            <h2>Audit, draft, and track — in one place.</h2>
            <p>Dharma reuses the engine behind the Redactor to read your documents on the fly. Nothing is uploaded to permanent storage.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginTop: 32 }}>
            <div style={card}>
              <h3 style={{ fontFamily: "var(--display)", fontSize: 20, margin: "0 0 8px", color: "var(--navy-900)" }}>Compliance audit</h3>
              <p style={{ color: "var(--ink-muted)", fontSize: 14, margin: "0 0 16px" }}>
                Paste or upload a policy and get a control-by-control gap report with a coverage score per framework.
              </p>
              <Link href="/dharma/audit" className="btn btn-ghost">Open the audit tool →</Link>
            </div>
            <div style={card}>
              <h3 style={{ fontFamily: "var(--display)", fontSize: 20, margin: "0 0 8px", color: "var(--navy-900)" }}>Governance templates</h3>
              <p style={{ color: "var(--ink-muted)", fontSize: 14, margin: "0 0 16px" }}>
                Generate privacy notices, DPAs and security policies that already speak the language of the frameworks.
              </p>
              <Link href="/templates?cat=dharma" className="btn btn-ghost">
                {dharmaTemplates.length > 0 ? `Browse ${dharmaTemplates.length} template${dharmaTemplates.length === 1 ? "" : "s"} →` : "Browse templates →"}
              </Link>
            </div>
            <div style={card}>
              <h3 style={{ fontFamily: "var(--display)", fontSize: 20, margin: "0 0 8px", color: "var(--navy-900)" }}>Governance dashboard</h3>
              <p style={{ color: "var(--ink-muted)", fontSize: 14, margin: "0 0 16px" }}>
                See every framework and the controls Dharma checks for, so you know what &quot;good&quot; looks like.
              </p>
              <Link href="/dharma/dashboard" className="btn btn-ghost">Open the dashboard →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="band" style={{ padding: "0 0 96px" }}>
        <div className="container">
          <div className="band-head">
            <span className="eyebrow">Frameworks</span>
            <h2>What Dharma understands.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginTop: 32 }}>
            {frameworks.map((f) => (
              <div key={f.id} style={card}>
                <h3 style={{ fontFamily: "var(--display)", fontSize: 19, margin: "0 0 4px", color: "var(--navy-900)" }}>{f.name}</h3>
                <div style={{ fontSize: 12, color: "var(--ink-muted)", marginBottom: 10 }}>{f.authority}</div>
                <p style={{ color: "var(--ink-muted)", fontSize: 14, margin: "0 0 12px" }}>{f.summary}</p>
                <span style={{ padding: "3px 10px", borderRadius: 999, background: "rgba(201,168,76,0.16)", color: "var(--gold-500)", fontSize: 12, fontWeight: 600 }}>
                  {f.controls.length} controls
                </span>
              </div>
            ))}
          </div>
          <p style={{ color: "var(--ink-muted)", fontSize: 13, marginTop: 24, maxWidth: 720 }}>
            Dharma is a heuristic gap-finder built to guide your review — it is not legal advice or a
            certification. Always have material compliance decisions reviewed by a qualified professional.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
