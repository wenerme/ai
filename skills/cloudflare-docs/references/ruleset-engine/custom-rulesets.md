---
title: Work with custom rulesets
description: Create, deploy, and manage custom rulesets using the API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Work with custom rulesets

Use the following workflow to deploy a custom ruleset:

1. [Create a custom ruleset](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/create-custom-ruleset/), optionally providing a list of rules to include in the custom ruleset.
2. (Optional) [Add rules to your custom ruleset](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/add-rules-ruleset/).
3. [Deploy the custom ruleset](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/deploy-custom-ruleset/) by adding an `execute` rule to a phase entry point ruleset. If you skip this step, the rules of the custom ruleset will not run.

Currently, custom rulesets are only supported by the [Cloudflare WAF](https://developers.cloudflare.com/waf/), both at the account and the zone level.

Note

You cannot execute a custom ruleset from another custom ruleset, only from an [entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset).

## Change the behavior of a custom ruleset

To modify custom ruleset behavior, Cloudflare recommends [creating a new custom ruleset](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/create-custom-ruleset/) or [editing the custom ruleset](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/add-rules-ruleset/) instead of using overrides.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/custom-rulesets/","name":"Work with custom rulesets"}}]}
```
