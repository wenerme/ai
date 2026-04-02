---
title: Alert Webhooks
description: Alert Webhooks allow you to connect external services to Email security, including:
image: https://developers.cloudflare.com/zt-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/email-security/email-configuration/domains-and-routing/alert-webhooks.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Alert Webhooks

Alert Webhooks allow you to connect external services to Email security, including:

* Slack
* Email addresses
* [SIEM](https://developers.cloudflare.com/email-security/reporting/siem-integration/)
* Microsoft Teams

## Create an alert webhook

To create an alert webhook in Email security:

1. Log in to the [Email security dashboard ↗](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Email Configuration** \> **Domains & Routing** \> **Alert Webhooks**.
4. Select **New Webhook**.
5. Select an **App Type**.
6. Enter the **Target**.
7. Select **Publish Webhook**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-security/","name":"Email security (formerly Area 1)"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-security/email-configuration/","name":"Email configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-security/email-configuration/domains-and-routing/","name":"Domains and routing"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-security/email-configuration/domains-and-routing/alert-webhooks/","name":"Alert Webhooks"}}]}
```
