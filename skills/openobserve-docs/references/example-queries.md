---
description: >-
  Explore sample queries for OpenObserve logs, including full-text search,
  filtering by code, SQL examples, and charting with P95/P99 percentiles.
---
# OpenObserve Query Examples

We will use the k8s [sample logs data](https://zinc-public-data.s3.us-west-2.amazonaws.com/zinc-enl/sample-k8s-logs/k8slog_json.json.zip) to demonstrate the sample queries that you can use.

To ingest this sample data refer to this [guide.](../getting-started#load-sample-data)

## Text Search Queries

**Search all fields containing the word "error" using full-text index:**

```sql
match_all('error')
```

[Full text Search]

- `match_all` searches only the fields configured for full-text search. By default, these include: `log`, `message`, `msg`, `content`, `data`, and `json`.
- If you want more fields to be scanned, configure them under stream settings.

**Search for "error" in just the `log` field (more efficient):**
```sql
str_match(log, 'error')
```
    [String Match]

## Numeric Field Filters

**Find logs where `code` is exactly 200:**
```sql
code = 200
```
    [Exact Numeric Match]

**Find logs where `code` is missing (`null`):**
```sql
code is null
```
    [Null Numeric Match]

**Find logs where `code` has any value:**
```sql
code is not null
```
    [Not-Null Numeric Match]

**Avoid using `code = ''` or `code != ''`** — these do not work properly for numeric fields.

[Inappropriate Numeric Match]

**Logs where `code` is greater than 399:**
```sql
code > 399
```
    [Greater than Numeric Match]

**Logs where `code` is greater than or equal to 400:**
```sql
code >= 400
```
    [Greater than Equal to Numeric Match]

**`code => 400` is invalid syntax.** Always use SQL-compatible operators like **>=**.

[Invalid Syntax]

## Filtering using WHERE Clause

**Filter by service and status code:**
```sql
SELECT * FROM your_stream_name 
WHERE service_name = 'api-gateway' 
  AND code >= 500
```
    [Filtering Queries]

**Exclude health check logs:**
```sql
SELECT * FROM your_stream_name 
WHERE NOT str_match(log, 'health-check')
```
    [Filtering Queries]

## Grouping and Counting

**Group Logs over time**

```sql
SELECT histogram(_timestamp) as ts, count(*) as total_logs
FROM your_stream_name
GROUP BY ts
```
    [Group Logs]

**Find top 10 IP addresses by request volume:**
```sql
SELECT 
  client_ip,
  count(*) AS request_count
FROM your_stream_name
GROUP BY client_ip
ORDER BY request_count DESC
LIMIT 10
```
    [Top 10 by request volume]

## Aggregations & Complex Queries

**Histogram of log timestamps with status code counts:**
```sql
SELECT 
  histogram(_timestamp) AS ts_histogram, 
  count(CASE WHEN code = 200 THEN 1 END) AS code_200_count,
  count(CASE WHEN code = 401 THEN 1 END) AS code_401_count,
  count(CASE WHEN code = 500 THEN 1 END) AS code_500_count
FROM your_stream_name
GROUP BY ts_histogram
```

Replace `your_stream_name` with the actual stream name in your OpenObserve setup.
- `histogram(_timestamp)` bins timestamps into uniform intervals (e.g. hourly). You can configure the granularity in the UI or query if needed.
    [Histogram of log timestamps]
