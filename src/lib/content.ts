// Single source of truth for site copy that appears in more than one place
// (nav dropdowns, footer, cards, dynamic routes).

export type IconName =
  | "screen"
  | "person"
  | "chart"
  | "shield"
  | "lines"
  | "check"
  | "language"
  | "flask"
  | "eye"
  | "doc"
  | "lock";

export type Service = {
  slug: string;
  name: string;
  short: string;
  icon: IconName;
  kicker: string;
  headline: string;
  intro: string;
  cta: string;
  included: { title: string; body: string; icon: IconName }[];
  forWho: string[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "rl-environments",
    name: "RL Environments",
    short: "Realistic business sandboxes and graded tasks for training agents.",
    icon: "screen",
    kicker: "RL Environments & Agent Tasks",
    headline: "Sandboxes where AI agents learn real work.",
    intro:
      "We build realistic software environments, multi-step tasks and automatic graders so your agents can practise, and be scored on, the work your customers actually do.",
    cta: "Scope an environment",
    included: [
      { title: "Environments", body: "Mock CRMs, ERPs, spreadsheets, browsers and support desks filled with realistic data.", icon: "screen" },
      { title: "Task sets", body: "Hard but checkable multi-step tasks written by domain experts.", icon: "lines" },
      { title: "Graders", body: "Reward functions that score results automatically, backed by human spot-checks.", icon: "check" },
      { title: "Refresh cycles", body: "New and harder tasks as your models saturate the old ones.", icon: "chart" },
    ],
    forWho: ["Frontier AI labs", "Agent startups", "Orchestration platforms"],
    faq: [
      { q: "Which domains do you cover?", a: "We start deep in finance and back-office operations and expand with demand." },
      { q: "Can we host the environments ourselves?", a: "Yes. Environments ship as containers you can run in your own infrastructure." },
      { q: "How are graders validated?", a: "Every grader is checked against human judgments on a sample of agent runs before delivery." },
    ],
  },
  {
    slug: "expert-data",
    name: "Expert Data",
    short: "Hard prompts, rankings and reasoning traces from vetted experts.",
    icon: "person",
    kicker: "Expert Data",
    headline: "Experts your models can't fool.",
    intro:
      "Vetted domain experts write the questions today's best models get wrong, rank and critique outputs, and produce step-by-step reasoning your models can learn from.",
    cta: "Talk to us about expert data",
    included: [
      { title: "Hard prompts", body: "Questions designed to break current frontier models.", icon: "flask" },
      { title: "Preference data", body: "Calibrated rankings and written critiques (RLHF).", icon: "check" },
      { title: "Reasoning traces", body: "Step-by-step expert solutions to hard problems.", icon: "lines" },
      { title: "Red-teaming", body: "Experts probing for unsafe or wrong behaviour.", icon: "shield" },
    ],
    forWho: ["Frontier AI labs", "Vertical AI startups", "Enterprise model teams"],
    faq: [
      { q: "How do you vet experts?", a: "Credential checks, domain skills tests and calibration on gold-standard examples before any paid work." },
      { q: "Which fields do you cover?", a: "Indian languages, software engineering, medicine, law, finance and STEM research, with more added on request." },
      { q: "How do you keep quality consistent?", a: "Multi-tier review, agreement scoring between experts and regular spot audits." },
    ],
  },
  {
    slug: "evals",
    name: "Evals & Red Teaming",
    short: "Find out what your model or agent really can and can't do.",
    icon: "chart",
    kicker: "Evals & Red Teaming",
    headline: "Know what your AI can really do.",
    intro:
      "Custom evaluation sets and expert red-teaming that measure capability and safety on the tasks that matter to you, not just public benchmarks.",
    cta: "Design an eval",
    included: [
      { title: "Custom eval sets", body: "Task suites built around your product and your users.", icon: "doc" },
      { title: "Human grading", body: "Expert scoring where automatic metrics fall short.", icon: "person" },
      { title: "Red-teaming", body: "Structured attacks on safety, privacy and policy.", icon: "shield" },
      { title: "Reporting", body: "Clear findings with examples, trends and fixes.", icon: "chart" },
    ],
    forWho: ["AI labs", "Enterprises", "AI startups"],
    faq: [
      { q: "Can evals run on every release?", a: "Yes. We keep a held-out set and re-run it on each model or prompt change." },
      { q: "Do you test in Indian languages?", a: "Yes, with native-speaker evaluators across major Indian languages." },
      { q: "Who owns the eval data?", a: "You do. Eval sets are delivered to you and never reused for other clients." },
    ],
  },
  {
    slug: "deployment-readiness",
    name: "Deployment Readiness",
    short: "Guardrail checks, live review and audit trails for enterprise agents.",
    icon: "shield",
    kicker: "AI Deployment Readiness",
    headline: "Make your AI agents safe to launch, and keep them working.",
    intro:
      "Most agent projects stall on guardrails, integration and compliance, not on the model. We close that gap with human testing before launch and human review after it.",
    cta: "Book a readiness review",
    included: [
      { title: "Pre-launch testing", body: "Scenario suites, edge cases and red-teaming for your agent.", icon: "flask" },
      { title: "Guardrail checks", body: "Verify that permissions, policies and filters actually hold.", icon: "shield" },
      { title: "Live human review", body: "Trained reviewers check flagged agent actions every day.", icon: "eye" },
      { title: "Audit evidence", body: "Reports ready for compliance teams and regulators.", icon: "doc" },
    ],
    forWho: ["Enterprises deploying agents", "Consultancies and integrators", "Orchestration platforms"],
    faq: [
      { q: "Which agent platforms do you work with?", a: "We test the agent's behaviour, not the platform, so we work with any stack you use." },
      { q: "Can reviewers work inside our secure environment?", a: "Yes. Reviewers can work through your virtual desktops and access controls." },
      { q: "How fast can a review start?", a: "A readiness review typically starts within two weeks of scoping." },
    ],
  },
  {
    slug: "indic-data",
    name: "Indic Language Data",
    short: "Prompts, speech and evals across Indian languages.",
    icon: "language",
    kicker: "Indic Language Data",
    headline: "AI that works in the languages India speaks.",
    intro:
      "Native speakers across India create and check text, speech and evaluation data so your models work beyond English.",
    cta: "Discuss your languages",
    included: [
      { title: "Text and prompts", body: "Natural prompts and answers written by native speakers.", icon: "lines" },
      { title: "Speech data", body: "Recording and transcription across accents and dialects.", icon: "person" },
      { title: "Translation checks", body: "Review of machine translation for meaning and tone.", icon: "check" },
      { title: "Language evals", body: "Measure model quality language by language.", icon: "chart" },
    ],
    forWho: ["AI labs", "Voice and assistant teams", "Indian enterprises"],
    faq: [
      { q: "Which languages do you support?", a: "Hindi, Marathi, Bengali, Tamil, Telugu, Kannada, Gujarati and more, growing with demand." },
      { q: "Do you cover dialects and code-mixing?", a: "Yes. We recruit by region so data reflects how people actually speak, including Hinglish." },
      { q: "How is consent handled for speech?", a: "Every speaker gives informed consent and is paid fairly for their recordings." },
    ],
  },
];

