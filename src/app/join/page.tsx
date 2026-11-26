import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { Faq, TierLadder } from "@/components/Blocks";
import { ApplyForm } from "@/components/Forms";
import { expertAreas } from "@/lib/content";

export const metadata: Metadata = {
  title: "Join as Expert",
  description: "Flexible, paid remote work training AI for graduates, professionals and language experts across India.",
};

export default function JoinPage() {
  return (
    <>
      <Hero
        variant="cool"
        kicker="Work with Xiteon"
        title="Teach AI what you know. Work from home."
        sub="Flexible, paid remote work for graduates, professionals and language experts across India and beyond."
      >
        <a href="#apply" className="btn btn-o">Start your application →</a>
        <a href="#path" className="btn btn-g">How it works</a>
      </Hero>

      <Reveal className="sec white">
        <div className="wrap">
          <div className="kicker">Who we&apos;re looking for</div>
          <h2>Areas we hire for</h2>
          <p className="intro">No AI experience needed. We train you on every project.</p>
          <div className="pills">{expertAreas.map((a) => <span key={a} className="pill">{a}</span>)}</div>
        </div>
      </Reveal>

      <Reveal className="sec lime" id="path">
        <div className="wrap">
          <div className="kicker">Grow with us</div>
          <h2>A clear path up</h2>
          <p className="intro">Everyone starts with paid tasks. Promotions are based on your quality score.</p>
          <TierLadder pay />
        </div>
      </Reveal>

      <Reveal className="sec white" id="apply">
        <div className="wrap">
          <div className="kicker">Apply</div>
          <h2>Tell us about yourself</h2>
          <p className="intro">Takes about five minutes. Next comes a short skills test in your area.</p>
          <ApplyForm />
        </div>
      </Reveal>

      <Reveal className="sec">
        <div className="wrap">
          <div className="kicker">FAQ</div>
          <h2>Questions from applicants</h2>
          <Faq
            items={[
              { q: "Do I need a technical background?", a: "No. Many roles need subject or language knowledge, not coding. We train you on each project's guidelines." },
              { q: "What equipment do I need?", a: "A laptop or desktop, a stable internet connection and a quiet place to work. Some projects require extra security steps." },
              { q: "How and when am I paid?", a: "Payment terms are shared when you're offered a project. Pay depends on your tier and the project." },
              { q: "Can I choose my hours?", a: "Yes, within each project's weekly minimum." },
            ]}
          />
        </div>
      </Reveal>
    </>
  );
}
