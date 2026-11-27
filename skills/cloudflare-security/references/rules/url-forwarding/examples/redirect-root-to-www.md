---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Create a redirect rule to forward HTTPS requests from the root (also known as the “apex” or “naked” domain) to the WWW subdomain.
title: Redirect from root to WWW
image: https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-root-to-www/og.png?v=3bb142c170fab23f
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Redirect from root to WWW

Create a redirect rule to forward HTTPS requests from the root (also known as the “apex” or “naked” domain) to the WWW subdomain.

This example creates a redirect rule that forwards HTTPS requests from the root domain (`example.com`) to the WWW subdomain (`www.example.com`), while retaining the original path and query string.

**When incoming requests match**

- **Wildcard pattern**
  - **Request URL**: `https://example.com/*`

**Then**

- **Target URL**: `https://www.example.com/${1}`
- **Status code**: *301*
- **Preserve query string**: Enabled

This rule ensures that only HTTPS requests from the root domain are redirected to the WWW subdomain, leaving other requests (such as HTTP or requests to other subdomains) unchanged. The target URL uses `${1}` because the request URL has only one `*`, which captures the path and query string.

To also redirect HTTP requests, turn on [Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/), or use the request URL `http*://example.com/*` with the target URL `https://www.example.com/${2}`. The `http*` rule redirects HTTP visitors in one step. With Always Use HTTPS, HTTP visitors are redirected twice. Refer to [How wildcard references are numbered](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/#how-wildcard-references-are-numbered).

For example, the redirect rule would perform the following redirects:

| Request URL | Target URL | Status code |
| --- | --- | --- |
| `https://example.com/products/` | `https://www.example.com/products/` | `301` |
| `https://store.example.com/products/` | (unchanged) | n/a |
| `https://example.com/admin/?logged_out=true` | `https://www.example.com/admin/?logged_out=true` | `301` |
| `http://example.com/?all_items=true` | (unchanged) | n/a |
| `http://www.example.com/admin/` | (unchanged) | n/a |

Make sure to replace `example.com` with your actual hostname before deploying your rule.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-root-to-www/#page","headline":"Redirect from root to WWW","description":"Create a redirect rule to forward HTTPS requests from the root (also known as the “apex” or “naked” domain) to the WWW subdomain.","url":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-root-to-www/","inLanguage":"en","image":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-root-to-www/og.png?v=3bb142c170fab23f","dateModified":"2026-11-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
