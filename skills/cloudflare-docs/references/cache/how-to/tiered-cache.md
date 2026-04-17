---
title: Tiered Cache
description: Reduce origin requests with tiered cache topology.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ REST API ](https://developers.cloudflare.com/search/?tags=REST%20API)[ Logging ](https://developers.cloudflare.com/search/?tags=Logging) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cache/how-to/tiered-cache.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Tiered Cache

Tiered Cache uses the size of Cloudflare’s network to reduce requests to customer origins by dramatically increasing cache hit ratios. With data centers around the world, Cloudflare caches content very close to end users. However, if a piece of content is not in cache, the Cloudflare edge data centers must contact the origin server to receive the cacheable content.

Tiered Cache works by dividing Cloudflare’s data centers into a hierarchy of lower-tiers and upper-tiers. If content is not cached in lower-tier data centers (generally the ones closest to a visitor), the lower-tier must ask an upper-tier to see if it has the content. If the upper-tier does not have the content, only the upper-tier can ask the origin for content. This practice improves bandwidth efficiency by limiting the number of data centers that can ask the origin for content, which reduces origin load and makes websites more cost-effective to operate.

Additionally, Tiered Cache concentrates connections to origin servers so they come from a small number of data centers rather than the full set of network locations. This results in fewer open connections using server resources.

To enable Tiered Cache, refer to [Enable Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/#enable-tiered-cache).

## Tiered Cache Topology

Cloudflare allows you to select your cache topology so that you have control over how your origin connects to Cloudflare’s data centers. This will help ensure higher cache hit ratios, fewer origin connections, and a reduction of Internet latency. Below you can find details about the options we have available.

### Smart Tiered Cache

Smart Shield

This functionality is now offered as part of Cloudflare's origin server safeguard, Smart Shield. [Learn more](https://developers.cloudflare.com/smart-shield/).

Smart Tiered Cache dynamically selects the single closest upper tier for each of your website’s origins with no configuration required, using our in-house performance and routing data. Cloudflare collects latency data for each request to an origin, and uses the latency data to determine how well any upper-tier data center is connected with an origin. As a result, Cloudflare can select the data center with the lowest latency to be the upper-tier for an origin.

#### Load Balancing interaction

While Smart Tiered Cache selects one Upper Tier per origin, when using Load Balancing, Smart Tiered Cache will select the single best Upper Tier for the entire [Load Balancing Pool](https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-components/#pools).

#### Caveats

Smart Tiered Cache does not work when an origin is behind an [anycast ↗](https://www.cloudflare.com/en-gb/learning/cdn/glossary/anycast-network/) or a regional unicast network because that will prevent us from knowing where the origin is located. As a result, we are unable to select the optimal upper tier and latency may be negatively impacted.

You need to be careful when updating your origin IPs/DNS records while Smart Tiered Cache is enabled. Depending on the changes made, it may cause the existing assigned upper tiers to change, resulting in an increased `MISS` rate as cache is refilled in the new upper tiers. If the origin is switched to a network behind anycast, it will significantly reduce the effectiveness of Smart Tiered Cache.

If you need to use anycast or regional unicast and want to use Smart Tiered cache, please engage your account team.

### Generic Global Tiered Cache

Generic Global topology allows for all of Cloudflare’s global data centers to serve as a network of upper-tiers. This topology may help reduce the long tail latencies for far-away visitors.

### Regional Tiered Cache

Smart Shield

This functionality is now offered as part of Cloudflare's origin server safeguard, Smart Shield. [Learn more](https://developers.cloudflare.com/smart-shield/).

Regional Tiered Cache provides an additional layer of caching for customers who have a global traffic footprint and want to serve content faster by avoiding network latency when there is a cache `MISS` in a lower-tier, resulting in an upper-tier fetch in a data center located far away.

Regional Tiered Cache instructs Cloudflare to check a regional hub data center near the lower tier before going to the upper tier that may be outside of the region.

This can help improve performance for **Smart** and **Custom Tiered Cache** topologies with upper-tiers in one or two regions. Regional Tiered Cache is not beneficial for customers with many upper tiers in many regions like Generic Global Tiered Cache.

### Custom Tiered Cache

Custom Tiered cache allows Enterprise customers to work with their account team to set a custom topology that fits your specific needs, for instance you have close upper tiers or you have an unique traffic pattern. If you want a custom topology, please engage your account team.

## Availability

| Free                    | Pro | Business | Enterprise |     |
| ----------------------- | --- | -------- | ---------- | --- |
| Tiered Cache            | Yes | Yes      | Yes        | Yes |
| Smart Topology          | Yes | Yes      | Yes        | Yes |
| Generic Global Topology | No  | No       | No         | Yes |
| Regional Tiered Cache   | No  | No       | No         | Yes |
| Custom Topology         | No  | No       | No         | Yes |

## Bandwidth Alliance

Enterprise customers can override Bandwidth Alliance configuration with Tiered Cache. For all other users, the Bandwidth Alliance takes precedence. Tiered Cache is still a valuable option to enable because the Bandwidth Alliance may not always be an available option, and in those instances, the Tiered Cache configuration will be used.

## Enable Tiered Cache

You can enable Tiered Cache in the dashboard or via API.

### Enable Tiered Cache in the dashboard

1. In the Cloudflare dashboard, go to the **Tiered Cache** page.  
[ Go to **Tiered Cache** ](https://dash.cloudflare.com/?to=/:account/:zone/caching/tiered-cache)
2. From **Tiered Cache**, toggle the button to **enabled**.
3. In **Tiered Cache Topology**, you can control how your origin connects to Cloudflare’s data centers. You can select:  
   * **Upper Tier Cache** \- You have the option to choose between Smart or Generic Global Tiered Cache Topology.  
   * **Middle Tier Cache** \- If you have selected Smart or Custom Tiered Cache Topology, you can now enable Regional Tiered Cache.  
   * **Custom Tiered Cache** \- Allows you to work with Cloudflare’s support team to set a custom topology that fits your specific needs.  
   * **Disable Tiered Cache**.
![Tiered Cache Topology dashboard](https://developers.cloudflare.com/_astro/tiered_cache_topology.sy3gfwwc_Z1XYoHF.webp) 

### Enable Tiered Cache via API

To enable Tiered Cache via API use the following cURL example:

Patch Tiered Caching setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/argo/tiered_caching" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "value": "on"

  }'


```

You can also configure Tiered Cache Topology via API, for instance:

Enable Smart Tiered Cache

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`
* `Zone Write`

Patch Smart Tiered Cache setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/tiered_cache_smart_topology_enable" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "value": "on"

  }'


```

Enable Regional Tiered Cache

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`
* `Zone Write`

Change Regional Tiered Cache setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/regional_tiered_cache" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "value": "on"

  }'


```

For more API examples and configuration options for Tiered Cache, refer to the [API documentation](https://developers.cloudflare.com/api/resources/argo/subresources/tiered%5Fcaching/methods/get/).

Note

To confirm that Tiered Cache is working, make sure you have the value of `[CacheTieredFill](/logs/logpush/logpush-job/datasets/zone/http_requests/#cachetieredfill)` in your http\_requests logs, this will indicate if Tiered Cache was used to serve the request.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/tiered-cache/","name":"Tiered Cache"}}]}
```
