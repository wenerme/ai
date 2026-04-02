---
title: Compression Rules
description: Use Compression Rules to customize the compression applied to responses from Cloudflare's global network to your website visitors, based on the file extension and content type. Compression Rules are powered by the Ruleset Engine.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/compression-rules/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Compression Rules

Use Compression Rules to customize the compression applied to responses from Cloudflare's global network to your website visitors, based on the file extension and content type. Compression Rules are powered by the [Ruleset Engine](https://developers.cloudflare.com/ruleset-engine/).

Cloudflare [compresses some responses by default](https://developers.cloudflare.com/speed/optimization/content/compression/), based on the content type. With Compression Rules, you can customize the default behavior, which includes defining preferred compression algorithms for particular file types.

When there is a match for a compression rule configured with several compression algorithms, the selected algorithm is the first one supported by the website visitor, according to the received `accept-encoding` HTTP header. If multiple compression rules match, the last rule wins.

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

* If there is a match for a compression rule but the client does not support any of the compression algorithms configured in the rule (according to the provided `accept-encoding` request header), the response sent to the client will not be compressed.
* If there is a match for a compression rule but the response sent from the origin server contains a `cache-control: no-transform` HTTP header, the compression rule will not perform any changes to the response.

## Troubleshooting

When troubleshooting Compression Rules, use [Cloudflare Trace](https://developers.cloudflare.com/rules/trace-request/) to determine if a rule is triggering for a specific URL.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/compression-rules/","name":"Compression Rules"}}]}
```
