---
title: Manage Health Checks
description: Create, configure, and manage health checks for your origin servers.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Manage Health Checks

Refer to the section below to learn how to manage your Smart Shield health checks.

## Create and edit health checks

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Speed** \> **Smart Shield**.
3. For Health Checks, select **Manage**.
4. Select **Create** or find an existing health check and select **Edit**.
5. Fill out the form or edit existing values, paying special attention to:  
   * The values for **Interval** and **Check regions**, because decreasing the **Interval** and increasing **Check regions** may increase the load on your origin server.  
   * **Retries**, which specify the number of retries to attempt in case of a timeout before marking the origin as unhealthy.
6. Select **Save and Deploy**.

## Configure alerts

You can configure [notification emails](https://developers.cloudflare.com/notifications/get-started/) to be alerted when the health check detects that there is a change in the status of your origin server. Cloudflare will send you an email within seconds so you can take the necessary action before customers are impacted.

The email provides information to determine what caused the health status change. You can evaluate when the change happened, the status of the origin server, if and why it is unhealthy, the expected response code, and the received response code. Refer to [common error codes](https://developers.cloudflare.com/smart-shield/configuration/health-checks/analytics/#common-error-codes) for further guidance.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Speed** \> **Smart Shield**.
3. For Health Checks, select **Manage** and then **Configure an alert**.
4. Fill out the **Notification name** and **Description**.
5. Add a Notification email.
6. Select **Next**.
7. Add health checks to include in your alerts.
8. Choose the **Notification trigger**, which determines when you receive alerts.
9. Select **Create**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/smart-shield/","name":"Smart Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/smart-shield/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/smart-shield/configuration/health-checks/","name":"Health Checks"}},{"@type":"ListItem","position":5,"item":{"@id":"/smart-shield/configuration/health-checks/setup/","name":"Manage Health Checks"}}]}
```
