---
description: Modify request URLs, headers, and response headers with Transform Rules.
title: Transform Rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Transform Rules

Last updated Aug 14, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/transform/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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
[Go to **Overview** ↗](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
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

|                        | Free | Pro | Business | Enterprise |
| ---------------------- | ---- | --- | -------- | ---------- |
| Availability           | Yes  | Yes | Yes      | Yes        |
| Active Transform Rules | 10   | 25  | 50       | 300        |
| Regex support          | No   | No  | Yes      | Yes        |

A Cloudflare user must have the [Firewall role](https://developers.cloudflare.com/fundamentals/manage-members/roles/) or one of the Administrator roles to access Transform Rules.

## Transform Rules evaluation

Managed Transforms run before other types of Transform Rules that modify HTTP headers:

* Managed Transforms that adjust HTTP request headers run before Request Header Transform Rules.
* Managed Transforms that adjust HTTP response headers run before Response Header Transform Rules.

Transform Rules run in order. Rules that appear later in the list of Transform Rules can overwrite changes done by previous rules. You can define the rule order in the dashboard or via API.

Request and response fields are immutable within each [phase](https://developers.cloudflare.com/ruleset-engine/about/phases/) while evaluating Transform Rules for a request/response. This means that later rules in the same phase cannot match on changes made by earlier rules (they always use the original field values). For more information, refer to [Field values during rule evaluation](https://developers.cloudflare.com/ruleset-engine/about/rules/#field-values-during-rule-evaluation).

Caution

Using Cloudflare challenges along with Rules features such as Transform Rules may cause challenge loops. Refer to [Rules troubleshooting](https://developers.cloudflare.com/rules/reference/troubleshooting/) for more information.

## Troubleshooting

When troubleshooting Transform Rules, use [Cloudflare Trace](https://developers.cloudflare.com/rules/trace-request/) to determine if a rule is triggering for a specific URL.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/#page","headline":"Transform Rules · Cloudflare Rules docs","description":"Modify request URLs, headers, and response headers with Transform Rules.","url":"https://developers.cloudflare.com/rules/transform/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
