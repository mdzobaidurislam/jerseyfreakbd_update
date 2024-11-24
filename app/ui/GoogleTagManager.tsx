"use client"

import Script from "next/script"

export default function GoogleTagManager({ id }: { id: string }) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('consent', 'default', {
              'analytics_storage': 'denied'
          });
          
          gtag('config', '${id}', {
              page_path: window.location.pathname,
          });
          `,
        }}
      />
    </>
  )
}
