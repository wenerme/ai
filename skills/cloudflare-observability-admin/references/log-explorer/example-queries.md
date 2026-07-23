---
description: SQL queries for traffic, security, and performance analysis.
title: Example SQL queries
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/log-explorer/llms.txt
> Use this file to discover all available pages before exploring further.

# Example SQL queries

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/log-explorer/example-queries/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following examples show practical SQL queries you can use with the `http_requests` dataset in Log Explorer. For the full list of supported SQL syntax, refer to [SQL queries supported](https://developers.cloudflare.com/log-explorer/sql-queries/).

Adjust the date ranges in each example to match the time period you want to query.

## Summarize CDN usage

Get a high-level summary of total requests and data transfer for a specific time period. Results include total bytes transferred and conversions to megabytes and gigabytes.

```sql
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

```sql
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

```sql
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

## Find highest bandwidth consumers by URI

Identify which request URIs consume the most bandwidth to pinpoint large assets or endpoints that drive the most data transfer.

```sql
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

```sql
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

## Summarize CDN traffic by cache status

Break down traffic by cache status and measure the average time to first byte (TTFB) for each status to evaluate cache effectiveness and identify opportunities to improve cache hit ratios.

```sql
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

```sql
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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/log-explorer/example-queries/#page","headline":"Example SQL queries · Cloudflare Log Explorer docs","description":"SQL queries for traffic, security, and performance analysis.","url":"https://developers.cloudflare.com/log-explorer/example-queries/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
