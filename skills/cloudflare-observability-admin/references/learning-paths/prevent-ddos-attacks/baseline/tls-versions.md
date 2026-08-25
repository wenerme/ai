---
description: Learn about update tls versions in this guide.
title: Update TLS versions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Update TLS versions

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/baseline/tls-versions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In some circumstances - specifically when an application allows client-initiated SSL/TLS renegotiation - previous versions of SSL/TLS can be more vulnerable to DDoS attacks.

When you use an SSL/TLS certificate issued by Cloudflare[1](#user-content-fn-1), you can reduce the impact of this vulnerability by:

* Updating the [Minimum TLS Version](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/minimum-tls/) accepted by your application.
* Allowing [TLS 1.3](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/tls-13/).

## Additional resources

For more details on this vulnerability, refer to [Secure Server- and Client-Initiated SSL Renegotiation ↗](https://crashtest-security.com/secure-client-initiated-ssl-renegotiation/).

## Footnotes

1. Meaning either [Universal](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) or [Advanced](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) certificates. [↩](#user-content-fnref-1)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/baseline/tls-versions/#page","headline":"Update TLS versions · Cloudflare Learning Paths","description":"Learn about update tls versions in this guide.","url":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/baseline/tls-versions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
