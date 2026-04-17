---
title: Health Checks notifications
description: Set up notifications for Health Checks status changes.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/health-checks/how-to/health-checks-notifications.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Health Checks notifications

You can [configure notification emails](https://developers.cloudflare.com/health-checks/how-to/health-checks-notifications/#configure-notifications) to be alerted when the Health Check detects that there is a change in the status of your origin server. Cloudflare will send you an email within seconds so you can take the necessary action before customers are impacted.

The email provides information to determine what caused the health status change. You can evaluate when the change happened, the status of the origin server, if and why it is unhealthy, the expected response code, and the received response code.

## Configure notifications

1. In the Cloudflare dashboard, go to the **Health Checks** page.  
[ Go to **Health Checks** ](https://dash.cloudflare.com/?to=/:account/:zone/traffic/health-checks)
2. Select **Configure an alert**.
3. Fill out the **Notification name** and **Description**.
4. Add a Notification email.
5. Select **Next**.
6. Add health checks to include in your alerts.
7. Choose the **Notification trigger**, which determines when you receive alerts.
8. Select **Create**.

Note

A notification is only sent after a change of status in the majority of all selected region(s).

For a single region, this will be 2 of 3 data centers. With 13 regions selected, this will be 7 of 13 regions.

See [common error codes](https://developers.cloudflare.com/health-checks/health-checks-analytics/#common-error-codes) for more information regarding the cause of any changes to your Health Check.

Cloudflare encourages you to view your [Health Checks Analytics](https://developers.cloudflare.com/health-checks/health-checks-analytics/#common-error-codes) to get more context about the health of your servers over time.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/health-checks/","name":"Health Checks"}},{"@type":"ListItem","position":3,"item":{"@id":"/health-checks/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/health-checks/how-to/health-checks-notifications/","name":"Health Checks notifications"}}]}
```
