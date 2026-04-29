---
title: Manage subscriptions
description: Add and manage zone and account-level subscriptions for tenant-managed Cloudflare accounts.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/tenant/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage subscriptions

Once your customer has a zone provisioned, you can add zone and account-level subscriptions.

## Zone subscriptions

### Create zone subscription

To create a zone subscription, typically used to upgrade a zone's plan from `PARTNERS_FREE` to a paid [Zone plan](https://developers.cloudflare.com/tenant/reference/subscriptions/#zone-plans), send a [POST](https://developers.cloudflare.com/api/resources/zones/subresources/subscriptions/methods/create/) request to the `/zones/{zone_id}/subscription` endpoint and include the following values:

* `rate_plan` object  
   * Contains the zone plan corresponding to what customers would order in the dashboard. For a list of available values, refer to [Zone subscriptions](https://developers.cloudflare.com/tenant/reference/subscriptions/#zone-plans).
* `component_values` array  
   * Additional services depending on your reseller agreement, such as additional `page_rules`.
* `frequency` string  
   * How often the subscription is renewed automatically (defaults to `"monthly"`).

Request (without \`component\_values\`)

```

curl 'https://api.cloudflare.com/client/v4/zones/{zone_id}/subscription' \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '{

  "rate_plan": {

    "id": "<RATE_PLAN>"

  },

  "frequency": "annual"

}'


```

Request (with \`component\_values\`)

```

curl 'https://api.cloudflare.com/client/v4/zones/{zone_id}/subscription' \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '{

  "rate_plan": {

    "id": "PARTNERS_BIZ"

  },

  "component_values": [

    {

      "name": "page_rules",

      "value": 50

    }

  ]

}


```

Explain Code

### Get zone subscription details

To get the details of a zone subscription, send a [GET](https://developers.cloudflare.com/api/resources/zones/subresources/subscriptions/methods/get/) request to the `/zones/<ZONE_ID>/subscription` endpoint.

### Update zone subscription

To update a subscription on a zone, typically used to update an existing subscription's 'component\_values' or to downgrade a zone's subscription, send a [PUT](https://developers.cloudflare.com/api/resources/zones/subresources/subscriptions/methods/update/) request to the `/zones/<ZONE_ID>/subscription` endpoint.

---

## Account subscriptions

Depending on your agreement, you may be allowed to resell other add-on services. These are provisioned as account-level subscriptions.

### Create account subscription

To create an account subscription, send a [POST](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/methods/create/) request to the `/accounts/{account_id}/subscriptions` endpoint and include the following values:

* `rate_plan` object  
   * Contains the account subscription corresponding to a specific add-on service. For a list of available values, refer to [Available subscriptions](https://developers.cloudflare.com/tenant/reference/subscriptions/).
* `component_values` array  
   * Additional services depending on your reseller agreement, such as additional endpoints for load balancing or additional seats for Cloudflare Zero Trust. If not included, the subscription includes the default values associated with each purchase.
* `frequency` string  
   * How often the subscription is renewed automatically (defaults to `"monthly"`).

Request

```

curl 'https://api.cloudflare.com/client/v4/accounts/{account_id}/subscriptions' \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '{

  "rate_plan": {

    "id": "<RATE_PLAN_NAME>"

  }

}'


```

### Get account subscription details

To get all subscriptions for an account, send a [GET](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/methods/get/) request to the `/accounts/<ACCOUNT_ID>/subscriptions` endpoint.

### Update account subscription

To update a subscription on an account, send a [PUT](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/methods/update/) request to the `/accounts/<ACCOUNT_ID>/subscriptions/<SUBSCRIPTION_ID>` endpoint.

### Delete account subscription

To delete a subscription on an account, send a [DELETE](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/methods/delete/) request to the `/accounts/<ACCOUNT_ID>/subscriptions/<SUBSCRIPTION_ID>` endpoint.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tenant/","name":"Tenant"}},{"@type":"ListItem","position":3,"item":{"@id":"/tenant/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/tenant/how-to/manage-subscriptions/","name":"Manage subscriptions"}}]}
```
