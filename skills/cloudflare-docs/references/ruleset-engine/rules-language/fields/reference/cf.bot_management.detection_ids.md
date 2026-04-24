---
title: cf.bot_management.detection_ids
description: List of IDs that correlate to the Bot Management heuristic detections made on a request.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/fields/index.yaml) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

#  cf.bot\_management.detection\_ids 

`cf.bot_management.detection_ids` ` Array<Number> ` 

List of IDs that correlate to the Bot Management heuristic detections made on a request.

Use this field to explicitly match a specific heuristic or to exclude a heuristic in a rule. You can have multiple heuristic detections on the same request.

Requires a Cloudflare Enterprise plan with [Bot Management](https://developers.cloudflare.com/bots/plans/bm-subscription/) enabled.

Example usage:

```

any(cf.bot_management.detection_ids[*] eq 33554817)


```

Categories: 
* Request
* Bots

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
