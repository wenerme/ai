---
description: Create a request header transform rule to add a `X-Bot-Score` HTTP header to the request with the current bot score.
title: Add a request header with the current bot score
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Add a request header with the current bot score

Create a request header transform rule to add a `X-Bot-Score` HTTP header to the request with the current bot score.

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/transform/examples/add-request-header-bot-score/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following request header transform rule adds a header named `X-Bot-Score` with the current bot score to the HTTP request:

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/en/")
```

Selected operation under **Modify request header**: _Set dynamic_

**Header name**: `X-Bot-Score`

**Value**: `to_string(cf.bot_management.score)`

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/examples/add-request-header-bot-score/#page","headline":"Add a request header with the current bot score · Cloudflare Rules docs","description":"Create a request header transform rule to add a X-Bot-Score HTTP header to the request with the current bot score.","url":"https://developers.cloudflare.com/rules/transform/examples/add-request-header-bot-score/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Request modification"]}
```
