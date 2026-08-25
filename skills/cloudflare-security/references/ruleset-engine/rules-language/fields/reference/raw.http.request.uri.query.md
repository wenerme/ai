---
description: The entire query string without the `?` delimiter and without any transformation.
title: raw.http.request.uri.query
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# raw.http.request.uri.query

`raw.http.request.uri.query` `String`

The entire query string without the `?` delimiter and without any transformation.

This is the raw field version of the [http.request.uri.query](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.query/) field. Raw fields, prefixed with `raw.`, preserve original request values for later evaluations. These fields are immutable during the entire request evaluation workflow, and they are not affected by the actions of previously matched rules.

**Note**: This raw field may include some basic normalization done by Cloudflare's HTTP server. However, this can change in the future.

Categories:
* Request
* URI
* Raw fields

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/raw.http.request.uri.query/#page","headline":"raw.http.request.uri.query · Cloudflare Ruleset Engine docs","description":"The entire query string without the ? delimiter and without any transformation.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/raw.http.request.uri.query/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
