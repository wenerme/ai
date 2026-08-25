---
description: The lowercased content type (including subtype and suffix) without any extra parameters, based on the response's `Content-Type` header.
title: http.response.content_type.media_type
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# http.response.content\_type.media\_type

`http.response.content_type.media_type` `String`

The lowercased content type (including subtype and suffix) without any extra parameters, based on the response's `Content-Type` header.

The field value will not include parameters such as `charset`.

Example values:

| Content-Type header                   | Field value       |
| ------------------------------------- | ----------------- |
| text/html                             | "text/html"       |
| text/html; charset=utf-8              | "text/html"       |
| text/html+extra                       | "text/html+extra" |
| text/html+extra; charset=utf-8        | "text/html+extra" |
| text/HTML                             | "text/html"       |
| text/html; charset=utf-8; other=value | "text/html"       |

**Note**: The availability of HTTP response fields depends on the exact Cloudflare feature and your Cloudflare plan.

Categories:
* Response
* Headers

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.response.content_type.media_type/#page","headline":"http.response.content_type.media_type · Cloudflare Ruleset Engine docs","description":"The lowercased content type (including subtype and suffix) without any extra parameters, based on the response's Content-Type header.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.response.content_type.media_type/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
