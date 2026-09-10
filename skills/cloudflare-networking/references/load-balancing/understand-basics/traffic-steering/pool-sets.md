---
description: Use pool sets to define location-specific pools, steering policies, weights, and fallback behavior through the API.
title: Pool sets
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt
> Use this file to discover all available pages before exploring further.

# Pool sets

Last updated Sep 10, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/pool-sets/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Pool sets allow you to combine geographic steering with other traffic steering policies. For example, you can apply Dynamic Latency steering within a specific region or country. For load balancers managed through the API, pool sets can replace Geo steering.

With pool sets you can:

* Apply any supported steering policy within a single location
* Set pool weights that apply only to that location
* Assign a fallback pool for that location instead of the global fallback pool
* Return a fixed HTTP response for matched proxied traffic

Note

Use [Geo steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/geo-steering/) for simple, dashboard-managed geographic failover. Geo steering evaluates each location's pools in failover order and uses one global fallback pool. It cannot split traffic across pools within a location.

## How pool sets are evaluated

Pool sets are stored as an ordered array on the load balancer. Cloudflare evaluates them in array order and stops at the first pool set whose `match` succeeds. That pool set then supplies the pools, steering policy, weights, and fallback pool for the request.

A pool set matching a single data center does not automatically take priority over one matching a region. Order the array from most specific to least specific.

Place a default pool set last by setting `match.default` to `true`. The `default` match applies to every request. Since pool sets use first-match wins, this pool set handles requests that did not match an earlier pool set:

```json
{
	"pool_sets": [
		{
			"name": "sjc-only",
			"match": { "topology": { "pops": ["SJC"] } },
			"overrides": { "pools": ["17b5962d775c646f3f9725cbc7a53df4"] }
		},
		{
			"name": "default",
			"match": { "default": true },
			"overrides": { "pools": ["ff02c959d17f7bb2b1184a202e3c0af7"] }
		}
	]
}
```

A pool set with `disabled` set to `true` is skipped.

## Match conditions

The `match` object decides which requests a pool set applies to. Set either `default` or `topology` — the two cannot be combined. A pool set with no `match` at all applies to every request.

| Field    | Description                                                             |
| -------- | ----------------------------------------------------------------------- |
| default  | When true, matches every request. Cannot be combined with topology.     |
| topology | Matches by location. Requires at least one of pops, countries, regions. |

### Topology matching

Within `topology`, each field takes a list of location codes:

