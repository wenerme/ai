---
title: Apply blur
description: Add a blur effect to Cloudflare Images variants using the dashboard or flexible variants API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/images/optimization/hosted-images/blur-variants.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Apply blur

You can apply blur to image variants by creating a specific variant for this effect first or by editing a previously created variant. Note that you cannot blur an SVG file.

Refer to [Resize images](https://developers.cloudflare.com/images/optimization/hosted-images/create-variants/) for help creating variants. You can also refer to the API to learn how to use blur using flexible variants.

To blur an image:

1. In the Cloudflare dashboard, go to the **Hosted Images** page.  
[ Go to **Hosted images** ](https://dash.cloudflare.com/?to=/:account/images/hosted)
2. Select the **Delivery** tab.
3. Find the variant you want to blur and select **Edit** \> **Customization Options**.
4. Use the slider to adjust the blurring effect. You can use the preview image to see how strong the blurring effect will be.
5. Select **Save**.

The image should now display the blurred effect.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/optimization/","name":"Optimization"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/optimization/hosted-images/","name":"Hosted images"}},{"@type":"ListItem","position":5,"item":{"@id":"/images/optimization/hosted-images/blur-variants/","name":"Apply blur"}}]}
```
