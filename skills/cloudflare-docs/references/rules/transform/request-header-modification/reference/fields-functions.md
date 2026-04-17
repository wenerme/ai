---
title: Available fields and functions
description: Available fields and functions for request header modification rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/transform/request-header-modification/reference/fields-functions.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Available fields and functions

The available fields when setting an HTTP request header value using an expression are the following:

* `cf.bot_management.*`
* `cf.bot_detection.js_check_score`
* `cf.client.bot`
* `cf.threat_score`
* `cf.verified_bot_category`
* `cf.edge.server_ip`
* `cf.edge.server_port`
* `cf.edge.client_port`
* `cf.hostname.metadata`
* `cf.zone.name`
* `cf.metal.id`
* `cf.random_seed`
* `cf.ray_id`
* `cf.tls_version`
* `cf.tls_cipher`
* `cf.tls_client_hello_length`
* `cf.tls_client_random`
* `cf.tls_client_extensions_sha1`
* `cf.tls_client_extensions_sha1_le`
* `cf.tls_client_ciphers_sha1`
* `cf.tls_client_auth.*`
* `http.cookie`
* `http.host`
* `http.referer`
* `http.request.headers`
* `http.request.headers.*`
* `http.request.accepted_languages`
* `http.request.method`
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
* `http.request.jwt.claims`
* `http.request.jwt.claims.*`
* `cf.sequence.current_op`
* `cf.sequence.msec_since_op`
* `cf.sequence.previous_ops`
* `cf.waf.auth_detected`
* `cf.waf.credential_check.*`
* `cf.waf.score`
* `cf.waf.score.*`
* `cf.worker.upstream_zone`

Refer to [Fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/) for reference information on these fields.

Important

* To obtain the value of an HTTP header using the [http.request.headers](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers/) field, specify the header name in **lowercase**. For example, to get the first value of the `Accept-Encoding` request header in an expression, use: `http.request.headers["accept-encoding"][0]`.
* Use the `to_string()` function to get the string representation of a non-string value like an Integer value. For example, `to_string(cf.bot_management.score)`.

For information on the available functions, refer to [Functions](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/request-header-modification/","name":"Request Header Transform Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/request-header-modification/reference/","name":"Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/rules/transform/request-header-modification/reference/fields-functions/","name":"Available fields and functions"}}]}
```
