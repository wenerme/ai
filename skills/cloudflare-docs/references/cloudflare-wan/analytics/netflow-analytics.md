---
title: NetFlow statistics
description: View NetFlow statistics for WAN traffic.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-wan/analytics/netflow-analytics.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# NetFlow statistics

## NetFlow exports from Cloudflare One Appliance to Network Flow

You can configure your Cloudflare One Appliance (formerly Magic WAN Connector) to export Netflow statistics for [local breakout traffic](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/application-based-policies/breakout-traffic/) to [Network Flow](https://developers.cloudflare.com/network-flow) (formerly Magic Network Monitoring). This provides insights into traffic that leaves your site directly, bypassing the Cloudflare network.

The Cloudflare One Appliance uses NetFlow v9 to export flow data for breakout traffic only. You can enable and configure this export by setting the Netflow configuration for the associated site via the Cloudflare API.

### Enable NetFlow exports

Note

To export NetFlow statistics, you will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/), as well as the `site_id` associated with your Cloudflare One Appliance.

1. Send a `PUT` request to the Netflow configuration endpoint for your site.
2. In the JSON body request, you must include the `collector_ip` parameter. To export traffic statistics to Network Flow, use the IP address `162.159.65.1`. This is the only field required to enable the feature.

Minimal configuration example:

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/netflow_config" \

  --request PUT \

  --json '{

    "collector_ip": "162.159.65.1"

  }'


```

1. You can customize the configuration by adding optional fields to the JSON payload. These fields include:
* `collector_port`: The UDP port for the collector. The default is `2055`.
* `sampling_rate`: The rate at which packets are sampled.
* `active_timeout`: The timeout for active flows in seconds.
* `inactive_timeout`: The timeout for inactive flows in seconds.

Full configuration example:

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/netflow_config" \

  --request PUT \

  --json '{

    "collector_ip": "162.159.65.1",

    "collector_port": 2055,

    "sampling_rate": 100,

    "active_timeout": 60,

    "inactive_timeout": 30

  }'


```

Your Cloudflare One Appliance will now begin exporting Netflow data for its breakout traffic, which will be ingested and displayed within your Network Flow dashboard. You can retrieve the current settings by sending a `GET` request, or disable the export by sending a `DELETE` request to the same endpoint.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-wan/analytics/","name":"Analytics"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-wan/analytics/netflow-analytics/","name":"NetFlow statistics"}}]}
```
