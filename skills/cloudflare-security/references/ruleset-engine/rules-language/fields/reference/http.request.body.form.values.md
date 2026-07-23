---
description: The values of the form fields in an HTTP request.
title: http.request.body.form.values
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# http.request.body.form.values

`http.request.body.form.values` `Array<String>`

The values of the form fields in an HTTP request.

Populated when the `Content-Type` header is `application/x-www-form-urlencoded`.

Values are not pre-processed and retain the original case used in the request. They are listed in the same order as in the request.

Duplicated values are listed multiple times.

The return value may be truncated if [http.request.body.truncated](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.truncated) is `true`.

* **Decoding**: No decoding performed
* **Whitespace**: Preserved
* **Non-ASCII**: Preserved

Requires a Cloudflare Enterprise plan.

Example value:

```txt
["admin"]
```

Example usage:

```txt
any(http.request.body.form.values[*] == "admin")
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

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.form.values/#page","headline":"http.request.body.form.values · Cloudflare Ruleset Engine docs","description":"The values of the form fields in an HTTP request.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.form.values/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
