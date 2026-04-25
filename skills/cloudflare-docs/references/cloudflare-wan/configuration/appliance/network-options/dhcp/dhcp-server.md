---
title: DHCP server
description: Configure the Appliance DHCP server.
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

# DHCP server

When you use a static IP address, Cloudflare One Appliance (formerly Magic WAN Connector) can also act as a DHCP server in your network. To enable this feature:

* [ Dashboard ](#tab-panel-6408)
* [ API ](#tab-panel-6409)

1. Go to the **Connectors** page.
[ Go to **Connectors** ](https://dash.cloudflare.com/?to=/:account/magic-networks/connections)
1. Go to the **Appliances** tab > **Profiles**.
1. Select the Cloudflare One Appliance you want to configure > **Edit**.
2. Select **Network Configuration** \> **LAN configuration**.
3. In **LAN configuration**, select the LAN where you want to enable DHCP server.
4. Select **Edit**.
5. Under **Static addressing**, select **This is a DHCP Server**. You also have to specify:  
   * The DNS server address. You can have more than one IP address. Select **Add DNS Server** for each server you want to add.  
   * The DHCP pool start  
   * The DHCP pool end

Note

You will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) to use the API.

Create a [PUT request](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/sites/subresources/lans/methods/update/) to update the LAN where you want to enable DHCP server:

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

                "dhcp_pool_end": "<IP_ADDRESS>",

                "dhcp_pool_start": "<IP_ADDRESS>",

                "dns_server": "<IP_ADDRESS>"

            }

        }

    }

  }'


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-wan/configuration/appliance/","name":"Configure with Appliance"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-wan/configuration/appliance/network-options/","name":"Network options"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-wan/configuration/appliance/network-options/dhcp/","name":"DHCP options"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-wan/configuration/appliance/network-options/dhcp/dhcp-server/","name":"DHCP server"}}]}
```
