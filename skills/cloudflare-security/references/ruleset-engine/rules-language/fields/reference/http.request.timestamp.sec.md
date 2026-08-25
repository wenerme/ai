---
description: The timestamp when Cloudflare received the request, expressed as UNIX time in seconds.
title: http.request.timestamp.sec
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# http.request.timestamp.sec

`http.request.timestamp.sec` `Integer`

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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.timestamp.sec/#page","headline":"http.request.timestamp.sec · Cloudflare Ruleset Engine docs","description":"The timestamp when Cloudflare received the request, expressed as UNIX time in seconds.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.timestamp.sec/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
