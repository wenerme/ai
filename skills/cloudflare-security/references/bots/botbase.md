---
description: Browse Cloudflare's directory of all known bots and agents, with behavior-based classification, directly in the dashboard.
title: BotBase
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

# BotBase

Last updated Jul 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/bots/botbase/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

## Requests

The **Requests** column summarizes requests associated with each bot over the previous 24 hours and shows an hourly sparkline.

| Metric           | Definition                                                          |
| ---------------- | ------------------------------------------------------------------- |
| **Successful**   | Requests with an edge HTTP response status in the 2xx or 3xx range. |
| **Unsuccessful** | Requests with any other edge HTTP response status.                  |

These metrics describe HTTP response outcomes, not the mitigation that a website owner configured for a request. Unsuccessful requests can include errors returned by the origin, such as `404` and `5xx` responses.

To investigate a bot's traffic, select its row to open Security Analytics in a new tab filtered to that bot's detection ID. Expand a request in the request log to review the **Mitigation**, **Edge status code**, and **Origin status code** fields.

## Classification

BotBase classifies each tracked bot by its behavior — what the bot may do on your site. A single bot can have one or more behaviors. To read more, see [Verified bot classifications](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/).

## Radar's public-facing BotBase

Every bot tracked in BotBase, along with select metadata, is available publicly in [Cloudflare Radar's bots and agents directory ↗](https://radar.cloudflare.com/bots/directory).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/botbase/#page","headline":"BotBase · Cloudflare bot solutions docs","description":"Browse Cloudflare's directory of all known bots and agents, with behavior-based classification, directly in the dashboard.","url":"https://developers.cloudflare.com/bots/botbase/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI","Bots"]}
```
