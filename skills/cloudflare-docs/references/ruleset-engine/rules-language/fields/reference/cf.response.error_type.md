---
title: cf.response.error_type
description: A string with the type of error in the response being returned.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

#  cf.response.error\_type 

`cf.response.error_type` ` String ` 

A string with the type of error in the response being returned.

The default value is an empty string (`""`).

The available values are the following:

* `"managed_challenge"`
* `"iuam"`
* `"legacy_challenge"`
* `"ip_ban"`
* `"waf"`
* `"5xx"`
* `"1xxx"`
* `"always_online"`
* `"country_challenge"`
* `"ratelimit"`

You can use this field to customize the response for a specific type of error (for example, all 1XXX errors or all WAF block actions).

**Note**: This field is only available in [Response Header Transform Rules](https://developers.cloudflare.com/rules/transform/response-header-modification/) and [Custom Errors](https://developers.cloudflare.com/rules/custom-errors/).

Categories: 
* Response

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
