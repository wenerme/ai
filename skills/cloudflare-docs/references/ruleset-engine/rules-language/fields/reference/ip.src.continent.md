---
title: ip.src.continent
description: The continent code associated with the client IP address.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/fields/index.yaml) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

#  ip.src.continent 

`ip.src.continent` ` String ` 

The continent code associated with the client IP address.

Values:

* `"AF"`: Africa
* `"AN"`: Antarctica
* `"AS"`: Asia
* `"EU"`: Europe
* `"NA"`: North America
* `"OC"`: Oceania
* `"SA"`: South America
* `"T1"`: Tor network

This field has the same value as the `ip.geoip.continent` field, which is deprecated. The `ip.geoip.continent` field is still available for new and existing rules, but you should use the `ip.src.continent` field instead.

_GeoIP is the registered trademark of MaxMind, Inc._

Categories: 
* Request
* Geolocation

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
