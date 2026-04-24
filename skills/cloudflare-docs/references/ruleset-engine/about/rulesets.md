---
title: Rulesets
description: How rulesets group and organize rules in the Ruleset Engine.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ruleset-engine/about/rulesets.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Rulesets

A ruleset is an ordered set of [rules](https://developers.cloudflare.com/ruleset-engine/about/rules/) that you can apply to traffic on the Cloudflare global network. Rulesets belong to a phase and can only execute in the same phase. To deploy a ruleset to a phase, add a rule that executes the ruleset to the [phase entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset).

Rulesets are versioned. Each ruleset modification creates a new version of the ruleset. You can have several versions of a ruleset in use at the same time. When you deploy a ruleset — that is, when you create a rule that executes the ruleset — the most recent version of the ruleset is selected by default.

There are several types of rulesets:

* Phases have their entry point rulesets.
* Cloudflare provides managed rulesets you can deploy.
* You can create and manage your own custom rulesets.

Specific Cloudflare products may provide other types of rulesets.

## Entry point ruleset

An entry point ruleset contains a list of ordered [rules](https://developers.cloudflare.com/ruleset-engine/about/rules/) that run in a [phase](https://developers.cloudflare.com/ruleset-engine/about/phases/) at the account or zone level. This ruleset is an entry point for all rules executed in a phase. Some of these rules may run other rulesets.

Each phase has at most one entry point ruleset at the account level and at the zone level.

Note

The `kind` field of a phase entry point ruleset has one of the following values:

* `root` for a phase entry point ruleset at the account level
* `zone` for a phase entry point ruleset at the zone level

## Managed rulesets

Managed rulesets are preconfigured rulesets provided by Cloudflare that you can deploy to a phase. Only Cloudflare can modify these rulesets.

The rules in a managed ruleset have a default action and status. However, you can define **overrides** that change these defaults.

There are several Cloudflare products that provide you with managed rulesets. Check each product’s documentation for details on the available managed rulesets.

For more information on deploying managed rulesets and defining overrides, refer to [Work with managed rulesets](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/).

## Custom rulesets

Note

Currently, custom rulesets are only supported by the Cloudflare WAF.

Use custom rulesets to define your own sets of rules. After creating a custom ruleset, deploy it to a phase by creating a rule that executes the ruleset.

For more information on creating and deploying custom rulesets, refer to [Work with custom rulesets](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/about/","name":"About"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/about/rulesets/","name":"Rulesets"}}]}
```
