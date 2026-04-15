---
title: Changelog
description: Review recent changes to Cloudflare Tunnel.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/tunnel/changelog.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/tunnel.xml) 

## 2026-01-15

  
**Verify WARP Connector connectivity with a simple ping**   

We have made it easier to validate connectivity when deploying [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) as part of your [software-defined private network](https://developers.cloudflare.com/reference-architecture/architectures/sase/#connecting-networks).

You can now `ping` the WARP Connector host directly on its LAN IP address immediately after installation. This provides a fast, familiar way to confirm that the Connector is online and reachable within your network before testing access to downstream services.

Starting with [version 2025.10.186.0](https://developers.cloudflare.com/changelog/2026-01-13-warp-linux-ga/), WARP Connector responds to traffic addressed to its own LAN IP, giving you immediate visibility into Connector reachability.

Learn more about deploying [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) and building private network connectivity with [Cloudflare One](https://developers.cloudflare.com/cloudflare-one/).

## 2025-11-11

  
**cloudflared proxy-dns command will be removed starting February 2, 2026**   

Starting February 2, 2026, the `cloudflared proxy-dns` command will be removed from all new `cloudflared` [releases](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/).

This change is being made to enhance security and address a potential vulnerability in an underlying DNS library. This vulnerability is specific to the `proxy-dns` command and does not affect any other `cloudflared` features, such as the core [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) service.

The `proxy-dns` command, which runs a client-side [DNS-over-HTTPS (DoH)](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/) proxy, has been an officially undocumented feature for several years. This functionality is fully and securely supported by our actively developed products.

Versions of `cloudflared` released before this date will not be affected and will continue to operate. However, note that our [official support policy](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/#deprecated-releases) for any `cloudflared` release is one year from its release date.

#### Migration paths

We strongly advise users of this undocumented feature to migrate to one of the following officially supported solutions before February 2, 2026, to continue benefiting from secure [DNS-over-HTTPS](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/).

#### End-user devices

The preferred method for enabling DNS-over-HTTPS on user devices is the [Cloudflare WARP client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/). The WARP client automatically secures and proxies all DNS traffic from your device, integrating it with your organization's [Zero Trust policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) and [posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/).

#### Servers, routers, and IoT devices

For scenarios where installing a client on every device is not possible (such as servers, routers, or IoT devices), we recommend using the [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/).

Instead of running `cloudflared proxy-dns` on a machine, you can install the WARP Connector on a single Linux host within your private network. This connector will act as a gateway, securely routing all DNS and network traffic from your [entire subnet](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/) to Cloudflare for [filtering and logging](https://developers.cloudflare.com/cloudflare-one/traffic-policies/).

## 2025-09-02

  
**Cloudflare Tunnel and Networks API will no longer return deleted resources by default starting December 1, 2025**   

Starting **December 1, 2025**, list endpoints for the [Cloudflare Tunnel API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/) and [Zero Trust Networks API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/) will no longer return deleted tunnels, routes, subnets and virtual networks by default. This change makes the API behavior more intuitive by only returning active resources unless otherwise specified.

No action is required if you already explicitly set `is_deleted=false` or if you only need to list active resources.

This change affects the following API endpoints:

* List all tunnels: [GET /accounts/{account\_id}/tunnels](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/methods/list/)
* List [Cloudflare Tunnels](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/): [GET /accounts/{account\_id}/cfd\_tunnel](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/subresources/cloudflared/methods/list/)
* List [WARP Connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) tunnels: [GET /accounts/{account\_id}/warp\_connector](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/subresources/warp%5Fconnector/methods/list/)
* List tunnel routes: [GET /accounts/{account\_id}/teamnet/routes](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/routes/methods/list/)
* List subnets: [GET /accounts/{account\_id}/zerotrust/subnets](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/subnets/methods/list/)
* List virtual networks: [GET /accounts/{account\_id}/teamnet/virtual\_networks](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/virtual%5Fnetworks/methods/list/)

#### What is changing?

The default behavior of the `is_deleted` query parameter will be updated.

| Scenario                         | Previous behavior (before December 1, 2025)                                | New behavior (from December 1, 2025)                                  |
| -------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| is\_deleted parameter is omitted | Returns **active & deleted** tunnels, routes, subnets and virtual networks | Returns **only active** tunnels, routes, subnets and virtual networks |

#### Action required

If you need to retrieve deleted (or all) resources, please update your API calls to explicitly include the `is_deleted` parameter before **December 1, 2025**.

To get a list of only deleted resources, you must now explicitly add the `is_deleted=true` query parameter to your request:

Terminal window

```

# Example: Get ONLY deleted Tunnels

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tunnels?is_deleted=true" \

     -H "Authorization: Bearer $API_TOKEN"


# Example: Get ONLY deleted Virtual Networks

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/virtual_networks?is_deleted=true" \

     -H "Authorization: Bearer $API_TOKEN"


```

Following this change, retrieving a complete list of both active and deleted resources will require two separate API calls: one to get active items (by omitting the parameter or using `is_deleted=false`) and one to get deleted items (`is_deleted=true`).

#### Why we’re making this change

This update is based on user feedback and aims to:

* **Create a more intuitive default:** Aligning with common API design principles where list operations return only active resources by default.
* **Reduce unexpected results:** Prevents users from accidentally operating on deleted resources that were returned unexpectedly.
* **Improve performance:** For most users, the default query result will now be smaller and more relevant.

To learn more, please visit the [Cloudflare Tunnel API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/tunnels/) and [Zero Trust Networks API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/) documentation.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":3,"item":{"@id":"/tunnel/changelog/","name":"Changelog"}}]}
```
