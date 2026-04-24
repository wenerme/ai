---
title: Fields
description: Fields available for use in Ruleset Engine rule expressions.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ruleset-engine/rules-language/fields/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Fields

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}}]}
```
