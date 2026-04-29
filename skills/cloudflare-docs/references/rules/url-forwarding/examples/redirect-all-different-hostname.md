---
title: Redirect requests to a different hostname
description: Create a redirect rule to redirect all requests for `smallshop.example.com` to a different hostname using HTTPS, keeping the original path and query string.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Redirect requests to a different hostname

Create a redirect rule to redirect all requests for `smallshop.example.com` to a different hostname using HTTPS, keeping the original path and query string.

This example single redirect will redirect all requests for `smallshop.example.com` to a different hostname `globalstore.example.net` using HTTPS, keeping the original path and query string.

**When incoming requests match**

* **Wildcard pattern**  
   * **Request URL**: `http*://smallshop.example.com/*`

**Then**

* **Target URL**: `https://globalstore.example.net/${2}`
* **Status code:** _301_
* **Preserve query string:** Enabled

For example, the redirect rule would perform the following redirects:

| Request URL                                          | Target URL                                              | Status code |
| ---------------------------------------------------- | ------------------------------------------------------- | ----------- |
| http://smallshop.example.com/                        | https://globalstore.example.net/                        | 301         |
| http://smallshop.example.com/admin/?logged\_out=true | https://globalstore.example.net/admin/?logged\_out=true | 301         |
| https://smallshop.example.com/?all\_items=1          | https://globalstore.example.net/?all\_items=1           | 301         |
| http://example.com/about/                            | (unchanged)                                             | n/a         |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/url-forwarding/","name":"Redirects"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/url-forwarding/examples/","name":"Redirect examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/url-forwarding/examples/redirect-all-different-hostname/","name":"Redirect requests to a different hostname"}}]}
```
