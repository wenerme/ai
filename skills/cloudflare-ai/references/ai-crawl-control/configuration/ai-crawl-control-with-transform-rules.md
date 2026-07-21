---
description: Add licensing headers to crawler responses using Transform Rules.
title: AI Crawl Control with Transform Rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt
> Use this file to discover all available pages before exploring further.

#  AI Crawl Control with Transform Rules

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai-crawl-control/configuration/ai-crawl-control-with-transform-rules/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

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

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/configuration/ai-crawl-control-with-transform-rules/#page","headline":"AI Crawl Control with Transform Rules · Cloudflare AI Crawl Control docs","description":"Add licensing headers to crawler responses using Transform Rules.","url":"https://developers.cloudflare.com/ai-crawl-control/configuration/ai-crawl-control-with-transform-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
