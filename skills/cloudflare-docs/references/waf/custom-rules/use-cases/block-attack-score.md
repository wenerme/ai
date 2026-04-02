---
title: Block requests by attack score
description: The attack score helps identify variations of known attacks and their malicious payloads.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/waf/custom-rules/use-cases/block-attack-score.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Block requests by attack score

The [attack score](https://developers.cloudflare.com/waf/detections/attack-score/) helps identify variations of known attacks and their malicious payloads.

This example custom rule blocks requests based on country code ([ISO 3166-1 Alpha 2 ↗](https://www.iso.org/obp/ui/#search/code/) format), from requests with an attack score lower than 20\. For more information, refer to [WAF attack score](https://developers.cloudflare.com/waf/detections/attack-score/).

* **Expression**: `(ip.src.country in {"CN" "TW" "US" "GB"} and cf.waf.score lt 20)`
* **Action**: _Block_

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/use-cases/","name":"Common use cases"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/custom-rules/use-cases/block-attack-score/","name":"Block requests by attack score"}}]}
```
