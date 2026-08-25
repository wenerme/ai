---
description: Cloudflare products that are and are not compatible with Privacy Gateway, including API Shield, Cache, and WAF.
title: Product compatibility
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/privacy-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Product compatibility

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/privacy-gateway/reference/product-compatibility/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When [using Privacy Gateway](https://developers.cloudflare.com/privacy-gateway/get-started/), the majority of Cloudflare products will be compatible with your application.

However, the following products are not compatible:

* [API Shield](https://developers.cloudflare.com/api-shield/): [Schema Validation](https://developers.cloudflare.com/api-shield/security/schema-validation/) and [API discovery](https://developers.cloudflare.com/api-shield/security/api-discovery/) are not possible since Cloudflare cannot see the request URLs.
* [Cache](https://developers.cloudflare.com/cache/): Caching of application content is no longer possible since each between client and gateway is end-to-end encrypted.
* [WAF](https://developers.cloudflare.com/waf/): Rules implemented based on request content are not supported since Cloudflare cannot see the request or response content.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/privacy-gateway/reference/product-compatibility/#page","headline":"Product compatibility · Cloudflare Privacy Gateway docs","description":"Cloudflare products that are and are not compatible with Privacy Gateway, including API Shield, Cache, and WAF.","url":"https://developers.cloudflare.com/privacy-gateway/reference/product-compatibility/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
