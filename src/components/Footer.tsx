import Link from "next/link";
import { audiences, services } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link href="/" className="logo"><span className="logo-dot" aria-hidden />XITEON</Link>
            <p style={{ marginTop: 14, maxWidth: 300 }}>
              Human expertise that makes frontier AI work. Built in India, working with AI teams worldwide.
            </p>
          </div>
          <div>
            <h5>Services</h5>
            <ul>{services.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>)}</ul>
          </div>
          <div>
            <h5>Solutions</h5>
            <ul>{audiences.map((a) => <li key={a.slug}><Link href={`/solutions/${a.slug}`}>{a.name}</Link></li>)}</ul>
            <h5 style={{ marginTop: 24 }}>Talent</h5>
            <ul><li><Link href="/join">Join as Expert</Link></li></ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/impact">Impact</Link></li>
              <li><Link href="/trust">Trust &amp; Security</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy">Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Xiteon. All rights reserved.</span>
          <span>xiteon.com</span>
        </div>
      </div>
    </footer>
  );
}
