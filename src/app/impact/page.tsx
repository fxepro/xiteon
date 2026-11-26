import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { TierLadder } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Impact",
  description: "Fair pay, real training and a path upward for AI talent across India's smaller cities.",
};

export default function ImpactPage() {
  return (
    <>
      <Hero
        kicker="Impact"
        title="AI work that builds careers, not just datasets."
        sub="Fair pay, real training and a path upward for talent across India's smaller cities."
      >
        <Link href="/join" className="btn btn-o">Join as Expert →</Link>
      </Hero>

      <Reveal className="sec white">
        <div className="wrap grid">
          <div className="card"><div className="stat"><span className="ph">[#]</span></div><h3>Cities</h3><p>Where our contributors live and work.</p></div>
          <div className="card"><div className="stat"><span className="ph">[%]</span></div><h3>Women contributors</h3><p>Including those returning to work.</p></div>
          <div className="card"><div className="stat"><span className="ph">[#]</span></div><h3>Promotions</h3><p>From contributor to reviewer or expert.</p></div>
        </div>
      </Reveal>

      <Reveal className="sec">
        <div className="wrap">
          <div className="kicker">Our approach</div>
          <h2>What we commit to</h2>
          <div className="grid" style={{ marginTop: 28 }}>
            <div className="card"><h3 style={{ marginTop: 0 }}>Fair, transparent pay</h3><p>Clear rates for every tier, paid on time.</p></div>
            <div className="card"><h3 style={{ marginTop: 0 }}>Real training</h3><p>Every project starts with paid calibration and feedback.</p></div>
            <div className="card"><h3 style={{ marginTop: 0 }}>Promotion on merit</h3><p>Quality scores, not tenure, decide who moves up.</p></div>
            <div className="card"><h3 style={{ marginTop: 0 }}>Work from home</h3><p>Opportunities that don&apos;t require moving to a metro.</p></div>
          </div>
        </div>
      </Reveal>

      <Reveal className="sec lime">
        <div className="wrap">
          <div className="kicker">The ladder</div>
          <h2>Three tiers, one direction: up</h2>
          <p className="intro">Contributors grow into reviewers and domain experts, and some go on to roles with our clients.</p>
          <TierLadder />
        </div>
      </Reveal>

      <Reveal className="sec white">
        <div className="wrap">
          <div className="kicker">Stories</div>
          <h2>Meet the people behind the data</h2>
          <p className="intro">Profiles and quotes from real contributors, shared with their consent. <span className="ph">[add later]</span></p>
        </div>
      </Reveal>
    </>
  );
}
