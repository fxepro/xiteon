import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Temporary storage for form submissions: appends one JSON line per entry to
 * ./data/<kind>.jsonl (git-ignored). Fine for local dev and a single server.
 * Replace with a real database or CRM/ATS before production; serverless hosts
 * such as Vercel have no persistent disk.
 */
export async function saveSubmission(kind: "leads" | "applications", data: Record<string, unknown>) {
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  const line = JSON.stringify({ ...data, receivedAt: new Date().toISOString() }) + "\n";
  await appendFile(path.join(dir, `${kind}.jsonl`), line, "utf8");
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Trims strings and enforces required fields and length limits. */
export function clean(
  body: unknown,
  spec: Record<string, { required?: boolean; max?: number; email?: boolean; list?: boolean }>
): { ok: true; data: Record<string, string | string[]> } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid request." };
  const src = body as Record<string, unknown>;
  const out: Record<string, string | string[]> = {};

  for (const [key, rule] of Object.entries(spec)) {
    const raw = src[key];
    if (rule.list) {
      const arr = Array.isArray(raw) ? raw.filter((v) => typeof v === "string").map((v) => v.trim().slice(0, 60)) : [];
      if (rule.required && arr.length === 0) return { ok: false, error: `Please choose at least one option for ${key}.` };
      out[key] = arr.slice(0, 12);
      continue;
    }
    const val = typeof raw === "string" ? raw.trim() : "";
    if (rule.required && !val) return { ok: false, error: `Please fill in ${key}.` };
    if (val.length > (rule.max ?? 200)) return { ok: false, error: `${key} is too long.` };
    if (rule.email && val && !EMAIL.test(val)) return { ok: false, error: "Please enter a valid email address." };
    out[key] = val;
  }
  return { ok: true, data: out };
}
