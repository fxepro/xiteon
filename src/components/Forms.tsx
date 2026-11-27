"use client";

import Link from "next/link";
import { useState } from "react";
import { expertAreas, services } from "@/lib/content";

type Status = { kind: "idle" | "sending" | "ok" | "err"; text?: string };

/**
 * Sends a submission to Netlify Forms. The form names and fields are
 * registered in public/__forms.html, which Netlify scans at deploy time.
 * `next dev` can't receive these posts, so in development we log and succeed.
 */
async function submit(formName: "lead" | "apply", payload: Record<string, unknown>): Promise<Status> {
  const body = new URLSearchParams({ "form-name": formName });
  for (const [k, v] of Object.entries(payload)) {
    body.append(k, Array.isArray(v) ? v.join(", ") : String(v ?? ""));
  }

  if (process.env.NODE_ENV === "development") {
    console.info(`[dev] ${formName} submission (not sent):`, Object.fromEntries(body));
    return { kind: "ok" };
  }

  try {
    const res = await fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    if (!res.ok) return { kind: "err", text: "Something went wrong. Please try again, or email us." };
    return { kind: "ok" };
  } catch {
    return { kind: "err", text: "Network error. Please try again." };
  }
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns an error message, or null when the required fields are filled. */
function missing(f: Record<string, FormDataEntryValue>, required: string[]): string | null {
  for (const key of required) {
    if (!String(f[key] ?? "").trim()) return "Please fill in all required fields.";
  }
  if (!EMAIL.test(String(f.email ?? "").trim())) return "Please enter a valid email address.";
  return null;
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
    const err = missing(f, ["name", "email", "company"]);
    if (err) return setStatus({ kind: "err", text: err });
    if (needs.sel.length === 0) return setStatus({ kind: "err", text: "Pick at least one thing you need." });
    setStatus({ kind: "sending" });
    setStatus(await submit("lead", { ...f, needs: needs.sel }));
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
    const err = missing(f, ["name", "email", "city", "background"]);
    if (err) return setStatus({ kind: "err", text: err });
    if (areas.sel.length === 0) return setStatus({ kind: "err", text: "Pick at least one area." });
    if (!fd.get("consent")) return setStatus({ kind: "err", text: "Please agree to the privacy notice to apply." });
    setStatus({ kind: "sending" });
    setStatus(await submit("apply", { ...f, areas: areas.sel, consent: "yes" }));
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
