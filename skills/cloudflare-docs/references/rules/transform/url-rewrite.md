---
title: URL Rewrite Rules
description: Rewrite request URL paths and query strings with Transform Rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/transform/url-rewrite/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# URL Rewrite Rules

You can manipulate the URL of a request through different operations, namely rewrites and redirects:

* **URL rewrite**: A server-side operation that converts a source URL into a target URL. It occurs before a web server has fully processed a request. A rewrite is not visible to website visitors, since the URL displayed in the browser does not change. Configure URL Rewrite Rules to perform rewrites on the Cloudflare global network without reaching your web server.
* **URL redirect**: A client-side operation that converts a source URL into a target URL. It occurs after the web server has loaded the initial URL. In this case, a website visitor can notice the URL changing when the redirect occurs. Refer to [Redirects](https://developers.cloudflare.com/rules/url-forwarding/) to learn more about configuring redirects.

Use a URL rewrite rule to return the content of a URL while displaying a different URL in the browser. You can rewrite the URI path, the query string, or both.

Warning

You cannot rewrite the hostname using a URL rewrite rule. To rewrite the hostname, use an [origin rule](https://developers.cloudflare.com/rules/origin-rules/features/#dns-record).

For more complex rewrite logic, consider using [Snippets](https://developers.cloudflare.com/rules/snippets/).

## Static and dynamic rewrites

URL Rewrite Rules can perform static or dynamic rewrites:

* **Static rewrite**: Replaces a given part of a request URL (path or query string) with a static string.
* **Dynamic rewrite**: Supports more advanced scenarios where you use a [rewrite expression](https://developers.cloudflare.com/ruleset-engine/rules-language/) (a formula based on request properties) to define the resulting path or query string.

Create URL Rewrite Rules [in the dashboard](https://developers.cloudflare.com/rules/transform/url-rewrite/create-dashboard/), [via Cloudflare API](https://developers.cloudflare.com/rules/transform/url-rewrite/create-api/), or [using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/transform-rules/#create-a-url-rewrite-rule).

## Serve images from custom paths

When using Cloudflare Images, you can use URL Rewrite Rules to serve images from a custom path. For more information, refer to [Serve images from custom domains](https://developers.cloudflare.com/images/optimization/hosted-images/serve-from-custom-domains/).

## Troubleshooting

When troubleshooting URL Rewrite Rules, use [Cloudflare Trace](https://developers.cloudflare.com/rules/trace-request/) to determine if a rule is triggering for a specific URL.

## Important remarks

* URL rewrite rules run in order, and later rules can overwrite changes done by previous rules.
* The values of request and response fields are immutable within each [phase](https://developers.cloudflare.com/ruleset-engine/about/phases/), such as the `http_request_transform` phase where URL rewrite rules are defined. This means that later URL rewrite rules will still use the original field values when evaluating their filter expressions, not the values changed by previous rules. Refer to [Field values during rule evaluation](https://developers.cloudflare.com/ruleset-engine/about/rules/#field-values-during-rule-evaluation) for more information.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/url-rewrite/","name":"URL Rewrite Rules"}}]}
```
