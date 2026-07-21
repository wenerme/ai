---
description: List of multipart names for every part in the multipart body.
title: http.request.body.multipart.names
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

#  http.request.body.multipart.names

`http.request.body.multipart.names` ` Array<Array<String>> `

List of multipart names for every part in the multipart body.

Requires a Cloudflare Enterprise plan.

Example value:

```txt
[["username"], ["picture"]]
```

Example usage:

```txt
any(http.request.body.multipart.names[*][0] == "picture")
```

Caution

All `http.request.body.*` fields (except [ http.request.body.size ](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.size/)) handle a given maximum body size, which varies per plan. For Enterprise customers, the maximum body size is 128 KB. For other paid plans, the limit is lower by default — reach out to your account team or to Cloudflare Support to increase the limit. For users in the Free plan, the limit is 1 MB.

You cannot define expressions that rely on request body data beyond the maximum size set for your plan. If the request body is larger, the body fields will contain a truncated value and the [ http.request.body.truncated ](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.truncated/) field will be set to `true`. The [ http.request.body.size ](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.size/) field will contain the full size of the request without any truncation.

The maximum body size applies only to the values of HTTP body fields — the origin server will still receive the complete request body.

Categories:
* Request
* Body

Was this helpful?

YesNo

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.multipart.names/#page","headline":"http.request.body.multipart.names · Cloudflare Ruleset Engine docs","description":"List of multipart names for every part in the multipart body.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.multipart.names/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
