---
title: "Cloudflare annotations | Grafana Enterprise Plugins documentation"
description: "Learn how to use annotations with the Cloudflare data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Cloudflare annotations

Annotations allow you to overlay event data on your graphs. The Cloudflare data source supports annotations, enabling you to display Internet outages and anomalies from Cloudflare Radar on your dashboards.

## Before you begin

Ensure you have [configured the Cloudflare data source](/docs/plugins/grafana-cloudflare-datasource/latest/configure/).

## Supported annotation queries

The Cloudflare data source supports the following query for annotations:

Expand table

| Query                              | Description                                                                        |
|------------------------------------|------------------------------------------------------------------------------------|
| **Internet outages and anomalies** | Displays Cloudflare Radar outage and anomaly events as annotations on your graphs. |

## Add an annotation query

To add a Cloudflare annotation query to your dashboard:

1. Click the dashboard settings icon (gear) in the top navigation.
2. Select **Annotations** from the left menu.
3. Click **Add annotation query**.
4. In the **Data source** field, select your Cloudflare data source.
5. Set **Action** to `radar-annotations-outages`.
6. Configure the optional filters:

Expand table

| Field        | Description                                                    |
|--------------|----------------------------------------------------------------|
| **ASN**      | (Optional) Filter by a single ASN as integer.                  |
| **Location** | (Optional) Filter by location Alpha2 code (for example, `US`). |
| **Status**   | (Optional) Filter by status: `VERIFIED` or `UNVERIFIED`.       |
| **Limit**    | (Optional) Limit the number of results. Default: `5`.          |

1. Click **Save dashboard**.

## How annotations display

The Internet outages and anomalies query returns events with start and end times. These display as:

- **Region annotations** when the event has both a start and end time
- **Point annotations** for ongoing events without an end time

Each annotation includes details about the outage, such as the affected location, ASN, and event type.

## Example: Monitor outages in a specific country

To display verified Internet outages for the United States:

1. Add an annotation query as described above.
2. Set **Action** to `radar-annotations-outages`.
3. In **Location**, enter `US`.
4. In **Status**, select `VERIFIED`.
5. Set **Limit** to `10`.

The dashboard displays annotation markers for the 10 most recent verified outages affecting the United States.

## Related documentation

- [Grafana annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/)
- [Cloudflare Radar documentation](https://developers.cloudflare.com/radar/)
