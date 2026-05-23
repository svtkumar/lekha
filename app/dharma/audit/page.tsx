import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DharmaAudit from "@/components/DharmaAudit";

export const metadata = {
  title: "Compliance Audit — Dharma · Lekha",
  description:
    "Audit a privacy notice, DPA or security policy against DPDP Act 2023, GDPR and ISO 27001. Get a per-control gap report. Nothing stored server-side.",
};

export default function DharmaAuditPage() {
  return (
    <>
      <Nav />
      <section className="hero" style={{ padding: "72px 0 40px" }}>
        <div className="container">
          <span className="eyebrow">Dharma · Compliance audit</span>
          <h1 className="hero-title" style={{ fontSize: "clamp(34px, 4vw, 56px)", margin: "16px 0 16px" }}>
            Audit a policy for gaps
          </h1>
          <p className="hero-sub" style={{ maxWidth: 680 }}>
            Paste a privacy notice, DPA or security policy — or upload a DOCX/TXT — and Dharma checks it
            control-by-control against the DPDP Act 2023, GDPR and ISO/IEC 27001:2022. You get a coverage
            score and a list of gaps to close. It uses the same on-the-fly engine as the Redactor: nothing
            is stored server-side.
          </p>
        </div>
      </section>

      <section className="band" style={{ padding: "24px 0 96px" }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <DharmaAudit />
        </div>
      </section>

      <Footer />
    </>
  );
}
