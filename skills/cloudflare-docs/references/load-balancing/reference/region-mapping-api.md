---
title: Regions API
description: Map geographic regions to pools using the API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Regions API

Cloudflare’s Load Balancing Regions API has several uses:

* Identify which countries/areas (states/provinces in the case of the U.S. and Canada) are part of a specific Cloudflare Load Balancer region.
* Identify the Cloudflare Load Balancer region for a particular country/area (states/provinces in the case of the U.S. and Canada).

The Region API uses 2-letter [ISO-3166-1 alpha-2 codes ↗](https://www.iso.org/iso-3166-country-codes.html) for countries/areas and, in the case of the U.S. and Canada, ISO-3166-2 subdivision codes for states/provinces. Only the U.S. and Canada are provided with these subdivisions.

There are two main optional parameters for the Region API:

* country\_code is a string containing a two-letter alpha-2 country code per ISO 3166-1\. For example: /load\_balancers/regions?country\_code=US
* subdivision\_code is a string containing a two-letter subdivision code for the U.S. and Canada per ISO 3166-2\. For example: /load\_balancers/regions?subdivision\_code=CA

For additional details and examples on using the Region Mapping API, see [Cloudflare’s API documentation](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/regions/methods/list/).

## List of Load Balancer regions

| Region code | Region name            |
| ----------- | ---------------------- |
| EEU         | Eastern Europe         |
| ENAM        | Eastern North America  |
| ME          | Middle East            |
| NAF         | Northern Africa        |
| NEAS        | Northeast Asia         |
| NSAM        | Northern South America |
| OC          | Oceania                |
| SAF         | Southern Africa        |
| SAS         | Southern Asia          |
| SEAS        | Southeast Asia         |
| SSAM        | Southern South America |
| WEU         | Western Europe         |
| WNAM        | Western North America  |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/reference/region-mapping-api/","name":"Regions API"}}]}
```
