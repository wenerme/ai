---
title: cf.waf.auth_detected
description: Indicates whether the Cloudflare WAF detected authentication credentials in the request.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

#  cf.waf.auth\_detected 

`cf.waf.auth_detected` ` Boolean ` 

Indicates whether the Cloudflare WAF detected authentication credentials in the request.

Requires a Cloudflare Enterprise plan. You must also enable [leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/).

Categories: 
* Request

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.auth_detected/#page","headline":"cf.waf.auth_detected · Cloudflare Ruleset Engine docs","description":"Indicates whether the Cloudflare WAF detected authentication credentials in the request.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.auth_detected/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