export type Audience = {
  slug: string;
  name: string;
  navLabel: string;
  headline: string;
  intro: string;
  problems: { title: string; body: string }[];
  serviceSlugs: string[];
  cta: string;
};

export const audiences: Audience[] = [
  {
    slug: "ai-labs",
    name: "For AI Labs",
    navLabel: "AI Labs",
    headline: "Harder tasks. Better graders. Experts your models can't fool.",
    intro: "Frontier-grade data and environments, from domains and languages other vendors cover thinly.",
    problems: [
      { title: "Models saturate easy tasks", body: "You need questions that today's best model gets wrong." },
      { title: "Experts are hard to find", body: "Especially in niche fields and non-English languages." },
      { title: "Quality drifts at scale", body: "Without layered review, error rates creep up quietly." },
    ],
    serviceSlugs: ["rl-environments", "expert-data", "evals", "indic-data"],
    cta: "Scope a pilot",
  },
  {
    slug: "enterprises",
    name: "For Enterprises",
    navLabel: "Enterprises",
    headline: "Launch AI agents your risk team can sign off on.",
    intro: "Testing, guardrail checks and human review that get agent projects out of pilot and into production.",
    problems: [
      { title: "Pilots that never ship", body: "Integration, data residency and guardrail gaps stall launches for months." },
      { title: "No in-house eval skills", body: "Few teams know how to test an agent properly." },
      { title: "Growing compliance pressure", body: "Regulators expect evidence that AI is tested and supervised." },
    ],
    serviceSlugs: ["deployment-readiness", "evals", "indic-data"],
    cta: "Book a readiness review",
  },
  {
    slug: "ai-startups",
    name: "For AI Startups",
    navLabel: "AI Startups",
    headline: "Expert data for AI built for one industry.",
    intro: "Domain experts who check your outputs, build your evals and help you prove quality to customers.",
    problems: [
      { title: "Generic data won't cut it", body: "Your product lives or dies on expert-level accuracy." },
      { title: "Experts are expensive to hire", body: "You need them part-time, on demand." },
      { title: "Customers want proof", body: "Buyers ask how you measure quality before they sign." },
    ],
    serviceSlugs: ["expert-data", "evals", "rl-environments"],
    cta: "Talk to us",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const getAudience = (slug: string) => audiences.find((a) => a.slug === slug);

export const expertAreas = [
  "Indian languages",
  "Software engineering",
  "Medicine",
  "Law",
  "Finance & accounting",
  "STEM research",
  "Logistics",
  "Generalist QA",
];

export const tiers = [
  { name: "Contributor", body: "Start with rubric-based tasks, QA and language work." },
  { name: "Reviewer", body: "Promoted on quality score. Check work, write rubrics, coach teams." },
  { name: "Domain expert", body: "Design tasks, graders and reasoning traces. Lead projects." },
];
