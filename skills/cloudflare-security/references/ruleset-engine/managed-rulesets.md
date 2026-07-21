---
description: Deploy and customize managed rulesets provided by Cloudflare.
title: Work with managed rulesets
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt
> Use this file to discover all available pages before exploring further.

#  Work with managed rulesets

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Managed rulesets are preconfigured rulesets provided by Cloudflare that you can deploy. Only Cloudflare can modify these rulesets.

The rules in a managed ruleset have a default configuration. However, you can define [overrides](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/) that change this default configuration.

Several Cloudflare products include managed rulesets:

* [Web Application Firewall (WAF)](https://developers.cloudflare.com/waf/managed-rules/)
* [DDoS Protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/)
* [Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/how-to/enable-managed-rulesets/)

Check each product's documentation for details on the available managed rulesets.

## More resources

To view available managed rulesets, refer to [View rulesets](https://developers.cloudflare.com/ruleset-engine/basic-operations/view-rulesets/).

To deploy a managed ruleset to a phase, refer to [Deploy a managed ruleset](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/deploy-managed-ruleset/).

To adjust the behavior of a managed ruleset, do one of the following:

* Customize the behavior of one or more rules by using [overrides](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/).
* Skip one or more managed rules by adding [exceptions](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/create-exception/).

Exceptions (only supported by the WAF) have priority over overrides.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/ruleset-engine/managed-rulesets/#page","headline":"Work with managed rulesets · Cloudflare Ruleset Engine docs","description":"Deploy and customize managed rulesets provided by Cloudflare.","url":"https://developers.cloudflare.com/ruleset-engine/managed-rulesets/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
