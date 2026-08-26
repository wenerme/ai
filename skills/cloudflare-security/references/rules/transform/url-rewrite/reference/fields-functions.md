---
description: Available fields and functions for URL rewrite rules.
title: Available fields and functions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Available fields and functions

Last updated Aug 25, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/transform/url-rewrite/reference/fields-functions/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Filter expressions

A URL rewrite rule [filter expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/) (that is, the expression that defines which incoming requests match the rule) can include the following fields:

* `cf.edge.server_ip`
* `cf.edge.server_port`
* `cf.edge.client_port`
* `cf.edge.client_tcp`
* `cf.edge.l4.delivery_rate`
* `cf.hostname.metadata`
* `cf.zone.name`
* `cf.random_seed`
* `cf.ray_id`
* `cf.timings.client_quic_rtt_msec`
* `cf.timings.client_tcp_rtt_msec`
* `cf.tls_version`
* `cf.tls_cipher`
* `cf.tls_client_hello_length`
* `cf.tls_client_random`
* `cf.tls_client_extensions_sha1`
* `cf.tls_client_extensions_sha1_le`
* `cf.tls_client_ciphers_sha1`
* `cf.tls_client_auth.*`
* `cf.worker.upstream_zone`
* `http.cookie`
* `http.host`
* `http.referer`
* `http.request.accepted_languages`
* `http.request.cookies`
* `http.request.headers`
* `http.request.headers.*`
* `http.request.method`
* `http.request.timestamp.sec`
* `http.request.timestamp.msec`
* `http.request.full_uri`
* `http.request.uri`
* `http.request.uri.*`
* `http.request.version`
* `raw.http.request.full_uri`
* `raw.http.request.headers`
* `raw.http.request.headers.*`
* `raw.http.request.uri`
* `raw.http.request.uri.*`
* `http.user_agent`
* `http.x_forwarded_for`
* `ip.src`
* `ip.src.lat`
* `ip.src.lon`
* `ip.src.asnum`
* `ip.src.city`
* `ip.src.country`
* `ip.src.continent`
* `ip.src.metro_code`
* `ip.src.postal_code`
* `ip.src.region`
* `ip.src.region_code`
* `ip.src.is_in_european_union`
* `ip.src.subdivision_1_iso_code`
* `ip.src.subdivision_2_iso_code`
* `ssl`
* `cf.worker.upstream_zone`

Refer to [Fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/) for reference information on these fields.

Important

* To obtain the value of an HTTP request header using the [http.request.headers](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers/) field, specify the header name in **lowercase**. For example, to get the first value of the `Accept-Encoding` request header in an expression, use: `http.request.headers["accept-encoding"][0]`.
* Use the `to_string()` function to get the string representation of a non-string value like an Integer value.

For information on the available functions, refer to [Functions](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/).

## Rewrite expressions

A rewrite expression (that is, the expression that defines the dynamic URL rewrite to perform) can only include the following fields:

* `http.request.uri.*`
* `http.request.headers.*`
* `http.request.accepted_languages`

Refer to the [Fields reference](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/) for more information on these fields.

The [concat()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#concat), [regex\_replace()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#regex%5Freplace), and [wildcard\_replace()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#wildcard%5Freplace) functions can appear only once in a rewrite expression. Additionally, you cannot nest the `regex_replace()` and `wildcard_replace()` functions.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/url-rewrite/reference/fields-functions/#page","headline":"Available fields and functions · Cloudflare Rules docs","description":"Available fields and functions for URL rewrite rules.","url":"https://developers.cloudflare.com/rules/transform/url-rewrite/reference/fields-functions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
