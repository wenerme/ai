---
description: Indicates whether the request contains at least one content object.
title: cf.waf.content_scan.has_obj
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

#  cf.waf.content\_scan.has\_obj

`cf.waf.content_scan.has_obj` ` Boolean `

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

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content_scan.has_obj/#page","headline":"cf.waf.content_scan.has_obj · Cloudflare Ruleset Engine docs","description":"Indicates whether the request contains at least one content object.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content_scan.has_obj/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
