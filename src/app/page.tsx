import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { CtaBand, pipeline, ServiceCard, Steps, TierLadder } from "@/components/Blocks";
import { services } from "@/lib/content";

export default function Home() {
  const featured = services.filter((s) => s.slug !== "indic-data");

  return (
    <>
      <Hero
        title="Human expertise that makes frontier AI work."
        sub="Xiteon recruits, trains and manages expert talent to build the data, environments and evaluations behind the next generation of AI."
      >
        <Link href="/contact" className="btn btn-o">Talk to Us →</Link>
        <Link href="/join" className="btn btn-g">Join as an Expert</Link>
      </Hero>

      <Reveal className="sec white">
        <div className="wrap split">
          <div className="pane a">
            <div className="kicker">For AI teams</div>
            <h3>Data and evals you can trust.</h3>
            <p>Expert data, RL environments and deployment testing for labs, enterprises and AI startups.</p>
            <Link href="/solutions/ai-labs" className="btn btn-l">Explore solutions</Link>
          </div>
          <div className="pane b">
            <div className="kicker">For experts</div>
            <h3>Get paid for what you know.</h3>
            <p>Flexible remote work training AI, with a clear path from tasks to expert roles.</p>
            <Link href="/join" className="btn btn-o">Apply now</Link>
          </div>
        </div>
      </Reveal>

      <Reveal className="sec">
        <div className="wrap">
          <div className="kicker">What we do</div>
          <h2>Four ways we help AI work in the real world</h2>
          <p className="intro">One talent base, four services, quality-checked at every step. Plus native-speaker data across Indian languages.</p>
          <div className="grid">
            {featured.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}
          </div>
        </div>
      </Reveal>

      <Reveal className="sec ink">
        <div className="wrap">
          <div className="kicker">How it works</div>
          <h2>From talent to trusted data</h2>
          <p className="intro">Every project runs through the same four-step quality pipeline.</p>
          <Steps items={pipeline} />
        </div>
      </Reveal>

      <Reveal className="sec lime">
        <div className="wrap">
          <div className="kicker">Our people</div>
          <h2>Built in India, growing experts</h2>
          <p className="intro">We hire across tier-2 and tier-3 cities and promote people on the quality of their work, not their tenure.</p>
          <TierLadder />
          <p style={{ marginTop: 28 }}>
            <Link href="/impact" className="btn btn-g">Our impact →</Link>
          </p>
        </div>
      </Reveal>

      <CtaBand />
    </>
  );
}
