---
title: Aggregation intervals
description: Configure Cloudflare Radar aggregation intervals to control the frequency of returned data, from 15 minutes to one week.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/radar/concepts/aggregation-intervals.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Aggregation intervals

Aggregation intervals allow you to return data in a specified interval (or frequency). If no interval is defined, data will be returned in the default aggregation interval (or frequency). As a general principle, the longer the date range, the bigger the aggregation interval.

For example, when requesting one day of data, the default aggregation interval is 15 minutes. When requesting more than one month of data, the default is one day.

## Method

| Aggregation Interval | Description           |
| -------------------- | --------------------- |
| 15m                  | 15 minutes frequency. |
| 1h                   | One hour frequency.   |
| 1d                   | One day frequency.    |
| 1w                   | One week frequency.   |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/radar/","name":"Radar"}},{"@type":"ListItem","position":3,"item":{"@id":"/radar/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/radar/concepts/aggregation-intervals/","name":"Aggregation intervals"}}]}
```
