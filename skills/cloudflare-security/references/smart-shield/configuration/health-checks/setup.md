---
description: Create, configure, and manage health checks for your origin servers.
title: Manage Health Checks
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/smart-shield/llms.txt
> Use this file to discover all available pages before exploring further.

#  Manage Health Checks

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/smart-shield/configuration/health-checks/setup/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

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

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/smart-shield/configuration/health-checks/setup/#page","headline":"Manage Health Checks · Cloudflare Smart Shield docs","description":"Create, configure, and manage health checks for your origin servers.","url":"https://developers.cloudflare.com/smart-shield/configuration/health-checks/setup/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
