---
title: Search for videos
description: Search your Cloudflare Stream video library by name using the Stream API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/stream/manage-video-library/searching.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Search for videos

You can search for videos by name through the Stream API by adding a `search` query parameter to the [list media files](https://developers.cloudflare.com/api/resources/stream/methods/list/) endpoint.

## What you will need

To make API requests you will need a [Cloudflare API token ↗](https://www.cloudflare.com/a/account/my-account) and your Cloudflare [account ID ↗](https://www.cloudflare.com/a/overview/).

## cURL example

This example lists media where the name matches `puppy.mp4`.

Terminal window

```

curl -X GET "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream?search=puppy" \

     -H "Authorization: Bearer <API_TOKEN>" \

     -H "Content-Type: application/json"


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/manage-video-library/","name":"Manage videos"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/manage-video-library/searching/","name":"Search for videos"}}]}
```
