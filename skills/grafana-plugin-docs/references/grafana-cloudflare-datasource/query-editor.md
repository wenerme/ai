---
title: "Cloudflare query editor | Grafana Enterprise Plugins documentation"
description: "Learn how to use the Cloudflare query editor to query DNS analytics and Radar data."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Cloudflare query editor

Grafana provides a query editor for the Cloudflare data source, which is located on the [Explore](/docs/grafana/latest/explore/) page. You can also access the Cloudflare query editor from a dashboard panel. Click the ellipsis in the upper right of the panel and select **Edit**.

## Before you begin

Ensure you have [configured the Cloudflare data source](/docs/plugins/grafana-cloudflare-datasource/latest/configure/).

## Key concepts

If you’re new to Cloudflare, here are some key terms used in this documentation:

Expand table

| Term        | Description                                                                                      |
|-------------|--------------------------------------------------------------------------------------------------|
| **Account** | A Cloudflare account that contains one or more zones.                                            |
| **Zone**    | A domain that’s added to a Cloudflare account.                                                   |
| **Radar**   | Cloudflare Radar is a hub that showcases global Internet traffic, attack, and technology trends. |

## Query types

The Cloudflare data source supports the following query types:

- **Accounts:** List accounts and view account details
- **Zones:** List zones in your Cloudflare account
- **DNS Analytics:** Query DNS analytics reports and time series data
- **Radar:** Query Cloudflare Radar data for global Internet insights
- **Load Balancer:** List load balancers and view load balancer details
- **Token:** List API tokens and view API token details

## Create a query

To create a query, select the **Action** (query type) from the drop-down. Each action represents a Cloudflare API endpoint. After selecting an action, provide the required parameters.

Some actions have mandatory parameters displayed next to the action selector. Optional parameters are available in the **Optional parameters** section.

## Account queries

