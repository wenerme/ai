---
title: View test results
description: View test results in Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-one/insights/dex/tests/view-results.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# View test results

Use the results of a DEX test to monitor availability and performance for a specific application. DEX will store test results according to our [log retention policy](https://developers.cloudflare.com/cloudflare-one/insights/logs/#log-retention).

## Prerequisites

* At least one [test](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/) has been created under **DEX** \> **Tests**.
* Admins must have at least the [Cloudflare Zero Trust Reporting role](https://developers.cloudflare.com/cloudflare-one/roles-permissions/#zero-trust-roles).

## View results for all devices

To view an overview of test results for all devices:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Insights** \> **Digital experience**.
2. Select the **Tests** tab.
3. Select a test to view detailed results.

## View results for an individual device

To view analytics on a per-device level:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Team & Resources** \> **Devices** \> **Your devices**.
2. Select the device you want to view, and then select **View details**.
3. Select the **Tests** tab.
4. Select a test to view detailed results.

## Export DEX application test logs

The log data for all [DEX application tests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/dex%5Fapplication%5Ftests/) (including HTTP tests) can be exported to [R2](https://developers.cloudflare.com/r2/), a cloud bucket, or a SIEM via [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/).

## Related resources

* [DEX HTTP test](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/http/) \- Assess the accessibility of a web application.
* [DEX Traceroute test](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/traceroute/) \- Measure the network path of an IP packet from an end-user device to a server.
* [DEX rules](https://developers.cloudflare.com/cloudflare-one/insights/dex/rules/) \- Specify the target group of a test.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/dex/","name":"Digital experience"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/dex/tests/","name":"Synthetic tests"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/insights/dex/tests/view-results/","name":"View test results"}}]}
```
