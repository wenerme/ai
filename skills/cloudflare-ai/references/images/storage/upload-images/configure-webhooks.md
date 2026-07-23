---
description: Set up webhooks to receive notifications when Cloudflare Images direct creator uploads succeed or fail.
title: Configure webhooks
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure webhooks

Last updated Jun 8, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/storage/upload-images/configure-webhooks/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

This feature is only available if your account has at least one zone with a pro plan or above. For more information, refer to our [plans ↗](https://www.cloudflare.com/plans/).

You can set up webhooks to receive notifications about your upload workflow. This will send an HTTP POST request to a specified endpoint when an image either successfully uploads or fails to upload.

Currently, webhooks are supported only for [direct creator uploads](https://developers.cloudflare.com/images/storage/upload-images/direct-creator-upload/).

To receive notifications for direct creator uploads:

1. In the Cloudflare dashboard, go to the **Notifications** pages.
[Go to **Notifications** ↗](https://dash.cloudflare.com/?to=/:account/notifications)
2. Select **Destinations**.
3. From the Webhooks card, select **Create**.
4. Enter information for your webhook and select **Save and Test**. The new webhook will appear in the **Webhooks** card and can be attached to notifications.
5. Next, go to **Notifications** \> **All Notifications** and select **Add**.
6. Under the list of products, locate **Images** and select **Select**.
7. Give your notification a name and optional description.
8. Under the **Webhooks** field, select the webhook that you recently created.
9. Select **Save**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/storage/upload-images/configure-webhooks/#page","headline":"Configure webhooks · Cloudflare Images docs","description":"Set up webhooks to receive notifications when Cloudflare Images direct creator uploads succeed or fail.","url":"https://developers.cloudflare.com/images/storage/upload-images/configure-webhooks/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
