---
title: Redirect from root to WWW
description: Create a redirect rule to forward HTTPS requests from the root (also known as the “apex” or “naked” domain) to the WWW subdomain.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Redirect from root to WWW

Create a redirect rule to forward HTTPS requests from the root (also known as the “apex” or “naked” domain) to the WWW subdomain.

This example creates a redirect rule that forwards HTTPS requests from the root domain (`example.com`) to the WWW subdomain (`www.example.com`), while retaining the original path and query string.

**When incoming requests match**

* **Wildcard pattern**  
   * **Request URL**: `https://example.com/*`

**Then**

* **Target URL**: `https://www.example.com/${1}`
* **Status code**: _301_
* **Preserve query string**: Enabled

This rule ensures that only HTTPS requests from the root domain are redirected to the WWW subdomain, leaving other requests (such as HTTP or requests to other subdomains) unchanged.

For example, the redirect rule would perform the following redirects:

| Request URL                                 | Target URL                                      | Status code |
| ------------------------------------------- | ----------------------------------------------- | ----------- |
| https://example.com/products/               | https://www.example.com/products/               | 301         |
| https://store.example.com/products/         | (unchanged)                                     | n/a         |
| https://example.com/admin/?logged\_out=true | https://www.example.com/admin/?logged\_out=true | 301         |
| http://example.com/?all\_items=true         | (unchanged)                                     | n/a         |
| http://www.example.com/admin/               | (unchanged)                                     | n/a         |

Make sure to replace `example.com` with your actual hostname before deploying your rule.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/url-forwarding/","name":"Redirects"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/url-forwarding/examples/","name":"Redirect examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/url-forwarding/examples/redirect-root-to-www/","name":"Redirect from root to WWW"}}]}
```
