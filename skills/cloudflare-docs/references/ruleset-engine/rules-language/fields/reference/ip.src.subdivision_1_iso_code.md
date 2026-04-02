---
title: ip.src.subdivision_1_iso_code
description: The ISO 3166-2 code for the first-level region associated with the IP address.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/fields/index.yaml) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

#  ip.src.subdivision\_1\_iso\_code 

`ip.src.subdivision_1_iso_code` ` String ` 

The ISO 3166-2 code for the first-level region associated with the IP address.

When the actual value is not available, this field contains an empty string.

Requires a Cloudflare Business or Enterprise plan.

For more information on the ISO 3166-2 standard and the available regions, refer to [ISO 3166-2](https://en.wikipedia.org/wiki/ISO%5F3166-2) on Wikipedia.

This field has the same value as the `ip.geoip.subdivision_1_iso_code` field, which is deprecated. The `ip.geoip.subdivision_1_iso_code` field is still available for new and existing rules, but you should use the `ip.src.subdivision_1_iso_code` field instead.

_GeoIP is the registered trademark of MaxMind, Inc._

Example value:

```

"GB-ENG"


```

Categories: 
* Request
* Geolocation

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
