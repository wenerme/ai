---
description: The 2-letter country code in [ISO 3166-1 Alpha 2](https://www.iso.org/obp/ui/#search/code/) format.
title: ip.src.country
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

#  ip.src.country

`ip.src.country` ` String `

The 2-letter country code in [ISO 3166-1 Alpha 2](https://www.iso.org/obp/ui/#search/code/) format.

For more information on the ISO 3166-1 Alpha 2 format, refer to [ISO 3166-1 Alpha 2](https://en.wikipedia.org/wiki/ISO%5F3166-1%5Falpha-2) on Wikipedia.

This field has the same value as the `ip.geoip.country` field, which is deprecated. The `ip.geoip.country` field is still available for new and existing rules, but you should use the `ip.src.country` field instead.

_GeoIP is the registered trademark of MaxMind, Inc._

Example value:

```txt
"GB"
```

Categories:
* Request
* Geolocation

Was this helpful?

YesNo

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.country/#page","headline":"ip.src.country · Cloudflare Ruleset Engine docs","description":"The 2-letter country code in ISO 3166-1 Alpha 2 format.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.country/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
