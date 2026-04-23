import Link from "next/link";
import BrandMark from "./BrandMark";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link href="/" className="brand" style={{ color: "#fff" }}>
              <BrandMark />
              Lekha
            </Link>
            <p>
              Legal documents, done right. Starting in India, expanding
              worldwide. A project of{" "}
              <a href="https://elevana.guru" style={{ color: "var(--gold-300)" }}>
                Elevana
              </a>
              .
            </p>
          </div>
          <div className="foot-col">
            <h4>Templates</h4>
            <ul>
              <li><Link href="/templates?cat=compliance">Compliance</Link></li>
              <li><Link href="/templates?cat=hr">HR &amp; Employment</Link></li>
              <li><Link href="/templates?cat=contracts">Contracts</Link></li>
              <li><Link href="/templates?cat=property">Property</Link></li>
              <li><Link href="/templates?cat=personal">Personal &amp; Family</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Earn</h4>
            <ul>
              <li><Link href="/earn#affiliate">Affiliate Program</Link></li>
              <li><Link href="/earn#assist">Lekha Assist</Link></li>
              <li><Link href="/earn#ambassador">Ambassador Panel</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Company</h4>
            <ul>
              <li><a href="https://elevana.guru">About Elevana</a></li>
              <li><Link href="/accessibility">Accessibility</Link></li>
              <li><Link href="/support">Support</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Elevana. All rights reserved.</span>
          <span className="legal">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
