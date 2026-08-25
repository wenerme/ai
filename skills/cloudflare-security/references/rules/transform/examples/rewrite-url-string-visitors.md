---
description: Create a transform rule to rewrite the request path from `/blog` to `/blog?sort-by=date`.
title: Rewrite URL query string
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Rewrite URL query string

Create a transform rule to rewrite the request path from `/blog` to `/blog?sort-by=date`.

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/transform/examples/rewrite-url-string-visitors/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To rewrite a request to the `/blog` path to `/blog?sort-by=date`, create a URL rewrite rule with the following settings:

Text in **Expression Editor**:

```txt
http.request.uri.path == "/blog"
```

Text after **Query** \> **Rewrite to** \> _Static_:

```txt
sort-by=date
```

Additionally, set the path rewrite action of the same rule to _Preserve_ so that the URL path does not change.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/examples/rewrite-url-string-visitors/#page","headline":"Rewrite URL query string · Cloudflare Rules docs","description":"Create a transform rule to rewrite the request path from /blog to /blog?sort-by=date.","url":"https://developers.cloudflare.com/rules/transform/examples/rewrite-url-string-visitors/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["URL rewrite"]}
```
