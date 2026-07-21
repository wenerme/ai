---
description: Create a redirect rule to forward HTTPS requests from the WWW subdomain to the root (also known as the “apex” or “naked” domain).
title: Redirect from WWW to root
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

#  Redirect from WWW to root

Create a redirect rule to forward HTTPS requests from the WWW subdomain to the root (also known as the “apex” or “naked” domain).

Last updated May 5, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-www-to-root/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

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

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-www-to-root/#page","headline":"Redirect from WWW to root · Cloudflare Rules docs","description":"Create a redirect rule to forward HTTPS requests from the WWW subdomain to the root (also known as the “apex” or “naked” domain).","url":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-www-to-root/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
