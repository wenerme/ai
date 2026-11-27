---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Create a redirect rule to send visitors from specific countries to localized subdomains, such as `gb.example.com` and `fr.example.com`.
title: Redirect local visitors to specific subdomains
image: https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-country-subdomains/og.png?v=9c7c484a5980c2e2
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Redirect local visitors to specific subdomains

Create a redirect rule to send visitors from specific countries to localized subdomains, such as `gb.example.com` and `fr.example.com`.

This example single redirect for zone `example.com` will redirect United Kingdom and France visitors requesting the website's root path (`/`) to their localized subdomains `https://gb.example.com` and `https://fr.example.com`, respectively.

**When incoming requests match**

Using the Expression Editor:
`http.host eq "example.com" and (ip.src.country eq "GB" or ip.src.country eq "FR") and http.request.uri.path eq "/"`

**Then**

- **Type:** *Dynamic*
- **Expression:** `lower(concat("https://", ip.src.country, ".example.com"))`
- **Status code:** *302*

The `http.host eq "example.com"` condition prevents a redirect loop. Without it, a visitor from the United Kingdom who requests `https://gb.example.com/` would match the rule again and be redirected to the same URL.

This example uses a `302` (temporary) status code. Browsers can cache `301` (permanent) redirects, and Cloudflare does not add a `Cache-Control` header to redirect responses. A visitor who later browses from another country might keep receiving a cached `301` redirect.

For example, the redirect rule would perform the following redirects:

| Visitor country | Request URL | Target URL | Status code |
| --- | --- | --- | --- |
| United Kingdom | `https://example.com/` | `https://gb.example.com` | `302` |
| France | `https://example.com/` | `https://fr.example.com` | `302` |
| United Kingdom | `https://gb.example.com/` | (unchanged) | n/a |
| United States | `https://example.com/` | (unchanged) | n/a |

To redirect visitors from one country with the Expression Builder and a static target URL, refer to [Redirect visitors from one country to a subdomain](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-single-country-subdomain/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-country-subdomains/#page","headline":"Redirect local visitors to specific subdomains","description":"Create a redirect rule to send visitors from specific countries to localized subdomains, such as gb.example.com and fr.example.com.","url":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-country-subdomains/","inLanguage":"en","image":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-country-subdomains/og.png?v=9c7c484a5980c2e2","dateModified":"2026-11-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects","Geolocation"]}
```
