---
title: cf.bot_management.corporate_proxy
description: Indicates whether the incoming request comes from an identified Enterprise-only cloud-based corporate proxy or secure web gateway.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

#  cf.bot\_management.corporate\_proxy 

`cf.bot_management.corporate_proxy` ` Boolean ` 

Indicates whether the incoming request comes from an identified Enterprise-only cloud-based corporate proxy or secure web gateway.

Requires a Cloudflare Enterprise plan with [Bot Management](https://developers.cloudflare.com/bots/plans/bm-subscription/) enabled.

Example usage:

```

not cf.bot_management.verified_bot

and not cf.bot_management.static_resource

and not cf.bot_management.corporate_proxy

and cf.bot_management.score lt 30


```

Categories: 
* Request
* Bots

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
