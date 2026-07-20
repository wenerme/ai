---
title: Bots
description: Automated software programs that interact with websites and APIs.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Bots

A **bot** is a software application programmed to do certain tasks.

Bots can be used for good (chatbots, search engine crawlers) or for evil (inventory hoarding, credential stuffing).

More information

For more background, refer to [What is a bot? ↗](https://www.cloudflare.com/learning/bots/what-is-a-bot/).

## AI bots

AI crawlers and agents interact with your site for very different reasons, and you may want to treat those reasons differently. Rather than relying on a single "AI bot" label, Cloudflare classifies bots by **behavior** — what a bot does on your site — so you can allow the behavior that helps your business and block the behavior that harms it. A single bot can have more than one behavior.

### Classification

Cloudflare lets all customers manage three AI-related use cases directly:

| Behavior     | What it does                                                                                                                       |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Search**   | Collects or indexes your content so it can answer questions about it later.                                                        |
| **Agent**    | Automated activity acting in real time on a person's behalf to get something done, such as chat fetch bots and browser-use agents. |
| **Training** | Crawls your content to train or fine-tune a model, permanently absorbing your data into the model.                                 |

Cloudflare classifies other behaviors, too — refer to [Verified bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/concepts/bot/#page","headline":"Bots · Cloudflare bot solutions docs","description":"Automated software programs that interact with websites and APIs.","url":"https://developers.cloudflare.com/bots/concepts/bot/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/concepts/bot/","name":"Bots"}}]}
```
