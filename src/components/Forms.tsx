"use client";

import Link from "next/link";
import { useState } from "react";
import { expertAreas, services } from "@/lib/content";

type Status = { kind: "idle" | "sending" | "ok" | "err"; text?: string };

async function submit(url: string, payload: Record<string, unknown>): Promise<Status> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.ok) return { kind: "err", text: json.error || "Something went wrong. Please try again." };
    return { kind: "ok" };
  } catch {
    return { kind: "err", text: "Network error. Please try again." };
  }
}

function useChips(initial: string[] = []) {
  const [sel, setSel] = useState<string[]>(initial);
  const toggle = (v: string) => setSel((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));
  return { sel, toggle };
}

export function LeadForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const needs = useChips([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    if (needs.sel.length === 0) return setStatus({ kind: "err", text: "Pick at least one thing you need." });
    setStatus({ kind: "sending" });
    setStatus(await submit("/api/lead", { ...f, needs: needs.sel }));
  }

  if (status.kind === "ok")
    return <div className="msg ok"><b>Thanks, we&apos;ve got it.</b> We&apos;ll reply within one business day.</div>;

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <label>Name<input name="name" required autoComplete="name" /></label>
      <label>Work email<input name="email" type="email" required autoComplete="email" /></label>
      <label>Company<input name="company" required autoComplete="organization" /></label>
      <label>I&apos;m from
        <select name="segment" defaultValue="An AI lab">
          <option>An AI lab</option><option>An enterprise</option><option>An AI startup</option><option>Other</option>
        </select>
      </label>
      <div className="full" style={{ display: "grid", gap: 8 }}>
        <span style={{ fontSize: 13.5, fontWeight: 600 }}>What do you need?</span>
        <div className="chips">
          {services.map((s) => (
            <button type="button" key={s.slug} className={`chip${needs.sel.includes(s.name) ? " on" : ""}`}
              aria-pressed={needs.sel.includes(s.name)} onClick={() => needs.toggle(s.name)}>
              {s.name}
            </button>
          ))}
        </div>
      </div>
      <label>Volume
        <select name="volume" defaultValue="Pilot"><option>Pilot</option><option>Ongoing</option><option>Not sure yet</option></select>
      </label>
      <label>Timeline
        <select name="timeline" defaultValue="This quarter"><option>This month</option><option>This quarter</option><option>Exploring</option></select>
      </label>
      <label className="full">Details<textarea name="details" rows={4} placeholder="What are you training or deploying?" /></label>
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden />
      {status.kind === "err" && <div className="full msg err">{status.text}</div>}
      <div className="full">
        <button className="btn btn-o" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Sending…" : "Send →"}
        </button>
      </div>
    </form>
  );
}

export function ApplyForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const areas = useChips([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const f = Object.fromEntries(fd);
    if (areas.sel.length === 0) return setStatus({ kind: "err", text: "Pick at least one area." });
    if (!fd.get("consent")) return setStatus({ kind: "err", text: "Please agree to the privacy notice to apply." });
    setStatus({ kind: "sending" });
    setStatus(await submit("/api/apply", { ...f, areas: areas.sel, consent: true }));
  }

  if (status.kind === "ok")
    return (
      <div className="msg ok">
        <b>Application received.</b> We&apos;ll email you next steps, including a short skills test, within a few days.
      </div>
    );

  return (
    <form className="form" onSubmit={onSubmit} noValidate style={{ maxWidth: 760 }}>
      <label>Full name<input name="name" required autoComplete="name" /></label>
      <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      <label>City<input name="city" required placeholder="e.g. Indore" autoComplete="address-level2" /></label>
      <label>Hours per week
        <select name="hours" defaultValue="10–20"><option>Under 10</option><option>10–20</option><option>20–30</option><option>30+</option></select>
      </label>
      <div className="full" style={{ display: "grid", gap: 8 }}>
        <span style={{ fontSize: 13.5, fontWeight: 600 }}>Your areas</span>
        <div className="chips">
          {expertAreas.map((a) => (
            <button type="button" key={a} className={`chip${areas.sel.includes(a) ? " on" : ""}`}
              aria-pressed={areas.sel.includes(a)} onClick={() => areas.toggle(a)}>
              {a}
            </button>
          ))}
        </div>
      </div>
      <label className="full">Languages you work in<input name="languages" placeholder="Hindi, Marathi, English" /></label>
      <label className="full">Short background<textarea name="background" rows={4} required placeholder="Degree, experience, anything relevant" /></label>
      <label className="full check">
        <input type="checkbox" name="consent" value="yes" />
        <span>
          I agree to Xiteon processing my personal data to assess my application, as described in the{" "}
          <Link href="/privacy">privacy notice</Link>.
        </span>
      </label>
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden />
      {status.kind === "err" && <div className="full msg err">{status.text}</div>}
      <div className="full">
        <button className="btn btn-o" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Submitting…" : "Submit application"}
        </button>
      </div>
    </form>
  );
}
