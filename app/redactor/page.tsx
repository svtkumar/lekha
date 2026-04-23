import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RedactorClient from "@/components/RedactorClient";

export const metadata = {
  title: "Document Redactor — Lekha",
  description:
    "Redact PII from legal and HR documents. Detects PAN, Aadhaar, SSN, NI, NRIC, IBAN, credit cards, emails, phones, and more.",
};

export default function RedactorPage() {
  return (
    <>
      <Nav />
      <section className="hero" style={{ padding: "72px 0 40px" }}>
        <div className="container">
          <span className="eyebrow">New · Utility</span>
          <h1 className="hero-title" style={{ fontSize: "clamp(34px, 4vw, 56px)", margin: "16px 0 16px" }}>
            Document Redactor
          </h1>
          <p className="hero-sub" style={{ maxWidth: 680 }}>
            Paste text or upload a DOCX/PDF/TXT. Lekha finds PII — PAN, Aadhaar, SSN, NI numbers,
            NRIC, IBAN, credit cards, emails, phones and more — and emits a redacted copy. Nothing
            is stored server-side. Per-country pattern packs; pick what applies.
          </p>
        </div>
      </section>

      <section className="band" style={{ padding: "24px 0 96px" }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <RedactorClient />
        </div>
      </section>

      <Footer />
    </>
  );
}
