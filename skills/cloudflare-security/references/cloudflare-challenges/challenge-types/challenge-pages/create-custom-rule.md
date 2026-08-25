---
description: Create WAF custom rules that issue challenge pages based on bot scores or rate limits.
title: Implement a Challenge Page via WAF custom rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-challenges/llms.txt
> Use this file to discover all available pages before exploring further.

# Implement a Challenge Page via WAF custom rules

Last updated May 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/create-custom-rule/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can implement a Challenge Page to your website or application by creating a [WAF custom rule](https://developers.cloudflare.com/waf/custom-rules/).

Challenges are triggered by a rule in the [Web Application Firewall (WAF)](https://developers.cloudflare.com/waf/), [Bot Management](https://developers.cloudflare.com/bots/), or [Rate limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/).

* **Bot Management**: Challenge visitors that appear automated based on their [bot score](https://developers.cloudflare.com/bots/concepts/bot-score/) or a specific [detection ID](https://developers.cloudflare.com/bots/additional-configurations/detection-ids/).
* **Rate limiting**: Challenge visitors who exceed your configured [rate limits](https://developers.cloudflare.com/waf/rate-limiting-rules/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/create-custom-rule/#page","headline":"Implement a Challenge Page via WAF custom rules · Cloudflare challenges docs","description":"Create WAF custom rules that issue challenge pages based on bot scores or rate limits.","url":"https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/create-custom-rule/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
