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
              Legal documents, done right. Starting in India, expanding worldwide. A project of{" "}
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
              <li><Link href="/templates?cat=hr">HR &amp; Workplace</Link></li>
              <li><Link href="/templates?cat=business">Business &amp; Legal</Link></li>
              <li><Link href="/templates?cat=property">Property</Link></li>
              <li><Link href="/templates?cat=personal">Personal &amp; Family</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Tools</h4>
            <ul>
              <li><Link href="/redactor">Document Redactor</Link></li>
              <li><Link href="/templates/nda">NDA generator</Link></li>
              <li><Link href="/templates/rental-agreement">Rental Agreement</Link></li>
              <li><Link href="/templates/salary-slip">Salary Slip</Link></li>
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
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Elevana. All rights reserved.</span>
          <span className="legal">
            <a href="https://elevana.guru/privacy-policy/">Privacy</a>
            <a href="https://elevana.guru/terms-and-conditions/">Terms</a>
            <a href="https://ele