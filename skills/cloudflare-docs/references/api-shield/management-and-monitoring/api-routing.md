---
title: API Routing
description: Route API requests to different back-end services using API Shield Routing.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/api-shield/management-and-monitoring/api-routing.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# API Routing

API Shield Routing enables customers to create a unified external-facing API that routes requests to different back-end services that may have different paths and hosts than the existing zone and DNS configuration.

Note

The term **Source Endpoint** refers to the endpoint managed by API Shield in Endpoint Management. The term **Target Endpoint** refers to the ultimate destination the request is sent to by the Routing feature.

## Process

You must add Source Endpoints to Endpoint Management through established methods, including [uploading a schema](https://developers.cloudflare.com/api-shield/security/schema-validation/#add-validation-by-uploading-a-schema), via [API Discovery](https://developers.cloudflare.com/api-shield/security/api-discovery/), or by [adding manually](https://developers.cloudflare.com/api-shield/management-and-monitoring/#add-endpoints-manually), before creating a route.

To create a route, you will need the operation ID of the Source Endpoint. To find the operation ID in the dashboard:

* [  New dashboard ](#tab-panel-5391)
* [ Old dashboard ](#tab-panel-5392)

1. In the Cloudflare dashboard, go to the **Web Assets** page.  
[ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. Filter the endpoints to find your **Source Endpoint**.
3. Expand the row for your Source Endpoint and note the **operation ID** field.
4. Select the copy icon to copy the operation ID to your clipboard.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Select **Security** \> **API Shield**.
3. Filter the endpoints to find your **Source Endpoint**.
4. Expand the row for your Source Endpoint and note the **operation ID** field.
5. Select the copy icon to copy the operation ID to your clipboard.

Once your Source Endpoints are added to Endpoint Management, use the following steps to create and verify routes on any given operation ID:

### Create a route

* [  New dashboard ](#tab-panel-5393)
* [ Old dashboard ](#tab-panel-5394)

1. In the Cloudflare dashboard, go to the **Web Assets** page.  
[ Go to **Web assets** ](https://dash.cloudflare.com/?to=/:account/:zone/security/web-assets)
2. In **Endpoints**, select an existing endpoint and expand its details.
3. Under **Routing**, select **Create route**.
4. Enter the target URL or IP address to route your endpoint to.
5. Select **Deploy route**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **API Shield**.
3. In **Endpoint Management**, select an existing endpoint and expand its details.
4. Under **Routing**, select **Create route**.
5. Enter the target URL or IP address to route your endpoint to.
6. Select **Deploy route**.

Note

You can reorder path variables if they are present. For example, you can route `/api/{var1}/users/{var2}` to `/{var2}/users/{var1}`. Segments of the path that are not variables may be added or omitted entirely.

You can also edit or delete a route by selecting **Edit route** on an existing route.

### Test a route

After sending a request to your Source Endpoint, you should see the contents of the back-end service as if you called the Target Endpoint directly.

If API Shield returns unexpected results, check your Source Endpoint host, method, and path and [verify the Route](https://developers.cloudflare.com/api-shield/management-and-monitoring/api-routing/#verify-a-route) to ensure the Target Endpoint value is correct.

Note

You may need to wait up to five minutes for Route changes to synchronize across the Cloudflare network.

## Availability

API Shield Routing is currently in an open beta and is only available for Enterprise customers subscribed to API Shield. Enterprise customers who have not purchased API Shield can preview [API Shield as a non-contract service ↗](https://dash.cloudflare.com/?to=/:account/:zone/security/api-shield) in the Cloudflare dashboard or by contacting your account team.

## Limitations

The Target Endpoint cannot be routed to a Worker if the route is to the same zone.

You cannot change the method of a request. For example, a `GET` Source Endpoint will always send a `GET` request to the Target Endpoint.

You must use all of the variables in the Target Endpoint that appear in the Source Endpoint. For example, routing `/api/{var1}/users/{var2}` to `/api/users/{var2}` is not allowed and will result in an error since `{var1}` is present in the Source Endpoint but not in the Target Endpoint.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/api-shield/","name":"API Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/api-shield/management-and-monitoring/","name":"Management and Monitoring"}},{"@type":"ListItem","position":4,"item":{"@id":"/api-shield/management-and-monitoring/api-routing/","name":"API Routing"}}]}
```
