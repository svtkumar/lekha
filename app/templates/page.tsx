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
              {categories.map((c) => {
                const count = listByCategory(c.id).length;
             