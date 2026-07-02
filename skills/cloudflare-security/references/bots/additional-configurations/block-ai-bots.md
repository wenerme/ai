---
title: Block AI Bots
description: Block AI crawlers and scrapers from accessing your website content.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Block AI Bots

## Configure AI bot policies

### New defaults on September 15, 2026

On September 15, 2026, Cloudflare will set updated defaults for new domains: bots classified as Training or as Agent will be blocked on pages that display ads, and Search will remain allowed. Mixed-purpose crawlers that combine Search and Training will also be blocked by all configurations to block AI training, including the legacy "Block AI bots" option. Before September 15, all customers can [opt out of these new defaults ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings).

All Cloudflare customers can choose to block AI bots and agents based on their behavior. Cloudflare offers presets for the most common AI behaviors to give customers the option to treat different AI use cases distinctly:

* **Search**: crawlers that collect or index your content to answer questions about it later.
* **Agent**: automated activity acting in real time on a person's behalf, such as chat fetch bots and browser-use agents.
* **Training**: crawlers taking your content to train or fine-tune a model, including mixed-purpose crawlers that are used both for Training and for Search.

Each blocking option will block Verified bots classified with that behavior, plus additional unverified bots that fall under these classifications.

Each setting includes three mitigation options:

* **Block (on all pages)** \- Issues the block across the entire zone.
* **Block on pages with ads** \- Uses Cloudflare automated detection for pages that display ads on your zone to block only on those pages.
* **Allow (do not block)** \- Does not add any blocking.

To configure these policies, customers can go to **Security Settings** \> **Configure AI bot policies**.

## Block AI bots \[Deprecating on September 15, 2026\]

This setting blocks verified bots that are classified as crawling for the purpose of AI training, as well as a number of unverified bots that behave similarly.

Note

This option excludes mixed-purpose bots that are used both for Training and for Search.

To configure this setting and set their preference for blocking mixed-purpose bots, customers can go to **Security Settings** \> **Block AI bots**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/#page","headline":"Block AI Bots · Cloudflare bot solutions docs","description":"Block AI crawlers and scrapers from accessing your website content.","url":"https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-07-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI","Scraping"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/additional-configurations/","name":"Additional configurations"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/additional-configurations/block-ai-bots/","name":"Block AI Bots"}}]}
```
