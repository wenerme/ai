---
title: Update tunnel health checks frequency
description: By default, Cloudflare servers send health checks to each GRE, Cloudflare Network Interconnect (CNI), or IPsec tunnel endpoint you configure to receive traffic from Cloudflare WAN.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-wan/configuration/common-settings/update-tunnel-health-checks-frequency.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Update tunnel health checks frequency

By default, Cloudflare servers send [health checks](https://developers.cloudflare.com/cloudflare-wan/reference/tunnel-health-checks/) to each GRE, Cloudflare Network Interconnect (CNI), or IPsec tunnel endpoint you configure to receive traffic from Cloudflare WAN.

For Cloudflare One Appliance (formerly Magic WAN Connector), Cloudflare sends health checks to IPsec tunnel endpoints.

You can configure the health check frequency through the dashboard or [the API](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/gre%5Ftunnels/methods/update/) to suit your use case. For example, if you are connecting a lower-traffic site that does not need immediate failover and you prefer a lower volume of health check traffic, set the frequency to `low`. On the other hand, if you are connecting a site that is extremely sensitive to any issues and you want proactive failover at the earliest sign of a potential problem, set this to `high`.

Available options are `low`, `mid`, and `high`.

To configure health checks frequency in Cloudflare One Appliance, refer to [Configure Connector](#configure-connector)

## Manual configuration

* [ Dashboard ](#tab-panel-3975)
* [ API ](#tab-panel-3976)

1. To create or edit your tunnel, refer to [Add tunnels](https://developers.cloudflare.com/cloudflare-wan/configuration/manually/how-to/configure-tunnel-endpoints/#add-tunnels).
2. Change the **Health check rate** to your desired rate. For example, _Low_.
3. Save your changes.

You can adjust the health check frequency by updating your [GRE](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/gre%5Ftunnels/methods/update/), [IPsec](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/ipsec%5Ftunnels/methods/update/), or [CNI](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/cf%5Finterconnects/methods/update/) tunnels.

The following example adjusts tunnel health check frequency to `low`. Note that this command applies to GRE, IPsec and CNI tunnels:

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/magic/ipsec_tunnels/%7Bipsec_tunnel_id%7D" \

  --request PUT \

  --json '{

    "health_check": {

        "rate": "low"

    }

  }'


```

## Configure Connector

1. Go to the **Connector** page.
[ Go to **Connectors** ](https://dash.cloudflare.com/?to=/:account/magic-networks/connections)
1. Go the **Appliances** tab > **Profiles**.
2. Find the Connector profile you want to edit > select the three dots > **Edit**.
3. In **Network Configuration** \> **WAN configuration** \> select your WAN > **Edit**.
1. Change the **Health check rate** to your desired rate.
2. Select **Save**.

Note

Cloudflare WAN customers with [Customer Metadata Boundary](https://developers.cloudflare.com/data-localization/metadata-boundary/) enabled for the European Union can access GRE, IPsec, and CNI (Cloudflare Network Interconnect) health check and traffic volume data in the Cloudflare dashboard and through the API. This ensures that customers who need to be General Data Protection Regulation (GDPR) compliant can access all Cloudflare WAN features.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-wan/configuration/common-settings/","name":"Common settings"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-wan/configuration/common-settings/update-tunnel-health-checks-frequency/","name":"Update tunnel health checks frequency"}}]}
```
