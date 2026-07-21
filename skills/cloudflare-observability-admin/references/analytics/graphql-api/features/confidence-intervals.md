---
description: Request confidence intervals for sampled data.
title: Confidence Intervals
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

#  Confidence Intervals

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/analytics/graphql-api/features/confidence-intervals/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Confidence intervals help assess accuracy and quantify uncertainty in results from sampled datasets. When querying sum or count fields on adaptive datasets, you can request a confidence interval to understand the possible range around an estimate. For example, specifying a confidence level of `0.95` returns the estimate, along with the range of values that likely contains the true value 95% of the time.

## Availability

* **Supported datasets**: Adaptive (sampled) datasets only.
* **Supported fields**: All `sum` and `count` fields.
* **Usage**: Confidence `level` must be provided as a decimal between 0 and 1 (for example,`0.90`, `0.95`, `0.99`).
* **Default**: If no confidence level is specified, intervals are not returned.

## Usage example

The following example shows how to query a confidence interval and interpret the response.

### Request

To request a confidence interval, use the `confidence(level: X)` argument in your query.

```graphql
query SingleDatasetWithConfidence($zoneTag: string, $start: Time, $end: Time) {
  viewer {
    zones(filter: {zoneTag: $zoneTag}) {
      firewallEventsAdaptiveGroups(
        filter: {datetime_gt: $start, datetime_lt: $end}
        limit: 1000
      ) {
        count
        avg {
          sampleInterval
        }
        confidence(level: 0.95) {
          count {
            estimate
            lower
            upper
            sampleSize
          }
        }
      }
    }
  }
}
```

### Response

The response includes the following values:

* `estimate`: The estimated value, based on sampled data.
* `lower`: The lower bound of the confidence interval.
* `sampleSize`: The number of sampled data points used to calculate the estimate.
* `upper`: The upper bound of the confidence interval.

In this example, the interpretation of the response is that, based on a sample of 40,054, the estimated number of events is 42,939, with 95% confidence that the true value lies between 42,673 and 43,204.

```json
{
  "data": {
    "viewer": {
      "zones": [
        {
          "firewallEventsAdaptiveGroups": [
            {
              "avg": {
                "sampleInterval": 1.0720277625205972
              },
              "confidence": {
                "count": {
                  "estimate": 42939,
                  "lower": 42673.44115335711,
                  "sampleSize": 40054,
                  "upper": 43204.55884664289
                }
              },
              "count": 42939
            }
          ]
        }
      ]
    }
  },
  "errors": null
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/features/confidence-intervals/#page","headline":"Confidence Intervals · Cloudflare Analytics docs","description":"Request confidence intervals for sampled data.","url":"https://developers.cloudflare.com/analytics/graphql-api/features/confidence-intervals/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
