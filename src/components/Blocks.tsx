import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { tiers, type Service } from "@/lib/content";

export function ServiceCard({ s, i = 0 }: { s: Service; i?: number }) {
  return (
    <Link href={`/services/${s.slug}`} className="card">
      <Icon name={s.icon} tone={i % 2 === 0 ? "orange" : "lime"} />
      <h3>{s.name}</h3>
      <p>{s.short}</p>
      <span className="more">Learn more →</span>
    </Link>
  );
}

export function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="steps">
      {items.map((it, i) => (
        <div key={it.title}>
          <b>{String(i + 1).padStart(2, "0")}</b>
          <h4>{it.title}</h4>
          <p>{it.body}</p>
        </div>
      ))}
    </div>
  );
}

export function TierLadder({ pay = false }: { pay?: boolean }) {
  return (
    <div className="ladder">
      {tiers.map((t, i) => (
        <div key={t.name}>
          <h4>{t.name}</h4>
          <p>{t.body}</p>
          {pay && <p style={{ marginTop: 10 }}>Pay <span className="ph">[range]</span></p>}
          <small>Tier {i + 1}</small>
        </div>
      ))}
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({
  title = "Ready to build AI that works?",
  body = "Tell us what you're training or deploying. We'll scope a pilot.",
  href = "/contact",
  label = "Talk to Us →",
}: {
  title?: string;
  body?: string;
  href?: string;
  label?: string;
}) {
  return (
    <Reveal className="sec white center">
      <div className="wrap">
        <h2>{title}</h2>
        <p className="intro">{body}</p>
        <Link href={href} className="btn btn-o">{label}</Link>
      </div>
    </Reveal>
  );
}

export const pipeline = [
  { title: "Recruit", body: "Source and skills-test experts for your exact domain and language." },
  { title: "Train", body: "Calibrate on your rubric with gold-standard examples." },
  { title: "Produce", body: "Tiered teams deliver at the volume and pace you need." },
  { title: "Verify", body: "Multi-tier review, agreement scoring and spot audits." },
];
