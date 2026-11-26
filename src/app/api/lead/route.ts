import { NextResponse } from "next/server";
import { clean, saveSubmission } from "@/lib/submissions";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  // Honeypot: real users never fill the hidden "website" field.
  if (body && typeof body === "object" && (body as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true });
  }

  const result = clean(body, {
    name: { required: true, max: 120 },
    email: { required: true, max: 200, email: true },
    company: { required: true, max: 160 },
    segment: { required: true, max: 40 },
    needs: { list: true, required: true },
    volume: { max: 40 },
    timeline: { max: 40 },
    details: { max: 3000 },
  });
  if (!result.ok) return NextResponse.json(result, { status: 400 });

  await saveSubmission("leads", result.data);
  return NextResponse.json({ ok: true });
}
