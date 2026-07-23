---
description: Create a response header transform rule (part of Transform Rules) to set an `X-Bot-Score` HTTP header in the response with the current bot score.
title: Set a response header with the current bot score
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Set a response header with the current bot score

Create a response header transform rule (part of Transform Rules) to set an `X-Bot-Score` HTTP header in the response with the current bot score.

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/transform/examples/set-response-header-bot-score/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following response header transform rule sets a header named `X-Bot-Score` to the current bot score in the HTTP response:

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/en/")
```

Selected operation under **Modify response header**: _Set dynamic_

**Header name**: `X-Bot-Score`

**Value**: `to_string(cf.bot_management.score)`

This rule would overwrite any existing `X-Bot-Score` headers already present in the HTTP response.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/examples/set-response-header-bot-score/#page","headline":"Set a response header with the current bot score · Cloudflare Rules docs","description":"Create a response header transform rule (part of Transform Rules) to set an X-Bot-Score HTTP header in the response with the current bot score.","url":"https://developers.cloudflare.com/rules/transform/examples/set-response-header-bot-score/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Response modification"]}
```
