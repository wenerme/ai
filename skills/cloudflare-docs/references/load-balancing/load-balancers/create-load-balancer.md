---
title: Manage load balancers
description: Learn how to set up and maintain load balancers.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/load-balancing/load-balancers/create-load-balancer.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Manage load balancers

A load balancer distributes traffic among pools according to [pool health](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/) and [traffic steering policies](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/). Each load balancer is identified by its DNS hostname (`lb.example.com`, `dev.example.com`, etc.) or IP address.

  
For more details about load balancers, refer to [Load balancers](https://developers.cloudflare.com/load-balancing/load-balancers/).

## Create a load balancer

* [ Dashboard ](#tab-panel-5356)
* [ API ](#tab-panel-5357)

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

### Sharing your load balancer with other sites

You can share your load balancer with other sites in your account by [creating a canonical name (CNAME) record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/). This is useful for sharing configurations with multiple other domains so you do not have to create new load balancers for each site.

You can also configure separate load balancers for each domain and reuse monitors and pools. This is especially useful for changing the failover order for different domains, such as when your `example.co.uk` server has a different failover priority from `example.com` or `example.com.au`.

Note

Sharing load balancers across sites is only supported if the target zone is on a [full DNS setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/). It is not supported if the target zone is on a `CNAME` setup.

---

## Edit a load balancer

* [ Dashboard ](#tab-panel-5352)
* [ API ](#tab-panel-5353)

To edit a load balancer in the dashboard:

1. Go to **Load Balancing**.
2. On a specific load balancer, select **Edit**.
3. While going through the [creation workflow](#create-a-load-balancer), update settings as needed.
4. On the **Review** step, select **Save**.

When you edit a load balancer with the API, your request type depends on how much you want to edit.

To update specific settings without having to resubmit the entire configuration, use a [PATCH](https://developers.cloudflare.com/api/resources/load%5Fbalancers/methods/edit/) request. For broader changes, use a [PUT](https://developers.cloudflare.com/api/resources/load%5Fbalancers/methods/update/) request.

---

## Delete a load balancer

If you delete or disable a load balancer, your endpoint's response to requests will depend on your [existing DNS records](https://developers.cloudflare.com/load-balancing/load-balancers/dns-records/#disabling-a-load-balancer).

* [ Dashboard ](#tab-panel-5354)
* [ API ](#tab-panel-5355)

To delete a load balancer in the dashboard:

1. Go to **Load Balancing**.
2. On a specific load balancer, click **Delete**.

To delete a load balancer using the API, send a [DELETE](https://developers.cloudflare.com/api/resources/load%5Fbalancers/methods/delete/) request.

---

## Set up alerts

You can configure alerts to receive notifications for changes in the health status of your pools or endpoints.

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
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/load-balancers/","name":"Load balancers"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/load-balancers/create-load-balancer/","name":"Manage load balancers"}}]}
```
