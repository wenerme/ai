---
description: Remove images from Cloudflare Images storage using the dashboard or API.
title: Delete images
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Delete images

Last updated Jun 10, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/storage/manage-images/delete-images/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can delete an image from the Cloudflare Images storage using the dashboard, the API, or from a Worker via the [Images binding](https://developers.cloudflare.com/images/storage/binding/#imageimageiddelete).

## Delete images via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Hosted Images** page.
[Go to **Hosted images** ↗](https://dash.cloudflare.com/?to=/:account/images/hosted)
2. Find the image you want to remove and select **Delete**.
3. (Optional) To delete more than one image, select the checkbox next to the images you want to delete and then **Delete selected**.

Your image will be deleted from your account.

## Delete images via the API

Make a `DELETE` request to the [delete image endpoint](https://developers.cloudflare.com/api/resources/images/subresources/v1/methods/delete/). `{image_id}` must be fully URL encoded in the API call URL.

```bash
curl --request DELETE https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v1/{image_id} \
--header "Authorization: Bearer <API_TOKEN>"
```

After the image has been deleted, the response returns `"success": true`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/storage/manage-images/delete-images/#page","headline":"Delete images · Cloudflare Images docs","description":"Remove images from Cloudflare Images storage using the dashboard or API.","url":"https://developers.cloudflare.com/images/storage/manage-images/delete-images/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
