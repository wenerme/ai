---
description: Create a redirect rule to redirect all URLs for a domain to point to the root of a new domain, including any subdomains of the old domain.
title: Redirect requests for a domain to a new domain
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Redirect requests for a domain to a new domain

Create a redirect rule to redirect all URLs for a domain to point to the root of a new domain, including any subdomains of the old domain.

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-different-domain-root/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In this example, an old website was discontinued and replaced by a new one in a different domain. The functionality is different, and all URLs should now point to the root of the new domain. The same applies to any subdomains of the old domain.

[Create a redirect rule](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/) with the following configuration:

**When incoming requests match**

* **Wildcard pattern**
  * **Request URL**: `http*://*example.com/*`

**Then**

* **Target URL**: `https://example.net/`
* **Status code:** _301_

For example, the redirect rule would perform the following redirects:

| Request URL                             | Target URL           | Status code |
| --------------------------------------- | -------------------- | ----------- |
| http://example.com/                     | https://example.net/ | 301         |
| https://example.com/                    | https://example.net/ | 301         |
| https://subdomain.example.com/          | https://example.net/ | 301         |
| https://example.com/my/path/to/page.htm | https://example.net/ | 301         |
| https://example.com/search?q=term       | https://example.net/ | 301         |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-different-domain-root/#page","headline":"Redirect requests for a domain to a new domain · Cloudflare Rules docs","description":"Create a redirect rule to redirect all URLs for a domain to point to the root of a new domain, including any subdomains of the old domain.","url":"https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-all-different-domain-root/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
