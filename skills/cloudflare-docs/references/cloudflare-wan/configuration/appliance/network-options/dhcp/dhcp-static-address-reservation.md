---
title: DHCP static address reservation
description: Reserve static DHCP addresses on the Appliance.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-static-address-reservation.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# DHCP static address reservation

If you configure your Cloudflare One Appliance (formerly Magic WAN Connector) to be a DHCP server, you can also assign IP addresses to specific devices on your network. To reserve IP addresses:

* [ Dashboard ](#tab-panel-6142)
* [ API ](#tab-panel-6143)

1. Configure your Cloudflare One Appliance to be a [DHCP server](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-server/).
2. Select **Add DHCP Reservation**.
3. In **Hardware Address** enter the [MAC address ↗](https://en.wikipedia.org/wiki/MAC%5Faddress) for the device you want a specific IP address for.
4. In **IP Address**, enter the IP address for that device.
5. (Optional) If you need to reserve more IP addresses, select **Add DHCP Reservation** as many times as needed, and enter the new values.

Note

You will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) to use the API.

Create a [PUT request](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/sites/subresources/lans/methods/update/) to update the LAN where you want to reserve addresses:

Example:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Magic WAN Write`
* `Magic Transit Write`

Update Site LAN

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/lans/$LAN_ID" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "lan": {

        "static_addressing": {

            "dhcp_server": {

                "reservations": {

                    "<HARDWARE_MAC_ADDRESS>": "<IP_ADDRESS>",

                    "<HARDWARE_MAC_ADDRESS_2>": "<IP_ADDRESS>"

                }

            }

        }

    }

  }'


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-wan/configuration/appliance/","name":"Configure with Appliance"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-wan/configuration/appliance/network-options/","name":"Network options"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-wan/configuration/appliance/network-options/dhcp/","name":"DHCP options"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-static-address-reservation/","name":"DHCP static address reservation"}}]}
```
