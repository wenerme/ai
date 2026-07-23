---
description: Fields available for use in Ruleset Engine rule expressions.
title: Fields
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt
> Use this file to discover all available pages before exploring further.

# Fields

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Cloudflare Rules language supports different types of fields such as:

* Request fields that represent the basic properties of incoming requests, including specific fields for accessing request headers, URI components, and the request body.
* Dynamic fields that represent computed or derived values, typically related to threat intelligence about an HTTP request.
* Response fields that represent the basic properties of the received response.
* Raw fields that preserve the original request values for later evaluations.

Refer to the [Fields reference](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/) for the list of available fields.

## Differences from Wireshark display fields

Most fields supported by the Cloudflare Rules language use the same naming conventions as [Wireshark display fields ↗](https://www.wireshark.org/docs/wsug%5Fhtml%5Fchunked/ChWorkBuildDisplayFilterSection.html). However, there are some subtle differences between Cloudflare and Wireshark:

* Wireshark supports [CIDR (Classless Inter-Domain Routing) notation ↗](https://en.wikipedia.org/wiki/Classless%5FInter-Domain%5FRouting) for expressing IP address ranges in equality comparisons (`ip.src == 1.2.3.0/24`, for example). Cloudflare does not.
To evaluate a range of addresses using CIDR notation, use the [in](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/#comparison-operators) comparison operator as in this example: `ip.src in {1.2.3.0/24 4.5.6.0/24}`.
* In Wireshark, `ssl` is a protocol field containing hundreds of other fields of various types that are available for comparison in multiple ways. However, in the Rules language [ssl](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/ssl/) is a single Boolean field that indicates whether the connection from the client to Cloudflare is encrypted.
* The Cloudflare Rules language does not support the `slice` operator.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/#page","headline":"Fields reference · Cloudflare Ruleset Engine docs","description":"Fields available for use in Ruleset Engine rule expressions.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
