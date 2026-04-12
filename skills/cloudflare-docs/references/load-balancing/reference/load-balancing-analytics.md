---
title: Analytics
description: Use load balancing analytics to evaluate traffic flow, assess the health of endpoints, and review health changes over time.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/load-balancing/reference/load-balancing-analytics.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Analytics

Using load balancing analytics, you can:

* Evaluate traffic flow.
* Assess the health status of endpoints in your pools.
* Review changes in pools and pool health over time.

Note

Load balancing analytics are only available to customers on paid plans (Pro, Business, and Enterprise).

## Dashboard Analytics

### Overview metrics

To view **Overview** metrics for your load balancer, go to **Traffic** \> **Load Balancing Analytics**.

These metrics show the number of requests routed to specific pools within a load balancer, helping you:

* Evaluate the effects of adding or removing a pool.
* Decide when to create new pools.
* Plan for peak traffic demands and future infrastructure needs.

Add additional filters for specific pools, times, regions, and endpoints.

Note

Load balancing **requests** are the number of uncached requests made by your load balancer. By default, Cloudflare caches resolved IP addresses for up to five seconds.

### Latency

**Latency** metrics show an interactive map, helping you identify regions with **Unhealthy** or **Slow** pools.

To view latency information for your load balancer, go to **Traffic** \> **Load Balancing Analytics** \> **Latency**.

### Logs

**Logs** provide a history of all endpoint status changes and how they affect your load balancing pools. Load Balancing only logs events that represent a status change for an endpoint, from healthy to unhealthy or vice versa.

When a Monitor Group is attached to a pool, each logged health event includes the `monitors` field. This field lists the individual monitors within the group and their results, making it easier to see which monitor contributed to a status change.

Example event (truncated):

```

{

  "id": <id>,

  "timestamp": "2025-09-22 19:22:00",

  "pool": {

    "id": "<id>",

    "name": "example-monitor-group-test-pool-us",

    "healthy": true,

    "changed": false,

    "minimum_origins": 1

  },

  "origins": [

    {

      "name": "origin-a",

      "ip": "192.0.2.10",

      "enabled": true,

      "healthy": true,

      "failure_reason": "No failures",

      "response_code": 200,

      "monitors": [

        {

          "id": "<id>",

          "healthy": true,

          "failure_reason": "No failures",

          "response_code": 200,

          "must_be_healthy": true,

          "monitoring_only": false

        },

        {

          "id": "<id>",

          "healthy": true,

          "failure_reason": "No failures",

          "response_code": 200,

          "must_be_healthy": true,

          "monitoring_only": false

        },

        {

          "id": "<id>",

          "healthy": false,

          "failure_reason": "HTTP timeout occurred",

          "must_be_healthy": false,

          "monitoring_only": true

        }

      ]

    },

    {

      "name": "origin-b",

      "ip": "198.51.100.25",

      "enabled": true,

      "healthy": false,

      "failure_reason": "TCP connection failed",

      "changed": true,

      "monitors": [

        {

          "id": "<id>",

          "healthy": false,

          "failure_reason": "TCP connection failed",

          "must_be_healthy": true,

          "monitoring_only": false

        },

        {

          "id": "<id>",

          "healthy": true,

          "failure_reason": "No failures",

          "response_code": 200,

          "must_be_healthy": true,

          "monitoring_only": false

        },

        {

          "id": "<id>",

          "healthy": false,

          "failure_reason": "HTTP timeout occurred",

          "must_be_healthy": false,

          "monitoring_only": true

        }

      ]

    }

  ]

}


```

Explain Code

In this example:

* Each origin includes a `monitors` array listing all monitors within the attached group.
* Fields such as `must_be_healthy` `and monitoring_only` indicate each monitor's role in determining the origin's overall health.
* The `healthy` and `failure_reason` fields show which individual monitor checks succeeded or failed.

To access logs in the dashboard, go to **Traffic** \> **Load Balancing Analytics**.

## GraphQL Analytics

For more flexibility, get load balancing metrics directly from the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/).

Get started with a sample query:

Requests per pool

This query shows the number of requests each pool receives from each location in Cloudflare's global network.

Query

