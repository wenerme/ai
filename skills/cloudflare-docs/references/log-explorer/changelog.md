---
title: Changelog
description: Cloudflare Log Explorer now allows you to customize exactly which data fields are ingested and stored when enabling or managing log datasets.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/log-explorer/changelog.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/log-explorer.xml) 

## 2026-03-11

  
**Ingest field selection for Log Explorer**   

Cloudflare Log Explorer now allows you to customize exactly which data fields are ingested and stored when enabling or managing log datasets.

Previously, ingesting logs often meant taking an "all or nothing" approach to data fields. With **Ingest Field Selection**, you can now choose from a list of available and recommended fields for each dataset. This allows you to reduce noise, focus on the metrics that matter most to your security and performance analysis, and manage your data footprint more effectively.

#### Key capabilities

* **Granular control:** Select only the specific fields you need when enabling a new dataset.
* **Dynamic updates:** Update fields for existing, already enabled logstreams at any time.
* **Historical consistency:** Even if you disable a field later, you can still query and receive results for that field for the period it was captured.
* **Data integrity:** Core fields, such as `Timestamp`, are automatically retained to ensure your logs remain searchable and chronologically accurate.

#### Example configuration

When configuring a dataset via the dashboard or API, you can define a specific set of fields. The `Timestamp` field remains mandatory to ensure data indexability.

```

{

  "dataset": "firewall_events",

  "enabled": true,

  "fields": [

    "Timestamp",

    "ClientRequestHost",

    "ClientIP",

    "Action",

    "EdgeResponseStatus",

    "OriginResponseStatus"

  ]

}


```

Explain Code

