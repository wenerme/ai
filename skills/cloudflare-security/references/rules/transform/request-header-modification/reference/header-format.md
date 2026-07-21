---
description: Supported header name and value formats for request header modifications.
title: Format of HTTP request header names and values
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

#  Format of HTTP request header names and values

Last updated May 5, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/rules/transform/request-header-modification/reference/header-format/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The **name** of the HTTP request header you want to set or remove can only contain:

* Alphanumeric characters: `a`\-`z`, `A`\-`Z`, and `0`\-`9`
* The following special characters: `-` and `_`

The **value** of the HTTP request header you want to set can only contain:

* Alphanumeric characters: `a`\-`z`, `A`\-`Z`, and `0`\-`9`
* The following special characters: `` _ :;.,\/"'?!(){}[]@<>=-+*#$&`|~^% ``

The maximum length of the HTTP request header value is 4 KB (\~4,096 characters).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/request-header-modification/reference/header-format/#page","headline":"Format of HTTP request header names and values · Cloudflare Rules docs","description":"Supported header name and value formats for request header modifications.","url":"https://developers.cloudflare.com/rules/transform/request-header-modification/reference/header-format/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers"]}
```
