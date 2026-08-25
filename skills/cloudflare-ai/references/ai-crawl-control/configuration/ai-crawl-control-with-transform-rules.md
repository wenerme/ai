---
description: Add licensing headers to crawler responses using Transform Rules.
title: AI Crawl Control with Transform Rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt
> Use this file to discover all available pages before exploring further.

# AI Crawl Control with Transform Rules

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-crawl-control/configuration/ai-crawl-control-with-transform-rules/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use [Response Header Transform Rules](https://developers.cloudflare.com/rules/transform/response-header-modification/) to add `Link` headers to crawler responses — even when those crawlers are blocked. This lets you communicate terms of use or [RSL ↗](https://rslstandard.org/) license information.

## Example: Add licensing terms to blocked responses

**Expression:**

```txt
(cf.bot_management.verified_bot and http.response.code eq 403)
```

**Header modification:**

* **Operation:** Set static
* **Header name:** `Link`
* **Value:** `<https://example.com/ai-licensing-terms>; rel="license"; type="text/html"`

For more details, refer to [Response Header Transform Rules](https://developers.cloudflare.com/rules/transform/response-header-modification/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/configuration/ai-crawl-control-with-transform-rules/#page","headline":"AI Crawl Control with Transform Rules · Cloudflare AI Crawl Control docs","description":"Add licensing headers to crawler responses using Transform Rules.","url":"https://developers.cloudflare.com/ai-crawl-control/configuration/ai-crawl-control-with-transform-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
