---
title: Verified bots
description: Bots and agents confirmed by Cloudflare as legitimate, such as search engine crawlers and user-driven agents.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Verified bots

A Verified bot is a bot or agent that Cloudflare has confirmed is **transparent about who it is and what it does**: it represents itself honestly and does not abuse the access that honesty earns. Examples include search engine crawlers, monitoring services, and user-driven agents.

Being Verified means a bot or agent meets two bars:

1. **Honest self-identification** — it declares who it is deterministically, through a cryptographic [Web Bot Auth](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/) signature, a published IP list with a stable user-agent, or reverse DNS.
2. **Non-abusive behavior** — it obeys `robots.txt` and crawl directives, maintains reasonable request rates, and has not been observed evading website owner preferences or attacking sites.

Signed agents are now Verified

As of July 1, 2026, the distinction between a Verified bot and a signed agent is expressed by a new metadata field tracked in [BotBase](https://developers.cloudflare.com/bots/botbase/): Direct versus Intermediary access, which tracks who can operate the bot.

## Classification

Note

These updated classifications reflect the new taxonomy of bots used in [BotBase](https://developers.cloudflare.com/bots/botbase/). They are not individual fields in WAF custom rules, but have backwards-compatible categories from the original taxonomy of Verified bots (see [Legacy categories](#legacy-categories) below).

Cloudflare classifies each tracked bot by its behavior — what the bot may do on your site. A single bot can have one or more of the following behaviors:

| Behavior                | Description                                                                    |
| ----------------------- | ------------------------------------------------------------------------------ |
| Search                  | Crawling to build search indexes or RAG databases.                             |
| Agent                   | User-directed agents visiting a page on behalf of a human.                     |
| Training                | Crawling to train or fine-tune models.                                         |
| Transact                | Checkout or other transaction actions on behalf of users.                      |
| Data Collection         | Price scraping, competitive intelligence gathering, and third-party analytics. |
| Security Testing        | Vulnerability scanning and penetration testing.                                |
| SEO                     | SEO crawling, site auditing, and accessibility checks.                         |
| Ads Verification        | Ad placement verification and ad fraud detection.                              |
| Social / Link Preview   | Link previews for social platforms and messaging apps.                         |
| Feed Fetching           | RSS readers, podcast aggregators, and news feed bots.                          |
| Monitoring & Operations | Uptime monitoring, webhooks, and health checks.                                |

Search, Agent, and Training are also available as managed presets you can act on across all plans. For more information, refer to [AI bots](https://developers.cloudflare.com/bots/concepts/bot/#ai-bots).

Cloudflare also labels every Verified bot or agent by how it is operated.

| Label            | Description                                                                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Direct**       | Operated by a single, narrow operator — usually on the operator's own infrastructure. Only that operator can send requests that present as this bot. |
| **Intermediary** | An agentic service that a wide range of end users can operate. The operator runs the software, but each action is initiated by a different end user. |

Because an **intermediary** acts on behalf of many different end users, the operator and the end user are not the same party. This introduces **transitive trust**: you may trust the intermediary operator, but not necessarily every end user driving it. Cloudflare is experimenting with forwarding information about the end user (using the `Forwarded` header defined in [RFC 7239 ↗](https://www.rfc-editor.org/info/rfc7239)) so that website owners can apply their preferences to the party ultimately responsible for a request.

## Becoming a Verified bot

You can request for your bot or agent to be added to Cloudflare's bots and agents directory by filling out an [online application ↗](https://dash.cloudflare.com/?to=/:account/configurations/verified-bots) in the Cloudflare dashboard.

Once Cloudflare approves a Verified bot, it should appear in [BotBase](https://developers.cloudflare.com/bots/botbase/), shared through [Cloudflare Radar's bots and agents directory ↗](https://radar.cloudflare.com/verified-bots).

The bot must be Verified using one of the following validation methods:

* [Web Bot Auth](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/)
* [IP validation](https://developers.cloudflare.com/bots/reference/bot-verification/ip-validation/)

### Breach of policy

If any of the requirements to validate are breached, a service will be removed from the global allowlist.

The following are examples of breaches of policy:

* Adding a set of IPs that are not solely used by Verified service.
* The service IPs are breached by an attacker.
* The service has vulnerabilities that have not been patched.
* A block of IPs not briefed on onboarding is added to the list.
* The disclosed purpose of the service does not reflect on the traffic.
* An AI Crawler that does not respect the crawl-delay directive in robots.txt.

## Legacy categories

Note

The original categories of Verified bots continue to be usable in WAF custom rules and currently continue to work as before, even as Cloudflare continues launching new capabilities based on the updated taxonomy.

Academic research

**String value**: `Academic Research`

**Definition**: Gathers data for scholarly research or academic purposes.

**Example**: Library of Congress, TurnItInBot, Bibliothèque nationale de France

Accessibility

**String value**: `Accessibility`

**Definition**: Scans websites to identify their accessibility.

**Example**: Accessible Web Bot

Advertising or marketing

**String value**: `Advertising & Marketing`

**Definition**: Automates marketing tasks including, but not limited to, ad placement and performance tracking.

**Example**: Google Adsbot

Aggregators

**String value**: `Aggregator`

**Definition**: Collects content from various online sources and consolidates it in one place.

**Example**: Pinterest, Indeed Jobsbot

AI Assistant

**String value**: `AI Assistant`

**Definition**: Automated AI bot driven by user action.

**Example**: Perplexity-User, DuckAssistBot

AI Crawler

**String value**: `AI Crawler`

**Definition**: Crawls websites for content that is used for training AI models.

**Example**: Google Bard, ChatGPT bot

AI Search

**String value**: `AI Search`

**Definition**: Powers AI-driven search experiences.

**Example**: OAI-SearchBot

Note

Under the taxonomy introduced on July 1, 2026, there is no longer a meaningful distinction between "AI Search" and traditional search — both are treated as **Search** behavior. The `AI Search` category value is retained for backward compatibility with existing rules, but new search crawlers are classified under **Search**. Refer to [AI bots](https://developers.cloudflare.com/bots/concepts/bot/#ai-bots).

Archiver

**String value**: `Archiver`

**Definition**: Saves snapshots of websites to preserve digital content for historical records.

**Example**: Internet Archive, CommonCrawl

Feed fetcher

**String value**: `Feed Fetcher`

**Definition**: Retrieves updates from feeds to power readers or other applications.

**Example**: RSS or Podcast feed updaters

Monitoring or analytics

**String value**: `Monitoring & Analytics`

**Definition**: Tracks a website's uptime, performance, and user traffic to gather key monitoring metrics.

**Example**: Uptime Monitors

Page preview

**String value**: `Page Preview`

**Definition**: Generates previews for links shared on social media or in messaging apps.

**Example**: Facebook, Slack, Twitter, or Discord Link Preview tools

Search engine crawler

**String value**: `Search Engine Crawler`

**Definition**: A bot that discovers and indexes web pages for search results.

**Example**: Googlebot, Bingbot, Yandexbot, Baidubot

Search engine optimization

**String value**: `Search Engine Optimization`

**Definition**: Analyzes websites to improve their standing in search engine results pages.

**Example**: Google Lighthouse, GT Metrix, Pingdom, AddThis

Security

**String value**: `Security`

**Definition**: Scans websites to detect security vulnerabilities and potential threats.

**Example**: Vulnerability Scanners, SSL Domain Control Validation (DCV) Check Tools

Social media marketing

**String value**: `Social Media Marketing`

**Definition**: Manages and automates activities on social platforms.

**Example**: Brandwatch

Webhooks

**String value**: `Webhooks`

**Definition**: An automated messenger that sends data from one application to another for specific events.

**Example**: Payment processors, WordPress Integration tools

Other

**String value**: `Other`

**Definition**: A dedicated category for bots that do not fit into the other classifications.

Cloudflare reserves the right to re-assign Verified bot categories if the bot's public documentation and observed behavior differ from the category listed in the bot submission form.

## Availability

Historically, Verified bots have been excluded in default bot configurations across all plans. Now, all customers have the option to [configure AI bot policies](https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/) to define their block vs. allow expectations.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/bots/concepts/bot/verified-bots/#page","headline":"Verified bots · Cloudflare bot solutions docs","description":"Bots and agents confirmed by Cloudflare as legitimate, such as search engine crawlers and user-driven agents.","url":"https://developers.cloudflare.com/bots/concepts/bot/verified-bots/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/concepts/bot/","name":"Bots"}},{"@type":"ListItem","position":5,"item":{"@id":"/bots/concepts/bot/verified-bots/","name":"Verified bots"}}]}
```
