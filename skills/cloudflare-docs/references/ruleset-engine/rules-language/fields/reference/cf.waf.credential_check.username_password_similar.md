---
title: cf.waf.credential_check.username_password_similar
description: Indicates whether a similar version of the username and password credentials detected in the request were previously leaked.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

#  cf.waf.credential\_check.username\_password\_similar 

`cf.waf.credential_check.username_password_similar` ` Boolean ` 

Indicates whether a similar version of the username and password credentials detected in the request were previously leaked.

Requires a Cloudflare Enterprise plan. You must also enable [leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/).

Categories: 
* Request

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
