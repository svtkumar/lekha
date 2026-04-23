import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { categories, featured } from "@/lib/data";

type Props = { searchParams: Promise<{ cat?: string }> };

export const metadata = { title: "Templates â Lekha" };

export default async function TemplatesPage({ searchParams }: Props) {
  const sp = await searchParams;
  const selectedSlug = sp.cat;
  const selected = selectedSlug ? categories.find((c) => c.slug === selectedSlug) : null;

  const tpls = selected ? featured.filter((t) => t.category === selected.slug) : featured;
  const placeholders = selected ? Math.max(0, selected.count - tpls.length) : 0;

  return (
    <>
      <Nav />
      <section className="hero" style={{ padding: "72px 0 40px" }}>
        <div className="container">
          <span className="eyebrow">
            {selected ? `${selected.emoji} ${selected.count} templates` : "Templates"}
          </span>
          <h1 className="hero-title" style={{ fontSize: "clamp(34px, 4vw, 56px)", margin: "16px 0 16px" }}>
            {selected ? (
              selected.name
            ) : (
              <>
                Browse the <em>full shelf.</em>
              </>
            )}
          </h1>
          <p className="hero-sub" style={{ maxWidth: 640 }}>
            {selected
              ? selected.blurb
              : "35+ templates across compliance, HR, contracts, property and family. Screen-reader native. Download as DOCX in under 20 minutes."}
          </p>
          {selected && (
            <div className="btn-row">
              <Link href="/templates" className="btn btn-ghost">
                &larr; All categories
              </Link>
            </div>
          )}
        </div>
      </section>

      {!selected && (
        <section className="band cat-band" style={{ padding: "56px 0 40px" }}>
          <div className="container">
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
                  <span className="cat-link">View {c.name.toLowerCase()} &rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="band" style={{ padding: selected ? "56px 0 96px" : "40px 0 96px" }}>
        <div className="container">
          {!selected && (
            <div className="band-head">
              <span className="eyebrow">Featured</span>
              <h2>The five most downloaded, this month.</h2>
            </div>
          )}
          <div className="featured">
            {tpls.map((t) => (
              <article key={t.slug} className={`tpl${t.hero && !selected ? " tpl-hero" : ""}`}>
                <span className="tpl-tag">{t.tag}</span>
                <h3>{t.title}</h3>
                <p>{t.summary}</p>
                {t.whats_inside && !selected && (
                  <ul className="tpl-list">
                    {t.whats_inside.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                )}
                <div className="tpl-meta">
                  <span>
                    {t.pages} pages &middot; DOCX{t.minutes ? ` \u00b7 ${t.minutes} min` : ""}
                  </span>
                  <span className="tpl-arrow">&rarr;</span>
                </div>
              </article>
            ))}
            {Array.from({ length: placeholders }).map((_, i) => (
              <article key={`ph-${i}`} className="tpl" style={{ opacity: 0.55 }}>
                <span
                  className="tpl-tag"
                  style={{ background: "rgba(74,86,110,0.1)", color: "var(--ink-muted)" }}
                >
                  Coming soon
                </span>
                <h3>Template drafting in progress</h3>
                <p>
                  This template is in the drafting queue. Subscribe to be notified when it&rsquo;s
                  live.
                </p>
                <div className="tpl-meta">
                  <span>&mdash;</span>
                  <span className="tpl-arrow">&rarr;</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
