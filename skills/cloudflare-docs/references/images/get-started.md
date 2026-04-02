---
title: Getting started
description: In this guide, you will get started with Cloudflare Images and make your first API request.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/images/get-started.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Getting started

In this guide, you will get started with Cloudflare Images and make your first API request.

## Prerequisites

Before you make your first API request, ensure that you have a Cloudflare Account ID and an API token.

Refer to [Find zone and account IDs](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) for help locating your Account ID and [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) to learn how to create an access your API token.

## Make your first API request

Terminal window

```

curl --request POST \

  --url https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1 \

  --header 'Authorization: Bearer <API_TOKEN>' \

  --header 'Content-Type: multipart/form-data' \

  --form file=@./<YOUR_IMAGE.IMG>


```

## Enable transformations on your zone

You can dynamically optimize images that are stored outside of Cloudflare Images and deliver them using [transformation URLs](https://developers.cloudflare.com/images/transform-images/transform-via-url/).

Cloudflare will automatically cache every transformed image on our global network so that you store only the original image at your origin.

To enable transformations on your zone:

1. In the Cloudflare dashboard, go to the **Transformations** page.  
[ Go to **Transformations** ](https://dash.cloudflare.com/?to=/:account/images/transformations)
2. Go to the specific zone where you want to enable transformations.
3. Select **Enable for zone**. This will allow you to optimize and deliver remote images.

Note

With **Resize images from any origin** unchecked, only the initial URL passed will be checked. Any redirect returned will be followed, including if it leaves the zone, and the resulting image will be transformed.

Note

If you are using transformations in a Worker, you need to include the appropriate logic in your Worker code to prevent resizing images from any origin. Unchecking this option in the dash does not apply to transformation requests coming from Cloudflare Workers.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/get-started/","name":"Getting started"}}]}
```
