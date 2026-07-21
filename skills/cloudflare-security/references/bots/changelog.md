---
description: Track the latest updates and changes to Cloudflare bot solutions.
title: Changelog
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

#  Changelog

Last updated Apr 15, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/bots/changelog/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

[ Subscribe to RSS ](https://developers.cloudflare.com/bots/changelog/index.xml)

## 2026-07-01

**New options to manage AI traffic**

All customers can now manage AI crawlers by behavior — [Search, Agent, and Training](https://developers.cloudflare.com/bots/concepts/bot/#ai-bots) — instead of a single Block AI bots toggle. Configure these options from [Block AI Bots](https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/). New defaults, in which Training and Agent are blocked on pages that display ads while Search remains allowed, take effect for new domains on September 15, 2026.

## 2026-07-01

**BotBase and Attribution Business Insights for Enterprise Bot Management**

Enterprise Bot Management customers can now use [BotBase](https://developers.cloudflare.com/bots/botbase/), a searchable directory of all tracked bots and agents with their behavior classification and detection IDs, and [Attribution Business Insights](https://developers.cloudflare.com/bots/attribution-business-insights/), a dashboard showing site-wide and per-operator crawl-to-referral ratios alongside bot traffic to your content.

## 2025-07-02

**Managed robots.txt will prepend existing files**

Cloudflare will prepend our managed `robots.txt` before your existing `robots.txt`, combining both into a single response.

## 2025-06-26

**Web Bot Auth is now available for bot verification**

Web Bot Auth is an authentication method that leverages cryptographic signatures in HTTP messages to verify that a request comes from an automated bot. This provides a more robust way of verifying bots.

## 2025-05-14

**Anomaly detection events now receive a bot score of 2**

Events detected by the [anomaly detection engine](https://developers.cloudflare.com/bots/concepts/bot-detection-engines/#anomaly-detection-enterprise) are now given a bot score of 2.

## 2025-05-08

**Machine Learning model v9 is now the default model**

[Machine Learning model v9](https://developers.cloudflare.com/bots/reference/machine-learning-models/#model-versions-and-release-notes) is now the default model for all new zones and existing zones set to use the latest machine learning model.

## 2025-04-28

**Managed robots.txt is now available**

Direct AI crawlers on what they can and cannot scrape from your website or application by [implementing a robots.txt file](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/) to your domain.

## 2025-04-24

**Bot Detection Alerts are now available**

You can now create a [Bot Detection Alert](https://developers.cloudflare.com/bots/reference/alerts/) to notify you when Cloudflare detects a spike in Bot traffic on your website.

## 2024-08-19

**AI bots is now a managed rule**

[AI bots protection](https://developers.cloudflare.com/bots/concepts/bot/#ai-bots) has been upgraded from a custom rule to a managed rule.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/bots/changelog/#page","headline":"Changelog · Cloudflare bot solutions docs","description":"Track the latest updates and changes to Cloudflare bot solutions.","url":"https://developers.cloudflare.com/bots/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
