---
title: Example SQL queries
description: SQL queries for traffic, security, and performance analysis.
image: https://developers.cloudflare.com/core-services-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/log-explorer/example-queries.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Example SQL queries

The following examples show practical SQL queries you can use with the `http_requests` dataset in Log Explorer. For the full list of supported SQL syntax, refer to [SQL queries supported](https://developers.cloudflare.com/log-explorer/sql-queries/).

Adjust the date ranges in each example to match the time period you want to query.

## Summarize CDN usage

Get a high-level summary of total requests and data transfer for a specific time period. Results include total bytes transferred and conversions to megabytes and gigabytes.

```

SELECT

  COUNT(*) AS total_requests,

  SUM(EdgeResponseBytes) AS total_data_transfer,

  SUM(EdgeResponseBytes) / (1024.0 * 1024.0 * 1024.0) AS total_data_transfer_gb,

  SUM(EdgeResponseBytes) / (1024.0 * 1024.0) AS total_data_transfer_mb

FROM

  http_requests

WHERE {{ timeFilter }}


```

## Review distribution of security actions

Understand how security actions, such as blocks and challenges, are distributed across your traffic and identify the most common security responses applied to requests.

```

SELECT

  SecurityAction,

  COUNT(*) AS ActionCount

FROM http_requests

WHERE SecurityAction != 'unknown'

  AND SecurityAction IS NOT NULL

GROUP BY SecurityAction

ORDER BY ActionCount DESC


```

## Find IPs that triggered challenges

Identify the top client IP addresses and request URIs that triggered managed, JavaScript, or interactive challenges to investigate potential bot activity or targeted attacks.

```

SELECT

  ClientIP,

  ClientRequestURI,

  SecurityActions,

  COUNT(*) AS Count

FROM http_requests

WHERE {{ timeFilter }}

  AND (

    ARRAY_CONTAINS(SecurityActions, 'challenge')

    OR ARRAY_CONTAINS(SecurityActions, 'managedChallenge')

    OR ARRAY_CONTAINS(SecurityActions, 'jsChallenge')

    OR ARRAY_CONTAINS(SecurityActions, 'challengeSolved')

  )

GROUP BY

  ClientIP,

  ClientRequestURI,

  SecurityActions

ORDER BY Count DESC

LIMIT 20


```

Explain Code

## Find highest bandwidth consumers by URI

Identify which request URIs consume the most bandwidth to pinpoint large assets or endpoints that drive the most data transfer.

```

SELECT

  ClientRequestURI,

  SUM(EdgeResponseBytes) / (1024 * 1024) AS MegabytesTransferred

FROM http_requests

WHERE  {{ timeFilter }}

GROUP BY ClientRequestURI

ORDER BY MegabytesTransferred DESC

LIMIT 10


```

## Analyze client round-trip time by country

Analyze client TCP round-trip time (RTT) across different countries to identify regions with high latency that might benefit from additional optimization.

```

SELECT

  ClientCountry,

  COUNT(*) AS requests,

  AVG(ClientTCPRttMs) AS avg_rtt,

  MIN(ClientTCPRttMs) AS min_rtt,

  MAX(ClientTCPRttMs) AS max_rtt

FROM http_requests

WHERE {{ timeFilter }}

GROUP BY ClientCountry

ORDER BY avg_rtt DESC

LIMIT 20


```

Explain Code

## Summarize CDN traffic by cache status

Break down traffic by cache status and measure the average time to first byte (TTFB) for each status to evaluate cache effectiveness and identify opportunities to improve cache hit ratios.

```

SELECT

  CacheCacheStatus,

  COUNT(*) AS requests,

  SUM(EdgeResponseBytes) AS total_bytes,

  AVG(EdgeTimeToFirstByteMs) AS avg_ttfb

FROM http_requests

WHERE {{ timeFilter }}

GROUP BY CacheCacheStatus

ORDER BY requests DESC


```

## Find slowest paths by time to first byte

Find request paths with the highest average time to first byte (TTFB), along with request counts and server error counts toidentify slow endpoints that may need optimization.

```

SELECT

  ClientRequestPath,

  AVG(EdgeTimeToFirstByteMs) AS avg_ttfb,

  COUNT(*) AS requests,

  SUM(CASE WHEN EdgeResponseStatus >= 500 THEN 1 ELSE 0 END) AS errors

FROM http_requests

WHERE {{ timeFilter }}

GROUP BY ClientRequestPath

ORDER BY avg_ttfb DESC

LIMIT 10


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/log-explorer/","name":"Log Explorer"}},{"@type":"ListItem","position":3,"item":{"@id":"/log-explorer/example-queries/","name":"Example SQL queries"}}]}
```
