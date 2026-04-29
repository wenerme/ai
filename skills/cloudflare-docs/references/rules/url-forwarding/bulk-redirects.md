---
title: Bulk Redirects
description: Redirect large numbers of URLs with Bulk Redirects at the account level.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bulk Redirects

Bulk Redirects allow you to define a large number of URL redirects at the account level, which can apply across domains in your account. These redirects navigate the user from a source URL to a target URL using a given HTTP status code. URL redirection is also known as URL forwarding.

Unlike dynamic URL redirects created in [Single Redirects](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/), Bulk Redirects are essentially static. They do not support string replacement operations or regular expressions. However, you can configure URL redirect parameters that affect how source URLs are matched and how the redirect is performed.

For more complex and customized redirect logic, consider using [Snippets](https://developers.cloudflare.com/rules/snippets/).

---

## Related resources

* [Availability](https://developers.cloudflare.com/rules/url-forwarding/#availability): Information on the Bulk Redirects quotas and features per Cloudflare plan.
* [Execution order](https://developers.cloudflare.com/rules/url-forwarding/#execution-order): Execution order of the different Rules products.
* [Trace a request](https://developers.cloudflare.com/rules/trace-request/): Use Cloudflare Trace to determine if a bulk redirect rule is triggering for a specific URL.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/url-forwarding/","name":"Redirects"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/url-forwarding/bulk-redirects/","name":"Bulk Redirects"}}]}
```
