import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { CtaBand, Faq, pipeline, Steps } from "@/components/Blocks";
import { getService, services } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  return s ? { title: s.name, description: s.intro } : {};
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <Hero compact kicker={s.kicker} title={s.headline} sub={s.intro}>
        <Link href="/contact" className="btn btn-o">{s.cta} →</Link>
      </Hero>

      <Reveal className="sec white">
        <div className="wrap">
          <div className="kicker">What&apos;s included</div>
          <h2>What you get</h2>
          <div className="grid" style={{ marginTop: 28 }}>
            {s.included.map((it, i) => (
              <div key={it.title} className="card hover">
                <Icon name={it.icon} tone={i % 2 === 0 ? "orange" : "lime"} />
                <h3>{it.title}</h3>
                <p>{it.body}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 28, fontWeight: 600 }}>Built for</p>
          <div className="pills">{s.forWho.map((w) => <span key={w} className="pill">{w}</span>)}</div>
        </div>
      </Reveal>

      <Reveal className="sec ink">
        <div className="wrap">
          <div className="kicker">How we deliver</div>
          <h2>Quality built into every step</h2>
          <Steps items={pipeline} />
        </div>
      </Reveal>

      <Reveal className="sec">
        <div className="wrap">
          <div className="kicker">FAQ</div>
          <h2>Common questions</h2>
          <Faq items={s.faq} />
        </div>
      </Reveal>

      <Reveal className="sec white">
        <div className="wrap">
          <div className="kicker">Related</div>
          <h2>Other services</h2>
          <div className="pills" style={{ marginTop: 18 }}>
            {others.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}`} className="chip">{o.name}</Link>
            ))}
          </div>
        </div>
      </Reveal>

      <CtaBand title={`Start with ${s.name}`} label={`${s.cta} →`} />
    </>
  );
}
