import Link from "next/link";
import Hero from "@/components/Hero";

export default function NotFound() {
  return (
    <Hero compact kicker="404" title="This page wandered off." sub="It may have moved, or it hasn't been built yet.">
      <Link href="/" className="btn btn-o">Back to home</Link>
    </Hero>
  );
}
