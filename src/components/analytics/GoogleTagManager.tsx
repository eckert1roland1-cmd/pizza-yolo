import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// Consent Mode v2 defaults must be pushed to dataLayer before GTM's own
// script runs, so every tag inside the container respects deny-by-default
// until the cookie banner records acceptance.
export function ConsentDefaults() {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document -- valid here: this IS the App Router root layout, which Next.js's own docs require for beforeInteractive scripts. The rule predates App Router.
    <Script id="consent-defaults" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('consent', 'default', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        });
        window.gtag = gtag;
      `}
    </Script>
  );
}

export function GoogleTagManager() {
  if (!GTM_ID) return null;

  return (
    <Script id="gtm" strategy="afterInteractive">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `}
    </Script>
  );
}

export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
