---
description: The HTTP request body of a form represented as a Map (or associative array).
title: http.request.body.form
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# http.request.body.form

`http.request.body.form` `Map<Array<String>>`

The HTTP request body of a form represented as a Map (or associative array).

Populated when the `Content-Type` header is `application/x-www-form-urlencoded`.

The values are not pre-processed and retain the original case used in the request.

When a field repeats, then the array contains multiple items in the order they are in the request.

The return value may be truncated if [http.request.body.truncated](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.truncated) is `true`.

* **Decoding**: No decoding performed
* **Whitespace**: Preserved
* **Non-ASCII**: Preserved

Requires a Cloudflare Enterprise plan.

Example value:

```txt
{username": ["admin"]}
```

Example usage:

```txt
any(http.request.body.form["username"][*] == "admin")
```

Caution

All `http.request.body.*` fields (except [ http.request.body.size](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.size/)) handle a given maximum body size, which varies per plan. For Enterprise customers, the maximum body size is 128 KB. For other paid plans, the limit is lower by default — reach out to your account team or to Cloudflare Support to increase the limit. For users in the Free plan, the limit is 1 MB.

You cannot define expressions that rely on request body data beyond the maximum size set for your plan. If the request body is larger, the body fields will contain a truncated value and the [http.request.body.truncated](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.truncated/) field will be set to `true`. The [http.request.body.size](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.size/) field will contain the full size of the request without any truncation.

The maximum body size applies only to the values of HTTP body fields — the origin server will still receive the complete request body.

Categories:
* Request
* Body

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.form/#page","headline":"http.request.body.form · Cloudflare Ruleset Engine docs","description":"The HTTP request body of a form represented as a Map (or associative array).","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.form/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
