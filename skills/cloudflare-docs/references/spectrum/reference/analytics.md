---
title: Analytics
description: Metrics tracked for every Spectrum connection, including bytes and connection duration.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/spectrum/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Analytics

Cloudflare measures the following metrics for every connection.

| Metric         | Name                                | Example | Unit                 |
| -------------- | ----------------------------------- | ------- | -------------------- |
| count          | Count of total events               | 1000    | Count                |
| bytesIngress   | Sum of ingress bytes                | 1000    | Sum                  |
| bytesEgress    | Sum of egress bytes                 | 1000    | Sum                  |
| durationAvg    | Average connection duration         | 1.0     | Time in milliseconds |
| durationMedian | Median connection duration          | 1.0     | Time in milliseconds |
| duration90th   | 90th percentile connection duration | 1.0     | Time in milliseconds |
| duration99th   | 99th percentile connection duration | 1.0     | Time in milliseconds |

## Additional dimensions

You can divide your analytics further by the following dimensions.

| Dimension | Name                          | Example                                                    |
| --------- | ----------------------------- | ---------------------------------------------------------- |
| event     | Connection Event              | connect, progress, disconnect, originError, clientFiltered |
| appID     | Application ID                | 40d67c87c6cd4b889a4fd57805225e85                           |
| coloName  | Colo Name                     | SFO                                                        |
| ipVersion | IP version used by the client | 4, 6                                                       |

## Operators for filtering

Use the operators below to filter data.

| Operator | Name                     | URL Encoded |
| -------- | ------------------------ | ----------- |
| \==      | Equals                   | %3D%3D      |
| !=       | Does not equal           | !%3D        |
| \>       | Greater Than             | %3E         |
| <        | Less Than                | %3C         |
| \>=      | Greater than or equal to | %3E%3D      |
| <=       | Less than or equal to    | %3C%3D      |

Combine filters using `OR` and `AND` boolean logic:

* `AND` takes precedence over `OR` in all expressions.
* The `OR` operator is defined using a comma `,` or the `OR` keyword surrounded by whitespace.
* The `AND` operator is defined using a semicolon `;` or the `AND` keyword surrounded by whitespace.  
Note  
Note that the semicolon is a reserved character in URLs ([RFC 1738 ↗](https://www.rfc-editor.org/rfc/rfc1738)) and should be percent-encoded as `%3B`.

## Analytics request structure

```

/api/v4/zones/{zone_id}/spectrum/analytics/events/summary?metrics=METRICS&dimensions=DIMENSIONS&filters=FILTERS&since=FROM_TS&sort=SORT&until=TO_TS&limit=LIMIT

/api/v4/zones/{zone_id}/spectrum/analytics/events/bytime?metrics=METRICS&dimensions=DIMENSIONS&filters=FILTERS&since=FROM_TS&sort=SORT&until=TO_TS&limit=LIMIT


```

* METRICS is one or more metrics (such as count) to compute
* DIMENSIONS can be used to break down the data by given attributes
* FILTERS used to filter rows by one or more dimensions (see Filters section below)
* SORT is the sort order for the result set; sort fields must be included in METRICS or DIMENSIONS
* TO\_TS is that end of time interval to query, defaults to current time
* FROM\_TS is that start of time interval to query, defaults to TO\_TS - 6 hours
* STEP is used to select time series resolution when using endpoint:
* auto or omitted - selects time step most appropriate to time interval  
   * year  
   * quarter  
   * month  
   * week  
   * day  
   * hour

## Analytics query example

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Analytics Read`

Get analytics summary

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/spectrum/analytics/events/summary" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

Refer to the [Spectrum API documentation](https://developers.cloudflare.com/api/resources/spectrum/subresources/analytics/subresources/aggregates/subresources/currents/methods/get/) for more examples of API requests.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/spectrum/","name":"Spectrum"}},{"@type":"ListItem","position":3,"item":{"@id":"/spectrum/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/spectrum/reference/analytics/","name":"Analytics"}}]}
```
