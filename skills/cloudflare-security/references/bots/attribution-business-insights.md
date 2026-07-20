---
title: Attribution Business Insights
description: Understand which bots help or harm your business with crawl-to-referral ratios and behavior-based classification.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Attribution Business Insights

**Attribution Business Insights** is a dashboard designed for business decision-makers and content owners, delivering a targeted view of bot traffic flowing to your website. Analyze crawler patterns to your website in the last 24 hours, 7 days, or 30 days.

## Availability

Attribution Business Insights is available to all [Bot Management Enterprise](https://developers.cloudflare.com/bots/get-started/bot-management/) customers.

This dashboard is meant for visibility for a new set of stakeholders, and does not provide a new control plane. To mitigate certain bots, website owners can use [Security rules](https://developers.cloudflare.com/security/rules/) or the [new AI bot mitigation options](https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/).

## Access

[ Go to **Attribution Business Insights** ](https://dash.cloudflare.com/?to=/:account/:zone/analytics/attribution-business-insights)

You can also reach the dashboard from your zone-level **Analytics** \> **Attribution Business Insights** in the Cloudflare dashboard.

## Definitions

The dashboard surfaces both existing and new metrics that help you evaluate AI traffic. In the current version, we use the following definitions for the metrics shown on the dashboard:

* **Content pages**: Content is initially defined as HTML pages on your website.
* **Crawl-to-referral ratio, per bot operator**: The average crawl-to-referral ratio (number of crawls sent by this company, vs. the number of visitors who visit you through a referral link from that company, tracked through UTM parameters) for a given company, in the selected time period.
* **Crawl-to-referral ratio, site-wide**: The average crawl-to-referral ratio (number of crawls sent by this company, vs. the number of visitors who visit you through a referral link from that company, tracked through UTM parameters) across all activity on your zone, in the selected time period.
* **Classification**: Each crawler is classified with Cloudflare's updated taxonomy. See [Verified bot classifications](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/) for more information. If the company has at least 1 bot with an AI use case, we label the operator with the "AI" label, plus provide this as a filter.
* **Action**: Action reflects whether requests from this company are Blocked, Allowed, or Partially blocked. Companies that have some bots blocked but at least 1 bot allowed will be marked as "Partially Blocked", and configuration can be confirmed in [Security rules](https://developers.cloudflare.com/security/rules/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/attribution-business-insights/#page","headline":"Attribution Business Insights · Cloudflare bot solutions docs","description":"Understand which bots help or harm your business with crawl-to-referral ratios and behavior-based classification.","url":"https://developers.cloudflare.com/bots/attribution-business-insights/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI","Bots"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/attribution-business-insights/","name":"Attribution Business Insights"}}]}
```