Accounts are a fundamental entity in Cloudflare. For more information, refer to the [Cloudflare accounts documentation](https://developers.cloudflare.com/fundamentals/setup/accounts-and-zones/#accounts).

### List accounts

Lists all accounts you have ownership or verified access to.

Expand table

| Field      | Description |
|------------|-------------|
| **Action** | `accounts`  |

For API details, refer to [List accounts](https://developers.cloudflare.com/api/operations/accounts-list-accounts).

### Account details

Gets information about a specific account that you’re a member of.

Expand table

| Field          | Description                    |
|----------------|--------------------------------|
| **Action**     | `account`                      |
| **Account ID** | Select the Cloudflare account. |

For API details, refer to [Account details](https://developers.cloudflare.com/api/operations/accounts-account-details).

## Zone queries

Zones represent domains added to your Cloudflare account. For more information, refer to the [Cloudflare zones documentation](https://developers.cloudflare.com/fundamentals/setup/accounts-and-zones/#zones).

### List zones

Lists, searches, sorts, and filters your zones.

Expand table

| Field            | Description                                                                                           |
|------------------|-------------------------------------------------------------------------------------------------------|
| **Action**       | `zones`                                                                                               |
| **Account name** | (Optional) Filter zones by account name. Supports filter operators like `contains:`.                  |
| **Domain name**  | (Optional) Filter zones by domain name. Supports filter operators like `starts_with:`.                |
| **Status**       | (Optional) Filter by zone status: `initializing`, `pending`, `active`, or `moved`. Default: `active`. |

For API details, refer to [List zones](https://developers.cloudflare.com/api/operations/zones-get).

## DNS Analytics queries

DNS Analytics provides insights into DNS query data for your zones. For detailed information about available parameters, refer to [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/).

### DNS analytics report

Retrieves a list of summarized aggregate metrics over a given time period.

Expand table

| Field          | Description                                                                       |
|----------------|-----------------------------------------------------------------------------------|
| **Action**     | `zones-dns-analytics-report`                                                      |
| **Zone ID**    | Select the Cloudflare zone.                                                       |
| **Metrics**    | Select one or more metrics to retrieve (for example, Query Count, Response Time). |
| **Dimensions** | Select dimensions to group results by (for example, Query Type, Response Code).   |
| **Sort**       | (Visible when dimensions are selected) Sort order for the results.                |
| **Limit**      | Maximum number of results to return. Default: `100000`.                           |

> Note
>
> The plugin automatically passes the Grafana dashboard time range to the `since` and `until` API parameters.

For API details, refer to [DNS analytics report](https://developers.cloudflare.com/api/operations/dns-analytics-table).

### DNS analytics by time

Retrieves a list of aggregate metrics grouped by time interval, suitable for time series visualizations.

Expand table

| Field          | Description                                                        |
|----------------|--------------------------------------------------------------------|
| **Action**     | `zones-dns-analytics-report-bytime`                                |
| **Zone ID**    | Select the Cloudflare zone.                                        |
| **Metrics**    | Select one or more metrics to retrieve.                            |
| **Dimensions** | Select dimensions to group results by.                             |
| **Sort**       | (Visible when dimensions are selected) Sort order for the results. |

> Note
>
> The plugin automatically passes the Grafana dashboard time range to the `since` and `until` API parameters.

For API details, refer to [DNS analytics by time](https://developers.cloudflare.com/api/operations/dns-analytics-by-time).

## Radar queries

[Cloudflare Radar](https://radar.cloudflare.com/about) showcases global Internet traffic, attack, and technology trends. Radar data is powered by Cloudflare’s global network and aggregated data from the 1.1.1.1 public DNS resolver.

The following Radar data is available:

Expand table

| Query type                                | Description                                            |
|-------------------------------------------|--------------------------------------------------------|
| **Get datasets**                          | List available Radar datasets.                         |
| **Bot class summary/time series**         | Traffic distribution between bot and human traffic.    |
| **User agents time series**               | Traffic distribution by top user agents.               |
| **User agent families time series**       | Traffic distribution by browser family.                |
| **Device type summary/time series**       | Traffic distribution by device type (mobile, desktop). |
| **HTTP protocols summary/time series**    | Traffic distribution by HTTP protocol.                 |
| **HTTP versions summary/time series**     | Traffic distribution by HTTP version.                  |
| **IP versions summary/time series**       | Traffic distribution by IP version (IPv4, IPv6).       |
| **Operating systems summary/time series** | Traffic distribution by operating system.              |
| **TLS versions summary/time series**      | Traffic distribution by TLS version.                   |
| **NetFlows time series**                  | Network traffic changes over time.                     |
| **Internet outages and anomalies**        | Recent Internet outages and anomalies.                 |

> Note
>
> Most Radar queries automatically use the Grafana dashboard time range for filtering.

### Internet outages and anomalies

The Internet outages and anomalies query has additional filtering options:

Expand table

| Field        | Description                                                    |
|--------------|----------------------------------------------------------------|
| **ASN**      | (Optional) Filter by a single ASN as integer.                  |
| **Location** | (Optional) Filter by location Alpha2 code (for example, `US`). |
| **Status**   | (Optional) Filter by status: `VERIFIED` or `UNVERIFIED`.       |
| **Limit**    | (Optional) Limit the number of results. Default: `5`.          |

For more information about Radar APIs, refer to the [Cloudflare Radar documentation](https://developers.cloudflare.com/radar/).

## Load Balancer queries

Load Balancers distribute traffic among pools according to configured policies. For more information, refer to the [Cloudflare load balancers documentation](https://developers.cloudflare.com/load-balancing/load-balancers/).

### List load balancers

Lists all configured load balancers that you have ownership or verified access to.

Expand table

| Field       | Description                 |
|-------------|-----------------------------|
| **Action**  | `List load balancers`       |
| **Zone ID** | Select the Cloudflare zone. |

For API details, refer to [List Load Balancers](https://developers.cloudflare.com/api/resources/load_balancers/).

### Load Balancer details

Gets information about a specific configured load balancer that you have ownership or verified access to.

Expand table

| Field                | Description                          |
|----------------------|--------------------------------------|
| **Action**           | `Load balancer details`              |
| **Zone ID**          | Select the Cloudflare zone.          |
| **Load Balancer ID** | Select the Cloudflare load balancer. |

For API details, refer to [Load Balancer details](https://developers.cloudflare.com/api/resources/load_balancers/).

## Token queries

API Tokens have a specific set of permissions that allow access to Cloudflare resources. For more information, refer to the [Cloudflare Account API Tokens documentation](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/).

### List tokens

Lists all API tokens by account.

Expand table

| Field          | Description                    |
|----------------|--------------------------------|
| **Action**     | `List tokens`                  |
| **Account ID** | Select the Cloudflare account. |

For API details, refer to [List Tokens](https://developers.cloudflare.com/api/resources/accounts/subresources/tokens/).

### Token details

Gets information about a specific API token.

Expand table

| Field          | Description                    |
|----------------|--------------------------------|
| **Action**     | `Token details`                |
| **Account ID** | Select the Cloudflare account. |
| **Token ID**   | Select the Cloudflare token.   |

For API details, refer to [Token details](https://developers.cloudflare.com/api/resources/accounts/subresources/tokens/).

## Query examples

The following examples demonstrate common query configurations.

### Example: Monitor DNS query count over time

To visualize DNS query volume trends for a zone:

1. Select the Cloudflare data source.
2. Set **Action** to `zones-dns-analytics-report-bytime`.
3. Select your zone from the **Zone ID** drop-down.
4. In **Metrics**, select `Query Count`.
5. Leave **Dimensions** empty to see total query count, or select `Response Code` to break down by response type.

This query returns time series data suitable for a Time series or Graph panel.

### Example: Analyze DNS queries by type and response code

To create a table showing DNS query distribution:

1. Select the Cloudflare data source.
2. Set **Action** to `zones-dns-analytics-report`.
3. Select your zone from the **Zone ID** drop-down.
4. In **Metrics**, select `Query Count`.
5. In **Dimensions**, select `Query Type` and `Response Code`.
6. Set **Limit** to `100` to see the top 100 combinations.

This query returns tabular data suitable for a Table panel.

### Example: Track global traffic by operating system

To visualize how traffic is distributed across operating systems:

1. Select the Cloudflare data source.
2. Set **Action** to `radar-http-timeseries-groups-os`.

The query automatically uses the dashboard time range and returns time series data showing percentage distribution by OS (Windows, macOS, Android, iOS, etc.).

### Example: Monitor Internet outages in a region

To track Internet outages and anomalies in a specific country:

1. Select the Cloudflare data source.
2. Set **Action** to `radar-annotations-outages`.
3. In **Location**, enter the country code (for example, `US` for United States).
4. In **Status**, select `VERIFIED` to show only confirmed outages.
5. Set **Limit** to `10` to show the 10 most recent events.

This query returns a list of outage events with start and end times, suitable for a Table panel or as annotation data.

## Use cases

The following real-world scenarios demonstrate how to use the Cloudflare data source effectively.

### Monitor DNS performance and reliability

Track DNS query performance to ensure your domains are responding quickly and reliably.

**Dashboard setup:**

1. **Query volume panel** — Use `zones-dns-analytics-report-bytime` with `Query Count` metric to track request volume over time.
2. **Response time panel** — Use `zones-dns-analytics-report-bytime` with `Response Time P50` and `Response Time P99` metrics to monitor latency.
3. **Error rate panel** — Use `zones-dns-analytics-report` with `Query Count` metric and `Response Code` dimension to identify failed queries (SERVFAIL, NXDOMAIN).

**Alerting:** Set up alerts on response time percentiles or error rates to catch issues early.

### Investigate traffic anomalies

When you notice unusual traffic patterns, use these queries to investigate.

**Investigation workflow:**

1. **Identify the timeframe** — Use `zones-dns-analytics-report-bytime` to pinpoint when anomalies occurred.
2. **Break down by dimension** — Add dimensions like `Query Type`, `Response Code`, or `Query Name` to identify patterns.
3. **Compare with Radar data** — Use `radar-annotations-outages` to check if the anomaly correlates with known Internet outages.

### Track global Internet trends

Use Cloudflare Radar data to understand broader Internet patterns that may affect your users.

**Dashboard setup:**

1. **Device distribution** — Use `radar-http-summary-device-type` to see mobile vs. desktop traffic trends.
2. **Browser trends** — Use `radar-http-timeseries-groups-browser-family` to track browser adoption over time.
3. **Protocol adoption** — Use `radar-http-timeseries-groups-http-version` to monitor HTTP/2 and HTTP/3 adoption.
4. **Outage overlay** — Add `radar-annotations-outages` as an annotation to correlate traffic changes with outages.

### Security monitoring

Monitor for potential security issues using DNS analytics patterns.

**What to watch for:**

Expand table

| Pattern                                 | Query configuration                                                | Potential issue                             |
|-----------------------------------------|--------------------------------------------------------------------|---------------------------------------------|
| Spike in NXDOMAIN responses             | `zones-dns-analytics-report-bytime` with `Response Code` dimension | DNS enumeration attack or misconfiguration  |
| Unusual query types                     | `zones-dns-analytics-report` with `Query Type` dimension           | Potential DNS tunneling (TXT, NULL queries) |
| High query volume from specific sources | `zones-dns-analytics-report` with source dimensions                | DDoS or abuse                               |

**Alerting:** Create alerts for sudden increases in error responses or unusual query type distributions.
