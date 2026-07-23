---
description: The number of malicious content objects detected in the request (zero or greater).
title: cf.waf.content_scan.num_malicious_obj
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.waf.content\_scan.num\_malicious\_obj

`cf.waf.content_scan.num_malicious_obj` `Integer`

The number of malicious content objects detected in the request (zero or greater).

Requires a Cloudflare Enterprise plan with [malicious uploads detection](https://developers.cloudflare.com/waf/detections/malicious-uploads/).

Example usage:

```txt
# Check if requests to a specific endpoint contain more than two malicious content objects
cf.waf.content_scan.num_malicious_obj > 2 and http.request.uri.path eq "/upload"
```

Categories:
* Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content_scan.num_malicious_obj/#page","headline":"cf.waf.content_scan.num_malicious_obj · Cloudflare Ruleset Engine docs","description":"The number of malicious content objects detected in the request (zero or greater).","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content_scan.num_malicious_obj/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
