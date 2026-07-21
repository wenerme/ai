---
title: Rewrite image paths with several URL segments
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

#  Rewrite image paths with several URL segments

Create a URL rewrite rule (part of Transform Rules) to rewrite any requests for `/images/<FOLDER1>/<FOLDER2>/<FILENAME>` to `/img/<FILENAME>`.

Last updated Oct 13, 2025 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/rules/transform/examples/rewrite-several-url-different-url/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

To rewrite paths like `/images/<FOLDER1>/<FOLDER2>/<FILENAME>` — where `<FOLDER1>`, `<FOLDER2>`, and `<FILENAME>` can vary — to `/img/<FILENAME>`, create a URL rewrite rule with a dynamic rewrite of the path component:

Text in **Expression Editor**:

```txt
http.request.uri.path ~ "^/images/[^/]+/[^/]+/[^/]+$"
```

Text after **Path** \> **Rewrite to** \> _Dynamic_:

```txt
regex_replace(http.request.uri.path, "^/images/[^/]+/[^/]+/(.+)$", "/img/${1}")
```

For example, this rule would rewrite the `/images/nature/animals/tiger.png` path to `/img/tiger.png`.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/examples/rewrite-several-url-different-url/#page","headline":"Rewrite image paths with several URL segments · Cloudflare Rules docs","description":"Create a URL rewrite rule (part of Transform Rules) to rewrite any requests for /images/\\\u003cFOLDER1>/\\\u003cFOLDER2>/\\\u003cFILENAME> to /img/\\\u003cFILENAME>.","url":"https://developers.cloudflare.com/rules/transform/examples/rewrite-several-url-different-url/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["URL rewrite"]}
```
