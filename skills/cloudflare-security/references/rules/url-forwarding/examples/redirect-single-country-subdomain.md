---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Create a redirect rule with the Expression Builder to temporarily redirect visitors from one country to a localized subdomain.
title: Redirect visitors from one country to a subdomain
image: https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-single-country-subdomain/og.png?v=eda6adcabe112042
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Redirect visitors from one country to a subdomain

Create a redirect rule with the Expression Builder to temporarily redirect visitors from one country to a localized subdomain.

This example single redirect for zone `example.com` will redirect visitors from Germany who request the website's root path (`/`) to `https://de.example.com/`. You can create this rule with the Expression Builder and a static target URL, without writing an expression.

**When incoming requests match**

- **Custom filter expression**

Using the Expression Builder:

- *Hostname* *equals* `example.com` **AND**
- *Country* *equals* *Germany* **AND**
- *URI Path* *equals* `/`

If you are using the Expression Editor, enter the following expression:
`(http.host eq "example.com" and ip.src.country eq "DE" and http.request.uri.path eq "/")`

**Then**

- **Type:** *Static*
- **URL:** `https://de.example.com/`
- **Status code:** *302*
- **Preserve query string:** Enabled

The *Hostname* condition prevents a redirect loop. Without it, a visitor from Germany who requests `https://de.example.com/` would match the rule again and be redirected to the same URL.

This example uses a `302` (temporary) status code. Browsers can cache `301` (permanent) redirects, and Cloudflare does not add a `Cache-Control` header to redirect responses. A visitor who later browses from another country might keep receiving a cached `301` redirect.

For example, the redirect rule would perform the following redirects:

| Visitor country | Request URL | Target URL | Status code |
| --- | --- | --- | --- |
| Germany | `https://example.com/` | `https://de.example.com/` | `302` |
| Germany | `https://example.com/?ref=1` | `https://de.example.com/?ref=1` | `302` |
| Germany | `https://de.example.com/` | (unchanged) | n/a |
| United States | `https://example.com/` | (unchanged) | n/a |

To redirect every path for visitors from one country to another domain, refer to [Redirect requests from one country to a domain](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-country/). That example uses Bulk Redirects and the Expression Editor.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-single-country-subdomain/#page","headline":"Redirect visitors from one country to a subdomain","description":"Create a redirect rule with the Expression Builder to temporarily redirect visitors from one country to a localized subdomain.","url":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-single-country-subdomain/","inLanguage":"en","image":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-single-country-subdomain/og.png?v=eda6adcabe112042","dateModified":"2026-11-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects","Geolocation"]}
```
