---
description: Troubleshoot HTTP 410 error responses.
title: Error 410
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt
> Use this file to discover all available pages before exploring further.

# Error 410

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-410/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## 410 Gone

When a resource is intentionally and permanently removed, servers use the `410 Gone` status code to inform clients that the resource is no longer available. In this case:

* The server suggests that links referencing the resource should be removed.
* The server is not obligated to use this status code instead of a `404` response, nor is it required to maintain this response for any specific period of time.

For more details, refer to [RFC 7231 ↗](https://tools.ietf.org/html/rfc7231).

### Common use cases

This status is commonly applied to deprecated content, such as outdated pages or discontinued products.

### Cloudflare-specific information

Cloudflare does not generate `410` for customer websites, we only proxy the request from the origin server. If you encounter a `410` error on a Cloudflare-powered site, the issue lies with the origin server. In such cases, contact your hosting provider for assistance.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-410/#page","headline":"Error 410 · Cloudflare Support docs","description":"Troubleshoot HTTP 410 error responses.","url":"https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-410/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
