---
title: ip.src
description: The client TCP IP address, which may be adjusted to reflect the actual address of the client using HTTP headers such as `X-Forwarded-For` or `X-Real-IP`.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

#  ip.src

`ip.src` ` IP address `

The client TCP IP address, which may be adjusted to reflect the actual address of the client using HTTP headers such as `X-Forwarded-For` or `X-Real-IP`.

Example value:

```txt
93.184.216.34
```

Categories:
* Request

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src/#page","headline":"ip.src · Cloudflare Ruleset Engine docs","description":"The client TCP IP address, which may be adjusted to reflect the actual address of the client using HTTP headers such as X-Forwarded-For or X-Real-IP.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
