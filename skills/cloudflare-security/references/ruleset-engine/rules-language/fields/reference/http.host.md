---
description: The hostname used in the full request URI.
title: http.host
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# http.host

`http.host` `String`

The hostname used in the full request URI.

The `http.host` field contains the `Host` header from the original client request.

If you have configured [Origin Rules](https://developers.cloudflare.com/rules/origin-rules/) that change the hostname, this change is not reflected in the `http.host` value seen by other rule phases (such as custom rules, cache rules, or transform rules) or [Cloudflare Workers](https://developers.cloudflare.com/workers/). All rule phases and Workers evaluate against the original, unmodified host.

Example value:

```txt
"www.example.org"
```

Categories:
* Request
* URI

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.host/#page","headline":"http.host · Cloudflare Ruleset Engine docs","description":"The hostname used in the full request URI.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.host/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
