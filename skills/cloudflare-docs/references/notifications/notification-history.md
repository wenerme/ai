---
title: Notification History
description: View a log of sent notifications.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Notification History

Notification History is a log of notifications that have been sent to your account via the Notifications service. Information contained in Notification History includes the notification itself, when the notification was sent, and who the notification was sent to.

## How to access Notification History

Currently, customers can access Notification History [via the Cloudflare API](https://developers.cloudflare.com/api/resources/alerting/subresources/history/methods/list/). Using `GET`, customers can retrieve a list of history records for notifications sent to an account. The records are displayed for the last 30 or 90 days, based on the type of plan.

Syntax

```

GET accounts/{account_id}/alerting/v3/history


```

Example

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/alerting/v3/history?page=1&per_page=25" \

--header "Authorization: Bearer <API_TOKEN>"


```

## Availability

Notification History is available on all plans. The amount of history clients have access to depends on the type of plan:

* **Free, Pro, and Business**: History from the past 30 days.
* **Enterprise**: History from the past 90 days.

Note

Customers will not be able to access Notification History from before 2021-10-11.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/notifications/","name":"Notifications"}},{"@type":"ListItem","position":3,"item":{"@id":"/notifications/notification-history/","name":"Notification History"}}]}
```
