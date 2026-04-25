---
title: About
description: Core concepts for the Ruleset Engine, including rules, rulesets, and phases.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# About

The Cloudflare Ruleset Engine allows you to create and deploy rules and rulesets. The engine syntax, inspired by the Wireshark Display Filter language, is defined by the [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/). Cloudflare uses the Ruleset Engine in different products, allowing you to configure several products using the same basic syntax.

There are several elements involved in the configuration and use of the Ruleset Engine. These elements are:

* [**Phase**](https://developers.cloudflare.com/ruleset-engine/about/phases/): Defines a stage in the life of a request where you can execute rulesets.
* [**Ruleset**](https://developers.cloudflare.com/ruleset-engine/about/rulesets/): Defines a versioned set of rules. You deploy rulesets to a phase, where they execute.
* [**Rule**](https://developers.cloudflare.com/ruleset-engine/about/rules/): Defines a filter and an action to perform on incoming requests that match the filter expression. A rule with an `execute` action executes a ruleset.

---

## Get started

To view existing rulesets and their properties, refer to [View rulesets](https://developers.cloudflare.com/ruleset-engine/basic-operations/view-rulesets/).

For more information on deploying managed rulesets and defining overrides, refer to [Work with managed rulesets](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/).

For more information on creating and deploying custom rulesets, refer to [Work with custom rulesets](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/about/","name":"About"}}]}
```
