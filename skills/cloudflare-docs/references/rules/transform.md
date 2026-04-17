---
title: Transform Rules
description: Modify request URLs, headers, and response headers with Transform Rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/transform/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Transform Rules

Transform Rules allow you to adjust the URI path, query string, and HTTP headers of requests and responses on the Cloudflare global network.

There are several types of Transform Rules:

* [**URL Rewrite Rules**](https://developers.cloudflare.com/rules/transform/url-rewrite/): Rewrite the URL path and query string of an HTTP request.
* [**Request Header Transform Rules**](https://developers.cloudflare.com/rules/transform/request-header-modification/): Set the value of an HTTP request header or remove a request header.
* [**Response Header Transform Rules**](https://developers.cloudflare.com/rules/transform/response-header-modification/): Set the value of an HTTP response header or remove a response header.
* [**Managed Transforms**](https://developers.cloudflare.com/rules/transform/managed-transforms/): Perform common adjustments to HTTP request and response headers with pre-built, one-step configurations.

For more complex header modifications and rewrite logic, consider using [Snippets](https://developers.cloudflare.com/rules/snippets/).

  
Note

Transform Rules require that you [proxy the DNS records](https://developers.cloudflare.com/dns/proxy-status/) of your domain (or subdomain) through Cloudflare.

## Get started

Cloudflare provides you with rules templates for common use cases.

1. In the Cloudflare dashboard, go to the Rules **Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
2. Select **Templates**, and then select one of the available templates.

You can also refer to the [Examples gallery](https://developers.cloudflare.com/rules/examples/) in the developer docs.

Alternatively, create a transform rule from scratch in the dashboard or via Cloudflare API. Refer to the following sections for detailed instructions:

* [URL Rewrite Rules](https://developers.cloudflare.com/rules/transform/url-rewrite/)
* [Request Header Transform Rules](https://developers.cloudflare.com/rules/transform/request-header-modification/)
* [Response Header Transform Rules](https://developers.cloudflare.com/rules/transform/response-header-modification/)
* [Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/)

For Terraform examples, refer to [Transform Rules configuration using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/transform-rules/).

Refer to [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/) for more information on building expressions for Transform Rules.

## Availability

Cloudflare Transform Rules are available to all customers. Support for regular expressions depends on your Cloudflare plan.

This table outlines the Transform Rules features available with each customer plan:

| Free                   | Pro | Business | Enterprise |     |
| ---------------------- | --- | -------- | ---------- | --- |
| Availability           | Yes | Yes      | Yes        | Yes |
| Active Transform Rules | 10  | 25       | 50         | 300 |
| Regex support          | No  | No       | Yes        | Yes |

A Cloudflare user must have the [Firewall role](https://developers.cloudflare.com/fundamentals/manage-members/roles/) or one of the Administrator roles to access Transform Rules.

## Transform Rules evaluation

Managed Transforms run before other types of Transform Rules that modify HTTP headers:

* Managed Transforms that adjust HTTP request headers run before Request Header Transform Rules.
* Managed Transforms that adjust HTTP response headers run before Response Header Transform Rules.

Transform Rules run in order. Rules that appear later in the list of Transform Rules can overwrite changes done by previous rules. You can define the rule order in the dashboard or via API.

Request and response fields are immutable within each [phase](https://developers.cloudflare.com/ruleset-engine/about/phases/) while evaluating Transform Rules for a request/response. This means that later rules in the same phase cannot match on changes made by earlier rules (they always use the original field values). For more information, refer to [Field values during rule evaluation](https://developers.cloudflare.com/ruleset-engine/about/rules/#field-values-during-rule-evaluation).

Warning

Using Cloudflare challenges along with Rules features such as Transform Rules may cause challenge loops. Refer to [Rules troubleshooting](https://developers.cloudflare.com/rules/reference/troubleshooting/) for more information.

## Troubleshooting

When troubleshooting Transform Rules, use [Cloudflare Trace](https://developers.cloudflare.com/rules/trace-request/) to determine if a rule is triggering for a specific URL.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}}]}
```
