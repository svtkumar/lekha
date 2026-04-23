import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { categories, featured } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Legal templates · Multi-jurisdiction</span>
            <h1 className="hero-title">
              Legal documents,<br /> <em>done right.</em>
            </h1>
            <p className="hero-sub">
              35+ screen-reader-native templates for compliance, HR, contracts,
              property and family matters. Fill online, download as DOCX, and
              send in minutes. Starting with India — UK, US, Singapore and more
              rolling out.
            </p>
            <div className="btn-row">
              <Link href="/templates" className="btn btn-primary">
                Browse 35+ templates <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
              <Link href="/earn" className="btn btn-ghost">Earn with Lekha</Link>
            </div>
            <div className="hero-meta">
              <span><span className="dot"></span>WCAG 2.2 AA</span>
              <span><span className="dot"></span>Multi-jurisdiction</span>
              <span><span className="dot"></span>UPI-friendly payouts</span>
            </div>
          </div>

          <div className="doc-stack" aria-hidden="true">
            <div className="doc-2"></div>
            <div className="doc">
              <div className="doc-sub">Template · Compliance</div>
              <div className="doc-heading">POSH Policy &amp; ICC Charter</div>
              <div className="doc-divider"></div>
              <p>
                This policy is issued in accordance with the Sexual Harassment
                of Women at Workplace (Prevention, Prohibition and Redressal)
                Act, 2013 and applies to all employees, interns and visitors…
              </p>
              <div className="line mid"></div>
              <div className="line short"></div>
              <div className="line"></div>
              <div className="line mid"></div>
              <div className="line short"></div>
              <div className="doc-seal">Lekha<br />Verified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="trust">
        <div className="container trust-inner">
          <div className="trust-item"><div className="num">35<span className="accent">+</span></div><div className="lbl">Templates live</div></div>
          <div className="trust-item"><div className="num">WCAG <span className="accent">2.2 AA</span></div><div className="lbl">Accessible by default</div></div>
          <div className="trust-item"><div className="num">DOCX</div><div className="lbl">Instant download</div></div>
          <div className="trust-item"><div className="num"><span className="accent">₹0</span> to start</div><div className="lbl">Free templates, no login</div></div>
        </div>
      </div>

      {/* Why Lekha */}
      <section className="band" id="why">
        <div className="container">
          <div className="band-head">
            <span className="eyebrow">Why Lekha</span>
            <h2>Not just templates. Documents you can defend.</h2>
            <p>Drafted for your jurisdiction. Reviewed for accessibility. Shipped in the format your lawyer, HR, and regulator actually want.</p>
          </div>
          <div className="pillars">
            <div className="pillar">
              <div className="pillar-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7h7l-5.5 4 2 7-6.5-4.5L5.5 20l2-7L2 9h7z"/></svg>
              </div>
              <h3>Jurisdiction-aware</h3>
              <p>Clauses mapped to local statutes — DPDP, POSH and the Companies Act in India, with UK GDPR, US state privacy laws, Singapore PDPA and more rolling out. Written by practitioners, not boilerplate scrapers.</p>
            </div>
            <div className="pillar">
              <div className="pillar-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
              </div>
              <h3>Screen-reader native</h3>
              <p>WCAG 2.2 AA from the ground up. Proper landmarks, keyboard paths, and focus order. The accessibility you assumed was there — actually there.</p>
            </div>
            <div className="pillar">
              <div className="pillar-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </div>
              <h3>Fill online, ship as DOCX</h3>
              <p>Answer a guided form, download a clean Word file. Edit in your tool of choice, share with counsel, or e-sign. No lock-in, no watermarks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="band cat-band" id="templates">
        <div className="container">
          <div className="band-head">
            <span className="eyebrow">Categories</span>
            <h2>Five libraries. One shelf.</h2>
            <p>From POSH policies to rent agreements — browse by what you need, not by what lawyers call it.</p>
          </div>
          <div className="cat-grid">
            {categories.map((c) => (
              <Link key={c.slug} href={`/templates?cat=${c.slug}`} className="cat">
                <div className="cat-top">
                  <span className="cat-emoji" aria-hidden="true">{c.emoji}</span>
                  <span className="cat-count">{c.count} templates</span>
                </div>
                <div>
                  <h3>{c.name}</h3>
                  <p>{c.blurb}</p>
                </div>
                <span className="cat-link">
                  Browse {c.name.toLowerCase()}{" "}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="band">
        <div className="container">
          <div className="band-head">
            <span className="eyebrow">Featured</span>
            <h2>The five most downloaded, this month.</h2>
            <p>Drafted for founders, HR leads, compliance officers and family counsel. All tagged <strong>New</strong>.</p>
          </div>
          <div className="featured">
            {featured.map((t) => (
              <article key={t.slug} className={`tpl${t.hero ? " tpl-hero" : ""}`}>
                <span className="tpl-tag">{t.tag}</span>
                <h3>{t.title}</h3>
                <p>{t.summary}</p>
                {t.whats_inside && (
                  <ul className="tpl-list">
                    {t.whats_inside.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                )}
                <div className="tpl-meta">
                  <span>
                    {t.pages} pages · DOCX
                    {t.minutes ? ` · ${t.minutes} min` : ""}
                  </span>
                  <span className="tpl-arrow">→</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Earn */}
      <section className="band earn" id="earn">
        <div className="container">
          <div className="band-head">
            <span className="eyebrow">Earn with Lekha</span>
            <h2>Five income streams. One shelf to sell from.</h2>
            <p>Open to everyone — affiliates, authors and advocates. Screen-reader native. Paid out over UPI.</p>
          </div>
          <div className="earn-grid">
            <div className="earn-card">
              <div className="num">20–30<span className="unit">%</span></div>
              <h3>Affiliate Program</h3>
              <p>Recurring commission on every Pro upgrade through your link. No cap, lifetime attribution.</p>
              <Link href="/earn#affiliate" className="earn-link">Become an affiliate →</Link>
            </div>
            <div className="earn-card">
              <div className="num">Assist</div>
              <h3>Lekha Assist</h3>
              <p>Help users fill templates and earn per completion. A paid support tier for lawyers, paralegals and HR pros.</p>
              <Link href="/earn#assist" className="earn-link">Join the panel →</Link>
            </div>
            <div className="earn-card">
              <div className="num">₹3–10<span className="unit">/ download</span></div>
              <h3>Ambassador Panel</h3>
              <p>Publish your own template to Lekha's library. Earn per download, forever, with full attribution.</p>
              <Link href="/earn#ambassador" className="earn-link">Publish a template →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="cta-close">
        <div className="container">
          <span className="eyebrow">Get started</span>
          <h2>Draft better. <em style={{ fontStyle: "italic", color: "var(--navy-700)" }}>Ship today.</em></h2>
          <p>Open a template, answer the questions, download your DOCX. No signup, no watermark, no friction.</p>
          <div className="btn-row">
            <Link href="/templates" className="btn btn-primary">
              Browse 35+ templates <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/earn" className="btn btn-ghost">Earn with Lekha</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