```

query RequestsPerPool($zoneTag: string, $start: Time, $end: Time) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      loadBalancingRequestsAdaptiveGroups(

        limit: 100

        filter: {

          datetime_geq: $start

          datetime_leq: $end

          lbName: "lb.example.com"

        }

        orderBy: [datetimeFifteenMinutes_DESC]

      ) {

        count

        dimensions {

          datetimeFifteenMinutes

          coloCode

          selectedPoolName

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBASmUYDOAXZAFSGD2OA2AFACQBeOAdmACoCGA5gFwxoQCWF9ANDMWrRFTNqbALZgexMBQAmwsWACUMAN4AoGDABubMAHdIqjZpjkqyQgDM2+VJGYrTlGg2ZlndejAC+y9SZN8HFoZACFafFoKAGMOegQkNGQAQRlaAAdUNi0wAHEIHBB0i2MAzXwxNiEYAEYABjrSsutbeyMysrS7LPEAfXpEN35BJo6usB6wXvxB3mkZUbL8ACMAOVpxZgAiFYA6MAAPDfSZ3eicUS3FzW9rmBwIGUhQqGYAbXHJgDE2SztpACyHBAdmQvQAIgBRADKAGEALqLPx3c4gCioO4yBQUZBsSjIdodEyfBQ-P5gQHA0F3TTnIKwnBPGksMAzaJ2GS4AjrcR3W4dfkmQW3bxAA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAGhAGcAXBAJxrRACYAGFgNgFo2AWbgEZBcQX1R8ArKkFsMFEDCgATZuy68BwuOwnTZ8gL5A)

Response (truncated)

```

{

    "data": {

        "viewer": {

            "zones": [

                {

                    "loadBalancingRequestsAdaptiveGroups": [

                        {

                            "count": 4,

                            "dimensions": {

                                "coloCode": "IAD",

                                "datetimeFifteenMinutes": "2021-06-26T00:45:00Z",

                                "selectedPoolName": "us-east"

                            }

                        },

                        ...

                    ]

                }

            ]

        }

    }

}


```

Explain Code

Requests per data center

This query shows the weighted, round-trip time (RTT) measurement (`avgRttMs`) for monitor requests from a specific data center (for example, Singapore or `SIN`) to each pool in a specific load balancer.

Warning

Note that `avgRttMs` refers to the round-trip time that is measured by the monitors and used in steering decisions. `avgRttMs` is different from the raw RTT for individual requests that reach the Cloudflare network.

Query

```

query RequestsPerDataCenter($zoneTag: string, $start: Time, $end: Time) {

  viewer {

    zones(filter: { zoneTag: $zoneTag }) {

      loadBalancingRequestsAdaptive(

        limit: 100

        filter: {

          datetime_geq: $start

          datetime_leq: $end

          lbName: "lb.example.com"

          coloCode: "SIN"

        }

        orderBy: [datetime_DESC]

      ) {

        selectedPoolName

        pools {

          poolName

          healthy

          healthCheckEnabled

          avgRttMs

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBASmUYDOAXZAFSARAhq3AYTADtVIAKAEgC8B7EsAFVwHMAuGNCASxNYA0MKmlwRUnJjwC2YIVVIATSTLABKGAG8AUDBgA3HmADukLbr0x6jZBQBmPADbkInTVYbM2nWp5asYAF8NHUtLRzpcRQAhXEdcEgBjPlYEJDRkAEFFXAAHVB59MAoLML1HGR4JGABGAAY60rKHZ0g3JrKYHPIC2QB9VkQfUXEOsu6wXrA+xyHhJTGwxwAjADlcWU4AIhWAOjAADw3c2d3EumktxctziMI6RTBtgGUASVWrzr1A67oIR4g0SgnAA2hMpn1sABRZ6EAC6YxC12QYFmiXIigwdDojnWsmuuWxjmQ5i+lkJOLxYGuegAFmA4qhaVAaTB6YzaYR6YkANZQki4ZazRSs3D6VKoVAAWWQ1x+nXllkVP0CQA&variables=N4IgXg9gdgpgKgQwOYgFwgFoHkByBRAfQEkAREAGhAGcAXBAJxrRACYAGFgNgFo2AWbgEZBcQX1R8ArKkFsMFEDCgATZuy68BwuOwnTZ8gL5A)

Response (truncated)

```

{

    "data": {

        "viewer": {

            "zones": [

                {

                    "loadBalancingRequestsAdaptive": [

                        {

                            "pools": [

                                {

                                    "avgRttMs": 67,

                                    "healthCheckEnabled": 1,

                                    "healthy": 1,

                                    "poolName": "asia-ne"

                                },

                                {

                                    "avgRttMs": 156,

                                    "healthCheckEnabled": 1,

                                    "healthy": 1,

                                    "poolName": "us-east_and_asia-ne"

                                },

                                {

                                    "avgRttMs": 237,

                                    "healthCheckEnabled": 1,

                                    "healthy": 1,

                                    "poolName": "us-east"

                                },

                            ],

                            "selectedPoolName": "asia-ne"

                        },

                    ...

                    ]

                }

            ]

        }

    }

}


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/reference/load-balancing-analytics/","name":"Analytics"}}]}
```
