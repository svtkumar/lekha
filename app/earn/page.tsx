import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = { title: "Earn with Lekha" };

export default function EarnPage() {
  return (
    <>
      <Nav />

      <section className="hero" style={{ padding: "80px 0 40px" }}>
        <div className="container">
          <span className="eyebrow">Earn with Lekha</span>
          <h1 className="hero-title" style={{ fontSize: "clamp(34px, 4vw, 58px)", margin: "16px 0 16px" }}>
            Five income streams.<br /><em>One shelf to sell from.</em>
          </h1>
          <p className="hero-sub" style={{ maxWidth: 640 }}>
            Open to everyone — affiliates, authors, advocates and assistants.
            Screen-reader native. UPI payouts.
          </p>
        </div>
      </section>

      <section className="band earn" style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="earn-grid">
            <div className="earn-card" id="affiliate">
              <div className="num">20–30<span className="unit">%</span></div>
              <h3>Affiliate Program</h3>
              <p>Recurring commission on every Pro upgrade through your link. No cap, lifetime attribution, cookie-free.</p>
              <Link href="#" className="earn-link">Apply now →</Link>
            </div>
            <div className="earn-card" id="assist">
              <div className="num">Assist</div>
              <h3>Lekha Assist</h3>
              <p>Help users fill templates and earn per completion. A paid support tier for lawyers, paralegals and HR pros.</p>
              <Link href="#" className="earn-link">Join the panel →</Link>
            </div>
            <div className="earn-card" id="ambassador">
              <div className="num">₹3–10<span className="unit">/ download</span></div>
              <h3>Ambassador Panel</h3>
              <p>Publish your own template to Lekha's library. Earn per download, forever, with full attribution.</p>
              <Link href="#" className="earn-link">Publish a template →</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
