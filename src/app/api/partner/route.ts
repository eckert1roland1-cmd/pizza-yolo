import { NextResponse } from "next/server";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site-config";
import {
  MODE_LABELS,
  TIMELINES,
  VENUE_STATUS,
  VENUE_TYPES,
  VOLUME_BANDS,
  type Option,
  type PartnerMode,
} from "@/lib/partner";
import {
  applicantConfirmationHtml,
  partnerApplicationHtml,
  partnerApplicationText,
  type PartnerApplication,
} from "@/lib/partner-email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function pick(options: Option[], value: unknown) {
  const v = text(value, 40);
  return options.some((o) => o.value === v) ? v : "";
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  // Honeypot: valódi látogató soha nem látja ezt a mezőt, a botok kitöltik.
  if (text(body?.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const mode = (["own", "in-store"] as const).includes(body?.mode)
    ? (body.mode as PartnerMode)
    : null;
  if (!mode) {
    return NextResponse.json({ error: "Válaszd ki, melyik konstrukció érdekel." }, { status: 400 });
  }

  const application: PartnerApplication = {
    mode,
    venueStatus: pick(VENUE_STATUS, body?.venueStatus),
    venueType: pick(VENUE_TYPES[mode], body?.venueType),
    location: text(body?.location, 160),
    volume: pick(VOLUME_BANDS, body?.volume),
    timeline: pick(TIMELINES, body?.timeline),
    name: text(body?.name, 120),
    company: text(body?.company, 160),
    phone: text(body?.phone, 40),
    email: text(body?.email, 160),
    message: text(body?.message, 2000),
  };

  if (!application.location || !application.venueStatus || !application.venueType) {
    return NextResponse.json({ error: "Hiányzik a helyszín néhány adata." }, { status: 400 });
  }
  if (!application.volume || !application.timeline) {
    return NextResponse.json({ error: "A forgalom és az időzítés kell az ajánlathoz." }, { status: 400 });
  }
  if (!application.name) {
    return NextResponse.json({ error: "A neved kell." }, { status: 400 });
  }
  if (application.phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json({ error: "Adj meg egy elérhető telefonszámot." }, { status: 400 });
  }
  if (!EMAIL_RE.test(application.email)) {
    return NextResponse.json({ error: "Adj meg egy érvényes e-mail címet." }, { status: 400 });
  }
  if (body?.consent !== true) {
    return NextResponse.json(
      { error: "A kapcsolatfelvételhez a hozzájárulásod kell." },
      { status: 400 }
    );
  }

  // Hova menjen az értesítés. Alapból a publikus cím; a PARTNER_NOTIFY_EMAIL
  // környezeti változóval bármi másra átirányítható — így egy magáncím nem
  // kerül bele a nyilvános repóba.
  const notifyTo = process.env.PARTNER_NOTIFY_EMAIL?.trim() || CONTACT_EMAIL;

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("Partner application failed: BREVO_API_KEY is not configured.");
    return NextResponse.json(
      {
        error: "A jelentkezést most nem tudjuk fogadni.",
        // A kliens ebből tudja, hogy felajánlja a közvetlen e-mailt,
        // így a jelentkező nem vész el, amíg a küldés nem áll helyre.
        fallbackEmail: CONTACT_EMAIL,
      },
      { status: 503 }
    );
  }

  function send(payload: Record<string, unknown>) {
    return fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "content-type": "application/json", "api-key": apiKey as string },
      body: JSON.stringify(payload),
    });
  }

  const notify = await send({
    sender: { name: SITE_NAME, email: CONTACT_EMAIL },
    to: [{ email: notifyTo }],
    replyTo: { email: application.email, name: application.name },
    subject: `Partner jelentkezés — ${application.name} (${application.location}, ${MODE_LABELS[mode]})`,
    htmlContent: partnerApplicationHtml(application),
    textContent: partnerApplicationText(application),
  });

  if (!notify.ok) {
    // A Brevo hibakodja a Vercel runtime logjaban olvashato: 401 = rossz kulcs,
    // 400 = hibas keres (pl. nem igazolt felado).
    console.error("Brevo partner email failed:", notify.status, await notify.text());
    return NextResponse.json(
      {
        error: "A jelentkezést most nem tudjuk fogadni.",
        fallbackEmail: CONTACT_EMAIL,
      },
      { status: 502 }
    );
  }

  // A visszaigazolás kimaradhat: a jelentkezés már megvan, ezen ne bukjon el.
  const confirm = await send({
    sender: { name: SITE_NAME, email: CONTACT_EMAIL },
    to: [{ email: application.email, name: application.name }],
    subject: "Megkaptuk a jelentkezésed — PizzaYolo",
    htmlContent: applicantConfirmationHtml(application),
  });
  if (!confirm.ok) {
    console.error("Brevo confirmation email failed:", confirm.status, await confirm.text());
  }

  return NextResponse.json({ ok: true });
}
