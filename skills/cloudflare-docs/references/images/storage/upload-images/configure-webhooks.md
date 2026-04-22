---
title: Configure webhooks
description: Set up webhooks to receive notifications when Cloudflare Images direct creator uploads succeed or fail.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/images/storage/upload-images/configure-webhooks.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Configure webhooks

You can set up webhooks to receive notifications about your upload workflow. This will send an HTTP POST request to a specified endpoint when an image either successfully uploads or fails to upload.

Currently, webhooks are supported only for [direct creator uploads](https://developers.cloudflare.com/images/storage/upload-images/direct-creator-upload/).

To receive notifications for direct creator uploads:

1. In the Cloudflare dashboard, go to the **Notifications** pages.  
[ Go to **Notifications** ](https://dash.cloudflare.com/?to=/:account/notifications)
2. Select **Destinations**.
3. From the Webhooks card, select **Create**.
4. Enter information for your webhook and select **Save and Test**. The new webhook will appear in the **Webhooks** card and can be attached to notifications.
5. Next, go to **Notifications** \> **All Notifications** and select **Add**.
6. Under the list of products, locate **Images** and select **Select**.
7. Give your notification a name and optional description.
8. Under the **Webhooks** field, select the webhook that you recently created.
9. Select **Save**.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/storage/","name":"Storage"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/storage/upload-images/","name":"Upload images"}},{"@type":"ListItem","position":5,"item":{"@id":"/images/storage/upload-images/configure-webhooks/","name":"Configure webhooks"}}]}
```
