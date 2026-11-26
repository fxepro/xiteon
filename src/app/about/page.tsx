import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { CtaBand } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "About",
  description: "Xiteon does the human work behind frontier and enterprise AI.",
};

export default function AboutPage() {
  return (
    <>
      <Hero
        compact
        variant="warm"
        kicker="About Xiteon"
        title="The human work behind AI that works."
        sub="We believe the best AI is built with expert human judgment, and that the people doing that work deserve real careers."
      />

      <Reveal className="sec white">
        <div className="wrap prose">
          <h2>What we do</h2>
          <p>
            Xiteon recruits, trains and manages expert and generalist talent, then uses that talent to build the data,
            training environments and evaluations that AI labs and enterprises need.
          </p>
          <h2>How we&apos;re different</h2>
          <p>
            We focus on depth over breadth: specific domains, Indian languages and quality you can measure. Our
            workforce is based across India&apos;s smaller cities, with a clear path from first task to expert role.
          </p>
          <h2>Team</h2>
          <p><span className="ph">[Founders and leadership: photos, names, short bios]</span></p>
          <h2>Where we are</h2>
          <p><span className="ph">[Registered office and city]</span></p>
        </div>
      </Reveal>

      <CtaBand />
    </>
  );
}
