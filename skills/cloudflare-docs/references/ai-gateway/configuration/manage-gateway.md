---
title: Manage gateways
description: You have several different options for managing an AI Gateway.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/ai-gateway/configuration/manage-gateway.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Manage gateways

You have several different options for managing an AI Gateway.

## Create gateway

### Default gateway

AI Gateway can automatically create a gateway for you. When you use `default` as a gateway ID and no gateway with that ID exists in your account, AI Gateway creates it on the first authenticated request.

The request that triggers auto-creation must include a valid `cf-aig-authorization` header. An unauthenticated request to a `default` gateway that does not yet exist does not create the gateway.

The auto-created default gateway uses the following settings:

| Setting        | Default value  |
| -------------- | -------------- |
| Authentication | On             |
| Log collection | On             |
| Caching        | Off (TTL of 0) |
| Rate limiting  | Off            |

After creation, you can edit the default gateway settings like any other gateway. If you delete the default gateway, sending a new authenticated request to the `default` gateway ID auto-creates it again.

Note

Auto-creation only applies to the gateway ID `default`. Using any other gateway ID requires creating the gateway first.

### Create a gateway manually

* [ Dashboard ](#tab-panel-3032)
* [ API ](#tab-panel-3033)

[ Go to **AI Gateway** ](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway)
1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **AI** \> **AI Gateway**.
3. Select **Create Gateway**.
4. Enter your **Gateway name**. Note: Gateway name has a 64 character limit.
5. Select **Create**.

To set up an AI Gateway using the API:

1. [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the following permissions:  
   * `AI Gateway - Read`  
   * `AI Gateway - Edit`
2. Get your [Account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
3. Using that API token and Account ID, send a [POST request](https://developers.cloudflare.com/api/resources/ai%5Fgateway/methods/create/) to the Cloudflare API.

## Edit gateway

* [ Dashboard ](#tab-panel-3028)
* [ API ](#tab-panel-3029)

To edit an AI Gateway in the dashboard:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **AI** \> **AI Gateway**.
3. Select your gateway.
4. Go to **Settings** and update as needed.

To edit an AI Gateway, send a [PUT request](https://developers.cloudflare.com/api/resources/ai%5Fgateway/methods/update/) to the Cloudflare API.

Note

For more details about what settings are available for editing, refer to [Configuration](https://developers.cloudflare.com/ai-gateway/configuration/).

## Delete gateway

Deleting your gateway is permanent and can not be undone.

* [ Dashboard ](#tab-panel-3030)
* [ API ](#tab-panel-3031)

To delete an AI Gateway in the dashboard:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **AI** \> **AI Gateway**.
3. Select your gateway from the list of available options.
4. Go to **Settings**.
5. For **Delete Gateway**, select **Delete** (and confirm your deletion).

To delete an AI Gateway, send a [DELETE request](https://developers.cloudflare.com/api/resources/ai%5Fgateway/methods/delete/) to the Cloudflare API.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/configuration/manage-gateway/","name":"Manage gateways"}}]}
```
