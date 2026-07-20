---
title: BotBase
description: Browse Cloudflare's directory of all known bots and agents, with behavior-based classification, directly in the dashboard.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# BotBase

BotBase is Cloudflare's directory of all known bots, including [verified bots and agents](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/). It provides a comprehensive, searchable view of the entire bot directory directly in the Cloudflare dashboard, where you can see how Cloudflare classifies each bot and target individual bots in your security configuration.

BotBase currently serves as a visibility plane for tracked bots. To mitigate these bots, you can use [Security rules](https://developers.cloudflare.com/security/rules/) or the [AI traffic options](https://developers.cloudflare.com/bots/concepts/bot/#ai-bots).

## Availability

BotBase is available to [Enterprise Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/) customers.

## Access

To view BotBase, go to **Security Analytics** \> **Bot analysis** \> **BotBase**. You can also access BotBase from **Security Settings** \> **Bot Management** \> **BotBase**.

## What you can do

* Browse the full catalogue of all verified bots and agents, and see the behavior or behaviors each one is classified under.
* Search and filter the directory to find a specific bot or group of bots.
* Filter your own traffic to a specific bot to investigate its activity on your zone.
* Copy a bot's detection ID to target it in [Security rules](https://developers.cloudflare.com/security/rules/).

## Classification

BotBase classifies each tracked bot by its behavior — what the bot may do on your site. A single bot can have one or more behaviors. To read more, see [Verified bot classifications](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/).

## Radar's public-facing BotBase

Every bot tracked in BotBase, along with select metadata, is available publicly in [Cloudflare Radar's bots and agents directory ↗](https://radar.cloudflare.com/bots/directory).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/botbase/#page","headline":"BotBase · Cloudflare bot solutions docs","description":"Browse Cloudflare's directory of all known bots and agents, with behavior-based classification, directly in the dashboard.","url":"https://developers.cloudflare.com/bots/botbase/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI","Bots"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/botbase/","name":"BotBase"}}]}
```
