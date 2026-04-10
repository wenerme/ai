---
title: Origin Rules
description: Origin Rules allow you to change the origin server that Cloudflare sends a request to, or modify how the request reaches that server. This is useful when you need to route specific requests to a different backend, such as a third-party service or a server on a non-standard port. You can perform the following overrides:
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/origin-rules/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Origin Rules

Origin Rules allow you to change the origin server that Cloudflare sends a request to, or modify how the request reaches that server. This is useful when you need to route specific requests to a different backend, such as a third-party service or a server on a non-standard port. You can perform the following overrides:

* [Host header](https://developers.cloudflare.com/rules/origin-rules/features/#host-header): Overrides the `Host` header of incoming requests.
* [Server Name Indication (SNI)](https://developers.cloudflare.com/rules/origin-rules/features/#server-name-indication-sni): Overrides the Server Name Indication (SNI) value of incoming requests.
* [DNS record](https://developers.cloudflare.com/rules/origin-rules/features/#dns-record): Overrides the resolved hostname of incoming requests, sending the request to a different origin server.
* [Destination port](https://developers.cloudflare.com/rules/origin-rules/features/#destination-port): Overrides the resolved destination port of incoming requests.

Each origin rule includes a [filter expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/) that defines which requests the overrides apply to (for example, matching on hostname, path, or other request properties).

For more complex and customized modifications, consider using [Snippets](https://developers.cloudflare.com/rules/snippets/).

  
Note

Origin Rules require that you [proxy the DNS records](https://developers.cloudflare.com/dns/proxy-status/) of your domain (or subdomain) through Cloudflare.

## Rules templates

Cloudflare provides you with rules templates for common use cases.

1. In the Cloudflare dashboard, go to the Rules **Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
2. Select **Templates**, and then select one of the available templates.

You can also refer to the [Examples gallery](https://developers.cloudflare.com/rules/examples/) in the developer docs.

## Availability

| Free                      | Pro | Business | Enterprise |     |
| ------------------------- | --- | -------- | ---------- | --- |
| Availability              | Yes | Yes      | Yes        | Yes |
| Number of rules           | 10  | 25       | 50         | 300 |
| Override Host header      | No  | No       | No         | Yes |
| Override SNI              | No  | No       | No         | Yes |
| Override DNS records      | No  | No       | No         | Yes |
| Override destination port | Yes | Yes      | Yes        | Yes |

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

## Important remarks

If you override the hostname with an origin rule (via `Host` header override or DNS record override) and add a header override to your load balancer configuration, the origin rule will take precedence over the load balancer configuration.

Like [Page Rules](https://developers.cloudflare.com/rules/page-rules/), an origin rule performing a `Host` header override will update the SNI value of the original request to the same value of the `Host` header. To set an SNI value different from the `Host` header override, add an SNI override in the same origin rule or create a separate origin rule for this purpose.

## Troubleshooting

When troubleshooting origin rules, use [Cloudflare Trace](https://developers.cloudflare.com/rules/trace-request/) to determine if a rule is triggering for a specific URL.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/origin-rules/","name":"Origin Rules"}}]}
```
