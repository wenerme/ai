---
title: cf.waf.score.class
description: The attack score class of the current request, based on the WAF attack score.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

#  cf.waf.score.class

`cf.waf.score.class` ` String `

The attack score class of the current request, based on the WAF attack score.

Can have one of the following values: `attack`, `likely_attack`, `likely_clean`, `clean`.

Requires a Cloudflare Business plan or above. You must also enable [attack score detection](https://developers.cloudflare.com/waf/detections/attack-score/).

Categories:
* Request

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.score.class/#page","headline":"cf.waf.score.class · Cloudflare Ruleset Engine docs","description":"The attack score class of the current request, based on the WAF attack score.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.score.class/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
