---
title: Get started
description: Set up your partner account and make your first Cloudflare Tenant API calls.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Get started

Having access to Cloudflare’s provisioning capabilities allows you to more easily create and manage Cloudflare accounts. The following steps will get you started on making API calls to provision accounts, users, and services.

## Before you begin

### Channel and Alliance partner account setup

Before using the Tenant API, you need to [create an account](https://developers.cloudflare.com/fundamentals/account/create-account/), [verify your email address](https://developers.cloudflare.com/fundamentals/user-profiles/verify-email-address/), and [add your billing information](https://developers.cloudflare.com/billing/get-started/create-billing-profile/).

After you sign your partner agreement with Cloudflare, Cloudflare will add [certain entitlements](https://developers.cloudflare.com/tenant/structure/) to your account that allow you to provision and manage custom accounts. If you have signed your partner agreement and your account has not yet been enabled, MSP partners should contact `partners@cloudflare.com` and Agency Partners should contact `agency@cloudflare.com`.

### API access

You also need to [retrieve your API key](https://developers.cloudflare.com/fundamentals/api/get-started/keys/#view-your-global-api-key) to authenticate your requests to the Tenant API.

For more details on using the Cloudflare API, refer to our [API overview](https://developers.cloudflare.com/fundamentals/api/).

## Step 1 - Create an account

Each customer or team that uses Cloudflare should have their own account. This ensures proper security and access of resources. Each account acts as a container of zones and other resources. Depending on your needs, you may even provision multiple accounts for a single customer or team.

When you create an account with the Tenant API, your Cloudflare user owns that account from creation, ongoing management, and finally deletion.

* [ Dashboard ](#tab-panel-9202)
* [ API ](#tab-panel-9203)

To create an account under your tenant using the dashboard:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com).
2. Go to **Tenants** \> **Managed Accounts**.
3. Select **Create Account**.
4. Enter the **Account Name**, **Account Description**, and **Tenant Unit**.
5. Choose the appropriate account subscription.
6. Select **Add Account**.

To create an account using the API, make a `POST` request to the `/accounts` endpoint and include the following values:

* `name` string  
   * The name of the account that is displayed in the Cloudflare dashboard.
* `type` enum  
   * Valid values are `standard` (default) and `enterprise`. For self-serve customers, use `standard`. For enterprise customers, use `enterprise`.
* `unit` object  
   * Information related to the tenant unit.  
   * `id` string  
         * (optional) ID of the unit to create this account on. Needs to be specified if user administers multiple tenants. Unit ID is the `unit_tag` from your [tenant details](https://developers.cloudflare.com/tenant/how-to/get-tenant-details/).

### Know-Your-Customer (optional)

All KYC parameters are text fields, have a 120 character limit, and are optional unless enforced by the Tenant.

* `business_name` string  
   * (optional) The name of the business associated with this account.
* `business_address` string  
   * (optional) The address of the business associated with this account.
* `business_email` string  
   * (optional) The email of the business associated with this account.
* `business_phone` string  
   * (optional) The phone number of the business associated with this account.
* `external_metadata` string  
   * (optional) External metadata for this account.

Request

```

curl "https://api.cloudflare.com/client/v4/accounts" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '{

  "name": "<ACCOUNT_NAME>",

  "type": "standard"

}'


```

A successful request will return an HTTP status of `200` and the following response body:

Response

```

{

  "result": {

    "id": "2bab6ace8c72ed3f09b9eca6db1396bb",

    "name": "<ACCOUNT_NAME>",

    "type": "standard",

    "settings": {

      "enforce_twofactor": false

    }

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

A request with a unit ID:

Request

```

curl "https://api.cloudflare.com/client/v4/accounts" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '{

  "name": "<ACCOUNT_NAME>",

  "type": "standard",

  "unit": {

    "id": "1a2b3c4d5e6f7g8h"

  }

}'


```

Explain Code

A request with a unit ID and KYC:

Request

```

curl "https://api.cloudflare.com/client/v4/accounts" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '{

  "name": "<ACCOUNT_NAME>",

  "type": "standard",

  "business_name": "Cloudflare",

  "business_email": "email@business.com",

  "business_address": "San Francisco",

  "business_phone": "1234567890",

  "external_metadata": "{'\''testKey'\'': '\''testValue'\''}",

  "unit": {

    "id": "1a2b3c4d5e6f7g8h"

  }

}'


```

Explain Code

## Step 2 - Grant user access

Now that you have created an account, you need to either give your customer direct access to Cloudflare or build an interface for them to interact with.

The first method gives customers control over all aspects of Cloudflare, while the latter allows you to integrate your customer's Cloudflare experience into a dashboard that you control and that they may already be familiar with.

### Option 1 - Direct access to Cloudflare

When you grant user access to an account, Cloudflare will send an invitation to the user so they can get access to the account. If they do not already have a Cloudflare user, Cloudflare will take them through the process of creating one. Once created, they will be given access to the account and any zones already created.

#### Using the dashboard

If you want to give customers access to their individual accounts, it is the same as if you were [inviting a teammate](https://developers.cloudflare.com/fundamentals/manage-members/manage/#add-account-members) to help manage your account.

#### Using the API

You can also grant access to the Cloudflare dashboard by using the API.

Request

```

curl 'https://api.cloudflare.com/client/v4/accounts/<CUSTOMER_ACCOUNT_ID>/members' \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '{

  "email": "<CUSTOMER_EMAIL>",

  "roles": ["<USER_ROLE>"]

}'


```

In most cases, you will want to create new users with a role of `Administrator` which always has the ID `05784afa30c1afe1440e79d9351c7430`.

If your customer is on an Enterprise plan, they have access to a broader set of user roles. To get a full list of available roles, send a [GET](https://developers.cloudflare.com/api/resources/accounts/subresources/roles/methods/list/) request to the API.

### Option 2 - Access via an interface

If you want greater control over how customers use Cloudflare or if you want your customers to use an existing dashboard of yours that they already know, use the Cloudflare API to build this experience.

This means that you will be making API calls to Cloudflare on behalf of your customers. To avoid getting [rate limited](https://developers.cloudflare.com/fundamentals/api/reference/limits/) by our API, Cloudflare recommend that you create accounts and users for each of your customers. Changes made by customer `A` should go through user `A` and changes made by customer `B` should go through user `B`.

Note

This capability is not enabled by default. If you need this functionality, contact [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

To grant access via an interface, you need to create a service user, as no one will log in to the dashboard with them. If you are planning to use this method, Cloudflare will enable you to see the API key in order to make API calls as this user.

Request

```

curl "https://api.cloudflare.com/client/v4/users" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '{

  "email": "<ID@example.com>"

}'


```

Response

```

{

  "result": {

    "id": "60758bd48392a06215ae817bc35084b6",

    "email": "<ID@example.com>",

    "first_name": null,

    "last_name": null,

    "username": "17bd2796b374cec14976ac3bced85c05",

    "telephone": null,

    "country": null,

    "created_on": "2019-02-21T23:20:28.645256Z",

    "modified_on": "2019-02-21T23:20:28.645256Z",

    "two_factor_authentication": {

      "enabled": false,

      "locked": false

    },

    "api_key": "xxx"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Explain Code

## Step 3 - Create a zone

Now that you have a customer account and customer users (or service users), you need to create a zone.

To do this, send a [POST](https://developers.cloudflare.com/api/resources/zones/methods/create/) request to the `/zones` endpoint (including the customer account ID you received in [Step 1](#step-1---create-an-account)).

Request

```

curl "https://api.cloudflare.com/client/v4/zones" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '{

  "name": "example.com",

  "account": {

    "id": "<CUSTOMER_ACCOUNT_ID>"

  }

}'


```

Explain Code

## Step 4 - Create a zone plan subscription

Now that you have a zone provisioned for the customer, you can add the appropriate zone plan based on your reseller agreement.

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

## Step 5 - Create other subscriptions

Depending on your agreement, you may be allowed to resell other add-on services. These are provisioned as account-level subscriptions.

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

## Step 6 - Configure zone and services

Once you have added the necessary subscriptions, you or your customer can move on to configuring various services and fine-tuning account and zone settings.

Configuration can be done by anyone with access to the account (as well as the correct user permissions). This process does not differ from configuring any other Cloudflare account. For additional guidance, refer to our [Product docs](https://developers.cloudflare.com/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tenant/","name":"Tenant"}},{"@type":"ListItem","position":3,"item":{"@id":"/tenant/get-started/","name":"Get started"}}]}
```
