---
title: Phases
description: How phases organize rule execution in the Ruleset Engine request lifecycle.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Phases

A phase defines a stage in the life of a request where you can execute [rulesets](https://developers.cloudflare.com/ruleset-engine/about/rulesets/). Phases are defined by Cloudflare and cannot be modified.

Phases exist at two levels:

* At the [account](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#accounts) level
* At the [zone](https://developers.cloudflare.com/fundamentals/concepts/accounts-and-zones/#zones) level

For the same phase, rules defined at the account level are evaluated before the rules defined at the zone level.

Each phase has at most one [entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset) at the account and zone level.

Note

Currently, phases at the account level are only available in Enterprise plans.

The following diagram outlines the request handling process where requests go through the available phases:

![Diagram showing the request handling process. The user request goes through several request phases until it eventually reaches the origin server \(the request can also be blocked\). The origin returns a response, which goes through several response phases until it reaches the user.](https://developers.cloudflare.com/_astro/rulesets-phases.D4jji4ui_ZDPPel.webp) 

Cloudflare products are specific to one or more phases, and they add support for different features. Check the documentation for each Cloudflare product for details on the applicable phases.

Refer to [Phases list](https://developers.cloudflare.com/ruleset-engine/reference/phases-list/) for a list of phases and their corresponding Cloudflare products.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/about/","name":"About"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/about/phases/","name":"Phases"}}]}
```
