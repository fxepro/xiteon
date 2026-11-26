"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { audiences, services } from "@/lib/content";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState<string | null>(null);
  const pathname = usePathname();

  // Close menus on route change.
  useEffect(() => {
    setOpen(false);
    setDd(null);
  }, [pathname]);

  const toggle = (name: string) => setDd((cur) => (cur === name ? null : name));

  return (
    <header className={`nav${open ? " open" : ""}`}>
      <div className="wrap nav-inner">
        <Link href="/" className="logo" aria-label="Xiteon home">
          <span className="logo-dot" aria-hidden />
          XITEON
        </Link>

        <ul className="nav-links">
          <li className={`has-dd${dd === "solutions" ? " open" : ""}`}>
            <button aria-expanded={dd === "solutions"} onClick={() => toggle("solutions")}>
              Solutions <span className="caret">▼</span>
            </button>
            <div className="dd">
              {audiences.map((a) => (
                <Link key={a.slug} href={`/solutions/${a.slug}`}>
                  <b>{a.name}</b>
                  <span>{a.intro.split(".")[0]}.</span>
                </Link>
              ))}
            </div>
          </li>
          <li className={`has-dd${dd === "services" ? " open" : ""}`}>
            <button aria-expanded={dd === "services"} onClick={() => toggle("services")}>
              Services <span className="caret">▼</span>
            </button>
            <div className="dd">
              {services.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`}>
                  <b>{s.name}</b>
                  <span>{s.short}</span>
                </Link>
              ))}
            </div>
          </li>
          <li><Link href="/impact">Impact</Link></li>
          <li><Link href="/trust">Trust &amp; Security</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>

        <div className="nav-cta">
          <Link href="/join" className="btn btn-g">Join as Expert</Link>
          <Link href="/contact" className="btn btn-o">Talk to Us</Link>
        </div>

        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
