---
title: Disable Email Routing
description: Delete and disable Email Routing or unlock DNS records to migrate to another email provider.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Disable Email Routing

Email Routing provides two options for disabling the service:

* **Delete and Disable**: This option will immediately disable Email Routing and remove its `MX` records. Your custom email addresses will stop working, and your email will not be routed to its final destination.
* **Unlock and keep DNS records**: (Advanced) This option is recommended if you plan to migrate to another provider. It allows you to add new `MX` records before disabling the service. Email Routing will stop working when you change your `MX` records.

## Delete and disable Email Routing

1. In the Cloudflare dashboard, go to the **Email Routing** page.  
[ Go to **Email Routing** ](https://dash.cloudflare.com/?to=/:account/:zone/email/routing)
2. Select **Settings**.
3. Select **Start disabling** \> **Delete and Disable**. Email Routing will show you the list of records associated with your account that will be deleted.
4. Select **Delete records**.

Email Routing is now disabled for your account and will stop forwarding email. To enable the service again, select **Enable Email Routing** and follow the wizard.

## Unlock and keep DNS records

1. In the Cloudflare dashboard, go to the **Email Routing** page.  
[ Go to **Email Routing** ](https://dash.cloudflare.com/?to=/:account/:zone/email/routing)
2. Select **Settings**.
3. Select **Start disabling** \> **Unlock records and continue**.
4. Select **Edit records on DNS**.

You now have the option to edit your DNS records to migrate your service to another provider.

Warning

Changing your DNS records will make Email Routing stop working. If you changed your mind and want to keep Email Routing working with your account, select **Lock DNS records**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-routing/","name":"Email Routing"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-routing/setup/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-routing/setup/disable-email-routing/","name":"Disable Email Routing"}}]}
```
