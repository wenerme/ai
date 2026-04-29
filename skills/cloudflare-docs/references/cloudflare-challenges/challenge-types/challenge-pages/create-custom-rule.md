---
title: Implement a Challenge Page via WAF custom rules
description: Create WAF custom rules that issue challenge pages based on bot scores or rate limits.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-challenges/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Implement a Challenge Page via WAF custom rules

You can implement a Challenge Page to your website or application by creating a [WAF custom rule](https://developers.cloudflare.com/waf/custom-rules/).

Challenges are triggered by a rule in the [Web Application Firewall (WAF)](https://developers.cloudflare.com/waf/), [Bot Management](https://developers.cloudflare.com/bots/), or [Rate limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/).

* **Bot Management**: You can set the custom rule to challenge a visitor based on the [bot score](https://developers.cloudflare.com/bots/concepts/bot-score/) or [detection ID](https://developers.cloudflare.com/bots/additional-configurations/detection-ids/).
* **Rate limiting**: You can challenge visitors based on your defined rate limits.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-challenges/","name":"Challenges"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-challenges/challenge-types/","name":"Available Challenges"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-challenges/challenge-types/challenge-pages/","name":"Interstitial Challenge Pages"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-challenges/challenge-types/challenge-pages/create-custom-rule/","name":"Implement a Challenge Page via WAF custom rules"}}]}
```
