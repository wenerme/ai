---
description: An array of file types in the order the content objects were detected in the request.
title: cf.waf.content_scan.obj_types
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

#  cf.waf.content\_scan.obj\_types

`cf.waf.content_scan.obj_types` ` Array<String> `

An array of file types in the order the content objects were detected in the request.

If Cloudflare cannot determine the file type of a content object, the corresponding value in the `obj_types` array will be `application/octet-stream`.

Requires a Cloudflare Enterprise plan with [malicious uploads detection](https://developers.cloudflare.com/waf/detections/malicious-uploads/).

Example usage:

```txt
# Check if requests to a specific endpoint contain content objects other than PDFs
any(cf.waf.content_scan.obj_types[*] != "application/pdf") and http.request.uri.path eq "/upload"
```

Categories:
* Request

Was this helpful?

YesNo

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content_scan.obj_types/#page","headline":"cf.waf.content_scan.obj_types · Cloudflare Ruleset Engine docs","description":"An array of file types in the order the content objects were detected in the request.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.content_scan.obj_types/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
