---
description: The continent code associated with the client IP address.
title: ip.src.continent
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# ip.src.continent

`ip.src.continent` `String`

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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.continent/#page","headline":"ip.src.continent · Cloudflare Ruleset Engine docs","description":"The continent code associated with the client IP address.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.continent/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
