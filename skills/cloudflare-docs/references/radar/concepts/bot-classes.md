---
title: Bot classes
description: Cloudflare Radar classifies traffic as likely automated or likely human based on bot score ranges.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/radar/concepts/bot-classes.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Bot classes

A bot class in Radar is a grouping of [bot scores](https://developers.cloudflare.com/bots/concepts/bot-score).

Scores between 1 and 29 are classified as bot traffic. Scores equal or above 30 are classified as non-bot/human traffic.

| Class                | Description                  |
| -------------------- | ---------------------------- |
| **Likely automated** | Bot scores of 1 through 29.  |
| **Likely human**     | Bot scores of 30 through 99. |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/radar/","name":"Radar"}},{"@type":"ListItem","position":3,"item":{"@id":"/radar/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/radar/concepts/bot-classes/","name":"Bot classes"}}]}
```
