"use client";

import { useEffect, useRef } from "react";

/** Fades its content up when it scrolls into view. */
export default function Reveal({
  children,
  as: Tag = "section",
  className = "",
  id,
}: {
  children: React.ReactNode;
  as?: "section" | "div";
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} id={id} className={`reveal ${className}`.trim()}>
      {children}
    </Tag>
  );
}
