export function Blobs({ variant = "default" }: { variant?: "default" | "warm" | "cool" }) {
  return (
    <div className="blobs" aria-hidden>
      {variant !== "warm" && <div className="blob b1" />}
      {variant !== "cool" && <div className="blob b2" />}
      <div className="blob b3" />
      {variant === "warm" && <div className="blob b1" style={{ background: "var(--peach)" }} />}
      <div className="grain" />
    </div>
  );
}

export default function Hero({
  kicker,
  title,
  sub,
  children,
  compact,
  variant,
}: {
  kicker?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  children?: React.ReactNode;
  compact?: boolean;
  variant?: "default" | "warm" | "cool";
}) {
  return (
    <section className={`hero${compact ? " compact" : ""}`}>
      <Blobs variant={variant} />
      <div className="wrap">
        {kicker && <div className="kicker">{kicker}</div>}
        <h1>{title}</h1>
        {sub && <p className="sub">{sub}</p>}
        {children && <div className="row">{children}</div>}
      </div>
    </section>
  );
}
