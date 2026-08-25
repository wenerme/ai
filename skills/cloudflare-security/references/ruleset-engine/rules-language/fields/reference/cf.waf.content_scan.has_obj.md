---
description: Indicates whether the request contains at least one content object.
title: cf.waf.content_scan.has_obj
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.waf.content\_scan.has\_obj

`cf.waf.content_scan.has_obj` `Boolean`

Indicates whether the request contains at least one content object.

Requires a Cloudflare Enterprise plan with [malicious uploads detection](https://developers.cloudflare.com/waf/detections/malicious-uploads/).

Example usage:

```txt
# Check if requests to a specific endpoint include any content objects
cf.waf.content_scan.has_obj and http.request.uri.path eq "/upload"
```

Categories:
* Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content_scan.has_obj/#page","headline":"cf.waf.content_scan.has_obj · Cloudflare Ruleset Engine docs","description":"Indicates whether the request contains at least one content object.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content_scan.has_obj/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
