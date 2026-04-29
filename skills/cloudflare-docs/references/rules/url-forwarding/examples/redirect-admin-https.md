---
title: Redirect admin area requests to HTTPS
description: Create a redirect rule to redirect requests for the administration area of `store.example.com` to HTTPS, keeping the original path and query string.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Redirect admin area requests to HTTPS

Create a redirect rule to redirect requests for the administration area of `store.example.com` to HTTPS, keeping the original path and query string.

This example single redirect for zone `example.com` will redirect requests for the administration area of a specific subdomain (`store.example.com`) to HTTPS, keeping the original path and query string.

**When incoming requests match**

* **Wildcard pattern**  
   * **Request URL**: `http://store.example.com/admin*`

**Then**

* **Target URL**: `https://store.example.com/admin${1}`
* **Status code:** _301_
* **Preserve query string:** Enabled

For example, the redirect rule would perform the following redirects:

| Request URL                                      | Target URL                                        | Status code |
| ------------------------------------------------ | ------------------------------------------------- | ----------- |
| http://store.example.com/admin/products/         | https://store.example.com/admin/products/         | 301         |
| https://store.example.com/admin/products/        | (unchanged)                                       | n/a         |
| http://store.example.com/admin/?logged\_out=true | https://store.example.com/admin/?logged\_out=true | 301         |
| http://store.example.com/?all\_items=true        | (unchanged)                                       | n/a         |
| http://example.com/admin/                        | (unchanged)                                       | n/a         |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/url-forwarding/","name":"Redirects"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/url-forwarding/examples/","name":"Redirect examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/url-forwarding/examples/redirect-admin-https/","name":"Redirect admin area requests to HTTPS"}}]}
```
