---
description: Understand how bot traffic affects your business with request outcomes, crawl-to-referral ratios, and behavior-based classification.
title: Business Insights
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

# Business Insights

Last updated Sep 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/bots/business-insights/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

**Business Insights** helps business decision-makers and content owners analyze bot traffic to their website over the last 24 hours, 7 days, or 30 days.

## Availability

Business Insights is available to all [Enterprise Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/) customers.

Business Insights is an observability surface and does not provide controls. To mitigate bots, use [Security rules](https://developers.cloudflare.com/security/rules/) or the [AI bot management options](https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/).

## Access

[Go to **Business Insights** ↗](https://dash.cloudflare.com/?to=/:account/:zone/analytics/business-insights)

You can also reach the dashboard from your zone-level **Analytics** > **Business Insights** in the Cloudflare dashboard.

## Definitions

The dashboard uses the following definitions:

- **Content pages**: Content is initially defined as HTML pages on your website.
- **Crawl-to-referral ratio, per bot operator**: The average crawl-to-referral ratio (number of crawls sent by this company, vs. the number of visitors who visit you through a referral link from that company, tracked through UTM parameters) for a given company, in the selected time period.
- **Crawl-to-referral ratio, site-wide**: The average crawl-to-referral ratio (number of crawls sent by this company, vs. the number of visitors who visit you through a referral link from that company, tracked through UTM parameters) across all activity on your zone, in the selected time period.
- **Classification**: Each crawler is classified with Cloudflare's updated taxonomy. See [Verified bot classifications](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/) for more information. If the company has at least 1 bot with an AI use case, we label the operator with the "AI" label, plus provide this as a filter.
- **Operator**: An operator row aggregates requests from all bots associated with that operator.

### Outcome

**Outcome** summarizes the HTTP responses for requests attributed to an operator.

| Outcome | Definition |
| --- | --- |
| **Allowed** | All requests received successful HTTP responses (`2xx` or `3xx`). |
| **Blocked** | All requests received unsuccessful HTTP responses (status codes other than `2xx` or `3xx`). |
| **Partially blocked** | The requests include both successful and unsuccessful HTTP responses. |

For a **Partially blocked** row, the Outcome cell shows the successful and unsuccessful request counts.

Outcome is based on HTTP response status and does not identify the mitigation that a website owner configured for a request. Unsuccessful responses can include errors returned by the origin, such as `404` and `5xx` responses. To investigate a request, review its mitigation, edge status code, and origin status code in [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/business-insights/#page","headline":"Business Insights","description":"Understand how bot traffic affects your business with request outcomes, crawl-to-referral ratios, and behavior-based classification.","url":"https://developers.cloudflare.com/bots/business-insights/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI","Bots"]}
```
