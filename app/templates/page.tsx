import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { categories } from "@/lib/data";

export const metadata = { title: "Templates — Lekha" };

export default function TemplatesPage() {
  return (
    <>
      <Nav />
      <section className="hero" style={{ padding: "72px 0 40px" }}>
        <div className="container">
          <span className="eyebrow">Templates</span>
          <h1 className="hero-title" style={{ fontSize: "clamp(34px, 4vw, 56px)", margin: "16px 0 16px" }}>
            Browse the <em>full shelf.</em>
          </h1>
          <p className="hero-sub" style={{ maxWidth: 640 }}>
            35+ templates across compliance, HR, contracts, property and family.
            Screen-reader native. Download as DOCX in under 20 minutes.
          </p>
        </div>
      </section>

      <section className="band cat-band" style={{ padding: "56px 0 96px" }}>
        <div className="container">
          <div className="cat-grid">
            {categories.map((c) => (
              <Link key={c.slug} href={`#${c.slug}`} className="cat">
                <div className="cat-top">
                  <span className="cat-emoji" aria-hidden="true">{c.emoji}</span>
                  <span className="cat-count">{c.count} templates</span>
                </div>
                <div>
                  <h3>{c.name}</h3>
                  <p>{c.blurb}</p>
                </div>
                <span className="cat-link">
                  View {c.name.toLowerCase()} →
                </span>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 80, textAlign: "center", color: "var(--ink-muted)" }}>
            <p style={{ fontSize: 15 }}>
              Full template listing and individual template detail pages are being wired up.
              This is where the 35+ templates will live, filterable by category, jurisdiction, and tag.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
