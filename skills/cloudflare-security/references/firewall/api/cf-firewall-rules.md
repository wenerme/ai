---
description: Manage firewall rules via the Firewall Rules API.
title: Firewall Rules API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/firewall/llms.txt
> Use this file to discover all available pages before exploring further.

#  Firewall Rules API

Last updated Apr 24, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/firewall/api/cf-firewall-rules/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

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

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/firewall/api/cf-firewall-rules/#page","headline":"Firewall Rules API · Cloudflare Firewall Rules (deprecated) docs","description":"Manage firewall rules via the Firewall Rules API.","url":"https://developers.cloudflare.com/firewall/api/cf-firewall-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
