---
title: Share a Radar chart
description: Download Cloudflare Radar charts as PNG images or embed interactive charts in your website.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/radar/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Share a Radar chart

Radar allows you to download an image of a chart, as well as embed interactive cards of most charts into your own web pages.

Charts supporting this feature will have a share icon next to its description.

## Download a chart in PNG format

1. Select the Share icon next to the description of the chart you wish to share.
2. Select `Download Image.`
3. A .png file containing the requested chart will be downloaded.

## Embed an interactive chart in your website

1. Select the Share icon next to the description of the chart you wish to share.
2. Select between Fixed Time and Real Time.  
   * Real Time uses a “sliding window” based on the selected date range, and will display data points looking back over that duration from the current date/time.  
   * Fixed Time will always display a chart with only the currently visible data points.
3. Select Copy Code and paste the code into your web page.

**Note**: Your current selections, such as date range, location, autonomous system (ASN), and visible series, will be reflected in the shared chart.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/radar/","name":"Radar"}},{"@type":"ListItem","position":3,"item":{"@id":"/radar/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/radar/get-started/embed/","name":"Share a Radar chart"}}]}
```
