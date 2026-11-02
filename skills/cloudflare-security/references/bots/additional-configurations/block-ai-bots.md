---
description: Configure how Cloudflare handles AI crawlers, agents, and training bots.
title: AI Crawler and Agent access policies
image: https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/og.png?v=c23d1a043bf313ee
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

# AI Crawler and Agent access policies

Last updated Nov 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

This feature was previously called **Configure AI bot policies**.

## AI Crawler and Agent access policies

AI Crawler and Agent access policies let you control AI crawler and agent traffic by behavior. You can set actions for Search, Agent, and Training traffic, and customize access for the top Personal Agents.

### Behaviors

Cloudflare offers configuration for the most common AI behaviors:

- **Search**: crawlers that collect or index your content to answer questions about it later.
- **Agent**: automated activity acting in real time on a person's behalf, such as chat fetch bots and browser-use agents.
- **Training**: crawlers taking your content to train or fine-tune a model, including mixed-purpose crawlers that are used both for Training and for Search.

Each policy applies to Verified bots with that behavior and matching unverified bots.

### Policy actions

Choose an action for each behavior. Available actions are:

| Action | Effect |
| --- | --- |
| *Block* | Block matching requests across the zone. |
| *Block on pages with ads* | Block matching requests on pages where Cloudflare detects ads. |
| *Allow (do not block)* | Do not block matching requests. |
| *Disallow* | For Training only, tell crawlers not to access your content through `robots.txt`. |

`robots.txt` directives are voluntary. Crawlers can ignore them. When Bot Preference Sync is enabled, **Disallow** also blocks AI training crawlers at Cloudflare's edge. Mixed-purpose crawlers used for both Search and Training are excluded from this edge block.

### Configure policies for existing domains

To configure these policies for an existing zone:

1. In the Cloudflare dashboard, go to **Security** > **Settings**. [Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Bot traffic**, then select **AI Crawler and Agent access policies**.
3. Select an action for each behavior. For Agents, you can also granularly customize access for the top Personal Agents.
4. Select **Save**.

### Default policies for new domains

For new domains, **Search**, **Agents**, and **Training** use **Allow (do not block)** by default. You can change these defaults after onboarding in **Security** > **Settings** > **AI Crawler and Agent access policies**.

Training actions also apply to mixed-purpose crawlers used for both Search and Training.

### Personal Agent policies

Personal Agents inherit the **Agents** policy by default. Changing the **Agents** policies updates each Personal Agent. You can then choose individual actions again. Cloudflare recommends **Allow (do not block)** for Personal Agents.

You can also configure Personal Agent policies during zone onboarding.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/#page","headline":"AI Crawler and Agent access policies","description":"Configure how Cloudflare handles AI crawlers, agents, and training bots.","url":"https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/","inLanguage":"en","image":"https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/og.png?v=c23d1a043bf313ee","dateModified":"2026-11-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI","Scraping"]}
```
