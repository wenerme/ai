---
title: Redirect requests from one domain to another
description: Create a redirect rule to redirect all requests to a different domain, maintaining all functionality, except for the discontinued HTTP service (port 80).
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/url-forwarding/examples/redirect-all-another-domain.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Redirect requests from one domain to another

Create a redirect rule to redirect all requests to a different domain, maintaining all functionality, except for the discontinued HTTP service (port 80).

In this example the original domain was replaced with a different domain. All functionality was maintained, except for the HTTP service (port 80) which was discontinued.

[Create a redirect rule](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/) with the following configuration:

**When incoming requests match**

* **Wildcard pattern**  
   * **Request URL**: `http*://example.com/*`

**Then**

* **Target URL**: `https://example.net/${2}`
* **Status code:** _301_
* **Preserve query string:** Enabled

This configuration will perform the following redirects:

| Request URL                             | URL after redirect                      | Status code |
| --------------------------------------- | --------------------------------------- | ----------- |
| http://example.com/                     | https://example.net/                    | 301         |
| https://example.com/                    | https://example.net/                    | 301         |
| https://example.com/my/path/to/page.htm | https://example.net/my/path/to/page.htm | 301         |
| https://example.com/search?q=term       | https://example.net/search?q=term       | 301         |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/url-forwarding/","name":"Redirects"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/url-forwarding/examples/","name":"Redirect examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/url-forwarding/examples/redirect-all-another-domain/","name":"Redirect requests from one domain to another"}}]}
```
