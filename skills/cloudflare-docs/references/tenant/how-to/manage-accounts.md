---
title: Manage accounts
description: Each customer or team that uses Cloudflare should have their own account. This ensures proper security and access of resources. Each account acts as a container of zones and other resources. Depending on your needs, you may even provision multiple accounts for a single customer or team.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/tenant/how-to/manage-accounts.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Manage accounts

Each customer or team that uses Cloudflare should have their own account. This ensures proper security and access of resources. Each account acts as a container of zones and other resources. Depending on your needs, you may even provision multiple accounts for a single customer or team.

When you create an account with the Tenant API, your Cloudflare user owns that account from creation, ongoing management, and finally deletion.

## Create account

Each customer or team that uses Cloudflare should have their own account. This ensures proper security and access of resources. Each account acts as a container of zones and other resources. Depending on your needs, you may even provision multiple accounts for a single customer or team.

When you create an account with the Tenant API, your Cloudflare user owns that account from creation, ongoing management, and finally deletion.

* [ Dashboard ](#tab-panel-6666)
* [ API ](#tab-panel-6667)

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

## View accounts

When you create an account with the Tenant API, your Cloudflare user owns that account from creation, ongoing management, and finally deletion.

* [ Dashboard ](#tab-panel-6664)
* [ API ](#tab-panel-6665)

To view any accounts owned by your tenant using the dashboard:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com).
2. Go to **Tenants** \> **Managed Accounts**.

To fetch any accounts owned by your tenant using the API, send a [GET](https://developers.cloudflare.com/api/resources/accounts/methods/list/) request to the `/accounts` endpoint.

You will get back a list of all the accounts you have created plus any accounts your user already had access to.

Request

```

curl https://api.cloudflare.com/client/v4/accounts \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

Response

```

{

  "result": [

    {

      "id": "a34bd6cc645a31486aa2ef71f1b9afb6",

      "name": "My Personal Account",

      "settings": {

        "enforce_twofactor": false

      }

    },

    {

      "id": "1b16db169c9cb7853009857198fae1b9",

      "name": "Created Account",

      "settings": {

        "enforce_twofactor": false

      }

    }

  ],

  "result_info": {

    "page": 1,

    "per_page": 20,

    "total_pages": 1,

    "count": 2,

    "total_count": 2

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

## Update account

To update an account, send a [PUT](https://developers.cloudflare.com/api/resources/accounts/methods/update/) request to the `/accounts/{account_id}` endpoint.

## Delete account

To delete an account you have created, send a `DELETE` request to the `/accounts/{account_id}` endpoint.

Account deletion is permanent and will delete any zones or other resources under the account.

Request

```

curl --request DELETE \

https://api.cloudflare.com/client/v4/accounts/{account_id} \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

A successful request will return the id to confirm the operation:

Response

```

{

  "result": {

    "id": "1b16db169c9cb7853009857198fae1b9"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tenant/","name":"Tenant"}},{"@type":"ListItem","position":3,"item":{"@id":"/tenant/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/tenant/how-to/manage-accounts/","name":"Manage accounts"}}]}
```
