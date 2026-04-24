---
title: Normalization methods
description: Understand how Cloudflare Radar normalizes data using percentages, min-max scaling, and other methods applied to API responses.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/radar/concepts/normalization.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Normalization methods

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/radar/","name":"Radar"}},{"@type":"ListItem","position":3,"item":{"@id":"/radar/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/radar/concepts/normalization/","name":"Normalization methods"}}]}
```
