---
title: Cloudflare Ruleset Engine
description: Create and deploy rules and rulesets across Cloudflare products using the Ruleset Engine's powerful syntax and high-performance evaluation.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Ruleset Engine

The Cloudflare Ruleset Engine allows you to create and deploy rules and rulesets in different Cloudflare products using the same basic syntax.

## Main features

* **Powerful syntax**: Rule expressions use a powerful Rules language similar to the wirefilter syntax that allows you to create complex rules.
* **High-performance rule evaluation**: Allows you to have many rules in different Cloudflare products with almost no impact on performance.
* **Engine powering different Cloudflare products**: Cloudflare keeps building products on top of the Ruleset Engine, which means that you can use the same API methods for configuring different products, with the same customization possibilities. Additionally, the Ruleset Engine supports the different phases of the request life cycle at Cloudflare.

## Availability

The Ruleset Engine supports different Cloudflare products. Refer to [Phases list](https://developers.cloudflare.com/ruleset-engine/reference/phases-list/) and to each product's documentation for details.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}}]}
```
