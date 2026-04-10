---
title: Log Explorer
description: Log Explorer is Cloudflare's native observability and forensics product that enables security teams and developers to analyze, investigate, and monitor issues directly from the Cloudflare dashboard, without the expense and complexity of forwarding logs to third-party tools.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/log-explorer/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Log Explorer

Store and explore your Cloudflare logs directly within the Cloudflare dashboard or API.

Log Explorer is Cloudflare's native observability and forensics product that enables security teams and developers to analyze, investigate, and monitor issues directly from the Cloudflare dashboard, without the expense and complexity of forwarding logs to third-party tools.

Log Explorer provides access to Cloudflare logs with all the context available within the Cloudflare platform. You can monitor security and performance issues with custom dashboards or investigate and troubleshoot issues with log search. Benefits include:

* **Reduced cost and complexity**: Drastically reduce the expense and operational overhead associated with forwarding, storing, and analyzing terabytes of log data in external tools.
* **Faster detection and triage**: Access Cloudflare-native logs directly, eliminating cumbersome data pipelines and the ingest lags that delay critical security insights.
* **Accelerated investigations with full context**: Investigate incidents with Cloudflare's unparalleled contextual data, accelerating your analysis and understanding of "What exactly happened?" and "How did it happen?"
* **Minimal recovery time**: Seamlessly transition from investigation to action with direct mitigation capabilities via the Cloudflare platform.

Contract customers can choose to store their logs in Log Explorer for up to two years, at an additional cost of $0.10 per GB per month. Customers interested in this feature can contact their account team to have it added to their contract.

## Permissions

Access to Log Explorer features is controlled through specific permissions. Each permission grants users the ability to perform certain actions, such as querying logs, managing datasets, or creating dashboards.

| Feature                     | Required Permission | Description                             |
| --------------------------- | ------------------- | --------------------------------------- |
| **Manage datasets**         | Logs Edit           | Add, enable, or disable datasets.       |
| **Log Search**              | Logs Read           | Query logs in the dashboard or via API. |
| **Log Search (save query)** | Logs Write          | Save log search queries.                |
| **Custom dashboards**       | Analytics Read      | Create and view custom dashboards.      |

These permissions apply across both the dashboard and the API, and must be granted at either the account or zone level depending on which datasets you need to access.

Authentication with the API can be done via an API token or API key with an email. Refer to [Create API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) for further instructions.

## Features

###  Log Search 

Explore your Cloudflare logs directly within the Cloudflare dashboard or [API](https://developers.cloudflare.com/log-explorer/api/).

[ Use Log Search ](https://developers.cloudflare.com/log-explorer/log-search/) 

###  Custom dashboards 

Design customized views for tracking application security, performance, and usage metrics.

[ Use Custom dashboards ](https://developers.cloudflare.com/log-explorer/custom-dashboards/) 

###  Manage datasets 

Manage the data you want to store within Log Explorer.

[ Use Manage datasets ](https://developers.cloudflare.com/log-explorer/manage-datasets/) 

###  API 

Manage configuration and perform queries via the API.

[ Use API ](https://developers.cloudflare.com/log-explorer/api/) 

## Related products

**[Logpush](https://developers.cloudflare.com/logs/)** 

Forward Cloudflare logs to third-party tools for debugging, identifying configuration adjustments, and creating analytics dashboards.

**[Analytics](https://developers.cloudflare.com/analytics/)** 

Visualize the metadata collected by our products in the Cloudflare dashboard.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/log-explorer/","name":"Log Explorer"}}]}
```
