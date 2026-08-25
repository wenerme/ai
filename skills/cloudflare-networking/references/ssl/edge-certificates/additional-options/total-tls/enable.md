---
description: Enable Total TLS to issue certificates for all subdomains.
title: Enable
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/enable/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To enable [Total TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/) \- which issues individual certificates for your proxied hostnames - follow these instructions:

To enable Total TLS in the dashboard:

1. In the Cloudflare dashboard, go to the **Edge Certificates** page.
[Go to **Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates)
2. For **Total TLS**, switch the toggle to **On** and - if desired - choose an issuing **Certificate Authority**.

To enable Total TLS with the API, send a [PATCH](https://developers.cloudflare.com/api/resources/acm/subresources/total%5Ftls/methods/create/) request with the `enabled` parameter set to your desired setting (`true` or `false`).

You can also specify a desired certificate authority by adding a value to the `certificate_authority` parameter.

## Aspects to consider

* Total TLS certificates follow the Common Name (CN) restriction of 64 characters ([RFC 5280 ↗](https://www.rfc-editor.org/rfc/rfc5280.html)). If you have a hostname that exceeds this length, you can create an [Advanced Certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/#create-a-certificate) via API to cover it.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/enable/#page","headline":"Enable Total TLS · Cloudflare SSL/TLS docs","description":"Enable Total TLS to issue certificates for all subdomains.","url":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/enable/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
