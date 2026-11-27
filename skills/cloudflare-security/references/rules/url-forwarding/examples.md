---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Example URL forwarding rules for common redirect scenarios.
title: Redirect examples
image: https://developers.cloudflare.com/rules/url-forwarding/examples/og.png?v=586b36c23d4bfc4e
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Redirect examples

[**Perform mobile redirects** Create a redirect rule to redirect visitors using mobile devices to a different hostname.](https://developers.cloudflare.com/rules/url-forwarding/examples/perform-mobile-redirects/)

[**Redirect admin area requests to HTTPS** Create a redirect rule to redirect requests for the administration area of `store.example.com` to HTTPS, keeping the original path and query string.](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-admin-https/)

[**Redirect requests from one domain to another** Create a redirect rule to redirect all requests to a different domain, maintaining all functionality, except for the discontinued HTTP service (port 80).](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-another-domain/)

[**Redirect requests from one country to a domain** Create a redirect rule to redirect all website visitors from the United Kingdom to a different domain, maintaining the current functionality in the same paths.](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-country/)

[**Redirect requests for a domain to a new domain** Create a redirect rule to redirect all URLs for a domain to point to the root of a new domain, including any subdomains of the old domain.](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-different-domain-root/)

[**Redirect requests to a different hostname** Create a redirect rule to redirect all requests for `smallshop.example.com` to a different hostname using HTTPS, keeping the original path and query string.](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-different-hostname/)

[**Redirect local visitors to specific subdomains** Create a redirect rule to send visitors from specific countries to localized subdomains, such as `gb.example.com` and `fr.example.com`.](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-country-subdomains/)

[**Redirect visitors to a new page URL** Create a redirect rule to redirect visitors from `/contact-us/` to the page's new path `/contacts/`.](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-new-url/)

[**Redirect from root to WWW** Create a redirect rule to forward HTTPS requests from the root (also known as the “apex” or “naked” domain) to the WWW subdomain.](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-root-to-www/)

[**Redirect a website section to a subdomain** Redirect requests for a section of your website, such as `/blog/`, to a subdomain while keeping the rest of the path and the query string.](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-section-to-subdomain/)

[**Redirect visitors from one country to a subdomain** Create a redirect rule with the Expression Builder to temporarily redirect visitors from one country to a localized subdomain.](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-single-country-subdomain/)

[**Redirect from WWW to root** Create a redirect rule to forward HTTPS requests from the WWW subdomain to the root (also known as the “apex” or “naked” domain).](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-www-to-root/)

[**Remove locale from URL path** Create a redirect rule to redirect visitors from an old URL format with locale information to a new URL format.](https://developers.cloudflare.com/rules/url-forwarding/examples/remove-locale-url/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/rules/url-forwarding/examples/#page","headline":"Redirect examples","description":"Example URL forwarding rules for common redirect scenarios.","url":"https://developers.cloudflare.com/rules/url-forwarding/examples/","inLanguage":"en","image":"https://developers.cloudflare.com/rules/url-forwarding/examples/og.png?v=586b36c23d4bfc4e","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
