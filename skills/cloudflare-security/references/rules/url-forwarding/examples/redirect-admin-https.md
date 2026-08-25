---
description: Create a redirect rule to redirect requests for the administration area of `store.example.com` to HTTPS, keeping the original path and query string.
title: Redirect admin area requests to HTTPS
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Redirect admin area requests to HTTPS

Create a redirect rule to redirect requests for the administration area of `store.example.com` to HTTPS, keeping the original path and query string.

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-admin-https/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This example single redirect for zone `example.com` will redirect requests for the administration area of a specific subdomain (`store.example.com`) to HTTPS, keeping the original path and query string.

**When incoming requests match**

* **Wildcard pattern**
  * **Request URL**: `http://store.example.com/admin*`

**Then**

* **Target URL**: `https://store.example.com/admin${1}`
* **Status code:** _301_
* **Preserve query string:** Enabled

For example, the redirect rule would perform the following redirects:

| Request URL                                      | Target URL                                        | Status code |
| ------------------------------------------------ | ------------------------------------------------- | ----------- |
| http://store.example.com/admin/products/         | https://store.example.com/admin/products/         | 301         |
| https://store.example.com/admin/products/        | (unchanged)                                       | n/a         |
| http://store.example.com/admin/?logged\_out=true | https://store.example.com/admin/?logged\_out=true | 301         |
| http://store.example.com/?all\_items=true        | (unchanged)                                       | n/a         |
| http://example.com/admin/                        | (unchanged)                                       | n/a         |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-admin-https/#page","headline":"Redirect admin area requests to HTTPS · Cloudflare Rules docs","description":"Create a redirect rule to redirect requests for the administration area of store.example.com to HTTPS, keeping the original path and query string.","url":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-admin-https/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
