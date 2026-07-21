---
description: Available fields and functions for response header modification rules.
title: Available fields and functions
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

#  Available fields and functions

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/rules/transform/response-header-modification/reference/fields-functions/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The available fields when setting an HTTP response header value using an expression are the following:

* `cf.bot_management.*`
* `cf.client.bot`
* `cf.verified_bot_category`
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
* `cf.fraud.email_risk`
* `http.cookie`
* `http.host`
* `http.referer`
* `http.request.accepted_languages`
* `http.request.cookies`
* `http.request.headers`
* `http.request.headers.*`
* `http.request.method`
* `http.request.body.form`
* `http.request.body.form.*`
* `http.request.body.multipart`
* `http.request.body.multipart.*`
* `http.request.body.raw`
* `http.request.body.size`
* `http.request.body.truncated`
* `http.request.timestamp.sec`
* `http.request.timestamp.msec`
* `http.request.full_uri`
* `http.request.uri`
* `http.request.uri.*`
* `http.request.version`
* `raw.http.request.full_uri`
* `raw.http.request.uri`
* `raw.http.request.uri.*`
* `raw.http.request.headers`
* `raw.http.request.headers.*`
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
* `http.response.code`
* `http.response.content_type.media_type`
* `http.response.headers`
* `http.response.headers.*`
* `raw.http.response.headers`
* `raw.http.response.headers.*`
* `cf.response.1xxx_code`
* `cf.response.error_type`
* `cf.timings.edge_msec`
* `cf.timings.origin_ttfb_msec`
* `cf.timings.worker_msec`

Refer to [Fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/) for reference information on these fields.

Important

* To obtain the value of an HTTP header using the [http.request.headers](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers/) or [http.response.headers](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.response.headers/) field, specify the header name in **lowercase**. For example, to get the first value of the `Accept-Encoding` request header in an expression, use: `http.request.headers["accept-encoding"][0]`.
* Use the `to_string()` function to get the string representation of a non-string value like an Integer value. For example, `to_string(cf.bot_management.score)`.

For information on the available functions, refer to [Functions](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/response-header-modification/reference/fields-functions/#page","headline":"Available fields and functions · Cloudflare Rules docs","description":"Available fields and functions for response header modification rules.","url":"https://developers.cloudflare.com/rules/transform/response-header-modification/reference/fields-functions/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
