---
title: ip.src.country
description: The 2-letter country code in [ISO 3166-1 Alpha 2](https://www.iso.org/obp/ui/#search/code/) format.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

#  ip.src.country 

`ip.src.country` ` String ` 

The 2-letter country code in [ISO 3166-1 Alpha 2](https://www.iso.org/obp/ui/#search/code/) format.

For more information on the ISO 3166-1 Alpha 2 format, refer to [ISO 3166-1 Alpha 2](https://en.wikipedia.org/wiki/ISO%5F3166-1%5Falpha-2) on Wikipedia.

This field has the same value as the `ip.geoip.country` field, which is deprecated. The `ip.geoip.country` field is still available for new and existing rules, but you should use the `ip.src.country` field instead.

_GeoIP is the registered trademark of MaxMind, Inc._

Example value:

```

"GB"


```

Categories: 
* Request
* Geolocation

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
