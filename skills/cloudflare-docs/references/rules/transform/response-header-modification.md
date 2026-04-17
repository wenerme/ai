---
title: Response Header Transform Rules
description: Add, set, or remove HTTP response headers with Transform Rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/transform/response-header-modification/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Response Header Transform Rules

Use Response Header Transform Rules to manipulate the headers of HTTP responses sent to website visitors.

flowchart LR
accTitle: Header modifications diagram
accDescr: Header transform rules can change the headers sent to your origin server (request header modifications) or sent your your website visitors (response header modifications).

A[Visitor]
B((Cloudflare))
C[(Origin server)]

A -.-> B -. "Includes request<br> header modifications" .-> C
C -.-> B == "Includes response<br> header modifications" ==> A

style A stroke-width: 2px
style B stroke: orange,fill: orange,color: black
linkStyle 0,1,2 stroke-width: 1px
linkStyle 3 stroke-width: 3px

  
To modify HTTP headers in the **request** sent to your origin server, refer to [Request Header Transform Rules](https://developers.cloudflare.com/rules/transform/request-header-modification/).

Through Response Header Transform Rules you can:

* Set the value of an HTTP response header to a literal string value, overwriting its previous value or adding a new header to the response if it does not exist.
* Set the value of an HTTP response header according to an expression, overwriting its previous value or adding a new header to the response if it does not exist.
* Add a new HTTP response header with a literal string value without removing any existing headers with the same name.
* Add a new HTTP response header according to an expression without removing any existing headers with the same name.
* Remove an HTTP header from the response.

You can create a response header transform rule [in the dashboard](https://developers.cloudflare.com/rules/transform/response-header-modification/create-dashboard/), [via API](https://developers.cloudflare.com/rules/transform/response-header-modification/create-api/), or [using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/transform-rules/#create-a-response-header-transform-rule).

For more complex response header modifications, consider using [Snippets](https://developers.cloudflare.com/rules/snippets/).

## Important remarks

* The response header values are calculated using the field values from the corresponding HTTP request. For example, the field `ip.src.country` (used in expressions) will return the country of the website visitor, not the country of the origin server where the response was sent from.
* You cannot add, modify, or remove HTTP response headers whose name starts with `cf-` or `x-cf-`.
* You cannot modify the value of certain headers such as `server`, `eh-cache-tag`, or `eh-cdn-cache-control`.
* Currently you cannot reference [IP lists](https://developers.cloudflare.com/waf/tools/lists/custom-lists/#ip-lists) in expressions of Response Header Transform Rules.
* The HTTP response header removal operation will remove all response headers with the provided name.
* If you change the value of an existing HTTP response header using an expression that evaluates to an empty string (`""`) or an undefined value, the HTTP response header is **removed**.
* Currently, there is a limited number of HTTP response headers that you cannot change. Cloudflare may remove restrictions for some of these HTTP response headers when presented with valid use cases. [Create a post in the community ↗](https://community.cloudflare.com) for consideration.
* Response header transform rules will also apply to default Cloudflare error pages and [Custom Errors](https://developers.cloudflare.com/rules/custom-errors/).
* Modifying `cache-control`, `CDN-Cache-Control`, or `Cloudflare-CDN-Cache-Control` headers using response header transform rules will not change the way Cloudflare caches an object, because Cloudflare evaluates caching behavior before applying response header modifications. To control Cloudflare cache behavior, create a [cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/).
* To add a `set-cookie` header to the response, use one of the _Add static_/_Add dynamic_ operations instead of _Set static_/_Set dynamic_. _Add_ operations append a new header without removing existing headers of the same name, while _Set_ operations replace all existing headers of that name. Using a _Set_ operation for `set-cookie` will remove any `set-cookie` headers already in the response, including those added by other Cloudflare products such as Bot Management.
* Response header transform rules run in order, and later rules can overwrite changes done by previous rules.
* The values of request and response fields are immutable within each [phase](https://developers.cloudflare.com/ruleset-engine/about/phases/), such as the `http_response_headers_transform` phase where response header transform rules are defined. This means that later response header transform rules will still use the original field values when evaluating their filter expressions, not the values changed by previous rules. Refer to [Field values during rule evaluation](https://developers.cloudflare.com/ruleset-engine/about/rules/#field-values-during-rule-evaluation) for more information.

## Troubleshooting

When troubleshooting Response Header Transform Rules, use [Cloudflare Trace](https://developers.cloudflare.com/rules/trace-request/) to determine if a rule is triggering for a specific URL.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/response-header-modification/","name":"Response Header Transform Rules"}}]}
```
