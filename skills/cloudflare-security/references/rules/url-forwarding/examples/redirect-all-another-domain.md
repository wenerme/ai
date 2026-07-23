---
description: Create a redirect rule to redirect all requests to a different domain, maintaining all functionality, except for the discontinued HTTP service (port 80).
title: Redirect requests from one domain to another
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Redirect requests from one domain to another

Create a redirect rule to redirect all requests to a different domain, maintaining all functionality, except for the discontinued HTTP service (port 80).

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-another-domain/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-another-domain/#page","headline":"Redirect requests from one domain to another · Cloudflare Rules docs","description":"Create a redirect rule to redirect all requests to a different domain, maintaining all functionality, except for the discontinued HTTP service (port 80).","url":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-another-domain/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
