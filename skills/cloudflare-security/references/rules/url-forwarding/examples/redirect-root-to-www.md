---
description: Create a redirect rule to forward HTTPS requests from the root (also known as the “apex” or “naked” domain) to the WWW subdomain.
title: Redirect from root to WWW
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Redirect from root to WWW

Create a redirect rule to forward HTTPS requests from the root (also known as the “apex” or “naked” domain) to the WWW subdomain.

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-root-to-www/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-root-to-www/#page","headline":"Redirect from root to WWW · Cloudflare Rules docs","description":"Create a redirect rule to forward HTTPS requests from the root (also known as the “apex” or “naked” domain) to the WWW subdomain.","url":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-root-to-www/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
