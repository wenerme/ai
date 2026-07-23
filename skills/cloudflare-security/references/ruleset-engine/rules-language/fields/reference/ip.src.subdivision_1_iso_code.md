---
description: The ISO 3166-2 code for the first-level region associated with the IP address.
title: ip.src.subdivision_1_iso_code
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# ip.src.subdivision\_1\_iso\_code

`ip.src.subdivision_1_iso_code` `String`

The ISO 3166-2 code for the first-level region associated with the IP address.

When the actual value is not available, this field contains an empty string.

Requires a Cloudflare Business or Enterprise plan.

For more information on the ISO 3166-2 standard and the available regions, refer to [ISO 3166-2](https://en.wikipedia.org/wiki/ISO%5F3166-2) on Wikipedia.

This field has the same value as the `ip.geoip.subdivision_1_iso_code` field, which is deprecated. The `ip.geoip.subdivision_1_iso_code` field is still available for new and existing rules, but you should use the `ip.src.subdivision_1_iso_code` field instead.

_GeoIP is the registered trademark of MaxMind, Inc._

Example value:

```txt
"GB-ENG"
```

Categories:
* Request
* Geolocation

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.subdivision_1_iso_code/#page","headline":"ip.src.subdivision_1_iso_code · Cloudflare Ruleset Engine docs","description":"The ISO 3166-2 code for the first-level region associated with the IP address.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.subdivision_1_iso_code/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
