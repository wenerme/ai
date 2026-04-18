---
title: Configure rule notifications
description: Configure notifications for Network Flow rule matches.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/network-flow/rules/rule-notifications.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Configure rule notifications

Network Flow (formerly Magic Network Monitoring) can notify you by email, webhook, or PagerDuty when a rule is triggered. When a rule detects a traffic anomaly, notifications alert your team so you can respond — or, if you use Magic Transit with auto-advertisement, Cloudflare can begin mitigating the attack automatically.

For more information on the notification platform, refer to [Notifications documentation](https://developers.cloudflare.com/notifications/). You can also:

* [Configure Cloudflare notifications](https://developers.cloudflare.com/notifications/get-started/)
* [Configure PagerDuty](https://developers.cloudflare.com/notifications/get-started/configure-pagerduty/)
* [Configure webhooks](https://developers.cloudflare.com/notifications/get-started/configure-webhooks/)
* [Test a notification](https://developers.cloudflare.com/notifications/get-started/#test-a-notification)
* [Notification History](https://developers.cloudflare.com/notifications/notification-history/)

## Notification configuration fields

| Field                      | Description                                                       |
| -------------------------- | ----------------------------------------------------------------- |
| **Notification name**      | A label to identify this notification in your notifications list. |
| **Description (optional)** | The description of the notification.                              |
| **Webhooks**               | One or more webhooks to deliver the notification to.              |
| **Notification email**     | One or more email addresses to deliver the notification to.       |

## Rule Auto-Advertisement notifications

Webhook, PagerDuty, and email notifications are sent following an auto-advertisement attempt for all prefixes inside the flagged rule.

You will receive the status of the advertisement for each prefix with the following available statuses:

* **Advertised**: The prefix was successfully advertised.
* **Already Advertised**: The prefix was advertised prior to the auto advertisement attempt.
* **Delayed**: The prefix cannot currently be advertised but will attempt advertisement. After the prefix can be advertised, a new notification is sent with the updated status.
* **Locked**: The prefix is locked and cannot be advertised.
* **Could not Advertise**: Cloudflare was unable to advertise the prefix. This status can occur for multiple reasons, but usually occurs when you are not allowed to advertise a prefix.
* **Error**: A general error occurred during prefix advertisement.

## Configure rule notifications

To configure notifications for Network Flow rules:

1. In the Cloudflare dashboard, go to the **Notifications** page.
[ Go to **Notifications** ](https://dash.cloudflare.com/?to=/:account/notifications) 
1. Select **Add**.
2. Select _Magic Transit_ from the product drop-down menu.
3. Find the appropriate Network Flow alert and select **Select**:  
   * **Network Flow: Volumetric Attack** \- for static threshold and dynamic threshold notifications  
   * **Network Flow: DDoS Attack** \- for sFlow DDoS attack notifications
4. Fill in the notification configuration details.
5. Select **Save**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/network-flow/","name":"Network Flow"}},{"@type":"ListItem","position":3,"item":{"@id":"/network-flow/rules/","name":"Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/network-flow/rules/rule-notifications/","name":"Configure rule notifications"}}]}
```
