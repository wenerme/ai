---
description: Create an API token and query the Cloudflare Radar API for Internet traffic data using cURL or Python.
title: Make your first API request
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/radar/llms.txt
> Use this file to discover all available pages before exploring further.

# Make your first API request

Last updated Apr 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/radar/get-started/first-request/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To make your first request to Cloudflare's Radar API, you must obtain your [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) first. Create a Custom Token, with _Account_ \> _Radar_ in the **Permissions** group, and select _Read_ as the access level.

Once you have the token, you are ready to make your first request to Radar's API at `https://api.cloudflare.com/client/v4/radar/`.

## Example using cURL

In the following example, we will access the global percentage distribution of device types (like mobile and desktop traffic) for the last seven days. For more information, refer to [Get device types summary](https://developers.cloudflare.com/api/resources/radar/subresources/http/subresources/summary/methods/device%5Ftype/) endpoint:

```bash
curl "https://api.cloudflare.com/client/v4/radar/http/summary/device_type?dateRange=7d&format=json" \
--header "Authorization: Bearer <API_TOKEN>"
```

A successful response will look similar to the following:

```json
{
	"success": true,
	"errors": [],
	"result": {
		"summary_0": {
			"desktop": "58.223483",
			"mobile": "41.725833",
			"other": "0.050684"
		},
		"meta": {
			"dateRange": {
				"startTime": "2022-10-26T14:00:00Z",
				"endTime": "2022-11-02T14:00:00Z"
			},
			"normalization": "PERCENTAGE",
			...
		}
	}
}
```

This response means that 41% of the requests are classified as coming from mobile devices, while 58% are desktop traffic.

Note

Cloudflare Radar attempts to provide trends and insights into general Internet usage, using the traffic that goes through Cloudflare infrastructure. As such, Cloudflare Radar only provides data on traffic coming from end-users, unless otherwise specified (for example, origin fetches are excluded).

The previous example returns all traffic from bots and humans. However, you can access just the traffic classified as coming from humans (the default in [Cloudflare Radar ↗](https://radar.cloudflare.com)) by adding `botClass=LIKELY_HUMAN`. You can also access traffic coming only from bots with `botClass=LIKELY_AUTOMATED` (refer to [bot classes](https://developers.cloudflare.com/radar/concepts/bot-classes) for more information). For example:

```bash
curl "https://api.cloudflare.com/client/v4/radar/http/summary/device_type?dateRange=7d&botClass=LIKELY_AUTOMATED&format=json" \
--header "Authorization: Bearer <API_TOKEN>"
```

Running the above, can you find any differences between both in the distribution of mobile versus desktop traffic?

The <code>result.meta</code> property

The `result.meta` property in the response includes metadata about the current request. In the example above, `meta.dateRange` returns the date range specified in the query, while `meta.normalization` returns the type of normalization applied to the data (refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization) for more information).

When querying for time series, `result.meta` will also include the returned [aggregation interval](https://developers.cloudflare.com/radar/concepts/aggregation-intervals) in `meta.aggInterval`.

When present, `meta.confidenceInfo.level` will also provide an indication of how much confidence Cloudflare has in the data. Confidence levels are affected either by internal issues affecting data quality or by Cloudflare not having sufficient data for a given location or Autonomous System (AS). In these cases, confidence level will be below `5` (refer to [Confidence levels](https://developers.cloudflare.com/radar/concepts/confidence-levels) for more information).

## Use Python

[Python ↗](https://www.python.org/) has become one of the standard languages in data analysis. Here is a quick example on how to chart the same data using [Requests ↗](https://pypi.org/project/requests/) and [Pandas ↗](https://pandas.pydata.org/) libraries. Here, we are using `format=csv` in the parameters to make it easier for Pandas to import.

```python
import io
import requests
import pandas as pd

cf_api_url = "https://api.cloudflare.com/client/v4"
params = "dateRange=7d&format=csv"
my_token = "xxx" # TODO replace
r = requests.get(f"{cf_api_url}/radar/http/summary/device_type?{params}",
                 headers={"Authorization": f"Bearer {my_token}"})
df = pd.read_csv(io.StringIO(r.text))
df.plot(kind="bar", stacked=True)
```

### Notebooks

A [notebook ↗](https://jupyter.org/) is a web-based interactive computing application, where text, code, and code outputs, like charts, can be combined into a single document. Refer to Radar's companion [colaboratory notebook ↗](https://colab.research.google.com/github/cloudflare/radar-notebooks/blob/main/notebooks/example.ipynb) for more examples on how the API can be used in your own projects.

## Next steps

Refer to [Make comparisons](https://developers.cloudflare.com/radar/get-started/making-comparisons/) to learn how to compare data.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/radar/get-started/first-request/#page","headline":"Make your first Radar API request · Cloudflare Radar docs","description":"Create an API token and query the Cloudflare Radar API for Internet traffic data using cURL or Python.","url":"https://developers.cloudflare.com/radar/get-started/first-request/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
