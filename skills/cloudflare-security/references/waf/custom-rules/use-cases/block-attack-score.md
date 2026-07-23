---
description: Block requests with high WAF attack scores.
title: Block requests by attack score
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Block requests by attack score

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/custom-rules/use-cases/block-attack-score/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The [attack score](https://developers.cloudflare.com/waf/detections/attack-score/) helps identify variations of known attacks and their malicious payloads.

This example [custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) blocks requests based on country code ([ISO 3166-1 Alpha 2 ↗](https://www.iso.org/obp/ui/#search/code/) format), from requests with an attack score lower than 20\. For more information, refer to [WAF attack score](https://developers.cloudflare.com/waf/detections/attack-score/).

* **When incoming requests match**:

| Field            | Operator  | Value                                        | Logic |
| ---------------- | --------- | -------------------------------------------- | ----- |
| Country          | is in     | China, Taiwan, United Kingdom, United States | And   |
| WAF Attack Score | less than | 20                                           |       |
If you are using the expression editor:
`(ip.src.country in {"CN" "TW" "US" "GB"} and cf.waf.score lt 20)`
* **Then take action**: _Block_

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/use-cases/block-attack-score/#page","headline":"Block requests by attack score · Cloudflare Web Application Firewall (WAF) docs","description":"Block requests with high WAF attack scores.","url":"https://developers.cloudflare.com/waf/custom-rules/use-cases/block-attack-score/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Geolocation"]}
```
