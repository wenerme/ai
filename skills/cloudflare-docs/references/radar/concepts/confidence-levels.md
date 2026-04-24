---
title: Confidence levels
description: Interpret Cloudflare Radar confidence levels to assess data quality and reliability for a given location or time range.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/radar/concepts/confidence-levels.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Confidence levels

The `result.meta.confidenceInfo.level` in the response provides an indication of how much confidence Cloudflare has in the data. Confidence levels can be affected either by internal issues affecting data quality or by not having a lot of data for a given location (like Antarctica) or Autonomous System (AS).

| Level | Description                                                                                                                                                                         |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | There is not enough data in this time range and/or for this location or Autonomous System. Data also exhibits an erratic pattern, possibly due to the reasons previously mentioned. |
| **2** | There is not enough data in this timerange and/or in this location or Autonomous System.                                                                                            |
| **3** | Data exhibits an erratic pattern but is not affected by known data issues (like pipeline issues).                                                                                   |
| **4** | Unassigned.                                                                                                                                                                         |
| **5** | No known data quality issues.                                                                                                                                                       |

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/radar/","name":"Radar"}},{"@type":"ListItem","position":3,"item":{"@id":"/radar/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/radar/concepts/confidence-levels/","name":"Confidence levels"}}]}
```
