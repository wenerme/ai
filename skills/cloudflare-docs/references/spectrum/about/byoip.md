---
title: BYOIP
description: Use your own IP addresses with Spectrum applications.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/spectrum/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# BYOIP

When creating a Spectrum application, Cloudflare normally assigns an arbitrary IP from Cloudflare’s IP pool to your application. If you want to be explicit in your network setup or use your own IP addresses, BYOIP with Spectrum allows you to do just that.

BYOIP stands for [Bring Your Own IP](https://developers.cloudflare.com/byoip/). If you own an IP prefix you can migrate it to Cloudflare. After migration, Cloudflare broadcasts your IP prefix and traffic is routed to the global Cloudflare network. However, without configuration, Cloudflare will not know how to handle this traffic. The last step is to add Spectrum applications for all applications that you wish to protect with the IP addresses you want associated with them.

Warning

When switching from non-BYOIP to BYOIP, if you are already using a Spectrum application, you need to delete your configurations and recreate new ones.

The smallest prefixes that Cloudflare currently supports is /24 for IPv4 and /48 for IPv6.

BYOIP does not come standard with Spectrum. To enable it, contact your account team.

UDP applications

Spectrum UDP applications are [not supported](https://developers.cloudflare.com/spectrum/reference/limitations/#udp) when using Spectrum with BYOIP.

## Assign an IP address

To use an IP, it must be assigned to a Spectrum app to create the appropriate A (IPv4) or AAAA (IPv6) records. This is done by specifying one or more IP addresses when creating an application through the API. Any change to the application's properties also needs to be done via API. In addition, you must update the DNS `"type"` field to `"ADDRESS"` to create a Spectrum app using BYOIP.

```

{

  "id": "4590376cf2994d72cee36828ec4eff19",

  "protocol": "tcp/22",

  "dns": {

    "type": "ADDRESS",

    "name": "ssh.example.com"

  },

  "origin_direct": ["tcp://192.0.2.1:22"],

  "ip_firewall": true,

  "proxy_protocol": false,

  "spp": false,

  "tls": "off",

  "traffic_type": "direct",

  "edge_ips": {

    "type": "static",

    "ips": ["198.51.100.10", "2001:DB8::1"]

  }

}


```

## Example

In the example below, the application routes traffic through Cloudflare’s HTTP pipeline, including WAF, Workers and CDN functionality.

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/spectrum/","name":"Spectrum"}},{"@type":"ListItem","position":3,"item":{"@id":"/spectrum/about/","name":"About"}},{"@type":"ListItem","position":4,"item":{"@id":"/spectrum/about/byoip/","name":"BYOIP"}}]}
```
