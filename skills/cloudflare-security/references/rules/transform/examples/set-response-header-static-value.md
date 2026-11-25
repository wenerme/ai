---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Create a response header transform rule (part of Transform Rules) to set an `X-Bot-Score` HTTP header in the response to a static value (`Cloudflare`).
title: Set response header with a static value
image: https://developers.cloudflare.com/rules/transform/examples/set-response-header-static-value/og.png?v=a45ab09949dcf70b
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Set response header with a static value

Create a response header transform rule (part of Transform Rules) to set an `X-Bot-Score` HTTP header in the response to a static value (`Cloudflare`).

The following response header transform rule sets a header named `X-Source` to a static value (`Cloudflare`) in the HTTP response:

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/en/")
```

Selected operation under **Modify response header**: *Set static*

**Header name**: `X-Source`

**Value**: `Cloudflare`

This rule would overwrite any existing `X-Source` headers already present in the HTTP response.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/examples/set-response-header-static-value/#page","headline":"Set response header with a static value","description":"Create a response header transform rule (part of Transform Rules) to set an X-Bot-Score HTTP header in the response to a static value (Cloudflare).","url":"https://developers.cloudflare.com/rules/transform/examples/set-response-header-static-value/","inLanguage":"en","image":"https://developers.cloudflare.com/rules/transform/examples/set-response-header-static-value/og.png?v=a45ab09949dcf70b","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Response modification"]}
```
