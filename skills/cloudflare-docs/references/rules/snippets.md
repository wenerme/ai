---
title: Cloudflare Snippets
description: Run lightweight JavaScript at the edge to modify requests and responses.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Snippets

Cloudflare Snippets allow you to run short pieces of JavaScript code on Cloudflare's network to customize how requests and responses are handled for your website or application. With Snippets, you can modify HTTP response headers, implement JWT validation, perform complex redirects, and more.

For code samples addressing common use cases, refer to the [Examples](https://developers.cloudflare.com/rules/snippets/examples/) section.

Note

Snippets require that you [proxy the DNS records](https://developers.cloudflare.com/dns/proxy-status/) of your domain (or subdomain) through Cloudflare.

## Snippets elements

To create and deploy a snippet, you need to define the following elements:

* **Snippet rule**: A [filter expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/) that determines which requests the Snippet will be applied to. Each snippet can only be associated with one snippet rule.
* **Code snippet**: JavaScript code that runs on the Cloudflare network when a request matches the associated snippet rule.

For more information, refer to [How Snippets work](https://developers.cloudflare.com/rules/snippets/how-it-works/) and [Create a snippet in the dashboard](https://developers.cloudflare.com/rules/snippets/create-dashboard/).

Note

If you have used the Cloudflare API to create a code snippet that is not associated with a snippet rule, the Cloudflare dashboard will show that code snippet in a separate tab called **Unused Snippets**. You can either edit the snippet code and associate it with a snippet rule, or delete the unused code snippet.

## Templates

Cloudflare provides you with rules templates for common use cases.

1. In the Cloudflare dashboard, go to the Rules **Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
2. Select **Templates**, and then select one of the available templates.

You can also refer to the [Examples gallery](https://developers.cloudflare.com/rules/examples/) in the developer docs.

## Availability

| Free                          | Pro | Business | Enterprise |     |
| ----------------------------- | --- | -------- | ---------- | --- |
| Availability                  | No  | Yes      | Yes        | Yes |
| Number of snippets            | 0   | 25       | 50         | 300 |
| Number of snippet subrequests | 0   | 2        | 3          | 5   |

Each subrequest in a redirect chain counts against the subrequest limit. This means that if a subrequest was redirected it would count as two subrequests. To avoid issues, ensure that you make a subrequest to the end location of the redirect chain.

Currently, [Version Management](https://developers.cloudflare.com/version-management/) does not support Snippets.

## Limits

Cloudflare Snippets are designed for fast, lightweight logic that runs on the Cloudflare network. The following limits apply:

| Description                | All plans |
| -------------------------- | --------- |
| Maximum execution time     | 5 ms      |
| Maximum memory             | 2 MB      |
| Maximum total package size | 32 KB     |

Need guidance on choosing between Snippets and Workers? 

Explore our [detailed guide](https://developers.cloudflare.com/rules/snippets/when-to-use/) for best practices, real-world use cases, and example implementations.

## Execution order

The execution order of Rules features is the following:

* [Single Redirects](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/)
* [URL Rewrite Rules](https://developers.cloudflare.com/rules/transform/url-rewrite/)
* [Configuration Rules](https://developers.cloudflare.com/rules/configuration-rules/)
* [Origin Rules](https://developers.cloudflare.com/rules/origin-rules/)
* [Bulk Redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/)
* [Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/)
* [Request Header Transform Rules](https://developers.cloudflare.com/rules/transform/request-header-modification/)
* [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/)
* [Snippets](https://developers.cloudflare.com/rules/snippets/)
* [Cloud Connector](https://developers.cloudflare.com/rules/cloud-connector/)

The different types of rules listed above will take precedence over [Page Rules](https://developers.cloudflare.com/rules/page-rules/). This means that Page Rules will be overridden if there is a match for both Page Rules and the Rules products listed above.

Generally speaking, for [non-terminating actions](https://developers.cloudflare.com/ruleset-engine/rules-language/actions/) the last change made by rules in the same [phase](https://developers.cloudflare.com/ruleset-engine/about/phases/) will win (later rules can overwrite changes done by previous rules). However, for terminating actions (_Block_, _Redirect_, or one of the challenge actions), rule evaluation will stop and the action will be executed immediately.

For example, if multiple rules with the _Redirect_ action match, Cloudflare will always use the URL redirect of the first rule that matches. Also, if you configure URL redirects using different Cloudflare products (Single Redirects and Bulk Redirects), the product executed first will apply, if there is a rule match (in this case, Single Redirects).

Refer to the [Phases list](https://developers.cloudflare.com/ruleset-engine/reference/phases-list/) for the product execution order.

Warning

Using Cloudflare challenges along with Rules features may cause challenge loops. Refer to [Rules troubleshooting](https://developers.cloudflare.com/rules/reference/troubleshooting/) for more information.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/snippets/","name":"Cloudflare Snippets"}}]}
```
