---
title: Manage pools
description: Learn how to set up and maintain pools.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/load-balancing/pools/create-pool.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Manage pools

Within Cloudflare, pools represent your endpoints and how they are organized. As such, a pool can be a group of several endpoints, or you could also have only one endpoint (an origin server, for example) per pool.

If you are familiar with DNS terminology, think of a pool as a “record set,” except Cloudflare only returns addresses that are considered healthy. You can attach health monitors to individual pools for customized monitoring. A pool can have either a single monitor or a monitor group attached — but not both.

For more background information on pools, refer to [Pools](https://developers.cloudflare.com/load-balancing/pools/).

Warning

Since load balancing targets are not limited to origin web servers, the term `endpoints` has been introduced. Refer to [Service-Specific Terms ↗](https://www.cloudflare.com/service-specific-terms-other-terms/) for its use in the context of Cloudflare offerings, and to [load balancing concepts](https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-components/) or [Reference Architecture](https://developers.cloudflare.com/reference-architecture/architectures/load-balancing/) for use case examples.

On the [Load Balancing API](https://developers.cloudflare.com/api/resources/load%5Fbalancers/methods/get/), `origin` has been maintained.

---

## Create a pool

* [ Dashboard ](#tab-panel-5352)
* [ API ](#tab-panel-5353)

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

---

## Edit a pool

* [ Dashboard ](#tab-panel-5348)
* [ API ](#tab-panel-5349)

To edit a pool in the dashboard:

1. Go to **Load Balancing**.
2. Select the **Pools** tab.
3. On a specific pool, select **Edit**.
4. Update settings as needed.
5. Select **Save**.

When you edit a pool with the API, your request type depends on how much you want to edit.

To update specific settings without having to resubmit the entire configuration, use a [PATCH](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/methods/edit/) request. For broader changes, use a [PUT](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/methods/update/) request.

---

## Delete a pool

You cannot delete pools that are in use by load balancers. This includes [geo steering regions](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/geo-steering/#region-steering) pools as well as [fallback pools](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/#fallback-pools).

If you get an error when trying to delete a pool, consider the hostnames listed in the error and [edit the respective load balancers](https://developers.cloudflare.com/load-balancing/load-balancers/create-load-balancer/), making sure to remove all references to the pool.

Note

If the pool is referenced by geo steering, the configuration is **not** automatically removed when you change to a different **Traffic Steering** method. To make sure you remove it, select **Geo Steering**, remove the pool, and then apply and save any other necessary changes.

* [ Dashboard ](#tab-panel-5350)
* [ API ](#tab-panel-5351)

To delete a pool in the dashboard:

1. Go to **Load Balancing**.
2. Select the **Pools** tab.
3. On a specific pool, select **Delete**.

To delete a pool using the API, send a [DELETE](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/methods/delete/) request.

---

## Set up alerts

You can configure alerts to receive notifications for changes in the status of your pools.

Pool Enablement

**Who is it for?**

Customers who want to be warned about status changes (enabled/disabled) in their pools.

**Other options / filters**

Available filters include:

* You can search for and add pools from your list of pools. If no pools are selected, the alert will apply to all pools in the account.
* You can also choose the trigger that fires the notification when the Load Balancing pool is **enabled**, **disabled**, and **either enabled or disabled**.
**Included with**

Purchase of [Load Balancing](https://developers.cloudflare.com/load-balancing/get-started/enable-load-balancing/).

**What should you do if you receive one?**

No action is needed.

Load Balancing Health Alert

**Who is it for?**

Customers who want to be warned about [changes in health status](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/) in their pools or origins.

**Other options / filters**

Available filters include:

* You can search for and add pools from your list of pools, as well as **Include future pools** (if all pools are selected).
* You can choose the trigger that fires the notification when the health status becomes **unhealthy**, **healthy**, or **either unhealthy or healthy**
* You can choose the trigger that fires the notification when the event source health status changes in **pool**, **origin**, or **either pool or origin**.
**Included with**

Purchase of [Load Balancing](https://developers.cloudflare.com/load-balancing/get-started/enable-load-balancing/).

**What should you do if you receive one?**

Evaluate [load balancing analytics](https://developers.cloudflare.com/load-balancing/reference/load-balancing-analytics/) to review changes in health status over time.

Refer to [Cloudflare Notifications](https://developers.cloudflare.com/notifications/get-started/) for more information on how to set up an alert.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/pools/","name":"Pools"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/pools/create-pool/","name":"Manage pools"}}]}
```
