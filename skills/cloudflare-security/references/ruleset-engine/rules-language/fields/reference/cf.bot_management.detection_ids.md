---
description: List of IDs that correlate to the Bot Management heuristic detections made on a request.
title: cf.bot_management.detection_ids
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.bot\_management.detection\_ids

`cf.bot_management.detection_ids` `Array<Number>`

List of IDs that correlate to the Bot Management heuristic detections made on a request.

Use this field to explicitly match a specific heuristic or to exclude a heuristic in a rule. You can have multiple heuristic detections on the same request.

Requires a Cloudflare Enterprise plan with [Bot Management](https://developers.cloudflare.com/bots/plans/bm-subscription/) enabled.

Example usage:

```txt
any(cf.bot_management.detection_ids[*] eq 33554817)
```

Categories:
* Request
* Bots

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.bot_management.detection_ids/#page","headline":"cf.bot_management.detection_ids · Cloudflare Ruleset Engine docs","description":"List of IDs that correlate to the Bot Management heuristic detections made on a request.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.bot_management.detection_ids/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
