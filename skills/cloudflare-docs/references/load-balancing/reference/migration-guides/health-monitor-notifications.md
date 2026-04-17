---
title: Health monitor notifications
description: Migrate health monitor notifications.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/load-balancing/reference/migration-guides/health-monitor-notifications.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Health monitor notifications

Cloudflare is migrating the notifications used by load balancing [health monitors](https://developers.cloudflare.com/load-balancing/monitors/) to use Cloudflare's centralized [Notifications Service](https://developers.cloudflare.com/notifications/).

## What is changing and why?

Cloudflare’s account-level [Notifications Service](https://developers.cloudflare.com/notifications/) is now the centralized location for most Cloudflare services. This change promotes consistency and streamlined administration, as well as gives you more options for notification delivery such as configuring webhooks or associating multiple pools with the same notification. These new notifications will also be managed at the account level instead of the zone level.

We strongly encourage all customers to migrate existing Health Monitor notifications to Cloudflare’s centralized Notifications Service to avoid lapses in alerts.

## Migration guide

You should use this guide to migrate over **all** your existing health monitor notifications.

### Step 1 - Find existing notifications

First you should determine which pools are using notifications. It's often easier if you use the Cloudflare API to list all your pools and look for the `notification_email` parameter.

With code

Use the [Cloudflare API](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/methods/list/) to list all your pools and then look for whether each pool has a value for the `notification_email` parameter.

Request

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/load_balancers/pools" \

--header "Authorization: Bearer <API_TOKEN>" \

| jq '[.result[] | select(.notification_email != "") | {name, notification_email}]'


```

Response

```

[

    {

        "name": "pool-1",

        "notification_email": "user@example.com"

    },

    {

        "name": "pool-2",

        "notification_email": "user@example.com"

    },

    {

        "name": "pool-3",

        "notification_email": "user@example.com"

    },

    {

        "name": "pool-4",

        "notification_email": "user@example.com"

    }

]


```

Explain Code

No code

To find pools with existing notifications in the dashboard:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Load Balancing**.
3. Select the **Pools** tab.
4. On a pool, select **Edit**.
5. For **Health Check Notifications**, check the value is toggled to **On** and an email address is present in the **Notification email address** field.

### Step 2 - Create new notifications

In this step, you should create new notifications to replace all of your existing legacy notifications.

With code

If using the Cloudflare API, [re-create all your existing notifications](https://developers.cloudflare.com/api/resources/alerting/subresources/policies/methods/create/) with the following parameters specified:

```

"alert_type": "load_balancing_health_alert",

"filters": {

    "pool_id": <<ARRAY_OF_INCLUDED_POOL_IDS>>,

    "new_health": <<ARRAY_OF_STATUS_TRIGGERS>> ["Unhealthy", "Healthy"],

    "event_source": <<ARRAY_OF_OBJECTS_WATCHED>> ["pool", "origin"]

}


```

No code

On the pool you located in [Step 1](#step-1---find-existing-notifications), look for **Pool Notifications**. Click **Create a Health Alert** to start [creating a notification](https://developers.cloudflare.com/notifications/get-started/#create-a-notification).

### Step 3 - Remove deprecated notifications

As the final step in the migration process, you need to remove all emails from your legacy notifications to ensure that you no longer receive deprecation emails moving forward.

Though you can perform these steps in the dashboard, Cloudflare recommends you use our new API endpoint for added convenience.

With code

If using the Cloudflare API, we recently added a [PATCH](https://developers.cloudflare.com/api/resources/load%5Fbalancers/subresources/pools/methods/bulk%5Fedit/) endpoint so you can easily remove email notifications from multiple pools at the same time.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Load Balancing: Monitors and Pools Write`

Patch Pools

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/pools" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "notification_email": ""

  }'


```

This API call supports the standard pagination query parameters, either `limit/offset` or `per_page/page`, so by default it only updates the first 25 pools listed. To make sure you update all your pools, you may want to adjust your API call so it loops through various pages or includes a larger number of pools with each request.

If needed, you can remove legacy notifications by using the dashboard.

No code

Once you created your new notification in [Step 2](#step-2---create-new-notifications), you will return to the pool you were editing previously. To disable the deprecated notifications, you must remove all notification email addresses from the field.

If you do not complete this step (removing all notification emails from all pools), your migration will not be considered complete and you will continue to receive additional emails about this deprecation.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/load-balancing/","name":"Load Balancing"}},{"@type":"ListItem","position":3,"item":{"@id":"/load-balancing/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/load-balancing/reference/migration-guides/","name":"Migration guides"}},{"@type":"ListItem","position":5,"item":{"@id":"/load-balancing/reference/migration-guides/health-monitor-notifications/","name":"Health monitor notifications"}}]}
```
