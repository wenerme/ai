---
description: Core concepts for the Ruleset Engine, including rules, rulesets, and phases.
title: About
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt
> Use this file to discover all available pages before exploring further.

# About

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ruleset-engine/about/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/about/#page","headline":"About Ruleset Engine · Cloudflare Ruleset Engine docs","description":"Core concepts for the Ruleset Engine, including rules, rulesets, and phases.","url":"https://developers.cloudflare.com/ruleset-engine/about/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
