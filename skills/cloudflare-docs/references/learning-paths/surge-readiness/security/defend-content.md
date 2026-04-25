---
title: Defend content with Scrape Shield
description: Protect content from scraping and hotlinking.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

# Defend content with Scrape Shield

Scrape Shield is a collection of settings meant to protect your site's content.

## Email Address Obfuscation

[Email Address Obfuscation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/) uses JavaScript to encrypt addresses and prevents harvesting by spammers and bots while keeping addresses easy to read and use for human visitors.

## Hotlink Protection

[Hotlink Protection](https://developers.cloudflare.com/waf/tools/scrape-shield/hotlink-protection/) prevents your images from being used by other sites, which can reduce the bandwidth consumed by your origin server.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/surge-readiness/security/","name":"Security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/surge-readiness/security/defend-content/","name":"Defend content with Scrape Shield"}}]}
```
