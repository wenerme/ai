---
title: Stop malicious bots
description: Detect and block automated threats while allowing legitimate traffic.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/use-cases/application-security/bots.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Stop malicious bots

Malicious bots perform credential stuffing, content scraping, and inventory hoarding. Cloudflare Bot Security uses machine learning to score every request, blocking automated threats while allowing legitimate bots like search engine crawlers.

## Solutions

### Bot security

Machine learning powered bot detection with granular control over bot traffic. [Learn more about bot security](https://developers.cloudflare.com/bots/).

* **Bot scores** \- Every request receives an ML-derived bot score from 1 (bot) to 99 (human)
* **Verified bots** \- Allow known good bots like search engine crawlers while blocking malicious ones

### Super Bot Fight Mode

Basic bot protection included with Pro plans and above. [Learn more about Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/).

* **Challenge pages** \- Present JavaScript (JS) or managed challenges to suspicious traffic on Pro plans and above

### Turnstile

Privacy-preserving CAPTCHA alternative for forms and user interactions. [Learn more about Turnstile](https://developers.cloudflare.com/turnstile/).

* **Form protection** \- Privacy-preserving CAPTCHA alternative that protects login, signup, and checkout forms without friction

## Get started

1. [Enable Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) (Free plan)
2. [Configure Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/) (Pro plan and above)
3. [Add Turnstile to forms](https://developers.cloudflare.com/turnstile/get-started/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/application-security/","name":"Application security"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/application-security/bots/","name":"Stop malicious bots"}}]}
```
