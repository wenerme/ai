---
description: Change the time range in Network Analytics.
title: Adjust the time range
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Adjust the time range

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/network-analytics/configure/time-range/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Using the timeframe drop-down list

Use the timeframe drop-down list to change the time range over which Network Analytics displays data. When you select a timeframe, the entire view is updated to reflect your choice.

In the Network Analytics dashboard, the range of historical data you can query is 112 days.

When you select _Previous 30 minutes_, the **Network Analytics** card will show the data from the last 30 minutes, refreshing every 20 seconds. A _Live_ notification appears next to the statistic drop-down list to let you know that the view keeps updating automatically:

![Timeframe drop-down with Previous 30 minutes selected.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=279,height=65,format=webp/_astro/timeframe-selector.CKN2F0gt.png)

## Zooming in the chart

To zoom in a specific period, select and drag to define a region in the **Packets summary** (or **Bits summary**) chart. To zoom out, select **X** in the time range selector.

![User zooming in a given period in the Network Analytics traffic chart.](https://developers.cloudflare.com/images/analytics/network-analytics/chart-zoom-in.gif)

The effective resolution goes up when you zoom in and goes down when you zoom out, due to the [Adaptive Bit Rate](https://developers.cloudflare.com/analytics/network-analytics/understand/concepts/#adaptive-bit-rate-sampling). This means that a big packet burst that lasted a few seconds may look less impactful when analyzing a chart displaying data for 24 hours or more.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/network-analytics/configure/time-range/#page","headline":"Adjust the time range in Network Analytics · Cloudflare Analytics docs","description":"Change the time range in Network Analytics.","url":"https://developers.cloudflare.com/analytics/network-analytics/configure/time-range/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
