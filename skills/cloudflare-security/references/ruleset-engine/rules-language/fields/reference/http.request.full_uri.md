---
description: The full URI as received by the web server.
title: http.request.full_uri
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

#  http.request.full\_uri

`http.request.full_uri` ` String `

The full URI as received by the web server.

The value will not include the `#fragment` part, which is not sent to web servers.

Example value:

```txt
"https://www.example.org/articles/index?section=539061&expand=comments"
```

Categories:
* Request
* URI

Was this helpful?

YesNo

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.full_uri/#page","headline":"http.request.full_uri · Cloudflare Ruleset Engine docs","description":"The full URI as received by the web server.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.full_uri/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
