---
description: Configure Cloudflare Radar aggregation intervals to control the frequency of returned data, from 15 minutes to one week.
title: Aggregation intervals
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/radar/llms.txt
> Use this file to discover all available pages before exploring further.

# Aggregation intervals

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/radar/concepts/aggregation-intervals/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Aggregation intervals allow you to return data in a specified interval (or frequency). If no interval is defined, data will be returned in the default aggregation interval (or frequency). As a general principle, the longer the date range, the bigger the aggregation interval.

For example, when requesting one day of data, the default aggregation interval is 15 minutes. When requesting more than one month of data, the default is one day.

## Method

| Aggregation Interval | Description           |
| -------------------- | --------------------- |
| 15m                  | 15 minutes frequency. |
| 1h                   | One hour frequency.   |
| 1d                   | One day frequency.    |
| 1w                   | One week frequency.   |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/radar/concepts/aggregation-intervals/#page","headline":"Aggregation intervals · Cloudflare Radar docs","description":"Configure Cloudflare Radar aggregation intervals to control the frequency of returned data, from 15 minutes to one week.","url":"https://developers.cloudflare.com/radar/concepts/aggregation-intervals/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
