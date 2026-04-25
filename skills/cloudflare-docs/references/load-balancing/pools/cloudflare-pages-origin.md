---
title: Use Pages as an origin for Load Balancing
description: This tutorial is intended as an introductory example of how you can leverage Cloudflare's global traffic management.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Use Pages as an origin for Load Balancing

**Last reviewed:**  almost 2 years ago 

This tutorial is intended as an introductory example of how you can leverage Cloudflare's global traffic management.

The following sections will guide you through setting up an [active-passive failover](https://developers.cloudflare.com/load-balancing/load-balancers/common-configurations/#active---passive-failover) load balancer with [Cloudflare Pages](https://developers.cloudflare.com/pages/) as one of the [endpoints](https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-components/#endpoints), while also going into details about the Load Balancing dashboard workflow, and some important field values and troubleshooting.

## Use cases

This setup can be useful if you are migrating your production website or application to Pages or if you just want to have a backup or a personalized web page for when your primary origin goes down.

## Before you begin

Make sure you:

* Are familiar with the Cloudflare [Load Balancing components](https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-components/).
* Own a domain and use Cloudflare as a [primary DNS provider](https://developers.cloudflare.com/dns/zone-setups/full-setup/).
* Have [deployed a website or application](https://developers.cloudflare.com/pages/get-started/git-integration/) with Cloudflare Pages.
* Have [enabled Load Balancing](https://developers.cloudflare.com/load-balancing/get-started/enable-load-balancing/) in your account.

## Create health monitor

Although you can create all the components in the **Create Load Balancer** workflow, using the **Manage Monitors** and **Manage Pools** sections separately makes it easier to test and troubleshoot the configurations of each of these components before bringing them together in a load balancer.

Monitors define the criteria based on which an endpoint will be considered healthy or not. Start by setting up a monitor as follows.

1. In the Cloudflare dashboard, go to the **Load Balancing** page.  
[ Go to **Load Balancing** ](https://dash.cloudflare.com/?to=/:account/load-balancing)
2. Select the **Monitors** tab and then **Create monitor**.
3. Give the monitor a descriptive name and confirm the other fields are filled in as the following:

| Field | Value |
| ----- | ----- |
| Type  | HTTP  |
| Path  | /     |
| Port  | 80    |

1. Under **Advanced health check settings**, keep the default values and enable the **Follow Redirects** option.  
When you are using a service like Cloudflare Pages, it is possible that requests from the health monitor - as well as the ones from your visitors - are redirected before reaching their destination. Enabling this option prevents the monitor from reporting an unhealthy endpoint when it actually has only been redirected (with a `301` code, for example).

Tip

You can name the monitor after the parameters you have defined. For example: `HTTP - 200 - Follow Redirects`.

This way you can easily remember the criteria a certain monitor is using when you decide to attach it to other endpoints as well.

1. Select **Save** to confirm.

## Create pools

Pools hold information about where the health monitor requests and your visitors requests will be directed to.

To support the [use cases](#use-cases) mentioned above, and assuming you only have one origin server for your production website and one for the Cloudflare Pages instance, create two pools with one endpoint each:

Important

The endpoint pointing to [Cloudflare Pages](https://developers.cloudflare.com/pages/) must have **host header** filled in with the project domain (`<project>.pages.dev`) for it to resolve correctly. You can find a reference table for correct setup in Step 8 below.

Failing to add the host header will result in [response code mismatch error](https://developers.cloudflare.com/load-balancing/troubleshooting/common-error-codes/#response-code-mismatch-error) for the monitor, and [Error 1000: DNS points to prohibited IP](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1000/) for visitors (if the load balancer is enabled despite the unhealthy monitor status).

1. In the Cloudflare dashboard, go to the **Load Balancing** page.  
[ Go to **Load Balancing** ](https://dash.cloudflare.com/?to=/:account/load-balancing)
2. Select the **Pools** tab and then **Create monitor**.
3. For the first pool, start by filling out the fields:
* A name for the pool (must be unique). Suggestion: `primary`
* A description to provide more details on the name. Suggestion: `production website`
1. Leave the choice for [**Endpoint Steering**](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/) as is. Since each pool will only have one endpoint, this steering method will not interfere in this case.
2. Add your origin server as an endpoint with the following information:
* A name for the endpoint (must be unique). Suggestion: `my-website`.
* The endpoint IP address or hostname.  
Warning  
As exemplified in Step 8 below, when using Cloudflare as an endpoint, **do not** specify one of Cloudflare's anycast IP addresses. Because these IPs can change at any time, you should use a hostname instead.
* The endpoint [weight](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights), which can be set to `1`. Since each pool will only have one endpoint, the endpoint weight will not make a difference in this case.
* A [hostname](https://developers.cloudflare.com/load-balancing/additional-options/override-http-host-headers/) by selecting **Add host header**.  
Warning  
If your production website is hosted on a platform like Cloudflare Pages, where you have a default subdomain (`example.pages.dev`) and then configure a [custom domain](https://developers.cloudflare.com/pages/configuration/custom-domains) (`my-app.com`), you will need to add a host header to avoid failing the health monitor request.
1. Finish configuring the first pool with the following information:
* Leave the **Health Threshold** set to `1`. Since each pool will only have one endpoint, this is the only possible value for this field.
* Select the **Monitor** configured in the previous step.
* Select **Health Check Regions** to choose from which [locations](https://developers.cloudflare.com/load-balancing/monitors/#health-monitor-regions) Cloudflare should send monitor requests to periodically test the endpoint health.
1. Select **Save**
2. Repeat the process for the second pool using the following values:

| Field                      | Value                                   |
| -------------------------- | --------------------------------------- |
| Pool name                  | secondary                               |
| Description                | Pages version                           |
| Endpoint steering          | <default>                               |
| Endpoint name              | my-pages-website                        |
| Endpoint address           | <your custom domain or Pages subdomain> |
| Weight                     | 1                                       |
| Host (**Add host header**) | <your custom domain or Pages subdomain> |
| Health threshold           | 1                                       |
| Monitor                    | <monitor defined on previous step>      |
| Health check regions       | <select region of your choice>          |

## Check the endpoints health status

Before setting up the load balancer:

1. In the Cloudflare dashboard, go to the **Load Balancing** page.  
[ Go to **Load Balancing** ](https://dash.cloudflare.com/?to=/:account/load-balancing)
2. Go to the **Pools** tab.
3. Find the pools you created in the list and check if their status is `Healthy`. You might have to refresh the page.
4. Expand each pool entry to confirm that the health status for endpoints within them is also `Healthy`.

The basic principle is that, if both your production website and your Cloudflare Pages project are live and directly accessible via browser, the monitors should also be able to get a `200` code as HTTP response.

Revise your pools and monitor configurations to confirm they followed the instructions above. If you still find issues, refer to [Troubleshooting](https://developers.cloudflare.com/load-balancing/troubleshooting/common-error-codes/) or [FAQ](https://developers.cloudflare.com/load-balancing/troubleshooting/load-balancing-faq/#why-is-my-endpoint-or-pool-considered-unhealthy).

## Create load balancer

After confirming the endpoints and monitors are set up correctly and return the expected health status, create the load balancer:

1. In the Cloudflare dashboard, go to the **Load Balancing** page.  
[ Go to **Load Balancing** ](https://dash.cloudflare.com/?to=/:account/load-balancing)
2. Select **Create load balancer**.
3. On the **Hostname** page, configure the following and select **Next**.  
   * Enter a **Hostname**, which is the DNS name at which the load balancer is available. Suggestion: for now, you can just add a temporary hostname such as `lb` (so the complete field value would look like `lb.<your_domain>`).  
   * Toggle the orange cloud icon to update the [proxy mode](https://developers.cloudflare.com/load-balancing/understand-basics/proxy-modes/), which affects how traffic is routed and which IP addresses are advertised.  
   * Select your preferred option for [session affinity](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/) and [adaptive routing](https://developers.cloudflare.com/load-balancing/understand-basics/adaptive-routing/).
4. On the **Add a Pool** page, configure the following and select **Next**.  
   * Select the first pool you created previously and select **Add Pool**.  
   * Do the same for the second pool and reorder them if needed. For the purposes of this tutorial, your production website pool would be the first (`primary`) and the Cloudflare Pages pool would be the second (`secondary`).  
   * If needed, update the [**Fallback Pool**](https://developers.cloudflare.com/load-balancing/understand-basics/health-details/#fallback-pools). For the purposes of this tutorial, you can leave this pointing to your secondary pool.
5. On the **Monitors** page, review the monitors attached to your pools and the expected health status, and select **Next**.
6. On the **Traffic Steering** page, make sure **Off** is selected. This means the load balancer will follow the order established on the **Add a Pool** section (Step 3 above), achieving an [Active - Passive Failover](https://developers.cloudflare.com/load-balancing/load-balancers/common-configurations/#active---passive-failover) configuration.
7. For the purposes of this tutorial, leave the [**Custom Rules**](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-rules/) option empty.
8. On the **Review** page, review your configuration and select **Save as Draft**.

A DNS record of the type `LB` will be created under [**DNS** \> **Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) with the hostname you have defined, and a corresponding load balancer will be added to [**Load Balancing** ↗](https://dash.cloudflare.com/?to=/:account/load-balancing)

## Optional - Deploy on a test hostname

If you have used a temporary hostname for your load balancer, follow the steps below to deploy and test it.

1. In the Cloudflare dashboard, go to the **Load Balancing** page.  
[ Go to **Load Balancing** ](https://dash.cloudflare.com/?to=/:account/load-balancing)
2. In the **Load Balancers** list, locate the load balancer you created under a test hostname (such as `lb`) and enable it.
3. On your browser, request the temporary hostname (`lb.example.com`). You should see the website or application hosted at your primary origin server.
4. Go back to the **Manage Load Balancers** list, select to expand the test load balancer, and disable the primary pool.
5. On a new incognito window of your browser, request the temporary hostname once again. You should see the website or application hosted at your secondary origin server this time.  
If you find issues, revise your pools, monitor, and load balancer configurations to confirm they followed the instructions above. Also refer to [Troubleshooting](https://developers.cloudflare.com/load-balancing/troubleshooting/common-error-codes/) or [FAQ](https://developers.cloudflare.com/load-balancing/troubleshooting/load-balancing-faq/) if needed.

Important

After you confirm everything is working correctly, make sure you re-enable the pools within the load balancer.

## Route production traffic to load balancer

Now that you have set up your load balancer and verified everything is working correctly, you can put the load balancer on a live domain or subdomain:

1. Confirm that your production hostname has the correct [priority order](https://developers.cloudflare.com/load-balancing/load-balancers/dns-records/#priority-order) of DNS records and is covered by an [SSL/TLS certificate](https://developers.cloudflare.com/load-balancing/load-balancers/dns-records/#ssltls-coverage).  
If you have an Enterprise account, also evaluate your application for any excluded paths. For example, you might not want the load balancer to distribute requests directed at your `/admin` path. For any exceptions, set up an [Origin rule](https://developers.cloudflare.com/rules/origin-rules/features/#dns-record).
2. Configure your load balancer to receive production traffic by editing the **Hostname** of your existing load balancer.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/pools/","name":"Pools"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/pools/cloudflare-pages-origin/","name":"Use Pages as an origin for Load Balancing"}}]}
```
