---
description: Create a CORS response header transform rule to add an `Access-Control-Allow-Origin` HTTP header to the response with wildcard as static value. (`cookiename=value`).
title: Add a wildcard CORS response header
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Add a wildcard CORS response header

Create a response header transform rule to add an `Access-Control-Allow-Origin` CORS HTTP header to the response with a static wildcard value.

Last updated Dec 10, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/transform/examples/add-cors-header/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following response header transform rule adds a header named `Access-Control-Allow-Origin` with a static wildcard value (`*`) to the HTTP response:

Text in **Expression Editor**:

```txt
(http.host eq "<YOUR_HOSTNAME>")
```

Selected operation under **Modify response header**: _Set static_

**Header name**: `Access-Control-Allow-Origin`

**Value**: `*`

You can also use an expression similar to the following to apply the CORS header to several specific hostnames:

```txt
(http.host in {"<YOUR_HOSTNAME_1>" "<YOUR_HOSTNAME_2>"})
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/examples/add-cors-header/#page","headline":"Add a wildcard CORS response header · Cloudflare Rules docs","description":"Create a CORS response header transform rule to add an Access-Control-Allow-Origin HTTP header to the response with wildcard as static value. (cookiename=value).","url":"https://developers.cloudflare.com/rules/transform/examples/add-cors-header/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-12-10","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Response modification"]}
```
