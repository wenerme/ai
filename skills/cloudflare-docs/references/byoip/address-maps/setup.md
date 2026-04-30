---
title: Set up address maps
description: Create and configure address maps for your IP prefixes.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/byoip/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set up address maps

Consider the sections below to learn how to set up address maps.

Note

There is **no expected downtime** when setting up or updating your address maps.

## Create address maps

If you are using BYOIP, refer to the following steps. If you have [static IPs](https://developers.cloudflare.com/byoip/concepts/static-ips/), Cloudflare creates an address map during the static IP onboarding process, meaning you may only [edit](#manage-address-maps) the Cloudflare-created map.

* [ Dashboard ](#tab-panel-4459)
* [ API ](#tab-panel-4460)

1. In the Cloudflare dashboard, go to the **Address Maps** page.  
[ Go to **Address maps** ](https://dash.cloudflare.com/?to=/:account/ip-addresses/proxy-ips)
2. Select **Create an address map**.
3. Choose the scope of the address map.
4. Add the zones and IP addresses that you want to map.
5. Name your address map.
6. Review the information and select **Save and Deploy**.

Note

Creating an address map does not automatically change DNS configuration. DNS responses only begin to change when a zone or account is added to a map. Additionally, address maps that are not yet enabled will not take effect in DNS responses.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Address Maps Write`

Create Address Map

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/address_maps" \

  --request POST \

  --header "X-Auth-Email: $CLOUDFLARE_EMAIL" \

  --header "X-Auth-Key: $CLOUDFLARE_API_KEY" \

  --json '{

    "description": "Example address map",

    "enabled": true,

    "ips": [

        "203.0.113.1",

        "203.0.113.2"

    ],

    "memberships": [

        {

            "identifier": "<ZONE_ID>",

            "kind": "zone"

        }

    ]

  }'


```

Note

A zone membership will take priority over an account membership.

## Manage address maps

* [ Dashboard ](#tab-panel-4457)
* [ API ](#tab-panel-4458)

1. In the Cloudflare dashboard, go to the **Address Maps** page.  
[ Go to **Address maps** ](https://dash.cloudflare.com/?to=/:account/ip-addresses/proxy-ips)
2. Go to your address map and select **Review**.
3. Edit your address map.
4. Review the information and select **Save**.

Note

You can also enable, disable, and delete address maps. This will likely change the IP addresses used for your zones.

Use the following API endpoints depending on what you want to achieve:

* [Modify the properties of an address map](https://developers.cloudflare.com/api/resources/addressing/subresources/address%5Fmaps/methods/edit/)
* [Add or remove IP addresses](https://developers.cloudflare.com/api/resources/addressing/subresources/address%5Fmaps/subresources/ips/)
* [Add or remove accounts](https://developers.cloudflare.com/api/resources/addressing/subresources/address%5Fmaps/subresources/accounts/)
* [Add or remove zones](https://developers.cloudflare.com/api/resources/addressing/subresources/address%5Fmaps/subresources/zones/)

Note

A zone membership will take priority over an account membership.

## Non-SNI support

If your visitors use devices that have not been updated since 2011, they may not have Server Name Indication (SNI) support. For further context, refer to [browser compatibility](https://developers.cloudflare.com/ssl/reference/browser-compatibility/#non-sni-support).

Use address maps to specify a hostname as default SNI. This will be used whenever Cloudflare receives a non-SNI TLS handshake.

Note

Setting up a default SNI is currently only supported via API.

1. If you have not already, create an address map. Refer to the [section above](#create-address-maps) or to the [Create Address Map](https://developers.cloudflare.com/api/resources/addressing/subresources/address%5Fmaps/methods/create/) API endpoint.
2. Take note of the address map `id`. If needed, you can use the [List Address Maps](https://developers.cloudflare.com/api/resources/addressing/subresources/address%5Fmaps/methods/list/) endpoint to get it.
3. Make sure you add the desired IPs to the address map. Cloudflare will respond with the default SNI on those IPs. Use the dashboard or refer to [Add An IP To An Address Map](https://developers.cloudflare.com/api/resources/addressing/subresources/address%5Fmaps/subresources/ips/methods/update/).
4. Configure the `default_sni` value on the address map created in step 1\. Refer to the [Update Address Map](https://developers.cloudflare.com/api/resources/addressing/subresources/address%5Fmaps/methods/edit/) API endpoint for details. The default SNI can be any valid domain or subdomain owned by your account.

### Spectrum HTTPS applications

Default SNI for Spectrum can only be created via API using the [Create Address Map](https://developers.cloudflare.com/api/resources/addressing/subresources/address%5Fmaps/methods/create/) endpoint.

Do not include any membership in your command. Your API command should resemble the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Address Maps Write`

Create Address Map

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/address_maps" \

  --request POST \

  --header "X-Auth-Email: $CLOUDFLARE_EMAIL" \

  --header "X-Auth-Key: $CLOUDFLARE_API_KEY" \

  --json '{

    "description": "default_sni",

    "default_sni": "sni.example.com",

    "enabled": false,

    "ips": [

        "192.0.0.1"

    ],

    "memberships": []

  }'


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/byoip/","name":"BYOIP"}},{"@type":"ListItem","position":3,"item":{"@id":"/byoip/address-maps/","name":"About address maps"}},{"@type":"ListItem","position":4,"item":{"@id":"/byoip/address-maps/setup/","name":"Set up address maps"}}]}
```
