---
title: cf.waf.score
description: A global score from 1–99 that combines the score of each WAF attack vector into a single score.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

#  cf.waf.score 

`cf.waf.score` ` Number ` 

A global score from 1–99 that combines the score of each WAF attack vector into a single score.

The special score `100` indicates that Cloudflare did not score the request.

This is the standard [WAF attack score](https://developers.cloudflare.com/waf/detections/attack-score/) to detect variants of attack patterns.

Requires a Cloudflare Enterprise plan. You must also enable [attack score detection](https://developers.cloudflare.com/waf/detections/attack-score/).

Categories: 
* Request

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
