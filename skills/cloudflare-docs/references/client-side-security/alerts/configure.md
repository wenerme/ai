---
title: Configure an alert
description: Configure scoped or unscoped client-side resource alerts to get notified about relevant client-side changes on your zones.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/client-side-security/alerts/configure.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Configure an alert

To configure an alert:

1. In the Cloudflare dashboard, go to the **Notifications** page.  
[ Go to **Notifications** ](https://dash.cloudflare.com/?to=/:account/notifications)
2. Choose **Add** and then select **Client-side security (formerly Page Shield)** in the **Product** dropdown.
3. Select an [alert type](https://developers.cloudflare.com/client-side-security/alerts/alert-types/).
4. Enter the notification name and description.
5. (Optional) If you are a customer with Client-Side Security Advanced, you can [define the zones for which you want to filter alerts](https://developers.cloudflare.com/client-side-security/alerts/#scoped-alerts) in **Rules of these zones**. This option requires that you define [content security rules](https://developers.cloudflare.com/client-side-security/rules/) in the selected zones.
6. Select one or more notification destinations (notification email, webhooks, and connected notification services).
7. Select **Create**.

## Manage alerts

To edit, delete, or disable an alert, go to the **Notifications** page.

[ Go to **Notifications** ](https://dash.cloudflare.com/?to=/:account/notifications) 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/client-side-security/","name":"Client-side security"}},{"@type":"ListItem","position":3,"item":{"@id":"/client-side-security/alerts/","name":"Alerts"}},{"@type":"ListItem","position":4,"item":{"@id":"/client-side-security/alerts/configure/","name":"Configure an alert"}}]}
```
