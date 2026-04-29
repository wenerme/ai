---
title: Manage rules via the APIs
description: Manage firewall rules programmatically via APIs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/firewall/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage rules via the APIs

Cloudflare offers APIs that work together to achieve the same effect as the UI-based **Firewall rules** feature under **Security** \> **WAF**.

Deprecation notice

Cloudflare Firewall Rules has been deprecated. Cloudflare has moved existing firewall rules to [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/). For more information on this change, refer to the [upgrade guide](https://developers.cloudflare.com/waf/reference/legacy/firewall-rules-upgrade/).

These APIs are the following:

* [**Firewall Rules API**](https://developers.cloudflare.com/firewall/api/cf-firewall-rules/): Manage firewall rules and their actions, based on criteria separately defined through filters.
* [**Filters API**](https://developers.cloudflare.com/firewall/api/cf-filters/): Manage the filters that enable rule matching.
* [**Lists API**](https://developers.cloudflare.com/waf/tools/lists/lists-api/): Manage named lists of items (such as IP addresses) that you can use in the rules of different Cloudflare products.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/firewall/","name":"Firewall Rules (deprecated)"}},{"@type":"ListItem","position":3,"item":{"@id":"/firewall/api/","name":"Manage rules via the APIs"}}]}
```
