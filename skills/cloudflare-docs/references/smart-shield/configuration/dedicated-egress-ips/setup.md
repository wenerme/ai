---
title: Setup
description: Configure Dedicated CDN Egress IPs using the Cloudflare API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/smart-shield/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Setup

You can use the [Edit Zone Settings API endpoint](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) to set up Dedicated CDN Egress IPs (formerly known as Aegis). If you are not familiar with how Cloudflare API works, refer to [Fundamentals](https://developers.cloudflare.com/fundamentals/api/).

Enterprise-only

Dedicated CDN Egress IPs (DCEI) are currently available to Enterprise customers. Contact your account team to request access.

## Requirements

* The Dedicated CDN Egress IPs (DCEI) zone setting is only available within Cloudflare accounts that own leased IPs, or accounts to which a [BYOIP prefix](https://developers.cloudflare.com/byoip/) has been delegated. If you wish to use Dedicated CDN Egress IPs for zones that do not meet this criteria, contact your account team.
* Each dedicated egress pool can consist of either IPs from a [BYOIP prefix](https://developers.cloudflare.com/byoip/) or Cloudflare-leased IPs. A single dedicated egress pool cannot contain both BYOIPs and leased IPs. Also, a single BYOIP prefix can be used for either CDN ingress or CDN egress, but not both.

Warning

You must allowlist the IP addresses from this pool in your infrastructure before linking it to a zone. If you skip this step, traffic will not reach your origin, causing errors.

## Turn on DCEI for a zone

1. Contact your account team to get the ID for your dedicated egress pool.
2. Make a `PATCH` request to the [Edit Zone Setting](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) endpoint:
* Specify `aegis` as the setting ID in the URL.
* In the request body, set `enabled` to `true` and use the ID from the previous step as the `pool_id` value.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`

Edit zone setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/aegis" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "id": "aegis",

    "value": {

        "enabled": true,

        "pool_id": "<EGRESS_POOL_ID>"

    }

  }'


```

## Check DCEI status for a zone

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`
* `Zone Settings Read`

Get zone setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/aegis" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

## Turn off DCEI for a zone

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`

Edit zone setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/aegis" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "id": "aegis",

    "value": {

        "enabled": false

    }

  }'


```

## Check your IPs

You can find your leased dedicated IPs for CDN egress on the dashboard under [**Address space** \> **Leased IPs** ↗](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space).

If you are using BYOIP, refer to **BYOIP prefixes** instead.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/smart-shield/","name":"Smart Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/smart-shield/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/smart-shield/configuration/dedicated-egress-ips/","name":"Dedicated CDN Egress IPs"}},{"@type":"ListItem","position":5,"item":{"@id":"/smart-shield/configuration/dedicated-egress-ips/setup/","name":"Setup"}}]}
```
