---
title: Infrastructure
description: For up-to-date information, refer to the Cloudflare China Network page.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/china-network/reference/infrastructure.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Infrastructure

## China data centers

For up-to-date information, refer to the [Cloudflare China Network ↗](https://www.cloudflare.com/china-network/) page.

### Network IP addresses

Cloudflare publishes a list of IP addresses for JD Cloud data centers, used by Cloudflare when connecting to the origin networks of customers to retrieve assets. These addresses are not the same IP addresses returned to website visitors as part of DNS resolution.

You can obtain the list of JD Cloud data center IP addresses via Cloudflare API. Use the [Cloudflare/JD Cloud IP Details](https://developers.cloudflare.com/api/resources/ips/methods/list/) operation with the `networks=jdcloud` query string parameter:

Cloudflare/JD Cloud IP Details

```

curl "https://api.cloudflare.com/client/v4/ips?networks=jdcloud" \

  --request GET


```

```

{

  "result": {

    "ipv4_cidrs": [

      // (...)

    ],

    "ipv6_cidrs": [

      // (...)

    ],

    "jdcloud_cidrs": [

      // (...)

    ],

    "etag": "<ETAG>"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

The `jdcloud_cidrs` array lists the IP addresses of JD Cloud data centers.

Cloudflare will add new IP addresses to this list 30 days in advance before connecting from those IP addresses to an origin server. If you are using the China Network on JD Cloud, you should update your firewalls to reflect any IP address changes at least once every 30 days.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/china-network/","name":"China Network"}},{"@type":"ListItem","position":3,"item":{"@id":"/china-network/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/china-network/reference/infrastructure/","name":"Infrastructure"}}]}
```
