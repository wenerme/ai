---
description: Create WAF custom rules that issue challenge pages based on bot scores or rate limits.
title: Implement a Challenge Page via WAF custom rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-challenges/llms.txt
> Use this file to discover all available pages before exploring further.

#  Implement a Challenge Page via WAF custom rules

Last updated May 6, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/create-custom-rule/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

You can implement a Challenge Page to your website or application by creating a [WAF custom rule](https://developers.cloudflare.com/waf/custom-rules/).

Challenges are triggered by a rule in the [Web Application Firewall (WAF)](https://developers.cloudflare.com/waf/), [Bot Management](https://developers.cloudflare.com/bots/), or [Rate limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/).

* **Bot Management**: Challenge visitors that appear automated based on their [bot score](https://developers.cloudflare.com/bots/concepts/bot-score/) or a specific [detection ID](https://developers.cloudflare.com/bots/additional-configurations/detection-ids/).
* **Rate limiting**: Challenge visitors who exceed your configured [rate limits](https://developers.cloudflare.com/waf/rate-limiting-rules/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/create-custom-rule/#page","headline":"Implement a Challenge Page via WAF custom rules · Cloudflare challenges docs","description":"Create WAF custom rules that issue challenge pages based on bot scores or rate limits.","url":"https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/create-custom-rule/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
