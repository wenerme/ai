---
title: ip.src.is_in_european_union
description: Whether the request originates from a country in the European Union (EU).
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

#  ip.src.is\_in\_european\_union 

`ip.src.is_in_european_union` ` Boolean ` 

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
