---
title: Delete images
description: Remove images from Cloudflare Images storage using the dashboard or API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Delete images

You can delete an image from the Cloudflare Images storage using the dashboard or the API.

## Delete images via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Hosted Images** page.  
[ Go to **Hosted images** ](https://dash.cloudflare.com/?to=/:account/images/hosted)
2. Find the image you want to remove and select **Delete**.
3. (Optional) To delete more than one image, select the checkbox next to the images you want to delete and then **Delete selected**.

Your image will be deleted from your account.

## Delete images via the API

Make a `DELETE` request to the [delete image endpoint](https://developers.cloudflare.com/api/resources/images/subresources/v1/methods/delete/). `{image_id}` must be fully URL encoded in the API call URL.

Terminal window

```

curl --request DELETE https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v1/{image_id} \

--header "Authorization: Bearer <API_TOKEN>"


```

After the image has been deleted, the response returns `"success": true`.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/storage/","name":"Storage"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/storage/manage-images/","name":"Manage hosted images"}},{"@type":"ListItem","position":5,"item":{"@id":"/images/storage/manage-images/delete-images/","name":"Delete images"}}]}
```
