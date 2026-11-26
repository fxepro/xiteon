import { NextResponse } from "next/server";
import { clean, saveSubmission } from "@/lib/submissions";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (body && typeof body === "object" && (body as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true });
  }
  if (!body || (body as Record<string, unknown>).consent !== true) {
    return NextResponse.json({ ok: false, error: "Please agree to the privacy notice to apply." }, { status: 400 });
  }

  const result = clean(body, {
    name: { required: true, max: 120 },
    email: { required: true, max: 200, email: true },
    city: { required: true, max: 120 },
    areas: { list: true, required: true },
    languages: { max: 200 },
    hours: { max: 20 },
    background: { required: true, max: 3000 },
  });
  if (!result.ok) return NextResponse.json(result, { status: 400 });

  await saveSubmission("applications", { ...result.data, consent: true });
  return NextResponse.json({ ok: true });
}
