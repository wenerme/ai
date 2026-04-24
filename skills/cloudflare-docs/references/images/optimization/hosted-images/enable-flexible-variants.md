---
title: Enable flexible variants
description: Turn on flexible variants in Cloudflare Images to allow dynamic resizing beyond predefined variant options.
image: https://developers.cloudflare.com/dev-products-preview.png
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/images/optimization/hosted-images/enable-flexible-variants.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Enable flexible variants

Flexible variants allow you to create variants with dynamic resizing which can provide more options than regular variants allow. This option is not enabled by default.

## Enable flexible variants via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Hosted Images** page.  
[ Go to **Hosted images** ](https://dash.cloudflare.com/?to=/:account/images/hosted)
2. Select the **Delivery** tab.
3. Enable **Flexible variants**.

## Enable flexible variants via the API

Make a `PATCH` request to the [Update a variant endpoint](https://developers.cloudflare.com/api/resources/images/subresources/v1/subresources/variants/methods/edit/).

Terminal window

```

curl --request PATCH https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v1/config \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '{"flexible_variants": true}'


```

After activation, you can use [optimization parameters](https://developers.cloudflare.com/images/optimization/features/#parameters) on any Cloudflare image. For example,

`https://imagedelivery.net/{account_hash}/{image_id}/w=400,sharpen=3`

Note

Flexible variants cannot be used for images that require a [signed delivery URL](https://developers.cloudflare.com/images/optimization/hosted-images/serve-private-images/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/optimization/","name":"Optimization"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/optimization/hosted-images/","name":"Hosted images"}},{"@type":"ListItem","position":5,"item":{"@id":"/images/optimization/hosted-images/enable-flexible-variants/","name":"Enable flexible variants"}}]}
```
