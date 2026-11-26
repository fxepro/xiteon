import type { Metadata } from "next";
import { Blobs } from "@/components/Hero";
import { LeadForm } from "@/components/Forms";

export const metadata: Metadata = {
  title: "Talk to Us",
  description: "Tell us what you're training or deploying and we'll scope a pilot.",
};

export default function ContactPage() {
  return (
    <section className="hero compact" style={{ paddingBottom: 100 }}>
      <Blobs variant="cool" />
      <div className="wrap" style={{ display: "grid", gap: 48, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", alignItems: "start" }}>
        <div>
          <div className="kicker">Talk to us</div>
          <h1>Let&apos;s scope your pilot.</h1>
          <p className="sub">Tell us what you&apos;re training or deploying. We reply within one business day.</p>
          <div className="card" style={{ maxWidth: 360 }}>
            <h3 style={{ marginTop: 0 }}>Prefer to talk?</h3>
            <p>Book a 30-minute call directly.</p>
            <p style={{ marginTop: 14 }}><span className="ph">[calendar booking link]</span></p>
          </div>
        </div>
        <div className="card" style={{ padding: 30 }}>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
