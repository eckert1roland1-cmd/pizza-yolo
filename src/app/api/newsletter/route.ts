import { NextResponse } from "next/server";
import { CONTACT_EMAIL, COUPON_CODE, SITE_NAME } from "@/lib/site-config";
import { couponEmailHtml } from "@/lib/newsletter-email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const consent = body?.consent === true;
  // Honeypot: real visitors never see or fill this field, bots usually fill every field.
  const company = typeof body?.company === "string" ? body.company.trim() : "";

  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (!consent) {
    return NextResponse.json(
      { error: "Please agree to receive emails to get your code." },
      { status: 400 }
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;

  if (!apiKey || !listId) {
    console.error("Newsletter signup failed: BREVO_API_KEY or BREVO_LIST_ID is not configured.");
    return NextResponse.json(
      { error: "Signups are temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "content-type": "application/json", "api-key": apiKey },
    body: JSON.stringify({ email, listIds: [Number(listId)], updateEnabled: true }),
  });

  if (!contactRes.ok) {
    const detail = await contactRes.text();
    console.error("Brevo contact create failed:", contactRes.status, detail);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 502 }
    );
  }

  const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "content-type": "application/json", "api-key": apiKey },
    body: JSON.stringify({
      sender: { name: SITE_NAME, email: CONTACT_EMAIL },
      to: [{ email }],
      subject: "Your 10% off code is here",
      htmlContent: couponEmailHtml(COUPON_CODE),
    }),
  });

  if (!emailRes.ok) {
    // Contact is already saved and the popup shows the code either way,
    // so a failed confirmation email shouldn't fail the whole signup.
    const detail = await emailRes.text();
    console.error("Brevo transactional email failed:", emailRes.status, detail);
  }

  return NextResponse.json({ ok: true });
}
