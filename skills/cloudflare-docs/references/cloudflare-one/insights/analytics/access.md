---
title: Access event analytics
description: Reference information for Access event analytics in Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Authentication ](https://developers.cloudflare.com/search/?tags=Authentication) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/insights/analytics/access.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Access event analytics

Access event analytics allows you to review login attempts to the applications you protect behind [Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/). Access event analytics are powered by [Access authentication logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/access-authentication-logs/).

To view Access event analytics:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Insights**.
2. Go to **Dashboards**.
3. Select **Access event analytics**.

Access Event Analytics aggregates authentication activity based on your [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/).

The [Application Access Report](https://developers.cloudflare.com/cloudflare-one/insights/analytics/application-access/) dashboard offers a summary of overall Access activity, while [Access event analytics](https://developers.cloudflare.com/cloudflare-one/insights/analytics/access/) dashboard provides a view of login events. You can export the Application Access Report to a PDF to share with stakeholders.

Refer to [Insights overview](https://developers.cloudflare.com/cloudflare-one/insights/) to learn how to use Analytics dashboards together with [Analytics Overview](https://developers.cloudflare.com/cloudflare-one/insights/analytics-overview/) and [Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) for complete visibility and troubleshooting.

## Available insights

The Access event analytics dashboard includes a chart of Access activity over time. You can view a chronological chart of access events. The Access event analytics dashboard shows when access requests occurred, helping you spot spikes in login attempts.

* Events are displayed on the vertical axis.
* Time (in your local timezone) is shown along the horizontal axis.

The Access event analytics dashboard also shows data on your usage patterns with metrics including:

* Top used applications
* Top users
* Top IP addresses
* Top identities
* Top countries
* Top application types

These insights help you detect anomalies, and optimize policy rules.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/analytics/","name":"Dashboards"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/analytics/access/","name":"Access event analytics"}}]}
```
