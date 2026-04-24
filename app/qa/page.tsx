import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import QaDashboard from "@/components/QaDashboard";

export const metadata = {
  title: "QA — Lekha",
  description: "Smoke tests for the document generators and the redactor.",
};

export default function QaPage() {
  return (
    <>
      <Nav />
      <section className="hero" style={{ padding: "48px 0 24px" }}>
        <div className="container">
          <span className="eyebrow">Internal · QA</span>
          <h1 className="hero-title" style={{ fontSize: "clamp(28px, 3.4vw, 44px)", margin: "14px 0 14px" }}>
            Smoke tests
          </h1>
          <p className="hero-sub" style={{ maxWidth: 640 }}>
            Runs a rendering check against every live template (PDF / DOCX / XLSX) and exercises the redactor
            against known-PII fixtures for each country pack. Green means all clear; red means a new commit
            broke something.
          </p>
        </div>
      </section>

      <section className="band" style={{ padding: "24px 0 96px" }}>
        <div className="container" style={{ maxWidth: 980 }}>
          <QaDashboard />
        </div>
      </section>

      <Footer />
    </>
  );
}
