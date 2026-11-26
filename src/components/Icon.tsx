import type { IconName } from "@/lib/content";

const paths: Record<IconName, React.ReactNode> = {
  screen: (<><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M7 9h5M7 13h10" /></>),
  person: (<><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>),
  chart: <path d="M4 19V5M4 19h16M8 15l3-4 3 2 5-6" />,
  shield: (<><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></>),
  lines: <path d="M4 6h16M4 12h10M4 18h7" />,
  check: <path d="M5 12l4 4L19 6" />,
  language: (<><path d="M4 5h9M8.5 3v2M6 5c0 4 3 7 6 8M11 5c0 3-3 7-7 8" /><path d="M13 21l4-9 4 9M14.5 18h5" /></>),
  flask: <path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3" />,
  eye: (<><circle cx="12" cy="12" r="3" /><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /></>),
  doc: (<><path d="M6 3h9l4 4v14H6z" /><path d="M9 12h7M9 16h7" /></>),
  lock: (<><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></>),
};

export default function Icon({ name, tone = "lime" }: { name: IconName; tone?: "lime" | "orange" }) {
  return (
    <div className={`ico${tone === "orange" ? " o" : ""}`} aria-hidden>
      <svg viewBox="0 0 24 24">{paths[name]}</svg>
    </div>
  );
}
