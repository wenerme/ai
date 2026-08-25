---
description: Step-by-step guide to migrate your Workers project from Wrangler v1 to v2, including webpack changes.
title: Migrate from Wrangler v1 to v2
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Migrate from Wrangler v1 to v2

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide details how to migrate from Wrangler v1 to v2.

* [1\. Migrate webpack projects](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/eject-webpack/)
* [2\. Update to Wrangler v2](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/update-v1-to-v2/)
* [Wrangler v1 (legacy)](https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/wrangler-legacy/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/#page","headline":"Migrate from Wrangler v1 to v2 · Cloudflare Workers docs","description":"Step-by-step guide to migrate your Workers project from Wrangler v1 to v2, including webpack changes.","url":"https://developers.cloudflare.com/workers/wrangler/migration/v1-to-v2/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
