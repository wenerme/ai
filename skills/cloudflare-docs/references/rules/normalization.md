---
title: URL normalization
description: Cloudflare provides a URL normalization feature to modify the URLs of incoming requests so that they conform to a consistent formatting standard.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/normalization/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# URL normalization

Cloudflare provides a URL normalization feature to modify the URLs of incoming requests so that they conform to a consistent formatting standard.

When you enable URL normalization, all incoming URLs are normalized before they pass to subsequent global network features that accept a URL input, such as WAF custom rules, Workers, and Access. Rule expressions that filter traffic based on URLs will therefore trigger correctly, regardless of the format of the incoming URL. When URL normalization is disabled, Cloudflare forwards the URL to origin in its original form.

Warning

When traffic is proxied via Cloudflare, essential request URL normalization is always applied regardless whether URL normalization is enabled for a specific zone. For example, you cannot disable the conversion of two or more adjacent slashes into a single slash in a request URL by turning off URL normalization.

URL normalization does not perform any redirects, and therefore it will not change the address displayed in the visitor's browser. The normalization operation, when enabled, occurs on the global network and affects Cloudflare features executed later and (optionally) the URL received at the origin server.

Note

URL normalization requires that you [proxy the DNS records](https://developers.cloudflare.com/dns/proxy-status/) of your domain (or subdomain) through Cloudflare.

---

## Availability

URL normalization is available in all Cloudflare plans.

## Get started

Learn more about [URL normalization](https://developers.cloudflare.com/rules/normalization/how-it-works/) and how to [configure URL normalization](https://developers.cloudflare.com/rules/normalization/manage/) in the Cloudflare dashboard.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/normalization/","name":"URL normalization"}}]}
```
