---
description: Fields and operators for load balancing rule expressions.
title: Supported fields and operators
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt
> Use this file to discover all available pages before exploring further.

# Supported fields and operators

Last updated Apr 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/reference/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The fields that are supported by load balancing rules depend on whether Cloudflare proxies the traffic going through your load balancer or not.

If you use the wrong set of fields, you might see unexpected behaviors. For best results, use the fields associated with your traffic's [proxy status](https://developers.cloudflare.com/load-balancing/understand-basics/proxy-modes/).

Also, some Load Balancing rules fields are available on the Expression Builder - as described in [Load Balancing expressions](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/expressions/#working-with-expressions) - while others can only be configured manually, via API or [Expression Editor](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/expressions/#expression-editor)

## Expression Builder field sets

Consider the following table to know how the fields available in the [Expression Builder](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/expressions/#expression-builder) are grouped.

| Field Set | Section in Expression Builder | Description |
| --- | --- | --- |
| [Fields supported regardless of proxy](#fields-supported-regardless-of-proxy) | `BOTH` | Values that are always accessible regardless of the load balancer proxy status. |
| [Proxied-only fields](#proxied-only-fields) | `PROXIED ONLY` | Values accessible only when the load balancer is proxied. |
| [Unproxied-only fields](#unproxied-only-fields) | `NON-PROXIED ONLY` | Values accessible only when the load balancer is not proxied (DNS-only traffic). |

![Choose load balancer fields based on the proxy status header](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=437,height=423,format=webp/_astro/proxy-status.DIPDmp1m.png)

## Fields supported regardless of proxy

Regardless of your traffic [proxy status](https://developers.cloudflare.com/load-balancing/understand-basics/proxy-modes/), Load Balancing rules can access values for the following fields:

| Field | Name in Expression Builder | Description |
| --- | --- | --- |
| `cf.load_balancer.name`<br>`Bytes` | `Load Balancer Name` | Represents the name of the load balancer executing these rules. Example value:<br>`lb.example.com` |
| `cf.load_balancer.region`<br>`Bytes` | `Load Balancer Region` | Provides the [region name](https://developers.cloudflare.com/load-balancing/reference/region-mapping-api/#list-of-load-balancer-regions) of the data center processing the request. Example value:<br>`ENAM` |
| `ip.src`<br>`IP address` | `IP Source Address` | If proxied, this field provides the client TCP IP address, which may be adjusted to reflect the actual address of the client by using HTTP headers such as `X-Forwarded-For` or `X-Real-IP` . If unproxied (DNS-only), this field provides the ECS source address, if available. If not available, it provides the client resolver IP address.**Deprecation Warning:** In the future, this field will always be set to the client resolver IP address for unproxied requests. To check for the presence of ECS and use the ECS IP, see the fields [`dns.rr.opt.client`](#field-dns-rr-opt-client) and [`dns.rr.opt.client.addr`](#field-dns-rr-opt-client-addr), respectively. Example value:<br>`1.2.3.4` |
| `ip.src.asnum`<br>`Number` | `AS Number` | The 16-bit or 32-bit integer representing the Autonomous System (AS) number associated with the client IP address. Example value:<br>`13335` |

## Proxied-only fields

If your traffic is proxied through Cloudflare, you have access to all the fields listed under [Fields supported regardless of proxy](#fields-supported-regardless-of-proxy) in addition to the following fields:

Many of these fields are referenced from the [Rules language documentation](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/).

| Field | Name in Expression Builder | Description |
| --- | --- | --- |
| [`http.cookie`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.cookie/)<br>`String` | ([Manual entry only](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/expressions/#expression-editor)) | Represents the entire cookie as a string. Example value: <br>`session=8521F670545D7865F79C3D7BEDC29CCE;-background=light` |
| [`http.host`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.host/)<br>`String` | ([Manual entry only](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/expressions/#expression-editor)) | Represents the hostname used in the full request URI. Example value: <br>`[www.example.org ↗︎](http://www.example.org)` |
| [`http.referer`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.referer/)<br>`String` | ([Manual entry only](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/expressions/#expression-editor)) | Represents the HTTP Referer request header, which contains the address of the web page that linked to the currently requested page. Example value: <br>`Referer: htt­ps://developer.example.org/en-US/docs/Web/JavaScript` |
| [`http.request.headers`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers/)<br>`Map<Array<String>>` | `Header` | Represents HTTP request headers as a Map (or associative array). The keys of the associative array are the names of HTTP request headers **converted to lowercase**. When there are repeating headers, the array includes them in the order they appear in the request.**Decoding:** no decoding performed <br>*Whitespace:* preserved <br>*Non-ASCII:* preserved Example: <br>`any(http.request.headers["content-type"][*] == "application/json")` Example value: <br>`` `{"content-type": ["application/json"]}` `` |
| [`http.request.method`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.method/)<br>`String` | `Request Method` | Represents the HTTP method, returned as a string of uppercase characters. Example value: <br>`GET` |
| [`http.request.timestamp.sec`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.timestamp.sec/)<br>`Integer` | `Timestamp` | Represents the timestamp when Cloudflare received the request, expressed as Unix time in seconds. This value is 10 digits long. Example value: <br>`1484063137` |
| [`http.request.uri`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri/)<br>`String` | `URI` | Represents the URI path and query string of the request. Example value: <br>`/articles/index?section=539061&expand=comments` |
| [`http.request.uri.args`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.args/)<br>`Map<Array<String>>` | ([Manual entry only](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/expressions/#expression-editor)) | Represents the HTTP URI arguments associated with a request as a Map (associative array). When an argument repeats, then the array contains multiple items in the order they appear in the request. The values are not pre-processed and retain the original case used in the request.*Decoding:* no decoding performed <br>*Non-ASCII:* preserved Example: <br>`any(http.request.uri.args["search"][*] == "red+apples")` Example value: <br>`` `{"search": ["red+apples"]}` `` |
| [`http.request.uri.args.names`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.args.names/)<br>`Array<String>` | ([Manual entry only](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/expressions/#expression-editor)) | Represents the names of the arguments in the HTTP URI query string. The names are not pre-processed and retain the original case used in the request. When a name repeats, the array contains multiple items in the order that they appear in the request.*Decoding:* no decoding performed <br>*Non-ASCII:* preserved Example: <br>`any(http.request.uri.args.names[*] == "search")` Example value: <br>`["search"]` |
| [`http.request.uri.args.values`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.args.values/)<br>`Array<String>` | ([Manual entry only](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/expressions/#expression-editor)) | Represents the values of arguments in the HTTP URI query string. The values are not pre-processed and retain the original case used in the request. They are in the same order as in the request. Duplicated values are listed multiple times.*Decoding:* no decoding performed <br>*Non-ASCII:* preserved Example: <br>`any(http.request.uri.args.values[*] == "red+apples")` Example value: <br>`["red+apples"]` |
| [`http.request.uri.path`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.path/)<br>`String` | `URI Path` | Represents the URI path of the request. Example value: <br>`/articles/index` |
| [`http.request.uri.query`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.query/)<br>`String` | `URI Query` | Represents the entire query string, without the `?` delimiter. Example value: <br>`section=539061&expand=comments` |
| [`http.request.version`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.version/)<br>`String` | `HTTP Version` | Represents the version of the HTTP protocol used. Use this field when you require different checks for different versions. Example Values:<ul><li>`HTTP/1.1`</li><li>`HTTP/3`</li></ul> |

## Unproxied-only fields

If your traffic is not proxied through Cloudflare, you have access to all the fields listed under [Fields supported regardless of proxy](#fields-supported-regardless-of-proxy) in addition to the following fields:

| Field | Name in Expression Builder | Description |
| --- | --- | --- |
| `dns.qry.name`<br>`Bytes` | `Query Name` | Represents the query name asked. Example value:<br>`example.com.` |
| `dns.qry.name.len`<br>`Integer` | `Query Name Length` | Represents the length in bytes of the query name. Example value:<br>`123` |
| `dns.qry.qu`<br>`Boolean` | `Question` | When `true`, this field indicates that the received DNS message was a question. |
| `dns.qry.type`<br>`Integer` | `Query Type` | Represents the numeric value of the [DNS query type](https://en.wikipedia.org/wiki/List_of_DNS_record_types). Example Values:<ul><li>`1` (A record)</li><li>`28` (AAAA record)</li></ul> |
| `dns.rr.opt.client`<br>`Boolean` | ([Manual entry only](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/expressions/#expression-editor)) | When `true`, this field indicates that the EDNS Client Subnet (ECS) address was sent with the DNS request. |
| `dns.rr.opt.client.addr`<br>`String` | ([Manual entry only](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/expressions/#expression-editor)) | If present, this field represents the ECS address sent with the DNS request. Example value:<br>`1.2.3.0` |

## Operators and grouping symbols

- **Comparison operators** specify how values defined in an expression must relate to the actual HTTP request value for the expression to return true.
- **Logical operators** combine two expressions to form a compound expression and use order of precedence to determine how an expression is evaluated.
- **Grouping symbols** allow you to organize expressions, enforce operator precedence, and nest expressions.

For examples and usage, refer to [Operators and grouping symbols](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/) in the Rules language documentation.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/reference/#page","headline":"Supported fields and operators","description":"Fields and operators for load balancing rule expressions.","url":"https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/reference/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
