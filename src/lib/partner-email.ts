import {
  MODE_LABELS,
  TIMELINES,
  VENUE_STATUS,
  VENUE_TYPES,
  VOLUME_BANDS,
  labelFor,
  type PartnerMode,
} from "@/lib/partner";

export type PartnerApplication = {
  mode: PartnerMode;
  venueStatus: string;
  venueType: string;
  location: string;
  volume: string;
  timeline: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
};

/** A levél sorai, emberi olvasásra feloldott címkékkel. */
export function applicationRows(a: PartnerApplication) {
  return [
    ["Konstrukció", MODE_LABELS[a.mode]],
    ["Helyszín", a.location],
    ["Van-e helye", labelFor(VENUE_STATUS, a.venueStatus)],
    ["A hely jellege", labelFor(VENUE_TYPES[a.mode], a.venueType)],
    ["Várható napi forgalom", labelFor(VOLUME_BANDS, a.volume)],
    ["Időzítés", labelFor(TIMELINES, a.timeline)],
    ["Név", a.name],
    ["Cég", a.company],
    ["Telefon", a.phone],
    ["E-mail", a.email],
    ["Üzenet", a.message],
  ].filter(([, value]) => Boolean(value)) as [string, string][];
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function partnerApplicationHtml(a: PartnerApplication) {
  const rows = applicationRows(a)
    .map(
      ([label, value]) => `<tr>
        <td style="padding:9px 0;color:#303030;opacity:0.55;font-size:13px;width:170px;vertical-align:top;">${label}</td>
        <td style="padding:9px 0;color:#303030;font-size:15px;">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
      </tr>`
    )
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#FFFDFA;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FFFDFA;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
            <tr>
              <td style="background-color:#885BB8;border-radius:16px 16px 0 0;padding:24px 32px;">
                <span style="color:#FFFDFA;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;">Partner jelentkezés</span>
                <div style="color:#FFFDFA;font-size:24px;font-weight:700;margin-top:6px;">${escapeHtml(a.name)} — ${escapeHtml(a.location)}</div>
              </td>
            </tr>
            <tr>
              <td style="background-color:#ffffff;border-radius:0 0 16px 16px;padding:24px 32px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
                <p style="margin:24px 0 0;color:#303030;opacity:0.5;font-size:12px;line-height:1.5;">
                  A pizzayolo.eu/partner oldalról érkezett. Válaszolj erre a levélre, és a jelentkezőhöz megy.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function partnerApplicationText(a: PartnerApplication) {
  return applicationRows(a)
    .map(([label, value]) => `${label}: ${value}`)
    .concat(["", "Forrás: pizzayolo.eu/partner"])
    .join("\n");
}

/** Visszaigazolás a jelentkezőnek, hogy legyen mire válaszolnia. */
export function applicantConfirmationHtml(a: PartnerApplication) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#FFFDFA;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FFFDFA;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;">
            <tr>
              <td style="background-color:#885BB8;border-radius:16px 16px 0 0;padding:28px 32px;text-align:center;">
                <span style="color:#FFFDFA;font-size:20px;font-weight:700;letter-spacing:0.08em;">PIZZA YOLO</span>
              </td>
            </tr>
            <tr>
              <td style="background-color:#ffffff;border-radius:0 0 16px 16px;padding:32px;">
                <p style="margin:0 0 8px;color:#303030;font-size:22px;font-weight:700;">Megkaptuk a jelentkezésed.</p>
                <p style="margin:0 0 20px;color:#303030;opacity:0.7;font-size:15px;line-height:1.6;">
                  Szia ${escapeHtml(a.name)}! Egy-két napon belül keresünk a
                  <b>${MODE_LABELS[a.mode]}</b> konstrukcióra szabott ajánlattal.
                  Addig is: ha eszedbe jut bármi, csak válaszolj erre a levélre.
                </p>
                <p style="margin:0;color:#303030;opacity:0.5;font-size:13px;line-height:1.6;">
                  Amit megadtál: ${escapeHtml(a.location)} ·
                  ${escapeHtml(labelFor(VOLUME_BANDS, a.volume) ?? "")}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
