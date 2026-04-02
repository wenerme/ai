---
title: Available fields and functions
description: A URL rewrite rule filter expression (that is, the expression that defines which incoming requests match the rule) can include the following fields:
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/transform/url-rewrite/reference/fields-functions.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Available fields and functions

## Filter expressions

A URL rewrite rule [filter expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/) (that is, the expression that defines which incoming requests match the rule) can include the following fields:

* `cf.edge.server_ip`
* `cf.edge.server_port`
* `cf.edge.client_port`
* `cf.zone.name`
* `cf.metal.id`
* `cf.ray_id`
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
* `http.user_agent`
* `http.x_forwarded_for`
* `ip.src`
* `ip.src.lat`
* `ip.src.lon`
* `ip.src.asnum`
* `ip.src.city`
* `ip.src.country`
* `ip.src.continent`
* `ip.src.is_in_european_union`
* `ip.src.subdivision_1_iso_code`
* `ip.src.subdivision_2_iso_code`
* `ssl`

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/url-rewrite/","name":"URL Rewrite Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/url-rewrite/reference/","name":"Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/rules/transform/url-rewrite/reference/fields-functions/","name":"Available fields and functions"}}]}
```
