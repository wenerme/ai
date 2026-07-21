---
description: The continent code associated with the client IP address.
title: ip.src.continent
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

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

Was this helpful?

YesNo

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.continent/#page","headline":"ip.src.continent · Cloudflare Ruleset Engine docs","description":"The continent code associated with the client IP address.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.continent/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
