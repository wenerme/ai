---
title: ip.src.asnum
description: The 16-bit or 32-bit integer representing the Autonomous System (AS) number associated with the client IP address.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

#  ip.src.asnum 

`ip.src.asnum` ` Number ` 

The 16-bit or 32-bit integer representing the Autonomous System (AS) number associated with the client IP address.

This field has the same value as the `ip.geoip.asnum` field, which is deprecated. The `ip.geoip.asnum` field is still available for new and existing rules, but you should use the `ip.src.asnum` field instead.

_GeoIP is the registered trademark of MaxMind, Inc._

Categories: 
* Request
* Geolocation

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
