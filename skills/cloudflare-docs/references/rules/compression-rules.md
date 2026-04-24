---
title: Compression Rules
description: Customize response compression algorithms for specific content types and file extensions.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/compression-rules/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Compression Rules

Use Compression Rules to customize the compression applied to responses from Cloudflare's global network to your website visitors, based on the file extension and content type. Compression Rules are powered by the [Ruleset Engine](https://developers.cloudflare.com/ruleset-engine/).

Cloudflare [compresses some responses by default](https://developers.cloudflare.com/speed/optimization/content/compression/), based on the content type. With Compression Rules, you can customize the default behavior, which includes defining preferred compression algorithms for particular file types.

When a compression rule matches and lists several compression algorithms (such as gzip and Brotli), Cloudflare selects the first algorithm from your list that the visitor's browser supports. Cloudflare determines browser support from the `accept-encoding` HTTP request header, which browsers send automatically to indicate which compression formats they can decompress. If multiple compression rules match the same request, the last matching rule takes precedence.

Note

Compression Rules require that you [proxy the DNS records](https://developers.cloudflare.com/dns/proxy-status/) of your domain (or subdomain) through Cloudflare.

## Get started

Cloudflare provides you with rules templates for common use cases.

1. In the Cloudflare dashboard, go to the Rules **Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
2. Select **Templates**, and then select one of the available templates.

You can also refer to the [Examples gallery](https://developers.cloudflare.com/rules/examples/) in the developer docs.

Alternatively, follow the instructions in the following pages to get started:

* [Create a compression rule in the dashboard](https://developers.cloudflare.com/rules/compression-rules/create-dashboard/)
* [Create a compression rule via Cloudflare API](https://developers.cloudflare.com/rules/compression-rules/create-api/)

---

## Availability

Compression Rules are available in all Cloudflare plans.

| Free            | Pro | Business | Enterprise |     |
| --------------- | --- | -------- | ---------- | --- |
| Availability    | Yes | Yes      | Yes        | Yes |
| Number of rules | 10  | 25       | 50         | 300 |

## Relevant fields

The following fields are commonly used in expressions of compression rules:

| Field in [Expression Builder](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/#expression-builder) | Field name                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _Media Type_                                                                                                                                    | [http.response.content\_type.media\_type](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.response.content%5Ftype.media%5Ftype/) |
| _File extension_                                                                                                                                | [http.request.uri.path.extension](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.path.extension/)                   |
| N/A                                                                                                                                             | [raw.http.request.uri.path.extension](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/raw.http.request.uri.path.extension/)           |

## Important remarks

* If a compression rule matches but the visitor's browser does not support any of the compression algorithms configured in the rule (based on the `accept-encoding` request header), the response will not be compressed.
* If a compression rule matches but the origin server's response includes a `cache-control: no-transform` HTTP header, the compression rule will not modify the response. Origin servers use this header to indicate that intermediaries (like Cloudflare) should not alter the response body.

## Troubleshooting

When troubleshooting Compression Rules, use [Cloudflare Trace](https://developers.cloudflare.com/rules/trace-request/) to determine if a rule is triggering for a specific URL.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/compression-rules/","name":"Compression Rules"}}]}
```
