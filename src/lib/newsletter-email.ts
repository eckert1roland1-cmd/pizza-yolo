import { SITE_NAME } from "@/lib/site-config";

export function couponEmailHtml(code: string) {
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
                <p style="margin:0 0 8px;color:#303030;font-size:22px;font-weight:700;">You're in.</p>
                <p style="margin:0 0 24px;color:#303030;opacity:0.7;font-size:15px;line-height:1.5;">
                  Here's your 10% off code for your next visit to ${SITE_NAME} at Club Aliga.
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:2px dashed #885BB8;border-radius:12px;margin-bottom:24px;">
                  <tr>
                    <td align="center" style="padding:20px;">
                      <span style="color:#885BB8;font-size:28px;font-weight:700;letter-spacing:0.2em;">${code}</span>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 24px;color:#303030;opacity:0.7;font-size:14px;line-height:1.5;">
                  Just show this email at the truck when you order. See you at the beach.
                </p>
                <p style="margin:0;color:#303030;opacity:0.5;font-size:12px;line-height:1.5;">
                  Don't want future emails? Reply to this message and let us know.
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
