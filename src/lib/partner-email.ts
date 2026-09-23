export type PartnerApplication = {
  mode: "own" | "in-store";
  name: string;
  location: string;
  phone: string;
  email: string;
  message: string;
};

const MODE_LABEL: Record<PartnerApplication["mode"], string> = {
  own: "Saját PizzaYolo",
  "in-store": "Bolton belüli sarok",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string) {
  if (!value) return "";
  return `<tr>
    <td style="padding:8px 0;color:#303030;opacity:0.55;font-size:13px;width:150px;vertical-align:top;">${label}</td>
    <td style="padding:8px 0;color:#303030;font-size:15px;">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
  </tr>`;
}

export function partnerApplicationHtml(application: PartnerApplication) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#FFFDFA;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FFFDFA;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">
            <tr>
              <td style="background-color:#885BB8;border-radius:16px 16px 0 0;padding:24px 32px;">
                <span style="color:#FFFDFA;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;">Partner jelentkezés</span>
                <div style="color:#FFFDFA;font-size:24px;font-weight:700;margin-top:6px;">${MODE_LABEL[application.mode]}</div>
              </td>
            </tr>
            <tr>
              <td style="background-color:#ffffff;border-radius:0 0 16px 16px;padding:24px 32px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${row("Név", application.name)}
                  ${row("Város / helyszín", application.location)}
                  ${row("Telefon", application.phone)}
                  ${row("E-mail", application.email)}
                  ${row("Üzenet", application.message)}
                </table>
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

export function partnerApplicationText(application: PartnerApplication) {
  return [
    `Konstrukció: ${MODE_LABEL[application.mode]}`,
    `Név: ${application.name}`,
    `Város / helyszín: ${application.location}`,
    `Telefon: ${application.phone}`,
    `E-mail: ${application.email}`,
    application.message ? `Üzenet: ${application.message}` : "",
    "",
    "Forrás: pizzayolo.eu/partner",
  ]
    .filter(Boolean)
    .join("\n");
}
