---
title: Static IP
description: When you create a Spectrum application, you are assigned an IP. These IPs are normally dynamic, meaning that they will change over time. But, for instance, if you want to set up WAF custom rules for specific IPs, you may want to use static IPs.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/spectrum/about/static-ip.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Static IP

When you create a Spectrum application, you are assigned an IP. These IPs are normally dynamic, meaning that they will change over time. But, for instance, if you want to set up WAF custom rules for specific IPs, you may want to use static IPs.

A static IP, like a physical street address can tell other computers or servers on the Internet where a specific computer is located or connected. This makes the device easier to find on the network, since the IP will not change.

With static IPs, Cloudflare commits to never changing the IP address of a client's domain resolved at the Cloudflare global network. For example, `www.example.com` will always resolve and accept traffic sent to `198.51.100.10`. No other customer will be hosted on that IP.

Importantly, the static IP is associated with the DNS name, not with each individual Spectrum application. This means that all Spectrum apps using the same hostname will share the same static IP.

## Use static IPs with Spectrum

Availability

Static IP is an Enterprise feature that does not come standard with Spectrum. Contact your account team to request access.

Once you get your static IP from Cloudflare, you can use it via API, just like [BYOIP](https://developers.cloudflare.com/byoip/). For the moment, there is still no UI available for this feature.

When creating a Spectrum application through the API, specify the static IPs that you have been provided. See, for instance, the API example below that creates an application routing traffic through Cloudflare’s HTTP pipeline.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`

Create Spectrum application using a name for the origin

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/spectrum/apps" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "protocol": "tcp/80",

    "dns": {

        "type": "ADDRESS",

        "name": "www.example.com"

    },

    "origin_direct": [

        "tcp://192.0.2.1:80"

    ],

    "tls": "off",

    "traffic_type": "http",

    "edge_ips": {

        "type": "static",

        "ips": [

            "198.51.100.10",

            "2001:DB8::1"

        ]

    }

  }'


```

## Check your static IPs

You can find your leased static IPs for Spectrum on the dashboard under [**Address space** \> **Leased IPs** ↗](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/spectrum/","name":"Spectrum"}},{"@type":"ListItem","position":3,"item":{"@id":"/spectrum/about/","name":"About"}},{"@type":"ListItem","position":4,"item":{"@id":"/spectrum/about/static-ip/","name":"Static IP"}}]}
```
