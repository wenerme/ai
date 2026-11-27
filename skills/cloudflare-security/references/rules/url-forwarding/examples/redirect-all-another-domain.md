---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Create a redirect rule to redirect all requests to a different domain, maintaining all functionality, except for the discontinued HTTP service (port 80).
title: Redirect requests from one domain to another
image: https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-another-domain/og.png?v=91fbf1157cf4600f
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Redirect requests from one domain to another

Create a redirect rule to redirect all requests to a different domain, maintaining all functionality, except for the discontinued HTTP service (port 80).

In this example the original domain was replaced with a different domain. All functionality was maintained, except for the HTTP service (port 80) which was discontinued.

[Create a redirect rule](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/) with the following configuration:

**When incoming requests match**

- **Wildcard pattern**
  - **Request URL**: `http*://example.com/*`

**Then**

- **Target URL**: `https://example.net/${2}`
- **Status code:** *301*
- **Preserve query string:** Enabled

The target URL uses `${2}` instead of `${1}`. In the request URL, the `*` in `http*` is `${1}`, and the second `*` captures the path. Refer to [How wildcard references are numbered](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/#how-wildcard-references-are-numbered).

This configuration will perform the following redirects:

| Request URL | URL after redirect | Status code |
| --- | --- | --- |
| `http://example.com/` | `https://example.net/` | `301` |
| `https://example.com/` | `https://example.net/` | `301` |
| `https://example.com/my/path/to/page.htm` | `https://example.net/my/path/to/page.htm` | `301` |
| `https://example.com/search?q=term` | `https://example.net/search?q=term` | `301` |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-another-domain/#page","headline":"Redirect requests from one domain to another","description":"Create a redirect rule to redirect all requests to a different domain, maintaining all functionality, except for the discontinued HTTP service (port 80).","url":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-another-domain/","inLanguage":"en","image":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-another-domain/og.png?v=91fbf1157cf4600f","dateModified":"2026-11-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
