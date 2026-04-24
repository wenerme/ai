---
title: Work with managed rulesets
description: Deploy and customize managed rulesets provided by Cloudflare.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ruleset-engine/managed-rulesets/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Work with managed rulesets

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/managed-rulesets/","name":"Work with managed rulesets"}}]}
```
