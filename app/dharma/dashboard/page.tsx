import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { frameworks } from "@/lib/dharma/frameworks";

export const metadata = {
  title: "Control Register — Dharma · Lekha",
  description:
    "Every obligation Dharma checks for, across the DPDP Act 2023, GDPR and ISO/IEC 27001:2022.",
};

const totalControls = frameworks.reduce((a, f) => a + f.controls.length, 0);

export default function DharmaDashboardPage() {
  return (
    <div className="dh">
      <Nav />

      <header className="dh-hero" style={{ padding: "72px 0 52px" }}>
        <div className="container dh-hero-inner">
          <span className="dh-kicker">Dharma · Control register</span>
          <h1 className="dh-h1" style={{ fontSize: "clamp(34px, 4vw, 48px)" }}>
            What &ldquo;good&rdquo; looks like.
          </h1>
          <p className="dh-lede">
            The full set of obligations Dharma scans for — {totalControls} controls across {frameworks.length}{" "}
            frameworks. Run the audit to score a document against every one.
          </p>
          <div className="dh-cta-row">
            <Link href="/dharma/audit" className="btn btn-primary">
              Run an audit <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </header>

      <section className="dh-section" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <div className="dh-trust">
            {frameworks.map((f) => (
              <div key={f.id} className="dh-trust-item">
                <div className="n">{f.controls.length}</div>
                <div className="l">{f.name} controls</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dh-section" style={{ paddingTop: 8, paddingBottom: 88 }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {frameworks.map((f) => (
            <div key={f.id} className="dh-reg">
              <div className="dh-reg-head">
                <h3>{f.name}</h3>
                <span className="auth">{f.authority}</span>
              </div>
              <p className="dh-reg-sum">{f.summary}</p>
              <div style={{ marginTop: 8 }}>
                {f.controls.map((c) => (
                  <div key={c.id} className="dh-row">
                    <div className="ctrl"><span className="tag">Control</span>{c.title}</div>
                    <div className="obl">{c.requirement}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="dh-note">
            <span aria-hidden="true" style={{ fontSize: 18 }}>⚖️</span>
            <span><strong>Heuristic gap-finder.</strong> Guidance for review — not legal advice or certification.</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
