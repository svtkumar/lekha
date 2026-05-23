import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { frameworks } from "@/lib/dharma/frameworks";
import { listByCategory } from "@/lib/templates/registry";

export const metadata = {
  title: "Dharma — Governance & Compliance · Lekha",
  description:
    "Dharma is Lekha's compliance workspace: audit a policy against the DPDP Act 2023, GDPR and ISO 27001, close the gaps with vetted documents, and see your control coverage.",
};

const totalControls = frameworks.reduce((a, f) => a + f.controls.length, 0);

export default function DharmaPage() {
  const dharmaTemplates = listByCategory("dharma");
  const tplCount = dharmaTemplates.length;

  return (
    <div className="dh">
      <Nav />

      {/* Hero */}
      <header className="dh-hero">
        <div className="container dh-hero-inner">
          <span className="dh-kicker">Dharma · Governance &amp; Compliance</span>
          <h1 className="dh-h1">
            Compliance you can <em>prove.</em>
          </h1>
          <p className="dh-lede">
            A guided workspace for data governance. Audit an existing policy against the frameworks that
            matter, see exactly where the gaps are, and close them with documents built to the same standard
            — all without a single file leaving your browser.
          </p>
          <div className="dh-cta-row">
            <Link href="/dharma/audit" className="btn btn-primary">
              Run a compliance audit <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/dharma/dashboard" className="btn btn-ghost">View the control register</Link>
          </div>
        </div>
      </header>

      {/* Trust signals */}
      <section className="dh-section" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <div className="dh-trust">
            <div className="dh-trust-item"><div className="n">{frameworks.length}</div><div className="l">Frameworks covered</div></div>
            <div className="dh-trust-item"><div className="n">{totalControls}</div><div className="l">Controls scanned</div></div>
            <div className="dh-trust-item"><div className="n">0</div><div className="l">Data stored server-side</div></div>
            <div className="dh-trust-item"><div className="n">PDF·DOCX</div><div className="l">Audit-ready output</div></div>
          </div>
        </div>
      </section>

      {/* Onboarding: how it works */}
      <section className="dh-section">
        <div className="container">
          <div className="dh-shead">
            <span className="dh-eyebrow">How it works</span>
            <h2 className="dh-h2">Three steps from policy to proof.</h2>
            <p className="dh-stext">
              Dharma reads your document on the fly using the same engine as the Redactor. Nothing is uploaded
              to permanent storage.
            </p>
          </div>
          <div className="dh-steps">
            <div className="dh-step">
              <span className="dh-step-n">1</span>
              <h3>Audit a policy</h3>
              <p>Paste or upload a privacy notice, DPA or security policy. Dharma scores it control-by-control against each framework you select.</p>
              <Link href="/dharma/audit" className="dh-step-link">Open the audit tool <span aria-hidden="true">→</span></Link>
            </div>
            <div className="dh-step">
              <span className="dh-step-n">2</span>
              <h3>See the gaps</h3>
              <p>Get a coverage score and a plain-English list of what&apos;s addressed, what&apos;s partial, and what&apos;s missing — per obligation.</p>
              <Link href="/dharma/dashboard" className="dh-step-link">Browse the controls <span aria-hidden="true">→</span></Link>
            </div>
            <div className="dh-step">
              <span className="dh-step-n">3</span>
              <h3>Close them</h3>
              <p>Generate governance documents that already speak the language of the frameworks, in PDF or DOCX.</p>
              <Link href={`/templates?cat=dharma`} className="dh-step-link">
                {tplCount > 0 ? `Browse ${tplCount} template${tplCount === 1 ? "" : "s"}` : "Browse templates"} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Frameworks */}
      <section className="dh-section">
        <div className="container">
          <div className="dh-shead">
            <span className="dh-eyebrow">Coverage</span>
            <h2 className="dh-h2">The frameworks Dharma understands.</h2>
            <p className="dh-stext">Three of the standards that most often gate enterprise deals and regulatory reviews.</p>
          </div>
          <div className="dh-fw-grid">
            {frameworks.map((f) => (
              <article key={f.id} className="dh-fw">
                <h3 className="dh-fw-name">{f.name}</h3>
                <p className="dh-fw-auth">{f.authority}</p>
                <p className="dh-fw-sum">{f.summary}</p>
                <span className="dh-pill">{f.controls.length} controls</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Reassurance */}
      <section className="dh-section" style={{ paddingTop: 64, paddingBottom: 88 }}>
        <div className="container">
          <div className="dh-note">
            <span aria-hidden="true" style={{ fontSize: 18, lineHeight: 1.2 }}>⚖️</span>
            <span>
              <strong>A guide, not a guarantee.</strong> Dharma is a heuristic gap-finder that helps you direct
              a review — it is not legal advice or a certification. Material compliance decisions should always
              be confirmed by a qualified professional.
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
