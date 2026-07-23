---
description: The 16-bit or 32-bit integer representing the Autonomous System (AS) number associated with the client IP address.
title: ip.src.asnum
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# ip.src.asnum

`ip.src.asnum` `Number`

The 16-bit or 32-bit integer representing the Autonomous System (AS) number associated with the client IP address.

This field has the same value as the `ip.geoip.asnum` field, which is deprecated. The `ip.geoip.asnum` field is still available for new and existing rules, but you should use the `ip.src.asnum` field instead.

_GeoIP is the registered trademark of MaxMind, Inc._

Categories:
* Request
* Geolocation

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.asnum/#page","headline":"ip.src.asnum · Cloudflare Ruleset Engine docs","description":"The 16-bit or 32-bit integer representing the Autonomous System (AS) number associated with the client IP address.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.asnum/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
