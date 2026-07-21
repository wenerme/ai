---
description: The timestamp when Cloudflare received the request, expressed as UNIX time in seconds.
title: http.request.timestamp.sec
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

#  http.request.timestamp.sec

`http.request.timestamp.sec` ` Integer `

The timestamp when Cloudflare received the request, expressed as UNIX time in seconds.

The field value is 10 digits long.

When validating HMAC tokens in an expression, pass this field as the `currentTimestamp` argument to the [is\_timed\_hmac\_valid\_v0()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#hmac-validation) validation function.

To obtain the timestamp milliseconds, use the [http.request.timestamp.msec](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.timestamp.msec/) field.

Example value:

```txt
1484063137
```

Categories:
* Request

Was this helpful?

YesNo

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.timestamp.sec/#page","headline":"http.request.timestamp.sec · Cloudflare Ruleset Engine docs","description":"The timestamp when Cloudflare received the request, expressed as UNIX time in seconds.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.timestamp.sec/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
