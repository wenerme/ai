---
description: Create a redirect rule to redirect United Kingdom and France visitors from the `example.com` website's  root path (`/`) to their localized subdomains `https://gb.example.com` and `https://fr.example.com`, respectively.
title: Redirect local visitors to specific subdomains
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Redirect local visitors to specific subdomains

Create a redirect rule to redirect United Kingdom and France visitors from the `example.com` website's root path (`/`) to their localized subdomains `https://gb.example.com` and `https://fr.example.com`, respectively.

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-country-subdomains/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This example single redirect for zone `example.com` will redirect United Kingdom and France visitors requesting the website's root path (`/`) to their localized subdomains `https://gb.example.com` and `https://fr.example.com`, respectively.

**When incoming requests match**

Using the Expression Editor:
`(ip.src.country eq "GB" or ip.src.country eq "FR") and http.request.uri.path eq "/"`

**Then**

* **Type:** _Dynamic_
* **Expression:** `lower(concat("https://", ip.src.country, ".example.com"))`
* **Status code:** _301_

For example, the redirect rule would perform the following redirects:

| Visitor country | Request URL | Target URL             | Status code |
| --------------- | ----------- | ---------------------- | ----------- |
| United Kingdom  | example.com | https://gb.example.com | 301         |
| France          | example.com | https://fr.example.com | 301         |
| United States   | example.com | (unchanged)            | n/a         |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-country-subdomains/#page","headline":"Redirect local visitors to specific subdomains · Cloudflare Rules docs","description":"Create a redirect rule to redirect United Kingdom and France visitors from the example.com website's  root path (/) to their localized subdomains https://gb.example.com and https://fr.example.com, respectively.","url":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-country-subdomains/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects","Geolocation"]}
```
