---
description: Create a URL rewrite rule (part of Transform Rules) to rewrite any requests for `/news/2012/...` URI paths to `/archive/news/2012/...`.
title: Rewrite path of archived blog posts
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Rewrite path of archived blog posts

Create a URL rewrite rule (part of Transform Rules) to rewrite any requests for `/news/2012/...` URI paths to `/archive/news/2012/...`.

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/transform/examples/rewrite-path-archived-posts/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To rewrite all requests to `/news/2012/...` to `/archive/news/2012/...` you must add a reference to the content of the original URL. Create a new URL rewrite rule and define a dynamic URL path rewrite using [wildcard pattern parameters](https://developers.cloudflare.com/rules/transform/url-rewrite/create-dashboard/#wildcard-pattern-parameters):

**When incoming requests match**

* **Wildcard pattern**
  * **Request URL**: `https://<YOUR_HOSTNAME>/news/2012/*`

**Then rewrite the path and/or query**

* **Target path**: \[`/`\] `news/2012/*`
* **Rewrite to**: \[`/`\] `archive/news/2012/${1}`

Make sure to replace `<YOUR_HOSTNAME>` with your actual hostname and adjust the example paths according to your setup.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/examples/rewrite-path-archived-posts/#page","headline":"Rewrite path of archived blog posts · Cloudflare Rules docs","description":"Create a URL rewrite rule (part of Transform Rules) to rewrite any requests for /news/2012/... URI paths to /archive/news/2012/....","url":"https://developers.cloudflare.com/rules/transform/examples/rewrite-path-archived-posts/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["URL rewrite"]}
```
