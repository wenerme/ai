---
description: Whether the request originates from a country in the European Union (EU).
title: ip.src.is_in_european_union
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# ip.src.is\_in\_european\_union

`ip.src.is_in_european_union` `Boolean`

Whether the request originates from a country in the European Union (EU).

Requires a Cloudflare Business or Enterprise plan.

Countries in the EU (from geolocation data):

| Country code | Country name    |
| ------------ | --------------- |
| AT           | Austria         |
| AX           | Åland Islands   |
| BE           | Belgium         |
| BG           | Bulgaria        |
| CY           | Cyprus          |
| CZ           | Czechia         |
| DE           | Germany         |
| DK           | Denmark         |
| EE           | Estonia         |
| ES           | Spain           |
| FI           | Finland         |
| FR           | France          |
| GF           | French Guiana   |
| GP           | Guadeloupe      |
| GR           | Greece          |
| HR           | Croatia         |
| HU           | Hungary         |
| IE           | Ireland         |
| IT           | Italy           |
| LT           | Lithuania       |
| LU           | Luxembourg      |
| LV           | Latvia          |
| MF           | Saint Martin    |
| MQ           | Martinique      |
| MT           | Malta           |
| NL           | The Netherlands |
| PL           | Poland          |
| PT           | Portugal        |
| RE           | Réunion         |
| RO           | Romania         |
| SE           | Sweden          |
| SI           | Slovenia        |
| SK           | Slovakia        |
| YT           | Mayotte         |

This field has the same value as the `ip.geoip.is_in_european_union` field, which is deprecated. The `ip.geoip.is_in_european_union` field is still available for new and existing rules, but you should use the `ip.src.is_in_european_union` field instead.

_GeoIP is the registered trademark of MaxMind, Inc._

Categories:
* Request
* Geolocation

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.is_in_european_union/#page","headline":"ip.src.is_in_european_union · Cloudflare Ruleset Engine docs","description":"Whether the request originates from a country in the European Union (EU).","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ip.src.is_in_european_union/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
