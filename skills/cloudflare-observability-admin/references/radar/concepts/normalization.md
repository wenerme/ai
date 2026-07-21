---
description: Understand how Cloudflare Radar normalizes data using percentages, min-max scaling, and other methods applied to API responses.
title: Normalization methods
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/radar/llms.txt
> Use this file to discover all available pages before exploring further.

#  Normalization methods

Last updated Apr 20, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/radar/concepts/normalization/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Cloudflare Radar does not normally return raw values. Instead, values are returned as percentages or normalized using min-max.

Refer to the `result.meta.normalization` property in the response to check which post-processing method was applied to the raw values, if any.

## Method

| Method                 | Description                                                                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| PERCENTAGE             | Values represent percentages.                                                                                                                                                  |
| PERCENTAGE\_CHANGE     | Values represent a [percentage change ↗](https://en.wikipedia.org/wiki/Relative%5Fchange%5Fand%5Fdifference#Percentage%5Fchange) from a baseline period.                       |
| OVERLAPPED\_PERCENTAGE | Values represent percentages that exceed 100% due to overlap.                                                                                                                  |
| MIN\_MAX               | Values have been normalized using [min-max ↗](https://en.wikipedia.org/wiki/Feature%5Fscaling#Rescaling%5F%28min-max%5Fnormalization%29).                                      |
| MIN0\_MAX              | Values have been normalized using min-max, but setting the minimum value to 0. Equivalent to a proportion of the maximum value in the entire response, scaled between 0 and 1. |
| RAW\_VALUES            | Values are raw and have not been changed.                                                                                                                                      |

If you want to compare values across locations/time ranges/etc., in endpoints that normalize values using min-max, you must do so in the same request. This is done by asking for multiple series. All values will then be normalized using the same minimum and maximum value and can safely be compared against each other. Refer to [Make comparisons](https://developers.cloudflare.com/radar/get-started/making-comparisons/) for more information.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/radar/concepts/normalization/#page","headline":"Normalization methods · Cloudflare Radar docs","description":"Understand how Cloudflare Radar normalizes data using percentages, min-max scaling, and other methods applied to API responses.","url":"https://developers.cloudflare.com/radar/concepts/normalization/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
