import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { CtaBand, ServiceCard, Steps } from "@/components/Blocks";
import { audiences, getAudience, getService, type Service } from "@/lib/content";

type Props = { params: Promise<{ audience: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return audiences.map((a) => ({ audience: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getAudience((await params).audience);
  return a ? { title: a.name, description: a.intro } : {};
}

export default async function SolutionPage({ params }: Props) {
  const a = getAudience((await params).audience);
  if (!a) notFound();
  const list = a.serviceSlugs.map(getService).filter((s): s is Service => Boolean(s));

  return (
    <>
      <Hero compact variant="warm" kicker={a.name} title={a.headline} sub={a.intro}>
        <Link href="/contact" className="btn btn-o">{a.cta} →</Link>
      </Hero>

      <Reveal className="sec white">
        <div className="wrap">
          <div className="kicker">The problem</div>
          <h2>What gets in the way</h2>
          <div className="grid" style={{ marginTop: 28 }}>
            {a.problems.map((p) => (
              <div key={p.title} className="card"><h3 style={{ marginTop: 0 }}>{p.title}</h3><p>{p.body}</p></div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="sec">
        <div className="wrap">
          <div className="kicker">What we deliver</div>
          <h2>Services for {a.navLabel}</h2>
          <p className="intro">Pick one to start. Most clients begin with a small pilot.</p>
          <div className="grid">{list.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}</div>
        </div>
      </Reveal>

      <Reveal className="sec ink">
        <div className="wrap">
          <div className="kicker">Engagement</div>
          <h2>Pilot in weeks, scale on proof</h2>
          <Steps
            items={[
              { title: "Scope", body: "Define the task, rubric and quality bar together." },
              { title: "Pilot", body: "A small batch with full quality reporting." },
              { title: "Scale", body: "Ramp team size to your weekly volume." },
            ]}
          />
        </div>
      </Reveal>

      <Reveal className="sec white">
        <div className="wrap">
          <div className="kicker">Case study</div>
          <h2><span className="ph">[First pilot result, anonymized]</span></h2>
          <p className="intro">Added once a real pilot is complete.</p>
        </div>
      </Reveal>

      <CtaBand />
    </>
  );
}
