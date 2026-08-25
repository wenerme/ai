---
description: Track Pay Per Crawl revenue and crawler activity.
title: Monitor activity
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt
> Use this file to discover all available pages before exploring further.

# Monitor activity

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/monitor-activity/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

graph LR
A[Enable in<br>account settings] --> B[Set a pay per <br/>crawl price ]
B --> C[Select crawlers<br>to charge]
C --> D[Monitor<br>activity]:::highlight
D --> E[Manage<br>payouts]
classDef highlight fill:#F6821F,color:white

click A "/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/enable-in-account-settings/"
click B "/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/set-a-pay-per-crawl-price/"
click C "/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/select-crawlers-to-charge/"
click E "/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/manage-payouts/"

After configuring pay per crawl, monitor crawler activity to understand how AI crawlers interact with your content, and track your earnings.

## View crawler activity

1. Go to **AI Crawl Control**.
[Go to **AI Crawl Control** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ai)
2. Go to the **Metrics** tab to view detailed analytics.

The metrics help you understand:

* Which crawlers are accessing your content
* How often they are being charged
* Request patterns and trends
* Robots.txt violations

For detailed information about available metrics, refer to [View AI Crawl Control metrics](https://developers.cloudflare.com/ai-crawl-control/features/analyze-ai-traffic/#view-the-metrics-tab).

Balance visibility

Your accrued earnings balance is not currently visible in the dashboard. You can request balance updates from your Cloudflare team.

## Additional considerations

### Robots.txt management

Consider updating your `robots.txt` file to clearly indicate which pages should remain off-limits, even if AI crawlers are willing to pay for access.

### Ongoing optimization

Do the following to ensure you are using pay per crawl most effectively:

* Review crawler activity regularly to identify patterns
* Adjust pricing based on demand and content value
* Modify crawler actions (charge, allow, block) as needed
* Monitor for any unusual or unwanted crawler behavior

## Additional resources

* [Pay Per Crawl FAQs](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/faq)
* [Analyze AI traffic](https://developers.cloudflare.com/ai-crawl-control/features/analyze-ai-traffic/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/monitor-activity/#page","headline":"Monitor activity · Cloudflare AI Crawl Control docs","description":"Track Pay Per Crawl revenue and crawler activity.","url":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/monitor-activity/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
