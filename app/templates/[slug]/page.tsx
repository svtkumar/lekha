import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TemplateForm from "@/components/TemplateForm";
import { getMeta, getModule, allMeta } from "@/lib/templates/registry";

export function generateStaticParams() {
  return allMeta.map((m) => ({ slug: m.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getMeta(slug);
  return {
    title: meta ? `${meta.name} — Lekha` : "Template — Lekha",
    description: meta?.description,
  };
}

export default async function TemplateDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getMeta(slug);
  const mod = getModule(slug);
  if (!meta) notFound();

  return (
    <>
      <Nav />
      <section className="hero" style={{ padding: "56px 0 24px" }}>
        <div className="container">
          <span className="eyebrow">{meta.category}</span>
          <h1 className="hero-title" style={{ fontSize: "clamp(30px, 3.8vw, 48px)", margin: "14px 0 14px" }}>
            {meta.name}
          </h1>
          <p className="hero-sub" style={{ maxWidth: 680 }}>{meta.description}</p>
          <div className="hero-meta">
            <span><span className="dot"></span>{meta.country.join(" · ")}</span>
            <span><span className="dot"></span>{meta.formats.join(" · ").toUpperCase()}</span>
            {meta.pages ? <span><span className="dot"></span>~{meta.pages} pages</span> : null}
            {meta.minutes ? <span><span className="dot"></span>~{meta.minutes} min to fill</span> : null}
          </div>
        </div>
      </section>

      <section className="band" style={{ padding: "32px 0 96px" }}>
        <div className="container" style={{ maxWidth: 780 }}>
          {mod ? (
            <TemplateForm slug={slug} meta={meta} groups={mod.groups} />
          ) : (
            <div className="tpl" style={{ padding: 32 }}>
              <span className="tpl-tag" style={{ background: "rgba(74,86,110,0.1)", color: "var(--ink-muted)" }}>Coming soon</span>
              <h3 style={{ marginTop: 12 }}>This template is in the drafting queue.</h3>
              <p>
                Field schemas, clause bodies and generator output for <strong>{meta.name}</strong> are being ported from the old Elevana WP version.
                When ready, this page will render the fill-online form here.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
