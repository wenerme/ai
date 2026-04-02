---
title: Rulesets API
description: The Rulesets API provides an interface for managing and configuring the execution of rulesets, supporting different Cloudflare products powered by the Ruleset Engine.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ruleset-engine/rulesets-api/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Rulesets API

The Rulesets API provides an interface for managing and configuring the execution of rulesets, supporting different Cloudflare products powered by the Ruleset Engine.

## Get started

To get started, review the [JSON objects](https://developers.cloudflare.com/ruleset-engine/rulesets-api/json-object/) and the available [endpoints](https://developers.cloudflare.com/ruleset-engine/rulesets-api/endpoints/).

---

## Limits

You should avoid making concurrent updates to the same ruleset. There are rate limits in place to prevent the same ruleset from being concurrently updated too many times. The exact limits depend on the size of the ruleset and volume of requests, and can be different for each ruleset.

The rate limits are most frequently hit when concurrently modifying several rules in the same ruleset. To avoid this, you should [update the entire ruleset in a single operation](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update/) instead.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rulesets-api/","name":"Rulesets API"}}]}
```
