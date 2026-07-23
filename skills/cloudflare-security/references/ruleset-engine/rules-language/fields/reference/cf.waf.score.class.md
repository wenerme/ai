---
description: The attack score class of the current request, based on the WAF attack score.
title: cf.waf.score.class
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.waf.score.class

`cf.waf.score.class` `String`

The attack score class of the current request, based on the WAF attack score.

Can have one of the following values: `attack`, `likely_attack`, `likely_clean`, `clean`.

Requires a Cloudflare Business plan or above. You must also enable [attack score detection](https://developers.cloudflare.com/waf/detections/attack-score/).

Categories:
* Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.score.class/#page","headline":"cf.waf.score.class · Cloudflare Ruleset Engine docs","description":"The attack score class of the current request, based on the WAF attack score.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.score.class/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
