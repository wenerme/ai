---
title: Get started
description: Create and configure Health Checks to monitor your origin servers.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Get started

Smart Shield

This functionality is now offered as part of Cloudflare's origin server safeguard, Smart Shield. [Learn more](https://developers.cloudflare.com/smart-shield/).

This guide will get you started with creating and managing configured Health Checks.

## Create a Health Check

1. In the Cloudflare dashboard, go to the **Health Checks** page.  
[ Go to **Health Checks** ](https://dash.cloudflare.com/?to=/:account/:zone/traffic/health-checks)
2. Select **Create** and fill out the form, paying special attention to:  
   * The values for **Interval** and **Check regions**, because decreasing the **Interval** and increasing **Check regions** may increase the load on your origin server.  
   * **Retries**, which specify the number of retries to attempt in case of a timeout before marking the origin as unhealthy.  
   * **Response body**, which specifies a substring that must be present in the first 10 KB of the response body for the check to succeed.
3. Select **Save and Deploy**.

## Manage Health Checks

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Traffic** \> **Health Checks**.
3. Navigate to your health check and select **Edit**.
4. Edit your Health Check.
5. Select **Save**.

Note

You can also enable, disable, or delete configured Health Checks.

Note

Authenticated origin pull is not supported by Standalone Health Checks.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/health-checks/","name":"Health Checks"}},{"@type":"ListItem","position":3,"item":{"@id":"/health-checks/get-started/","name":"Get started"}}]}
```
