import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DharmaAudit from "@/components/DharmaAudit";

export const metadata = {
  title: "Compliance Audit — Dharma · Lekha",
  description:
    "Audit a privacy notice, DPA or security policy against the DPDP Act 2023, GDPR and ISO 27001. Get a per-control gap report. Nothing stored server-side.",
};

export default function DharmaAuditPage() {
  return (
    <div className="dh">
      <Nav />

      <header className="dh-hero" style={{ padding: "72px 0 52px" }}>
        <div className="container dh-hero-inner">
          <span className="dh-kicker">Dharma · Compliance audit</span>
          <h1 className="dh-h1" style={{ fontSize: "clamp(34px, 4vw, 48px)" }}>
            Audit a policy for gaps.
          </h1>
          <p className="dh-lede">
            Paste your text or upload a DOCX/TXT. Dharma checks it control-by-control against the DPDP Act
            2023, GDPR and ISO/IEC 27001:2022, and returns a coverage score with the gaps to close.
          </p>
        </div>
      </header>

      <section className="dh-section" style={{ paddingTop: 56, paddingBottom: 88, borderBottom: 0 }}>
        <div className="container">
          <div className="dh-tool">
            <aside className="dh-aside" aria-label="How the audit works">
              <span className="dh-eyebrow">The audit</span>
              <ol style={{ marginTop: 18 }}>
                <li>
                  <h4>Pick frameworks</h4>
                  <p>Choose which standards to score against.</p>
                </li>
                <li>
                  <h4>Add your policy</h4>
                  <p>Paste text or upload a DOCX/TXT file.</p>
                </li>
                <li>
                  <h4>Read the report</h4>
                  <p>A coverage score plus addressed / partial / gap per control.</p>
                </li>
              </ol>
              <div className="dh-note" style={{ marginTop: 28, fontSize: 13 }}>
                <span>
                  <strong>Private by design.</strong> Documents are parsed in-request and never stored.
                  Need a head start? <Link href="/templates?cat=dharma" style={{ color: "var(--navy-800)", textDecoration: "underline" }}>browse Dharma templates</Link>.
                </span>
              </div>
            </aside>
            <div>
              <DharmaAudit />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
