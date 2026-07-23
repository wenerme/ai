---
description: Interpret Cloudflare Radar confidence levels to assess data quality and reliability for a given location or time range.
title: Confidence levels
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/radar/llms.txt
> Use this file to discover all available pages before exploring further.

# Confidence levels

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/radar/concepts/confidence-levels/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The `result.meta.confidenceInfo.level` in the response provides an indication of how much confidence Cloudflare has in the data. Confidence levels can be affected either by internal issues affecting data quality or by not having a lot of data for a given location (like Antarctica) or Autonomous System (AS).

| Level | Description                                                                                                                                                                         |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | There is not enough data in this time range and/or for this location or Autonomous System. Data also exhibits an erratic pattern, possibly due to the reasons previously mentioned. |
| **2** | There is not enough data in this timerange and/or in this location or Autonomous System.                                                                                            |
| **3** | Data exhibits an erratic pattern but is not affected by known data issues (like pipeline issues).                                                                                   |
| **4** | Unassigned.                                                                                                                                                                         |
| **5** | No known data quality issues.                                                                                                                                                       |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/radar/concepts/confidence-levels/#page","headline":"Confidence levels · Cloudflare Radar docs","description":"Interpret Cloudflare Radar confidence levels to assess data quality and reliability for a given location or time range.","url":"https://developers.cloudflare.com/radar/concepts/confidence-levels/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
