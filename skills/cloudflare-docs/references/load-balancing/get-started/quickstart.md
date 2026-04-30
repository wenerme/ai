---
title: Quickstart
description: Create a load balancer with pools and monitors in a few steps.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Quickstart

Get up and running quickly with Load Balancing. For more in-depth explanations, refer to the [Learning path](https://developers.cloudflare.com/learning-paths/load-balancing/concepts/).

This guide assumes you are familiar with the Cloudflare [Load Balancing components](https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-components/).

  
---

## Before you begin

Make sure you:

* Have access to multiple endpoints (origin servers, private or public IP addresses, virtual IP addresses (VIPs), etc), either physical or cloud-based.
* Have access to Load Balancing, available as an [add-on](https://developers.cloudflare.com/load-balancing/get-started/enable-load-balancing/) for any type of account.
* Have test and production hostnames that are covered by [SSL/TLS certificates](https://developers.cloudflare.com/load-balancing/load-balancers/dns-records/#ssltls-coverage).

## Create a monitor

A monitor issues health monitor requests at regular intervals to evaluate the health of each endpoint within a [pool](https://developers.cloudflare.com/load-balancing/pools/).

When a pool [becomes unhealthy](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/), your load balancer takes that pool out of the endpoint rotation.

* [ Dashboard ](#tab-panel-6687)
* [ API ](#tab-panel-6688)

**Set up the monitor**

You can create a monitor within the [load balancer workflow](https://developers.cloudflare.com/load-balancing/load-balancers/create-load-balancer/) or in the **Monitors** tab:

1. Go to **Load Balancing**.
2. Select the **Monitors** tab.
3. Select **Create monitor**.
4. Add the following information:  
   * **Type**: The protocol to use for health monitors  
         * _Non-enterprise customers_: Choose **HTTP**, **HTTPS**, or **TCP**.  
         * _Enterprise customers_: Choose **HTTP**, **HTTPS**, **TCP**, **UDP ICMP**, **ICMP Ping**, or **SMTP**.  
   * **Path**: The endpoint path to run health monitor requests against  
   * **Port**: The destination port for health monitors
5. For additional settings, select **Advanced health monitor settings**:  
   * **Interval**:  
         * By increasing the default, you can improve failover time, but you may also increase load on your endpoints.  
         * Minimum time in seconds is 60 (Pro), 15 (Business), and 10 (Enterprise).  
   * **Timeout** and **Retries**:  
         * The health monitor request will return unhealthy if it exceeds the duration specified in **Timeout** (and exceeds this duration more times than the specified number of **Retries**).  
   * **Expected Code(s)**: The expected HTTP response codes listed individually (`200`, `302`) or as a range (for example, entering `2xx` would cover all response codes in the `200` range).  
   * **Response Body**:  
         * Looks for a case-insensitive substring in the response body.  
         * Make sure that the value is relatively static and within the first 10 KB of the HTML page.  
   * **Simulate Zone**:  
         * It is recommended to use the same zone in which the Load Balancer exists.  
         * Changes the egress zone settings of a health monitor request to ensure compatibility with features like [authenticated origin pulls](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/), [Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/), and [Dedicated CDN Egress IPs](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/).  
   * **Follow Redirects**:  
         * Instead of reporting a `301` or `302` code as unhealthy, the health monitor request follows redirects to the final endpoint.  
   * **Configure Request Header(s)**:  
         * Useful if your endpoints are expecting specific incoming headers.  
   * **Header**:  
         * The HTTP request headers to send in the health monitor. It is recommended that you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP and HTTPS monitors.
6. Select **Save**.

Note

To increase confidence in pool status, you can also increase the `consecutive_up` and `consecutive_down` fields when [creating a monitor with the API](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/monitors/methods/create/).

To become healthy or unhealthy, monitored endpoints must pass this health monitor request the consecutive number of times specified in these parameters.

**Prepare your servers**

Make sure that your firewall or web server does not block or rate limit your configured health monitors or requests associated with [Cloudflare IP addresses ↗](https://www.cloudflare.com/ips).

Each health monitor has the HTTP user-agent of `"Mozilla/5.0 (compatible; Cloudflare-Traffic-Manager/1.0; +https://www.cloudflare.com/traffic-manager/; pool-id: $poolid)"`, where the `$poolid` is the first 16 characters of the [associated pool](https://developers.cloudflare.com/load-balancing/pools/).

Warning

If you know that your endpoint is healthy but Load Balancing is reporting it as unhealthy, refer to our [Monitor troubleshooting guide](https://developers.cloudflare.com/load-balancing/troubleshooting/load-balancing-faq/#why-is-my-endpoint-or-pool-considered-unhealthy).

**Set up the monitor**

For a full list of monitor properties, refer to [Create Monitor](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/monitors/methods/create/). If you need help with API authentication, refer to [Cloudflare API documentation](https://developers.cloudflare.com/fundamentals/api/).

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Load Balancing: Monitors and Pools Write`

Create Monitor

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "type": "https",

    "description": "Login page monitor",

    "method": "GET",

    "path": "/health",

    "header": {

        "Host": [

            "example.com"

        ],

        "X-App-ID": [

            "abc123"

        ]

    },

    "port": 8080,

    "timeout": 3,

    "retries": 0,

    "interval": 90,

    "expected_body": "alive",

    "expected_codes": "2xx",

    "follow_redirects": true,

    "allow_insecure": true,

    "consecutive_up": 3,

    "consecutive_down": 2,

    "probe_zone": "example.com"

  }'


```

The response contains the complete definition of the new monitor.

Response

```

{

  "success": true,

  "errors": [],

  "messages": [],

  "result": {

    "id": ":monitor-id",

    "created_on": "2021-01-01T05:20:00.12345Z",

    "modified_on": "2021-01-01T05:20:00.12345Z",

    "type": "https",

    "description": "Login page monitor",

    "method": "GET",

    "path": "/health",

    "header": {

      "Host": [

        "example.com"

      ],

      "X-App-ID": [

        "abc123"

      ]

    },

    "port": 8080,

    "timeout": 3,

    "retries": 0,

    "interval": 90,

    "expected_body": "alive",

    "expected_codes": "2xx",

    "follow_redirects": true,

    "allow_insecure": true,

    "consecutive_up": 3,

    "consecutive_down": 2,

    "probe_zone": "example.com"

  }

}


```

**Prepare your servers**

Make sure that your firewall or web server does not block or rate limit your configured health monitors or requests associated with [Cloudflare IP addresses ↗](https://www.cloudflare.com/ips).

Each health monitor has the HTTP user-agent of `"Mozilla/5.0 (compatible; Cloudflare-Traffic-Manager/1.0; +https://www.cloudflare.com/traffic-manager/; pool-id: $poolid)"`, where the `$poolid` is the first 16 characters of the [associated pool](https://developers.cloudflare.com/load-balancing/pools/).

Warning

If you know that your endpoint is healthy but Load Balancing is reporting it as unhealthy, refer to our [Monitor troubleshooting guide](https://developers.cloudflare.com/load-balancing/troubleshooting/load-balancing-faq/#why-is-my-endpoint-or-pool-considered-unhealthy).

Example monitor configuration

| Field            | Value     |
| ---------------- | --------- |
| Type             | HTTP      |
| Path             | /         |
| Port             | 80        |
| Interval         | 60        |
| Method           | GET       |
| Timeout          | 5 seconds |
| Retries          | 2         |
| Expected Code(s) | 200       |

## Create pools

Within Cloudflare, pools represent your endpoints and how they are organized. As such, a pool can be a group of several endpoints, or you could also have only one endpoint (an origin server, for example) per pool.

If you are familiar with DNS terminology, think of a pool as a “record set,” except Cloudflare only returns addresses that are considered healthy. You can attach health monitors to individual pools for customized monitoring. A pool can have either a single monitor or a monitor group attached — but not both.

* [ Dashboard ](#tab-panel-6691)
* [ API ](#tab-panel-6692)

You can create a pool within the [load balancer workflow](https://developers.cloudflare.com/load-balancing/load-balancers/create-load-balancer/) or in the **Pools** tab:

1. Go to **Load Balancing**.
2. Select the **Pools** tab and then **Create pool**.
3. For your pool, enter the following information:  
   * A name (must be unique)  
   * A description to provide more detail on the name  
   * A choice for [**Endpoint Steering**](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/), which affects how your pool routes traffic to each endpoint
4. For each endpoint, enter the following information:  
   * A name (must be unique)  
   * The endpoint address or associated hostname  
   * (Optional) A [**Virtual Network**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/). Required when the endpoint has a private IP address.  
   * A [**Weight**](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights)  
   * (Optional) A [hostname](https://developers.cloudflare.com/load-balancing/additional-options/override-http-host-headers/) by clicking **Add host header**  
   * (Optional) The destination port to which the traffic will be served.

Note

If your endpoint is a website or application hosted on [Cloudflare Pages](https://developers.cloudflare.com/pages/), you will need to fill in the host header field with the project domain for it to resolve correctly.

1. Repeat this process for additional endpoints in the pool.
2. (Optional) Set up coordinates for [Proximity Steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/proximity-steering/) on the pool.
3. On the pool, update the following information:  
   * **Health Threshold**:  
   The Health Threshold is the number of healthy endpoints for the pool as a whole to be considered _Healthy_ and receive traffic based on pool order in a load balancer. Increasing this number makes the pool more reliable, but also more likely to become unhealthy.  
   * **Monitor**: Attach a [monitor](https://developers.cloudflare.com/load-balancing/monitors/create-monitor/)  
   * **Health Monitor Regions**: Choose whether to check pool health from [multiple locations](https://developers.cloudflare.com/load-balancing/monitors/#health-monitor-regions), which increases accuracy but can lead to probe traffic to your endpoint  
   * **Pool Notifications**: You can set up new alerts - and view existing alerts - to be notified when pools are enabled or disabled, or pools or endpoints have changes in their [health status](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/).
4. When finished, select **Save**.

For a full list of properties, refer to [Create Pool](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/methods/create/). If you need help with API authentication, refer to [Cloudflare API documentation](https://developers.cloudflare.com/fundamentals/api/).

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Load Balancing: Monitors and Pools Write`

Create Pool

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/pools" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "description": "Primary data center - Provider XYZ",

    "name": "primary-dc-1",

    "enabled": false,

    "load_shedding": {

        "default_percent": 0,

        "default_policy": "random",

        "session_percent": 0,

        "session_policy": "hash"

    },

    "minimum_origins": 2,

    "monitor": "f1aba936b94213e5b8dca0c0dbf1f9cc",

    "check_regions": [

        "WEU",

        "ENAM"

    ],

    "origins": [

        {

            "name": "app-server-1",

            "address": "0.0.0.0",

            "enabled": true,

            "weight": 0.56,

            "header": {

                "Host": [

                    "example.com"

                ]

            }

        }

    ],

    "origin_steering": {

        "policy": "random"

    },

    "notification_filter": {

        "origin": {

            "disable": false,

            "healthy": null

        },

        "pool": {

            "disable": false,

            "healthy": null

        }

    }

  }'


```

The response contains the complete definition of the new pool.

Response

```

{

  "success": true,

  "errors": [],

  "messages": [],

  "result": {

    "id": "17b5962d775c646f3f9725cbc7a53df4",

    "created_on": "2021-01-01T05:20:00.12345Z",

    "modified_on": "2021-01-01T05:20:00.12345Z",

    "description": "Primary data center - Provider XYZ",

    "name": "primary-dc-1",

    "enabled": false,

    "load_shedding": {

      "default_percent": 0,

      "default_policy": "random",

      "session_percent": 0,

      "session_policy": "hash"

    },

    "minimum_origins": 2,

    "monitor": "f1aba936b94213e5b8dca0c0dbf1f9cc",

    "check_regions": [

      "WEU",

      "ENAM"

    ],

    "origins": [

      {

        "name": "app-server-1",

        "address": "0.0.0.0",

        "enabled": true,

        "weight": 0.56,

        "header": {

          "Host": [

            "example.com"

          ]

        }

      }

    ],

    "origin_steering": {

      "policy": "random"

    },

    "notification_filter": {

      "origin": {

        "disable": false,

        "healthy": null

      },

      "pool": {

        "disable": false,

        "healthy": null

      }

    }

  }

}


```

After creating the pool, you would also want to [create a new notification](https://developers.cloudflare.com/api/resources/alerting/subresources/policies/methods/create/) with the following parameters specified:

```

"alert_type": "load_balancing_health_alert",

"filters": {

  "pool_id": <<ARRAY_OF_INCLUDED_POOL_IDS>>,

  "new_health": <<ARRAY_OF_STATUS_TRIGGERS>> ["Unhealthy", "Healthy"],

  "event_source": <<ARRAY_OF_OBJECTS_WATCHED>> ["pool", "origin"]

}


```

## Confirm pool health

Before directing any traffic to your pools, make sure that your pools and monitors are set up correctly. The status of your health check will be _unknown_ until the results of the first check are available.

* [ Dashboard ](#tab-panel-6685)
* [ API ](#tab-panel-6686)

To confirm pool health using the dashboard:

1. Go to **Load Balancing**.
2. Select the **Pools** tab.
3. For pools and individual endpoints, review the values in the **Health** and **Endpoint Health** columns.

For more information on pool and endpoint health statuses, refer to [How a pool becomes unhealthy](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/#how-a-pool-becomes-unhealthy).

To fetch the latest health status of all pools, use the [List Pools](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/methods/list/) command, paying attention to the `healthy` value for pools and origins (endpoints).

For troubleshooting a specific pool's health, use the [Pool Health Details](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/subresources/health/methods/get/) command.

### Unexpected health status

If you notice that healthy pools are being marked unhealthy:

* Review [how endpoints and pools become unhealthy](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/).
* Refer to the [Troubleshooting section](https://developers.cloudflare.com/load-balancing/troubleshooting/).

## Create a load balancer on a test subdomain

Instead of starting on your production domain, you likely should create a load balancer on a test or staging domain. This may involve temporary changes to your monitors and pools, depending on your infrastructure setup.

Starting with a test domain allows you to verify everything is working correctly before routing production traffic.

* [ Dashboard ](#tab-panel-6689)
* [ API ](#tab-panel-6690)

To create a Public or a Private load balancer in the dashboard:

### Create a Public load balancer

1. Go to **Load Balancing** and select **Create load balancer**.
2. On the **Load Balancer Setup**, select **Public load balancer**
3. Choose the website to which you want to add this load balancer.
4. On the **Hostname** page:  
   * Enter a **Hostname**, which is the DNS name at which the load balancer is available. For more details on record priority, refer to [DNS records for load balancing](https://developers.cloudflare.com/load-balancing/load-balancers/dns-records/).  
   * From the **Data Localization** dropdown, select the [region](https://developers.cloudflare.com/data-localization/how-to/load-balancing/#regional-services) you would like to use on your domain.  
   * Toggle the orange cloud icon to update the [proxy mode](https://developers.cloudflare.com/load-balancing/understand-basics/proxy-modes/), which affects how traffic is routed and which IP addresses are advertised.  
   * Add a description for your load balancer.  
   * If you want [session-based load balancing](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/), toggle the **Session Affinity** switch.  
   * If you want [Adaptive Routing](https://developers.cloudflare.com/load-balancing/understand-basics/adaptive-routing/), toggle the **Adaptive Routing** switch.
5. Select **Next**.
6. On the **Add a Pool** page:  
   * Select one or more existing pools or [create a new pool](https://developers.cloudflare.com/load-balancing/pools/create-pool/#create-a-pool).  
   * If you are going to set [traffic steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/standard-options/) to **Off**, re-order the pools in your load balancer to adjust the fallback order.  
   * If needed, update the [**Fallback Pool**](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/#fallback-pools).  
   * If you choose to set traffic steering to **Random**, you can set [Weights](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/standard-options/#random-steering) (via the API) to your pools to determine the percentage of traffic sent to each pool.
7. Select **Next**.
8. On the **Monitors** page:  
   * Review the monitors attached to your pools.  
   * If needed, you can attach an existing monitor or [create a new monitor](https://developers.cloudflare.com/load-balancing/monitors/create-monitor/#create-a-monitor).
9. Select **Next**.
10. On the **Traffic Steering** page, choose an option for [Traffic steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/) and select **Next**.
11. On the **Custom Rules** page, select an existing rule or [create a new rule](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/).
12. Select **Next**.
13. On the **Review** page:  
   * Review your configuration and make any changes.  
   * Choose whether to **Save as Draft** or **Save and Deploy**.

### Create a Private load balancer

1. Go to **Load Balancing** and select **Create load balancer**.
2. On the **Load Balancer Setup**, select **Private load balancer**
3. Associate your load balancer with either a Cloudflare private IP or a specified IP address and create a description for your load balancer.
4. On the **Add a Pool** page:  
   * Select one or more existing pools or [create a new pool](https://developers.cloudflare.com/load-balancing/pools/create-pool/#create-a-pool).  
   * If you are going to set [traffic steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/standard-options/) to **Off**, re-order the pools in your load balancer to adjust the fallback order.  
   * If needed, update the [**Fallback Pool**](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/#fallback-pools).  
   * If you choose to set traffic steering to **Random**, you can set [Weights](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/standard-options/#random-steering) (via the API) to your pools to determine the percentage of traffic sent to each pool.
5. Select **Next**.
6. On the **Monitors** page:  
   * Review the monitors attached to your pools.  
   * If needed, you can attach an existing monitor or [create a new monitor](https://developers.cloudflare.com/load-balancing/monitors/create-monitor/#create-a-monitor).
7. Select **Next**.
8. On the **Traffic Steering** page, choose an option for [Traffic steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/) and select **Next**.
9. Select **Next**.
10. On the **Review** page:  
   * Review your configuration and make any changes.  
   * Choose whether to **Save as Draft** or **Save and Deploy**.

For a full list of properties, refer to [Create Load Balancer](https://developers.cloudflare.com/api/resources/load%5Fbalancers/methods/create/). If you need help with API authentication, refer to [Cloudflare API documentation](https://developers.cloudflare.com/fundamentals/api/).

Note

Since load balancers only exist on a zone — and not an account — you may need to get the zone `id` with the [List Zones](https://developers.cloudflare.com/api/resources/zones/methods/list/) command.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Load Balancers Write`

Create Load Balancer

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/load_balancers" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "description": "Load Balancer for lb.example.com",

    "name": "lb.example.com",

    "enabled": true,

    "ttl": 30,

    "fallback_pool": "17b5962d775c646f3f9725cbc7a53df4",

    "default_pools": [

        "17b5962d775c646f3f9725cbc7a53df4",

        "9290f38c5d07c2e2f4df57b1f61d4196",

        "00920f38ce07c2e2f4df50b1f61d4194"

    ],

    "proxied": true,

    "steering_policy": "random_steering",

    "session_affinity": "cookie",

    "session_affinity_attributes": {

        "samesite": "Auto",

        "secure": "Auto",

        "drain_duration": 100,

        "zero_downtime_failover": "sticky"

    },

    "session_affinity_ttl": 5000,

    "adaptive_routing": {

        "failover_across_pools": true

    },

    "location_strategy": {

        "prefer_ecs": "always",

        "mode": "resolver_ip"

    },

    "random_steering": {

        "pool_weights": {

            "de90f38ced07c2e2f4df50b1f61d4194": 0.3,

            "9290f38c5d07c2e2f4df57b1f61d4196": 0.5

        },

        "default_weight": 0.2

    }

  }'


```

The response contains the complete definition of the new load balancer.

Response

```

{

  "success": true,

  "errors": [],

  "messages": [],

  "result": {

    "id": "699d98642c564d2e855e9661899b7252",

    "created_on": "2021-01-01T05:20:00.12345Z",

    "modified_on": "2021-01-01T05:20:00.12345Z",

    "description": "Load Balancer for lb.example.com",

    "name": "lb.example.com",

    "enabled": true,

    "ttl": 30,

    "fallback_pool": "17b5962d775c646f3f9725cbc7a53df4",

    "default_pools": [

      "17b5962d775c646f3f9725cbc7a53df4",

      "9290f38c5d07c2e2f4df57b1f61d4196",

      "00920f38ce07c2e2f4df50b1f61d4194"

    ],

    "proxied": true,

    "steering_policy": "random_steering",

    "session_affinity": "cookie",

    "session_affinity_attributes": {

      "samesite": "Auto",

      "secure": "Auto",

      "drain_duration": 100,

      "zero_downtime_failover": "sticky"

    },

    "session_affinity_ttl": 5000,

    "random_steering": {

      "pool_weights": {

        "de90f38ced07c2e2f4df50b1f61d4194": 0.3,

        "9290f38c5d07c2e2f4df57b1f61d4196": 0.5

      },

      "default_weight": 0.2

    }

  }

}


```

## Optional - Review load balancing analytics

As you send sample requests to your test domain, review the [load balancing analytics](https://developers.cloudflare.com/load-balancing/reference/load-balancing-analytics/) page to make sure your load balancer is distributing requests like you were expecting.

## Route production traffic

Now that you have set up your load balancer and verified everything is working correctly, you can put the load balancer on a live domain or subdomain:

1. If you update your pools and monitors, review the pool health again to make sure everything is working as expected.
2. Confirm that your production hostname has the correct [priority order](https://developers.cloudflare.com/load-balancing/load-balancers/dns-records/#priority-order) of DNS records and is covered by an [SSL/TLS certificate](https://developers.cloudflare.com/load-balancing/load-balancers/dns-records/#ssltls-coverage).
3. Configure your load balancer to receive production traffic, which could involve either:  
   * Editing the **Hostname** of your existing load balancer.  
   * Updating the `CNAME` record sending traffic to your load balancer.

Note

If you have an Enterprise account, also evaluate your application for any excluded paths. For example, you might not want the load balancer to distribute requests directed at your `/admin` path. For any exceptions, set up an [origin rule](https://developers.cloudflare.com/rules/origin-rules/features/#dns-record).

## Optional - Next steps

Your load balancer should be receiving production traffic (and you can confirm this by reviewing the [analytics](https://developers.cloudflare.com/load-balancing/reference/load-balancing-analytics/)).

Though your product is officially set up, you may want to consider the following suggestions.

### Usage-based notifications

Since this is a service with [usage-based billing](https://developers.cloudflare.com/billing/understand/usage-based-billing/), Cloudflare recommends that you set up usage-based billing notifications to avoid unexpected bills.

To set up those notifications:

1. In the Cloudflare dashboard, go to the **Notifications** page.  
[ Go to **Notifications** ](https://dash.cloudflare.com/?to=/:account/notifications)
2. On **Alert Type** of **Usage Based Billing**, click **Select**.
3. Fill out the following information:  
   * **Name**  
   * **Product**  
   * **Notification limit** (exact metric will vary based on product)  
   * **Notification email**  
Note  
Some plans also have access to alerts through [PagerDuty](https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/) and [Webhooks](https://developers.cloudflare.com/notifications/get-started/configure-webhooks/).
4. Select **Save**.

### Additional configuration options

You may want to further customize how your load balancer routes traffic or integrate your load balancer with other Cloudflare products:

* [ Additional DNS records ](https://developers.cloudflare.com/load-balancing/additional-options/additional-dns-records/)
* [ Cloudflare Tunnel (published applications) ](https://developers.cloudflare.com/load-balancing/additional-options/cloudflare-tunnel/)
* [ Spectrum ](https://developers.cloudflare.com/load-balancing/additional-options/spectrum/)
* [ Perform planned maintenance ](https://developers.cloudflare.com/load-balancing/additional-options/planned-maintenance/)
* [ Load shedding ](https://developers.cloudflare.com/load-balancing/additional-options/load-shedding/)
* [ DNS persistence ](https://developers.cloudflare.com/load-balancing/additional-options/dns-persistence/)
* [ Load Balancing with the China Network ](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-china/)
* [ Override HTTP Host headers ](https://developers.cloudflare.com/load-balancing/additional-options/override-http-host-headers/)
* [ Custom load balancing rules ](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/)
* [ Integrate with PagerDuty ](https://developers.cloudflare.com/load-balancing/additional-options/pagerduty-integration/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/get-started/quickstart/","name":"Quickstart"}}]}
```
