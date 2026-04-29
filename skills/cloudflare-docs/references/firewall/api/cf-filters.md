---
title: Cloudflare Filters API
description: Manage filters for firewall rules via the API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/firewall/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Filters API

**Cloudflare Filters** is an API-only component of firewall rules for designing complex criteria that rely on boolean operators and other logic to examine incoming HTTP traffic and look for a match.

Deprecation notice

Cloudflare Firewall Rules has been deprecated. Cloudflare has moved existing firewall rules to [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/). For more information on this change, refer to the [upgrade guide](https://developers.cloudflare.com/waf/reference/legacy/firewall-rules-upgrade/).

For example, a filter matching:

* An HTTP user agent, and
* The HTTP path, and
* The source IP address

Associate a filter with a firewall rule to define the scope of that rule.

Use IP lists within a filter to refer collectively to a group of IP addresses. Refer to the [Lists API](https://developers.cloudflare.com/waf/tools/lists/lists-api/) for more information.

Before getting started with the Cloudflare Filters API, familiarize yourself with rule [expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/). For a complete reference, refer to [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/).

## Differences from other Cloudflare APIs

The Firewall Rules API behaves differently from most Cloudflare APIs in two ways:

* API calls accept and return multiple items, and allow applying data changes to multiple items.
* Although API calls return the [standard response](https://developers.cloudflare.com/fundamentals/api/), the error object follows the [JSON API standard ↗](http://jsonapi.org/format/#errors), such that in an error condition, it is clear which item produced the error and why.

To get started, review [What is a filter?](https://developers.cloudflare.com/firewall/api/cf-filters/what-is-a-filter/), followed by the Cloudflare Filters [JSON object](https://developers.cloudflare.com/firewall/api/cf-firewall-rules/json-object/) and [Endpoints](https://developers.cloudflare.com/firewall/api/cf-firewall-rules/endpoints/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/firewall/","name":"Firewall Rules (deprecated)"}},{"@type":"ListItem","position":3,"item":{"@id":"/firewall/api/","name":"Manage rules via the APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/firewall/api/cf-filters/","name":"Cloudflare Filters API"}}]}
```