For more information, refer to the [Log Explorer documentation](https://developers.cloudflare.com/log-explorer/).

## 2026-02-09

  
**Tabs and pivots**   

Log Explorer now supports multiple concurrent queries with the new Tabs feature. Work with multiple queries simultaneously and pivot between datasets to investigate malicious activity more effectively.

#### Key capabilities

* **Multiple tabs:** Open and switch between multiple query tabs to compare results across different datasets.
* **Quick filtering:** Select the filter button from query results to add a value as a filter to your current query.
* **Pivot to new tab:** Use Cmd + click on the filter button to start a new query tab with that filter applied.
* **Preserved progress:** Your query progress is preserved on each tab if you navigate away and return.

For more information, refer to the [Log Explorer documentation](https://developers.cloudflare.com/log-explorer/).

## 2025-11-13

  
**Fixed custom SQL date picker inconsistencies**   

We've resolved a bug in Log Explorer that caused inconsistencies between the custom SQL date field filters and the date picker dropdown. Previously, users attempting to filter logs based on a custom date field via a SQL query sometimes encountered unexpected results or mismatching dates when using the interactive date picker.

This fix ensures that the custom SQL date field filters now align correctly with the selection made in the date picker dropdown, providing a reliable and predictable filtering experience for your log data. This is particularly important for users creating custom log views based on time-sensitive fields.

## 2025-11-13

  
**Log Explorer adds 14 new datasets**   

We've significantly enhanced Log Explorer by adding support for 14 additional Cloudflare product datasets.

This expansion enables Operations and Security Engineers to gain deeper visibility and telemetry across a wider range of Cloudflare services. By integrating these new datasets, users can now access full context to efficiently investigate security incidents, troubleshoot application performance issues, and correlate logged events across different layers (like application and network) within a single interface. This capability is crucial for a complete and cohesive understanding of event flows across your Cloudflare environment.

The newly supported datasets include:

#### Zone Level

* `Dns_logs`
* `Nel_reports`
* `Page_shield_events`
* `Spectrum_events`
* `Zaraz_events`

#### Account Level

* `Audit Logs`
* `Audit_logs_v2`
* `Biso_user_actions`
* `DNS firewall logs`
* `Email_security_alerts`
* `Magic Firewall IDS`
* `Network Analytics`
* `Sinkhole HTTP`
* `ipsec_logs`

Note

`Auditlog` and `Auditlog_v2` datasets require `audit-log.read` permission for querying.

The `biso_user_actions` dataset requires either the `Super Admin` or `ZT PII` role for querying.

#### Example: Correlating logs

You can now use Log Explorer to query and filter with each of these datasets. For example, you can identify an IP address exhibiting suspicious behavior in the `FW_event` logs, and then instantly pivot to the `Network Analytics` logs or `Access` logs to see its network-level traffic profile or if it bypassed a corporate policy.

To learn more and get started, refer to the [Log Explorer documentation](https://developers.cloudflare.com/log-explorer/) and the [Cloudflare Logs documentation](https://developers.cloudflare.com/logs/).

## 2025-11-11

  
**Resize your custom SQL window in Log Explorer**   

We're excited to announce a quality-of-life improvement for Log Explorer users. You can now resize the custom SQL query window to accommodate longer and more complex queries.

Previously, if you were writing a long custom SQL query, the fixed-size window required excessive scrolling to view the full query. This update allows you to easily drag the bottom edge of the query window to make it taller. This means you can view your entire custom query at once, improving the efficiency and experience of writing and debugging complex queries.

To learn more and get started, refer to the [Log Explorer documentation](https://developers.cloudflare.com/log-explorer/).

## 2025-11-04

  
**Log Explorer now supports query cancellation**   

We're excited to announce that Log Explorer users can now cancel queries that are currently running.

This new feature addresses a common pain point: waiting for a long, unintended, or misconfigured query to complete before you can submit a new, correct one. With query cancellation, you can immediately stop the execution of any undesirable query, allowing you to quickly craft and submit a new query, significantly improving your investigative workflow and productivity within Log Explorer.

## 2025-11-04

  
**Log Explorer now shows query result distribution**   

We're excited to announce a new feature in Log Explorer that significantly enhances how you analyze query results: the Query results distribution chart.

This new chart provides a graphical distribution of your results over the time window of the query. Immediately after running a query, you will see the distribution chart above your result table. This visualization allows Log Explorer users to quickly spot trends, identify anomalies, and understand the temporal concentration of log events that match their criteria. For example, you can visually confirm if a spike in traffic or errors occurred at a specific time, allowing you to focus your investigation efforts more effectively. This feature makes it faster and easier to extract meaningful insights from your vast log data.

The chart will dynamically update to reflect the logs matching your current query.

## 2025-09-11

  
**Contextual pivots**   

Directly from [Log Search](https://developers.cloudflare.com/log-explorer/log-search/) results, customers can pivot to other parts of the Cloudflare dashboard to immediately take action as a result of their investigation.

From the `http_requests` or `fw_events` dataset results, right click on an IP Address or JA3 Fingerprint to pivot to the Investigate portal to lookup the reputation of an IP address or JA3 fingerprint.

![Investigate IP address](https://developers.cloudflare.com/_astro/investigate-ip-address.BMVSMzDi_Z1KASOQ.webp) 

Easily learn about error codes by linking directly to our documentation from the **EdgeResponseStatus** or **OriginResponseStatus** fields.

![View documentation](https://developers.cloudflare.com/_astro/view-documentation.Cem5QgeO_Z1vzjwR.webp) 

From the `gateway_http` dataset, click on a **policyid** to link directly to the Zero Trust dashboard to review or make changes to a specific Gateway policy.

![View policy](https://developers.cloudflare.com/_astro/policyid.CVjEdahj_1GFFHp.webp) 

## 2025-09-11

  
**New results table view**   

The results table view of **Log Search** has been updated with additional functionality and a more streamlined user experience. Users can now easily:

* Remove/add columns.
* Resize columns.
* Sort columns.
* Copy values from any field.
![New results table view](https://developers.cloudflare.com/_astro/new-table.C2Q8mWJ9_ZFs2Aq.webp) 

## 2025-09-03

  
**Logging headers and cookies using custom fields**   

[Log Explorer](https://developers.cloudflare.com/log-explorer/) now supports logging and filtering on header or cookie fields in the [http\_requests dataset](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/).

Create a custom field to log desired header or cookie values into the `http_requests` dataset and Log Explorer will import these as searchable fields. Once configured, use the custom SQL editor in Log Explorer to view or filter on these requests.

![Edit Custom fields](https://developers.cloudflare.com/_astro/edit-custom-fields.Cy4qXSpL_1ma19s.webp) 

For more details, refer to [Headers and cookies](https://developers.cloudflare.com/log-explorer/log-search/#headers-and-cookies).

## 2025-08-15

  
**Extended retention**   

Customers can now rely on Log Explorer to meet their log retention compliance requirements.

Contract customers can choose to store their logs in Log Explorer for up to two years, at an additional cost of $0.10 per GB per month. Customers interested in this feature can contact their account team to have it added to their contract.

## 2025-07-09

  
**Usage tracking**   

[Log Explorer](https://developers.cloudflare.com/log-explorer/) customers can now monitor their data ingestion volume to keep track of their billing. Monthly usage is displayed at the top of the [Log Search](https://developers.cloudflare.com/log-explorer/log-search/) and [Manage Datasets](https://developers.cloudflare.com/log-explorer/manage-datasets/) screens in Log Explorer.

![Ingested data](https://developers.cloudflare.com/_astro/ingested-data.D2flqRIu_Z2v4FHF.webp) 

## 2025-06-18

  
**Log Explorer is GA**   

[Log Explorer](https://developers.cloudflare.com/log-explorer/) is now GA, providing native observability and forensics for traffic flowing through Cloudflare.

Search and analyze your logs, natively in the Cloudflare dashboard. These logs are also stored in Cloudflare's network, eliminating many of the costs associated with other log providers.

![Log Explorer dashboard](https://developers.cloudflare.com/_astro/log-explorer-dash.CJSVLZ7Y_ZXS1TD.webp) 

With Log Explorer, you can now:

* **Monitor security and performance issues with custom dashboards** – use natural language to define charts for measuring response time, error rates, top statistics and more.
* **Investigate and troubleshoot issues with Log Search** – use data type-aware search filters or custom sql to investigate detailed logs.
* **Save time and collaborate with saved queries** – save Log Search queries for repeated use or sharing with other users in your account.
* **Access Log Explorer at the account and zone level** – easily find Log Explorer at the account and zone level for querying any dataset.

For help getting started, refer to [our documentation](https://developers.cloudflare.com/log-explorer/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/log-explorer/","name":"Log Explorer"}},{"@type":"ListItem","position":3,"item":{"@id":"/log-explorer/changelog/","name":"Changelog"}}]}
```
