---
description: Trap unauthorized AI crawlers with invisible honeypot links to waste their resources.
title: AI Labyrinth
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

# AI Labyrinth

Last updated Apr 22, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/bots/additional-configurations/ai-labyrinth/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The AI Labyrinth adds invisible links on your webpage with specific `Nofollow` tags to block AI crawlers that do not adhere to the recommended guidelines and crawl without permission. AI crawlers that scrape your website content without permission will be stuck in a maze of never-ending links, and their details are recorded and used by all Cloudflare customers who choose to block [AI bots](https://developers.cloudflare.com/bots/concepts/bot/#ai-bots).

These links do not impact your search engine optimization (SEO) or your website's appearance, and are only seen by bots. AI bots that respect no-crawl instructions will safely ignore this honeypot.

To enable AI Labyrinth:

1. In the Cloudflare dashboard, go to the **Security Settings** page.
[Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Bot traffic**.
3. Go to **AI Labyrinth**.
4. Turn **AI Labyrinth** on.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Bots**.
3. Select **Configure Bot Fight Mode**.
4. Enable **AI Labyrinth**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/bots/additional-configurations/ai-labyrinth/#page","headline":"AI Labyrinth · Cloudflare bot solutions docs","description":"Trap unauthorized AI crawlers with invisible honeypot links to waste their resources.","url":"https://developers.cloudflare.com/bots/additional-configurations/ai-labyrinth/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
