---
description: Mitigate high-risk traffic using threat intelligence fields in WAF rules.
title: Example rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Example rules

Last updated Jun 15, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/detections/threat-intelligence/example-rules/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Custom rule](https://developers.cloudflare.com/waf/custom-rules/) and [rate limiting rule](https://developers.cloudflare.com/waf/rate-limiting-rules/) examples using [threat intelligence fields](https://developers.cloudflare.com/waf/detections/threat-intelligence/fields/). All fields are arrays — use [any()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#any) with `[*]`.

Caution

Test rules with _Log_ before enforcing. IP-based threat intelligence is a seven-day lookback over shared infrastructure — combine with other signals such as [attack score](https://developers.cloudflare.com/waf/detections/attack-score/) before you block.

## Log matches before blocking

Deploy with _Log_ (Enterprise plans) to review matches before enforcing:

* **Expression:**
`any(cf.intel.ip.attacker_names[*] != "")`
* **Action:** _Log_

Review matches in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/), then change the action to _Block_ or _Managed Challenge_.

## Block DDoS participants targeting your region

* **Expression:**
`any(cf.intel.ip.target_countries[*] == "FR") and any(cf.intel.ip.datasets[*] == "ddos")`
* **Action:** _Block_

## Challenge a threat actor targeting the finance sector

* **Expression:**
`any(cf.intel.ip.target_industries[*] == "Banking & Financial Services") and any(cf.intel.ip.attacker_names[*] == "BLACKBASTA")`
* **Action:** _Managed Challenge_

## Filter by attacker country

* **Expression:**
`any(cf.intel.ip.attacker_countries[*] == "CN")`
* **Action:** _Block_

## Combine with attack score

Block requests flagged by the WAF threat intelligence dataset that also have a low [attack score](https://developers.cloudflare.com/waf/detections/attack-score/):

* **Expression:**
`any(cf.intel.ip.datasets[*] == "waf") and cf.waf.score lt 20`
* **Action:** _Block_

## Rate limit threat actors on API paths

[Rate limiting rule](https://developers.cloudflare.com/waf/rate-limiting-rules/) applying a stricter rate to flagged IPs on your API:

* **Expression:**
`any(cf.intel.ip.datasets[*] == "ddos") and starts_with(http.request.uri.path, "/api/")`
* **Action:** _Block_ when the rate is exceeded.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/threat-intelligence/example-rules/#page","headline":"Example rules using threat intelligence · Cloudflare Web Application Firewall (WAF) docs","description":"Mitigate high-risk traffic using threat intelligence fields in WAF rules.","url":"https://developers.cloudflare.com/waf/detections/threat-intelligence/example-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Threat Intelligence"]}
```
