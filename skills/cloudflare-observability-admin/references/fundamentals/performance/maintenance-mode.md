---
description: Make your website temporarily unavailable during large changes using Cloudflare Workers, Waiting Room, or Access.
title: Maintenance mode
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt
> Use this file to discover all available pages before exploring further.

# Maintenance mode

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/fundamentals/performance/maintenance-mode/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you need to make large changes to your website, you may want to make your site temporarily unavailable.

## With code

If you are familiar with code, [create a Worker](https://developers.cloudflare.com/workers/get-started/guide/) that returns an [HTML page](https://developers.cloudflare.com/workers/examples/return-html/) to any site visitors.

![Workers maintenance page returned instead of your website](https://developers.cloudflare.com/_astro/workers-page.DnkGi-jv_ZQeG7r.webp)

## Without code

### Business and Enterprise

For a maintenance page without code, Business and Enterprise uses can create a [Cloudflare Waiting Room](https://developers.cloudflare.com/waiting-room/how-to/create-waiting-room/).

Certain customization and queue options depend on your [plan](https://developers.cloudflare.com/waiting-room/plans/).

![Waiting room page returned instead of your website](https://developers.cloudflare.com/_astro/waiting-room-page.C-z8rg-V_220ck.webp)

### All plans

Users on all plans can [create an Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/). Make sure to limit your [Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/#create-a-policy) to only include yourself and any collaborators.

If needed, you can also further [customize the login page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-login-page/).

![Example Access login page](https://developers.cloudflare.com/_astro/access-page.C47nT0tE_ZFEQLY.webp)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/performance/maintenance-mode/#page","headline":"Maintenance mode · Cloudflare Fundamentals docs","description":"Make your website temporarily unavailable during large changes using Cloudflare Workers, Waiting Room, or Access.","url":"https://developers.cloudflare.com/fundamentals/performance/maintenance-mode/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
