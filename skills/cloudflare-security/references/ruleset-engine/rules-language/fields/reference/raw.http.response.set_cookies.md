---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: The parsed cookies from the original HTTP response `Set-Cookie` headers.
title: raw.http.response.set_cookies
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# raw.http.response.set\_cookies

`raw.http.response.set_cookies` `Map<Array<String>>`

The parsed cookies from the original HTTP response `Set-Cookie` headers.

This is the raw field version of [`http.response.set_cookies`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.response.set_cookies/). It preserves the original response cookies and is unaffected by subsequent response header changes.

The same cookie parsing applies to both fields: names are URL decoded, duplicate names share an array of values, and values exclude cookie attributes. The `raw.` prefix does not disable parsing or name decoding.

The availability of HTTP response fields depends on the Cloudflare feature and your plan.

Example value:

```txt
{"app": ["test", "preview"]}
```

Example usage:

```txt
raw.http.response.set_cookies["app"][0] eq "test"
```

Categories:
- Response
- Headers

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/raw.http.response.set_cookies/#page","headline":"raw.http.response.set_cookies","description":"The parsed cookies from the original HTTP response Set-Cookie headers.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/raw.http.response.set_cookies/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
