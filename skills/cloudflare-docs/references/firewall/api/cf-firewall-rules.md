---
title: Firewall Rules API
description: Use the Firewall Rules API to programmatically manage your rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/firewall/api/cf-firewall-rules/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Firewall Rules API

Use the Firewall Rules API to programmatically manage your rules.

Deprecation notice

Cloudflare Firewall Rules has been deprecated. Cloudflare has moved existing firewall rules to [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/). For more information on this change, refer to the [upgrade guide](https://developers.cloudflare.com/waf/reference/legacy/firewall-rules-upgrade/).

When working with the Firewall Rules API, refer to these topics for additional context:

* [Firewall rules actions](https://developers.cloudflare.com/firewall/cf-firewall-rules/actions/)
* [Cloudflare Filters API](https://developers.cloudflare.com/firewall/api/cf-filters/)

To get started with the API, review the Firewall Rules API [JSON object](https://developers.cloudflare.com/firewall/api/cf-firewall-rules/json-object/) and [Endpoints](https://developers.cloudflare.com/firewall/api/cf-firewall-rules/endpoints/).

For more information on the Rules language used to write rule expressions, refer to [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/) in the Ruleset Engine documentation.

## Differences from other Cloudflare APIs

The Firewall Rules API behaves differently from most Cloudflare APIs in two ways:

* API calls accept and return multiple items, and allow applying data changes to multiple items.
* Although API calls return the [standard response](https://developers.cloudflare.com/fundamentals/api/), the error object follows the [JSON API standard ↗](http://jsonapi.org/format/#errors), such that in an error condition, it is clear which item produced the error and why.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/firewall/","name":"Firewall Rules (deprecated)"}},{"@type":"ListItem","position":3,"item":{"@id":"/firewall/api/","name":"Manage rules via the APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/firewall/api/cf-firewall-rules/","name":"Firewall Rules API"}}]}
```
