import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { categories } from "@/lib/templates/categories";
import { allMeta, listByCategory } from "@/lib/templates/registry";

type Props = { searchParams: Promise<{ cat?: string }> };

export const metadata = { title: "Templates — Lekha" };

export default async function TemplatesPage({ searchParams }: Props) {
  const sp = await searchParams;
  const selectedSlug = sp.cat;
  const selected = selectedSlug ? categories.find((c) => c.id === selectedSlug) : null;

  const tpls = selected ? listByCategory(selected.id) : allMeta;

  return (
    <>
      <Nav />
      <section className="hero" style={{ padding: "72px 0 40px" }}>
        <div className="container">
          <span className="eyebrow">
            {selected ? `${selected.emoji} ${tpls.length} template${tpls.length === 1 ? "" : "s"}` : "Templates"}
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
              ? selected.description
              : `${allMeta.length} templates across compliance, HR, contracts, property and family. Fill online, download as DOCX / PDF / XLSX.`}
          </p>
          {selected && (
            <div className="btn-row">
              <Link href="/templates" className="btn btn-ghost">
                ← All categories
              </Link>
            </div>
          )}
        </div>
      </section>

      {!selected && (
        <section className="band cat-band" style={{ padding: "56px 0 40px" }}>
          <div className="container">
            <div className="cat-grid">
              {categories.map((c) => {
                const count = listByCategory(c.id).length;
                return (
                  <Link key={c.id} href={`/templates?cat=${c.id}`} className="cat">
                    <div className="cat-top">
                      <span className="cat-emoji" aria-hidden="true">{c.emoji}</span>
                      <span className="cat-count">{count} templates</span>
                    </div>
                    <div>
                      <h3>{c.name}</h3>
                      <p>{c.description}</p>
                    </div>
                    <span className="cat-link">View {c.name.toLowerCase()} →</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="band" style={{ padding: selected ? "56px 0 96px" : "40px 0 96px" }}>
        <div className="container">
          {!selected && (
            <div className="band-head">
              <span className="eyebrow">Live templates</span>
              <h2>Fill online — download as PDF, DOCX, or XLSX.</h2>
            </div>
          )}
          <div className="featured">
            {tpls.map((t) => {
              const isLive = t.status === "live";
              const disabled = !isLive;
              return (
                <Link
                  key={t.id}
                  href={`/templates/${t.id}`}
                  className="tpl"
                  style={disabled ? { opacity: 0.6 } : {}}
                >
                  <span
                    className="tpl-tag"
                    style={
                      disabled
                        ? { background: "rgba(74,86,110,0.1)", color: "var(--ink-muted)" }
                        : {}
                    }
                  >
                    {disabled ? "Coming soon" : t.new ? "New" : "Live"} · {t.category}
                  </span>
                  <h3>{t.name}</h3>
                  <p>{t.description}</p>
                  <div className="tpl-meta">
                    <span>
                      {t.pages ? `${t.pages} pages` : "—"}
                      {t.formats.length ? ` · ${t.formats.map((f) => f.toUpperCase()).join(" / ")}` : ""}
                    </span>
                    <span className="tpl-arrow">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
