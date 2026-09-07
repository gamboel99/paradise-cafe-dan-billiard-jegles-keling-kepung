import { NextResponse } from "next/server";
import { configuredAdmin, setAdminCookie, validPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!configuredAdmin()) return NextResponse.json({ error: "ADMIN_PASSWORD belum dikonfigurasi di Vercel." }, { status: 500 });
  const body = await request.json().catch(() => ({}));
  if (!validPassword(String(body.password || ""))) return NextResponse.json({ error: "Password admin salah." }, { status: 401 });
  await setAdminCookie();
  return NextResponse.json({ ok: true });
}
