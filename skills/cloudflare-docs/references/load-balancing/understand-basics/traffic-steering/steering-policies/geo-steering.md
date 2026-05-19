---
title: Geo
description: Route traffic to pools based on visitor geographic location.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Geo

**Geo steering** directs traffic to pools tied to specific countries, regions, or — for Enterprise customers only — data centers.

This option is extremely useful when you want site visitors to access the endpoint closest to them, which improves page-loading performance.

Note

Custom load balancing rules are incompatible with Geo steering. As a result, any custom rule applied to Geo-steered Load Balancers will not function as expected.

## Pool assignment

You can assign multiple pools to the same area and the load balancer will use them in failover order. Any options not explicitly defined — whether in data centers, countries, or regions — will fall back to using default pools and failover.

### Region steering

Cloudflare has [13 geographic regions](https://developers.cloudflare.com/load-balancing/reference/region-mapping-api/#list-of-load-balancer-regions) that span the world. The region of a client is determined by the region of the Cloudflare data center that answers the client’s DNS query.

Warning

If you add a pool to a region, you cannot [delete this pool](https://developers.cloudflare.com/load-balancing/pools/create-pool/#delete-a-pool) until you remove it from the **Geo steering** configuration. The configuration is **not** automatically removed when you change to a different **Traffic Steering** method.

* [ Dashboard ](#tab-panel-7183)
* [ API ](#tab-panel-7184)

When [creating or editing a load balancer](https://developers.cloudflare.com/load-balancing/load-balancers/create-load-balancer/):

1. Go to the **Traffic steering** step.
2. Select **Geo steering**.
3. For **Region**, select a region > **Add Region**.
4. Select **Edit**.
5. Select a pool > **Add Pool**.
6. If adding multiple pools, re-order them into your preferred failback order.
7. (optional) Add more regions if needed.

Use the `regions_pool` property of the [Update Load Balancers](https://developers.cloudflare.com/api/resources/load%5Fbalancers/methods/update/) command to specify an array of regions. Specify each region using the [appropriate region code](https://developers.cloudflare.com/load-balancing/reference/region-mapping-api/#list-of-load-balancer-regions) followed by a list of endpoints to use for that region.

In the example below, `WNAM` and `ENAM` represent the West and East Coasts of North America, respectively.

Request

```

// PUT /zones/:zone_id/load_balancers

{

  "description": "Load Balancer for www.example.com",

  "name": "www.example.com",

  "ttl": 30,

  "proxied": true,

  "fallback_pool": "ff02c959d17f7bb2b1184a202e3c0af7",

  "default_pools": [

    "17b5962d775c646f3f9725cbc7a53df4",

    "ff02c959d17f7bb2b1184a202e3c0af7"

  ],

  "region_pools": {

    "WNAM": [

      "17b5962d775c646f3f9725cbc7a53df4",

      "ff02c959d17f7bb2b1184a202e3c0af7"

    ],

    "ENAM": [

      "17b5962d775c646f3f9725cbc7a53df4",

      "ff02c959d17f7bb2b1184a202e3c0af7"

    ],

    "EEU": [

      "ff02c959d17f7bb2b1184a202e3c0af7",

      "17b5962d775c646f3f9725cbc7a53df4"

    ]

  }

}


```

If you only define `WNAM`, then traffic from the East Coast will be routed to the `default_pools`. You can test this using a client in each of those locations.

### Country steering

* [ Dashboard ](#tab-panel-7185)
* [ API ](#tab-panel-7186)

When [creating or editing a load balancer](https://developers.cloudflare.com/load-balancing/load-balancers/create-load-balancer/):

1. Follow the [create a load balancer procedure](https://developers.cloudflare.com/load-balancing/load-balancers/create-load-balancer/#create-a-load-balancer) until you reach the **Traffic steering** step.
2. Select **Geo steering**.
3. For **Country**, select a country > **Add Region**.
4. Select **Edit**.
5. Select a pool > **Add Pool**.
6. If adding multiple pools, re-order them into your preferred failback order.
7. (optional) Add more countries if needed.

When creating a load balancer [via the API](https://developers.cloudflare.com/api/resources/load%5Fbalancers/methods/create/), include the `country_pools` object to map countries to a list of pool IDs (ordered by their failover priority).

To get a list of country codes, use the [Region API](https://developers.cloudflare.com/load-balancing/reference/region-mapping-api/).

Any country not explicitly defined will fall back to using the corresponding `region_pool` mapping (if it exists), then to the associated default pools.

### PoP steering

When creating a load balancer [via the API](https://developers.cloudflare.com/api/resources/load%5Fbalancers/methods/create/), include the `pop_pools` object to map Cloudflare data centers to a list of pool IDs (ordered by their failover priority).

For help finding data center identifiers, refer to [this community thread ↗](https://community.cloudflare.com/t/is-there-a-way-to-retrieve-cloudflare-pops-list-and-locations-programmatically/234643).

Any data center not explicitly defined will fall back to using the corresponding `country_pool`, then `region_pool` mapping (if it exists), and finally to associated default pools.

Note

PoP steering is only available to Enterprise customers and only accessible via the API.

### Failover behavior

A fallback pool will be used if there is only one pool in the same region and it is unavailable. If there are multiple pools in the same region, the order of the pools will be respected. For example, if the first pool is unavailable, the second pool will be used.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/understand-basics/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/","name":"Traffic steering"}},{"@type":"ListItem","position":5,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/steering-policies/","name":"Global traffic steering"}},{"@type":"ListItem","position":6,"item":{"@id":"/load-balancing/understand-basics/traffic-steering/steering-policies/geo-steering/","name":"Geo"}}]}
```
