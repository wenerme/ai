---
description: Set up notifications for Health Checks status changes.
title: Health Checks notifications
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/health-checks/llms.txt
> Use this file to discover all available pages before exploring further.

# Health Checks notifications

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/health-checks/how-to/health-checks-notifications/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can [configure notification emails](https://developers.cloudflare.com/health-checks/how-to/health-checks-notifications/#configure-notifications) to be alerted when the Health Check detects that there is a change in the status of your origin server. Cloudflare will send you an email within seconds so you can take the necessary action before customers are impacted.

The email provides information to determine what caused the health status change. You can evaluate when the change happened, the status of the origin server, if and why it is unhealthy, the expected response code, and the received response code.

## Configure notifications

1. In the Cloudflare dashboard, go to the **Health Checks** page.
[Go to **Health Checks** ↗](https://dash.cloudflare.com/?to=/:account/:zone/traffic/health-checks)
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

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/health-checks/how-to/health-checks-notifications/#page","headline":"Health Checks notifications · Cloudflare Health Checks docs","description":"Set up notifications for Health Checks status changes.","url":"https://developers.cloudflare.com/health-checks/how-to/health-checks-notifications/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
