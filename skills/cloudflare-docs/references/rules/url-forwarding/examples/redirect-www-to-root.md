---
title: Redirect from WWW to root
description: Create a redirect rule to forward HTTPS requests from the WWW subdomain to the root (also known as the “apex” or “naked” domain).
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Redirect from WWW to root

Create a redirect rule to forward HTTPS requests from the WWW subdomain to the root (also known as the “apex” or “naked” domain).

This example creates a redirect rule that forwards HTTPS requests from the WWW subdomain (`www.example.com`) to the root domain (`example.com`), while retaining the original path and query string.

**When incoming requests match**

* **Wildcard pattern**  
   * **Request URL**: `https://www.*`

**Then**

* **Target URL**: `https://${1}`
* **Status code**: _301_
* **Preserve query string**: Enabled

This rule ensures that only HTTPS requests from `www.` subdomains are redirected to the root domain, leaving other requests (such as HTTP or non-WWW) unchanged.

For example, the redirect rule would perform the following redirects:

| Request URL                                     | Target URL                                  | Status code |
| ----------------------------------------------- | ------------------------------------------- | ----------- |
| https://www.example.com/products/               | https://example.com/products/               | 301         |
| https://www.store.example.com/products/         | https://store.example.com/products/         | 301         |
| https://store.example.com/products/             | (unchanged)                                 | n/a         |
| https://www.example.com/admin/?logged\_out=true | https://example.com/admin/?logged\_out=true | 301         |
| http://www.example.com/?all\_items=true         | (unchanged)                                 | n/a         |
| http://example.com/admin/                       | (unchanged)                                 | n/a         |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/url-forwarding/","name":"Redirects"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/url-forwarding/examples/","name":"Redirect examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/url-forwarding/examples/redirect-www-to-root/","name":"Redirect from WWW to root"}}]}
```
