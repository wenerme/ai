---
title: Delete variants
description: Remove image variants from Cloudflare Images using the dashboard or API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Delete variants

You can delete variants via the Images dashboard or API. The only variant you cannot delete is public.

Warning

Deleting a variant is a global action that will affect other images that contain that variant.

## Delete variants via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Hosted Images** page.  
[ Go to **Hosted images** ](https://dash.cloudflare.com/?to=/:account/images/hosted)
2. Select the **Delivery** tab.
3. Find the variant you want to remove and select **Delete**.

## Delete variants via the API

Make a `DELETE` request to the delete variant endpoint.

Terminal window

```

curl --request DELETE https://api.cloudflare.com/client/v4/accounts/{account_id}/images/v1/variants/{variant_name} \

--header "Authorization: Bearer <API_TOKEN>"


```

After the variant has been deleted, the response returns `"success": true.`

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/optimization/","name":"Optimization"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/optimization/hosted-images/","name":"Hosted images"}},{"@type":"ListItem","position":5,"item":{"@id":"/images/optimization/hosted-images/delete-variants/","name":"Delete variants"}}]}
```
