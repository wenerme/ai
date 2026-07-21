---
description: Detect and block automated threats while allowing legitimate traffic.
title: Stop malicious bots
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt
> Use this file to discover all available pages before exploring further.

#  Stop malicious bots

Last updated Apr 15, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/use-cases/application-security/bots/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Malicious bots perform credential stuffing, content scraping, and inventory hoarding. Cloudflare provides multiple tools to detect and block automated threats while allowing legitimate bots like search engine crawlers.

For a step-by-step workflow that combines these tools into a layered defense, refer to [Stop malicious bots while allowing legitimate traffic](https://developers.cloudflare.com/use-cases/solutions/stop-malicious-bots/).

## Solutions

### Bot Fight Mode

Baseline bot protection available on all plans, including Free. Challenges requests that match known bot patterns. [Learn more about Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/).

### Super Bot Fight Mode

Granular bot controls for Pro plans and above. Allows verified bots, configures per-category actions, and extends protection to static resources. [Learn more about Super Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/super-bot-fight-mode/).

### Bot Management

Machine learning-powered bot detection for Enterprise with granular signal detections. Assigns a bot score from 1 (bot) to 99 (human) to every request, along with additional signals for more precise and customizable security rules. [Learn more about Bot Management](https://developers.cloudflare.com/bots/).

### Turnstile

Privacy-preserving challenge for forms and user interactions. Available on all plans at no cost. [Learn more about Turnstile](https://developers.cloudflare.com/turnstile/).

### WAF custom rules

Targeted rules that act on traffic signals including headers, request patterns, and [bot management variables](https://developers.cloudflare.com/bots/reference/bot-management-variables/). Available on all plans. [Learn more about custom rules](https://developers.cloudflare.com/waf/custom-rules/).

## Get started

1. [Stop malicious bots while allowing legitimate traffic](https://developers.cloudflare.com/use-cases/solutions/stop-malicious-bots/) — layered defense guide covering all products above
2. [Enable Bot Fight Mode](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/) — quickest single step (Free plan)
3. [Add Turnstile to forms](https://developers.cloudflare.com/turnstile/get-started/) — protect login and signup forms

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/application-security/bots/#page","headline":"Stop malicious bots · Cloudflare use cases","description":"Detect and block automated threats while allowing legitimate traffic.","url":"https://developers.cloudflare.com/use-cases/application-security/bots/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
