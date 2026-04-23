import Link from "next/link";
import BrandMark from "./BrandMark";

export default function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand" aria-label="Lekha home">
          <BrandMark />
          Lekha
        </Link>
        <nav className="nav-links" aria-label="Main">
          <Link href="/templates">Templates</Link>
          <Link href="/#why">Why Lekha</Link>
          <Link href="/earn">Earn</Link>
          <Link href="/templates" className="nav-cta">
            Browse templates <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
