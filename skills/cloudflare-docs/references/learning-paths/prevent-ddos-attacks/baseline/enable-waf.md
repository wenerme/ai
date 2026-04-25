---
title: Enable WAF
description: Enable the Web Application Firewall.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# Enable WAF

Once you [proxy your DNS records](https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/baseline/proxy-dns-records/), you should enable rulesets for Cloudflare's [Web Application Firewall (WAF)](https://developers.cloudflare.com/waf/).

The available rulesets depend on your zone's plan, but all customers have access at least to the Cloudflare Free Managed Ruleset, which provides mitigations against high and wide-impacting vulnerabilities.

For more details and potential customizations, refer to [Managed rulesets](https://developers.cloudflare.com/waf/managed-rules/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/prevent-ddos-attacks/baseline/","name":"Baseline DDoS protection"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/prevent-ddos-attacks/baseline/enable-waf/","name":"Enable WAF"}}]}
```
