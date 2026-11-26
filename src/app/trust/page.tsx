import type { Metadata } from "next";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { CtaBand, Faq } from "@/components/Blocks";
import type { IconName } from "@/lib/content";

export const metadata: Metadata = {
  title: "Trust & Security",
  description: "How Xiteon protects client data, models and IP across a distributed workforce.",
};

const pillars: { title: string; body: React.ReactNode; icon: IconName }[] = [
  { title: "Secure workspaces", body: "Virtual desktops, restricted devices and monitored sessions on request.", icon: "lock" },
  { title: "Vetted people", body: "Background checks, NDAs and IP assignment for every worker.", icon: "person" },
  { title: "Data protection", body: "Handling aligned with India's DPDP Act and GDPR. Data minimization and redaction by default.", icon: "doc" },
  { title: "Certifications", body: <span className="ph">[ISO 27001 / SOC 2 when achieved]</span>, icon: "shield" },
];

export default function TrustPage() {
  return (
    <>
      <section className="sec ink" style={{ paddingTop: 110, paddingBottom: 96 }}>
        <div className="wrap">
          <div className="kicker">Trust center</div>
          <h1 className="h-display" style={{ color: "#fff" }}>Your data stays yours.</h1>
          <p className="intro" style={{ fontSize: 18 }}>How we protect client data, models and IP across a distributed workforce.</p>
          <span className="ph" style={{ background: "rgba(185,230,47,.15)", color: "var(--lime)", borderColor: "var(--lime)" }}>
            [Security overview PDF: add when ready]
          </span>
        </div>
      </section>

      <Reveal className="sec white">
        <div className="wrap grid">
          {pillars.map((p, i) => (
            <div key={p.title} className="card hover">
              <Icon name={p.icon} tone={i % 2 === 0 ? "orange" : "lime"} />
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="sec">
        <div className="wrap">
          <div className="kicker">Details</div>
          <h2>Security questions</h2>
          <Faq
            items={[
              { q: "Where is client data stored?", a: "In your environment or in the cloud region you choose. We don't move data out of the agreed region." },
              { q: "Can workers download client data?", a: "Not on secure projects. Work happens inside controlled environments with downloads, copy-paste and screenshots restricted." },
              { q: "Who owns the work product?", a: "You do. Every worker signs an IP assignment, and we never reuse one client's data for another." },
              { q: "How do you handle personal data?", a: "We minimize it, redact it where possible, and process it only for the agreed purpose under a data processing agreement." },
            ]}
          />
        </div>
      </Reveal>

      <CtaBand title="Have a security questionnaire?" body="Send it over. We'll complete it as part of scoping." label="Contact us →" />
    </>
  );
}
