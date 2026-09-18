---
description: Indicates whether the request body exceeded the size limit for content scanning and was truncated before scanning.
title: cf.waf.content_scan.truncated
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.waf.content\_scan.truncated

`cf.waf.content_scan.truncated``Boolean`

Indicates whether the request body exceeded the size limit for content scanning and was truncated before scanning.

Requires a Cloudflare Enterprise plan with [malicious uploads detection](https://developers.cloudflare.com/waf/detections/malicious-uploads/).

When this field is true, the scan results may be incomplete. Refer to [Size limit](https://developers.cloudflare.com/waf/detections/malicious-uploads/#size-limit).

Example usage:

```txt
# Block requests to a specific endpoint whose content was not fully scanned
cf.waf.content_scan.truncated and http.request.uri.path eq "/upload"
```

Categories:
- Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content_scan.truncated/#page","headline":"cf.waf.content_scan.truncated · Cloudflare Ruleset Engine docs","description":"Indicates whether the request body exceeded the size limit for content scanning and was truncated before scanning.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content_scan.truncated/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
