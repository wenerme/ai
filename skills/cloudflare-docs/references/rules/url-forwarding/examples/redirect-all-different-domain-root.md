---
title: Redirect requests for a domain to a new domain
description: Create a redirect rule to redirect all URLs for a domain to point to the root of a new domain, including any subdomains of the old domain.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/url-forwarding/examples/redirect-all-different-domain-root.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Redirect requests for a domain to a new domain

Create a redirect rule to redirect all URLs for a domain to point to the root of a new domain, including any subdomains of the old domain.

In this example, an old website was discontinued and replaced by a new one in a different domain. The functionality is different, and all URLs should now point to the root of the new domain. The same applies to any subdomains of the old domain.

[Create a redirect rule](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/) with the following configuration:

**When incoming requests match**

* **Wildcard pattern**  
   * **Request URL**: `http*://*example.com/*`

**Then**

* **Target URL**: `https://example.net/`
* **Status code:** _301_

For example, the redirect rule would perform the following redirects:

| Request URL                             | Target URL           | Status code |
| --------------------------------------- | -------------------- | ----------- |
| http://example.com/                     | https://example.net/ | 301         |
| https://example.com/                    | https://example.net/ | 301         |
| https://subdomain.example.com/          | https://example.net/ | 301         |
| https://example.com/my/path/to/page.htm | https://example.net/ | 301         |
| https://example.com/search?q=term       | https://example.net/ | 301         |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/url-forwarding/","name":"Redirects"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/url-forwarding/examples/","name":"Redirect examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/url-forwarding/examples/redirect-all-different-domain-root/","name":"Redirect requests for a domain to a new domain"}}]}
```
