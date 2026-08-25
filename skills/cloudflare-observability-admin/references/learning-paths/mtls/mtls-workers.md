---
description: Implement mutual TLS authentication with Cloudflare.
title: mTLS with Workers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# mTLS with Workers

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/mtls/mtls-workers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

Cloudflare Workers runs after the Cloudflare WAF and Cloudflare Access. Review the [Traffic Sequence ↗](https://blog.cloudflare.com/traffic-sequence-which-product-runs-first/) visible on the Cloudflare dashboard.

[mTLS for Workers](https://developers.cloudflare.com/workers/runtime-apis/bindings/mtls/) can be used for requests made to services that are [not proxied](https://developers.cloudflare.com/dns/proxy-status/#dns-only-records) on Cloudflare, or alternatively used to gain visibility into certificate details and optionally add your own programmatic logic for further checks or actions.

## Expose mTLS headers

All Client Certificate details can be found in the [tlsClientAuth](https://developers.cloudflare.com/workers/runtime-apis/request#incomingrequestcfproperties) object in Cloudflare Workers. Refer to [Client certificate variables](https://developers.cloudflare.com/ssl/client-certificates/client-certificate-variables/) for a full list of available properties.

Example Cloudflare Workers code to return all headers and gain visibility, including [Client Certificate headers](https://developers.cloudflare.com/ssl/client-certificates/forward-a-client-certificate/#cloudflare-workers):

```js
export default {
  async fetch(request, env, ctx) {
    const { tlsClientAuth = {} } = request.cf || {};
    const tlsHeaders = {
      'X-CERT-ISSUER-DN': tlsClientAuth.certIssuerDN,
      'X-CERT-SUBJECT-DN': tlsClientAuth.certSubjectDN,
      'X-CERT-ISSUER-DN-L': tlsClientAuth.certIssuerDNLegacy,
      'X-CERT-SUBJECT-DN-L': tlsClientAuth.certSubjectDNLegacy,
      'X-CERT-SERIAL': tlsClientAuth.certSerial,
      'X-CERT-FINGER': tlsClientAuth.certFingerprintSHA1,
      'X-CERT-VERIFY': tlsClientAuth.certVerify,
      'X-CERT-NOTBE': tlsClientAuth.certNotBefore,
      'X-CERT-NOTAF': tlsClientAuth.certNotAfter
    };

    const headers = Object.fromEntries(request.headers);
    return new Response(JSON.stringify({ ...headers, ...tlsHeaders }, null, 2), {
      headers: { 'Content-Type': 'application/json' }
    });

}
}
```

Service Workers are deprecated

Service Workers are deprecated, but still supported. We recommend using [Module Workers](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/) instead. New features may not be supported for Service Workers.

```js
addEventListener('fetch', event => {
  event.respondWith(
    (async request => {
      const { tlsClientAuth = {} } = request.cf || {};
      const tlsHeaders = {
        'X-CERT-ISSUER-DN': tlsClientAuth.certIssuerDN,
        'X-CERT-SUBJECT-DN': tlsClientAuth.certSubjectDN,
        'X-CERT-ISSUER-DN-L': tlsClientAuth.certIssuerDNLegacy,
        'X-CERT-SUBJECT-DN-L': tlsClientAuth.certSubjectDNLegacy,
        'X-CERT-SERIAL': tlsClientAuth.certSerial,
        'X-CERT-FINGER': tlsClientAuth.certFingerprintSHA1,
        'X-CERT-VERIFY': tlsClientAuth.certVerify,
        'X-CERT-NOTBE': tlsClientAuth.certNotBefore,
        'X-CERT-NOTAF': tlsClientAuth.certNotAfter
      };

      const headers = Object.fromEntries(request.headers);
      return new Response(JSON.stringify({ ...headers, ...tlsHeaders }, null, 2), {
        headers: { 'Content-Type': 'application/json' }
      });
    })(event.request)
  );
});
```

The response when using the browser with a P12 Certificate to visit the mTLS hostname would look similar to this example:

![Example response after exposing an mTLS header with Cloudflare Workers](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1999,height=1191,format=webp/_astro/expose-mtls-workers.CZtg7nI7.png)

```txt
{
  "X-CERT-ISSUER-DN": "CN=Managed CA abcdefghijklmnopq123456789,OU=www.cloudflare.com,O=Cloudflare\\, Inc.,L=San Francisco,ST=California,C=US",
  "X-CERT-SUBJECT-DN": "CN=Cloudflare,C=US",
  "X-CERT-ISSUER-DN-L": "/C=US/ST=California/L=San Francisco/O=Cloudflare, Inc./OU=www.cloudflare.com/CN=Managed CA abcdefghijklmnopq123456789",
  "X-CERT-SUBJECT-DN-L": "/C=US/CN=Cloudflare",
  "X-CERT-SERIAL": "37C52778E2F1820CC6342172A0E0ED33A4555F8B",
  "X-CERT-FINGER": "161e3a2089add0b2134ec43c9071f460e9f4b898",
  "X-CERT-NOTBE": "May 25 23:11:00 2024 GMT",
  "X-CERT-NOTAF": "May 23 23:11:00 2034 GMT"
}
```

Note

The client certificate serial number is a unique identifier assigned to each certificate by the CA, ensuring that no two certificates issued by the same CA have the same serial number. This can be useful to track and monitor certificate usage or abuse.

This approach can also be useful to handle additional checks and logic on the mTLS via the Cloudflare Workers.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/mtls/mtls-workers/#page","headline":"mTLS with Workers · Cloudflare Learning Paths","description":"Implement mutual TLS authentication with Cloudflare.","url":"https://developers.cloudflare.com/learning-paths/mtls/mtls-workers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
