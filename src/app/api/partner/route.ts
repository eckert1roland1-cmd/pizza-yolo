import { NextResponse } from "next/server";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site-config";
import {
  partnerApplicationHtml,
  partnerApplicationText,
  type PartnerApplication,
} from "@/lib/partner-email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MODES = ["own", "in-store"] as const;

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  // Honeypot: valódi látogató soha nem látja ezt a mezőt, a botok kitöltik.
  if (text(body?.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const mode = MODES.includes(body?.mode) ? (body.mode as PartnerApplication["mode"]) : null;
  const name = text(body?.name, 120);
  const location = text(body?.location, 160);
  const phone = text(body?.phone, 40);
  const email = text(body?.email, 160);
  const message = text(body?.message, 2000);

  if (!mode) {
    return NextResponse.json({ error: "Válaszd ki, melyik konstrukció érdekel." }, { status: 400 });
  }
  if (!name || !location) {
    return NextResponse.json({ error: "A név és a helyszín kell." }, { status: 400 });
  }
  if (phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json({ error: "Adj meg egy elérhető telefonszámot." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Adj meg egy érvényes e-mail címet." }, { status: 400 });
  }
  if (body?.consent !== true) {
    return NextResponse.json(
      { error: "A kapcsolatfelvételhez a hozzájárulásod kell." },
      { status: 400 }
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("Partner application failed: BREVO_API_KEY is not configured.");
    return NextResponse.json(
      { error: "A jelentkezés most nem elérhető. Írj a info@pizzayolo.eu címre." },
      { status: 503 }
    );
  }

  const application: PartnerApplication = { mode, name, location, phone, email, message };

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "content-type": "application/json", "api-key": apiKey },
    body: JSON.stringify({
      sender: { name: SITE_NAME, email: CONTACT_EMAIL },
      to: [{ email: CONTACT_EMAIL }],
      replyTo: { email, name },
      subject: `Partner jelentkezés — ${name} (${location})`,
      htmlContent: partnerApplicationHtml(application),
      textContent: partnerApplicationText(application),
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Brevo partner email failed:", res.status, detail);
    return NextResponse.json({ error: "Valami félrement. Próbáld újra." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