| Field     | Values                                                                                                                                                |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| pops      | Cloudflare data center codes, matched against the data center handling the request                                                                    |
| countries | ISO 3166-1 alpha-2 country codes                                                                                                                      |
| regions   | Cloudflare [region codes](https://developers.cloudflare.com/load-balancing/reference/region-mapping-api/#list-of-load-balancer-regions), such as WNAM |

Entries within a single field are combined with OR. A request from Germany matches `"countries": ["FR", "DE", "GB"]`.

Caution

Fields are combined with AND, not OR. A `topology` that sets both `"countries": ["US"]` and `"regions": ["WNAM"]` matches only requests that are in the United States **and** in the WNAM region. To match either location, use two separate pool sets.

For example, this topology sets multiple values in all three fields:

```json
{
	"match": {
		"topology": {
			"pops": ["SJC", "IAD"],
			"countries": ["US", "CA"],
			"regions": ["WNAM", "ENAM"]
		}
	}
}
```

A request matches when its data center is `SJC` or `IAD`, its country is `US` or `CA`, **and** its region hierarchy includes `WNAM` or `ENAM`.

Set one field per `topology` unless you specifically want that AND behavior.

A `regions` entry matches if it appears anywhere in the request's region hierarchy, so a broader region code can match a request from a narrower one.

Country matching uses the location resolved for the request. When the client location cannot be resolved, country matching falls back to the country of the Cloudflare data center handling the request.

## Overrides

The `overrides` object holds the routing behavior applied on a match. Its fields are optional, but a pool set without `fixed_response` must set `overrides.pools`.

| Field                 | Description                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------------- |
| pools                 | Pool IDs to route to. Replaces the load balancer's pool selection entirely for this request.    |
| pool\_weights         | Per-pool weights, applied only within this pool set                                             |
| pool\_default\_weight | Weight for any pool in pools without an entry in pool\_weights                                  |
| fallback\_pool        | Pool of last resort for this pool set. When omitted, the load balancer's fallback pool is used. |
| steering\_policy      | Steering policy applied to pools                                                                |

`pools` is a flat list rather than a map of locations to pools. The matched pool set defines the whole set of candidate pools for the request.

### Steering policies within a pool set

These steering policies are supported within a pool set:

| Policy                       | Behavior within the pool set                                     |
| ---------------------------- | ---------------------------------------------------------------- |
| off                          | Use pools in failover order                                      |
| random                       | Select a pool at random, honoring pool\_weights                  |
| dynamic\_latency             | Select the pool with the lowest round trip time                  |
| proximity                    | Select the pool closest to the request by latitude and longitude |
| least\_outstanding\_requests | Select a pool by weights and outstanding request counts          |
| least\_connections           | Select a pool by weights and open connection counts              |

`pool_weights` and `pool_default_weight` apply to `random`, `least_outstanding_requests`, and `least_connections`. These weights are separate from the load balancer's `random_steering` weights, so each pool set can weight its pools independently.

Omitting `steering_policy` leaves the pool set using failover order.

### Fixed responses

For proxied zone load balancers, a pool set can return a `fixed_response` instead of using `overrides.pools`. Use this option to return an HTTP status or redirect for a matched location:

```json
{
	"pool_sets": [
		{
			"name": "redirect-region",
			"match": { "topology": { "countries": ["US"] } },
			"fixed_response": {
				"status_code": 302,
				"location": "https://example.com/service-unavailable"
			}
		}
	]
}
```

Do not use `fixed_response` with DNS-only load balancers. DNS responses cannot carry HTTP status, body, or redirect fields. A matching fixed response returns `NOERROR` with no records.

A pool set must specify either `overrides.pools` or `fixed_response`. A pool set with neither is rejected, because it would match traffic and then have nowhere to send it.

## Relationship to other steering settings

Pool sets are independent of the standard steering fields. Adding pool sets does not read from or write to `default_pools`, `region_pools`, `country_pools`, `pop_pools`, `steering_policy`, `random_steering`, or `fallback_pool`, and configuring those fields does not create pool sets.

Because a matched pool set replaces pool selection for the request, the standard fields have no effect on requests that a pool set matches. Requests that match no pool set fall through to your standard steering configuration.

`default_pools` remains required on every load balancer, even when you expect every request to match a pool set. It is the destination for requests that match no pool set.

### Custom rules

Pool sets are evaluated before [custom rules](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/). A matched pool set establishes the routing decision, and custom rules then apply their overrides on top of it.

A pool set that returns a `fixed_response` is the complete response, so custom rules are not evaluated for that request.

## DNS-only load balancers

Country matching depends on the top-level steering policy and `location_strategy`. With a configured strategy, Geo and Proximity steering can use EDNS Client Subnet (ECS), the resolver IP address, or the responding Cloudflare data center. Without a configured strategy, Proximity uses ECS when available, while Geo uses the responding data center. Other top-level policies use the responding data center.

A pool set applies `overrides.steering_policy` after evaluating its match. The override therefore cannot change the location used for country matching. For more information, refer to [EDNS Client Subnet (ECS) support](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/#edns-client-subnet-ecs-support).

## Limits

Pool sets are subject to the following limits:

| Limit                                        | Value |
| -------------------------------------------- | ----- |
| Pool sets per load balancer                  | 1,000 |
| Characters in name                           | 200   |
| Entries per pops, countries, or regions list | 1,000 |

Duplicate entries within a single `pops`, `countries`, or `regions` list are rejected.

Caution

A pool referenced by a pool set cannot be [deleted](https://developers.cloudflare.com/load-balancing/pools/create-pool/#delete-a-pool) until you remove it from every pool set that references it. This applies to pools in `overrides.pools`, `overrides.pool_weights`, and `overrides.fallback_pool`.

## Configure pool sets via the API

Pool sets are managed through the `pool_sets` field on the [Update Load Balancer](https://developers.cloudflare.com/api/resources/load%5Fbalancers/methods/edit/) endpoint. When you send a `PATCH` request:

* Omitting `pool_sets` leaves existing pool sets unchanged
* Sending `"pool_sets": []` removes all pool sets
* Sending `"pool_sets": null` makes no change

### Example request

Before using this example, create the referenced pools. Replace each example pool ID with an ID from your account.

This request splits Western North American traffic across two pools by weight and uses a regional fallback pool. It selects the lowest-latency pool for German traffic. A default pool set handles all remaining traffic. The load balancer uses a separate global fallback pool.

Send a `PATCH` request to `/zones/{zone_id}/load_balancers/{load_balancer_id}` with the following body:

```json
{
	"fallback_pool": "6f1ed002ab5595859014ebf0951522d9",
	"pool_sets": [
		{
			"name": "wnam-active-active",
			"match": { "topology": { "regions": ["WNAM"] } },
			"overrides": {
				"pools": [
					"17b5962d775c646f3f9725cbc7a53df4",
					"9290f38c5d07c2e2f4df57b1f61d4196"
				],
				"pool_weights": {
					"17b5962d775c646f3f9725cbc7a53df4": 0.5,
					"9290f38c5d07c2e2f4df57b1f61d4196": 0.5
				},
				"steering_policy": "random",
				"fallback_pool": "2a28d35d1c00f000540fe739a04b3230"
			}
		},
		{
			"name": "de-lowest-latency",
			"match": { "topology": { "countries": ["DE"] } },
			"overrides": {
				"pools": [
					"0930eec54a4c7ae6616985b79f678210",
					"c8b4f5a6d7e84910a2b3c4d5e6f70819"
				],
				"steering_policy": "dynamic_latency"
			}
		},
		{
			"name": "default",
			"match": { "default": true },
			"overrides": {
				"pools": ["ff02c959d17f7bb2b1184a202e3c0af7"],
				"steering_policy": "off"
			}
		}
	]
}
```

### Resulting behavior

After the request completes, the load balancer routes traffic with this configuration:

| Order | Match                        | Pools                                                              | Steering policy  | Fallback pool                    |
| ----- | ---------------------------- | ------------------------------------------------------------------ | ---------------- | -------------------------------- |
| 1     | Western North America (WNAM) | 17b5962d775c646f3f9725cbc7a53df4, 9290f38c5d07c2e2f4df57b1f61d4196 | Random, 50% each | 2a28d35d1c00f000540fe739a04b3230 |
| 2     | Germany (DE)                 | 0930eec54a4c7ae6616985b79f678210, c8b4f5a6d7e84910a2b3c4d5e6f70819 | Dynamic Latency  | Global fallback                  |
| 3     | All remaining traffic        | ff02c959d17f7bb2b1184a202e3c0af7                                   | Failover order   | Global fallback                  |

The global fallback pool is `6f1ed002ab5595859014ebf0951522d9`.

## Validation errors

Invalid Pool Sets configurations return HTTP status `400` and API error code `1002`. The error message explains the problem and can include one of these identifiers:

| Message identifier              | Cause                                                            |
| ------------------------------- | ---------------------------------------------------------------- |
| POOL\_SETS\_TOO\_LARGE          | More than 1,000 pool sets on one load balancer                   |
| POOL\_SET\_NO\_INTENT           | A pool set specifies neither overrides.pools nor fixed\_response |
| POOL\_SET\_DEFAULT\_WITH\_MATCH | A match combines default with topology                           |
| POOL\_SET\_EMPTY\_TOPOLOGY      | A topology sets none of pops, countries, or regions              |
| POOL\_SET\_TOPOLOGY\_TOO\_LARGE | A topology list exceeds 1,000 entries                            |
| POOL\_SET\_POP\_ENTITLEMENT     | The account is not entitled to data center steering              |
| POOL\_SET\_REGION\_ENTITLEMENT  | The account is not entitled to region steering                   |
| POOL\_SET\_COUNTRY\_ENTITLEMENT | The account is not entitled to country steering                  |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/pool-sets/#page","headline":"Pool sets · Cloudflare Load Balancing docs","description":"Use pool sets to define location-specific pools, steering policies, weights, and fallback behavior through the API.","url":"https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/pool-sets/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-10","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
